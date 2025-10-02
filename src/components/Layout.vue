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
      
      <!-- 标签页导航 -->
      <div class="tabs-nav">
        <el-tabs 
          v-model="activeTab" 
          type="card" 
          :closable="tabs.length > 1" 
          @tab-remove="handleTabRemove" 
          @tab-click="handleTabClick"
          class="tabs"
        >
          <el-tab-pane 
            v-for="tab in tabs" 
            :key="tab.path" 
            :label="tab.label"
            :name="tab.path"
            :closable="tab.closable"
          >
          </el-tab-pane>
        </el-tabs>
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
      currentRoute: null,
      tabs: [],
      activeTab: ''
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
    // 初始化首页标签
    this.initTabs()
    // 监听路由变化
    this.$router.afterEach(() => {
      this.updateCurrentRoute()
      this.addTab()
    })
  },
  methods: {
    // 初始化标签页
    initTabs() {
      // 添加首页标签
      this.tabs.push({
        path: '/',
        label: '首页',
        closable: false
      })
      this.activeTab = '/'
    },
    
    // 更新当前路由信息
    updateCurrentRoute() {
      this.currentRoute = this.$route
    },
    
    // 添加标签页
    addTab() {
      const route = this.$route
      const title = route.meta && route.meta.title ? route.meta.title : route.name || '未知页面'
      
      // 检查标签是否已存在
      const isExist = this.tabs.some(tab => tab.path === route.path)
      
      if (!isExist && route.path !== '/') {
        this.tabs.push({
          path: route.path,
          label: title,
          closable: true
        })
      }
      
      this.activeTab = route.path
    },
    
    // 处理标签页点击
    handleTabClick(tab) {
      this.$router.push(tab.name)
    },
    
    // 处理标签页关闭
    handleTabRemove(path) {
      // 找到要关闭的标签索引
      const index = this.tabs.findIndex(tab => tab.path === path)
      
      // 如果关闭的是当前激活的标签
      if (path === this.activeTab) {
        // 确定下一个要激活的标签
        let nextTab = null
        if (index < this.tabs.length - 1) {
          // 如果不是最后一个标签，激活下一个
          nextTab = this.tabs[index + 1]
        } else if (index > 0) {
          // 如果是最后一个标签，激活上一个
          nextTab = this.tabs[index - 1]
        }
        
        // 如果有下一个标签，跳转并更新activeTab
        if (nextTab) {
          this.$router.push(nextTab.path)
          this.activeTab = nextTab.path
        }
      }
      
      // 移除标签
      this.tabs.splice(index, 1)
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

/* 标签页导航样式 */
.tabs-nav {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
}

.tabs {
  height: 42px;
}

.el-tabs__item {
  height: 42px;
  line-height: 42px;
  padding: 0 16px;
  font-size: 14px;
}

.el-tabs__nav {
  height: 42px;
}

/* 主内容区域样式 */
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