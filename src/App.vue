<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap-vue/dist/bootstrap-vue.css');

export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>

<style>
  /*@import '~bootstrap/dist/css/bootstrap.css';*/
  /*@import '~bootstrap-vue/dist/bootstrap-vue.css';*/
</style>
