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
                            placeholder="警告等级"
                            v-model="input2"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                            placeholder="警告类别"
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
                    <el-table-column prop="comm" label="卡号"></el-table-column>
                    <el-table-column prop="time" label="刷卡时间"></el-table-column>
                    <el-table-column prop="direction" label="设备方向"></el-table-column>
                    <el-table-column prop="deviceName" label="设备名称"></el-table-column>
<!--                    <el-table-column prop="time" label="图片"></el-table-column>-->
                    <el-table-column prop="follow" label="伴随信息"></el-table-column>
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
                        comm:"祥和丽景",
                        direction:"东",
                        deviceName:'人脸监控',
                        follow:"伴随",
                        time:"2018/12/06 18:00:00",
                    },{
                        comm:"时代天骄",
                        direction:"西北",
                        deviceName:'车辆监控',
                        follow:"伴随",
                        time:"2018/10/06 08:00:00",
                    },{
                        comm:"玉屏翠竹苑",
                        direction:"东",
                        deviceName:'视频监控',
                        follow:"伴随",
                        time:"2019/01/06 18:00:00",
                    },{
                        comm:"厚院小区",
                        direction:"东",
                        deviceName:'人脸监控',
                        follow:"伴随",
                        time:"2018/12/06 18:00:00",
                    },{
                        comm:"陈寿花园",
                        direction:"西北",
                        deviceName:'车辆监控',
                        follow:"伴随",
                        time:"2018/12/06 18:00:00",
                    },{
                        comm:"维多利亚一期",
                        direction:"东南",
                        deviceName:'人脸监控',
                        follow:"伴随",
                        time:"2018/12/06 18:00:00",
                    },{
                        comm:"玉兰花园",
                        direction:"北",
                        deviceName:'人脸监控',
                        follow:"伴随",
                        time:"2018/12/06 18:00:00",
                    },{
                        comm:"玉泉花园",
                        direction:"东",
                        deviceName:'人脸监控',
                        follow:"伴随",
                        time:"2019/12/06 18:00:00",
                    },{
                        comm:"乐居小区",
                        direction:"西",
                        deviceName:'人脸监控',
                        follow:"伴随",
                        time:"2018/12/06 18:00:00",
                    },{
                        comm:"维新小区",
                        direction:"南",
                        deviceName:'视频监控',
                        follow:"伴随",
                        time:"2018/09/06 18:00:00",
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

<style scoped lang="scss">
    @import "../../../assets/sass/judgement.scss";
    .sureBtn{
        background: url("../../../../static/images/icon/btn.png") center center no-repeat;
        background-size: 100%;
        width: 60px;
        padding: 6px;
        color: #fff;
        text-align: center;
        border: 0;
    }
    .submitBtn{
        background: url("../../../../static/images/icon/btn.png") center center no-repeat;
        background-size: 100%;
        width: 100px;
        height: 36px;
        padding: 6px;
        color: #fff;
        text-align: center;
        border: 0;
        &:hover{
            background: url("../../../../static/images/icon/btn1.jpg") center center no-repeat;
            background-size: 100%;
        }
    }
</style>
