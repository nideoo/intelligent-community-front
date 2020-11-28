<template>
    <modal @close="closeModal" v-show="ismodalvisible" class="edit-regional">
        <el-container slot="body" class="content">
            <el-aside width="260px" class="edit-regional-aside">
                <div class="regional-img flex-mid-center">
                    <img :src="picUrl" alt="" onerror="this.src='../../../../static/img/default1.png'">
                </div>
                <div class="regional-btn">
                    <el-upload
                            class="upload-demo"
                            :action="uploadUrl"
                            :on-preview="handlePreview"
                            name="file4"
                            :show-file-list=false
                            :on-success="handleSuccessData"
                            :onError="uploadError"
                            :beforeUpload="beforeAvatarUpload">
                        <el-button size="small" type="primary">上传图片</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>                </div>
            </el-aside>
            <el-main class="edit-regional-main">
                <el-row>
                    <el-col :span="24" class="flex-parent edit-regional-main-col">
                        <label class="edit-regional-title">区域：</label>
                        <div class="flex-child">{{pageinfo.name}}</div>
                    </el-col>
                    <el-col :span="24" class="flex-parent edit-regional-main-col">
                        <label class="edit-regional-title">地址：</label>
                        <div class="flex-child">{{pageinfo.address}}</div>
                    </el-col>
                    <el-col :span="24" class="flex-parent edit-regional-main-col">
                        <label class="edit-regional-title">描述：</label>
                        <el-input
                                class="flex-child"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="regionalDescribe">
                        </el-input>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <div slot="footer">
            <button class="modal-cancel" @click="closeModal">取消</button>
            <button class="modal-submit" @click="uploadSubmit">提交</button>
        </div>
    </modal>
</template>
<script>
    import modal from '@/components/modules/modal/modal'

    export default {
        data() {
            return {
                visible: this.ismodalvisible,
                detailInfo:{},
                response:{},
                picUrl: process.env.imgPath+ this.pageinfo.img_url,
                upDatePic:this.pageinfo.img_url,
                header: {
                    "content-type": "multipart/form-data"
                },
                uploadUrl: process.env.base+"import-areaGroup-img",
                uploadParam: {},

                regionalDescribe:this.pageinfo.describe,
            }
        },
        props: {
            ismodalvisible: {
                type: Boolean,
                sync: true
            },
            pageinfo: {
                type: Object,
                sync: true
            }
        },
        watch: {
            visible: {
                deep: true,
                handler(newV, oldV) {
                    this.$emit('update:ismodalvisible', newV);
                }
            },
            ismodalvisible: function (val) {
                this.visible = val
            }
        },
        components: {modal},
        methods: {
            closeModal() {
                this.visible = false;
            },
            //获取详情信息
            getDetailData(obj) {

            },
            handleSuccessData(response, file) {
                console.log(response, file);
                this.picUrl = URL.createObjectURL(file.raw);
                this.upDatePic=response.obj;
            },

            uploadError(response, file) {
                console.log(response, file);
                this.$message.error('上传图片失败!');
            },
            //上传动作前函数
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg' || 'image/png';
                // const isLt2M = file.size / 1024 / 1024 < 2;
                //
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            },

            handlePreview(file) {
                console.log(file);
            },
            uploadSubmit(){
                let vm=this;
                this.parmas={
                    describe: this.regionalDescribe,
                    id: this.pageinfo.id,
                    imgUrl:this.upDatePic
                };
                this.$ajax({
                    method: "post",
                    url: process.env.base+'area-group-update',
                    dataType: "json",
                    data:this.parmas
                }).then(res => {
                    if (res.data.code == 0) {
                        vm.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        vm.visible = false;
                    }

                }).catch(error => {
                })
            }
        },
        created() {

        },
        mounted() {
            if(this.pageinfo.id){
                this.picUrl= process.env.imgPath + this.pageinfo.img_url;
                this.upDatePic=this.pageinfo.img_url;
            }
        }
    }
</script>
<style lang="scss">
    .edit-regional{
        .edit-regional-aside{
            position: relative;
            padding-right: 8px;
            &:after {
                position: absolute;
                right: 0;
                top: 0;
                content: "";
                width: 8px;
                height: 100%;
                background: url("../../../../../static/img/modal/split-line.png") center center no-repeat;
                background-size: 100% 100%;
            }
        }
        .regional-img{
            width: 150px;
            height: 150px;
            margin: 0 auto;
            margin-bottom: 10px;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .regional-btn{
            text-align: center;
            .el-upload__tip{
                color: #999;
            }
        }
        .edit-regional-main{
            .edit-regional-main-col{
                padding: 10px;
                .el-textarea__inner{
                    height: 105px;
                }
            }
            .edit-regional-title{
                width: 100px;
                display: inline-block;
                text-align: right;
                margin-right: 10px;
                color: #a6b7bf;
            }
        }
    }
</style>