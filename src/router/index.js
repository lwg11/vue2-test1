import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Home from '@/views/Home.vue'
import UserList from '@/views/UserList.vue'
import ProductList from '@/views/ProductList.vue'
// import NotFound from '@/views/NotFound.vue'

// 注册路由插件
Vue.use(Router)

// 创建路由实例
export default new Router({
  mode: 'history', // 使用history模式，去掉URL中的#
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        icon: 'el-icon-menu'
      }
    },
    {
      path: '/users',
      name: 'userList',
      component: UserList,
      meta: {
        title: '用户管理',
        icon: 'el-icon-user'
      }
    },
    {
      path: '/products',
      name: 'productList',
      component: ProductList,
      meta: {
        title: '产品管理',
        icon: 'el-icon-s-goods'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'), // 懒加载
      meta: {
        title: '关于我们',
        icon: 'el-icon-info'
      }
    },
    // {
    //   path: '*',
    //   name: 'notFound',
    //   component: NotFound,
    //   meta: {
    //     hidden: true // 在菜单中隐藏
    //   }
    // }
  ]
})