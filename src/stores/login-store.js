import { defineStore } from 'pinia'

export const userLoginStore = defineStore('loginData', {
    //类似的data声明
    state: () => ({ token: '',is_login: false }),
    persist: true, // 启用持久化
    //类似计算属性
    getters: {
        isLogin: (st) => st.is_login
    },
    //类似于method
    actions: {
        setLoginFlag(success) {
            this.is_login = success
        },
        setLoginToken(tk) {
            this.token = tk
        },
        reset() {
            this.token = ''
            this.is_login = false
        }

    }
})