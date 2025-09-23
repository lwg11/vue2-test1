import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入API安装器
import { install as installApi } from './api';


// 添加这行代码注册 ElementUI
Vue.use(ElementUI);

// 安装API到Vue原型
Vue.use(installApi);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')