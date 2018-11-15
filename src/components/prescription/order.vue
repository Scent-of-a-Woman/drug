 <template> 
 	<div class="order">
 		<!-- 面包屑 -->
 		<div class="process">
 			<el-breadcrumb separator-class="el-icon-minus">
 				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">处方管理</el-breadcrumb-item>
 				<el-breadcrumb-item :to="{ path: '/prescription/unfinish' }">待处理</el-breadcrumb-item>
 				<el-breadcrumb-item :to="{ path: '/prescription/unfinish/detail' }">处方详情</el-breadcrumb-item>
 				<el-breadcrumb-item >生成订单</el-breadcrumb-item>
 			</el-breadcrumb>
 		</div>
 		<!-- 内容 -->
 		<div class="content">
 			<div class="content_nav">
 				<div class="nav_left">
 					生成订单
 				</div>

 			</div>
 			<div class="drugs_info">
 				<div class="header_nav">
 					<ul>
 						<li>排序</li>
 						<li>药店名称</li>
 						<li @click="computed_paixu">距离<i class="iconfont icon-paixu"></i>	</li>
 						<li @click="computed_price">总价<i class="iconfont icon-paixu"></i></li>
 						<li>操作</li>
 					</ul>
 				</div>
 				<div class="Datazt">
 					<ul v-for='(item,index) in dataprice' @click="son(item,index)" :class="{ selected:index==current}" >
 						<li>{{index+1}}</li>
 						<li>{{item.storesName}}</li>
 						<li>{{item.distance}}</li>
 						<li>{{item.price}}</li>
 						<li @click="currentStatus(item,index)">{{item.status}}</li>
 						<!-- <li>已选择</li> -->
 					</ul>
 				</div>
 			</div>
 			<div class="qystyle">
 				<div class="zt" >
 					<span :class="{chooseicon:choose==false?true:false}" @click="choosestyle">到店自取</span>
 				</div>
 				<div class="ps">
 					<span @click="chooseStyle" :class="{chooseicon:choose==true?true:false}">药品配送</span>
 				</div>
 				<p>提示：药品配送服务根据下单时间的差异，送到时间为当天或者次日。</p>
 			</div>
 			<div class="user_info">
 				<div class="user_name">
 					<p>姓名</p>
 					<input type="text" name="" maxlength="5" minlength="2" v-model='user_info.name' placeholder="收货人姓名">
 				</div>
 				<div class="user_phone">
 					<p>手机号码</p>
 					<input type="text" name="" maxlength="11" v-model='user_info.phone' placeholder="收货人联系方式">
 				</div>
 				<div class="user_adress">
 					<p>收件人地址</p>
 					<input type="text" name="" maxlength="30" minlength="10" v-model='user_info.address' placeholder="收货地址/自提可不填">
 				</div>
 			</div> 


 			<div class="sure_info">
 				<span @click="open">下一步</span>
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
 				currentText:"选择",
 				current:-1,
 				selected_info:"到店自取",
 				arr:["1","2"],
 				url:familyDoctor(),
 				user_info:{
 					name:'',
 					phone:'',
 					address:'',
 				},
 				active: false,
 				statusText: {
				 2: ['#9b9b9b'],  //九州通
         		 1: ['#37c5c7'], //国药
         		 3: ['#f8b551'], //预留
         		},
     			 item:{},//选中的信息
     			 dataps:[
     			 ],
     			 datazt:[
     			 ],
     			 dataprice:[],
     			 total:"0",
     			 totals:"0",
     			 cforeId:"",
     			 hospitalName:"",
     			 ps:{},
     			 psfs:{
     			 	0:["家"],
     			 	1:["医院"],
     			 },
     			 active:"0",
     			 status:false,
     			 ps_status:true,
     			 choose:false,
     			 chooseText:'0',
                     hx_status:'',
                     hxStatus:false
     			}; 
     		}, 
     		created(){
                     this.hx_status= JSON.parse(window.localStorage.getItem("ps_home"))
                      if(this.hx_status){
                         let userInfo=JSON.parse(window.localStorage.getItem("userInfo"))
                         this.hxStatus=true
                         this.user_info.address=userInfo.address
                         this.hx_status.status='已选择'
                         this.current=this.hx_status.id
                         this.choose=true
                         this.selected_info='配送'
                      }else{
                          window.localStorage.removeItem("ps_home")
                      }
                    let cforeId=window.localStorage.getItem("cforeId")  

                    if(this.$route.query.id){
                          this.cforeId=this.$route.query.id
                         window.localStorage.setItem("cforeId",this.cforeId)
                    }else{
                          let cforeId=window.localStorage.getItem("cforeId")
                          this.cforeId=cforeId  
                         
                    }
     			this.requestData()
                   
                   
     		},
     		methods: { 
     			open() {
     				let phone =this.user_info.phone
     				if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
     					this.$message.error("手机号码有误，请重填");  
     					return false; 
     				} 
     				let reg = this.user_info.name
     				let ps_home=window.localStorage.getItem("ps_home");
     				 if(!(/^[\u4E00-\u9FA5]{1,6}$/).test(reg)){//匹配2到四个汉字
     				 	this.$message.error("姓名有误，请重填")
     				 	return false; 
     				 }
     				 if(this.user_info.name==""||this.user_info.phone==""){
     				 	this.$message.error('请填写完整的信息');
     				 	return;
     				 }
     				 if(this.selected_info==""){
     				 	this.$message.error('请选择取药方式');
     				 	return;
     				 }

     				 if(ps_home==undefined||null){
     				 	this.$message.error('请选择门店');
     				 	return;
     				 }
     				 this.$alert('确认生成订单', '温馨提示', {
     				 	confirmButtonText: '确定',
     				 	distinguishCancelAndClose: true})
     				 .then(() => {
     				 	let user_info=JSON.stringify(this.user_info);
     				 	window.localStorage.setItem("userInfo",user_info);
     				 	if(this.selected_info=='到店自取'){
     				 		axios({
     				 			method: 'post',
     				 			url: this.url+"/zhuoya-yplz/pay/createOrder",
     				 			headers: {'token': localStorage.getItem("token")},
     				 			data: {
     				 				name:this.user_info.name,
     				 				phone:this.user_info.phone,
     				 				gysId:this.item.gysId+"",
     				 				cfId:this.item.cfId+"",
     				 				mdId:this.item.mdId+"",
     				 				qyfs:"0",
     				 				amount:this.item.price,
     				 			}
     				 		}).then((response)=>{
     				 			if(response.data.code==0){
     				 				this.$message.success(response.data.msg)
     				 				let _this=this
     				 				setTimeout(function(){
     				 					_this.$router.push("/prescription/finish")
     				 				},4000)
     				 			}else{
     				 				this.$message.error(response.data.msg)
     				 			} 
     				 		})
     				 	}else{
     				 		if(this.user_info.address==''){
     				 			this.$message.error("填写配送地址")
     				 			return
     				 		}
     				 		this.$router.push("/prescription/unfinish/pay")
     				 	}
     				 }).catch(action => {
     				 })   
     				},
     				requestData:function(){
     					axios({
     						method: 'post',
     						url: this.url+"/zhuoya-yplz/prescription/createTempOrder",
     						headers: {'token': localStorage.getItem("token")},
     						data: {
     							id:this.cforeId+""
     						}
     					}).then((response)=>{
     						this.dataps=response.data.ps
     						this.datazt=response.data.ztByDistance
     						this.dataprice=response.data.ztByPrice
                                    let _this=this
     						_this.dataprice.forEach(function(v,i){
     							v.status="选择"
                                        if(_this.hxStatus==false){
                                            console.log("_this.hx_status")
                                        }else{
                                             _this.dataprice[_this.hx_status.id].status="已选择"                                 
                                        }
     						})
     						_this.total=response.data.storesTotal            
     						_this.totals=response.data.gysTotal
     						_this.hospitalName=response.data.hospitalName
     					})
     					axios({
     						method: 'post',
     						url: this.url+"/zhuoya-yplz/prescription/select",
     						headers: {'token': localStorage.getItem("token")},
     						data: {
     							id:this.cforeId+''
     						}
     					}).then((response)=>{
     						this.user_info.name=response.data.cf.patientName
     						this.user_info.phone=response.data.cf.patientTel
     					})
     				},
     				computed_price:function(){
     					this.requestData()
     				},
     				computed_paixu:function(){
     					axios({
     						method: 'post',
     						url: this.url+"/zhuoya-yplz/prescription/createTempOrder",
     						headers: {'token': localStorage.getItem("token")},
     						data: {
     							id:this.cforeId+""
     						}
     					}).then((response)=>{

     						this.dataprice=response.data.ztByDistance
     						this.dataprice.forEach(function(v,i){
     							v.status="选择"
     						})
     					})
     				},
     				son(item,index){ 
     					this.current=index;
                              // item.status="已选择"
     				},
     				currentStatus:function(item,index){
     					this.price=item.price
     					this.yaodian=item.storesName
                              item.id=index
     					this.item=item
     					let ps_home=JSON.stringify(this.item)
     					window.localStorage.setItem("ps_home",ps_home);
                               let _this=this
                              _this.dataprice.forEach(function(v,i){
                                   v.status="选择"
                                   })
                              _this.dataprice[index].status="已选择"
     				},
     				chooseStyle:function(){
     					this.selected_info="配送"
     					this.choose=true;
     					this.user_info.address=this.hospitalName
     				},
choosestyle:function(){//到店自取
	this.user_info.address=''
	this.selected_info="到店自取"
	this.choose=false
}
} 
}; 
</script> 
<style scoped> 

.Middleman_lists .style_lisy .twoClass{
	height: 40px!important;
	line-height: 40px!important;
	border-bottom:0px!important;
}
.selected{
	background-color: #8a8fff!important;
	color: white!important;
}
h6{
	height: 38px;
	line-height: 38px;
	font-size: 16px;
	font-weight: normal;
	color: #8a8fff;
}
.order{
	margin: 0 3% 3% 3%;
}
.icon_title{
	font-size: 14px;
	margin-left: 2px;
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
	width: 100%;
	background-color: white;
}
.content_nav{
	height: 80px;
	width: 94%;
	padding: 0 3%;
	display: flex;
	background-color: #f7f9ff;
}
.detail_info{
	overflow: hidden;
	padding-bottom: 50px;
}
.nav_left{
	flex: 1;
	line-height: 80px;
	color: #8a8fff;
	font-size: 20px;
	font-weight: 700;
}
.drugs_info{
	overflow: auto;
	padding:0 3%;
	max-height: 500px
}
.header_nav{
	height: 40px;	
	width: 100%;
}
.Datazt{
	max-height:500px;
	/*overflow:auto; */
}
.header_nav ul,.Datazt ul{
	height: 38px;
	border:1px solid #D8DAFF;
	background-color: #F0F5FF;
}
.Datazt ul:nth-of-type(odd){
	background-color: white
}
.Datazt ul:nth-of-type(even){
	background-color: #F6F6F6;
}
.Datazt ul{
	color: #8D8D8D;
}
.icon-paixu{
	margin-left: 5px;
}
.Datazt ul:hover{
	background-color: #8A8FFF;
	color: white!important;
}
.header_nav li{
	line-height: 40px;
}
.header_nav li,.Datazt li{
	float: left;
	text-align: center;
	height: 39px;
	line-height: 39px;
	border-right: 1px solid #D8DAFF;
}
.Datazt ul{
	border-top: 0px;
	height: 39px;
}
.header_nav li{
	color: #8A8FFF;
}
.header_nav li:first-of-type,.Datazt li:first-of-type{
	width: 10%;
}
.header_nav li:nth-of-type(2),.Datazt li:nth-of-type(2){
	width: 26%;
	padding: 0 2%;
	overflow:hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.header_nav li:nth-of-type(3),.Datazt li:nth-of-type(3){
	width: 20%;
}
.header_nav li:nth-of-type(4),.Datazt li:nth-of-type(4){
	width: 20%;
}
.header_nav li:nth-of-type(5),.Datazt li:nth-of-type(5){
	width: 19.5%;
	border-right: 0px;
	cursor: pointer;
}
.header_nav li:nth-of-type(3),.header_nav li:nth-of-type(4){
	cursor: pointer;
}
/*定义滚动条的轨道，内阴影及圆角*/
.drug_list::-webkit-scrollbar-track{
	border-radius: 10px;
	background-color: #f4f7ff;
}
/*定义滑块，内阴影及圆角*/
.drug_list::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background-color: #c3d0e5;
}
.qystyle{
	height: 50px;
	padding: 2% 3%;
}
.qystyle div{
	float: left;
	position: relative;
	z-index: 1;
}
.qystyle span{
	display: block;
	height: 40px;
	background-color: #ECEDFF;
	line-height: 40px;
	width: 120px;
	border-radius: 50px;
	text-align: center;
	cursor: pointer;
	color: #BCBCBA;
	overflow:hidden;
	z-index: 1
}
.qystyle p{
	height: 40px;
	line-height: 40px;
	margin-left: 2%;
	float: left;
	color: #F4AA7A;
}
.choose{
	z-index: 99999;
}
.qystyle div .chooseicon{
	background-color: #8A8FFF;
	color: white;
	z-index: 9999;
}
.user_info{
	overflow:hidden;
	padding: 0 3%;
	padding-bottom: 30px;
	display:flex;
}
.user_name,.user_phone,.user_adress{
	height: 70px;
	flex: 1;
}
.user_name,.user_phone{
	margin-right: 3%;
}
.user_adress{
	margin-left: 3%;
	float: right;
}
.user_adress input{
	width: 96%;
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
	padding-left:3%;
	font-size: 16px;
	color: #8a8fff;
}
.user_name input,.uesr_phone input{
	max-width: 170px;
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
	cursor: pointer;
}
.info-list{
	height: 40px;
	padding: 0 3%;
}
.info-list div{
	line-height: 40px;
	float: left;
}
.common{
	width: 90px;
	color: #a4a4a4;
	font-size: 16px;
}
.common_data{
	color: #8a8fff;
	margin-right: 10px;
}
</style> 