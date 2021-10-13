import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import HomePage from "@/views/Home";
import Profile from "@/views/Profile";
import FollowUp from "@/views/FollowUp";
import Diet from "@/views/Diet";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signin',
    name: 'Login',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SignUp
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path:'/followUp',
    name:'followUp',
    component: FollowUp
  },
  {
    path: '/diet',
    name: 'Diet',
    component: Diet
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
