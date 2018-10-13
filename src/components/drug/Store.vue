<template> 
  <div class="take">
    <div class="process">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item>药企管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/drug/store' }">门店列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="take_content">
      <!-- 搜索栏 -->
      <div class="status_nav">
      	<div class="store_type" v-if="this.Id==2?false:true">
      		<el-select v-model="value" placeholder="请选择药企">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
      	</div>
         <div class="new_add" v-if="this.Id==2||this.Id!=5?true:false">
           <span><router-link :to='{path:"/drug/add_store"}'>新 增</router-link></span>
         </div>
      </div>
    <div class="take_lists">
      <div class="info_list">
        <ul class="list_head">
          <li>门店名称</li>
          <li>联系电话</li>
          <li>地址</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="info_lists info_list">
        <ul class="list_head" v-for="(item,index) in data">
          <li>
          	<div :title="item.suppliersName" class="icon_text" :style="{'background-color':statusText[1][item.gysId]}">
							<span>{{item.suppliersName}}</span>
			     </div>
          {{item.storesName}}</li> 
          <li>{{item.phone}}</li>
          <li :title="item.storesAddress">{{item.storesAddress}}</li>
          <li>
            <router-link :to="{path:'./storedetail',query:{id:item.id}}"><i class="el-icon-search icon_turn" ></i></router-link>     
          </li>
        </ul>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_size">
      <div class="total">
        共&nbsp;<i>{{total}}</i>&nbsp;门店
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
        fullscreenLoading: false,
        data:[],
        statusText: {
          1: ['#9b9b9b','#37c5c7','#f8b551','#9b9b9b','#37c5c7','#f8b551','#9b9b9b','#37c5c7','#f8b551','#9b9b9b','#37c5c7','#f8b551','#9b9b9b','#37c5c7','#f8b551','#9b9b9b','#37c5c7','#f8b551'],  //九州通
        },
        options: [{
					value: '2',
					label: '好药师大药房连锁有限公司'
				}, {
					value: '1',
					label: '国药控股（湖北）汉口大药房有限公司'
				}, {
					value: '3',
					label: '湖北人福医药集团有限公司'
				},{
          value: '',
          label: '全部'
        }],
				value: '',
        url:familyDoctor(),
        total:'',
        Id:""//权限id
      }; 
    }, 
    watch:{
      value:function(num) {
        if(this.value==26){
          this.requestdata()
          return
        }
         axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/storeslist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            gysId:this.value,
            pageNum:1,
            pageSize: '6'
          }
        }).then((response)=>{
          
          this.data=response.data.storeslist.records
          this.total=response.data.storeslist.total
        })
      }
    },
    created(){
        this.requestdata()
        this.Id=window.localStorage.getItem("roleId")
    },
    methods: { 
      // 刷新
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
      handleCurrentChange(val){
        axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/storeslist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: val,
            pageSize: '6',
            gysId:this.value
          }
        }).then((response)=>{
          this.data=response.data.storeslist.records
        
        })
      },
      //请求数据
      requestdata(){
          axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/gys/storeslist",
          headers: {'token': localStorage.getItem("token")},
          data: {
            pageNum: 1,
            pageSize: '6'
          }
        }).then((response)=>{
          this.total=response.data.storeslist.total
          this.data=response.data.storeslist.records
          console.log(response)
        })
      },
    } 
  }; 
</script> 

<style scoped> 

.take{
  height: 100%;
  margin-left:38px;
}
.process{
 height: 6%;
  max-height: 39px;
  width: 97%;
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
  width: 97%;
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
.store_type{
	width: 200px;
	height: 40px;
	float: left;
	margin-left: 3%;
   margin-top: 2%;
}
.new_add{
  width: 200px;
  float: right;
  margin-right: 3%;
   margin-top: 2%;
}
.new_add span{
  display: block;
  width: 200px;
  height: 40px;
  background-color: #8a8fff;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-radius: 5px;
}
.take_lists{
  height: 70%;
  background-color: white;
  border: 1px solid #d8daff;
  border-left: 0;
  border-bottom: 0;
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
  font-size: 14px;
  font-family: '微软雅黑';
  margin-right: -1px;
}
.list_head li:first-of-type{
  width: 30%;
  position: relative;
  overflow: hidden;
}
.list_head li:nth-of-type(2){
  width: 20%;
}
.list_head li:nth-of-type(3){
  width: 29%;
  padding: 0 3%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_head li:last-of-type{
  width: 15%;

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