<script setup>
import TipsIcon from "@/pages/views/tips-icon.vue";
const ex = ref(true)
const popoverVisible=ref(false)

defineProps({
  rightItems: {
    type: Array,
    default: []
  },
  leftItems: {
    type: Array,
    default: []
  },
  avatar_url: {
    type: String,
    default:'statics/avatar.svg'
  },
  avatarMenus:{
    type: Array,
    default:[]
  }
})

// 定义事件 - 告诉父组件我们将触发 `onASideChange`
const emit = defineEmits([
  "onASideChange",
  "onLeftItemClicked",
  "onRightItemClicked",
  "onSettingClicked",
  "onAvatarMenuItemClicked"
]);

const icon_clicked = () => {
  ex.value = !ex.value
  emit('onASideChange',ex.value)
}

const rightItem_clicked = (item) => {
  emit('onRightItemClicked',item)
}

const leftItem_clicked = (item) => {
  emit('onLeftItemClicked',item)
}

const setting_clicked = () => {
  emit('onSettingClicked')
}

const dropdown_clicked = (item) => {
  popoverVisible.value = false
  emit('onAvatarMenuItemClicked',item)
}

</script>

<template>
    <el-row>
      <el-col :span="24" >
        <div class="left">
          <el-icon size="20" @click="icon_clicked">
            <Expand v-if="!ex"/>
            <Fold v-else/>
          </el-icon>
          <TipsIcon v-for="item in leftItems" :key="item.id"
                    class="elementItemSpace"
                    :content="item.hint_word"
                    :icon-url="item.icon_url"
                    :elementIconName="item.systemIcon"
                    @click="leftItem_clicked(item)" />
        </div>
        <div class="center">
          <slot></slot> <!-- 插槽位置 -->
        </div>
        <div class="right">
          <TipsIcon v-for="item in rightItems" :key="item.id"
                    class="elementItemSpace"
                    :content="item.hint_word"
                    :icon-url="item.icon_url"
                    :elementIconName="item.systemIcon"
                    @click="rightItem_clicked(item)" />
          <el-popover placement="bottom"
                      :width="60"
                      :visible="popoverVisible"
                      trigger="click">
            <template #reference>
              <el-image :src="avatar_url" @click.stop="popoverVisible = true"></el-image>
            </template>
            <ul class="custom-menu">
              <li class="menu-item"  v-for="item in avatarMenus" :key="item.id" @click="dropdown_clicked(item)">{{item.name}}</li>
            </ul>
          </el-popover>
          <TipsIcon elementIconName="Setting" content="项目设置" @click="setting_clicked"/>
        </div>
      </el-col>
    </el-row>
</template>

<style scoped>
.el-row {
  height: 100%;
}

.el-col {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.center {
  flex: 1;
  padding: 0 10px;
}

.right {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  margin-right: 30px;
}

.el-image {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
}

.elementItemSpace {
  margin: 0 3px;
}

.custom-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

</style>