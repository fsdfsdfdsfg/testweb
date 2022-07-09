<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="struName1" label="部位名称" width="300">
      </el-table-column>
      <el-table-column prop="struName2" label="结构名称" width="300">
      </el-table-column>
      <el-table-column prop="destName" label="损坏方式" width="300"> </el-table-column>
      <el-table-column prop="weight" label="权值"> </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
            <el-button type="text" size="small" circle="true" @click="doScore(scope.row.id,scope.row.name)">评分</el-button> 
            <el-button type="text" size="small" circle="true" @click="showBridgeScore(scope.row.id,scope.row.name)">查看得分</el-button>
            <el-button type="text" size="small" circle="true" @click="showBridgeDetail(scope.row.id)">查看详细</el-button>
            <el-button type="text" size="small" circle="true" @click="delete1(scope.row.id)">删除</el-button> 
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <router-view></router-view> -->
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "showTemplateDetail",
  data() {
    return {
      detailData: "",
      typeId: "",
      tableData: [],
    };
  },
  mounted() {
    this.typeId = this.$route.query.typeId;
    console.log(this.typeId);
    axios.get(`http://localhost:8080/type/template?typeId=${this.typeId}`).then(
      (response) => {
        if (response.data.code == 200) {
          //   console.log(response.data.data);
          this.detailData = response.data.data;
          // console.log("hhh", this.detailData);
          var that = this.detailData;
          var ret = this.tableData;
          var s1, w, d,retobj;
          var s1name, s2name, dname;
          var ss1;
          s1name = "上部结构";
          //   console.log('hhhhdsa',that)
          s1 = that.upTemplate;
          for (ss1 of s1) {
            w = ss1.weight;
            console.log("hhhgfdgd234", ss1);
            s2name = ss1.name;
            for (d of ss1.breakTypeTemplates){
                //  console.log('hhh546',d.name);
              dname = d.name;
              // console.log('hhhgfdgd',d.name);
              retobj={struName1:'',struName2:'',destName:'',weight:''};
              retobj.struName1=s1name;
              retobj.struName2=s2name;
              retobj.destName=dname;
              retobj.weight=w;

              ret.push(retobj)
            }
          }
          s1name = "桥面结构";
          //   console.log('hhhhdsa',that)
          s1 = that.deckTemplate;
          for (ss1 of s1) {
            w = ss1.weight;
            console.log("hhhgfdgd", ss1.name);
            s2name = ss1.name;
            for (d of ss1.breakTypeTemplates) {
              //    console.log('hhhgfdgd',s2.name);
              dname = d.name;
              // console.log('hhhgfdgd',d.name);
              retobj={struName1:'',struName2:'',destName:'',weight:''};
              retobj.struName1=s1name;
              retobj.struName2=s2name;
              retobj.destName=dname;
              retobj.weight=w;
              
              ret.push(retobj)
            }
          }
          s1name = "下部结构";
          //   console.log('hhhhdsa',that)
          s1 = that.downTemplate;
          for (ss1 of s1) {
            w = ss1.weight;
            console.log("hhhgfdgd", ss1.name);
            s2name = ss1.name;
            for (d of ss1.breakTypeTemplates) {
              //    console.log('hhhgfdgd',s2.name);
              dname = d.name;
              // console.log('hhhgfdgd',d.name);
              retobj={struName1:'',struName2:'',destName:'',weight:''};
              retobj.struName1=s1name;
              retobj.struName2=s2name;
              retobj.destName=dname;
              retobj.weight=w;
              
              ret.push(retobj)
            }
          }

          console.log("kkkkk", this.tableData);
        } else {
          this.$message({
            type: "error",
            message: "获取数据失败!",
          });
        }
        // console.log(response.data.data)
      },
      (error) => {
        console.log("发送失败", error.message);
        this.$message({
          type: "error",
          message: "发送请求失败!" + error.message,
        });
      }
    );
  },
};
</script>