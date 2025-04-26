//主格式
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './route/router.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'

//pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
app.use(pinia).use(router).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key,component)
}
