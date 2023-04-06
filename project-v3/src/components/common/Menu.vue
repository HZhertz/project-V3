<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#1c1641"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
      >
        <template v-for="item in newMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="child in item.children" :key="child.id">
              <el-menu-item :index="child.path">
                <i :class="child.icon"></i>{{ child.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="ts" setup>
import { useRouteStore } from '@/store/menus.js'

const Route = useRouteStore()
const newMenus: NewMenus = Route.getNewMenus
</script>

<style lang="less" scoped>
.menu {
  .el-aside {
    height: 100%;
    .el-menu {
      background: #1c1641;
      height: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        //display: none;
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(144, 147, 153, 0.5);
        border-radius: 6px;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
      }
      .fa {
        margin-right: 10px;
      }
      .el-sub-menu .el-menu-item {
        min-width: 0;
      }
    }
  }
}
</style>
