<template>
    <el-table
      :data="tableData"
      style="width: 100%" @row-click="clickme">
      <el-table-column
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
    </el-table>
  </template>

  <script>
    export default {
      name:'ShowBridge',
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '长江大桥',
            address: '重庆市xx区',
            type:'钢桥'
          }, {
            date: '2016-05-04',
            name: '嘉陵江大桥',
            address: '重庆市xx区',
            type:'铁桥'
          }, {
            date: '2016-05-01',
            name: '千厮门大桥',
            address: '重庆市xx区',
            type:'铁桥'
          }, {
            date: '2016-05-03',
            name: '港珠澳大桥',
            address: '中国',
            type:'钢桥'
          }]
        }
      },
      methods:{
          clickme()
          {
              
          }
      }
    }
  </script>