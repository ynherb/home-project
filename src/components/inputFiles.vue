<template>
  <input type="file" 
    value="images load" 
    multiple="multiple" 
    name="files"
    accept="image"
    @change="loadImages"/> 
</template>

<script>
export default {
  data () {
    return {
      images: [],
      imgList: []
    }
  },
  methods: {
    loadImages (event) {
      this.images = [];
      this.imgList = [];

      const input = event.target;
      Object.keys(input.files).forEach(item => {
        this.imgList.push(input.files[item])
      })


      console.log(this.imgList)
      input.files.forEach((item) => {
        const reader = new FileReader();
        reader.onload = e => this.images.push(e.target.result); 
        reader.onerror = err => console.log(err);
        reader.readAsDataURL(item)
     })  
    }
  },
  watch: {
    images () {
      this.$emit('update:images', this.images)
      this.$emit('update:imgList', this.imgList)
    }
  }

}
</script>
<style lang="scss" scoped>
</style>
