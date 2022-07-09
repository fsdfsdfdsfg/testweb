<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="struName1" label="部位名称" width="180">
      </el-table-column>
      <el-table-column prop="struName2" label="结构名称" width="180">
      </el-table-column>
      <el-table-column prop="destName" label="损坏方式" width="180"> </el-table-column>
      <el-table-column prop="dScore" label="损坏得分" width="180"> </el-table-column>
      <el-table-column prop="struScore" label="结构得分" width="150"> </el-table-column>
      <el-table-column prop="totScore" label="部位得分" > </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showBridgeDetail",
  methods: {
    showBridgeDetail(){
      // axios.get(`http://localhost:8080/bridge/list?bridgeId=${this.bridgeId}`).then(
      axios.get('http://localhost:8080/bridge/list?bridgeId=1').then(
        (response) => {
          this.detailData=response.data.data;
          console.log(this.detailData);
        },
        (error) => {
          console.log("发送失败", error.message);
        }
      );
    }
  },
  mounted(){
    this.bridgeId=this.$route.query.bridgeId;
    axios.get(`http://localhost:8080/bridge/list?bridgeId=${this.bridgeId}`).then(
        (response) => {
          this.detailData=response.data.data;
          console.log(this.detailData)
          var that = this.detailData;
          var ret = this.tableData;
          var s1 , d,retobj;
          var s1name, s2name, dname,dscore,struscore,totscore;
          var ss1;
          s1name = "上部结构";
          totscore=that.upScore;
          //   console.log('hhhhdsa',that)
          s1 = that.upStructures;
          for (ss1 of s1) {

            console.log("hhhgfdgd", ss1.name);
            s2name = ss1.name;
            struscore=ss1.score;
            for (d of ss1.bridgeBreakScores) {
              //    console.log('hhhgfdgd',s2.name);
              dname = d.name;
              dscore = d.score;
              // console.log('hhhgfdgd',d.name);
              retobj={struName1:'',struName2:'',destName:'',dScore:'',struScore:'',totScore:''};
              retobj.struName1=s1name;
              retobj.struName2=s2name;
              retobj.destName=dname;
              retobj.dScore=dscore;
              retobj.struScore=struscore;
              retobj.totScore=totscore;

              ret.push(retobj)
            }
          }
          s1name = "桥面结构";
          totscore=that.deckScore;
          //   console.log('hhhhdsa',that)
          s1 = that.deckTemplate;
          for (ss1 of s1) {
            console.log("hhhgfdgd", ss1.name);
            s2name = ss1.name;
            struscore=ss1.score;
            for (d of ss1.bridgeBreakScores) {
              //    console.log('hhhgfdgd',s2.name);
              dname = d.name;
              dscore = d.score;
              // console.log('hhhgfdgd',d.name);
              retobj={struName1:'',struName2:'',destName:'',dScore:'',struScore:'',totScore:''};
              retobj.struName1=s1name;
              retobj.struName2=s2name;
              retobj.destName=dname;
              retobj.dScore=dscore;
              retobj.struScore=struscore;
              retobj.totScore=totscore;

              ret.push(retobj)
            }
          }
          s1name = "下部结构";
          totscore=that.downScore;
          //   console.log('hhhhdsa',that)
          s1 = that.downTemplate;
          for (ss1 of s1) {
            console.log("hhhgfdgd", ss1.name);
            s2name = ss1.name;
            struscore=ss1.score;
            for (d of ss1.bridgeBreakScores) {
              //    console.log('hhhgfdgd',s2.name);
              dname = d.name;
              dscore = d.score;
              // console.log('hhhgfdgd',d.name);
              retobj={struName1:'',struName2:'',destName:'',dScore:'',struScore:'',totScore:''};
              retobj.struName1=s1name;
              retobj.struName2=s2name;
              retobj.destName=dname;
              retobj.dScore=dscore;
              retobj.struScore=struscore;
              retobj.totScore=totscore;

              ret.push(retobj)
            }
          }
        },
        (error) => {
          console.log("发送失败", error.message);
        }
      );
  },
  data() {
    return {
      bridgeId:'',
      detailData:{},
      tableData:[]
    }
  }
};
</script>
<style scoped>
   .div1{
       display:-ms-inline-flexbox;
       background-color: aqua;
   }
</style>