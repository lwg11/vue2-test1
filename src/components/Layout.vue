<template>
  <div class="app-layout">
    <!-- 侧边栏菜单 -->
    <div class="sidebar">
      <div class="logo">
        <h2>Vue Admin</h2>
      </div>
      <el-menu 
        :default-active="activeMenu" 
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <!-- 通过路由配置动态生成菜单 -->
        <template v-for="route in routes">
          <el-menu-item 
            v-if="!route.hidden && !route.children" 
            :key="route.path"
            :index="route.path"
          >
            <i :class="route.meta.icon"></i>
            <span slot="title">{{ route.meta.title }}</span>
          </el-menu-item>
          
          <!-- 处理有子菜单的情况 -->
          <el-submenu 
            v-else-if="!route.hidden && route.children && route.children.length > 0" 
            :key="route.path"
            :index="route.path"
          >
            <template slot="title">
              <i :class="route.meta.icon"></i>
              <span>{{ route.meta.title }}</span>
            </template>
            <el-menu-item 
              v-for="child in route.children" 
              v-if="!child.hidden" 
              :key="child.path"
              :index="`${route.path}/${child.path}`"
            >
              <span>{{ child.meta.title }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    
    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <div class="header">
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentRoute && currentRoute.meta && currentRoute.meta.title">
              {{ currentRoute.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="user-info">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i> 管理员 <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      
      <!-- 路由内容 -->
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      routes: [],
      currentRoute: null
    }
  },
  computed: {
    // 获取当前激活的菜单路径
    activeMenu() {
      return this.$route.path
    }
  },
  created() {
    // 从路由实例中获取路由配置
    this.routes = this.$router.options.routes
    this.updateCurrentRoute()
  },
  mounted() {
    // 监听路由变化
    this.$router.afterEach(() => {
      this.updateCurrentRoute()
    })
  },
  methods: {
    // 更新当前路由信息
    updateCurrentRoute() {
      this.currentRoute = this.$route
    },
    // 处理菜单选择
    handleMenuSelect(index, indexPath) {
      console.log('Selected menu:', index, indexPath)
      // 可以在这里添加菜单选择的额外逻辑
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background-color: #545c64;
  height: 100%;
  overflow-y: auto;
}

.logo {
  padding: 20px;
  text-align: center;
  color: white;
  border-bottom: 1px solid #666;
}

.logo h2 {
  margin: 0;
  font-size: 20px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.breadcrumb {
  flex: 1;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.user-info {
  display: flex;
  align-items: center;
}
</style>