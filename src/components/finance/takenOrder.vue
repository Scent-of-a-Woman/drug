<template> 
	<div class="take">
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item>对账管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/finance/takeOrder' }">自提订单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 内容 -->
		<div class="take_content">
			<!-- 搜索栏 -->
			<div class="status_nav">
				<div class="take_status">
					<el-button type="text" @click="dialogVisible = true" style="font-size:16px">条件查询</el-button>
					<el-dialog title="按条件查询" :visible.sync="dialogVisible" size="tiny" id="term_select" >
						<!--时间选择器  -->
						<div class="select_time">
							<div class="time_title">起始时间</div>
							<div class="block">
								<el-date-picker v-model="valuestart" 
								placeholder="选择日期时间"></el-date-picker>
							</div>
						</div>
						<!-- 结束 -->
						<div class="select_time">
							<div class="time_title">截至时间</div>
							<div class="block">
								<el-date-picker v-model="valueend"  placeholder="选择日期时间"></el-date-picker>
							</div>
						</div>
						<span slot="footer" class="dialog-footer">
							<el-button type="primary" @click="dialogVisible = false;getTerm(valuestart,valueend)">确 定</el-button>
							<el-button @click="dialogVisible = false" class="reset">取 消</el-button>
						</span>
					</el-dialog>
				</div>
				
				<div class="search">
					<div class="search_input">
						<input type="text" name="" placeholder="订单编号/手机号码/姓名" maxlength="18" v-model="search">
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
						<li>交易金额</li>
						<li>用户姓名</li>
						<li>手机号码</li>
						<li>交易商户</li>
						<li>完成时间</li>
					</ul>
				</div>
				<div class="info_lists info_list">
					<ul class="list_head" v-for="(item,index) in data">
						<li>{{item.billNo}}</li>
						<li>{{item.recipeamount}}</li>
						<li>{{item.name}}</li>
						<li>{{item.phone}}</li>
						<li :title="item.gysName">
							<div :title="item.gysName" class="icon_text" :style="{'background-color':statustext[item.gysId][0]}">
								<span>{{item.gysName}}</span>
							</div>
						{{item.storesName}}</li>
						<li :title="item.createTime">
							{{item.createTime}}     
						</li>
					</ul>
				</div>
			</div>
			<!-- 分页 -->
			<div class="page_size">
				<div class="total">
					共&nbsp;<i>{{total}}</i>&nbsp;条 &nbsp;共收款&nbsp;<i>{{sum}}</i>&nbsp;元
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
	import axios from "axios";
	import { familyDoctor, getLastDate } from "../../common/common.js";
	export default { 
		name: 'component_name', 
		data () { 
			return { 
				url:familyDoctor(),
search:"",
valueend:'',
total:'',
valuestart:"",
dialogVisible: false,
startTime:"",
statustext: {
          		 2: ['#9b9b9b'],  //九州通
          		 1: ['#37c5c7'], //国药
         		 3: ['#f8b551'], //预留 
     			 },
endTime:"",
data:[],
fullscreenLoading: false,
sum:'',
}; 
}, 
created(){
	this.requestData()
},
methods: { 
	getTerm:function() {
		this.startTime = getLastDate(arguments[0])
		this.endTime = getLastDate(arguments[1])
		axios({
			method: 'post',
			url: this.url+"/zhuoya-yplz/account/findZTAccount",
			headers: {'token': localStorage.getItem("token")},
			data: {
				pageNum: "1",
				pageSize: '6',
				beginDate:this.startTime,
				endDate:this.endTime
			}
		}).then((response)=>{
			if(response.data.code==0){
				this.total=response.data.accountPage.total
			this.sum=response.data.sum
			this.data=response.data.accountPage.records
			}else{
				this.$message.erroe(response.data.msg)
			}
			
		})
	},
	requestData:function(){
		axios({
			method: 'post',
			url: this.url+"/zhuoya-yplz/account/findZTAccount",
			headers: {'token': localStorage.getItem("token")},
			data: {
				pageNum: "1",
				pageSize: '6'
			}
		}).then((response)=>{
			this.total=response.data.accountPage.total
			this.sum=response.data.sum
			this.data=response.data.accountPage.records
		})
	},
	//分页
			handleCurrentChange(val){
				if(this.startTime&&this.endTime){
					axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/account/findZTAccount",
					headers: {'token': localStorage.getItem("token")},
					data: {
						pageNum: val,
					pageSize: '6',
					beginDate:this.startTime,
         			endDate:this.endTime,
         			searchkey:this.search,
						
					}
				}).then((response)=>{
						if(response.data.code==500){
						this.$message.error(response.data.msg)
					}else{
						this.total=response.data.accountPage.total
						this.data=response.data.accountPage.records
					}
					})
				}else if(this.search){
						axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/account/findZTAccount",
					headers: {'token': localStorage.getItem("token")},
				data: {
						pageNum: val,
						pageSize: '6',
						searchkey:this.search,
				}
			}).then((response)=>{
				if(response.data.code==500){
						this.$message.error(response.data.msg)
					}else{
						this.total=response.data.accountPage.total
						this.data=response.data.accountPage.records
					}
			})
		}else{
			axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/account/findZTAccount",
					headers: {'token': localStorage.getItem("token")},
				data: {
						pageNum: val,
						pageSize: '6',
				}
			}).then((response)=>{
				if(response.data.code==500){
						this.$message.error(response.data.msg)
					}else{
						this.total=response.data.accountPage.total
						this.data=response.data.accountPage.records
					}
			})
		}
		},	
			btn_search:function(){
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/account/findZTAccount",
					headers: {'token': localStorage.getItem("token")},
					data: {
						searchkey:this.search,
						pageSize:'6',
						pageNum:"1",
					}
				}).then((response)=>{
					this.total=response.data.accountPage.total
					this.data=response.data.accountPage.records
				})
			}
		} 
	}; 
</script> 

<style scoped> 
.take_status >>>.el-button--text{
	color: #8a8fff;
}
.take_status >>> .el-dialog__header span{
	font-size: 16px;
}
.take_status >>> .el-dialog{
	width: 300px;
}
.take_status >>> .el-dialog__body{
	padding: 0px 20px;
	height: 140px;
}
.take_status >>> .el-dialog__body .select_time{
	height: 70px;
}
.take_status >>> .el-dialog__body .select_time .time_title{
	height: 30px;
	line-height: 30px
}
.take_status >>> .el-dialog__footer{
	text-align: center;
	padding: 20px 20px 20px;
}
.el-input{
	width: 100%;
}
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
.take_status{
	width: 240px;
	float: left;
	margin-left: 3%;
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
	width: 10%;
}
.list_head li:nth-of-type(3){
	width: 15%;
}
.list_head li:nth-of-type(4){
	width: 15%;
}
.list_head li:nth-of-type(5){
	width: 19%;
	padding: 0 3%;
	position: relative;
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.list_head li:last-of-type{
	width: 13%;
	padding: 0 1%;
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
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
	background-color: green;
	transform: rotate(-51deg);
	line-height: 70px;
	color: white;
	white-space: normal;
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