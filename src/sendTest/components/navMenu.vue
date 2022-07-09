<template>
  <div>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" router>
            <el-menu-item index="addTemplate">添加模板</el-menu-item>
            <el-submenu index="2">
                <template slot="title">桥梁管理</template>
                <el-menu-item index="ShowBridges">查看桥梁列表</el-menu-item>
                <el-menu-item index="AddBridge">添加桥梁</el-menu-item>
                <el-menu-item index="searchBridgeNameLike">模糊查询桥梁</el-menu-item>
            </el-submenu>
            <el-menu-item index="searchBridgeType">桥梁类型查询</el-menu-item>
        </el-menu>
        <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name:'navMenu',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>