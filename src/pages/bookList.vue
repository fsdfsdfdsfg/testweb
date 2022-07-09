<template>
  <div>
    <el-table :data="tableData2" @row-click="test" style="width: 100%">
      <el-table-column prop="name" label="书籍名称" width="180">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="180">
      </el-table-column>
      <el-table-column prop="publisher" label="出版社"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
            <el-button type="text" size="small" circle="true" @click="delete1(scope.row.name)">删除</el-button> 
            <el-button type="text" size="small" circle="true" @click="update(scope.row.name)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "bookList",
  methods: {
    handleClick(row) {
      console.log(row);
    },
    delete1(bname) {
      this.$confirm('此操作将删除该条数据,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定
                var prelen=window.tableData.length;
                console.log(prelen);
                for(var i=0;i<window.tableData.length;i++)
                {
                    if(window.tableData[i].name==bname)
                    {
                        window.tableData.splice(i,1);
                    }
                }
                var nowlen=window.tableData.length;
                console.log(nowlen);
                if(nowlen<prelen)
                {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    }),
                    this.tableData2=window.tableData
                }
                else{
                   this.$message({
                    type: 'error',
                    message: '删除失败!'
                    })
                }
              },)
        .catch(() => {
          // 取消
        })
    },
    update(bname){
        this.$router.push({ name: "updateBook", query: { name: bname } });
    }
  },
  mounted(){
     this.tableData2=window.tableData
  },
  data() {
    return {
      tableData2: [
      ]
    }
  }
};
</script>