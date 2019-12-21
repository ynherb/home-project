export default {
	state: {
	typeError: {
	  	flag: null,
	  	text: null
	  },
	  loading: false,
    loadingPage: false
  },
  getters: {
  	textError (state) {
  		return state.typeError.text
  	},
  	flagErr (state) {
  		return state.typeError.flag
  	},
  	loading (state) {
  		return state.loading
  	},
    loadingPage (state) {
      return state.loadingPage
    }
  },
  mutations: {
  	typeError (state, result) {
  		state.typeError.flag = result.flag;
	 		state.typeError.text = result.text;
  	},
  	loading (state, flag) {
  		state.loading = flag;
  	},
    setLoadingPage (state) {
      state.loadingPage = !state.loadingPage
    }
  }
}
