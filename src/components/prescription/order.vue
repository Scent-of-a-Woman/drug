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
				<div class="order_aside">
					<h6>药店自取</h6>
					<div class="drug_list">
						<ul>
							<li>药店名称</li>
							<li class="computed_paixu" @click='computed_paixu'>距离(km)<i class="icon-paixu iconfont icon_title"></i></li>
							<li class="computed_paixu" @click='computed_price'>总价(元)<i class="icon-paixu iconfont icon_title"></i></li>
						</ul>
						<ul class="ul_css" v-for="(item,index) in datazt" @click="son(item)">
							<li>{{item.storesName
							}}</li>
							<li>{{item.distance}}</li>
							<li>{{item.price}}</li>
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
						<ul class="No_ps" v-if="totals==0?true:false">
							<li>暂无配送药企</li>
						</ul>
						<ul v-for="(item,index) in dataps" class="Middleman_lists"  v-if="totals==0?false:true">
							<li> 
								<div :title="item.gysName" class="icon_text" :style="{'background-color':statusText[item.gysId][0]}">
									<span>{{item.gysName}}</span>
								</div>
								{{item.price}}
							</li>
							<li>
								<ul class="style_lisy" v-if="item.deliveryHome!=''&&item.deliveredHospital!=''?true:false">
									<li @click="home(item)" v-if="
									item.deliveryHome==''?false:true"
									class="twoClass"
									>
									<div class="data_juli">
											配送到家({{item.deliveryHome}})
									</div>
									</li>
									<li  @click="yiyuan(item)"
									v-if="item.deliveredHospital==''?false:true"
									class="twoClass"
									style="border-top: 1px solid #dbe9ff" 
									>
										<div class="data_juli">
											社区医院({{item.deliveredHospital}})
										</div>
									</li>
								</ul>
								<!-- 配送到家 -->
								<ul class="style_lisy" v-if="item.deliveryHome!=''&&item.deliveredHospital==''?true:false">
									<li @click="home(item)" v-if="
									item.deliveryHome==''?false:true"
									>
										<div class="data_juli">
											配送到家({{item.deliveryHome}})
										</div>
									</li>
									<li  @click="yiyuan(item)"
									v-if="item.deliveredHospital==''?false:true"
									>
									
										<div class="data_juli">
											社区医院({{item.deliveredHospital}})
										</div>
									</li>
								</ul>
								<!-- 配送到医院 -->
								<ul class="style_lisy" v-if="item.deliveryHome==''&&item.deliveredHospital!=''?true:false">
									<li @click="home(item)" v-if="
									item.deliveryHome==''?false:true"
									>
									
										<div class="data_juli">
											配送到家({{item.deliveryHome}})
										</div>
									</li>
									<li  @click="yiyuan(item)"
									v-if="item.deliveredHospital==''?false:true"
									>
									
										<div class="data_juli">
											社区医院({{item.deliveredHospital}})
										</div>
									</li>
								</ul>
							</li>
						</ul>

					</div>
					<div class="order_aside_total">
						共 <span>{{totals}}</span> 家配送药企
					</div>
				</div>
			</div>
			<!-- 用户信息 -->
			<div class="info-list" v-if="status==false?false:true">
				<div class="common">服务方式 :</div>
				<div class="common_data">{{selected_info}}</div>
				<div class="common">支付金额 :</div>
				<div class="common_data">{{price}}</div>
				<div class="common">门店名称 :</div>
				<div class="common_data">{{yaodian}}</div>
			</div>
			<div class="info-list" v-if="ps_status==false?false:true">
				<div class="common">服务方式 :</div>
				<div class="common_data">{{selected_info}}</div>
				<div class="common">支付金额 :</div>
				<div class="common_data">{{ps.price}}</div>
				<div class="common" v-if="active==0?false:true">配送到家 :</div>
				<div class="common" v-if="active==1?false:true">配送到医院 :</div>
				<div class="common_data" v-if="active==0?false:true">{{ps.deliveryHome}}</div>
				<div class="common_data" v-if="active==1?false:true">{{ps.deliveredHospital}}</div>
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
				selected_info:"未选择",
				price:"未选择",
        		isActive:false,//确认之后
				yaodian:"未选择",
				arr:["1","2"],
				url:familyDoctor(),
				user_info:{
					name:'',
					phone:'',
					address:'',
				},
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
     			 ps_status:false
     			}; 
     		}, 
     		created(){
     			this.cforeId=this.$route.query.id
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
                    this.$alert('确认生成订单', '温馨提示', {
                         confirmButtonText: '确定',
                         distinguishCancelAndClose: true})
                          .then(() => {
                                let user_info=JSON.stringify(this.user_info);
                          window.localStorage.setItem("userInfo",user_info);
                        if(this.selected_info=='药店自取'){
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
               this.total=response.data.storesTotal            
			   this.totals=response.data.gysTotal
			   this.hospitalName=response.data.hospitalName
          })
      },
      computed_paixu:function(){
         this.requestData()
    },
    computed_price:function(){
         axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/prescription/createTempOrder",
          headers: {'token': localStorage.getItem("token")},
          data: {
           id:this.cforeId+""

      }
 }).then((response)=>{
     this.datazt=response.data.ztByPrice
})
},
son(item){   
    this.status=true
    this.ps_status=false				
    this.price=item.price
    this.yaodian=item.storesName
    this.item=item
    this.selected_info="药店自取"
     this.user_info.address=''
},
home(item){
    this.active=1
    this.ps_status=true	
    this.status=false	
    this.selected_info="药企配送"
    this.user_info.address=''
    this.item=item
    this.ps.deliveryHome=this.item.deliveryHome
    this.ps.price=this.item.price
    let ps_home=JSON.stringify(this.item)
    window.localStorage.setItem("ps_home",ps_home);
    window.localStorage.removeItem("ps_yiyuan");
},
yiyuan(item){
    this.active=0
    this.ps_status=true	
    this.status=false	
    this.selected_info="药企配送"
    this.item=item
    this.user_info.address=this.hospitalName
    this.ps.deliveredHospital=this.item.deliveredHospital
    this.ps.price=this.item.price
    let ps_yiyuan=JSON.stringify(this.item)
    window.localStorage.setItem("ps_yiyuan",ps_yiyuan);
     window.localStorage.removeItem("ps_home");
  },
 } 
}; 
</script> 
<style scoped> 

.Middleman_lists .style_lisy .twoClass{
	height: 40px!important;
	line-height: 40px!important;
	border-bottom:0px!important;
}
.active{
  background-color: #ccc;
  color: white;
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
 overflow: hidden;
 padding:0 3%;
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
 border:1px solid #dbe9ff;
}
.ul_css{
 cursor: pointer;
}
.drug_list ul{
 overflow: hidden;
}
.drug_list ul:nth-of-type(odd){
 background-color: #f6f6f6;
}
.drug_list li{
 float: left;
 text-align: center;
 height: 40px;
 font-size: 14px;
 line-height: 40px;
}
.drug_list ul:first-of-type{
 /*border-bottom: 0px;*/
 overflow:hidden;
 background-color:#f5f9ff;
}
.drug_list ul:first-of-type li{
 color: #9297ff!important; 
 font-size: 16px;
}
.drug_list ul:last-of-type li{
 /*border-bottom:1px solid #dbe9ff!important;*/
}
.drug_list li:first-of-type{
 position: relative;
 overflow: hidden;
 width: 49%;
}
.drug_list li:nth-of-type(2){
 width: 25%;
}
.drug_list li:last-of-type{
 width: 25%;
}
.drug_list::-webkit-scrollbar{
 width:10px;
}
.computed_paixu{
 cursor: pointer;
}
.ul_css:hover{
 background-color:#8a8fff!important;
 color: white;
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
.order_aside_total{
 width: 97%;
 text-align: center;
 margin-top: 10px;
 color: #a4a4a4
}
.order_aside_total span{
 color: #8a8fff;
}
.No_ps li{
	width: 100%!important;
}
.Middleman_lists {
	border-top: 1px solid #dbe9ff;
	border-bottom: 1px solid #dbe9ff;
	margin-top: -1px;
	margin-bottom: -1px;
}
.Middleman_list li:last-of-type,.Middleman_lists li:last-of-type{
 width: 50%;
}
.Middleman_lists li:nth-of-type(2),.Middleman_lists li:nth-of-type(3){
 border-bottom: 0;
 width: 51%;
 height: 80px;
}
.Middleman_lists li:first-of-type{
 height: 81px;
 line-height: 81px;
 position: relative;
}
.style_lisy li{
 height: 40px;
 width: 100%!important;
 line-height: 40px;
 background-color: white;
 border-left: 1px solid #dbe9ff;
 /*margin-left: -1px;*/
}
.style_lisy li:first-of-type{
	border-bottom: 1px solid #dbe9ff;
}
.style_lisy li .data_juli:hover{
 background-color: #8a8fff;
 color: white!important;
 cursor: pointer;
}
.radio_select{
 height: 80px;
}
.radio_select li{
 float: left;
}
.radio_select li:nth-of-type(1){
 width: 70%;
 height: 40px;
}
.radio_select li:nth-of-type(2){
 width: 70%;
}
.data_juli{
 width: 100%;
 height: 100%;
 float: left;
}
.data_select{
 width: 30%;
 float: left;
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