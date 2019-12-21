<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import * as fb from 'firebase'
export default {
	methods: {
		add () {
			alert(1)
			this.$store.dispatch('asyncSetProduct')
		}
	}
}
</script>