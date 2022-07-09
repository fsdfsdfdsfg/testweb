<template>
  <div>
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
        <el-button type="primary" round @click="addBook">确定添加</el-button>
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
       price:''
    };
  },
  methods: {
    addBook(){
        var book={
            name:this.name,
            author:this.author,
            publisher:this.publisher,
            price:this.price
        }
        var prelen=window.tableData.length;
        window.tableData.push(book);
        var nowlen=window.tableData.length;
        if(nowlen>prelen)
        {
            this.$message({
            type: 'success',
            message: '添加成功!'
            }),
            this.tableData2=[],
            this.$router.push("bookList");
        }
        else{
            this.$message({
            type: 'error',
            message: '添加失败!'
            })
        }
    }
  },
};
</script>