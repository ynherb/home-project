<template>
	<form class="form-login">
	 
	  <div class="form-group">
	    <label for="exampleInputEmail1">Email address</label>
	    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
	  </div>
	
	  <div class="form-group">
	    <label for="exampleInputPassword1">Password</label>
	    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" 
	    	v-model="pass">
	  </div>
	   
	   <button type="submit" class="btn btn-primary primary" @click.prevent="login">
	  	<span v-bind:class="loading">Login</span>
	 		<div class="spinner-border text-dark" role="status">
  			<span class="sr-only">Loading...</span>
			</div>
		</button>
	
	</form>
</template>

<script>

var patternEmail  = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;

export default {
	data () {
		return {
			email: null,
			pass: null
		}
	},
	computed: {
		loading () {
			return (this.$store.getters.loading) ? 'loading_button' : 'disable_button';
		}
	},
	methods: {
		login () {
			this.$store.commit('loading', true)
			this.$store.dispatch('asyncLoginUser', {email: this.email, pass: this.pass})
			.then((e) => {
				this.$router.push('/')
			}).finally((e) => {
				this.$store.commit('loading', false)
			})
		}
	}
}
</script>
<style scoped lang="scss">
.form-login {
	display: block;
}


</style>
