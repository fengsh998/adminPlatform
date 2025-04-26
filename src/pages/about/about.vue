<script setup>
import { h, ref, resolveComponent} from 'vue';

const isAsideExpanded = ref(true);
// 示例菜单数据
const menus = ref([
  {
    id: "menu1",
    name: "Menu 1",
    icon: "PieChart",
    children: [
      {
        id: "submenu1",
        name: "Submenu 1",
        icon: "PieChart",
        children: [
          { id: "option1", name: "Option 1", icon: "PieChart" },
          { id: "option2", name: "Option 2", icon: "PieChart" },
        ],
      },
    ],
  },
  {
    id: "menu2",
    name: "Menu 2",
    icon: "PieChart",
  },
]);

// 动态生成菜单树
// title: () => h('span', [h(ElIcon, { size: 10 }, { default: () => h(resolveComponent(menu.icon)) }), menu.name]),
//title: () => h(ElIcon, { size: 10 }, { default: () => h(resolveComponent(menu.icon)), }), //h('span', null,menu.name)
const createMenuTree = (menuList) => {

    return menuList.map((menu) => {
      console.log(menu)
      if (menu.children && menu.children.length > 0) {
        // 递归生成子菜单
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
        // 生成菜单项
        return h(ElMenuItem, { index: menu.id }, {
          title: () => h('span', [h(ElIcon, { size: 10 }, { default: () => h(resolveComponent(menu.icon)) }), menu.name]),
        });
      }
    });
};

// 动态生成整个菜单
const createMenu = () => {
  return h(
      ElMenu,
      {
        defaultActive: menus.value[0]?.id.toString(),
        backgroundColor: "#545c64",
        textColor: "#fff",
        activeTextColor: "#ffd04b",
        collapse:!isAsideExpanded.value
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
</script>

<template>
  <!-- 挂载动态菜单 -->
  <div>About</div>
  <button @click="isAsideExpanded = !isAsideExpanded">Toggle Menu</button>
<!--  <DynamicMenu class="aa"/>-->
  <component :is="DynamicMenu" />

  <div>
    <el-popover
        :visible="visible"
        placement="bottom"
        width="200"
        trigger="click"
        @close="visible = false"
    >
      <template #reference>
        <el-button>弹出菜单</el-button>
      </template>
      <el-menu>
        <el-menu-item index="1">菜单项1</el-menu-item>
        <el-menu-item index="2">菜单项2</el-menu-item>
        <el-menu-item index="3">菜单项3</el-menu-item>
      </el-menu>
    </el-popover>
  </div>
</template>

<style scoped>
.el-menu--collapse .el-menu-item [class^="el-icon-"],
.el-menu--collapse .el-menu-item [class*=" el-icon-"] {
  margin-right: 0;
}
</style>
