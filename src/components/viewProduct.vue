<template>
<div class="textp">
  <h1>{{name}}</h1>
  <p >{{product}}</p>
</div> 
</template>

<script>
export default {
  props: ['product', 'name']
}
</script>
<style lang="scss" scoped>
.textp {
  word-wrap:break-word;
  width: 45%;
  padding: 5px;
  display: inline-block;
  &>h1 {
    font-size: 20px;
  }
}
</style>
