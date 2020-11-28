<template>
  <el-container class="judgementPage">
    <el-header class="headerPage"></el-header>
    <el-main class="content-box h_100">
      <el-row class="searchbar searchHeader" :gutter="20">
        <el-col :span="6">
          <el-input
                  placeholder="区"
                  v-model="input1"
                  clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
                  placeholder="街道"
                  v-model="input2"
                  clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
                  placeholder="小区"
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
          <el-table-column prop="area" label="区"></el-table-column>
          <el-table-column prop="street" label="街道"></el-table-column>
          <el-table-column prop="comm" label="小区"></el-table-column>
          <el-table-column prop="building" label="楼栋"></el-table-column>
          <el-table-column prop="house" label="房屋"></el-table-column>
          <el-table-column label="操作">
            <template>
              <button class="sureBtn">删除</button>
              <button class="sureBtn">修改</button>
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
            area:"嘉陵区",
            street:"火花街道",
            comm:"祥和丽景",
            building:"1号楼",
            house:"203",
            time:"2018/12/06 18:00:00",
          },{
            comm:"时代天骄",
            area:"嘉陵区",
            street:"火花街道",
            building:"10号楼",
            house:"702",
          },{
            comm:"玉屏翠竹苑",
            area:"嘉陵区",
            street:"火花街道",
            building:"4号楼",
            house:"401",
          },{
            comm:"厚院小区",
            area:"嘉陵区",
            street:"南湖街道",
            building:"1号楼",
            house:"203",
          },{
            comm:"陈寿花园",
            area:"嘉陵区",
            street:"火花街道",
            building:"1号楼",
            house:"203",
          },{
            area:"嘉陵区",
            street:"南湖街道",
            comm:"维多利亚一期",
            building:"1号楼",
            house:"203",
          },{
            area:"嘉陵区",
            street:"南湖街道",
            comm:"玉兰花园",
            building:"30号楼",
            house:"601",
          },{
            area:"嘉陵区",
            street:"火花街道",
            comm:"玉泉花园",
            building:"6号楼",
            house:"203",
          },{
            area:"嘉陵区",
            street:"火花街道",
            comm:"乐居小区",
            building:"8号楼",
            house:"303",
          },{
            area:"嘉陵区",
            street:"南湖街道",
            comm:"维新小区",
            building:"1号楼",
            house:"203",
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

