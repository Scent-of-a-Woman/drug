<template> 
  <div class="take">
    <div class="process">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item :to="{ path: '/set/change' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item >修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <div class="status_nav">
       <div class="title">
        修改密码
      </div>
    </div>
    <div class="change_content">
      <div class="change_info">
        <div class="info">
          <p>登陆账号</p>
          <input type="text" name="" disabled v-model="account">
        </div>
        <div class="info">
          <p>原始密码</p>
          <input type="password" name="" v-model="oldPassword" maxlength="12">
          <!-- <span class="pwd_status"><i>*</i>密码错误</span> -->
        </div>
        <div class="info">
          <p>新密码</p>
          <input type="password" name="" v-model="newPassword"  maxlength="12">
        </div>
        <div class="info">
          <p>确认密码</p>
          <input type="password" name=""  maxlength="12" v-model="surepwd">
        </div>
      </div>
    </div>
    <div class="sure">
      <span class="sure_info" @click="set">确认修改</span>
    </div>
  </div>
</div>
</div>
</template> 

<script> 
  import axios from 'axios'
  import { familyDoctor } from "../../common/common.js"
  export default { 
    name: 'component_name', 
    data () { 
      return { 
        fullscreenLoading: false,
        newPassword:"",
        oldPassword:"",
        account:"",
        surepwd:"",
        url:familyDoctor()
      }; 
    },
    created(){
      this.account=window.localStorage.getItem("username")
    }, 
    methods: { 


      set:function(){
       if(this.surepwd != this.newPassword){
         this.$message.error("两次输入密码不正确")
         return
       }
       if(this.surepwd==''||this.newPassword==""){
         this.$message.error("请填写密码")
         return
       }
       this.$alert('确认修改密码', '温馨提示', {
         confirmButtonText: '确定',
         distinguishCancelAndClose: true})
       .then(() => {
         axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/user/updatePwd",
          headers: {'token': localStorage.getItem("token")},
          data: {
            oldPassword:this.oldPassword,
            newPassword:this.newPassword
          }
        }).then((response)=>{
          if(response.data.code==0){
           this.$message.success(response.data.msg)
         }else{
           this.$message.error(response.data.msg)
         }
       })
      }).catch(action => {
        console.log("点击取消了")  
      })   
    }
  } 
}
</script> 

<style scoped> 

.take{
  height: 100%;
  padding:0 3% 0 3%;
}
.process{
  width: 100%;
  height:6%;
  min-height: 39px;
}
.el-breadcrumb{
  height: 39px;
}
.el-breadcrumb__item{
  height: 39px;
}
.process >>> .el-breadcrumb__inner{
  height: 39px;
  line-height: 39px;
  color: #8a8fff;

}
.el-breadcrumb__separator{
  margin: 0 3px;
}
.process >>> .el-breadcrumb__inner.is-link{
  color: #bdc0c5;
  font-weight: 300;
}
.content{
  width: 100%;
  background-color: white;
  height: 92%;
  box-shadow: -1px -1px 1px #d8daff inset;
}
.status_nav{
  height: 80px;
  width: 94%;
  display: flex;
  padding: 0 3%;
  background-color:#f7f9ff; 
}
.title{
  height: 80px;
  line-height: 80px;
  color: #8a8fff;
  font-size: 20px;
  font-weight: 700;
}
.change_content{
  padding: 0 3%;
}
.change_info{
  width: 350px;
  margin: auto;
  margin-top: 50px;
}
.change_info .info{
  height: 72px;
  width: 350px;
  position: relative;
}
.info p,.info input{
  height: 35px;
  line-height: 35px;
  color: #a4a4a4;
  font-size: 14px;
  width: 338px;
}
.info input{
  border: 1px solid #a4a4a4;
  padding-left: 10px;
  background-color: white;
}
.pwd_status{
  height: 35px;
  width: 100px;
  display: block;
  line-height: 35px;
  position: absolute;
  top: 35px;
  right: -105px;
  color: red;
}
.pwd_status i{
  font-style: normal;
  height: 35px;
  display: block;
  line-height: 35px;
  float: left;
  margin-right: 5px;
}
.sure{
  margin-top: 30px;
  padding-bottom: 30px;
}
.sure_info{
  display:block;
  width: 200px;
  text-align: center;
  line-height: 40px;
  height: 40px;
  margin: auto;
  color: white;
  border-radius: 3px;
  background-color: #8a8fff;
  cursor: pointer;
}
</style> 