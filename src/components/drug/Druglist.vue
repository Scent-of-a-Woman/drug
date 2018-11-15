<template> 
  <div class="take" 
   element-loading-text="拼命加载中"
    v-loading.fullscreen.lock="fullscreenLoading"
    >
    <div class="process">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item>药企管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/drug/Druglist' }">药品信息列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="take_content">
      <!-- 搜索栏 -->
      <div class="status_nav">
       <div class="take_status">
        <el-button type="text" @click="dialogVisible = true" style="font-size:16px">条件查询</el-button>
        <el-dialog title="按条件查询" :visible.sync="dialogVisible" size="tiny" id="term_select" >
         <div class="select_time">
          <div class="time_title">药品状态</div>
          <div class="block">
           <el-select v-model="value1" placeholder="药品上下架查询" clearable >
            <el-option
            v-for="item in option"
            :key="item.value1"
            :label="item.label"
            :value="item.value1">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--选择器  -->
    <div class="select_time">
      <div class="time_title">药品分类</div>
      <div class="block">
       <el-select v-model="value2" placeholder="请选择一级目录" clearable >
        <el-option
        v-for="(item,index) in menu"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
  <div class="block" v-if="true">
   <el-select v-model="value3" placeholder="请选择二级目录" clearable >
    <el-option
    v-for="(item,index) in menus"
    :label="item.name"
    :value="item.id">
  </el-option>
</el-select>
</div>
</div>
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="dialogVisible = false;sureMenu()">确 定</el-button>
  <el-button @click="dialogVisible = false" class="reset">取 消</el-button>
</span>
</el-dialog>
</div>
<div class="search">
  <div class="search_input">
    <input type="text" name="" placeholder="药品名称/批准文号/生产厂家" maxlength="18" v-model="search">
    <div class="btn_search" @click="searchKey">
      <i class="el-icon-search icon_turn"></i>
    </div>
  </div>
</div>
</div>
<!-- 内容 -->
<div class="yao_content">
  <div class="left">
    <h5 v-if="categoryName==''?true:false">药品列表</h5>
    <h5 v-if="categoryName!=''?true:false">{{categoryName}}</h5>
    <div class="left_info">
      <ul class="yaopin_list" v-for="(item,index) in yaopin_list">
        <li @click="yaopinInfo(item.id,index)" :title="item.name" :class="{current:index==isActive}">{{item.name}}</li>
      </ul>
    </div>
   
</div>
<div class="right">
  <h5>药品信息</h5>
  <div class="right_info">
   <ul>
    <li>
      <span>药品名称<em>*</em></span>
      <input type="text" name="" placeholder="药品名称" v-model="yaopin_info.name" disabled>
    </li>
    <li>
      <span>药品编号<em>*</em></span>
      <input type="text" name="" placeholder="药品编号" v-model="yaopin_info.code" disabled>
    </li>
  </ul>
  <ul>
    <li>
      <span>药品分类<em>*</em></span>
      <input type="text" name="" placeholder="药品名称" v-model="yaopin_info.categoryName" disabled>
    </li>
    <li class="yao_type">
      <span>规格<em>*</em></span>
      <input type="text" placeholder="药品规格" v-model="yaopin_info.specifications" disabled :title="yaopin_info.specifications">
    </li>
    <li class="yao_type">
      <span>单位<em>*</em></span>
      <input type="text" name="" placeholder="药品单位" v-model="yaopin_info.unit" disabled>
    </li>
  </ul>
  <ul>
    <li>
      <span>生产厂家<em>*</em></span>
      <input type="text" name="" placeholder="药品生产厂家" v-model="yaopin_info.manufacturer" disabled>
    </li>
    <li>
      <span>批准文号<em>*</em></span>
      <input type="text" name="" placeholder="批准文号" v-model="yaopin_info.gyzzh" disabled>
    </li>
  </ul>
  <ul>


    <li class="yao_type">
      <span>单价(元)<em>*</em></span>
      <input type="text" name="" placeholder="药品名称" v-model="yaopin_info.drugPrice">
    </li>
    <li class="yao_type">
      <span>状态<em>*</em></span>
      <el-select v-model="value" placeholder="请选择药品状态">
        <el-option
        v-for="item in optionss"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </li>
</ul>
</div>
</div>

</div>
 <div class="page_size">
      <div class="total">
        共&nbsp;<i>{{yaopin_total}}</i>&nbsp;药品
      </div>
      <el-pagination
      background
      layout="prev, pager, next"
      :total="yaopin_total"
      v-if="yaopin_total <= 20 ? false:true"
      :page-size="20"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
  </div>
<div class="sure" @click="price"><span>保存</span></div>
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
        search:"",
        fullscreenLoading: false,
        total:"0",
        dialogVisible: false,
        option:[
        {
          value1: '1',
          label: '上架'
        },
        {
          value1: '0',
          label: '下架'
        }],
        optionss:[
        {
          value: '1',
          label: '已上架'
        },
        {
          value: '0',
          label: '已下架'
        }],
        value:"",//上下架信息里面的
        value1:"",//上下架查询
        value2:"",//一级目录
        value3:"",//二级目录
        data:[],
        ind:'',
        url:familyDoctor(),
        yaopin_list:[],//查询药品列表
        yaopin_total:"0",
        yaopin_info:{},//药品信息
        menu:'',//一级目录
        menus:"",//二级目录
        isActive:-1,
        categoryName:""//处方分类
      }; 
    }, 
    created(){
      this.requestData()
      this.requestMenu()
    },
    watch:{
      value2:function(){
       axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectDirectory",
        headers: {'token': localStorage.getItem("token")},
        data: {
          parentId:this.value2,
          pageNum:1,
          pageSize:"20",
          directory:2+""
        }
      }).then((response)=>{
       this.menus=response.data.list
     })
    }
  },
  methods: { 
      //药品目录查询
      requestMenu:function(){
        axios({
          method: 'post',
          url: this.url+"/zhuoya-yplz/drug/selectDirectory",
          headers: {'token': localStorage.getItem("token")},
          data: {
            parentId:1
          }
        }).then((response)=>{
          this.menu=response.data.list
        })
      },
      //通过目录查询
    sureMenu:function(){
      if(this.search){//关键字查询
          axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"0",
          searchKey:this.search
        }
        }).then((response)=>{ 
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.categoryName=""
          this.fullscreenLoading = false;
           this.yaopin_list=response.data.page.records
         this.yaopin_total=response.data.page.total
         this.categoryName=''
         }, 1000);
       })
      }else if(this.value1&&this.value2==""){//上下架查询

           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"0",
          shelves:this.value1,
        }
        }).then((response)=>{ 
        this.fullscreenLoading = true;
          setTimeout(() => {
            this.categoryName=""
          this.fullscreenLoading = false;
           this.yaopin_list=response.data.page.records
         this.yaopin_total=response.data.page.total
         this.categoryName=''
         }, 1000);
       })
      }else if(this.value1&&this.value2&&this.value3){//2级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"2",
          shelves:this.value1,
          parentId:this.value3
        }
        }).then((response)=>{ 
       this.fullscreenLoading = true;
          setTimeout(() => {
          this.fullscreenLoading = false;
          this.yaopin_list=response.data.page.records
          this.yaopin_total=response.data.page.total
          this.categoryName=response.data.page.records[0].categoryName
         }, 1000);
       })
      }else if(this.value1&&this.value2&&this.value3==""){//上下架和一级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"1",
          shelves:this.value1,
          parentId:this.value2
        }
        }).then((response)=>{ 
        this.fullscreenLoading = true;
          setTimeout(() => {
          this.fullscreenLoading = false;
           this.yaopin_list=response.data.page.records
          this.yaopin_total=response.data.page.total
          this.categoryName=''
         }, 1000);
       })
      }else if(this.value1==""&&this.value2&&this.value3){//二级和一级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"2",
          parentId:this.value3
        }
        }).then((response)=>{ 
       this.fullscreenLoading = true;
          setTimeout(() => {
          this.fullscreenLoading = false;
           this.yaopin_list=response.data.page.records
         this.yaopin_total=response.data.page.total
          this.categoryName=response.data.page.records[0].categoryName

         }, 1000);
       })
      }else if(this.value1==""&&this.value2&&this.value3==""){//一级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"1",
          parentId:this.value2
        }
        }).then((response)=>{ 
       this.fullscreenLoading = true;
          setTimeout(() => {
          this.fullscreenLoading = false;
           this.yaopin_list=response.data.page.records
         this.yaopin_total=response.data.page.total
         this.categoryName=''
         }, 1000);
       })
      }else{
         axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          pageSize: '20',
          directory:"1",
        }
        }).then((response)=>{ 

       this.fullscreenLoading = true;
          setTimeout(() => {
          this.fullscreenLoading = false;
           this.yaopin_list=response.data.page.records
         this.yaopin_total=response.data.page.total
         this.categoryName=''
         }, 1000);
       })
      }
    },
    searchKey:function() {
      axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: 1,
          directory:"0",
          pageSize: '20',
          searchKey:this.search
        }
      }).then((response)=>{
          this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total    
      })
    },
      // 列表查询
    requestData:function() {
      axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum:"1",
          pageSize:"20",
          directory:"0"
        }
      }).then((response)=>{
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
      })
    },
    handleCurrentChange(val){
      if(this.search){//关键字查询
          axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: val,
          pageSize: '20',
          directory:"0",
          searchKey:this.search
        }
        }).then((response)=>{ 
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
       })
      }else if(this.value1&&this.value2==""){//上下架查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: val,
          pageSize: '20',
          directory:"0",
          shelves:this.value1,
        }
        }).then((response)=>{ 
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
       })
      }else if(this.value1&&this.value2&&this.value3){//2级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: val,
          pageSize: '20',
          directory:"2",
          shelves:this.value1,
          parentId:this.value3
        }
        }).then((response)=>{ 
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
       })
      }else if(this.value1&&this.value2&&this.value3==""){//上下架和一级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: val,
          pageSize: '20',
          directory:"1",
          shelves:this.value1,
          parentId:this.value2
        }
        }).then((response)=>{ 
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
       })
      }else if(this.value1==""&&this.value2&&this.value3){//二级和一级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: val,
          pageSize: '20',
          directory:"2",
          parentId:this.value3
        }
        }).then((response)=>{ 
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
       })
      }else if(this.value1==""&&this.value2==''&&this.value3==""){//一级目录查询
           axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/selectlist",
        headers: {'token': localStorage.getItem("token")},
        data: {
          pageNum: val,
          pageSize: '20',
           directory:"0",
        }
        }).then((response)=>{ 
        this.yaopin_list=response.data.page.records
        this.yaopin_total=response.data.page.total
       })
      }    
    },
    yaopinInfo:function(id,index){
     this.isActive=index;
     axios({
      method: 'post',
      url: this.url+"/zhuoya-yplz/drug/select",
      headers: {'token': localStorage.getItem("token")},
      data: {
       id:id
     }
   }).then((response)=>{   
          this.value=response.data.drug.drugIsShelves
          this.yaopin_info=response.data.drug     
  })
 },
      //药品上下架或修改价格 
      price:function(){
       axios({
        method: 'post',
        url: this.url+"/zhuoya-yplz/drug/updateShelvesOrPrice",
        headers: {'token': localStorage.getItem("token")},
        data: {
         id:this.yaopin_info.id,
         price:this.yaopin_info.drugPrice,
         shelves:this.value
       }
     }).then((response)=>{
      this.$message.success(response.data.msg)
    })
   }
 } 


}; 
</script> 

<style scoped> 
.current{
  background-color: #8a8fff;
  color: white;
}
.take_status{
  float: left;
  width: 200px;
  padding: 0 3%;
  margin-top: 2%;
}
.take_status >>>.el-button--text {
  color: #8a8fff;
}
.take_status >>> .el-dialog__header span{
  font-size: 16px;
}
.take_status >>> .el-dialog{
  width: 280px;
}
.take_status >>> .el-dialog__body{
  padding: 0px 20px;
  height: 190px;
}
.take_status >>> .el-dialog__body .select_time div:nth-of-type(3){
  margin-top: 5px;
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
.el-select {
  width: 100%;
}
.take{
  height: 100%;
  margin-left:38px;
}
.process{
  height: 6%;
  min-height: 39px;
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
.search{
  height: 40px;
  width: 280px;
  float: right;
  padding: 0 3%;
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
.yao_content{
  overflow: hidden;
  padding:0 3%;
  height: 65%;
}
.yao_content .left,.yao_content .right{
  float: left;
}
.yao_content .left{
  width: 30%;
  height: 100%;
}
.yaopin_list{
  height: 40px;
}
.yaopin_list li{
  line-height: 40px;
  padding:0 3%;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.left_info ul:nth-of-type(even){
  background-color: #f7f9ff;
}
.yaopin_list li:hover{
  background-color: #8a8fff;
  color: white;
}
.yao_content .right{
  width: 68%;
  height: 100%;
  margin-left: 2%;
}
.left_info,.right_info{
  border:1px solid #dbe9ff; 
  height: 91%;
  overflow: auto;
}
.right_info{
  padding: 3%;
  padding-top: 0;
  padding-bottom:0;
}
.left h5,.right h5{
  height: 5%;
  min-height: 30px;
  line-height: 30px;
  font-size: 15px;
  color: #a4a4a4;
  font-family:"微软雅黑";
}

.right_info ul{
  overflow: hidden;
}
.right_info ul li{
  height: 70px;
  float: left;
  width: 50%;
  margin-bottom: 5px;
}
.right_info ul li span{
  height: 30px;
  display: block;
  width: 100%;
  line-height: 30px;
  color: #a4a4a4;
}
.right_info ul li input{
  height: 38px;
  width: 90%;
  padding-left: 5px;
  line-height: 38px;
  border: 1px solid #ccc;
}
.right_info ul .yao_type{
  width: 24.1%
}
.yao_type >>>.el-select{
  width: 95%;
}
.yao_type>>> .el-input__inner{
  border:1px solid #ccc;
  border-radius: 0px;
  padding-left: 5px;
}
.icon_turn{
  color: #8a8fff;
}
/*分页*/
.page_size{
  height: 10%;
  width: 100%;
  float: left;
  margin-top: 5px;
}
.total{
  text-align: center;
  margin-bottom: 5px;
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
.sure{
  float: left;
  height: 40px;
  width: 100%;
  margin-top: 5px;
}
.sure span{
  display: block;
  width: 200px;
  height: 40px;
  line-height: 40px;
  color: white;
  border-radius: 5px;
  margin: auto;
  text-align: center;
  background-color: #8a8fff;
  cursor: pointer;
}
em{
  font-style: normal;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: red;
  margin-left: 3px;
}
</style> 