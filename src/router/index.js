import Vue from 'vue'
import Router from 'vue-router'
import authRoutes from './auth.routes'
import profileRoutes from './profile.routes'

// import store from '../store'
import bootstrap from './bootstrap'

import AuthLayout from '@/layouts/AuthLayout'
import SimpleLayout from '@/layouts/SimpleLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import ProfileLayout from '@/layouts/ProfileLayout'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    component: SimpleLayout,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/HomePage.vue')
      },
      {
        path: '/contact-us',
        component: () => import(/* webpackChunkName: "contact-us" */ '@/pages/ContactUs.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: authRoutes
  },
  {
    path: '/profile',
    component: ProfileLayout,
    children: profileRoutes
  },
  {
    path: '/view',
    component: DefaultLayout,
    children: [
      {
        path: '/view/list',
        name: 'list-view',
        component: () => import(/* webpackChunkName: "list-view" */ '@/pages/ListView.vue')
      }, {
        path: '/view/map',
        name: 'map-view',
        component: () => import(/* webpackChunkName: "map-view" */ '@/pages/MapView.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFoundPage.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

let firstRoute = true

/**
 * Before each route update
 */
router.beforeEach(async (to, from, next) => {
  // document.getElementById('loading').style.display = 'flex'

  if (firstRoute) {
    firstRoute = false

    await bootstrap()
  }

  // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  // const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  // const isLoggedIn = !!store.state.auth.user

  // if (requiresAuth) {
  //   if (!isLoggedIn)
  //     return next({ name: 'login' })

  //   return next()
  // } else if (requiresGuest) {
  //   if (isLoggedIn)
  //     return next({ name: 'admin-dashboard' })
    
  //   return next()
  // }

  return next()
})

/**
 * After each route update
 */
// router.afterEach((to, from, next) => {
//   document.getElementById('loading').style.display = 'none'
// })

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
