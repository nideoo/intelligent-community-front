<template>
    <el-container class="judgementPage">
        <el-header class="headerPage"></el-header>
        <el-main class="content-box h_100">
            <el-row class="searchbar searchHeader" :gutter="20">
                <el-col :span="6">
                    <el-input
                            placeholder="姓名"
                            v-model="input1"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                            placeholder="身份证号码"
                            v-model="input2"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                            placeholder="标签"
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
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="zcbm" label="侦查部门"></el-table-column>
                    <el-table-column prop="zbmj" label="主办民警"></el-table-column>
                    <el-table-column prop="IDcard" label="原因"></el-table-column>
                    <el-table-column prop="label" label="标签"></el-table-column>
                    <el-table-column prop="tel" label="联系电话"></el-table-column>
                    <el-table-column label="操作">
                        <template>
                            <button class="sureBtn">详情</button>
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
                        name:"王杰希",
                        sex:"男",
                        IDcard:400411199010244678,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"liu",

                    },{
                        name:"许斌",
                        sex:"男",
                        IDcard:400411199010244622,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"guo",
                    },{
                        name:"高英杰",
                        sex:"男",
                        IDcard:400411199510244621,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"端木熙",
                    },{
                        name:"张新杰",
                        sex:"男",
                        IDcard:400411199110244612,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"liu",
                    },{
                        name:"韩文清",
                        sex:"男",
                        IDcard:400411198810244621,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"liu",
                    },{
                        name:"张佳乐",
                        sex:"男",
                        IDcard:400411199010244878,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"张灵玉",
                    },{
                        name:"林敬言",
                        sex:"男",
                        IDcard:400411199010244488,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"liu",
                    },{
                        name:"楚云秀",
                        sex:"女",
                        IDcard:400411198810244621,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"孙哲平",
                    },{
                        name:"唐柔",
                        sex:"女",
                        IDcard:400411199010244878,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"王杰希",
                    },{
                        name:"苏沐橙",
                        sex:"女",
                        IDcard:400411199010244488,
                        label:"关注人员",
                        tel:"15737954759",
                        zcbm:"侦查一队",
                        zbmj:"lindsa",
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

