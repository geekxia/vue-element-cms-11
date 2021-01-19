<template>
<div class="qf-layout">
  <el-container>
    <el-aside width="200px">
      <div class="qf-aside">
        <div>LoGO</div>
        <SiderBar />
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="qf-header">顶部导航栏</div>
      </el-header>
      <el-main>
        <div class="qf-main">
          <!-- 给路由中children来显示的 -->
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>

</div>
</template>

<script>
import SiderBar from './components/SiderBar.vue'
export default {
  components: {
    SiderBar
  }
}
</script>

<style lang="scss" scoped>
.qf-layout {
  height: 100%;
  &>.el-container {
    height: 100%;
  }
}

.el-header {
  padding-left: 0;
}
.el-main {
  padding: 15px;
}

.qf-aside {
  background: rgba(48, 65, 86, 1);
  color: white;
  height: 100%;
}
.qf-header {
  background: white;
  height: 100%;
  line-height: 60px;
  padding-left: 20px;
}
.qf-main {
  background: white;
  height: 100%;
  padding: 15px;
  min-width: 800px;
}
</style>
