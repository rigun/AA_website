import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'
const Hello = () => import('../components/Hello.vue')
const Logout = () => import('../components/Logout.vue')
const Login = () => import('../components/layout/Login.vue')
const Dashboard = () => import('../components/layout/Dashboard.vue')

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'DashboardContent',
    component: Dashboard
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
    next({ name: 'Login' })
    return
  }
  // if logged in redirect to dashboard
  if (to.name === 'Login' && store.state.isLoggedIn) {
    next({ name: 'DashboardContent' })
    return
  }
  // if logged in redirect to dashboard
  if (to.name === 'DashboardContent' && !store.state.isLoggedIn) {
    next({ name: 'Login' })
    return
  }
  next()
})
export default router
