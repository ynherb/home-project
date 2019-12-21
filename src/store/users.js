import * as fb from 'firebase'

export default {
  state: {
  	users: false
  },
  getters: {
  	users (state) {	return state.users;}
  },
  mutations: {
  	userAuth (state, uid) { state.users = uid;}
  },
  actions: {
  	async asyncCreateUser ({commit}, {email, pass}) {
  		try {
  			const result = await fb.auth().createUserWithEmailAndPassword(email, pass)
  			commit('userAuth', result.user.uid)
  		}
  		catch (error) {
  			const text = error.message.split(':');
  			commit('typeError', {text:text[text.length-1], flag: true})
  			throw error
  		}
  					
  	},
  	async asyncLoginUser ({commit}, {email, pass}) {
  		try {
  			const result = await fb.auth().signInWithEmailAndPassword(email, pass)
  			commit('userAuth', result.user.uid)
  		}
  		catch (error) {
  			const text = error.message.split(':');
  			commit('typeError', {text:text[text.length-1], flag: true})
  			throw error
  		}
  					
  	},
  	asyncLogout ({commit}) {
  		fb.auth().signOut()
  		commit('userAuth', false)
  	}
  }
}