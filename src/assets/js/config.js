export default {
  install(Vue) {
    Vue.prototype.baseUrl = function () {
      var constant = {
        base: "http://47.103.46.142:8080/api/v1/",//基础信息
        imgPath:'http://47.103.46.142:81/',
      };
      return constant;
    };
    //获取页面id
    Vue.prototype.getUniqId = function () {
      return this.$ajax({
        type: "GET",
        url: this.baseUrl().map + '/basic/getUniqId',
        dataType: "json"
      })
    };
    Vue.prototype.getDeviceType = function () {//设备类型
      return this.$ajax({
        type:"get",
        url:this.baseUrl().map+'/basic/getDevTypeAll',
        dataType:"json"
      });
    };
    Vue.prototype.getCarLogo = function () {//车辆品牌
      return this.$ajax({
        type:"get",
        url:this.baseUrl().map+'/dictionary/getCarLogo',
        dataType:"json"
      });
    };
    Vue.prototype.getCarType = function () {//车辆类型
      return this.$ajax({
        type:"get",
        url:this.baseUrl().map+'/dictionary/getCarType',
        dataType:"json"
      });
    };
    Vue.prototype.getCarColor = function (data) {//车辆颜色
      return this.$ajax({
        type:"get",
        params:data,
        url:this.baseUrl().map+'/dictionary/getColor',
        dataType:"json"
      });
    };
    // 获取当前时间
    Vue.prototype.getLocalTime = function (n) {
      var now = new Date(new Date().getTime() - n * 24 * 3600 * 1000);
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth();//得到月份
      var date = now.getDate();//得到日期
      var day = now.getDay();//得到周几
      var hour = now.getHours();//得到小时
      var minu = now.getMinutes();//得到分钟
      var sec = now.getSeconds();//得到秒
      var MS = now.getMilliseconds();//获取毫秒
      var week;
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      if (MS < 100) MS = "0" + MS;
      var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      week = arr_week[day];
      var time = "", todayTime;
      time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;
      todayTime = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
      return todayTime
    };
    Vue.prototype.toChinesNum=function (num) {
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
        let unit = ["", "十", "百", "千", "万"];
        num = parseInt(num);
        let getWan = (temp) => {
          let strArr = temp.toString().split("").reverse();
          let newNum = "";
          for (var i = 0; i < strArr.length; i++) {
            newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
          }
          return newNum;
        };
        let overWan = Math.floor(num / 10000);
        let noWan = num % 10000;
        if (noWan.toString().length < 4) noWan = "0" + noWan;
        return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    };
        //时间戳转化日期
    Vue.prototype.timestampToTime=function (timestamp) {
      if (timestamp.length>10){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      } else{
        var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      }
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
          let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
          let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':';
          let s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
           return Y + M + D + ' ' + h + m + s;
        };

  },

}
