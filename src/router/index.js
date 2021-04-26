import Vue from 'vue'
import VueRouter from 'vue-router'
import RiskTypes from '@/views/RiskTypes.vue'
import NotFound from '@/views/NotFound.vue'
import RiskType from '@/views/RiskType.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dev'
  },
  {
    path: '/dev',
    name: 'RiskTypes',
    component: RiskTypes,
  },
  {
    path: '/risk-types/:id',
    redirect: '/dev/risk-types/:id',
  },
  {
    path: '/dev/risk-types/:id',
    name: 'RiskType',
    component: RiskType,
  },
  {
    path: '/dev*', 
    name:'NotFound', 
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
