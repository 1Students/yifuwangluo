import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import message from '@/components/message'
import  deal from '@/components/deal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/home',
      name:"home",
      component:home,
      children:[
        {
        path: '/pay',
        component: () => import('@/components/payment/pay.vue'),
      },
        {
          path: '/sett',
          component: () => import('@/components/Settlement/sett.vue'),
        },
        {
          path: '/setts',
          component: () => import('@/components/Settlement/setts.vue'),
        }
        ,{
          path: '/bill',
          component: () => import('@/components/payable/bill.vue'),
        },
        {
          path: '/message',
          component: () => import('@/components/payable/message.vue'),
        },
        {
          path: '/wallet',
          component: () => import('@/components/payable/wallet.vue'),
        },
        {
          path: '/keys',
          component: () => import('@/components/selemont/keys.vue'),
        },
        {
          path: '/login',
          component: () => import('@/components/selemont/login.vue'),
        },
        {
          path: '/trans',
          component: () => import('@/components/selemont/trans.vue'),
        }

      ]
    },
       {
        path:'/message',
        name:'message',
        component:message
      },{
        path:'/deal',
        name:'deal',
        component:deal
      },

   ,

  ]
})
