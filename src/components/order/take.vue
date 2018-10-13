<template> 
	<div class="take">
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/order/take' }">自提订单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 内容 -->
		<div class="take_content">
			<!-- 搜索栏 -->
			<div class="status_nav">
				<div class="Refresh"  @click="openFullScreen" element-loading-text="拼命加载中"
				v-loading.fullscreen.lock="fullscreenLoading"><i class="el-icon-refresh"></i></div>
				<div class="take_status">
					<el-select v-model="value" placeholder="请选择订单状态">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="search">
				<div class="search_input">
					<input type="text" name="" placeholder="订单编号/手机号码" maxlength="18" v-model="search">
					<div class="btn_search" @click="btn_search">
						<i class="el-icon-search icon_turn"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="take_lists">
			<div class="info_list">
				<ul class="list_head">
					<li>订单编号</li>
					<li>取药门店</li>
					<li>用户姓名</li>
					<li>手机号码</li>
					<li>开方时间</li>
					<li :style="{'width':id==5?'13%':'7%'}">订单状态</li>
					<li v-if="id==5?false:true">操作</li>
				</ul>
			</div>
			<div class="info_lists info_list">
				<ul class="list_head" v-for="(item,index) in data">
					<li>{{item.billNo}}</li>
					<li :title="item.gysName">
						<div :title="item.gysName" class="icon_text" :style="{'background-color':statustext[item.gysId][0]}">
							<span>{{item.gysName}}</span>
						</div>
						{{item.storesName}}
					</li>
					<li>{{item.name}}</li>
					<li>{{item.phone}}</li>
					<li>{{item.createTime}}</li>
					<li :style="{'color':statusText[item.orderStatus][0],'width':id==5?'13%':'7%'}" >{{statusText[item.orderStatus][1]}}</li>
					<li v-if="id==5?false:true">
						<router-link :to="{path:'./takeorder',query:{id:item.id,cfId:item.cfId}}"><i class="el-icon-search icon_turn"></i></router-link>     
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
		total:"",
		data:[],
		search:'',
		fullscreenLoading: false,
		statusText: {
         		 1: ['#37c5c7',"已完成"], //国药
         		 0: ['#f8b551',"未完成"], //预留
         		},
         		statustext: {
          		 2: ['#9b9b9b'],  //九州通
          1: ['#37c5c7'], //国药
          3: ['#f8b551'], //预留 
      },
      options: [{
      	value: '0',
      	label: '未完成'
      }, {
      	value: '1',
      	label: '已完成'
      },{
      	value:'',
      	label:'全部'
      }],
      value: '',
      id:"",
      url:familyDoctor()
  }; 
}, 
watch:{
	value:function(){
		axios({
			method: 'post',
			url: this.url+"/zhuoya-yplz/Order/findOrderList",
			headers: {'token': localStorage.getItem("token")},
			data: {
				pageNum: "1",
				pageSize: '6',
				qyfs:"0",
				status:this.value
			}
		}).then((response)=>{
			this.total=response.data.accountPage.total
			this.data=response.data.accountPage.records
		})
	},
},	
methods: { 
// 刷新
openFullScreen() {
	this.fullscreenLoading = true;
	setTimeout(() => {
		this.fullscreenLoading = false;
		this.requestdata()
	}, 2000);
},
// 分页
handleCurrentChange(val){
	if(this.value){
		axios({
		method: 'post',
		url: this.url+"/zhuoya-yplz/Order/findOrderList",
		headers: {'token': localStorage.getItem("token")},
		data: {
			pageNum: val,
			pageSize: '6',
			qyfs:"0",
			status:this.value
		}
	}).then((response)=>{
		this.data=response.data.accountPage.records
		this.total=response.data.accountPage.total
	})
	}else{
		axios({
		method: 'post',
		url: this.url+"/zhuoya-yplz/Order/findOrderList",
		headers: {'token': localStorage.getItem("token")},
		data: {
			pageNum: val,
			pageSize: '6',
			qyfs:"0"
		}
	}).then((response)=>{
		this.data=response.data.accountPage.records
		this.total=response.data.accountPage.total
	})
	}
	
},
//请求数据
requestdata(){
	axios({
		method: 'post',
		url: this.url+"/zhuoya-yplz/Order/findOrderList",
		headers: {'token': localStorage.getItem("token")},
		data: {
			pageNum: "1",
			pageSize: '6',
			qyfs:"0"
		}
	}).then((response)=>{
		this.total=response.data.accountPage.total
		this.data=response.data.accountPage.records
	})
},
btn_search:function(){
	axios({
		method: 'post',
		url: this.url+"/zhuoya-yplz/Order/findOrderList",
		headers: {'token': localStorage.getItem("token")},
		data: {
			searchkey:this.search,
			pageSize:'6',
			pageNum:"1",
			qyfs:"0",
			status:this.value
		}
	}).then((response)=>{
		this.total=response.data.accountPage.total
		this.data=response.data.accountPage.records
	})
}
} ,
created(){
		this.id=window.localStorage.getItem("roleId")
		this.requestdata()
	}
}; 
</script> 

<style scoped> 

.take{
	height: 100%;
	margin: 0 3% ;
}
.process{
	height: 6%;
	min-height: 39px;
	width: 100%;
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
	width: 100%;
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
.take_status{
	width: 240px;
	float: left;
	margin-left: 100px;
	height: 40px;
	margin-top: 2%;
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
	font-size: 15px;
	font-family: '微软雅黑';
	margin-right: -1px;
}
.list_head li:first-of-type{
	width: 20%;
}
.list_head li:nth-of-type(2){
	width: 20%;
	padding: 0 3%;
	position: relative;
	overflow: hidden;
    white-space: nowrap;
  text-overflow: ellipsis;
}
.list_head li:nth-of-type(3){
	width: 9%;
}
.list_head li:nth-of-type(4){
	width: 13%;
}
.list_head li:nth-of-type(5){
	width: 19%;
}
.list_head li:nth-of-type(6){
	width: 7%;
}
.list_head li:last-of-type{
	width: 6%;
}
.icon_turn{
	color: #8a8fff;
}
.icon_text{
	height: 45px;
	width: 65px;
	position: absolute;
	top: -18px;
	left:-29px;
	transform: rotate(-51deg);
	line-height: 70px;
	color: white;
	white-space: normal
}
.icon_text span{
	display: block;
	width: 30px;
	height: 45px;
	position: absolute;
	bottom: 0;
	left: 25%;
	font-size: 14px;
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