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
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
            <el-button type="text" size="small" circle="true" @click="doScore(scope.row.id,scope.row.name)">评分</el-button> 
            <el-button type="text" size="small" circle="true" @click="showBridgeScore(scope.row.id,scope.row.name)">查看得分</el-button>
            <el-button type="text" size="small" circle="true" @click="showBridgeDetail(scope.row.id)">查看详细</el-button>
            <el-button type="text" size="small" circle="true" @click="delete1(scope.row.id)">删除</el-button> 
        </template>
      </el-table-column>
    </el-table>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowBridges",
  methods: {
    handleClick(row) {
      console.log(row);
      console.log('hhh')
    },
    delete1(id) {
      this.$confirm('此操作将删除该条数据,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定
                axios.get(`http://localhost:8080/bridge/delete?bridgeId=${id}`).then(
                  (response) => {
                    console.log(response.data);
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    }),
                    axios.get("http://localhost:8080/bridge/listAll").then(
                      (response) => {
                        this.tableData = response.data.data;
                      },
                      (error) => {
                        console.log("发送失败", error.message);
                      }
                    );
              },
              (error) => {
                console.log("删除失败", error.message);
                this.$message({
                    type: 'error',
                    message: '删除失败!'+error.message
                    })
              }
            );
        })
        .catch(() => {
          // 取消
        })
    },
    doScore(lid,name) {
      this.$router.push({ name: "doScore", query: { id: lid ,bridgeName:name} });
    },
    showBridgeScore(id,name) {
      this.$router.push({ name: "showBridgeScore", query: { bridgeId: id ,bridgeName:name} });
    },
    showBridgeDetail(id)
    {
      console.log('jjj')
      this.$router.push({ name: "showBridgeDetail", query: { bridgeId: id } });
    }
  },
  mounted() {
    axios.get("http://localhost:8080/bridge/listAll").then(
      (response) => {
        this.tableData = response.data.data;
        console.log('dadsa',this.tableData)
      },
      (error) => {
        console.log("发送失败", error.message);
      }
    );
  },
  data() {
    return {
      tableData: []
    }
  }
};
</script>