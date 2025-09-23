# API请求工具使用说明

本项目使用原生Fetch API封装了HTTP请求工具，无需依赖第三方库如axios。

## 目录结构

```
src/
├── utils/
│   ├── request.js  # 请求工具核心文件
│   └── README.md   # 工具使用说明
├── api/
│   └── index.js    # API接口统一管理文件
```

## 核心功能

1. **请求拦截**：支持设置请求头、认证token
2. **响应处理**：自动解析JSON响应、错误处理
3. **超时处理**：请求超时自动中断
4. **错误提示**：结合ElementUI提供友好的错误提示
5. **模块化管理**：按业务模块划分API接口

## 使用方法

### 1. 通过Vue原型使用（推荐）

在组件中可以直接通过 `this.$api` 调用接口：

```javascript
// 获取用户列表
try {
  this.loading = true;
  const res = await this.$api.user.getUserList({ page: 1, pageSize: 10 });
  this.userList = res.data || [];
  this.$message.success('获取用户列表成功');
} catch (error) {
  this.$message.error('获取用户列表失败');
} finally {
  this.loading = false;
}

// 提交表单
try {
  const res = await this.$api.base.login({ username, password });
  // 处理登录成功逻辑
} catch (error) {
  // 处理登录失败逻辑
}
```

### 2. 直接导入API模块使用

```javascript
import { userApi } from '../api';

try {
  const res = await userApi.getUserDetail(userId);
  this.userInfo = res.data;
} catch (error) {
  console.error('获取用户详情失败:', error);
}
```

## 开发环境使用指南

在开发环境中，当后端服务不可用时，我们推荐使用模拟数据来测试API调用。以下是如何在组件中使用模拟数据的示例：

```javascript
async handleSubmit() {
  try {
    this.loading = true;
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 模拟响应数据
    const mockRes = {
      code: 0,
      message: '操作成功',
      data: {
        token: 'mock_token_123456',
        userInfo: {
          id: 1,
          name: '测试用户'
        }
      }
    };
    
    this.$message.success('提交成功');
    console.log('提交结果:', mockRes);
  } catch (error) {
    this.$message.error('提交失败，请稍后重试');
  } finally {
    this.loading = false;
  }
}
```

## 配置请求选项

```javascript
// 基础请求配置
const requestConfig = {
  baseURL: process.env.VUE_APP_BASE_API || '', // API基础URL
  timeout: 30000, // 请求超时时间（毫秒）
  headers: { // 默认请求头
    'Content-Type': 'application/json'
  }
};
```

### 自定义请求选项

```javascript
// 自定义请求头
const res = await this.$api.user.getUserList({
  page: 1,
  pageSize: 10
}, {
  headers: {
    'X-Custom-Header': 'custom-value'
  },
  timeout: 10000 // 自定义超时时间
});

// 禁止显示错误消息
const res = await this.$api.user.deleteUser(userId, {}, {
  showMessage: false
});
```

## API模块扩展

如需添加新的API模块，在 `src/api/index.js` 文件中按照以下格式添加：

```javascript
// 新增订单相关API
export const orderApi = {
  getOrderList(params) {
    return request.get('/api/orders', params);
  },
  getOrderDetail(id) {
    return request.get(`/api/orders/${id}`);
  },
  createOrder(data) {
    return request.post('/api/orders', data);
  }
  // ...其他接口
};

// 同时在导出默认对象中添加
export default {
  base: baseApi,
  user: userApi,
  product: productApi,
  order: orderApi // 新增订单模块
};

// 在install函数中也需要添加
export const install = (Vue) => {
  Vue.prototype.$api = {
    base: baseApi,
    user: userApi,
    product: productApi,
    order: orderApi // 新增订单模块
  };
};
```