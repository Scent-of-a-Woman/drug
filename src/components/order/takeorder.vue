<template> 
	<div class="orderdetail">
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item :to="{ path: '/order/take' }">订单管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/order/take' }">自提订单</el-breadcrumb-item>
				<el-breadcrumb-item >订单管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="nav"></div>
		<div class="orderdetail_contents">
			<!-- 搜索栏 -->
			<div class="status_nav">
				<el-tabs v-model="activeName">
					<el-tab-pane label="订单详情" name="first">
						<div class="orderdetail_content">
							<div class="orderdetail_info">
								<p>药品信息</p>
								
								<p class="order_time">下单时间：<span>{{orderTime}}</span></p>
							</div>
							<div class="huadong">
								<div class="info_list">
									<ul class="list_head">
										<li>药品编码</li>
										<li>药品名称</li>
										<li>生产厂家</li>
										<li>数量</li>
										<li>单位</li>
										<li>金额</li>
										<li>药品有效期</li>
										<li>本位码</li>
									</ul>
								</div>
								<div class="info_lists info_list">
									<ul class="list_head" v-for="(item,index) in drug_data">
										<li>{{item.drugCode}}</li>
										<li>{{item.drugName}}</li>
										<li :title="item.producer">{{item.producer}}</li>
										<li>{{item.total}}</li>
										<li>{{item.specification}}</li>
										<li>{{item.drugPrice}}</li>
										<li class="trace">
											<input type="date" :disabled="orderStatus==1?true:false"
											maxlength="12" v-model="item.validDate" placeholder="格式为 xxxx-xx-xx">
										</li>
										<li class="trace">
											<input type="text" :disabled="orderStatus==1?true:false" name="本位码" v-model="item.drugBatch" maxlength="26" placeholder="本位码">
										</li>
									</ul>
								</div>
							</div>
							<div class="drug_num">
								<p class="total_drug">共<span>{{total}}</span>个药品</p>
								<p class="total_money">合计<span>{{drugs_sum}}</span>元</p>
							</div>
							<!-- 用户信息 -->
							<div class="user_info">
								<div class="user_name">
									<p>取货人姓名</p>
									<input type="text" name="" disabled v-model="user.name">
								</div>
								<div class="user_phone">
									<p>电话号码</p>
									<input type="text" name="" disabled v-model="user.phone">
								</div>
								
							</div>
							<div class="sure_info" v-if="orderStatus==1?false:true">
								
								<span @click="takend">自提完成</span>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="处方详情" name="second">
						<div class="drugdetail_content">
							
							<div class="detail_info">
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
										<h5>诊断结果</h5>
										<div class="info_form">
											<div>{{data.organDiseaseName}}</div>
										</div>
									</div> 
								</div>
								<div class="detail_info_right">
									<div class="right_nav">
										<div class="right_info_left">RP</div>
										
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
					</el-tab-pane>
				</el-tabs>
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
				activeName: 'first',
				drug_data:[],
				orderId:"",
				url:familyDoctor(),
				orderTime:"",
				drugs_sum:"",
				cfId:"",
				data:{},
				user:"",
				total:"0",
				orderStatus:"",
				sexdata:["男","男","女"]
			}; 
		}, 
		created(){
			this.orderId=this.$route.query.id
			this.cfId=this.$route.query.cfId
			this.requerstData()
			this.cfdetail()
		},
		methods: { 
			requerstData:function() {
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/Order/findOrderDetails",
					headers: {'token': localStorage.getItem("token")},
					data: {
						id:this.orderId+""
					}
				}).then((response)=>{
					this.drugs_sum=response.data.drugs_sum
					this.drug_data=response.data.Drug_list
					this.total=response.data.size
					this.user=response.data.orderEntity
					this.cfId=response.data.orderEntity.cfId
					this.orderStatus=response.data.orderEntity.orderStatus
					this.orderTime=response.data.orderEntity.createTime
				})
			},
			cfdetail:function(){
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/prescription/select",
					headers: {'token': localStorage.getItem("token")},
					data: {
						id:this.cfId+""
					}
				}).then((response)=>{
					this.data=response.data.cf
				})				
			},
			//自提完成
			takend:function(){
				for(var i=0;i<this.drug_data.length;i++){
					if(this.drug_data[i].validDate==undefined||this.drug_data[i].drugBatch==undefined){
						this.$message.error("请填写完整的信息")
						return
					}
				}
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/Order/finishOrder",
					headers: {'token': localStorage.getItem("token")},
					data: {
						finishflag:"0",
						orderId:this.user.id+"",
						cfId:this.user.cfId+"",
						details_list:this.drug_data,
					}
				}).then((response)=>{
					 if(response.data.code==0){
					 	this.$message.success(response.data.msg)
					 	this.requerstData()
					 }else{
					 	this.$message.error(response.data.msg)
					 }
					 
				})					
			}
		} 

	}; 
</script> 

<style scoped> 
h5{
	color: #a4a4a4;
}
input::-webkit-inner-spin-button { 
	padding: 5px;
 }    /*这是控制上下小箭头的*/
input::-webkit-clear-button {    /*控制清除按钮*/
	margin-top: -1px;
}
.orderdetail{
	height: 97%;
	margin: 0 3% 0 3%;
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
.status_nav{
	height: 10%;
	min-height: 80px;
	background-color: #f7f9ff;
}
.status_nav >>> .el-tabs--top{
	overflow:hidden;
}
.status_nav >>> .el-tabs__header{
	background-color: #f7f9ff;
	margin: auto;
	height: 10%;
	min-height: 80px;
}
.status_nav >>> .el-tabs__nav{
	width: 200px;
	height: 40px;
	left:50%;
	margin-left: -100px;
	margin-top: 2%;
	background-color: white;
}
.status_nav >>> .el-tabs--top .el-tabs__item.is-top:nth-child(2),.status_nav >>> .el-tabs--top .el-tabs__item.is-top:last-child{
	width: 100px;
	height: 40px;
	padding: 0;
	text-align: center;
	line-height: 40px;
	border:1px solid #bcbfff;
	color:  #bcbfff;
	
}
.status_nav >>> .el-tabs--top .el-tabs__item.is-top:nth-child(2){
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.status_nav >>> .el-tabs--top .el-tabs__item.is-top:last-child{
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.status_nav >>> .el-tabs__active-bar{
	display: none;
}
.status_nav >>> .el-tabs__item.is-active{
	color: white!important;
	background-color: #bcbfff;
}
.status_nav >>> .el-tabs__nav-wrap::after{
	display: none;
}
.status_nav >>> .el-tabs__content{
	margin: 0 3%;
	overflow-y: auto;
}
.huadong{
	max-height: 317px;
	overflow: auto;
	overflow-x: hidden;
	margin-bottom: 20px;
}
.huadong::-webkit-scrollbar{
	width:10px;
}
/*定义滚动条的轨道，内阴影及圆角*/
.huadong::-webkit-scrollbar-track{
	border-radius: 10px;
	background-color: #f4f7ff;
}
/*定义滑块，内阴影及圆角*/
.huadong::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background-color: #c3d0e5;
}
.orderdetail_contents{
	width: 100%;
	background-color: white;
	height: 92%;
	box-shadow: -1px -1px 1px #d8daff;
}
.orderdetail_info{
	height: 40px;
	overflow:hidden;
}
.orderdetail_info p{
	height: 40px;
	line-height: 40px;
	color: #8a8fff;
	float: left;
	font-size: 14px;
}
.orderdetail_info p:first-of-type{
	width: 50%;
}
.orderdetail_info p:last-of-type{
	width: 50%;
	text-align: right;
}
.orderdetail_info p span{
	color: #a4a4a4;
}
.orderdetail_content{
	overflow: hidden;
}
.orderdetail_content div.info_list:nth-of-type(2){
	background-color: #f0f5ff;
}
.orderdetail_content div:nth-of-type(2) ul li{
	border:1px solid #d8daff;
	border-right: 0;
}
.info_list{
	border-right: 1px solid #d8daff;
}
.info_lists .list_head li{
	border-right: 0;
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
.info_lists ul:nth-of-type(odd){
	background-color: white;
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
.info_list ul li:first-of-type{
	width: 11%;
}
.info_list ul li:nth-of-type(2){
	width: 16%;
}
.info_list ul li:nth-of-type(3){
	width: 14%;
	padding: 0 2%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.info_list ul li:nth-of-type(4){
	width: 6%;
}
.info_list ul li:nth-of-type(5){
	width: 9%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

}
.info_list ul li:nth-of-type(6){
	width: 7%;
}
.info_list ul li:nth-of-type(7){
	width: 18%;
}
.info_list ul li:last-of-type{
	width: 15%;
}
.trace input{
	width: 80%;
	height: 30px;
	float: left;
	margin-left: 9%;
	margin-top: 6px;
	line-height: 28px;
	border-radius: 5px;
	border:1px solid #dcdcdc;
	text-align: center;
	color: #8a8fff;
}
.drug_num{
	height: 20px;
	width: 100%;
}
.drug_num p{
	float:left;
	text-align: right;
	font-size: 14px;
	color:#a4a4a4;
}
.total_drug{
	width: 70%;
}
.total_money {
	width:30%;

}
.total_drug span{
	color: #8a8fff;
	margin: 0 3px;
}
.total_money span{
	color: #f19149;
	margin-left: 5px;
}
/*收货信息*/
.user_info{
	height: 70px;
	width: 100%;
	margin-bottom: 10px;
}
.user_name p,.user_phone p{
	height: 30px;
	line-height: 30px;
	color: #a4a4a4;
	font-size: 14px;
}
.user_name input,.user_phone input{
	height:25;
	line-height: 25px;
	border:1px solid #dcdcdc;
	padding-left:5%;
	color: #888;
}
.user_name,.user_phone {
	width: 20%;
	float: left;
	margin-right: 10%;
}
.user_adress{
	width: 40%;
	float: left;
}
.sure_info{
	height: 40px;
	padding-bottom: 30px;
}
.sure_info .test_code{
	display: block;
	width: 240px;
	height: 40px;
	margin: auto;
	margin-bottom: 15px;
}
.test_code input{
	width: 238px;
	height: 38px;
	border:1px solid #8a8fff;
	border-radius: 5px;
	text-align: center;
	color: #9b9b9b;
}
.sure_info span{
	display: block;
	line-height: 40px;
	background-color: #8a8fff;
	color: white;
	width: 240px;
	height: 40px;
	margin: auto;
	border-radius: 5px;
	text-align: center;
	cursor: pointer;
}

.detail_info{
	overflow: hidden;
	padding: 1% 3% 0;
	background-color: white;
}

.detail_info_left{
	width: 30%;
	float: left;
}
h5{
	height: 40px;
	line-height: 40px;
}
.info_form{
	border: 1px solid #dbe9ff;
	padding: 3% 3% 0;
}
.info_form ul{
	margin-bottom:3%;
}
.info_form li{
	display: flex;
	margin-bottom: 12px;
	font-size: 14px;
	color: #a4a4a4;
}
.info_form li span{
	color: #a4a4a4;	
}
.info_user .info_sick{
	border: 1px solid #dbe9ff;
	padding:0 3% 3%;
}
.info_user .info_sick ul{
	overflow: hidden;
}
.info_user .info_sick li{
	float: left;
	width: 44%;
	display: flex;
	font-size: 14px;
	margin-top: 12px;
	color: #a4a4a4;
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
.right_info_left{
	float: left;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
	color: #8a8fff;
	font-size: 16px;
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
	border-top: 1px solid #d8daff;
	line-height: 44px;
	text-align: center;
	color: #8a8fff;

}
.list_data li{
	font-size: 14px;
	color: #a4a4a4;
	border-top: 0;
}
.list_data,.drug_list{
	margin-left: -1px;
}
.drug_content{
	max-height: 400px;
	overflow-y: auto;
	border:1px solid #d8daff;
	border-right: 0;
	border-top: 0;
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