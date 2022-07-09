<template>
 <div>
  <!-- <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="桥梁名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="桥梁类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      prop="date"
      label="建造日期"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="gridData">
                <el-table-column width="150" property="date" label="评估日期"></el-table-column>
                <el-table-column width="100" property="name" label="评估人姓名"></el-table-column>
                <el-table-column width="300" property="context" label="评估内容"></el-table-column>
            </el-table>
            <el-button @click="handleClick(scope.row)" type="text" size="small" slot="reference">查看评估历史</el-button>
        </el-popover>
        <el-button type="text" size="small" circle="true">评分</el-button>
        <el-button type="text" size="small" circle="true">删除</el-button>
      </template>
    </el-table-column>
  </el-table> -->
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="桥梁名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bridgeType.name"
        label="桥梁类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市">
      </el-table-column>
      <el-table-column
        prop="region"
        label="区">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <el-button type="text" size="small" circle="true">评分</el-button>
        <el-button type="text" size="small" circle="true">删除</el-button>
      </el-table-column>
    </el-table>
 </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'ShowBridge2',
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    mounted(){
        axios.get('http://localhost:8080/bridge/listAll').then(
          response => { 
             this.tableData=response.data.data
          },
          error => {
            console.log("发送失败",error.message)
          }
        )
    },
    data() {
      return {
        tableData:[]
      }
    }
  }
</script>