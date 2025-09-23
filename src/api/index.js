// 导入请求工具
import request from '../utils/request';

// 基础API模块
export const baseApi = {
    // 登录接口
    login(data) {
        return request.post('/api/login', data);
    },

    // 退出登录
    logout() {
        return request.post('/api/logout');
    }
};

// 示例：用户相关API
export const userApi = {
    // 获取用户信息
    getUserInfo() {
        return request.get('/api/user/info');
    },
    
    // 获取用户列表
    getUserList(params) {
        return request.get('/api/users', params);
    },

    // 获取单个用户详情
    getUserDetail(id) {
        return request.get(`/api/users/${id}`);
    },

    // 创建用户
    createUser(data) {
        return request.post('/api/users', data);
    },

    // 更新用户
    updateUser(id, data) {
        return request.put(`/api/users/${id}`, data);
    },

    // 删除用户
    deleteUser(id) {
        return request.delete(`/api/users/${id}`);
    }
};

// 示例：产品相关API
export const productApi = {
    // 获取产品列表
    getProductList(params) {
        return request.get('/api/products', params);
    },

    // 获取产品详情
    getProductDetail(id) {
        return request.get(`/api/products/${id}`);
    }
};

// 导出所有API
export default {
    base: baseApi,
    user: userApi,
    product: productApi
};

// 提供一个简便的方式在Vue原型上注册API
export const install = (Vue) => {
    // 将API对象挂载到Vue原型上
    Vue.prototype.$api = {
        base: baseApi,
        user: userApi,
        product: productApi
    };
};