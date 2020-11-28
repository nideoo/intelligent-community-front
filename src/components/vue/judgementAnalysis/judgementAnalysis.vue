<template>
  <el-container class="judgementPage">
    <el-header class="headerPage"></el-header>
    <el-main class="content-box h_100">
      <el-row class="searchbar searchHeader" :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="小区"
            v-model="input1"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="告警等级"
            v-model="input2"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="告警类型"
            v-model="input3"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button class="submitBtn">查询</el-button>
        </el-col>
      </el-row>
      <div class="table-content">
        <el-table :data="tableData" border ref="multipleTable" @row-click="openDetails">
          <el-table-column label="编号">
            <template slot-scope="scope"><p>{{(currentPage-1)*pageSize+scope.$index+1 }}</p></template>
          </el-table-column>
          <el-table-column prop="comm" label="小区"></el-table-column>
          <el-table-column prop="building" label="楼栋单元"></el-table-column>
          <el-table-column prop="waringLevel" label="告警等级">
            <template slot-scope="scope">
              {{scope.row.waringLevel?(toChinesNum(parseInt(scope.row.waringLevel))+'级'):"无"}}
            </template>
          </el-table-column>
          <el-table-column prop="warinType" label="告警类型"></el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column label="操作">
            <template>
              <button class="sureBtn">确认</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination flex-end">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        input1:"",
        input2:"",
        input3:"",
        total: 10,
        tableData: [
          {
            comm:"祥和丽景",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"时代天骄",
            building:"30号楼602",
            waringLevel:1,
            warinType:"暴力入侵",
            time:"2018/10/06 08:00:00",
          },{
            comm:"玉屏翠竹苑",
            building:"1571号楼",
            waringLevel:2,
            warinType:"超时",
            time:"2019/01/06 18:00:00",
          },{
            comm:"厚院小区",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"陈寿花园",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"维多利亚一期",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"玉兰花园",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"玉泉花园",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"乐居小区",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },{
            comm:"维新小区",
            building:"1号楼602",
            waringLevel:1,
            warinType:"超时",
            time:"2018/12/06 18:00:00",
          },
        ],
        pageSize: 10,
        currentPage: 1,
      };
    },
    created: function() {
      // 页面显示
    },
    methods: {
      handleCurrentChange: function() {

      },
      openDetails(){

      }
    }
  };
</script>
