<template>
    <el-container class="judgementPage">
        <el-header class="headerPage"></el-header>
        <el-main class="content-box h_100">
            <el-row class="searchbar searchHeader" :gutter="20">
                <el-col :span="6">
                    <el-input
                            placeholder="设备名称"
                            v-model="input1"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                            placeholder="IP地址"
                            v-model="input2"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                            placeholder="设备类型"
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
                    <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                    <el-table-column prop="IP" label="IP"></el-table-column>
                    <el-table-column prop="MAC" label="MAC地址"></el-table-column>
                    <el-table-column prop="port" label="设备端口"></el-table-column>
                    <el-table-column prop="url" label="URL地址"></el-table-column>
                    <el-table-column prop="password" label="设备用户名密码"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
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
                        deviceName:"SB001",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB005",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB006",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB007",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB008",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB009",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB010",
                        IP:"10.47.101.88",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"8080",
                        url:"10.47.101.112",
                        password:"567898",
                        type:"人脸相机",
                    },{
                        deviceName:"SB004",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB003",
                        IP:"10.47.101.67",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"81",
                        url:"10.47.101.67",
                        password:"123456",
                        type:"人脸相机",
                    },{
                        deviceName:"SB002",
                        IP:"10.47.101.88",
                        MAC:'63:FE:84:5A:EE:05',
                        port:"8080",
                        url:"10.47.101.112",
                        password:"567898",
                        type:"人脸相机",
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
