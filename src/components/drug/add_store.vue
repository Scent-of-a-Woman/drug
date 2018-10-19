<template> 
  <div class="take">
    <div class="process">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item :to="{ path: '/drug/store' }">药企管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/drug/store' }">门店列表</el-breadcrumb-item>
        <el-breadcrumb-item >新增门店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <div class="status_nav">
       <div class="title">
        新增门店
      </div>
    </div>
    <div class="store_content">
      <div class="must_info">
        <div class="store_name">
          <p>门店名称<i>*</i></p>
          <input type="text" name="" v-model="store.name" placeholder="请输入门店名称" maxlength="12">
        </div>
        <div class="store_phone">
          <p>联系电话<i>*</i></p>
          <input type="text" name="" v-model="store.phone" placeholder="请输入联系电话" maxlength="11">
        </div>
        <div class="store_account">
          <p>登陆账号<i>*</i></p>
          <input type="text" name="" v-model="store.account" placeholder="请输入账号" maxlength="12">
        </div>
        <div class="store_pwd">
          <p>登录密码<i>*</i></p>
          <input type="text" name="" v-model="store.pwd" placeholder="请输入6-12位数字密码" minlength="6" maxlength="12"> 
        </div>
        <div class="store_adress">
          <p>门店地址<i>*</i></p>
          <input type="text" name="" v-model="store.address" placeholder="请输入门店地址" maxlength="50">
        </div>
      </div>
      <div class="sure">
        <span class="sure_info" @click="long()">确认创建</span>
      </div>
    </div>
  </div>
</div>
</template> 

<script> 
  import axios from 'axios'
  import {MP} from "../../common/map.js"
  import { familyDoctor } from "../../common/common.js"
  export default { 
    name: 'component_name', 
    data () { 
      return { 
        fullscreenLoading: false,
        oldNum:"",
        url:familyDoctor(),
        store:{
          name:'',
          phone:'',
          address:'',
          account:'',
          pwd:'',
          lng:'',
          lat:'',
          gysId:''
        }
      }; 
    }, 

    methods: { 
      //注册门店信息   
      register:function(){
       
          axios({
            method: 'post',
            url: this.url+"/zhuoya-yplz/gys/saveStores",
            headers: {'token': localStorage.getItem("token")},
            data: {
              username:this.store.account,
              password:this.store.pwd,
              storesName:this.store.name,
              storesAddress:this.store.address,
              longitude:this.store.lng+"0",
              latitude:this.store.lat+"0",
              phone:this.store.phone,
              gysId:this.store.gysId
            }
          }).then((response)=>{
           
            if(response.data.code==0){             
               this.$message.success(response.data.msg)
               let _this=this
               setTimeout(function(){
                  _this.$router.push("/drug/store")
               },2000)
              
            }else{
              this.$message.error(response.data.msg)
            }
          })
        },
       // 经纬度获取
       long(){
         if(this.store.name==''||this.store.phone==''||this.store.account==''||this.store.pwd==''||this.store.address==''){
             this.$message.error("请填写完整的信息");
             return
         }
        if(this.store.name.indexOf(" ")!=-1||this.store.phone.indexOf(" ")!=-1||this.store.address.indexOf(" ")!=-1||this.store.account.indexOf(" ")!=-1||this.store.pwd.indexOf(" ")!=-1){
            this.$message({
            message:'请检查填写信息是否有空格',
            type: 'warning'
             });
            return
          }
        let phone =this.store.phone
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
              this.$message.error("手机号码有误，请重填");  
              return false; 
            } 
          let reg = this.store.name
             if(!(/^[\u4E00-\u9FA5]{1,6}$/).test(reg)){//匹配2到四个汉字
                            this.$message.error("姓名有误，请重填")
                            return false; 
                       }
        let _this = this
        let stie = _this.store.address
        MP("oGE2vseErZSNZRB4GDeOQ9bkyVjlzjOM").then(response=>{
          let map = new BMap.Map("l-map");
          let myGeo = new BMap.Geocoder();
          myGeo.getPoint(stie, function(point){
            _this.store.lng = point.lng
            _this.store.lat = point.lat
            _this.register()
          }, "武汉市")
        }).catch(error=>{
        })
      },
    } 
  }; 
</script> 

<style scoped> 

.take{
  height: 100%;
  margin:0 3% 3% 3%;
}
.process{
  width: 100%;
  height: 39px;
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
  height: 100%;
  max-height: 700px;
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
.store_content{
  padding: 0 3%;
  height: 100%;
}
.must_info{
  overflow: hidden;
  padding-bottom: 5px;
}
.store_name,.store_phone,.store_adress,.store_account,.store_pwd{
  width: 50%;
  float: left;
  height:70px;
}
.store_name p,.store_phone p,.store_adress p,.store_account p,.store_pwd p{
  width: 100%;
  height:35px;
  line-height: 35px;
  color: #a4a4a4;
  font-size:15px;
}
.store_name input,.store_phone input,.store_adress input,.store_account input,.store_pwd input{
  width: 50%;
  height:35px;
  line-height: 35px;
  border:1px solid #dcdfe6;
  padding-left:2%;
  color: #a4a4a4;
  font-size: 15px;
}
.stroe_adress{
  margin-top: 10px;
}
.store_adress input{
  width: 70%;
}
.store_content i{
  font-style: none;
  color: red;
}
.sure{
  margin-top: 15%;
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