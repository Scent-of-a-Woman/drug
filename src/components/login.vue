 
<template> 

	<div class="content">
		<div class="bgc_color"></div>
		<div class="banner">
			<div class="center">
			<div class="left_logo">
				<img src="./../assets/img/login_png.png">
			</div>
			<div class="right">
				<div class="title">
					<i class="iconfont icon-icon9001 iconfont_title"></i>
					<span class="title_text">家庭医生</span>
				</div>
				<div class="title_txt">医师处方药品流转平台</div>
				<ul class="admin">
					<li class="account">
						<i class="iconfont icon-zhanghao font_color"></i>
						<input type="text" placeholder="请输入账户" maxlength="11" v-model='account'>
					</li>
					<li class="pwd">
						<i class="iconfont icon-mima font_color"></i>
						<input type="password" placeholder="请输入密码" maxlength="16" v-model='pwd'>
					</li>
				</ul>
				<div class="login_status">
					<el-checkbox-group v-model="checkList">
						<el-checkbox label="记住账号" @click="remberAccount"></el-checkbox>
						<el-checkbox label="自动登录"></el-checkbox>
					</el-checkbox-group>
				</div>
				<!-- 登录 -->
				<div class="login">
					<span @click="submit()">登 录</span>
				</div>
			</div>
		</div>
	</div>
	</div>

</template> 

<script> 
export default { 
	name: 'login', 
	data () { 
		return { 
			 checkList: ['选中且禁用','复选框 A'],
			 account:'123',
			 pwd:'23',
		}; 
	}, 

	methods: { 
		submit:function(){
			console.log(this.account)
			},
		//记住账号 
		remberAccount:function(){
			 console.log(this.account)
		}
	} 
}; 
</script> 
<style  scoped> 
.content{
	width: 100%;
	height: 100%;
	background-color: red;
}
.banner:befor,.banner:after{
	width: 50%;
	height: 100%;
	background-color: red
}
.bgc_color{
	height: 10%;
}
.banner{
	/*width: 100%;*/
	width: 914px;
	padding-left: 105px;
	padding-right: 105px;
	margin: auto;
	height: 80%;
	/*padding-top: 10%;*/
	background-color: #fff;
}
.center{
	height: 100%;
	width: 100%;
}
.left_logo{
	width: 470px;
	height: 388px;
	padding-top: 175px;
	float: left;
}
.left_logo img{
	height: 100%;
	width: 100%;
}
.right{
	float: right;
	width: 360px;
	height: 388px;
	margin-top: 175px;
}
.title{
	width: 80%;
	margin: auto;
}
.iconfont_title{
	font-size: 38px;
	margin-left:7.5%;
	color: #9db8ff;
}
.title_text{
	font-size: 38px;
	white-space: nowrap;
	color: #9db8ff;
}
.title_txt{
	text-align: center;
	margin-top: 5px;
	color: #9b9b9b;
}
.admin{
	padding: 0px;
	margin-left: 25px;
	height: 110px;
	margin-top:70px;
}
.admin li{
	list-style-type: none;
	width: 100%;
	margin: auto;
	height: 40px;
	margin-bottom:30px;
	position: relative;
}
.font_color{
	color: #cdcdcd;
	font-size: 18px;
}
.account input,.pwd input{
	height: 40px;
	padding: 0;
	width: 90%;
	border:none;
	border:1px solid #cdcdcd;
	padding-left: 25px; 
	font-size: 16px;
	font-family: '微软雅黑';
}
.font_color{
	position: absolute;
	height:40px;
	line-height: 40px;
	top: 1px;
	left: 5px;
}
.pwd{
	margin-top: 25px;
}
/*登录状态*/
.login_status{
	margin-left: 25px;
	margin-top: 30px;
}
.el-checkbox+.el-checkbox{
	float: right;
}
.login{
	margin-left: 25px;
}
.login span{
	display: block;
	height: 40px;
	background-color: #9db8ff;
	color: white;
	text-align: center;
	line-height: 40px;
	width: 100%;
	border-radius: 25px;
	margin-top: 30px;
	min-height: 35px;
	cursor: pointer;
}
</style> 