export default [
  {
    path: '/auth/signin',
    name: 'auth-signin',
    component: () => import(/* webpackChunkName: "auth-signin" */ '@/pages/auth/SigninPage.vue')
  }, {
    path: '/auth/signup',
    name: 'auth-signup',
    component: () => import(/* webpackChunkName: "auth-signup" */ '@/pages/auth/SignupPage.vue')
  }
]