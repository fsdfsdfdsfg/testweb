<template>
  <div>
    <el-table :data="tableData" @row-click="test" style="width: 100%">
      <el-table-column prop="name" label="桥梁名称" width="180">
      </el-table-column>
      <el-table-column prop="bridgeType.name" label="桥梁类型" width="180">
      </el-table-column>
      <el-table-column prop="province" label="省"> </el-table-column>
      <el-table-column prop="city" label="市"> </el-table-column>
      <el-table-column prop="region" label="区"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <!-- <el-button type="text" size="small" circle="true">评分</el-button> -->
        <!-- <el-button type="text" size="small" circle="true">删除</el-button> -->
        <el-popover placement="right" width="600" trigger="click">
          <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="巡检区域">
              <el-select v-model="form.region" placeholder="请选择巡检区域" @change="onchange">
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
                ></el-option>
              </el-select>
            </el-form-item>
            <div v-for="(item,index) in scoreStru" :key="index">
               结构名称：{{item.name}}
               <div v-for="(item2,index2) in item.bridgeBreakScores" :key="index2">
                    损坏类型：{{item2.name}}<input type="text"/>
               </div>
            </div>
            <el-form-item label="巡检时间">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">评分</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          </div>
          <el-button type="text" size="small" slot="reference">评分</el-button>
        </el-popover>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchBridge",
  methods: {
    handleClick(row) {
      console.log(row);
    },
    getBridgeData(obj) {
      // console.log(obj);
      axios.get(`http://localhost:8080/bridge/list?bridgeId=${obj.id}`).then(
        (response) => {
          this.tableData2 = response.data.data;
          console.log(this.tableData2);
        },
        (error) => {
          console.log("发送失败", error.message);
        }
      );
    },
    test(row) {
      this.getBridgeData(row);
    },
    doScoreUp() {
      this.scoreStru = this.tableData2.upStructures;
      console.log(this.scoreStru)
    },
    doScoreDeck() {
      this.scoreStru = this.tableData2.deckStructures;
      console.log(this.scoreStru)
    },
    doScoreDown() {
      this.scoreStru = this.tableData2.downStructures;
      console.log(this.scoreStru)
    },
    onchange(e)
    {
      this.$forceUpdate()
      this.$set(this.form,this.form.region,'不存在的结构'),
      console.log('beigaibianle',e),
      this.form.region=e,
      console.log(this.form.region)
    },
    delete(obj){
      axios.get(`http://localhost:8080/bridge/delete?bridgeId=${obj.id}`).then(
        (response) => {
          this.tableData2 = response.data.data;
          console.log(this.tableData2);
        },
        (error) => {
          console.log("发送失败", error.message);
        }
      );
    }
  },
  watch:{
       form:{
         deep:true,
         handler(){
           console.log('bianl')
         }
       }
    },
  mounted() {
    axios.get("http://localhost:8080/bridge/listAll").then(
      (response) => {
        this.tableData = response.data.data;
      },
      (error) => {
        console.log("发送失败", error.message);
      }
    );
  },
  data() {
    return {
      tableData: [],
      // bridgename: "",
      tableData2: [],
      scoreStru: [],
      form: {
        name: "",
        region: "没有的结构",
        date1: "2022-7-4",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
};
</script>