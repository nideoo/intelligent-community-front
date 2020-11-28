<template>
    <modal @close="closeModal" v-show="ismodalvisible" class="humanVehicle-detail-page">
        <el-container slot="body" class="content">
            <el-aside width="250px" class="humanVehicle-detail-aside">
                <ul class="humanVehicle-detail-aside-list">
                    <li>
                        <span class="sub-name">车牌号：</span>
                        <span class="sub-label">{{detailInfo.carPlate?detailInfo.carPlate:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">品牌：</span>
                        <span class="sub-label">{{detailInfo.carLogo?detailInfo.carLogo:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">车身颜色：</span>
                        <span class="sub-label">{{detailInfo.color?detailInfo.color:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">出现时间：</span>
                        <span class="sub-label">{{detailInfo.startTime?detailInfo.startTime:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">相机信息：</span>
                        <span class="sub-label">{{detailInfo.xj?detailInfo.xj:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">姓名：</span>
                        <span class="sub-label">{{detailInfo.xj?detailInfo.xj:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">性别：</span>
                        <span class="sub-label">{{detailInfo.xj?detailInfo.xj:'未知'}}</span>
                    </li>
                    <li>
                        <span class="sub-name">房屋信息：</span>
                        <span class="sub-label">{{detailInfo.xj?detailInfo.xj:'未知'}}</span>
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
                let vm = this;
                this.$ajax({
                    method: "POST",
                    url: this.baseUrl().base + 'human-car-details',
                    dataType: "json",
                    data: {id: obj.id?obj.id:128,type:'vehicle'}
                }).then(res => {
                    if(res.data.code==0){
                        console.log(res);
                        res.data.obj.imgPath=vm.baseUrl().imgPath + res.data.obj.picture;
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
