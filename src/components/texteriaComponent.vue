<template>

  <div class="input-group texteriaPosition list-complete-item">
    <div class="input-group-prepend">
      <span class="input-group-text textwidth"><slot></slot></span>
    </div>
    <input  class="form-control texteria-height" aria-label="With textarea" v-model="value" v-on:input="onUserChange">
    </input>
  </div>

</template>

<script>


export default {
	data () {
		return {
			result: this.value
		}
	},
	props: ['value'],
	methods: {
		onUserChange: function(){
    	this.$emit('update:value', this.value)
		}
	}
}
</script>
<style lang="scss" scoped>

</style>
