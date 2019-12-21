<template>
<div class="home">


  <div class="add-product" v-if="loading">
		<div class="select_product"  v-if="!dataEmpty">
			<div>
				<select class="custom-select" v-model="selected">
					<option disabled value="select">Select product</option>
    			<option v-for="index in selectProduct">{{index}}</option>
  			</select>
		  </div>
			<addTypeProductComponent v-show="selected != 'select'" :select="selected"> 
			</addTypeProductComponent>
		</div>

		<span v-else>{{dataEmpty}}</span>
  </div>

</div>
</template>
<script>
import descriptionComponent from '../components/descriptionProduct'
import addTypeProductComponent from '../components/addTypeProduct'

export default {
	data () {
		return {
			selected: 'select',
			loading: false,
			dataEmpty: true
		}
  },
  computed: {
  	selectProduct () {
  		return this.$store.getters.getTypedProductName;
  	}
  },
  created () {
  	this.$store.commit('setLoadingPage')
  	this.$store.dispatch('asyncGetTypeProduct')
	  	.then((e) =>  this.dataEmpty = false )
	  	.catch((err) => 	this.dataEmpty = err)
	  	.finally(() => {
	  		this.loading = true
	  		this.$store.commit('setLoadingPage')
	  	})
  }, 
	components: {
		descriptionComponent,
		addTypeProductComponent,
		
	}
}
</script>
<style scoped lang="scss">

.home {
	z-index: 50;
	padding: 10px;

}

.add-product {
	margin: 10px 0 0 0;
	display: flex;
 	justify-content: center;
 	flex-flow: column;
 }

 .select_product {
	width: 84%;
 	margin: 0 auto;
	position: relative;
 }

 .loading-position {
 	position: absolute;
 	top:0;left:0;bottom:0;right:0;
 	margin: auto;
 }



</style>