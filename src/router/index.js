import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
// 登录
import login from '@/components/login'
// 药企管理
import Druglist from '@/components/drug/Druglist'
import Setup from '@/components/drug/Druglist'
import store from '@/components/drug/Store'
import Supplier from '@/components/drug/Druglist'
// 处方管理
import unfinish from '@/components/prescription/unfinish'
import finish from '@/components/prescription/finish'
import predetail from '@/components/prescription/predetail'
import order from '@/components/prescription/order'
import pay from '@/components/prescription/pay'
// 订单管理
// 个人中心
// 对账管理
// 更多
Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/login',
       name: '登录',
       menuShow: "",
       component: login,
    },
    {
       path: '/',
       name: '药企管理',
       menuShow: "",
       component: home,
       children: [
                { path: '/drug/Druglist', component: Druglist, name: '药品信息列表', menuShow: "" },
                { path: '/drug/Setup', component: Setup, name: '供应商创建', menuShow: "" },
                { path: '/drug/store', component: store, name: '门店列表', menuShow: "" },
                { path: '/drug/Supplier', component: Supplier, name: '供应商列表', menuShow: "" },
            ]
    },
    {
       path: '/',
       name: '处方管理',
       menuShow: "",
       component: home,
       children: [
                { path: '/prescription/unfinish', component: unfinish, name: '待处理', menuShow: "" },
                { path: '/prescription/finish', component: finish, name: '已处理', menuShow: "" },
                { path: '/prescription/unfinish/detail', component: predetail, name: '处方详情', menuShow: "" },
                { path: '/prescription/unfinish/order', component: order, name: '生成订单', menuShow: "" },
                { path: '/prescription/unfinish/pay', component: pay, name: '支付', menuShow: "" },
            ]
    },
    {
       path: '/order',
       name: '订单管理',
       menuShow: "",
    },
     {
       path: '/finance',
       name: '对账管理',
       menuShow: "",
    },
     {
       path: '/personal',
       name: '个人中心',
       menuShow: "",
    },
     {
       path: '/more',
       name: '更多',
       menuShow: "",
    },
  ]
})
// router.beforeEach((to, from, next) => {
//     if (to.path.startsWith('/login')) {
//         window.sessionStorage.removeItem('user');
//         next()
//     } else {
//         let user = JSON.parse(window.sessionStorage.getItem('user'))
//         if (!user) {
//             next({ path: '/login' })
//         } else {
//             next()
//         }
//     }
// })
