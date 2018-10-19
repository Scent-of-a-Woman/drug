
<!--suppress ALL -->
<template>
   <body>
  <div class="main" id="main">
    <canvas id="canvas"></canvas>
    <div class="container" id="container">
      <div class="left">  <img src=".././assets/img/login_png.png"></div>
      <div class="right">
        <div class="title">
          <i class="iconfont icon-icon9001 iconfont_title"></i>

          <span class="title_text">家庭医生</span>
        </div>
        <div class="title_txt">医师处方药品流转平台</div>
        <ul class="admin">
          <li class="account">
            <i class="iconfont icon-zhanghao font_color"></i>
            <input type="text" placeholder="请输入账户" maxlength="11" v-model='username'>
          </li>
          <li class="pwd">
            <i class="iconfont icon-mima font_color"></i>
            <input type="password" placeholder="请输入密码" maxlength="16" v-model='password' @keyup="show($event)">
          </li>
        </ul>
        <div class="login_status">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="记住账号" @click="remberAccount"></el-checkbox>
            <el-checkbox label="自动登录"></el-checkbox>

          </el-checkbox-group>
        </div>
        <!-- 登录 -->
        <div class="login">
          <span @click="submit()">登 录</span>
        </div>
      </div>

    </div>





  </div>
   </body>
</template>

<script>
import axios from "axios";
import { familyDoctor } from "../common/common.js"
export default {


  name: 'login',
  data (){
    return {
      checkList: ['',''],
      username:'',
      password:'',
      url:familyDoctor(),
    };
  },

  methods: {
     show: function(ev) {
      if (ev.keyCode == 13) {
        this.submit();
      }
    },
    // 登录
    submit:function(){
    //保存的账号
    let name=this.username;
        //保存的密码
        let pass=this.password;
        let _this=this
        if(name==''||name==null){
          _this.$message.error('请输入正确的账户');
          return
        }else if(pass==''||pass==null) {
          _this.$message.error('请输入正确的密码');
          return
        }
        axios.post(_this.url+"/zhuoya-yplz/user/login",
        {
          username:name,
          password:pass
        }
        ).then((response)=>{
          let msg=response.data.msg
        if(response.data.code==0){
          let username=response.data.user.username
            let token=response.data.token
            let id=response.data.user.roleId
            let gysId=response.data.user.gysId
            window.localStorage.setItem("token",token);
            window.localStorage.setItem("roleId",id);
            window.localStorage.setItem("username",username)
             window.localStorage.setItem("gysId",gysId)
            switch(id){
              case 1://1  管理员
              _this.$router.push("/drug/Store")
              break;
              case 2://2  药企 人福医药
              _this.$router.push("/drug/Store")
              break;
              case 3://3  药店人员 健康人大药房
              _this.$router.push("/order/take")
              break;
              case 4://4  医生 涂明轩
              _this.$router.push("/prescription/unfinish")
              break;
              case 5://5  卫计委  wjw001
              _this.$router.push("/drug/Supplier")
              break;
               case 6://5  配送员  国药配送
              _this.$router.push("/order/give")
              break;
            }
          }else{
            _this.$message.error(msg)
          }
        })
    },
    //记住账号
    remberAccount:function(){
    },
    //自动登录
    loginStatus:function(){
      let _this=this
      let token_status=window.localStorage.getItem("token");
      if(token_status){
        _this.$router.push("/order/take")
      }
      //token保存在localStorage里面 然后在判断如果有token就直接在 mounted 执行吗？
    },
    canvas(){

      let oCanvas = document.getElementById("canvas");
      let context = oCanvas.getContext("2d");

      context.beginPath();
      context.arc(0,300,700,0,2*Math.PI)
      context.closePath();
      context.fillStyle = " rgb(186,206,247) ";
      context.fill();

    },
     resizeCanvas() {

  let  wid  =  document.body.scrollWidth;;

  let  hei  =   window.screen.height;
  let  main = document.getElementById("main");
  main.style.width = wid + 'px';
  main.style.height = hei +'px';
  let oCanvas = document.getElementById("canvas");
  oCanvas.width = wid;
  oCanvas.height = hei;
  let ctx = oCanvas.getContext("2d");

  ctx.beginPath();
  let  y= hei  /2;
  let r = wid/2;
  ctx.arc(0, y, r, 0, Math.PI * 2, false);

  ctx.closePath();

  ctx.fillStyle = "rgb(186,206,247)";

  ctx.fill();

}

  },
  mounted(){
      this.resizeCanvas();
     window.onresize = function resizeCanvas() {

      let  wid  =  document.body.scrollWidth;;

      let  hei  =   window.screen.height;
      let  main = document.getElementById("main");
           main.style.width = wid + 'px';
           main.style.height = hei +'px';
      let oCanvas = document.getElementById("canvas");
        oCanvas.width = wid;
        oCanvas.height = hei;
      let ctx = oCanvas.getContext("2d");

      ctx.beginPath();
      let  y= hei/2;
      let r = wid/2;
      ctx.arc(0, y, r, 0, Math.PI * 2, false);

      ctx.closePath();

      ctx.fillStyle = "rgb(186,206,247)";

      ctx.fill();

    };
  }
};
</script>
<style scoped>
 body{overflow:-Scroll;overflow-y:hidden;overflow:-Scroll;overflow-x:hidden;}
  .main{background-color: rgb(220,235,253);}
  /*改动*/
  .container {
    top: 50%;
    left: 50%;
    margin-left: -600px;
    margin-top: -253px;
    position: absolute;
    display: flex;
    /*width: 80%;*/
    width: 1200px;
    /*margin: 7% 10% 0 15%;*/
    height: 500px;
    background-color: white;
  }
  /*添加*/
  .avatar{margin-left: 25%}
  /*改动*/
  .container .left {
    /*width: 45%;*/
    width: 500px;
    background: white;
    padding-left:100px ;
    padding-top: 50px;
  }
  /*改动*/
  .container .right {
    /*width: 45%;*/
    width: 500px;
    background: white;
    padding: 20px;
    padding-top:50px ;
  }
  .title{
    width: 80%;
    margin: auto;
    padding-top: 2%;
  }
  .iconfont_title{
    font-size: 49px;
    margin-left:7.5%;
    color: #9db8ff;
  }
  .title_text{
    font-size: 48px;
    white-space: nowrap;
    color: #9db8ff;
    font-family: "楷体";
  }
  .title_txt{
    text-align: center;
    margin-top: 5px;
    color: #9b9b9b;
    padding-left: 20px;
    font-size: 18px;
    width: 384px;
  }
  .admin{
    padding: 0px;
    /*margin-left: 25px;*/
    height: 110px;
    margin-top:70px;
  }
  .admin li{
    list-style-type: none;
    width: 90%;
    margin: auto;
    height: 40px;
    margin-bottom:30px;
    position: relative;
  }
  .font_color{
    color: #cdcdcd;
    font-size: 18px;
  }
  .account input,.pwd input{
    height: 40px;
    padding: 0;
    width: 90%;
    border:none;
    border:1px solid #cdcdcd;
    padding-left: 25px;
    font-size: 16px;
    font-family: '微软雅黑';
  }
  .font_color{
    position: absolute;
    height:40px;
    line-height: 40px;
    top: 1px;
    left: 5px;
  }
  .pwd{
    margin-top: 25px;
  }
  /*登录状态*/
  .login_status{
    /*margin-left: 10%;*/
    margin-top: 30px;
  }
  .el-checkbox+.el-checkbox{
    /*float: right;*/
    margin-left: 55%;
  }
  /*.el-checkbox__input.is-checked+.el-checkbox__label {*/
    /*color: #9db8ff;*/
  /*}*/
  /*改动*/
  .login{
    margin-left: 5%;
  }
  .login span{
    display: block;
    height: 40px;
    background-color: #9db8ff;
    color: white;
    text-align: center;
    line-height: 40px;
    width: 90%;
    border-radius: 25px;
    margin-top: 30px;
    min-height: 35px;
    cursor: pointer;
  }
  /*改动*/
  .el-checkbox-group {
    font-size: 0;
    padding-left: 22px;

  }
  .el-checkbox-group >>>   .el-checkbox__label{
    color: #9db8ff;
  }
  .el-checkbox-group >>>   .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #9db8ff;
    border:#9db8ff;
  }
  .el-checkbox-group >>>   .el-checkbox__inner:hover{
    background-color: #9db8ff;
    border:#9db8ff;
  }
  .el-checkbox-group >>> .el-checkbox__input.is-focus  .el-checkbox__inner{
     border-color:#9db8ff ;
  }
</style>
