<template> 

  <div class="unfinish_content">
   <div class="process">
    <el-breadcrumb separator-class="el-icon-minus">
      <el-breadcrumb-item>处方管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">待处理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="content_list">
    <!-- 搜索栏 -->
    <div class="status_nav">
      <div class="Refresh"><i class="el-icon-refresh"></i></div>
      <div class="search">
          <div class="search_input">
            <input type="text" name="" placeholder="处方编号">
            <div class="btn_search">
              <i class="el-icon-search icon_turn"></i>
            </div>
          </div>
      </div>
    </div>
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
     <ul class="list_head">
      <li>20181016732</li>
      <li>武昌区水果湖社区卫生服务中心</li>
      <li>王小明</li>
      <li>王小明</li>
      <li>2018-10-01 10:30</li>
      <li>
          <router-link to='/prescription/unfinish/detail'><i class="el-icon-search icon_turn"></i></router-link>     
      </li>
    </ul>
  </div>
  <div class="info_lists info_list">
   <ul class="list_head">
    <li>20181016732</li>
    <li>武昌区水果湖社区卫生服务中心</li>
    <li>王小明</li>
    <li>王小明</li>
    <li>2018-10-01 10:30</li>
    <li><i class="el-icon-search"></i></li>
  </ul>
</div>
</div>
<!-- 分页 -->
<div class="page_size">
  <div class="total">
     共&nbsp;<i>12</i>&nbsp;条  
  </div>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="40">
</el-pagination>
</div>
</div>
</template> 
<script> 
  export default { 
    name: 'unfinish', 
    data () { 
      return { 
        data:[
        
        ]
      }; 
    }, 
    created:{

    },
    methods: { 

    } 
  }; 
</script> 
<style scoped> 
.unfinish_content{
  height: 100%;
  margin-left:38px;
}
.process{
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
  color: #bdc0c5;
}
.el-breadcrumb__separator{
  margin: 0 3px;
}
.process >>> .el-breadcrumb__inner.is-link{
 color: #8a8fff;
 font-weight:0;
}
.content_list{
  width: 1200px;
}
.status_nav{
  height: 60px;
  box-shadow:1px #e1e7f8;
  background-color: #f7f9ff;
  padding-top: 20px;
}
.Refresh{
  margin-left: 25px;
  float: left;
  cursor: pointer;
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
.info_list{

}
.list_head{
  height: 45px;
  background-color: #f0f5ff;
  border-bottom: 1px;
}
.list_head li{
  height: 43px;
  line-height: 43px;
  float: left;
  text-align: center;
  color: #a1a6ff;
  border:1px solid #d8daff;
  font-size: 16px;
  font-family: '微软雅黑';
  border-bottom: 0px;
}
.list_head li:last-of-type{
  border-bottom: 1px;
}
.list_head li:first-of-type{
  width: 15.5%;
  margin-right: -1px;
}
.list_head li:nth-of-type(2){
  width: 30%;
  margin-right: -1px;
}
.list_head li:nth-of-type(3){
  width: 12%;
  margin-right: -1px;
}
.list_head li:nth-of-type(4){
  width: 12%;
  margin-right: -1px;
}
.list_head li:nth-of-type(5){
  width: 20%;
  margin-right: -1px;
}
.list_head li:last-of-type{
  width: 10%;
  margin-right: -1px;
}
.icon_turn{
  color: #8a8fff;
}
/*分页*/
.page_size{
  width: 1200px; 
  margin-top: 30px; 
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
  width: 1200px;
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