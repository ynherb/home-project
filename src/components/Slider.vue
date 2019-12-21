<template>
<div class="slider">
  <div class="images">
		<img  :src="images[i%images.length]" alt="">
  </div>
	<div class="arrow right-arrow" :class="{'arrow-none': active}" 
	@click="i = i + 1 * 1"></div>
  <div class="arrow left-arrow" :class="{'arrow-none': active}" @click="i = i*1 + 1"></div>

</div> 
</template>

<script>
export default {
	data () {
		return {
			i: 0
		}
	},
  props: ['images'],
 	computed: {
 		active () {	return !this.images.length }
 	}
}

</script>
<style lang="scss" scoped>
.images {
  width: 350px;
  height: 300px;
  margin-bottom: 10px;
  display: flex;
  alig-item: center;
  position: relative;
  overflow: hidden;
  &>img {
    max-width: 100%;
    border: none;
  }
}

.slider {	position: relative; }

.arrow-none {
	opacity: 0;
}


.arrow {
	transition: all 5s;
	position:absolute;
	background: url('../assets/dot-arrow.svg') no-repeat;;
	width: 50px;
	height: 60px;
	top: 0;
	bottom: 0;
	margin: auto 0;
	cursor: pointer;
	transition: all .4s;
	&:hover {
		width: 55px;
	}

}
.left-arrow {
	left: -60px;
	transform: rotate(180deg);
}

.right-arrow { right: -60px; }
</style>
