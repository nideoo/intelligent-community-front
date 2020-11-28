<template>
    <div class="humanHouse-building">
        <div class="h_100 flex-col flex-parent">
            <div class="human-aside-title flex-start">
                <div class="sub-label">{{houseTotal.name}}</div>
                <button class="number total-number">{{houseTotal.value}}</button>
            </div>
            <div class="flex-child flex-col flex-center">
                <el-row :gutter="10" class="human-area_info">
                    <el-col :span="8" v-for="(item, i) in houseTotal.collect" :key="i">
                        <div class="num-house number" :class="(i==0)? 'number-total' : ''">{{item.value}}</div>
                        <span>{{item.name}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="split-line"></div>
            <div class="flex-child human-aside-people flex-col flex-center">
                <el-row :gutter="5">
                    <el-col :span="12" class="human-aside-title flex-start">
                        <div class="sub-label">{{peopleTotal.name}}</div>
                        <button class="number total-number flex-start">{{peopleTotal.value}} <span>人</span></button>
                    </el-col>
                    <el-col :span="12" class="human-aside-title flex-start"  v-for="(item, i) in peopleTotal.collect" :key="i">
                        <div class="sub-label">{{item.name}}</div>
                        <button class="number sub-number flex-start">{{item.value}} <span>人</span></button>
                    </el-col>
                </el-row>
            </div>
            <div class="split-line"></div>
            <div class="human-aside-title flex-start">
                <div class="sub-label">{{houseType.name}}</div>
                <button class="number total-number">{{houseType.value}}</button>
            </div>
            <div class="flex-child flex-col flex-center">
                <el-row :gutter="15" class="human-area_info">
                    <el-col :span="8" v-for="(item, i) in houseType.collect" :key="i">
                        <div class="num-build number" :class="(i==0)? 'number-total' : ''">{{item.value}}</div>
                        <span>{{item.name}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"building",
        data(){
            return{
                pageInfo:this.pageside,
                houseTotal:{
                    collect:[],
                    name:"",
                    value:""
                },
                peopleTotal:{
                    collect:[],
                    name:"",
                    value:""
                },
                houseType:{
                    collect:[],
                    name:"",
                    value:""
                },

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
                this.houseTotal = this.pageside.census[0];
                this.peopleTotal = this.pageside.census[1];
                this.houseType = this.pageside.census[2];
            }
        },
        mounted() {
            if(Object.keys(this.pageside).length!=0){
                this.houseTotal = this.pageside.census[0];
                this.peopleTotal = this.pageside.census[1];
                this.houseType = this.pageside.census[2];
            }
        }
    }
</script>
