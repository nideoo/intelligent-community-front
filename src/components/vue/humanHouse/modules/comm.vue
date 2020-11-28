<template>
  <div class="humanHouse-building">
    <div class="h_100 flex-col flex-parent">
      <div v-for="(item, index) in census" :key="index">
        <div class="human-aside-title flex-start">
          <div class="sub-label">{{item.name}}</div>
          <button class="number total-number">{{item.value}}</button>
        </div>
        <div class="flex-col flex-center">
          <el-row :gutter="10" class="human-area_info">
            <el-col :span="8" v-for="(v, i) in item.collect" :key="i">
              <div class="number" :class="[(index==0)? 'num-house' : 'num-build', (i==0)? 'number-total' : '']">{{v.value}}</div>
              <span>{{v.name}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="split-line"></div>
      </div>
<!--      <div>-->
<!--        <div class="human-aside-title flex-start">-->
<!--          <div class="sub-label">房屋总数</div>-->
<!--          <button class="number total-number">6000</button>-->
<!--        </div>-->
<!--        <div class="flex-col flex-center">-->
<!--          <el-row :gutter="10" class="human-area_info">-->
<!--            <el-col :span="8">-->
<!--              <div class="num-build number number-total">168</div>-->
<!--              <span>自住房屋</span>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <div class="num-build number">7</div>-->
<!--              <span>出租房屋</span>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <div class="num-build number">28</div>-->
<!--              <span>闲置房屋</span>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--        <div class="split-line"></div>-->
<!--      </div>-->

      <div class="flex-child human-intro flex-col flex-parent">
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
        this.census = this.pageside.census;
      }
    },
    mounted() {
      console.log(this.pageside);
      if(Object.keys(this.pageside).length!=0){
        this.census=this.pageside.census[0];
      }
    }
  }
</script>
