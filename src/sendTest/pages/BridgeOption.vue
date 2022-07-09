<template>
    <div>
        <div v-if="$bus.isShow" class="chooseBridge">
        <h3>请输入桥梁建造点</h3>
        <VDistpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></VDistpicker>
        <p>您选择了{{province}}{{city}}{{area}}</p>
        <p>请输入桥梁名称：<input type='text'></p>
        <p>请选择桥梁类型：</p>
        <el-radio v-model="radio" v-for="(b,index) in bridges" :key="b.id" :label="index" @change="add">{{b.name}}</el-radio>
        <br>
        <!-- <button @click="add">确定</button> -->
        <el-row v-for="b in upTemplate" :key="b.id">
          <el-col span="2" :offset="9">{{b.name}}</el-col>
          <el-col span="2"><input type="text"></el-col>
        </el-row>
        <el-row v-for="b in deckTemplate" :key="b.id">
          <el-col span="2" :offset="9">{{b.name}}</el-col>
          <el-col span="2"><input type="text"></el-col>
        </el-row>
        <el-row v-for="b in downTemplate" :key="b.id">
          <el-col span="2" :offset="9">{{b.name}}</el-col>
          <el-col span="2"><input type="text"></el-col>
        </el-row>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
  import VDistpicker from 'v-distpicker'
  import axios from 'axios'
  export default {
    data () {
      return {
        radio:'',
        bridges:[],
        upTemplate:{},
        deckTemplate:[],
        downTemplate:[],
        province:'',
        city:'',
        area:''
      }
    },
    mounted(){
        axios.get('http://localhost:8080/type/listAll').then(
          response => { 
            // console.log(response.data)
            this.bridges=response.data.data
          },
          error => {
            console.log('还是出错了！',error.message)
          }
        )
    },
    components:{VDistpicker},
    methods:{
       add(){
        //  console.log("我的id是",this.radio+1),
         axios.get(`http://localhost:8080/type/template?typeId=${this.radio+1}`).then(
          response => { 
            // console.log("发送成功",response.data.data.upTemplate)
            // this.upTemplate={...this.upTemplate,...response.data.data.upTemplate},
            this.upTemplate=response.data.data.upTemplate,
            console.log(this.upTemplate),
            this.deckTemplate=response.data.data.deckTemplate,
            this.downTemplate=response.data.data.downTemplate
          },
          error => {
            console.log("发送失败",error.message)
          }
        )
       },
       onChangeProvince(a){
         this.province=a.value
       },
       onChangeCity(a){
         this.city=a.value
       },
       onChangeArea(a){
         this.area=a.value
       },
    }
  }
</script>
<style scoped>
   .chooseBridge{
     background-color: rgb(105, 161, 165);
   }
</style>