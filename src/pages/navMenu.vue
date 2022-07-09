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
            <el-menu-item @click="showReport">查看报告</el-menu-item>
            <el-menu-item index="bookList">图书列表管理</el-menu-item>
            <el-menu-item index="addBook">添加图书</el-menu-item>
            <el-menu-item index="findBook">查找图书</el-menu-item>
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
      },
      showReport(){
        window.open("report.html")
      }
    }
  }
</script>