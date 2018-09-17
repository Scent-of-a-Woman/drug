 
<template> 
  <el-container>
    <el-aside>
     <div class="personl_info">
       <!--  <div class="PCenter">
        <div class="center_img"> 
          <i class="iconfont icon-icon9001 iconfont_title"></i>
        </div>
      </div> 
      <div class="name">武昌市卫计委</div>-->
     </div>
      <el-tabs type="border-card" tab-position="left">
        <el-tab-pane>
          <span slot="label" class="info_all"><i class="iconfont icon-gongsi iconfont_title"></i> <div class="info_name">药企管理</div></span>
          <div class="children_list">
              <ul class="list_name">
                <li><router-link to='/drug/store'>新增供应商</router-link></li>
                <li>供应商列表</li>
                <li>门店列表</li>
                <li class="new_drug">新增药品</li>
                <li>药品信息列表</li>
              </ul>
          </div> 
        </el-tab-pane>
        <el-tab-pane >
            <span slot="label" class="info_all"><i class="iconfont icon-chufang iconfont_title"></i> <div class="info_name">处方管理</div></span>
          <div class="children_list">
            <ul class="list_name">
                <li><router-link to='/prescription/unfinish'>待处理</router-link></li>
                <li><router-link to='/prescription/finish'>已处理</router-link></li>
              </ul>
          </div> 
        </el-tab-pane>
        <el-tab-pane >
            <span slot="label" class="info_all"><i class="iconfont icon-dingdan iconfont_title"></i> <div class="info_name">订单管理</div></span>
          <div class="children_list">我的行程</div> 
        </el-tab-pane>
        <el-tab-pane >
            <span slot="label" class="info_all"><i class="iconfont icon-jinbi iconfont_title"></i> <div class="info_name">对账管理</div></span>
          <div class="children_list">我的行程 </div> 
        </el-tab-pane>
      </el-tabs>

        </div>
      </el-aside>


      <el-main>
          <router-view></router-view>
      </el-main>
           <!--  <router-link  to="/drug/Setup">asdasdad</router-link>
            <router-link  to="/drug/Store">qweqweqwe</router-link> -->
            <!-- </div> -->
          </el-container>
        </template> 
        <script> 
          export default { 
            name: 'home', 
            data () { 
              return { 
                currentTab:""
              }; 
            }, 
            created: function() {
    // this.saveMark();
    this.routerPath = this.$route.path
  },
  methods: { 
   toggleTab: function(tab) {
   this.currentTab = tab; // tab 为当前触发标签页的组件名
 }
} 
}; 
</script> 
<style scoped>
.el-container{
  height: 100%;
  width: 100%;
}

.el-container .el-aside{
  width: 321px!important;
  height: 100%;
  background-color: white;
  border-right: 1px solid #dcdcdc;
}
.personl_info{
  width: 160px;
  position: absolute;
  top: 0;
  left: 0;
}
.PCenter{
  height: 65px;
  width: 160px;
  margin-top: 40px;
}
.name{
  width: 160px;
  text-align: center;
  margin-top: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
.el-tabs--left{
  border:none;
    float: left;
    width: 320px;
    height: 100%;
}
.el-aside >>> .el-tabs__header.is-left{
  width: 160px;
  margin-right: 0;
  border:none;
  padding-top: 200px;
}
.el-aside >>> .el-tabs__nav-next,.el-aside >>> .el-tabs__nav-prev{
  display: none;
}
.el-aside >>> .el-tabs--left .el-tabs__nav-wrap.is-left{
  padding: 0;
  margin-right: 0;
}
.el-aside >>> .el-tabs--left .el-tabs__item.is-left{
  height: 100px;
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
  height: 60px;
  width: 60px;
  background-color:#b2b5ff;
  border-radius: 50%;
  margin: auto;
}
.iconfont_title{
  font-size: 50px;
  text-align: center;
  color: white;
  display: block;
  line-height: 60px;
}
.info_all{
  display: block;
  height: 90px;
  padding-top: 10px;
}
.info_name{
  font-size: 16px;
  color:#b7d1fb;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.icon-gongsi{
  color: #b2b5ff;
}
.icon-chufang,.icon-dingdan,.icon-jinbi{
 color: #b7d1fb;
}
.children_list .list_name{
  padding-left: 39px;
  margin-top: 48px;
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
/*标记色用 #8a8fff*/

 /* .content-container {
    float: left;
    width: 79%;
    margin-left: 10px;
  }
  }*/
</style> 