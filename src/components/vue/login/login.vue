<template>
  <el-row class="login">
    <el-col :span="9">
      <div></div>
    </el-col>
    <el-col :span="15" class="flex-col flex-center">
      <div class="loginbody">
        <div class="title flex-parent">
          <!--<div class="logo flex-col flex-center">-->
            <!--<img src="../../../../static/images/header/logo.png" alt="">-->
          <!--</div>-->
          <div class="word flex-child">
            <h4>
              <span class="sub">智慧安全</span>
              <span>小区综合信息管理平台</span>
            </h4>
            <h3>Intelligent Security Community Integrated Information Management Platform</h3>
          </div>
        </div>
        <div class="forms flex-parent">
          <div class="logo"></div>
          <div class="flex-child">
            <el-form :model="form" status-icon :rules="rules" ref="form" class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input prefix-icon="icon-user" v-model="form.username" placeholder="请输入用户名"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input prefix-icon="icon-psw" type="password" v-model="form.password" auto-complete="off"
                          placeholder="请输入密码" @keyup.enter.native="onSubmit('form')"></el-input>
              </el-form-item>
              <p class="remberPsw flex-between">
                <el-checkbox v-model="rememberPass " @keyup.enter.native="onSubmit('form')">记住密码</el-checkbox>
                <!--<router-link to="">忘记密码?</router-link>-->
              </p>
              <el-button class="submit" type="primary" @click="onSubmit('form')">登录</el-button>
            </el-form>
          </div>

        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      let vUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      let vPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        rememberPass: false,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {validator: vUserName, trigger: 'blur'}
          ],
          password: [
            {validator: vPassword, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      onSubmit(formName) {
        let _self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: "POST",
              url: this.baseUrl() + "login",
              data: this.form,
              dataType: "json"
            }).then(res => {
              if (res.data.code == 0) {
                if (_self.rememberPass) {//记住密码
                  _self.setCookie(_self.form.username, _self.form.password, _self.rememberPass, 7);
                } else {
                  _self.clearCookie();
                }
                _self.$store.commit('set_token', res.data.obj.token);
                _self.$router.push({path: '/home'});
              }
            }).catch(error => {
              _self.$message({
                type: 'error',
                message: '登陆失败，请重新登陆！',
                duration: 1500
              });
            });
          } else {
            return false;
          }
        });
      },
      //设置cookie
      setCookie(c_name, c_pwd, remeberFlag, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] === 'userName') {
              this.form.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] === 'userPwd') {
              this.form.password = arr2[1];
            } else if (arr2[0] === 'remeberFlag') {//是否记住密码
              this.rememberPass = (arr2[1] === 'true' || arr2[1] === true) ? true : false;
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", "", "", -1); //修改2值都为空，天数为负1天就好了
      }
    },
    created() {
    },
    beforeCreate() {

    },
    mounted() {
      this.getCookie();
    }
  }
</script>
<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background: #04255a url(../../../../static/images/loginbg.png);
    background-size: 100% 100%;
    overflow: hidden;
    .el-col {
      height: 100%;
    }
    .loginbody {
      width: 660px;
      .title {
        text-align: center;
        color: #fff;
        margin-bottom: 40px;
        h4 {
          font-family: 'youyuan';
          font-size: 36px;
          font-weight: normal;
          .sub {
            font-family: 'huawenxingkai';
            font-size: 44px;
          }
        }
        h3 {
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
        }
      }
      .demo-ruleForm {
        width: 60%;
        background: url("../../../../static/images/login-box.png") no-repeat center center;
        background-size: 100% 100%;
        height: 240px;
        margin: 0 auto;
        overflow: hidden;
        padding: 40px;
        .el-form-item, .submit {
          width: 90%;
          margin: 10px auto 30px;
        }
        .el-input__inner {
          -webkit-appearance: none;
          background-color: #FFF;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #DCDFE6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 40px;
          line-height: 40px;
          outline: 0;
          padding: 0 25px;
          -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          width: 100%;
        }
        .el-input__prefix {
          .el-input__icon {
            color: #333;
            font-size: 16px;
            font-weight: 600;
          }
        }
        .el-form-item__error {
          color: #f56c6c;
          font-size: 12px;
          line-height: 1;
          padding-top: 8px;
          position: absolute;
          top: 100%;
          left: 0;
        }
        .el-input__prefix {
          left: 5px;
        }
        .el-input__icon {
          height: 100%;
          text-align: center;
          -webkit-transition: all .3s;
          transition: all .3s;
          line-height: normal
        }
        .remberPsw {
          width: 90%;
          margin: 20px auto;
          font-size: 14px;
          .el-checkbox{
            color: #fff;
          }
        }
        .submit {
          width: 90%;
          background: #f39800;
          padding: 0 !important;
          height: 40px;
          line-height: 40px;
          letter-spacing: 2px;
          display: block;
          border: 0;
          margin-top: 20px;
        }
      }

    }
  }
</style>

