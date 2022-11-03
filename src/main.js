import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'c'
import router from './router';
import '@/assets/css/common.css'
import VueRouter from 'vue-router'


Vue.use(BaiduMap, {
    // v: '2.0',
    ak: 'yU5nt3oggGqpGWqAj9GVGcZzRHttvIaD',// LkW3zeVtdMjBZGhCggdGNHAkcuMDveOr    Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK
    type: 'WebGL'
});
Vue.use(VueRouter)

export default new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
