<template> 
  <div class="take">
    <div class="process">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item>处方管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/prescription/finish' }">已处理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="take_content">
      <!-- 搜索栏 -->
      <div class="status_nav">
        <div class="Refresh"  @click="openFullScreen" element-loading-text="拼命加载中"
        v-loading.fullscreen.lock="fullscreenLoading"><i class="el-icon-refresh"></i></div>
      <div class="search">
        <div class="search_input">
          <input type="text" name="" placeholder="处方编号" maxlength="18" v-model="search">
          <div class="btn_search" @click="btn_search">
            <i class="el-icon-search icon_turn"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="take_lists">
      <div class="info_list">
        <ul class="list_head">
          <li>处方编号</li>
          <li>开方医院</li>
          <li>开方医生</li>
          <li>患者姓名</li>
          <li>开方时间</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="info_lists info_list">
        <ul class="list_head" v-for="(item,index) in data">
          <li>{{item.recipeCode}}</li>
          <li :title="item.hospitalName">{{item.hospitalName}}</li>
          <li>{{item.doctorName}}</li>
          <li>{{item.patientName}}</li>
          <li :title="item.kfTime">{{item.kfTime}}</li>
          <li> <router-link :to="{path:'./finish/finished',query:{id:item.id}}"><i class="el-icon-search icon_turn" ></i></router-link> </li>
        </ul>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_size">
      <div class="total">
        共&nbsp;<i>{{total}}</i>&nbsp;条  
      </div>
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
       v-if="total <= 6 ? false:true"
       :page-size="6"
       @current-change="handleCurrentChange">
    </el-pagination>
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
        data:[],
         url:familyDoctor(),
        total:'',
        search:""
      }; 
    }, 
    created(){
  this.requestData()
},
    methods: { 
      // 刷新
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.requestData()
        }, 2000);
      },
      requestData(){
          axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/prescription/selectlist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: 1,
            status:"1",
            pageSize: '6'
          }
        }).then((response)=>{
          this.total=response.data.page.total
          this.data=response.data.page.records
        })
      },
       handleCurrentChange(val){
        axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/prescription/selectlist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: val,
            pageSize: '6',
             status:"1"
          }
        }).then((response)=>{
         this.total=response.data.page.total
          this.data=response.data.page.records
        })
      },
      btn_search:function(){
         axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/prescription/selectlist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: 1,
            pageSize: '6',
            status:"1",
            searchKey:this.search
          }
        }).then((response)=>{
         this.total=response.data.page.total
          this.data=response.data.page.records
        })
      },
    } 


  }; 
</script> 

<style scoped> 

.take{
  height: 100%;
  margin-left:38px;
}
.process{
  height: 39px;
  width: 97%;
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
  color: #bdc0c5;
}
.el-breadcrumb__separator{
  margin: 0 3px;
}
.process >>> .el-breadcrumb__inner.is-link{
  color: #8a8fff;
  font-weight:0;
}
.take_content{
  width: 97%;
  background-color: white;
  height: 92%;
  box-shadow: -1px -1px 1px #d8daff inset;
}
.status_nav{
  height: 10%;
  min-height: 80px;
  box-shadow:1px #e1e7f8;
  background-color: #f7f9ff;
}
.Refresh{
  margin-left: 25px;
  float: left;
  cursor: pointer;
  margin-top: 2%;
}
.el-icon-refresh{
  font-size: 40px;
  color: #8a8fff;
}
.search{
  height: 40px;
  width: 280px;
  float: right;
  margin-right: 20px;
  margin-top: 2%;
}
.search_input{
  height: 40px;
}
.search_input input{
  height: 40px;
  width:220px;
  padding:0;
  margin: 0;
  padding-left: 20px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border:none;
  background-color: #ecedff;
  outline: none;
}
.btn_search{
  height: 40px;
  width: 40px;
  float: right;
}
.btn_search{
  background-color: #8a8fff;
  line-height: 40px;
  text-align: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
}
.btn_search .icon_turn{
  font-size: 18px;
  color: white;

}
.take_lists{
  background-color: white;
  border: 1px solid #d8daff;
  border-left: 0;
  border-bottom: 0;
  height: 70%;
}
.info_list:first-of-type{
  background-color: #f0f5ff;
}
.info_list:first-of-type li{
  border-left: 1px solid #d8daff;
  font-size: 16px;
}
.info_lists .list_head li{
  color: #9b9b9b;
}
.info_lists  li{
  border:1px solid #d8daff;
  border-right: 0;
  margin-top: -1px;
}
.info_lists ul:nth-of-type(even){
  background-color: #f6f6f6;
}
.list_head{
  height: 45px;
  border-bottom: 1px;
}
.list_head li{
  height: 44px;
  line-height: 44px;
  float: left;
  text-align: center;
  color: #a1a6ff;
  font-size: 14px;
  font-family: '微软雅黑';
  margin-right: -1px;
}
.list_head li:first-of-type{
  width: 24%;

}
.list_head li:nth-of-type(2){
  width: 24%;
  padding: 0 1%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_head li:nth-of-type(3){
  width: 10%;

}
.list_head li:nth-of-type(4){
  width: 10%;

}
.list_head li:nth-of-type(5){
  width: 18%;
  padding: 0 1%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_head li:nth-of-type(6){
  width: 10%;
}
.icon_turn{
  color: #8a8fff;
}
/*分页*/
.page_size{
  margin-top: 10px; 
}
.total{
  text-align: center;
  margin-bottom: 10px;
}
.total i{
  font-style: normal;
  color: #9397ff;
}
.page_size .el-pagination {
  padding: 0;
  text-align: center;
}
.page_size >>> .el-pagination.is-background .btn-prev,.page_size >>> .el-pagination.is-background .btn-next{
  background-color: #bcbfff;
  color: white;
}
.page_size >>> .el-pager li{
  background-color: #bcbfff;
  color: white;
}
.page_size >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #8a8fff;
}
</style> 