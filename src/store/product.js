import * as fb from 'firebase'

export default {
  state: {
  	typedProduct: null,
    product: null,

  },
  getters : {
    getTypedProductName (state) {
      return Object.keys(state.typedProduct)
    },
    getPropertiesProduct: state => select => {
      console.log(state.typedProduct[select])
      return state.typedProduct[select]
    }
  },
  mutations: {
    setTypedProduct (state, fbProductTyped) {
      //получаємо типи товарів і їх властивості
      const res = Object.keys(fbProductTyped)
      let descrProduct = {};
      res.forEach((item) => {
        for(let key in fbProductTyped[item]) {
          descrProduct[item] = (Object.keys(fbProductTyped[item][key]))
          break
        }
      })
      state.typedProduct = descrProduct;
      //весь товар заносимо в стейт
      state.product = fbProductTyped;
    } 
  },
  actions: {
  	async asyncGetTypeProduct ({commit}) {
    	try {
        const fbData = await fb.database().ref('product').once('value')
        const fbVal = fbData.val()
        if(!fbVal) throw "There are no products in the database"
        commit('setTypedProduct', fbVal)
      }
      catch (error) {
        throw error
      }
      
  	},
    async asyncSearchCopyProduct ({commit}, {select, article}) {
      try {
        const result = await fb.database().ref('product/'+select).orderByChild('article').equalTo(article).once('value');
        return result.val()
      }
      catch (err) {
        console.log(err)
      }
    },
    asyncImagesUpload ({commit}, {images, article}) {
       return Promise.all(images.map(async (img, index) => {
        const imageExt = img.name.slice(img.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref('images/'+article+index)
              await fileData.put(img)
        
        const url = await fileData.getDownloadURL()

        return url;
      }))      
    },
    async asyncCkeckProduct ({dispatch,commit}, {product,select}) {
      alert(product)
      const {images} = product;
      const article = product.article.toUpperCase()

      try {
        const replayProduct = await dispatch('asyncSearchCopyProduct', {select, article})
          if(replayProduct) throw 'Replay product database';
      }
      catch (err) {
        console.log(err)
        throw err
      }

        const imgStorage = await dispatch('asyncImagesUpload', {images, article})
        product.images = imgStorage
      try {
        const add = await dispatch('asyncSetProduct', {product,select})
      }
      catch (err) {
        throw err
      }
    
    },
    async asyncSetProduct ({commit}, {product,select}) {
      console.log(select)
      const addProduct = await fb.database().ref('product/'+select).push(product)
    }
  }
}