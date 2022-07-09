<template>
  <div class="root">
    <el-button type="primary" round @click="done" style="float: right"
      >确定添加</el-button
    >
    <div>
      <h3>模板名称：<input v-model="data2.name" /></h3>
    </div>

    <div class="weight">
      上部结构比重：<input
        v-model.number="data2.upWeight"
      />
      桥面系结构比重：<input
        v-model.number="data2.deckWeight"
      />
      下部结构比重：<input
        v-model.number="data2.downWeight"
      />
    </div>
    <!-- <button @click="done">确定添加</button> -->
    <div>
      <div class="up">
        <h3>
          上部结构
          <button @click="add(data2.upTemplate)">添加</button>
          <!-- <button @click="sub(data2.upTemplate)">删除</button> -->
        </h3>
        <div
          v-for="(itemcnt, index) in data2.upTemplate"
          :key="index"
          class="border"
        >
          部件名称：<input
            type="text"
            v-model="itemcnt.name"
            style="width: 100px"
          />
          比重：<input
            type="text"
            style="width: 80px"
            v-model.number="itemcnt.weight"
          />
          <br />
          <!-- <el-row>
            <el-col span="6" offset="4">损坏类型：</el-col>
            <el-col span="4" >
              <button @click="add2(itemcnt.breakTypeTemplates)">添加</button>
            </el-col>
          </el-row> -->
          损坏类型：<button @click="add2(itemcnt.breakTypeTemplates)">添加</button>
          <div
            v-for="(itemcnt2, index2) in itemcnt.breakTypeTemplates"
            :key="index2"
          >
            损坏名称：<input type="text" v-model="itemcnt2.name" />
          </div>
        </div>
      </div>

      <div class="deck">
        <h3>
          桥面结构
          <button @click="add(data2.deckTemplate)">添加</button>
          <!-- <button @click="sub">删除</button> -->
        </h3>
        <div v-for="(itemcnt, index) in data2.deckTemplate" :key="index">
          部件名称：<input
            type="text"
            v-model="itemcnt.name"
            style="width: 100px"
          />
          比重：<input
            type="text"
            style="width: 80px"
            v-model.number="itemcnt.weight"
          />
          <br />
          <!-- <el-row>
            <el-col span="6" offset="4">损坏类型：</el-col>
            <el-col span="4" >
              <button @click="add2(itemcnt.breakTypeTemplates)">添加</button>
            </el-col>
          </el-row> -->
          损坏类型：<button @click="add2(itemcnt.breakTypeTemplates)">添加</button>
          <div
            v-for="(itemcnt2, index2) in itemcnt.breakTypeTemplates"
            :key="index2"
          >
            损坏名称：<input type="text" v-model="itemcnt2.name" />
          </div>
        </div>
      </div>

      <div class="down">
        <h3>
          下部结构
          <button @click="add(data2.downTemplate)">添加</button>
          <!-- <button @click="sub">删除</button> -->
        </h3>
        <div v-for="(itemcnt, index) in data2.downTemplate" :key="index">
          部件名称：<input
            type="text"
            v-model="itemcnt.name"
            style="width: 100px"
          />
          比重：<input
            type="text"
            style="width: 80px"
            v-model.number="itemcnt.weight"
          />
          <!-- type="text" name="text" οnkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"  -->
          <!-- onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" -->
          <br />
          <!-- <el-row>
            <el-col span="6" offset="4">损坏类型：</el-col>
            <el-col span="4" >
              <button @click="add2(itemcnt.breakTypeTemplates)">添加</button>
            </el-col>
          </el-row> -->
          损坏类型：<button @click="add2(itemcnt.breakTypeTemplates)">添加</button>
          <div
            v-for="(itemcnt2, index2) in itemcnt.breakTypeTemplates"
            :key="index2"
          >
            损坏名称：<input type="text" v-model="itemcnt2.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isShow: false,
      data2: {
        // id :null,
        name: "",
        upTemplate: [
          {
            name: "",
            weight: "",
            breakTypeTemplates: [{ name: "" }],
          },
        ],
        upWeight: "",
        deckTemplate: [
          {
            name: "",
            weight: "",
            breakTypeTemplates: [{ name: "" }],
          },
        ],
        deckWeight: "",
        downTemplate: [
          {
            name: "",
            weight: "",
            breakTypeTemplates: [{ name: "" }],
          },
        ],
        downWeight: "",
      },
    };
  },
  methods: {
    add(item) {
      item.push({
        // id:item.length,
        name: "",
        weight: "",
        breakTypeTemplates: [{ name: "" }],
      });
    },
    add2(item) {
      item.push({
        name: "",
      });
    },
    sub(item) {
      item.cnt.pop();
    },
    done() {
      var data3 = this.data2;
      console.log(data3);
      axios.post("http://localhost:8080/type/add", data3).then(
        (response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              type: "success",
              message: "添加模板成功!",
            });
            this.$router.push("ShowBridges");
          } else {
            this.$message({
              type: "error",
              message: "添加模板失败!" + response.data.data,
            });
          }
        },
        (error) => {
          console.log("还是出错了！", error.message);
          this.$message({
            type: "error",
            message: "添加模板失败!" + error.message,
          });
          this.$router.push("ShowBridges");
        }
      );
    },
  },
};
</script>
<style lang="css" scoped>
.up {
  background-color: rgb(255, 255, 255);
  float: left;
  width: 33.3%;
}
.deck {
  background-color: rgb(255, 255, 255);
  float: left;
  width: 33.3%;
}
.down {
  background-color: rgb(255, 255, 255);
  float: left;
  width: 33.3%;
}
.root {
  background-color: rgb(255, 255, 255);
  height: 100%;
}
body {
  background-color: rgb(255, 255, 255);
}
</style>