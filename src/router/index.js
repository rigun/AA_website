import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'
const Logout = () => import('../components/Logout.vue')

function loadViewHome (view) {
  return () => import(/* webpackChunkName: "viewHome-[request]" */ `../components/homepart/${view}.vue`)
}
function loadViewDashboard (view) {
  return () => import(/* webpackChunkName: "viewDashboard-[request]" */ `../components/part/${view}.vue`)
}
function loadViewLayout (view) {
  return () => import(/* webpackChunkName: "viewLayout-[request]" */ `../components/layout/${view}.vue`)
}
const routes = [
  {
    path: '/',
    component: loadViewLayout('Home'),
    children: [
      {
        path: '',
        name: 'Landing',
        component: loadViewHome('Landing')
      },
      {
        path: 'customer',
        name: 'Customer',
        component: loadViewHome('Customer')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: loadViewLayout('Login')
  },
  {
    path: '/dashboard/',
    component: loadViewLayout('Dashboard'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardContent',
        component: loadViewDashboard('mainView')
      },
      {
        path: 'supplier',
        name: 'manageSupplier',
        component: loadViewDashboard('manageSupplier')
      },
      {
        path: 'ubahpassword',
        name: 'changePassword',
        component: loadViewDashboard('changePassword')
      },
      {
        path: 'cabang',
        name: 'branches',
        component: loadViewDashboard('branchManager')
      },
      {
        path: 'cabang/:id',
        component: loadViewDashboard('detailBranchMain'),
        children: [
          {
            path: 'pegawai',
            name: 'branchD1',
            component: loadViewDashboard('detailBranchD1')
          },
          {
            path: 'sparepart',
            name: 'branchD2',
            component: loadViewDashboard('detailBranchD2')
          },
          {
            path: 'transaksi',
            name: 'branchD3',
            component: loadViewDashboard('transactionBranchD3')
          },
          {
            path: 'pembayaran',
            name: 'branchD4',
            component: loadViewDashboard('detailPembayaranD4')
          },
          {
            path: 'pengadaan',
            name: 'branchD5',
            component: loadViewDashboard('pemesananBranchD5')
          },
          {
            path: 'supplierbranch',
            name: 'listSupplierBranch',
            component: loadViewDashboard('listSupplierBranch')
          },
          {
            path: 'pengadaan/:supplierId',
            name: 'sparepartBranchSupplier',
            component: loadViewDashboard('sparepartBranchSupplier')
          },
          {
            path: 'pembayaran/:transactionType-:transactionNumber-:idTransaction',
            name: 'detailPembayaran',
            component: loadViewDashboard('detailPembayaranItem')
          },
          {
            path: 'transaksi/:transactionType-:transactionNumber-:idTransaction',
            name: 'detailTransaction',
            component: loadViewDashboard('detailTransaction')
          },
          {
            path: 'transaksi/:transactionType-:transactionNumber-:idTransaction/:detailId',
            name: 'detailTransactionItem',
            component: loadViewDashboard('detailTransactionItem')
          }
        ]
      },
      {
        path: 'supplier/:id',
        component: loadViewDashboard('detailSupplierMain'),
        children: [
          {
            path: '',
            name: 'supplierD1',
            component: loadViewDashboard('detailSupplierD1')
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

const router = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }})
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
