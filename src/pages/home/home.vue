<script setup>
import {h, ref, resolveComponent, onMounted, computed} from "vue";

import { useRouter } from 'vue-router';
import menus_mock from '@/mock/menus_mock.js'
import Header from '@/pages/views/header-frame.vue'
import { userLoginStore } from '@/stores/login-store.js'
const store = userLoginStore()

const router = useRouter();
const project_name = ref("管理平台")
const isAsideExpanded = ref(true)
const asideWidth = computed(() => isAsideExpanded.value ? '260px' : '64px')
const menus = ref(menus_mock)
const default_active_menu_id = ref('')

onMounted(()=>{
  defaultActiveMenu()
})

//首页打开时默认激活项
const defaultActiveMenu = () => {
  const atcive = menus.value[0]?.children[0]?.id
  const rn = menus.value[0]?.children[0]?.routeName
  default_active_menu_id.value = atcive
  router.push({name:rn});
}

//<el-menu-item-group> 是不能响应任何点击的节点，只能浏览
//下面两个事件是 el-sub-menu 响应的事件
const menu_handleOpen = (key, keyPath) => {
  // console.log("展开菜单：", key, keyPath)
}
const menu_handleClose = (key, keyPath) => {
  // console.log("收起菜单：", key, keyPath)
}
//只有el-menu-item 才能响应该事件
const menu_selectedClicked = (key, keyPath) => {
  // console.log("点击了菜单：", key , keyPath)
  router.push({ name: "DataAnalysis" });
}

const handleMenuItemClick = (menuItem) => {
  // console.log("点击了菜单项：", menuItem);
  // 根据菜单项对象进行路由跳转或其他操作
  if (menuItem.routeName) {
    router.push({name:menuItem.routeName});
  }
};

// 动态生成菜单树
// 菜单中使用()=>{}或()=>[] 表过插槽嵌入的方式
const createMenuTree = (menuList) => {
  return menuList.map((menu) => {
    if (menu.children && menu.children.length > 0) {
      // 递归生成子菜单
      if (menu.icon) {
        return h(
            ElSubMenu,
            { index: menu.id },
            {
              title: () => [
                h(ElIcon, () => h(resolveComponent(menu.icon))),
                h('span', menu.name)
              ],
              default: () => createMenuTree(menu.children),
            });
      } else {
        return h(
            ElSubMenu,
            { index: menu.id },
            {
              title: () => h('span', [menu.name]),
              default: () => createMenuTree(menu.children),
            });
      }
    } else { //可点击的区菜单
      if (menu.icon) {
        // 生成菜单项
        return h(ElMenuItem, { index: menu.id ,onClick: () => handleMenuItemClick(menu)}, {
          default: () => [
            h(ElIcon, () => h(resolveComponent(menu.icon))),
            h('span', menu.name)
          ],
        });
      } else {
        return h(ElMenuItem, { index: menu.id , onClick: () => handleMenuItemClick(menu)}, {
          default: () => h('span', [menu.name]),
        });
      }
    }
  });
};

// 动态生成整个菜单
const createMenu = () => {
  return h(
      ElMenu,
      {
        //默认击活的菜单id
        defaultActive: default_active_menu_id.value,
        // backgroundColor: "#545c64",
        textColor: "#000",
        activeTextColor: "#1E90FF",
        collapse:!isAsideExpanded.value,
        onOpen: menu_handleOpen,
        onClose: menu_handleClose,
        // onSelect: menu_selectedClicked
      },
      {
        default: () => createMenuTree(menus.value),
      }
  );
};

// 动态创建的菜单组件
const DynamicMenu = {
  name: "DynamicMenu",
  render() {
    return createMenu();
  }
};

//====================== header 点击=====================
const showLoginAlter = (route) => {
  ElMessageBox.confirm(
      '确认要退出登录吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        store.reset()
        router.push({name:route})
      })
      .catch(() => {

      })
}
const header_right_items = ref([
  {
    id:'search',
    hint_word:'搜索',
    systemIcon:'Search',
  },
  {
    id:'github',
    hint_word:'github',
    icon_url:'statics/github.png',
  },
  {
    id:'lockscreen',
    hint_word:'锁屏',
    systemIcon:'Lock',
  },
  {
    id:'fullscreen',
    hint_word:'全屏',
    icon_url:'statics/fullscreen.svg',
  },
])

const header_left_items = ref([
  {
    id:'refresh',
    hint_word:'刷新',
    systemIcon:'Refresh',
  }
])

const avatar_menus = ref([
  {
    id: "profile",
    name: "个信信息",
    route: ''
  },
  {
    id: "logout",
    name: "退出登录",
    route: 'Login'
  }
])

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    // 如果当前不是全屏状态，则尝试进入全屏
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // 如果当前是全屏状态，则退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}

const onSideChange = (isExpand) => {
  isAsideExpanded.value = isExpand
}
const onAvatarMenuItemClicked = (itemSender) => {
  console.log(itemSender)
  if (itemSender.id === 'logout') {
    showLoginAlter(itemSender.route)
  }
}

const onLeftItemClicked = (sender) => {
  console.log("左Item",sender)
  if (sender.id === 'refresh') {
    router.replace(router.currentRoute.value.fullPath)
  }
}

const onRightItemClicked = (sender) => {
  console.log("右Item",sender)
  if (sender.id === 'fullscreen') {
    toggleFullscreen()
  }
}

const onSettingClicked = () => {

}

</script>

<template>
  <el-container class="main_container">
    <el-aside :width="asideWidth">
      <div class="aside_top">
        <div class="aside_title">
          <span><el-text v-show="isAsideExpanded">{{project_name}}</el-text></span>
        </div>
      </div>
      <el-scrollbar>
<!--        <el-menu-->
<!--            default-active="0"-->
<!--            @open="menu_handleOpen"-->
<!--            @close="menu_handleClose"-->
<!--            @select="menu_selectedClicked"-->
<!--            :collapse="!isAsideExpanded"-->
<!--            >-->
<!--          <template v-for="menu in menus" :key="menu.id">-->
<!--            <el-sub-menu :index="menu.id" v-if="menu.children !== undefined && menu.children.length > 0">-->
<!--              <template #title>-->
<!--                <el-icon><component :is="menu.icon" /></el-icon><span>{{ menu.name }}</span>-->
<!--              </template>-->
<!--              <el-menu-item v-for="child in menu.children" :key="child.id" :index="child.id">-->
<!--                <el-icon><component :is="child.icon" /></el-icon><span>{{ child.name }}</span>-->
<!--              </el-menu-item>-->
<!--            </el-sub-menu>-->
<!--            <el-menu-item v-else :index="menu.id">-->
<!--              <el-icon><component :is="menu.icon" /></el-icon><span>{{ menu.name }}</span>-->
<!--            </el-menu-item>-->
<!--          </template>-->
<!--        </el-menu>-->
        <component :is="DynamicMenu" />
      </el-scrollbar>
    </el-aside>
    <el-container class="content_container">
      <el-header class="header-with-border">
        <component :is="Header"
                   :leftItems="header_left_items"
                   :rightItems="header_right_items"
                   :avatarMenus="avatar_menus"
                   @onAvatarMenuItemClicked="onAvatarMenuItemClicked"
                   @onLeftItemClicked="onLeftItemClicked"
                   @onRightItemClicked="onRightItemClicked"
                   @onSettingClicked="onSettingClicked"
                   @onASideChange="onSideChange">
          <template #default>
            <!-- 这里是自定义的插槽内容 -->
            <div class="title-view">自定义内容</div>
          </template>
        </component>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer class="footer-with-border">Footer</el-footer>
    </el-container>
  </el-container>

</template>

<style scoped>
.main_container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}

.content_container {
  flex: 1;
}

.el-aside {
  transition: width 0.3s; /* 动画过渡时间设置为0.3秒 */
}

.aside_top {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: #1E90FF;
  height: 60px;
}

.aside_title {
  flex: 1;
  height: 100%;
}

.el-aside .el-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: bold;
  color: white;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.header-with-border {
  border-bottom: 1px solid #ebeef5;
  padding: 0 5px;
}

.footer-with-border {
  border-top: 1px solid #ebeef5;
  padding: 0;
}

.title-view {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}


</style>
