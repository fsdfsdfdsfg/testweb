<template>
  <div id="app" >
    <navMenu></navMenu>
    <!-- <div class="top">
       <h3>欢迎使用桥梁评估系统</h3>
    </div>
    <el-row>
      <el-button type="success" @click="addBridge">添加桥梁</el-button>
      <el-button type="success" @click="showBridge">查看桥梁</el-button>
      <el-button type="success" @click="addTemplate">添加模板</el-button>
      <el-button type="success" @click="searchBridgeType">模糊查询桥梁类型</el-button>
      <el-button type="success" @click="searchBridgeNameLike">模糊查询桥梁</el-button>
      <el-button type="success" @click="showBridgeDetail">查看桥梁详细</el-button>
      <el-button type="success" @click="showBridgeScore">查看桥梁得分</el-button>
      <el-button type="success" @click="showTemplateDetail">查看模板详细</el-button>
      <router-view></router-view>
    </el-row>-->
    <!-- <input onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
    <input name=txt1 onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" autocomplete="off">
    <input type="text" name="text" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" />  -->
  </div> 
</template>

<script>
import navMenu from './components/navMenu.vue'
export default {
  name: 'App',
  data(){
     return{
       age:''
     }
  },
  methods:{
    addBridge(){
      this.$router.push({
        name:'AddBridge'
      })
    },
    showBridge(){
      this.$router.push({
        name:'ShowBridges'
      })
    },
    addTemplate(){
      this.$router.push({
        name:'addTemplate'
      })
    },
    // addNewBridgeType(){
    //   this.$router.push({
    //     name:'addNewBridgeType'
    //   })
    // },
    searchBridgeNameLike(){
      this.$router.push({
        name:'searchBridgeNameLike'
      })
    },
    searchBridgeType(){
      this.$router.push({
        name:'searchBridgeType'
      })
    },
    showBridgeDetail(){
      this.$router.push({
        name:'showBridgeDetail'
      })
    },
    showBridgeScore(){
      this.$router.push({
        name:'showBridgeScore'
      })
    },
    showTemplateDetail()
    {
      this.$router.push({
        name:'showTemplateDetail'
      })
    }
  },
  mounted(){
    this.$bus.isShow=true
  },
  components:{navMenu}
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.top{
  background-color: rgb(66, 116, 180);
  width: 100%;
  height: 50px;
}
</style>
