<template>
    <div>
        <div v-html="report"></div>
    </div>
</template>
<script>
   export  default{
       name:'showReport',
       data(){
           return{
               report:'<h1>hh</h1>'
           }
       }
   }
</script>

