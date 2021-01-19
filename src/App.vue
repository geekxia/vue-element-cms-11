<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
html,body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  background: rgba(250,250,250,1);
  font-size: 14px;
}
.app {
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
}
</style>
