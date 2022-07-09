<template>
    <div>
      <input type="text" v-model="bridgename" placeholder="请输入桥梁类型关键字">
      <button @click="getBridgeTypes">确定</button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="桥梁名称" width="300">
        </el-table-column>
        <el-table-column prop="upWeight" label="桥梁上部权重" width="280">
        </el-table-column>
        <el-table-column prop="deckWeight" label="桥梁桥面系权重" width="280"> </el-table-column>
        <el-table-column prop="downWeight" label="桥梁下部权重" width="280"> </el-table-column>
        <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- <el-button
            type="text"
            size="small"
            circle="true"
            @click="doScore(scope.row.id,scope.row.name)"
            >评分</el-button
          >-->
          <el-button
            type="text"
            size="small"
            circle="true"
            @click="showTemplateDetail(scope.row.id)"
            >查看详情</el-button
          > 
          <el-button
            type="text"
            size="small"
            circle="true"
            @click="delete1(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      </el-table>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
          bridgename:'',
          bridgetypes:[],
          tableData:[]
      }
    },
    methods:{
       getBridgeTypes(){
         axios({
             url:'http://localhost:8080/type/nameLike',
             method:'get',
             params:{
                 typeName:this.bridgename
             }
         }).then(
          response => { 
            // console.log(response.data.data)
            this.tableData=response.data.data
            console.log(this.tableData)
          },
          error => {
            console.log("发送失败",error.message)
          }
       )
       },
      delete1(id) {
      this.$confirm('此操作将删除该条数据,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定
                axios.get(`http://localhost:8080/type/delete?typeId=${id}`).then(
                  (response) => {
                    console.log(response.data);
                    if(response.data.code==200)
                    {
                      this.$message({
                      type: 'success',
                      message: '删除成功!'
                      }),
                      axios
                        .get(
                          `http://localhost:8080/type/nameLike?typeName=${this.bridgename}`
                        )
                        .then(
                          (response) => {
                            this.tableData = response.data.data;
                            if(response.data.code!=200)
                            {
                              this.$message({
                              type: 'error',
                              message: '数据获取失败!'+response.data.data
                              })
                            }
                          },
                          (error) => {
                            console.log("请求失败", error.message);
                            this.$message({
                            type: 'error',
                            message: '数据请求失败!'+error.message
                            })
                          }
                        ); 
                    }
                    else{
                            this.$message({
                            type: 'error',
                            message: '删除失败!'+response.data.data
                            })
                    }
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
     showTemplateDetail(id){
        this.$router.push({ name: "showTemplateDetail", query: { typeId: id} });
     }
    },
    mounted(){
      axios({
             url:'http://localhost:8080/type/listAll',
             method:'get'
         }).then(
          response => { 
            // console.log(response.data.data)
            this.tableData=response.data.data
            console.log(this.tableData)
          },
          error => {
            console.log("发送失败",error.message)
          }
        )
    }
  }
</script>
<style scoped>
   .chooseBridge{
     background-color: rgb(105, 161, 165);
   }
</style>