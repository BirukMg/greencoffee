import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/client/Main'
import Home2 from '@/views/client/Home'
import Home from '@/views/client/homePage/Main'
import Products from '@/views/client/Products'
import ProductDetail from '@/views/client/ProductDetail'
import Chackout from '@/views/client/Chackout'
import AboutUs from '@/views/client/aboutPage/Main'
import ContactUs from '@/views/client/ContactUs'
import SearchResult from '@/views/client/SearchResult'
import Some from '@/views/client/Some'
import Gallary from '@/views/client/Gallary'

import Try from '@/components/Try'

import AdminMain from '@/views/admin/Main'
import Login from '@/views/admin/Login'
import ProductMain from '@/views/admin/management/product/Main'
import WebMain from '@/views/admin/management/web/Main'
import HomePage from '@/views/admin/management/web/homePage/Main'
import AboutPage from '@/views/admin/management/web/aboutPage/Main'
import GallaryPage from '@/views/admin/management/web/Gallary'
import BlogPage from '@/views/admin/management/web/Blog'
import ContactPage from '@/views/admin/management/web/ContactPage'
import Profile from '@/views/admin/profile/Main'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: Try,
      component: Try
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path:'/home',
          component:Home
        },
        {
          path: '/home2',
          component: Home2
        },
        {
          path:'/products',
          component:Products
        },
        {
          path:'/some',
          component:Some
        },
        {
          path:'/productDetail/:product',
          name: ProductDetail,
          component:ProductDetail
        },
        {
          path:'/search/:search_key',
          name: SearchResult,
          component:SearchResult
        },
        {
          path:'/about',
          component:AboutUs
        },
        {
          path:'/contact',
          component: ContactUs
        }, {
          path: '/gallary',
          component: Gallary
        }
      ]
    },
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/admin',
      name: AdminMain,
      component: AdminMain,
      children: [
        {
          path: '/product management',
          component: ProductMain
        },
        {
          path: '/gallery',
          component: GallaryPage
        },
        {
          path: '/blog',
          component: BlogPage
        },
        {
          path: '/profile',
          component: Profile
        },
        {
          path: '/web management',
          component: WebMain,
          children: [
            {
              path: '/my web site/home',
              component: HomePage
            },
            {
              path: '/my web site/about',
              component: AboutPage
            },
            {
              path: '/my web site/contact',
              component: ContactPage
            }
          ]

        }
      ]
    }
  ]
})
