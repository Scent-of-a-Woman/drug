 
<template> 
  <el-container>
    <el-aside>
      <!-- -->
      <el-tabs type="border-card" tab-position="left" v-model="activeName">
        <el-tab-pane disabled name='first' >
         <span slot="label" class="info_all">
          <div class="personl_info">
            <div class="center_img" :class="backcolor">
             <i :class="avatar"></i>
           </div>
           <div class="name">{{username}}</div>
         </div>
       </span>
     </el-tab-pane>
     <el-tab-pane name='second' :disabled="this.id==2||this.id==5||this.id==1?false:true">
      <span slot="label" class="info_all" @click="two"><i class="iconfont icon-gongsi iconfont_title"></i> <div class="info_name">药企管理</div></span>
      <div class="children_list">
        <ul class="list_name">
          <li v-if="this.id==2?false:true"><router-link to='/drug/Supplier'>供应商列表</router-link></li>
           <li v-if="this.id==2?true:false"><router-link to='/drug/new_add'>供应商详情</router-link></li>
          <li><router-link to='/drug/Store'>门店列表</router-link></li>
          <li><router-link to='/drug/Druglist'>药品信息列表</router-link></li>
        </ul>
      </div> 
    </el-tab-pane>
    <el-tab-pane name='three' :disabled="this.id==4||this.id==5||this.id==1?false:true">
      <span slot="label" class="info_all"  @click="threes"><i class="iconfont icon-chufang iconfont_title" ></i> <div class="info_name">处方管理</div></span>
      <div class="children_list">
        <ul class="list_name">
          <li><router-link to='/prescription/unfinish'>待处理</router-link></li>
          <li><router-link to='/prescription/finish'>已处理</router-link></li>
        </ul>
      </div> 
    </el-tab-pane>
    <el-tab-pane name='four' :disabled="this.id==4?true:false">
      <span slot="label" class="info_all" @click="four" ><i class="iconfont icon-dingdan iconfont_title"></i> <div class="info_name">订单管理</div></span>
      <div class="children_list">
       <ul class="list_name">
        <li><router-link to='/order/take'>自提订单</router-link></li>
        <li><router-link to='/order/give'>配送订单</router-link></li>
      </ul>
    </div> 
  </el-tab-pane>
  <el-tab-pane name='five' :disabled="this.id==4||this.id==3?true:false">
    <span slot="label" class="info_all" @click="five"><i class="iconfont icon-jinbi iconfont_title"></i> <div class="info_name">对账管理</div></span>
    <div class="children_list">
      <ul class="list_name">
        <li><router-link to='/finance/takeOrder'>自提订单</router-link></li>
        <li><router-link to='/finance/giveOrder'>配送订单</router-link></li>
      </ul>
    </div> 
  </el-tab-pane>
  <el-tab-pane name='six'>
    <span slot="label" class="info_all" @click="six"><i class="iconfont icon-icon_set_up iconfont_title"></i> <div class="info_name">个人中心</div></span>
    <div class="children_list">
      <ul class="list_name">
        <li><router-link to='/set/change'>修改密码</router-link></li>
      </ul>
    </div> 
  </el-tab-pane>
</el-tabs>
</el-aside>


<el-main>
  <keep-alive>
    <router-view v-if="this.$route.meta.keepAlive"></router-view>
  </keep-alive>

    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
 
</el-main>
</el-container>
</template> 
<script> 
export default { 
  name: 'home', 
  data () { 
    return { 
      activeName:'',
      username:"", 
      id:""//权限id
    }; 
  }, 
  created: function() {
    console.log(this.$route.meta.keepAlive)
    this.routerPath = this.$route.path;
    let id=window.localStorage.getItem("roleId");
    this.id = id;
    this.username=window.localStorage.getItem("username");
    let num=Number(id)
    switch(num){
      case 2:
      this.activeName="second"
      break;
      case 3:
      this.activeName="four"
      break;
      case 4:
      this.activeName="three"
      break;
      case 5:
      this.activeName="second"
      break;
    }
  },
  methods: { 
    two:function(){
      if(this.id==2){
        this.$router.push("/drug/Store") //权限为药企
      }else if(this.id==1||this.id==5){
        this.$router.push("/drug/Supplier")
      }else{
        return
      }         
    },
    threes:function(){//医生
      if(this.id==2||this.id==3){
          return
      }else{   
       this.$router.push("/prescription/unfinish")
       }     
    },
    four:function(){//药店
       if(this.id==4||this.id==2){
          return
      }else{   
        this.$router.push("/order/take")
       } 
    },
    five:function(){//财务
      if(this.id==3||this.id==4){
          return
      }else{   
       this.$router.push("/finance/takeOrder")
       }
    },
    six:function(){//所有
      this.$router.push("/set/change")
    }
  },
  computed:{
    avatar(){
      let  ids  = this.id;
      if (ids == 1){
        return 'iconfont icon-feiji iconfont_tit';
      }else if(ids == 2){
        return 'iconfont icon-gongsi1 iconfont_tit';
      } else if (ids == 3){
        return 'iconfont icon-dianpu iconfont_tit';
      }else if(ids == 4 ){
        return 'iconfont icon-icon9001 iconfont_tit';
      }else if(ids == 5){
        return 'iconfont icon-yiyuan iconfont_tit';
      }
    },
    backcolor(){
      let  ids  =    this.id;
      if (ids == 1){
        return 'admin';
      }else if(ids == 2){
        return 'drug';
      } else if (ids == 3){
        return 'shop';
      }else if(ids == 4 ){
        return 'doctor';
      }else if(ids == 5){
        return 'wjw';
      }
    }
  },
}; 
</script> 
<style scoped>
.el-container{
  height: 100%;
  width: 100%;
  min-height: 600px;
}
.admin{background-color: rgb(157,224,222)}
.drug{background-color: rgb(255,204,190)}
.shop{background-color: rgb(250,205,137)}
.doctor{background-color: rgb(193,222,255)}
.wjw{background-color: rgb(138,143,255)}
.el-container .el-aside{
  width: 281px!important;
  height: 100%;
  background-color: white;
  border-right: 1px solid #dcdcdc;
}
.personl_info{
  width: 140px;
  position: absolute;
  top: 0;
  left: 0;
}
.PCenter{
  height: 65px;
  width: 140px;
  margin-top: 40px;
}
.name{
  width: 140px;
  text-align: center;
  margin-top: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  color: #8f8fff;
}
.icon-icon9001{
  color: white!important;
}
.el-tabs--left{
  border:none;
  float: left;
  width: 280px;
  height: 100%;
}
.el-aside >>> .el-tabs__header.is-left{
  width: 140px;
  margin-right: 0;
  border:none;
  /*padding-top:45%;*/
}
.el-aside >>> .el-tabs__nav{margin-top: 50px}
.el-aside >>> .el-tabs__nav #tab-first{
  margin-bottom: 30px
}
.el-aside >>> .el-tabs__nav-next,.el-aside >>> .el-tabs__nav-prev{
  display: none;
}
.el-aside >>> .el-tabs--left .el-tabs__nav-wrap.is-left{
  padding: 0;
  margin-right: 0;
}
.el-aside >>> .el-tabs--left .el-tabs__item.is-left{
  height: 80px;
  margin: 0;
  border:0;
  padding: 0;
}
.el-aside >>> .el-tabs__content {
  height: 100%;
  padding: 0;
  background-color: #ecedff;
}
.center_img{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: auto;
}
.iconfont_tit{
  font-size: 35px;
  text-align: center;
  color: white;
  display: block;
  line-height: 50px;
}
.iconfont_title{
  font-size: 35px;
  text-align: center;
  color:#b7d1fb;
  display: block;
  line-height: 50px;
}
.info_all{
  display: block;
  height: 80px;
}
.info_name{
  font-size: 16px;
  color:#b7d1fb;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.icon-chufang,.icon-dingdan,.icon-jinbi{
 color: #b7d1fb;
}
.children_list .list_name{
  padding-left: 25px;
  margin-top: 40px;
}
.children_list .list_name li{
  font-size: 14px;
  font-family: '微软雅黑';
  text-align: left;
  margin-bottom: 15px;
  cursor: pointer;
}
.children_list .list_name li a{
  color: #a4a5ab;
  text-decoration: none;
}
.active{
  color: #b7d1fb;
}
.new_drug::before{
  display: block;
  content: '';
  width:100px;
  height:2px;
  background-color:#d2d2d2;
  margin-bottom: 10px;
}
.el-main{
  background-color:#ebf0f8;
  padding: 0;
  width: 100%;
}
/*子菜单*/
.tab_right{
  background-color: #ecedff;
}
.el-tabs--border-card >>>.el-tabs__header .el-tabs__item.is-active {
  background-color: #ecedff;
}
.el-tabs--border-card >>>.el-tabs__header .el-tabs__item.is-active span i,
.el-tabs--border-card >>>.el-tabs__header .el-tabs__item.is-active span div{
  color:#8f8fff;
}
.el-tabs--border-card >>> #tab-0{
  margin-top: 30px;
  height: 100px;
  margin-bottom: 20px;
}
.router-link-active{
  color:#8f8fff!important;
}
</style> 