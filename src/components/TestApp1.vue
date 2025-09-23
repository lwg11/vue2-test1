<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TestApp1',
    props: {
      msg: String
    }
  }
  </script>
  
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }

  </style>
  