// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { userLoginStore } from '@/stores/login-store.js'

import Home from '@/pages/home/home.vue'
import Login from '@/pages/login/login.vue'
import About from '@/pages/about/about.vue'
import NoPermission from '@/pages/exception/no_permission.vue'
import Menu1 from '@/components/menu1.vue'
import Menu2 from '@/components/menu2.vue'
import Menu3 from '@/components/menu3.vue'
import DataAnalysis from '@/components/chart/data-analysis.vue'
import UserList from "@/components/users/user-list.vue"
import RoleDefine from "@/components/users/role-define.vue"
import SettingOne from "@/components/settings/setting-one.vue"
import SettingTwo from "@/components/settings/setting-two.vue"
import Register from "@/pages/login/register.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
            // permissions:'VIEW_HOME'
        }, // 不需要登录
        children:[
            {
                path: 'analysis',
                name: 'DataAnalysis',
                component:DataAnalysis
            },
            {
                path: 'users',
                name: 'UserList',
                component:UserList
            },
            {
                path: 'roles',
                name: 'RoleDefine',
                component:RoleDefine
            },
            {
                path: 'settingA',
                name: 'SettingOne',
                component:SettingOne
            },
            {
                path: 'settingB',
                name: 'SettingTwo',
                component:SettingTwo
            },
            {
                path: 'menu1',
                name: 'Menu1',
                component:Menu1
            },
            {
                path: 'menu2',
                name: 'Menu2',
                component:Menu2
            },
            {
                path: 'menu3',
                name: 'Menu3',
                component:Menu3
            },
            {
                path: '/about',
                name: 'About',
                component: About
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/refuseAccess',
        name: 'NoPermission',
        component: NoPermission
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//检测是否登录了
function isLoginAuthenticated() {
    //这里应该包含你的认证逻辑，例如检查token
    const store = userLoginStore()
    return store.isLogin;
}

//检测是否有访问的权限
function hasPermission(p) {
    if (typeof p === 'undefined' || p.length === 0) return true

    const userPermissions= ['DASHBOARD','MANAGER','VIEW_HOME', 'EDIT_PROFILE','VIEW_LOGIN'] // 假设用户拥有的权限
    return userPermissions.some(permission => {
        return permission === p
    })
}

router.beforeEach((to,from,next) =>{
    const require_auth = to.meta.requiresAuth
    const permissions = to.meta.permissions
    if (require_auth) {
        if (!isLoginAuthenticated()) {
            //路由中设置了 requiresAuth 为 ture, 且没有登录时
            next({name:'Login'}) //重定向到登录
        } else {
            //针对已登录检测权限
            if (hasPermission(permissions)) {
                next() //已登录，允许访问
            } else {
                next({name: 'NoPermission'})
            }
        }
    } else { //不需要登录的
        next()
    }
})

export default router
