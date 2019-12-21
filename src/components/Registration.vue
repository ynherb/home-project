<template>
	<form class="form-login">
	 
	  <div class="form-group">
	    <label for="exampleInputEmail1" >Email address</label>
	    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model.trim="email" @keyup="validateEmail">
	    <small id="emailHelp" class="form-text text-danger">{{validateForm.email}}</small>
	  </div>
	  
	  <div class="form-group">
	    <label for="exampleInputPassword1">Password</label>
	    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" 
	    v-model="pass" @keyup="validatePass">
	    <small id="emailHelp" class="form-text text-danger">{{validateForm.pass}}</small>
	  </div>

	   <div class="form-group">
	    <label for="exampleInputPassword1" >Again password</label>
	    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" 
	    v-model="pass2" @keyup="validatePassAgain">
	    <small id="emailHelp" class="form-text text-danger">{{validateForm.pass2}}</small>
	  </div>

	  <button type="submit" class="btn btn-primary primary" style="position: relative" 
	  	@click.prevent="registration" :disabled="conformButton">
	  	<span v-bind:class="loading">Registration</span>
		 	<div class="spinner-border text-dark" role="status" >
	  		<span class="sr-only" >Loading...</span>
			</div>
		</button>

	</form> 
</template>

<script>

var patternEmail  = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;

export default {
	data () {
		return {
			email: '',
			pass: '',
			pass2: '',
			validateForm: {
				email: '',
				pass: '',
				pass2: ''
			}
		}
	},
	computed: {
		loading () {
			return (this.$store.getters.loading) ? 'loading_button' : 'disable_button';
		},
		conformButton () {
			return Object.values(this.validateForm).some(elem => elem != null)
		}
	},
	methods: {
		registration () {
			this.$store.commit('loading', true)
			this.$store.dispatch('asyncCreateUser', {email: this.email, pass: this.pass})
			.then((e) => {
				this.$router.push('/')
			}).finally((e) => {
				this.$store.commit('loading', false)
			})
		},
		validateEmail () {
			this.validateForm.email = (!patternEmail.test(this.email)) ? 'email not correction' : null;
		},
		validatePass () {
			this.validateForm.pass = (this.pass.length < 6) ? "password must be longer than 6 characters" : null;
		},
		validatePassAgain () {
			this.validateForm.pass2 =  (this.pass != this.pass2) ? 'Passwords do not match' : null;
		}
	}
}
</script>

<style scoped lang="scss">
.form-login {
	display: block;
}

</style>
