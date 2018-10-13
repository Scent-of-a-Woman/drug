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
            门店详情
         </div>
      </div>
      <div class="store_content">
        <div class="must_info">
          <div class="store_name">
            <p>门店名称<i>*</i></p>
            <input type="text" name="" v-model="data.name">
        </div>
         <div class="store_phone">
            <p>联系电话<i>*</i></p>
            <input type="text" name="" v-model="data.phone">
        </div>
       <!--  <div class="store_account">
            <p>登陆账号<i>*</i></p>
            <input type="text" name="">
        </div>
        <div class="store_pwd">
            <p>登录密码<i>*</i></p>
            <input type="text" name="">
        </div> -->
         <div class="store_adress">
            <p>门店地址<i>*</i></p>
            <input type="text" name="" v-model="data.address">
        </div>
        </div>
        <div class="sure">
          <span class="sure_info" @click='long()'>确认修改</span>
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
        data:{
          phone:"",
          address:"",
          name:"",
          storeId:"",//门店id
          lat:'',
          lon:"",
        },
        url:familyDoctor(),

      }; 
    }, 
    created(){
     this.storeId=this.$route.query.id
     this.requestData()
    },
    methods: { 
      // 刷新
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
    //获取信息
     requestData(){
        axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/selectStores",
          headers: {'token': localStorage.getItem("token")},
          data: {
            id:this.storeId
          }
        }).then((response)=>{
          this.data.lat=response.data.stores.latitude;
          this.data.lon=response.data.stores.longitude;
          this.data.name=response.data.stores.storesName;
          this.data.phone=response.data.stores.phone;
          this.data.address=response.data.stores.storesAddress
        })
     },
    //修改信息
     amendInfo(){
        let phone =this.data.phone
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
              this.$message.error("手机号码有误，请重填");  
              return false; 
            } 
        if(this.data.name==""||this.data.address==""){
             this.$message.error("请填写正确的门店信息");  
              return false; 
        }
         axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/saveStores",
          headers: {'token': localStorage.getItem("token")},
          data: {
            phone:this.data.phone,
            storesName:this.data.name,
            storesAddress:this.data.address,
            gysId:1,
            longitude:this.data.lng,
            latitude:this.data.lat,
            id:this.storeId
          }
        }).then((response)=>{
          let msg=response.data.msg
          if(msg=='保存成功'){
               this.$message({
                message:msg,
               type: 'success'
           });
          }else{
               this.$message.error(msg)
          } 
        })
     },
     // 经纬度获取
    long(){
      let _this = this
      let stie = _this.data.address
      MP("oGE2vseErZSNZRB4GDeOQ9bkyVjlzjOM").then(response=>{
        let map = new BMap.Map("l-map");
        // 创建地址解析器实例
        let myGeo = new BMap.Geocoder();
        myGeo.getPoint(stie, function(point){
          _this.data.lng = point.lng
          _this.data.lat = point.lat
          _this.amendInfo()
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
  margin:0 3% 0 3%;
}
.process{
  width: 100%;
  height: 6%;
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
  height: 10%;
  min-height: 80px;
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
  margin-top: 30%;
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