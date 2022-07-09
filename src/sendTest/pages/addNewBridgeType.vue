<template>
    <div>
        <input type="text" v-model="deckweight">
        <br>
        <input type="text" v-model="downweight">
        <br>
        <input type="text" v-model="id">
        <br>
        <input type="text" v-model="name">
        <br>
        <input type="text" v-model="upweight">
        <br>
        <button @click="add">确定</button>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
          deckweight:0,
          downweight:0,
          id:0,
          name:'',
          upweight:0
      }
    },
    methods:{
       add(){
        //  axios.post(`http://localhost:8081/type/insert?deckweight=${this.deckweight}&downweight=${this.downweight}
        //  &id=${this.id}&name=${this.name}&upweight=${this.upweight}`).then(
        axios.post('http://localhost:8081/type/insert',{
          deckweight:0.5,
          downweight:0.3,
          id:9,
          name:'土桥',
          upweight:0.2
        }).then(
          response => { 
            console.log(response.data)
          },
          error => {
            console.log("发送失败",error.message)
          }
        )
       }
    }
  }
</script>
<style scoped>
   .chooseBridge{
     background-color: rgb(105, 161, 165);
   }
</style>