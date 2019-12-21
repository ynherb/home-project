<template>
  <button class="btn btn-primary" type="button" :disabled="disabled" @click="addClick">
   <span class=" spinner-border-sm spinner-position" role="status" aria-hidden="true"
    v-bind:class="{'spinner-border' : loading}">
    </span>
    <span :class=" {'textOpacity-activ' : loading} " class="textOpacity">
    <slot> </slot>
    </span>
  </button>
</template>

<script>


export default {
  props: {
    disabled: { type: Boolean, default: false},
    loading: { type: Boolean, default: false},
    func: { type: Function}
  },

  methods: {
    addClick () {
      if(this.func) this.func()
    }
  }
}
</script>
<style lang="scss" scoped>
.spinner-position {
  position: absolute;
  left:0;right:0;top:0;bottom:0;
  margin: auto;
}

.btn {position: relative;}


.textOpacity {
  opacity: 1;
  transition: all .4s;
}

.textOpacity-activ {
  opacity: 0;
  transition: all .4s;
}
</style>
