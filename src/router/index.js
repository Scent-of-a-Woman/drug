import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
// 登录
import login from '@/components/login'
// 药企管理
import Druglist from '@/components/drug/Druglist'  //药品信息列表
import store from '@/components/drug/Store'  //门店列表
import Supplier from '@/components/drug/Supplier' //供应商列表
import new_add from '@/components/drug/new_add' //
import add_store from '@/components/drug/add_store' //新增门店
import storedetail from '@/components/drug/storedetail' //门店详情，有时间可以提取出来覆用 等同新增门店
// 处方管理
import unfinish from '@/components/prescription/unfinish'
import finish from '@/components/prescription/finish'
import predetail from '@/components/prescription/predetail'
import order from '@/components/prescription/order'
import pay from '@/components/prescription/pay'
// 订单管理
import take from '@/components/order/take'
import give from '@/components/order/give'
import orderdetail from '@/components/order/orderdetail'
import takeorder from '@/components/order/takeorder'
// 个人中心
import change from '@/components/set/change'
// 对账管理
import takeOrder from '@/components/finance/takenOrder'
import giveOrder from '@/components/finance/giveOrder'
// 更多
Vue.use(Router)

let router= new Router({
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
                { path: '/drug/Supplier', component: Supplier, name: '供应商列表', meta:{ keepAlive: false} },
                { path: '/drug/store', component: store, name: '门店列表', meta:{ keepAlive: false} },
                { path: '/drug/Druglist', component: Druglist, name: '药品信息列表',meta:{ keepAlive: false}},
                { path: '/drug/new_add', component: new_add, name: '新增列表',meta:{ keepAlive: false}},
                { path:'/drug/add_store',component:add_store,name:'新增门店',meta:{ keepAlive: false}},               
                { path:'/drug/storedetail',component:storedetail,name:'门店详情',meta:{ keepAlive: false}}
            ]
    },
    {
       path: '/',
       name: '处方管理',
       menuShow: "",
       component: home,
       children: [
                { path: '/prescription/unfinish', component: unfinish, name: '待处理',meta:{ keepAlive: false}},
                { path: '/prescription/finish', component: finish, name: '已处理',meta:{ keepAlive: false} },
                { path: '/prescription/unfinish/detail', component: predetail, name: '处方详情', meta:{ keepAlive: true} },
                { path: '/prescription/unfinish/order', component: order, name: '生成订单', meta:{ keepAlive: false} },
                { path: '/prescription/unfinish/pay', component: pay, name: '支付',meta:{ keepAlive: false}},
            ]
    },
    {
       path: '/',
       name: '订单管理',
       menuShow: "",
       component: home,
       children:[   
                { path: '/order/take', component: take, name: '自提', meta:{ keepAlive: false}},
                { path: '/order/give', component: give, name: '配送', meta:{ keepAlive: false} },
                { path: '/order/orderdetail', component: orderdetail, name: '订单详情',meta:{ keepAlive: false} },
                { path: '/order/takeorder', component: takeorder, name: '订单详情', meta:{ keepAlive: false} },
       ]
    },
     {
       path: '/',
       name: '对账管理',
       component:home,
       menuShow: "",
        children:[   
                { path: '/finance/takeOrder', component: takeOrder, name: '自提订单',meta:{ keepAlive: false} },
                { path: '/finance/giveOrder', component: giveOrder, name: '配送订单', meta:{ keepAlive: false} },
       ]
    },
     {
       path: '/',
       name: '个人中心',
       menuShow: "",
       component:home,
       children:[
        { path:'/set/change',component:change,name:"修改密码",meta:{ keepAlive: false}},
       ]
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('username');
        next()
    } else {
        let user = window.localStorage.getItem('username')
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})
export default router
