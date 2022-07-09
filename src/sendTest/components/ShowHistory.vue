<template>
    <div>
        <el-popover
        placement="right"
        width="400"
        trigger="click">
        <el-table :data="gridData">
            <el-table-column width="150" property="date" label="评估日期"></el-table-column>
            <el-table-column width="100" property="name" label="评估人姓名"></el-table-column>
            <el-table-column width="300" property="context" label="评估内容"></el-table-column>
        </el-table>
        <el-button slot="reference">查看历史</el-button>
        </el-popover>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '张三',
          context: '桥面有积水'
        }, {
          date: '2016-05-04',
          name: '李四',
          context: '桥墩状况良好'
        }, {
          date: '2016-05-01',
          name: '王五',
          context: '主梁无明显损坏'
        }, {
          date: '2016-05-03',
          name: '赵六',
          context: '横间联系良好'
        }]
      };
    }
  };
</script>