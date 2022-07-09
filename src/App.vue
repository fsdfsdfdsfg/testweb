<template>
  <div id="app" >
    <navMenu></navMenu>
  </div> 
</template>

<script>
import navMenu from './pages/navMenu.vue'
export default {
  name: 'App',
  data(){
     return{
     }
  },
  methods:{
  },
  components:{navMenu}
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.top{
  background-color: rgb(66, 116, 180);
  width: 100%;
  height: 50px;
}
</style>
