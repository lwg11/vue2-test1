import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 添加这行代码注册 ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
