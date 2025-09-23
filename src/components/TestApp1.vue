<template>
  <!-- 添加一个根容器包裹所有内容 -->
  <div class="container">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <div class="input-group">
        <span>输入内容</span>
        <!-- <el-input :placeholder="input"></el-input> -->
        <el-input v-model="input2" placeholder="请输入内容"></el-input>
      </div>
    </div>

    <!-- API调用示例 -->
    <div class="api-example">
      <h2>API调用示例</h2>

      <!-- 示例1: 使用this.$api调用接口 -->
      <div class="example-item">
        <el-button type="primary" @click="getUserList" :loading="loading"
          >获取用户列表</el-button
        >

        <!-- 显示加载状态 -->
        <div v-if="loading" class="loading-tip">加载中...</div>

        <!-- 显示结果 -->
        <div v-if="userList.length > 0" class="result">
          <h3>用户列表:</h3>
          <el-table :data="userList" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              width="80"
            ></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 示例2: 直接导入API模块调用 -->
      <div class="example-item">
        <el-button @click="callDirectApi">直接导入API调用</el-button>
      </div>
    </div>

    <div>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
// 直接导入API模块（第二种使用方式）
import { userApi } from '../api';

export default {
  name: 'TestApp1',
  props: {
    msg: String,
  },
  data() {
    return {
      input: '',
      input2: '',
      loading: false,
      userList: [],
    };
  },
  methods: {
    async handleSubmit() {
      // 提交逻辑
      console.log('提交数据:', { input1: this.input, input2: this.input2 });

      try {
        this.loading = true;
        // 模拟API调用
        // 在实际项目中，这里会是真实的API调用
        // const res = await this.$api.base.login({
        //   username: this.input,
        //   password: this.input2
        // });

        // 模拟调用延迟
        await new Promise((resolve) => setTimeout(resolve, 800));

        // 模拟响应数据
        const mockRes = {
          code: 0,
          message: '登录成功',
          data: {
            token: 'mock_token_123456',
            userInfo: {
              id: 1,
              name: this.input || '测试用户',
            },
          },
        };

        this.$message.success('提交成功');
        console.log('提交结果:', mockRes);
      } catch (error) {
        console.error('提交失败:', error);
        this.$message.error('提交失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    },

    // 使用Vue原型上的API调用
    async getUserList() {
      try {
        this.loading = true;
        // 模拟获取用户列表
        // 实际项目中这里会调用真实的API接口
        // 由于是演示，我们使用模拟数据
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.userList = [
          { id: 1, name: '张三', age: 18, address: '北京市' },
          { id: 2, name: '李四', age: 20, address: '上海市' },
          { id: 3, name: '王五', age: 22, address: '广州市' },
        ];

        this.$message.success('获取用户列表成功');

        // 实际项目中的真实调用方式
        const res = await this.$api.user.getUserList({ page: 1, pageSize: 10 });
        // this.userList = res.data || [];
      } catch (error) {
        this.$message.error('获取用户列表失败');
        console.error('获取用户列表失败:', error);
      } finally {
        this.loading = false;
      }
    },

    // 直接导入API模块调用
    async callDirectApi() {
      try {
        this.loading = true;
        // 模拟API调用
        // 在实际项目中，这里会是真实的API调用
        // const res = await userApi.getUserInfo();

        // 模拟调用延迟和响应数据
        await new Promise((resolve) => setTimeout(resolve, 800));

        // 模拟响应数据
        const mockRes = {
          id: 1,
          name: '测试用户',
          email: 'test@example.com',
          role: 'admin',
        };

        console.log('用户信息:', mockRes);
        this.$message.success('直接调用API成功');
      } catch (error) {
        this.$message.error('直接调用API失败');
        console.error('直接调用API失败:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.input-group {
  margin-top: 20px;
  border: 1px solid red;
  width: 500px;
  height: 100px;
}

.api-example {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
}

.example-item {
  margin-top: 15px;
}

.loading-tip {
  margin-top: 10px;
  color: #909399;
}

.result {
  margin-top: 20px;
}
</style>
