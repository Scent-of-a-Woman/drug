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
p{
  margin:0;
}
input{
  outline: none;
  border:none;
  padding: 0;
}
</style>


