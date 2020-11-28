<template>
  <div id="headerPage">
    <div class="mask"></div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo flex-between"
      mode="horizontal"
      @select="handleSelect"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff" router>
      <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
        <el-submenu :index="index+''" v-if="item.hasChild && !item.isTitle">
          <!--用el ui 的title进行solt分发菜单-->
          <template slot="title">{{item.menuName}}</template>
          <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="child.menuShow" class="menu-tabs">
            <router-link :to="child.path">{{child.menuName}}</router-link>
          </el-menu-item>
        </el-submenu>
        <!--当没有子路由时-->
        <el-menu-item :index="item.path" v-if="!item.hasChild && !item.isTitle" class="menu-tabs">
          <router-link :to="item.path">{{item.menuName}}</router-link>
        </el-menu-item>
        <div class="logo-title flex-mid-center" v-if="item.isTitle">
          <div class="logo-bg">
            <span class="logo-word">嘉陵区社区管控平台</span>
          </div>
        </div>
      </template>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        routeList: [],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
      },
      loginOutFn(){
        this.$store.commit('del_menu');
        this.$store.commit('del_userInfo');
        this.$router.push('/login')
      }
    },
    mounted() {

    }
  }

</script>
<style lang="scss" scoped>
</style>
