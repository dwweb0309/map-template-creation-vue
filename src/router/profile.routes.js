export default [
  {
    path: '/profile/password-reset',
    name: 'profile-password-reset',
    component: () => import(/* webpackChunkName: "profile-password-reset" */ '@/pages/profile/PasswordReset.vue')
  }, {
    path: '/profile/organisation-contact',
    name: 'profile-organisation-contact',
    component: () => import(/* webpackChunkName: "profile-organisation-contact" */ '@/pages/profile/OrganisationContact.vue')
  }, {
    path: '/profile/subscription',
    name: 'profile-subscription',
    component: () => import(/* webpackChunkName: "profile-subscription" */ '@/pages/profile/SubscriptionPage.vue')
  }
]