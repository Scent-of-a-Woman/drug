<template> 
  <div class="take">
    <div class="process">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item>药企管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/drug/Supplier' }">供应商列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="take_content">
      <!-- 搜索栏 -->
      <div class="status_nav">
         <div class="new_add" v-if="this.id==5?false:true">
           <span><router-link :to='{path:"/drug/new_add"}'>新 增</router-link></span>
         </div>
      </div>
    <div class="take_lists">
      <div class="info_list">
        <ul class="list_head">
          <li>供应商名称</li>
          <li>联系方式</li>
          <li :style="{'width':id==5||id==1?'39%':'29%'}">地区</li>
          <li>门店数量</li>
          <li v-if="id==5||id==1?false:true">操作</li>
        </ul>
      </div>
      <div class="info_lists info_list">
        <ul class="list_head" v-for="(item,index) in data">
          <li>{{item.suppliersName}}</li>
          <li>{{item.suppliersPhone}}</li>
          <li :style="{'width':id==5||id==1?'39%':'29%'}" :title="item.suppliersAddres">{{item.suppliersAddres
}}</li>
          <li >{{item.storesNum
}}</li>
          <li v-if="id==5||id==1?false:true">
            <router-link :to="{path:'./new_add',query:{id:item.id}}"><i class="el-icon-search icon_turn"></i></router-link> 
          </li>
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
        url:familyDoctor(),
        data:[],
        total:'',
        id:"",
      }; 
    }, 
    created(){
      this.requestdata()
      this.id=window.localStorage.getItem("roleId")
    },
    methods: { 
     
      // 刷新
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
       //请求数据
      requestdata(){
          axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/gyslist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: 1,
            pageSize: '6'
          }
        }).then((response)=>{
          this.total=response.data.gyslist.total
          this.data=response.data.gyslist.records
        })
      },
       handleCurrentChange(val){
        axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/gyslist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: val,
            pageSize: '6',
            gysId:this.value
          }
        }).then((response)=>{
           this.data=response.data.gyslist.records
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
  height: 6%;
  max-height: 39px;
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
.new_add{
  width: 200px;
  float: right;
  margin-right: 3%;
  margin-top: 2%;
}
.new_add span{
  display: block;
  width: 200px;
  height: 40px;
  background-color: #8a8fff;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-radius: 5px;
}
.take_lists{
  height: 70%;
  background-color: white;
  border: 1px solid #d8daff;
  border-left: 0;
  border-bottom: 0;
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
  width: 30%;
}
.list_head li:nth-of-type(2){
  width: 15%;
}
.list_head li:nth-of-type(3){
  width: 29%;
  padding: 0 3%;
   overflow: hidden;
    white-space: nowrap;
  text-overflow: ellipsis;
}
.list_head li:nth-of-type(4){
  width: 10%;

}
.list_head li:last-of-type{
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