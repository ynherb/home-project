<template>
  <div>

    <div class="view-product">
     
      <transition-group class="list-animation" name="list-complete" tag="div">
        
        <texteriaComponent 
          v-for="item in descriptionProduct" 
          :key="item" 
          :value.sync="product[item]">
          {{item}}
        </texteriaComponent>
      </transition-group>

      <transition-group class="text-p" name="list-complete" tag="div" >
        
        <viewProductComponent 
          class="list-complete-item"
          v-for="(item,key) in product" 
          :product="item" 
          :key="key" 
          :name="key">
        </viewProductComponent>
      </transition-group>
      
      <div>
        <sliderComponent 
          :images="images">
        </sliderComponent>

        <inputFilesComponent 
          :images.sync="images"
          :imgList.sync="imgList">
        </inputFilesComponent>
      </div>
    
    </div>

    <div class="button">
      <buttonLoading 
        :disabled.sync="disabledComputed" 
        :func="addProduct" 
        :loading.sync="loading"> 
        Save product
      </buttonLoading>
    </div>

  </div>
</template>
<script>
import viewProductComponent from '../components/viewProduct'
import inputFilesComponent from '../components/inputFiles'
import sliderComponent from '../components/Slider'

export default {
  data () {
    return {
      loading: false,
      product: {},
      imgList: [],
      images: []
    }
  },
  props: ['select'],
  methods: {
    addProduct () {
      const product = Object.assign({}, this.product);
       product.images = this.imgList
      const select = this.select;

      this.$store.dispatch('asyncCkeckProduct', {product,select}).then(() => {
         Object.keys(this.product).forEach((item) => {
           this.product = {}
         })
      }).catch((err) => {
        alert(222)
        console.log(err)
      })

    }
  },

  computed: {

    disabledComputed () {
      const propertiesProduct = Object.keys(this.product)
      return !(propertiesProduct.every(key => this.product[key].length > 3) && this.images.length)
    },

    descriptionProduct () {
      let obj = {}
      let value = this.$store.getters.getPropertiesProduct(this.select)
      if(!value) return null;

      value = value.filter(key => key != 'images')

      value.forEach((item) => {
        obj[item] = this.product[item] || ''
      })
      this.product = obj
      return value
    }
  },
  components: {
    viewProductComponent,
    inputFilesComponent,
    sliderComponent

  }
}
</script>
<style lang="scss">
.texteriaPosition {
  margin: 10px 0;
}

.list-complete-item {
  transition: all 1s;

  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.view-product {
  display: flex;
  justify-content: space-between;
  padding: 20px;
   &>div {
      flex-grow: 1;
    }
}

.text-p {
  position: relative;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}


.list-animation {
  position:  relative;
}




</style>
