<template>
	<div class="alert alert-danger" role="alert" id="error">
  	{{textError}} <span class="close" @click="closed">&#10008;</span>
	</div>
</template>

<script>
let timer;

export default {
	computed: {
		textError () {
			clearTimeout(timer)
			timer = setTimeout(() => {
		  	this.$store.commit('typeError', {flag: false, text: ''})
			}, 5000)
			return this.$store.getters.textError
		}
	},
	methods: {
		closed () {
			clearTimeout(timer)
			this.$store.commit('typeError', {flag: false, text: ''})
		}
	}
}
</script>
<style scoped lang="scss">
#error {
  margin: 0 auto;
  position: absolute;
	left: 0; bottom: 5vh; right: 0;
	max-width: 500px;
  min-height: 50px;
}
.close {
	float: right;
	cursor: pointer
}
</style>
