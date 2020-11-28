<template>
  <div class="content">
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
              {name:"锦秋花园302",relationship:"户主"}]
          },
          {name:"刘小别",friend:[
              {name:"许斌",relationship:"同事"},
              {name:"高英杰",relationship:"朋友"},
              {name:"川D78654",relationship:"车主"},
              {name:"锦秋花园602",relationship:"户主"},
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
<style>
  .content{
    width: 100%;
    height: 100%;
  }
  #box{
    width:500px; height:500px;
    position: relative
  }
  .host{
    position:absolute;
    width:100px; height:50px;
    line-height:50px; text-align:center;
    color:#000000; background-color:#eeeeee;
    border:#000000 1px solid; font-weight:bolder
  }
  .guest{
    position:absolute;
    width:80px; height:40px;
    line-height:40px;text-align:center;
    color: #999999; background-color:#FFFFFF;
    border:#000000 1px solid; cursor:pointer
  }
  .relationship{
    position:absolute;
    width:60px; height:20px;
    color: #aaa; line-height:20px;
    font-size:12px; text-align:center
  }

</style>
