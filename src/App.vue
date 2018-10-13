<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
   data () {
    return {
     
    }
  }
}
</script>

<style>
body,html{
  height: 100%;
  margin:0;
  padding: 0;
  min-width:1300px;
}
#app{
  height: 100%;
}
ul,li{
  list-style: none;
  padding: 0;
  margin: 0;
}
p,h6,h5{
  margin:0;
  padding:0;
}
input{
  outline: none;
  border:none;
  padding: 0;
}
a{ 
  text-decoration:none;
  color:white;
 }
 input::-webkit-input-placeholder{
  color: #bfbfc0;
  }    /* 使用webkit内核的浏览器 */
input:-moz-placeholder{
  color: #bfbfc0;
  }                  /* Firefox版本4-18 */
input::-moz-placeholder{
  color: #bfbfc0;
  }                  /* Firefox版本19+ */
input:-ms-input-placeholder{
  color: #bfbfc0;
}
</style>


