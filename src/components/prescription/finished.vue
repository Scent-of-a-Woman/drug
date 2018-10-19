<template> 
	<div class="finished">
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">处方管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">已处理</el-breadcrumb-item>
				<el-breadcrumb-item >处方详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="detail_content">
			<div class="content_nav">
			<div class="nav_left">
				处方详情
			</div>
		</div>
		<div class="content_info">
			<div class="detail_info_left">
  	  		<div class="info_name">
  	  			<h5>医生信息</h5>
  	  			<div class="info_form">
  	  				<ul>
  	  					<li>
  	  						<span>开方机构：</span>
  	  						 <p>{{data.organName}}</p>
  	  					</li>
  	  					<li>
  	  						<span>开方医生：</span>
  	  						 <p>{{data.doctorName}}</p>
  	  					</li>
                <li>
                  <span>开方时间：</span>
                   <p>{{data.kfTime}}</p>
                </li>
  	  				</ul>
  	  			</div>
  	  		</div>
  	  		<div class="info_user">
  	  			<h5>患者信息</h5>
  	  			<div class="info_sick">
  	  				<ul>
  	  					<li>
  	  						<span>姓名：</span>
  	  						 <p>{{data.patientName}}</p>
  	  					</li>
  	  					<li>
  	  						<span>科室：</span>
  	  						 <p>{{data.departName}}</p>
  	  					</li>
  	  					<li>
  	  						<span>性别：</span>
  	  						 <p>{{sexdata[data.patientSex]}}</p>
  	  					</li>
                <li>
                  <span>电话：</span>
                   <p>{{data.patientTel}}</p>
                </li>
  	  				</ul>
  	  			</div>
  	  		</div>
  	  		<div class="info_result">
  	  			<h5>疾病信息</h5>
  	  			<div class="info_form">
  	  			    <div>{{data.organDiseaseName}}</div>
  	  			</div>
  	  		</div>
  	  	</div>
  	  	<div class="detail_info_right">
  	  		<div class="right_nav">
  	  			<div class="right_info_left">RP</div>
  	  			<div class="right_info_right">
  	  				<span>开方时间 ： </span>
  	  				<span>{{data.kfTime}}</span>
  	  			</div>
  	  		</div>
  	  		<div class="drug_content">
  	  			<ul class="drug_list">
  	  				<li>药品名称</li>
  	  				<li>生产商家</li>
  	  				<li>规格</li>
  	  				<li>数量</li>
  	  				<li>药品编码</li>
  	  			</ul>
  	  			<ul class="list_data" v-for="(item,index) in data.drugs">
  	  				<li>{{item.drugName}}</li>
  	  				<li>{{item.producer}}</li>
              <li>{{item.specification}}</li>
              <li>{{item.total}}</li>
              <li>{{item.drugCode}}</li>
  	  			</ul>
  	  		</div>
  	  	</div>
  	  </div>
		</div>
		</div>
	</div>
</template> 
<script> 
	 import axios from 'axios'
import { familyDoctor } from "../../common/common.js"
	export default { 
		data () { 
			return { 
				cfId:"",
				 url:familyDoctor(),
      			data:{},
      			id:"",
      			sexdata:["男","男","女"]
			}; 
		}, 
		created(){
			this.cfId=this.$route.query.id
			 this.requestData()
		},
		methods: { 
			     requestData(){
          			axios({
         			 method: 'post',
         			 url: this.url+"/zhuoya-yplz/prescription/select",
         			 headers: {'token': localStorage.getItem("token")},
         			 data: {
         				  id:this.cfId
          				}
       				 }).then((response)=>{
          					this.data=response.data.cf
        			})
     			 },
			} 
}; 
</script> 

<style  scoped> 
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
	color: #a4a4a4;
}
.finished{
	height: 100%;
	margin: 0 3% 0 3%;
}
.process{
	width: 100%;
	height: 6%;
	max-height: 39px;
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
.content_nav{
	height: 10%;
  min-height: 80px;
	width: 94%;
	display: flex;
  padding: 0 3%;
  background-color:#f7f9ff; 
}
.nav_left{
	flex: 1;
	line-height: 80px;
	color: #8a8fff;
	font-size: 20px;
	font-weight: 700;
}
.content_info{
	overflow: hidden;
  height: 70%;
  padding: 0 3%;
}
.detail_content{
	 width: 100%;
  height: 92%;
  background-color: white;
}
.detail_info_left{
	width: 30%;
	float: left;
}
.info_result .info_form{
  padding-top: 3%;
}
.info_form{
	border: 1px solid #dbe9ff;
  padding:0 3%;
}
.info_form ul{
margin-bottom:3%;
}
.info_form li{
	display: flex;
	margin-top: 12px;
  font-size: 14px;
}
.info_form li span{
	color: #a4a4a4;	
}
.info_user .info_sick{
  border: 1px solid #dbe9ff;
  padding: 3%;
  padding-top: 0;
}
.info_user .info_sick ul{
  overflow: hidden;
}
.info_user .info_sick li{
  float: left;
  width: 50%;
  display: flex;
  font-size: 14px;
  margin-top: 12px;
}
.info_user .info_sick li span{
  color: #a4a4a4; 
  white-space: nowrap;
}
.info_user .info_sick li p{
flex: 1;
}
.info_result .info_form div{
  padding:0 0 3% 0;
  color: #a4a4a4;
  font-size: 14px;
}

.detail_info_right{
	margin-left: 2%;
	float: left;
	width: 68%
}
.right_nav{
	height: 40px;
	overflow: hidden;
}
.right_info_left,.right_info_right{
	float: left;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
  color: #8a8fff;
  font-size: 16px;
}

.right_info_right{
	float: right;
  color: #a4a4a4;
}
.drug_list li{
  font-size: 16px;
}
.drug_content ul:nth-of-type(even){
  background-color: #f6f6f6;
}
.list_data li,.drug_list li{
  float: left;
  height: 44px;
  border-right: 1px solid #d8daff; 
  line-height: 44px;
  text-align: center;
  color: #8a8fff;
}
.list_data li{
	border-top: 1px solid #d8daff;
}
.list_data li{
  font-size: 14px;
  color: #a4a4a4;
}
.list_data li:last-of-type,.drug_list li:last-of-type{
	margin-right: -1px;
}
.drug_content{
  max-height: 400px;
  overflow-y: auto;
  border:1px solid #d8daff;
  border-right: 0;
}
.drug_content::-webkit-scrollbar{
  width:10px;
}
/*定义滚动条的轨道，内阴影及圆角*/
.drug_content::-webkit-scrollbar-track{
  border-radius: 10px;
  background-color: #f4f7ff;
}
/*定义滑块，内阴影及圆角*/
.drug_content::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #c3d0e5;
}
.drug_list,.list_data{
	width: 100%;
	height: 45px;
}
.drug_list{
	background-color: #f0f5ff;
}
.drug_list li:first-of-type,.list_data li:first-of-type{
	width: 25%;
}
.drug_list li:nth-of-type(2),.list_data li:nth-of-type(2){
	width: 31%;
}
.drug_list li:nth-of-type(3),.list_data li:nth-of-type(3){
	width: 15%;
}
.drug_list li:nth-of-type(4),.list_data li:nth-of-type(4){
	width: 12%;
}
.drug_list li:last-of-type,.list_data li:last-of-type{
	width: 16%;
}
</style> 