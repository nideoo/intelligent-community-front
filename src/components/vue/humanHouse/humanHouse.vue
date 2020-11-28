<template>
    <el-container class="humanHouse">
        <el-header class="headerPage"></el-header>
        <el-main class="content-box h_100">
            <el-container class="h_100">
                <el-aside class="tree-side human-side-tree" :class="{side_hide:show}">
                    <slide-tree v-on:handleNode="handleNode"></slide-tree>
                </el-aside>
                <el-container>
                    <el-header class="search-header">
                        <el-input placeholder="人员检索" v-model="searchTxt">
                            <el-button slot="append" icon="el-icon-search" @click="searchDiagram()"></el-button>
                        </el-input>
                    </el-header>
                    <el-main class="h_100" style="overflow: hidden">
                        <el-container class="main-box-build" v-if="isBuild">
                            <el-aside></el-aside>
                            <el-main class="building-content flex-col flex-parent">
                                <div class="building-top flex-mid-center"><span>{{humanSideRight}}</span></div>
                                <div class="building-main flex-child">
                                    <ul v-for="(item,index) in buildings" class="flex-center building-floor">
                                        <li class="mark-floor" v-for="(v,i) in item.rooms">
                                            {{v.name}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="building-bot"></div>
                            </el-main>
                            <el-aside class="building-icon">
                                <ul class="building-icon-list">
                                    <li class="flex-start">
                                        <div class="icon-img flex-mid-center"><img src="../../../../static/img/house/person-care.png"/></div>
                                        <span>关注人员</span>
                                    </li>
                                    <li class="flex-start">
                                        <div class="icon-img flex-mid-center"><img src="../../../../static/img/house/person-key.png"/></div>
                                        <span>重点人员</span>
                                    </li>
                                    <li class="flex-start">
                                        <div class="icon-img flex-mid-center"><img src="../../../../static/img/house/house-rent-icon.png"/></div>
                                        <span>出租</span>
                                    </li>
                                    <li class="flex-start">
                                        <div class="icon-img flex-mid-center"><img src="../../../../static/img/house/house-self-icon.png"/></div>
                                        <span>自住</span>
                                    </li>
                                    <li class="flex-start">
                                        <div class="icon-img flex-mid-center"><img src="../../../../static/img/house/house-unsed-icon.png"/> </div>
                                        <span>闲置</span>
                                    </li>
                                </ul>
                            </el-aside>
                        </el-container>
                        <div class="main-box main-box-diagram" v-if="isDiagram">
                            <diagram></diagram>
                        </div>
                        <div class="main-box" v-else>
                            <img :src="mapPhoto" onerror="this.src='../../../../static/img/default.png'" />
                        </div>
                    </el-main>
                </el-container>
                <el-aside class="tree-side human-side-right" v-if="!isDiagram">
                    <div class="h_100 flex-col flex-parent">
                        <h4 class="side-box-1 human-side-title">{{humanSideRight}}</h4>
                        <div class="flex-child" :is="tabView"  :pageside="pageInfo"></div>
                    </div>
                </el-aside>
            </el-container>
        </el-main>
    </el-container>
</template>
<script>
    import slideTree from '@/components/modules/tree'
    import areaSide from '@/components/vue/humanHouse/modules/area'
    import streetSide from '@/components/vue/humanHouse/modules/street'
    import commSide from '@/components/vue/humanHouse/modules/comm'
    import buildingSide from '@/components/vue/humanHouse/modules/building'
    import diagram from '@/components/modules/diagram'

    export default {
        name: "humanHouse",
        data() {
            return {
                searchTxt: "",
                humanSideRight: "",
                show: false,
                tabView: areaSide,
                isBuild: false,
                isDiagram: false,
                pageInfo:{},
                mapPhoto: "",
                buildings:[]
            }
        },
        components: {slideTree, areaSide, streetSide, commSide, buildingSide, diagram},
        methods: {
            treeHideFn() {
                this.show = !this.show
            },
            handleNode(data) {
                let vm=this;
                this.isBuild = false;
                this.isDiagram = false;
                this.tabView = data.node + 'Side';
                this.humanSideRight = data.detailAddressInfo;
                if (data.node == 'building'||data.type==4) {
                    this.isBuild = true;
                }

                this.$ajax({
                    method: "post",
                    data: {
                        id:data.id,
                        type:data.type
                    },
                    url: this.baseUrl().base+'getHuman-housing-details',
                }).then(function (res) {
                    if(res.data.code==0){
                        vm.pageInfo=res.data.obj;
                        vm.mapPhoto = res.data.obj.imgUrl ? res.data.obj.imgUrl:"";
                        if(res.data.obj.buildings && res.data.obj.buildings.length!=0){
                            vm.buildings=res.data.obj.buildings.reverse();
                        }

                    }

                })

            },
            searchDiagram() {
                this.isDiagram = true;
                this.isBuild = false;
            }
        },

        mounted() {

        }
    }
</script>
<style lang="scss" scoped>

</style>
