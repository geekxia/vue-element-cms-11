import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout/index.vue'
import Login from '@/views/user/Login.vue'

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    text: '首页概况',
    icon: 'el-icon-s-help',
    children: [
      {
        path: '',
        component: () => import('@/views/home/Home'),
        text: '统计分析'
      }
    ]
  },
  {
    path: '/good',
    component: Layout,
    text: '商品管理',
    icon: 'el-icon-s-shop',
    children: [
      {
        path: '',
        component: ()=>import('@/views/good/GoodList.vue'),
        text: '商品列表'
      },
      {
        path: 'update/:id',
        component: ()=>import('@/views/good/GoodUpdate.vue'),
        text: '商品详情',
        hidden: true
      }
    ]
  },
  {
    path: '/ad',
    component: Layout,
    text: '广告中心',
    icon: 'el-icon-s-shop',
    children: [
      {
        path: '',
        component: ()=>import('@/views/ad/AdList.vue'),
        text: '广告列表',
      }
    ]
  },
  { path: '/login', component: Login, hidden: true },
  { path: '*', redirect: '/', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export { constantRoutes }

export default router
