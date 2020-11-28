<template>
  <div class="content" id="diagram">
    <div id="box"></div>
  </div>
</template>
<script>
  import relation from '../../assets/js/diagram'
  export default {
    data(){
      return{
        relationName : [
          {name:"王杰希",friend:[
              {name:"刘小别",relationship:"同事"},
              {name:"琳琳",relationship:"朋友"},
              {name:"川A09090",relationship:"车主"},
              {name:"高英杰",relationship:"朋友"},
              {name:"锦秋花园",relationship:"户主"}]
          },
          {name:"刘小别",friend:[
              {name:"许斌",relationship:"同事"},
              {name:"高英杰",relationship:"朋友"},
              {name:"川D78654",relationship:"车主"},
              {name:"锦秋花园",relationship:"户主"},
              {name:"王杰希",relationship:"同事"},
              {name:"刘维",relationship:"父子"},
              {name:"林琼",relationship:"母子"}]
          },
          {name:"高英杰",friend:[
              {name:"高兴",relationship:"父子"},
              {name:"高英初",relationship:"兄弟"},
              {name:"王杰希",relationship:"同事"}
              ]
          },
          {name:"琳琳",friend:[
              {name:"潇潇",relationship:"同学"},
              {name:"川D34533",relationship:"车主"},
              {name:"王杰希",relationship:"朋友"},
              ]
          },
          {name:"高英初",friend:[
              {name:"高英杰",relationship:"兄弟"},
              {name:"Linda",relationship:"夫妻"},
             ]
          }
        ],
      }
    },
    methods:{


    },
    mounted() {
      relation.init(this.relationName,0)

    }
  }
</script>
<style lang="scss">
  #diagram{
    .content{
      width: 100%;
      height: 100%;
    }
    #box{
      width:600px; height:600px;
      position: relative;
      margin: 0 auto;
    }
    .host{
      position:absolute;
      line-height:220px;
      text-align:center;
      font-weight:bolder;
      width:180px;
      height:175px;
      background: url("../../../static/img/house/host.png") center center no-repeat;
      background-size: 100%;
      border: 0;
      color:#fff;
    }
    .guest{
      position:absolute;
      width:80px;
      height:80px;
      background: url("../../../static/img/house/guest.png") center center no-repeat;
      background-size: 100%;
      line-height:80px;
      text-align:center;
      color: #fff;
      border: 0;
    }
    .relationship{
      position:absolute;
      width:80px;
      height:40px;
      color: #aaa;
      line-height:40px;
      font-size:12px;
      text-align:center;
      display: inline-block;
    }
  }

</style>
