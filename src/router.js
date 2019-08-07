import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

Vue.use(Router)

const router = new Router({
    //mode: 'history',
    routes: [
        {
            path: "*",
            component: (resolve)=> require(['@/views/error/page404.vue'], resolve)
        },
        {
            path: '/',
            name: 'index',
            component: index
        }
    ]
})


export default router
