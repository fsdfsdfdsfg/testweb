<template>
  <div>
    <div>
      <h3>请输入桥梁建造点</h3>
      <VDistpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></VDistpicker>
      <!-- <p>您选择了{{ province }}{{ city }}{{ area }}</p> -->
      <p>请输入桥梁名称：<input type="text" id= "bridgename"/></p>
      <p>请选择桥梁类型：</p>
      <el-select v-model="value" placeholder="请选择桥梁类型">
          <el-option
            v-for="b in bridges"
            :key="b.id"
            :label="b.name"
            :value="b.name"
            @click.native="add(b)"
            >
          </el-option>
      </el-select>
      <!-- <el-radio
        v-model="radio"
        v-for="(b, index) in bridges"
        :key="b.id"
        :label="index"
        @change="add(b)"
        >{{ b.name }}</el-radio
      > -->
      <br />
      <!-- <button @click="add">确定</button> -->
      <el-row>
        <el-col span="2" :offset="4">上部</el-col>
      </el-row>

      <el-row v-for="b in upTemplate" :key="b.id">
        <el-col span="2" :offset="9">{{ b.name }}</el-col>
        <el-col span="2"
          ><input
            type="text"
            @change="addStru(b)"
            @keyup.enter="search"
            @input="search($event)"
        /></el-col>
      </el-row>

      <el-row>
        <el-col span="2" :offset="4">桥面</el-col>
      </el-row>

      <el-row v-for="b in deckTemplate" :key="b.id">
        <el-col span="2" :offset="9">{{ b.name }}</el-col>
        <el-col span="2"
          ><input
            type="text"
            @change="addStru(b)"
            @keyup.enter="search"
            @input="search($event)"
        /></el-col>
      </el-row>

      <el-row>
        <el-col span="2" :offset="4">下部</el-col>
      </el-row>

      <el-row v-for="b in downTemplate" :key="b.id">
        <el-col span="2" :offset="9">{{ b.name }}</el-col>
        <el-col span="2"
          ><input
            type="text"
            @change="addStru(b)"
            @keyup.enter="search"
            @input="search($event)"
        /></el-col>
      </el-row>
      <button @click="addBridge">添加桥梁</button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import axios from "axios";
// import { component } from 'vue/types/umd';
export default {
  name: "AddBridge",
  data() {
    return {
      radio: "",
      bridges: [],
      upTemplate: [],
      deckTemplate: [],
      downTemplate: [],
      bridgeType: { id: "0" },
      num: "",
      province: "",
      city: "",
      area: "",
      retData: {
        name: "",
        // bridgeType: {},
        typeId: "",
        upStructures: [],
        downStructures: [],
        deckStructures: [],
        province: "",
        city: "",
        region: "",
      },
      value: ''
    };
  },
  mounted() {
    axios.get("http://localhost:8080/type/listAll").then(
      (response) => {
        // console.log(response.data)
        this.bridges = response.data.data;
      },
      (error) => {
        console.log("还是出错了！", error.message);
      }
    );
  },
  components: { VDistpicker },
  methods: {
    search(event) {
      this.num = event.currentTarget.value;
      console.log(event.currentTarget.value);
    },

    addStru(Tem) {
      console.log("Tem.num是"+Tem.num);
      if (Tem.num == undefined) {
        Tem["num"]=this.num;
        console.log(Tem);
      } else {
        Tem.num = this.num;
      }
    },

    addBridge() {
      this.retData.name=document.getElementById("bridgename").value;
      this.retData.city=this.city;
      this.retData.province=this.province;
      this.retData.region=this.area;
      var i = 0,j,len,num,tem;
      tem = this.upTemplate, len = tem.length;
      for (i=0;i<len;i++) {
        //遍历构件
        num = parseInt(tem[i].num)
        for (j = 0; j < num; j++) {
          //遍历一种构件的数量
          this.retData.upStructures.push({
            structureTmpId: tem[i].id,
            remark: tem[i].name + j,
          });
        }
      }
      tem = this.deckTemplate, len = tem.length;
      for (i=0;i<len;i++) {
        //遍历构件
        num = parseInt(tem[i].num)
        for (j = 0; j < num; j++) {
          //遍历一种构件的数量
          this.retData.deckStructures.push({
            structureTmpId: tem[i].id,
            remark: tem[i].name + j,
          });
        }
      }

      tem = this.downTemplate, len = tem.length;
      for (i=0;i<len;i++) {
        //遍历构件
        num = parseInt(tem[i].num)
        for (j = 0; j < num; j++) {
          //遍历一种构件的数量
          this.retData.downStructures.push({
            structureTmpId: tem[i].id,
            remark: tem[i].name + j,
          });
        }
      }

      axios
        .post("http://localhost:8080/bridge/add", this.retData)
        .then((response) => {
          console.log(this.upTemplate);
          console.log(this.retData);
          console.log(response);
            this.$confirm('添加桥梁成功', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => {
                this.$router.push('ShowBridges');
            });
        });
    },
    add(Tem) {
      console.log("我的id是",Tem.id),
      axios
        .get(`http://localhost:8080/type/template?typeId=${Tem.id}`)
        .then(
          (response) => {
            // console.log("发送成功",response.data.data.upTemplate)
            // this.upTemplate={...this.upTemplate,...response.data.data.upTemplate},
            (this.upTemplate = response.data.data.upTemplate),
              console.log("撒大声地撒",response.data.data),
              (this.deckTemplate = response.data.data.deckTemplate),
              (this.downTemplate = response.data.data.downTemplate),
              (this.retData.typeId = Tem.id);
            // console.log(this.bridgeType.id);
          },
          (error) => {
            console.log("发送失败", error.message);
          }
        );
    },
    onChangeProvince(a) {
      this.province = a.value;
    },
    onChangeCity(a) {
      this.city = a.value;
    },
    onChangeArea(a) {
      this.area = a.value;
    },
  },
};
</script>
<style scoped>
.chooseBridge {
  background-color: rgb(105, 161, 165);
}
</style>