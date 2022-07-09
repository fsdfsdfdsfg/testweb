<template>
  <div>
    <h2>您现在正在给{{bridgeName}}巡检打分</h2>
    巡检类型：
    <el-select v-model="value" placeholder="请选择检查类型">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <!-- 巡检类型：
    <el-radio v-model="radio" label="1" value=1>日常</el-radio>
    <el-radio v-model="radio" label="2" value=2>定期</el-radio>
    <el-radio v-model="radio" label="3" value=3>特殊</el-radio> -->

    <el-row>
      <el-col span="2" offset="9">巡检区域</el-col>
      <el-col span="4"
        ><el-select
          v-model="form.region"
          placeholder="请选择巡检区域"
          @change="onchange"
        >
          <el-option
            label="上部结构"
            value="up"
            @click.native="doScoreUp"
          ></el-option>
          <el-option
            label="桥面系结构"
            value="deck"
            @click.native="doScoreDeck"
          ></el-option>
          <el-option
            label="下部结构"
            value="down"
            @click.native="doScoreDown"
          ></el-option> </el-select
      ></el-col>
    </el-row>

    <div v-for="(item, index) in stru" :key="index">
      <el-row>
        <el-col span="2" offset="9">结构名称：</el-col>
        <el-col span="2">{{ item.name }}</el-col>
        <el-col span="2">备注</el-col>
        <el-col span="2">{{ item.remark }}</el-col>
      </el-row>
      <br />
      <el-row>
        <el-col span="2" offset="9">损坏类型： </el-col>
      </el-row>
      <div v-for="(item2, index2) in item.bridgeBreakScores" :key="index2">
        <el-row>
          <el-col span="2" offset="11">{{ item2.name }} </el-col>
            <input
              type="text"
              @change="addScoreToItem(item2)"
              @keyup.enter="search"
              @input="search($event)"
              name=txt1 onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" autocomplete="off"
          />
        </el-row>
        <!-- <br> -->
      </div>
    </div>
     
     <el-row>
      <el-col span="2" offset="9">评分日期</el-col>
      <el-col span="4"
        ><el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        ></el-date-picker
      ></el-col>
    </el-row>


    <el-row>
      <el-col span="2" offset="9">评分人</el-col>
      <el-col span="2"><input type="text" id= "inspector"/></el-col>
    </el-row>

    <el-button @click="postScore">确定评分</el-button>

  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

import axios from "axios";

export default {
  name: "doScore",
  data() {
    return {
      bridgeId:this.$route.query.id,
      stru: [],
      scoreStru: [],
      scoreOfInput:"",
      // radio:1,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      retData: {
        bridgeId: "",
        // partId:"",
        upStructures: [],
        deckStructures: [],
        downStructures: [],
        checkLog: {
          time: "",
          inspector: "",
          partId: "",
          checkType: "",
        },
      },
      options: [{
          value: '1',
          label: '定期检查'
        }, {
          value: '0',
          label: '日常检查'
        }, {
          value: '2',
          label: '特殊检查'
        }],
        value: '',
        bridgeName:''
    };
  },
  methods: {
     search(event) {
      this.scoreOfInput = event.currentTarget.value;
      // console.log(event.currentTarget.value);
    },
    doScoreUp() {
      console.log(this.scoreStru);
      this.upStructures="";
      this.downStructures="";
      this.deckStructures="";
      this.stru = this.scoreStru.upStructures;
      // console.log(this.stru);
      this.retData.checkLog.partId=0;
    },
    doScoreDeck() {
      this.upStructures="";
      this.downStructures="";
      this.deckStructures="";
      this.stru = this.scoreStru.deckStructures;
      this.retData.checkLog.partId=2;
    },
    doScoreDown() {
      this.upStructures="";
      this.downStructures="";
      this.deckStructures="";
      this.stru = this.scoreStru.downStructures;
      this.retData.checkLog.partId=1;
    },
    addScoreToItem(item){
      item.score=this.scoreOfInput;
    },
    getBridgeById() {
      axios
        .get(`http://localhost:8080/bridge/list?bridgeId=${this.bridgeId}`)
        .then(
          (response) => {
            this.scoreStru = response.data.data;
            // console.log(this.scoreStru);
          },
          (error) => {
            console.log("发送失败", error.message);
          }
        );
    },
    postScore() {
      console.log("post")
      var that=this.retData;

      if(that.checkLog.partId==0){
        that.upStructures=this.stru;
      }
      else if(that.checkLog.partId==1){
        that.downStructures=this.stru;
      }
      else if(that.checkLog.partId==2){
        that.deckStructures=this.stru;
      }
      that.bridgeId=this.bridgeId;
      that.checkLog.inspector=document.getElementById("inspector").value;
      that.checkLog.checkType=this.value;
      that.checkLog.time= this.form.date1;

      console.log("bridgeId:"+this.bridgeId);
      // console.log("巡检时间:"+this.form.date1);

      axios
        .post("http://localhost:8080/bridge/score", this.retData)
        .then((response) => {
          console.log(response);
          if(response.data.data.code==200)
          {
            this.$message({
                      type: 'success',
                      message: '评分成功!'
                      })
            this.$router.push('ShowBridges')
          }
          else
          {
            this.$message({
                    type: 'error',
                    message: '评分失败!'+response.data.data.message
                    })
          }
        }),
        (error) => {
                console.log("删除失败", error.message);
                this.$message({
                    type: 'error',
                    message: '评分失败!'+error.message
                    })
                this.$router.push('ShowBridges')
        };
    },
  },
  mounted() {
    this.getBridgeById();
    console.log(this.bridgeId);
    this.bridgeName=this.$route.query.bridgeName
  }
};
</script>
<el-form-item
      label="年龄"
      prop="age"
      :rules="[
        { required: true, message: '年龄不能为空'},
        { type: 'number', message: '年龄必须为数字值'}
      ]"
      >
      <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
    </el-form-item>