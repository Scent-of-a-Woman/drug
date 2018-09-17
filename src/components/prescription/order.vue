 
<template> 
	<div class="order">
		<!-- 面包屑 -->
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item :to="{ path: '//prescription/unfinish' }">处方管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">待处理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/prescription/unfinish/detail' }">订单详情</el-breadcrumb-item>
				<el-breadcrumb-item >处方详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 内容 -->
		<div class="content">
				<div class="content_nav">
					<div class="nav_left">
						处方详情
					</div>
					<div class="nav_right">
						{{num}}
					</div>
				</div>
				<div class="drugs_info">
					<div class="order_aside">
						<h6>药店自取</h6>
						<div class="drug_list">
							<ul>
								<li>药店名称</li>
								<li>距离</li>
								<li>总价</li>
							</ul>
							<ul v-for="(item,index) in data">
								<li>{{item.name}}</li>
								<li>{{item.juli}}</li>
								<li>{{item.total}}</li>
							</ul>
							
						</div>
						<div class="order_aside_total">
								共 <span>{{total}}</span> 个门店
						</div>
					</div>
					<div class="order_right">
						<h6>药企配送</h6>
						<div class="drug_list Middleman_list">
							<ul>
								<li>价格/药企</li>
								<li>配送至</li>
							</ul>
							<ul v-for="(item,index) in data" class="Middleman_lists">
								<li>{{item.name}}</li>
								<li>{{item.juli}}</li>
								<li>{{item.name}}</li>
							</ul>
							
						</div>
						<div class="order_aside_total">
								共 <span>{{total}}</span> 家配送药企
						</div>
					</div>
				</div>
				<!-- 用户信息 -->
				<div class="user_info">
					<div class="user_name">
						<p>收件人姓名</p>
						<input type="text" name="" maxlength="5">
					</div>
					<div class="user_phone">
						<p>收件人电话</p>
						<input type="text" name="" maxlength="5">
					</div>
					<div class="user_adress">
						<p>收件人地址</p>
						<input type="text" name="" maxlength="30">
					</div>
				</div>
				<div class="sure_info">
					<span><router-link :to="{ path: '/prescription/unfinish/pay' }">下一步</router-link></span>
				</div>
		</div>
	</div>
</template> 

	<script> 
		export default { 
			name: 'component_name', 
			data () { 
				return { 
					num:"No.201800001",
					data:[
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						},
						{
							name:'阿里健康大药房',
							juli:"2km",
							total:"234.0"
						}
					],
					total:'23'
				}; 
			}, 

			methods: { 

			} 


		}; 
	</script> 

	<style scoped> 
	h6{
	padding: 0;
	margin: 0;
	height: 38px;
	line-height: 38px;
	font-size: 16px;
	font-weight: normal;
	color: #8a8fff;
}
	.order{
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
.content{
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
.drugs_info{
	overflow: hidden;
	padding-bottom: 20px;
}
.order_aside{
	width: 47%;
	float: left;
	margin-right: 3%;
}
.order_right{
	width: 50%;
	float: left;
}
.drug_list{
	width: 100%;
	height:420px;
	overflow-y: auto;
}
.drug_list ul:first-of-type{
	border-bottom: 0px;
}
.drug_list li{
	float: left;
	border:1px solid #dbe9ff;
	text-align: center;
	height: 40px;
	line-height: 40px;
	color: #9297ff;
	margin-right: -1px;
	background-color: #f0f5ff;
	margin-bottom: -1px;
}
.drug_list li:first-of-type{
	width: 38%;
}
.drug_list li:nth-of-type(2){
	width: 30%;
}
.drug_list li:last-of-type{
	width: 31%;
}
.order_aside_total{
	width: 97%;
	text-align: center;
	margin-top: 10px;
}
.Middleman_list li:last-of-type,.Middleman_lists li:last-of-type{
	width: 61%;
}
.Middleman_lists li:nth-of-type(2),.Middleman_lists li:nth-of-type(3){
	border-bottom: 0;
	width: 61%;
}
.Middleman_lists li:first-of-type{
	height: 79px;
	line-height: 79px;
}
.user_info{
	overflow:hidden;
	padding-bottom: 30px;
}
.user_name,.user_phone,.user_adress{
	height: 70px;
	float: left;
}
.user_name{
	width: 20%;
	margin-right: 3%;
}
.user_phone{
	width: 20%;
	margin-right: 3%;
}
.user_adress{
	width: 53%
}
.user_adress input{
	width: 100%;
	padding-left:10px;
	font-size: 16px;
	color: #8a8fff;
}
.user_info p{
	height: 35px;
	line-height: 35px;
	color: #adadad;
}
.user_info input{
	height: 33px;
	border: 1px solid #dcdcdc;
	padding-left:10px;
	font-size: 16px;
	color: #8a8fff;
}
.sure_info{
	height: 40px;
	padding-bottom: 30px;
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
}
</style> 