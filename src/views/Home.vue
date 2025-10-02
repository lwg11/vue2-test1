<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <div slot="header" class="card-header">
        <span>欢迎使用</span>
      </div>
      <div class="card-body">
        <div class="welcome-message">
          <h1>Vue 2 Admin 系统</h1>
          <p>这是一个基于 Vue 2 和 Element UI 构建的管理系统示例</p>
        </div>
        
        <div class="system-stats">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="stat-card">
                <i class="el-icon-user"></i>
                <div class="stat-info">
                  <div class="stat-value">28</div>
                  <div class="stat-label">用户总数</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="stat-card">
                <i class="el-icon-s-goods"></i>
                <div class="stat-info">
                  <div class="stat-value">126</div>
                  <div class="stat-label">产品数量</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="stat-card">
                <i class="el-icon-success"></i>
                <div class="stat-info">
                  <div class="stat-value">89%</div>
                  <div class="stat-label">完成率</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="stat-card">
                <i class="el-icon-time"></i>
                <div class="stat-info">
                  <div class="stat-value">24h</div>
                  <div class="stat-label">系统运行</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <div class="quick-actions">
          <h3>快速操作</h3>
          <div class="action-buttons">
            <el-button type="primary" icon="el-icon-circle-plus">
              添加用户
            </el-button>
            <el-button type="primary" icon="el-icon-upload">
              上传数据
            </el-button>
            <el-button type="primary" icon="el-icon-download">
              导出报表
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      currentDate: new Date(),
      // 可以在这里添加需要的数据
    }
  },
  mounted() {
    // 页面加载后的逻辑
    console.log('Home page loaded')
  },
  methods: {
    // 可以在这里添加方法
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
}

.welcome-card {
  height: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.card-body {
  padding: 20px 0;
}

.welcome-message {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background-color: #f0f9ff;
  border-radius: 8px;
}

.welcome-message h1 {
  color: #1890ff;
  margin-bottom: 10px;
  font-size: 32px;
}

.welcome-message p {
  color: #666;
  font-size: 16px;
}

.system-stats {
  margin-bottom: 40px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card i {
  font-size: 32px;
  color: #1890ff;
  margin-right: 15px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

.quick-actions h3 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 15px;
}
</style>