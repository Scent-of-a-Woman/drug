<template>
	<div class="pay">
		<!-- 面包屑 -->
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">处方管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">待处理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish/detail' }">订单详情</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish/order' }">处方详情</el-breadcrumb-item>
				<el-breadcrumb-item >订单支付</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 内容 -->
		<div class="pay_content">
			<div class="content_nav">
				<div class="nav_left">
					处方详情
				</div>
				<div class="Refresh"  @click="openFullScreen" element-loading-text="拼命加载中"
				v-loading.fullscreen.lock="fullscreenLoading"><i class="el-icon-refresh"></i></div>
			</div>
			<div class="detail_info">
				<div class="pay_aside">
					<h6>订单详情</h6>
					<div class="order_detail">
						<div class="detail_drug">
							<h6>-------- 药品信息 --------</h6>
							<ul class="drug_info" v-for="(item,index) in druglist">
								<li>{{item.drugName}}</li>
								<li>x {{item.total}}</li>
								<li>{{item.drugPrice}}</li>
							</ul>
							<ul class="drug_info">
								<li></li>
								<li>合计</li>
								<li>{{drugs_sum}}</li>
							</ul>
						</div>
						<div class="detail_user">
							<h6>-------- 用户信息 --------</h6>
							<ul class="user_info">
								<li>{{data.name}}</li>
								<li>{{data.phone}}</li>
								<li>{{data.address}}</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="pay_right" >
					<h6>扫码支付</h6>
					<div class="pay_saoma" v-if="jystatus==1?false:true">
						<div class="pay_code" >
							<div id="qrcode" ></div> 
							
						</div>
						<div class="code_info">
							<h6><span>{{drugs_sum}}</span>元</h6>
							<p>支付宝扫描二维码完成支付</p>
						</div>
						
					</div>
					<div class="pay_saoma" v-if="jystatus==0?false:true">
						<div class="finshed">
								<i class="iconfont icon-zhengquewanchengchenggong"></i>
								<h3>支付成功！</h3>
						</div>
					<div class="finsh_status">
							
							<span class="time"><i>{{time}}</i>秒后将自动返回处方列表</span>
							<div class="return"><span @click="returnList">立即返回</span></div>
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
	import QRCode from 'qrcodejs2' 
	export default { 
		name: 'component_name', 
		data () { 
			return { 
				data:[],
				zt_info:{},
				fullscreenLoading: false,
				url:familyDoctor(),
				ewm:"",
				orderNum:"",//订单号
				timer:null,
				druglist:[],
				drugs_sum:"",
				time:"15",
				jystatus:"0",
				t:null,
				tt:null
			}; 
		}, 
		created(){
			this.data=JSON.parse(window.localStorage.getItem("userInfo"))
			this.ps_home=JSON.parse(window.localStorage.getItem("ps_home"))
			this.ps_yiyuan=JSON.parse(window.localStorage.getItem("ps_yiyuan"))
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
			requestData:function(){
					axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/pay/createOrder",
					headers: {'token': localStorage.getItem("token")},
					data: {
						name:this.data.name,
						phone:this.data.phone,
						gysId:this.ps_home.gysId+"",
						cfId:this.ps_home.cfId+"",
						qyfs:1+"",
		 				amount:this.ps_home.price,
		 				// amount:"0.01", 
		 				address:this.data.address
		 			}
		 		}).then((response)=>{
		 			this.ewm=response.data.qrCode
		 			this.orderNum=response.data.tradeNo
		 			this.druglist=response.data.drugList
		 			this.drugs_sum=response.data.drugs_sum
		 			this.qrcode()
		 		})
		 	},
		 	qrcode () {
		 		let qrcode = new QRCode('qrcode', {
		 			width: 200,
       				height: 200, // 高度 
      			    text:this.ewm // 二维码内容
      			})
		 	}, 
		 	returnList:function(){
		 		this.$router.push("/prescription/unfinish")
		 	},
		 	cxcode:function(){
		 		axios({
		 			method: 'post',
		 			url: this.url+"/zhuoya-yplz/pay/selectTradestatus",
		 			headers: {'token': localStorage.getItem("token")},
		 			data: {
		 				out_trade_no:this.orderNum
		 			}
		 		}).then((response)=>{
		 				if(response.data.code==0&&response.data.msg=="TRADE_SUCCESS"){
		 					this.$message.success("支付成功")
		 					this.jystatus="1"
		 					clearInterval(this.t)
		 					this.djs()
		 				}
		 		})		 		
		 	},
		 	cnm:function(){//设置定时器
		 		let _this=this
		 		_this.t=setInterval(function(){
		 			_this.cxcode()
		 		}, 1000);
		 	},
		 	cq:function(){//清除定时器
		 		let _this=this
		 		setTimeout(function(){
		 			clearInterval(_this.t)
		 		 },16000)
		 	},
		 	djs:function(){//倒计时
		 		let _this=this
		 		_this.tt=setInterval(function(){
		 			_this.time=_this.time-1
		 			if(_this.time==0){
		 					 _this.$router.push("/prescription/unfinish")
		 			}
		 		}, 1000);
		 	},
		 	wr:function(){//进入页面之后的3s执行定时器
		 		let _this=this
		 		setTimeout(function(){
		 				_this.cnm()
		 		},3000)
		 	}
		},
		 mounted() {
		   this.wr()
		},
		destroyed:function(){
			clearInterval(this.t)
			clearInterval(this.tt)
		}
	}; 
</script> 

<style  scoped> 
h6,h3{
	height: 38px;
	line-height: 38px;
	font-size: 16px;
	font-weight: normal;
	color: #8a8fff;
}
h3{
	font-size: 30px!important;
	color:#000;
	margin: 0;
	margin-left: 20px;
	text-align: center;
}
.pay{
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
.pay_content{
	width: 100%;
}
.content_nav{
	height: 80px;
	width: 91%;
	padding-right: 3%;
	padding-left: 3%;
	background-color: #f7f9ff;
	display: flex;
}
.detail_info{
	overflow: hidden;
	padding-bottom: 50px;
	width: 94%;
	padding-left: 3%;
	background-color: white;
	min-height: 400px;
}
.nav_left{
	flex: 1;
	line-height: 80px;
	color: #8a8fff;
	font-size: 20px;
	font-weight: 700;
}
.nav_right{
	flex: 1;
	line-height: 80px;
	text-align: right;
	color: #8a8fff;
}
.Refresh{
	margin-left: 25px;
	float: left;
	cursor: pointer;
	height: 40px;
	margin-top: 20px;
}
.el-icon-refresh{
	font-size: 40px;
	color: #8a8fff;
}
.pay_aside{
	width: 47%;
	float: left;
	margin-right: 3%;
}
.pay_right{
	width: 47%;
	float: left;
}
/*支付详情*/
.order_detail{
	border: 1px solid #dddeff;
	padding:  0px 3%;
	min-height: 500px;
}
.detail_drug {
	min-height: 250px;
	margin-top: 20px;
}
.detail_drug ul:last-of-type{
	border-top: 1px solid #d2d2d2;
}
.detail_drug ul:last-of-type{
	padding-top:20px; 
}
.detail_drug h6,.detail_user h6{
	text-align: center;
	margin-bottom: 10px;
}
.detail_drug .drug_info:last-of-type li:last-of-type{
	color: #F3A46B;
}
.drug_info{
	overflow: hidden;
	padding-bottom: 10px;
}
.drug_info li{
	float: left;
	font-size: 16px;
	height: 20px;
	line-height: 20px;
}
.user_info li{
	margin-bottom: 5px;
}
.drug_info li:first-of-type{
	width: 50%;
}
.drug_info li:nth-of-type(2){
	width: 25%;
	text-align: right;
}
.drug_info li:last-of-type{
	width: 25%;
	text-align: right;
}
.user_info li:last-of-type{
	max-height: 80px;
}
.pay_saoma{
	border: 1px solid #dddeff;
	min-height: 500px;

}
.pay_code{
	margin:auto;
	margin-top: 50px;
	height: 200px;
	width: 200px;
	line-height: 200px;
	text-align: center;
	overflow: hidden;
}
.code_info{
	text-align: center;
}
.code_info h6{
	color: #f19149;
	font-size: 20px;
	margin-bottom: 10px;
}
.code_info p{
	color: #a4a4a4;
}
.finshed{
	margin-top: 40px;
}
.icon-zhengquewanchengchenggong{
	font-size: 150px;
	color:#5cb530;
	text-align: center;
	display: block;
	font-family: "微软雅黑",
}
.finsh_status{
	margin-top: 150px;
}
.finsh_status .time{
	display: block;
	text-align: center;
	margin-bottom: 20px;
}
.time i{
	font-style: normal;
	margin-right: 3px;
	color: #F3A46B;
}
.return{
	 height: 40px;
 padding-bottom: 20px;
}
.return span{
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
</style> 