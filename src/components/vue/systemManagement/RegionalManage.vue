<template>
    <el-container class="judgementPage h_100">
        <el-header class="headerPage"></el-header>
        <el-main class="content-box h_100">
            <el-container class="h_100">
                <el-header class="searchbar searchHeader">
                    <el-row :gutter="20">
                        <el-col :span="6" class="flex-parent">
                            <label class="tit">区域名称：</label>
                            <el-input class="flex-child ipt"
                                    placeholder="区域名称"
                                    v-model="parmas.name"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="submitBtn" @click="getData('search')">查询</el-button>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main class="table-content">
                    <el-table :data="tableData" border ref="multipleTable" @row-click="openDetails" style="width: 100%">
                        <el-table-column label="编号" width="60">
                            <template slot-scope="scope"><p>{{(pageIndex-1)*pageSize+scope.$index+1 }}</p></template>
                        </el-table-column>
                        <el-table-column prop="name" label="区域"></el-table-column>
                        <el-table-column prop="address" label="地址">
                            <template slot-scope="scope">
                                {{scope.row.address?scope.row.address:'暂无信息'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="describe" label="描述">
                            <template slot-scope="scope">
                                {{scope.row.describe?scope.row.describe:''}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="图片">
                            <template slot-scope="scope">
                                <div class="td-img flex-mid-center">
                                    <img :src="imgUrl+scope.row.img_url" alt="" onerror="this.src='../../../../static/img/default1.png'">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template  slot-scope="scope">
                                <!--<button class="sureBtn" @click="editDetailFn(scope.row)">图片上传</button>-->
                                <button class="sureBtn" @click="editDetailFn(scope.row)">修改</button>
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
    import editRegional from '@/components/vue/systemManagement/modules/editRegional'

    export default {
        data() {
            return {
                imgUrl: process.env.imgPath,

                total: 5,
                tableData: [],
                pageSize: 5,
                pageIndex: 1,
                labelList:[],
                parmas: {
                    name:""
                },

                //  详情
                detailView: "editRegional",
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
        components:{editRegional},
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
                    url: process.env.base+'area-group-list',
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
            openDetails() {

            },
            editDetailFn(obj){
                this.pageInfo = obj;
                this.isModalVisible = true;
            }
        },
        mounted() {
            this.getData();
        }
    };
</script>


