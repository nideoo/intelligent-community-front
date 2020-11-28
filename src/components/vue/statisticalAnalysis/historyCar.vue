<template>
    <el-container class="judgementPage h_100">
        <el-header class="headerPage"></el-header>
        <el-main class="content-box h_100">
            <el-container class="h_100">
                <el-header class="searchbar searchHeader">
                    <el-row :gutter="20">
                        <el-col :span="5" class="flex-parent">
                            <label class="tit">开始时间：</label>
                            <div class="flex-child ipt">
                                <input type="text" id="historyCarStartTime" v-model="parmas.beginDate"
                                       placeholder="开始日期">
                                <i class="el-icon-date"></i>
                            </div>
                        </el-col>
                        <el-col :span="5" class="flex-parent">
                            <label class="tit">结束时间：</label>
                            <div class="flex-child ipt">
                                <input type="text" id="historyCarEndTime" v-model="parmas.endDate"
                                       placeholder="结束日期" class="flex-center">
                                <i class="el-icon-date"></i>
                            </div>
                        </el-col>
                        <el-col :span="5" class="flex-parent">
                            <label class="tit">车牌号码：</label>
                            <div class="flex-child ipt">
                                <input type="text" v-model="parmas.carPlate" placeholder="车牌号码" class="flex-center">
                            </div>
                        </el-col>
                        <el-col :span="5" class="flex-parent">
                            <label class="tit">相机卡口：</label>
                            <div class="flex-child ipt">
                                <input type="text" v-model="parmas.cameraId" placeholder="相机编号" class="flex-center">
                            </div>
                        </el-col>
                        <el-col :span="4" class="flex-end">
                            <el-button class="submitBtn" @click="getData('search')">查询</el-button>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main class="table-content">
                    <el-table :data="tableData" border ref="multipleTable" style="width: 100%">
                        <el-table-column label="编号" width="60">
                            <template slot-scope="scope"><p>{{(pageIndex-1)*pageSize+scope.$index+1 }}</p></template>
                        </el-table-column>
                        <el-table-column prop="carPlate" label="车牌号码"></el-table-column>
                        <el-table-column prop="carLogo" label="车辆品牌"></el-table-column>
                        <el-table-column prop="color" label="车辆颜色"></el-table-column>
                        <el-table-column prop="startTime" label="抓拍时间"></el-table-column>
                        <el-table-column prop="" label="抓拍图片">
                            <template slot-scope="scope">
                                <div class="td-img flex-mid-center">
                                    <img :src="imgUrl+scope.row.picture" alt=""
                                         onerror="this.src='../../../../static/img/default1.png'">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                        <template  slot-scope="scope">
                        <!--<button class="sureBtn" @click="editDetailFn(scope.row)">图片上传</button>-->
                        <button class="sureBtn" @click="openDetails(scope.row)">查看详情</button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-main>
                <el-footer class="pagination flex-end">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="pageIndex"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </el-footer>
            </el-container>
        </el-main>
        <div :is="detailView" :ismodalvisible.sync="isModalVisible" v-if="isModalVisible" :pageinfo="pageInfo"></div>
    </el-container>
</template>
<script>
    import vehicleDetail from '@/components/vue/homePage/modules/vehicle'

    export default {
        data() {
            return {
                imgUrl: process.env.imgPath,
                total: 5,
                tableData: [],
                pageSize: 5,
                pageIndex: 1,
                labelList: [],
                parmas: {
                    beginDate: "",
                    endDate: "",
                    carPlate: "",
                    cameraId: ""
                },

                //  详情
                detailView: "vehicleDetail",
                isModalVisible: false,
                //详情数据
                pageInfo: {}
            };
        },
        watch: {
            isModalVisible: {
                deep: true,
                handler(newV, oldV) {
                    if (!newV) {
                        this.getData()
                    }
                }
            }
        },
        components: {vehicleDetail},
        created: function () {
            // 页面显示
        },
        methods: {
            handleCurrentChange: function (val) {
                this.pageIndex = val;
                this.getData()
            },
            getData(str) {
                if(str=='search'){
                    this.pageIndex=1;
                }

                this.parmas.pageSize = this.pageSize;
                this.parmas.pageIndex = this.pageIndex;

                this.$ajax({
                    method: "POST",
                    url: process.env.base + 'his-vehicle-list',
                    dataType: "json",
                    data: this.parmas
                }).then(res => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.obj.list;
                        this.total = res.data.obj.total;
                    }

                }).catch(error => {
                })
            },
            openDetails(obj) {
                this.pageInfo = obj;
                this.isModalVisible = true;
            },
            setDateChange() {
                let _self = this;
                //时间选择
                // 开始时间
                var begin = laydate.render({
                    elem: '#historyCarStartTime', //指定元素
                    type: 'datetime',
                    calendar: true,
                    theme: '#22508b',
                    max: _self.getLocalTime(0),
                    done: function (value, date, endDate) {
                        if (value) {
                            end.config.min = {
                                year: date.year,
                                month: date.month - 1,
                                date: date.date,
                                hours: date.hours,
                                minutes: date.minutes,
                                seconds: date.seconds
                            }; //开始日选好后，重置结束日的最小日期
                            end.config.value = {
                                year: date.year,
                                month: date.month - 1,
                                date: date.date,
                                hours: date.hours,
                                minutes: date.minutes,
                                seconds: date.seconds
                            }; //将结束日的初始值设定为开始日
                        }
                        _self.parmas.beginDate = value;
                    }
                });
                //结束时间
                var end = laydate.render({
                    elem: '#historyCarEndTime', //指定元素
                    type: 'datetime',
                    calendar: true,
                    theme: '#22508b',
                    max: _self.getLocalTime(0),
                    done: function (value, date, endDate) {
                        if (value) {
                            begin.config.max = {
                                year: date.year,
                                month: date.month - 1,
                                date: date.date,
                                hours: date.hours,
                                minutes: date.minutes,
                                seconds: date.seconds
                            }; //结束日选好后，重置开始日的最大日期
                        }
                        _self.parmas.endDate = value;
                    }
                });
            },
        },
        mounted() {
            this.getData();
            this.setDateChange();
            setInterval(this.setDateChange, 1000);
        }
    };
</script>