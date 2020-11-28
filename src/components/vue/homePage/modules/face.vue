<template>
    <modal @close="closeModal" v-show="ismodalvisible" class="humanVehicle-detail-page">
        <el-container slot="body" class="content">
            <el-aside width="260px" class="humanVehicle-detail-aside">
                <ul class="humanVehicle-detail-aside-list">
                    <li>
                        <span class="sub-name">名称：</span>
                        <span class="sub-label">{{detailInfo.username?detailInfo.username:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">年龄：</span>
                        <span class="sub-label">{{detailInfo.age?detailInfo.age:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">性别：</span>
                        <span class="sub-label">{{(detailInfo.sex==1||detailInfo.sex=='1')?'男':'女'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">身份证：</span>
                        <span class="sub-label">{{detailInfo.identityNum?detailInfo.identityNum:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">相机信息：</span>
                        <span class="sub-label">{{detailInfo.carLogo?detailInfo.username:'未知'}}</span>
                    </li>

                    <li>
                        <span class="sub-name">房屋信息：</span>
                        <span class="sub-label">{{detailInfo.carLogo?detailInfo.username:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">属性：</span>
                        <span class="sub-label sub-label-point"><i class="sub-label-icon"></i> {{detailInfo.carLogo?detailInfo.username:'无'}}</span>
                    </li>
                </ul>
            </el-aside>
            <el-main class="humanVehicle-detail-main">
                <div class="humanVehicle-detail-imgs">
                    <img :src="detailInfo.imgPath" alt=""  onerror="this.src='../../../../../static/img/default.png'">
                </div>
            </el-main>
        </el-container>
    </modal>
</template>
<script>
    import modal from '@/components/modules/modal/modal'

    export default {
        data() {
            return {
                visible: this.ismodalvisible,
                detailInfo:{}
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
                let _self = this;
                this.$ajax({
                    method: "POST",
                    url: this.baseUrl().base + 'human-car-details',
                    dataType: "json",
                    data: {id: obj.id?obj.id:177,type:'face'}
                }).then(res => {
                    if(res.data.code==0){
                        console.log(res)
                        res.data.obj.imgPath=vm.baseUrl().imgPath + res.data.obj.image;
                        this.detailInfo=res.data.obj
                    }

                }).catch(error => {
                })
            }
        },
        created() {
            this.getDetailData(this.pageinfo);

        },
        mounted() {

        }
    }
</script>
<style lang="scss">
</style>
