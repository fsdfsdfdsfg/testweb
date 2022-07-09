<template>
  <div>
    <h3>欢迎使用图书信息修改功能，请选择您想要修改的数据进行修改，然后点击确定修改即可完成修改</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍名称" prop="name">
            <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
            <el-input v-model="publisher"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="price"></el-input>
        </el-form-item>
        <el-button type="primary" round @click="updateBook">确定修改</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name:'addBook',
  data() {
    return {
       name:'',
       author:'',
       publisher:'',
       price:'',
       index:0
    };
  },
  methods: {
    updateBook(){
            window.tableData[this.index].name=this.name,
            window.tableData[this.index].author=this.author,
            window.tableData[this.index].publisher=this.publisher,
            window.tableData[this.index].price=this.price,
            this.$message({
            type: 'success',
            message: '修改成功!'
            })
            this.$router.push("bookList");
    }
  },
  mounted(){
      this.name=this.$route.query.name;
      for(var i=0;i<window.tableData.length;i++)
        {
            if(window.tableData[i].name==this.name)
            {
                this.name=window.tableData[i].name;
                this.author=window.tableData[i].author;
                this.publisher=window.tableData[i].publisher;
                this.price=window.tableData[i].price;
                this.index=i;
            }
        }
  }
};
</script>