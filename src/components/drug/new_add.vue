<template> 
	<div class="orderdetail">
		<div class="process">
			<el-breadcrumb separator-class="el-icon-minus">
				<el-breadcrumb-item :to="{ path: '/drug/Supplier' }">药企管理</el-breadcrumb-item>
				<el-breadcrumb-item >供应商详情</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/drug/Supplier' }" v-if="this.id==2?false:true">供应商列表</el-breadcrumb-item>
				<el-breadcrumb-item v-if="this.id==2?false:true">新增药企</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="nav"></div>
		<div class="orderdetail_contents">
			<!-- 搜索栏 -->
			<div class="status_nav">
				<el-tabs v-model="activeName">
					<el-tab-pane label="基本信息" name="first">
						<div class="new_info_content">			
							<div class="aside">
								<div class="yaoqi_name">
									<p>供应商名称<i>*</i></p>
									<input type="text" name="" maxlength="12" v-model="gysInfo.suppliersName">
								</div>
								<div class="yaoqi_name">
									<p>对公账户<i>*</i></p>
									<input type="text" name="" maxlength="25" v-model="gysInfo.cardNo">
								</div>
								<div class="yaoqi_name">
									<p>支行名称<i>*</i></p>
									<input type="text" name="" maxlength="30" v-model="gysInfo.bankBranchName">
								</div>
								<div class="yaoqi_name">
									<p>收款人名称<i>*</i></p>
									<input type="text" name="" maxlength="30" v-model="gysInfo.cardName">
								</div>
							</div>
							<div class="newinfo_right">
								<div class="yaoqi_name">
									<p>联系电话<i>*</i></p>
									<input type="text" name="" maxlength="12" v-model="gysInfo.suppliersPhone">
								</div>
								<div class="yaoqi_name">
									<p>开户银行<i>*</i></p>
									<input type="text" name="" maxlength="12" v-model='gysInfo.bankName'>
								</div>
								<div class="yaoqi_name" >
									<p>开户地区<i>*</i></p>
									<div class="city_select">
										<el-cascader
										:options="options"
										v-model="selectedOptions"
										@change="handleChange"
										:separator="' '"
										>
									</el-cascader>
								</div>
							</div>
						</div>	
						<div class="account_pwd" v-if="this.id==2||this.id==3||this.id==4?false:true">
							<div class="account">
								<p>登陆账号<i>*</i></p>
								<input type="text" name="" maxlength="12" v-model='gysInfo.account'>
							</div>
							<div class="pwd">
								<p>登陆密码<i>*</i></p>
								<input type="text" name="" maxlength="12" v-model='gysInfo.pwd'>
							</div>
						</div>				
					</div>
					<div class="sure_info">
						<span @click='changeInfo()' v-if="id!=2||id==1||id==5?false:true">修改信息</span>
						<span @click='cjInfo()' v-if="id==2?false:true">创 建</span>
					</div>
				</el-tab-pane>
				<el-tab-pane label="服务设置" name="second">
					<div class="drugdetail_content">
						<div class="set_info">
							<div class="setup">
								<p>配送到家<i>(小时)</i></p>
								<el-select v-model="value4" clearable placeholder="请选择">
									<el-option
									v-for="item in optionsHome"
									:key="item.value4"
									:label="item.label"
									:value="item.value4">
									</el-option>
								</el-select>
						</div>
						<div class="setup">
							<p>配送到社区医院<i>(分钟)</i></p>
							<el-select v-model="value5" clearable placeholder="请选择">
									<el-option
									v-for="item in optionsHos"
									:key="item.value5"
									:label="item.label"
									:value="item.value5">
									</el-option>
								</el-select>
						</div>
						<div class="shuoming">
							<p><i>*</i>配送服务(时间)是影响用户购物体验的关键，请按照实际情况设置。</p>
						</div>

					</div>
					<div class="sure_info">
						<span @click='sureInfo()'>确定</span>
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
	import options  from '../../common/city.js'
	import { familyDoctor } from "../../common/common.js"
	export default { 
		name: 'component_name', 
		data () { 
			return { 
				selectedOptions:[],//存放默认值
       			options:options,   //存放城市数据
				status:false,//状态管理
				activeName: 'first',
				gysId:'',
				url:familyDoctor(),
				optionsHome: [{
          value4: '1小时',
          label: '1小时'
        }, {
          value4: '2小时',
          label: '2小时'
        }, {
          value4: '3小时',
          label: '3小时'
        }, {
          value4: '4小时',
          label: '4小时'
        }, {
          value4: '5小时',
          label: '5小时'
        },{
          value4: '6小时',
          label: '6小时'
        }, {
          value4: '7小时',
          label: '7小时'
        }, {
          value4: '8小时',
          label: '8小时'
        }, {
          value4: '9小时',
          label: '9小时'
        }, {
          value4: '10小时',
          label: '10小时'
        },{
          value4: '11小时',
          label: '11小时'
        }, {
          value4: '12小时',
          label: '12小时'
        }, {
          value4: '13小时',
          label: '13小时'
        }, {
          value4: '14小时',
          label: '14小时'
        }, {
          value4: '15小时',
          label: '15小时'
        },
         {
          value4: '16小时',
          label: '16小时'
        }, {
          value4: '17小时',
          label: '17小时'
        }, {
          value4: '18小时',
          label: '18小时'
        }, {
          value4: '19小时',
          label: '19小时'
        }, {
          value4: '20小时',
          label: '20小时'
        }, {
          value4: '21小时',
          label: '21小时'
        }, {
          value4: '22小时',
          label: '22小时'
        }, {
          value4: '23小时',
          label: '23小时'
        }, {
          value4: '24小时',
          label: '24小时'
        }],
        value4: '',
        optionsHos: [{
          value5: '10分钟',
          label: '10分钟'
        }, {
          value5: '20分钟',
          label: '20分钟'
        }, {
          value5: '30分钟',
          label: '30分钟'
        }, {
          value5: '40分钟',
          label: '40分钟'
        },  {
          value5: '50分钟',
          label: '50分钟'
        }, {
          value5: '60分钟',
          label: '60分钟'
        },],
        value5: '',
				gysInfo:{
					suppliersName:'',//供应商名称
					address:'',//开户地址
					suppliersPhone:'',//电话
					cardNo:'',//对公账号
					city:'',//开户银行地区
					account:'',//账号
					pwd:'',//密码
					bankBranchName:'',//支行名称
					bankName:'',//开户银行
					area:'',
					name:"",
					deliveryHome:'',
					deliveredHospital:''
				},
				id:""
			}; 
		}, 
		created(){
			this.id=window.localStorage.getItem('roleId')
			if(this.$route.query.id){
				this.gysId=this.$route.query.id				
			}else{
				this.gysId=window.localStorage.getItem('gysId')
			}
			if(this.id==1||this.id==5){
				return
			}else{			
				this.requestData()
			}
		},
		methods: { 
			handleChange(value) {
				this.gysInfo.city=value[1]
				this.gysInfo.province=value[0]
				this.gysInfo.area=value[2]

			},
			requestData:function() {
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/gys/select",
					headers: {'token': localStorage.getItem("token")},
					data: {
						id:this.gysId+""
					}
				}).then((response)=>{
					this.gysInfo=response.data.gys
					this.selectedOptions.push(this.gysInfo.province)
					this.selectedOptions.push(this.gysInfo.city)
					this.selectedOptions.push(this.gysInfo.area)
					this.value5=this.gysInfo.deliveredHospital
					this.value4=this.gysInfo.deliveryHome
				})
			},
			//创建
			cjInfo:function(){
				if(this.gysInfo.suppliersName==''||this.gysInfo.suppliersPhone==''||this.gysInfo.cardNo==''||this.gysInfo.bankName==''||this.gysInfo.province==''||this.gysInfo.city==''||this.gysInfo.bankBranchName==''||this.gysInfo.name==''){
					this.$message.error('请填写正确的供应商信息');
					this.status=true
					return
				}
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/gys/save",
					headers: {'token': localStorage.getItem("token")},
					data: {
						suppliersName:this.gysInfo.suppliersName,
						suppliersPhone:this.gysInfo.suppliersPhone,
						cardNo:this.gysInfo.cardNo,
						bankName:this.gysInfo.bankName,
						province:this.gysInfo.province,
						city:this.gysInfo.city,
						area:this.gysInfo.area,
						bankBranchName:this.gysInfo.bankBranchName,
						cardName:this.gysInfo.cardName,
						username:this.gysInfo.account,
						password:this.gysInfo.pwd,
						cardName:this.gysInfo.name
					}
				}).then((response)=>{
					if(response.data.code==0){
						this.$message.success(response.data.msg)
						let _this=this	
						setTimeout(function(){
							_this.$router.push("/drug/Supplier") 
						}, 1000);					
					}else{
						this.$message.error(response.data.msg)
					}
				})
			},
			//修改信息
			changeInfo:function(){
				if(this.gysInfo.suppliersName==''||this.gysInfo.suppliersPhone==''||this.gysInfo.cardNo==''||this.gysInfo.bankName==''||this.gysInfo.province==''||this.gysInfo.city==''||this.gysInfo.bankBranchName==''){
					this.$message.error('请填写正确的供应商信息');
					this.status=true
					return
				}
				axios({
					method: 'post',
					url: this.url+"/zhuoya-yplz/gys/update",
					headers: {'token': localStorage.getItem("token")},
					data: {
						id:this.gysInfo.id+"",
						suppliersName:this.gysInfo.suppliersName,
						suppliersPhone:this.gysInfo.suppliersPhone,
						cardNo:this.gysInfo.cardNo,
						bankName:this.gysInfo.bankName,
						province:this.gysInfo.province,
						city:this.gysInfo.city,
						area:this.gysInfo.area,
						bankBranchName:this.gysInfo.bankBranchName,
						cardName:this.gysInfo.cardName,
						cardInfoId:this.gysInfo.cardInfoId
					}
				}).then((response)=>{
					if(response.data.code==0){
						this.$message.success(response.data.msg)						
					}else{
						this.$message.error(response.data.msg)
					}
				})
			},


		  //修改配置
		  sureInfo:function(){
		  	axios({
		  		method: 'post',
		  		url: this.url+"/zhuoya-yplz/gys/serverSave",
		  		headers: {'token': localStorage.getItem("token")},
		  		data: {
		  			deliveryHome:this.value4,
		  			deliveredHospital:this.value5
		  		}
		  	}).then((response)=>{
		  		if(response.data.code==0){
		  			this.$message.success(response.data.msg)						
		  		}else{
		  			this.$message.error(response.data.msg)
		  		}
		  	})
		  }
		} 

	}; 
</script> 

<style scoped> 
.orderdetail{
	height: 100%;
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
	width: 200px;
	margin: auto;
	height: 80px;
}
.status_nav >>> .el-tabs__nav{
	width: 200px;
	height: 40px;
	margin-top: 20px;
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
.orderdetail_contents{
	width: 100%;
	background-color: white;
	height: 92%;
	box-shadow: -1px -1px 1px #d8daff;
}
.new_info_content{
	overflow: hidden;
}
.aside,.newinfo_right{
	float: left;
	width: 50%;
}
.yaoqi_name{
	height: 70px;
	padding-bottom: 5px;
}
.yaoqi_name p{
	height: 35px;
	line-height: 35px;
	color: #a4a4a4;
	font-size: 15px;
}
.yaoqi_name p i{
	color: red;
	font-style: none;
}
.yaoqi_name input{
	height: 35px;
	line-height: 35px;
	width: 58%;
	padding-left: 2%;
	border: 1px solid #dcdfe6;
}
.el-select,.el-select >>> .el-input{
	height: 37px;
}
.el-select>>>.el-input--suffix .el-input__inner{
	height: 37px;
}
.city_select>>>input{
	outline: none;
	border-radius: 0;
	height: 37px;
	width: 99%;
}
.el-cascader >>> .el-input.is-focus .el-input__inner{
	border-color:#dfe1e2;
}
.el-cascader >>>.el-input__inner:focus{
	border-color:#dfe1e2;
}
.city_select{
	width: 61%;
	height: 37px;
}
.city_select .el-select{
	height:37px;
	width: 48%;
	float: left;
}
.el-select >>> .el-input.is-focus .el-input__inner{
	border-color:#dcdfe6;
}
.el-select >>> .el-input__inner:focus{
	border-color:#dcdfe6;
}
.city_select .el-select:last-of-type{
	float: right;
}
.account_pwd{
	float: left;
	width: 100%;
	margin-top: 50px;
	height: 70px;
	padding-bottom: 5px;
}
.account,.pwd{
	width: 50%;
	float: left;
}
.account p,.pwd p{
	height: 35px;
	line-height: 35px;
	color: #a4a4a4;
	font-size: 15px;
}
.account p i,.pwd p i{
	color: red;
	font-style: none;
}
.account input,.pwd input{
	height: 35px;
	line-height: 35px;
	width: 58%;
	padding-left: 2%;
	border: 1px solid #dcdfe6;
}
.sure_info{
	margin-top: 15px;
}
.sure_info span{
	display: block;
	width: 200px;
	margin: auto;
	background-color: #8a8fff;
	color: white;
	height: 40px;
	line-height: 40px;
	border-radius: 3px;
	text-align: center;
	cursor: pointer;
}
.set_info{
	overflow: hidden;
}
.setup{
	float: left;
	width: 50%;
	margin-top: 10px;
	height: 70px;
}
.setup p{
	height: 35px;
	line-height: 35px;
	color: #a4a4a4;
	font-size: 16px;
}
.setup p i{
	display:inline-block;
	height: 35px;
	line-height: 35px;
	color:#8a8fff;
	font-size: 16px;
	margin-left: 5px;
	font-style: normal;
}
.setup input{
	height: 35px;
	line-height: 35px;
	width: 58%;
	padding-left: 2%;
	border: 1px solid #dcdfe6;
}
.shuoming{
	color: #8f8fff;
	height: 35px;
	font-size: 16px;
	float: left;
	margin-top: 50px;
	line-height: 35px;
}
.shuoming i{
	display: block;
	float: left;
	height: 35px;
	margin-right: 5px;
}
.el-cascader{
	width: 100%;
}
</style> 