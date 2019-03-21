import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'
const Home = () => import('../components/layout/Home.vue')
const Logout = () => import('../components/Logout.vue')
const Login = () => import('../components/layout/Login.vue')
const Dashboard = () => import('../components/layout/Dashboard.vue')
// Home
const Landing = () => import('../components/homepart/Landing.vue')
const Customer = () => import('../components/homepart/Customer.vue')
// Dashboard
const Main = () => import('../components/part/mainView.vue')
const Supplier = () => import('../components/part/manageSupplier.vue')
const Branches = () => import('../components/part/branchManager.vue')
// Branch
const MainBranch = () => import('../components/part/detailBranchMain.vue')
const BranchD1 = () => import('../components/part/detailBranchD1.vue')
const BranchD2 = () => import('../components/part/detailBranchD2.vue')
// Supplier
const MainSupplier = () => import('../components/part/detailSupplierMain.vue')
const SupplierD1 = () => import('../components/part/detailSupplierD1.vue')

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Landing',
        component: Landing
      },
      {
        path: 'customer',
        name: 'Customer',
        component: Customer
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard/',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardContent',
        component: Main
      },
      {
        path: 'supplier',
        name: 'manageSupplier',
        component: Supplier
      },
      {
        path: 'cabang',
        name: 'branches',
        component: Branches
      },
      {
        path: 'cabang/:id',
        component: MainBranch,
        children: [
          {
            path: '',
            name: 'branchD1',
            component: BranchD1
          },
          {
            path: '2',
            name: 'branchD2',
            component: BranchD2
          }
        ]
      },
      {
        path: 'supplier/:id',
        component: MainSupplier,
        children: [
          {
            path: '',
            name: 'supplierD1',
            component: SupplierD1
          }
        ]
      }
    ]
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
