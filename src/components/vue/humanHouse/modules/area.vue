<template>
    <div class="humanHouse-building">
        <div class="h_100 flex-col flex-parent">
            <div class="count-info">
                <p class="count-info-number">{{census.value}}</p>
                <p class="count-info-word">{{census.name}}</p>
            </div>
            <el-row :gutter="15" class="human-area_info">
                <el-col :span="8" v-for="(item,index) in census.collect" :key="index">
                    <div class="num-count number">{{item.value}}</div>
                    <span>{{item.name}}</span>
                </el-col>
            </el-row>
            <div class="split-line"></div>
            <div class="human-intro flex-child flex-col flex-parent">
                <h4 class="human-intro-title">{{pageInfo.name}}</h4>
                <div class="human-intro-info flex-child">
                    {{pageInfo.describe ? pageInfo.describe :"暂无介绍" }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                pageInfo:this.pageside,
                census:{
                    collect:[]
                }
            }
        },
        props: {
            pageside: {
                type:Object,
                sync: true
            }
        },
        watch: {
            pageside: function (val, old) {
                this.pageInfo = val;
                this.census = this.pageside.census[0];
            }
        },
        mounted() {
            if(Object.keys(this.pageside).length!=0){
                this.census=this.pageside.census[0];
            }


        }
    }
</script>
<style lang="scss">
</style>
