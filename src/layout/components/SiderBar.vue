<template>
<div class="qf-sider-bar">

  <!-- :default-active="activeMenu" -->
  <!-- :collapse="isCollapse" -->
  <!--  -->
  <el-menu
    :active-text-color="variables.menuActiveText"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="true"
    :collapse-transition="false"
    mode="vertical"
  >
    <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
    <el-submenu
      v-for='(item1,index) in routes'
      :index='index+""'
      :key='item1.path'
      v-show='!item1.hidden'
    >
      <template slot="title">
        <i :class="item1.icon"></i>
        <span slot="title" v-text='item1.text'></span>
      </template>
      <el-menu-item
        index="1-1"
        v-for='item2 in item1.children'
        :key='item2.path'
        v-show='!item2.hidden'
      >
        <router-link
          :to='item1.path+item2.path'
          tag='div'
          exact-active-class='on'
          v-text='item2.text' />
      </el-menu-item>
    </el-submenu>
  </el-menu>

</div>
</template>

<script>

import variables from '@/style/variables.scss'
import { constantRoutes } from '@/router'

export default {
  data: function() {
    return {
      routes: constantRoutes
    }
  },
  computed: {
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-sider-bar {
  .on {
    color: #409EFF;
  }
}
</style>
