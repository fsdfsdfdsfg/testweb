<template>
  <div>
    <h2>您现在正在查看{{bridgeName}}的得分详情</h2>
    <el-select v-model="value" placeholder="请选择检查类型">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <button @click="showBridgeScore">确定</button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="bridgeName" label="桥梁名称" width="180">
      </el-table-column>
      <el-table-column prop="partId" label="巡检部位" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.partId==0">上部结构</div>
            <div v-else-if="scope.row.partId==1">下部结构</div>
            <div v-else>桥面系结构</div>
         </template>
      </el-table-column>
      <el-table-column prop="detail" label="结构得分">
         <template slot-scope="scope">
            <div v-html="scope.row.detail"></div>
         </template>
      </el-table-column>
      <el-table-column prop="inspector" label="巡检人" width="150"> </el-table-column>
      <el-table-column prop="time" label="巡检时间" width="150"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showBridgeScore",
  methods: {
    showBridgeScore()
    {
        console.log(this.bridgeId);
        console.log(this.value);
      axios.get(`http://localhost:8080/check/logs?bridgeId=${this.bridgeId}&checkType=${this.value}`).then(
        (response) => {
          this.tableData= response.data.data;
          console.log(this.tableData);
        },
        (error) => {
          console.log("发送失败", error.message);
        }
      );
    }
  },
  data() {
    return {
      tableData:[],
      bridgeId:'',
      checkType:'',
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
    }
  },
  mounted()
  {
     this.bridgeId=this.$route.query.bridgeId;
     this.bridgeName=this.$route.query.bridgeName;
  }
};
</script>