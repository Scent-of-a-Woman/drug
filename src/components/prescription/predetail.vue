<template> 
 <div class="predetail" >
 	<!-- 面包屑 -->
 	<div class="process">
    <el-breadcrumb separator-class="el-icon-minus">
      <el-breadcrumb-item :to="{ path: '//prescription/unfinish' }">处方管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">待处理</el-breadcrumb-item>
      <el-breadcrumb-item >处方详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- 内容 -->
  <div class="detail_content">
  	  <div class="content_nav">
  	  	 <div class="nav_left">
  	  	 	  处方详情
  	  	 </div>
  	  	 <div class="nav_right">
  	  	 	  {{num}}
  	  	 </div>
  	  </div>
  	  <div class="detail_info">
  	  	<div class="detail_info_left">
  	  		<div class="info_name">
  	  			<h5>开方信息</h5>
  	  			<div class="info_form">
  	  				<ul>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  				</ul>
  	  			</div>
  	  		</div>
  	  		<div class="info_user">
  	  			<h5>开方信息</h5>
  	  			<div class="info_form">
  	  				<ul>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>水果湖社区卫生服务中心</p>
  	  					</li>
  	  				</ul>
  	  			</div>
  	  		</div>
  	  		<div class="info_result">
  	  			<h5>开方信息</h5>
  	  			<div class="info_form">
  	  				<textarea readonly></textarea>
  	  			</div>
  	  		</div>
  	  	</div>
  	  	<div class="detail_info_right">
  	  		<div class="right_nav">
  	  			<div class="right_info_left">rp</div>
  	  			<div class="right_info_right">
  	  				<span>开方时间 ： </span>
  	  				<span>2018-10-01 10:30</span>
  	  			</div>
  	  		</div>
  	  		<div class="drug_content">
  	  			<ul class="drug_list">
  	  				<li>药品名称</li>
  	  				<li>生产商家</li>
  	  				<li>处方分类</li>
  	  				<li>规格</li>
  	  				<li>数量</li>
  	  				<li>单位</li>
  	  			</ul>
  	  			<ul class="list_data">
  	  				<li>药品名称</li>
  	  				<li>生产商家</li>
  	  				<li>处方分类</li>
  	  				<li>规格</li>
  	  				<li>数量</li>
  	  				<li>单位</li>
  	  			</ul>
  	  		</div>
  	  	</div>
  	  </div>
  	  <div class="order">
  	   	<span><router-link :to="{ path: '/prescription/unfinish/order' }">生成订单</router-link></span> 
  	  </div>
  </div>
 </div>
</template> 
<script> 
export default { 
  name: 'component_name', 
  data () { 
    return { 
    	num:"No.201800001"
    }; 
  }, 
  methods: { 

  } 
}; 
</script> 
<style scoped> 
h5{
	padding: 0;
	margin: 0;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	font-weight: normal;
	color: #8a8fff;
}
p{
	padding: 0;
	margin: 0;
	color: #a4a4a4;
}
.predetail{
  height: 100%;
  margin-left:3%;
  width: 97%;
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
/*内容*/
.detail_content{
	width: 91%;
	background-color: white;
	padding-left: 3%;
	padding-right: 3%;
}
.content_nav{
	height: 100px;
	width: 100%;
	display: flex;
}
.detail_info{
	overflow: hidden;
	padding-bottom: 50px;
}
.nav_left{
	flex: 1;
	line-height: 100px;
	color: #8a8fff;
	font-size: 20px;
	font-weight: 700;
}
.nav_right{
	flex: 1;
	line-height: 100px;
	text-align: right;
	color: #8a8fff;

}
.detail_info_left{
	width: 30%;
	float: left;
}
.info_form{
	border: 1px solid #dbe9ff;
}
.info_form ul{
	margin-top: 21px;
	margin-left: 19px;
}
.info_form li{
	display: flex;
	margin-top: 12px;
}
.info_form li:last-of-type{
margin-bottom: 30px;
}
.info_form li span{
	color: #a4a4a4;
	font-size: 15px;
}
textarea{
	height: 100px;
	outline: none;
	border:none;
	padding: 0;
	width: 300px;
	margin: 21px 19px;
	font-size: 16px;
	color: #a4a4a4
}
.detail_info_right{
	margin-left: 2%;
	float: left;
	width: 68%
}
.right_nav{
	width: 770px;
	height: 40px;
	overflow: hidden;
}
.right_info_left,.right_info_right{
	float: left;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
}
.right_info_right{
	float: right;
}
.list_data li,.drug_list li{
	float: left;
	height: 48px;
	border:1px solid #d8daff;
	margin-left: -1px;
	line-height: 48px;
	text-align: center;
	color: #8a8fff;
}
.list_data li{
	border-top:0;
}
.drug_list,.list_data{
	width: 100%;
	height: 50px;
}
.drug_list{
	background-color: #f0f5ff;
}
.drug_list li:first-of-type,.list_data li:first-of-type{
	width: 25%;
}
.drug_list li:nth-of-type(2),.list_data li:nth-of-type(2){
	width: 20%;
}
.drug_list li:nth-of-type(3),.list_data li:nth-of-type(3){
	width: 15%;
}
.drug_list li:nth-of-type(4),.list_data li:nth-of-type(4){
	width: 19%;
}
.drug_list li:nth-of-type(5),.list_data li:nth-of-type(5){
	width: 10%;
}
.drug_list li:last-of-type,.list_data li:last-of-type{
	width: 10%;
}
.order{
	height: 40px;
	padding-bottom: 30px;
}
.order span{
	display: block;
	line-height: 40px;
	background-color: #8a8fff;
	color: white;
	width: 240px;
	margin: auto;
	border-radius: 5px;
	text-align: center;
}
</style> 