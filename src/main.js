import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as fb from 'firebase'
import './registerServiceWorker'
import router from './router'
import buttunLoadingComponent from './components/buttonLoading'
import texteriaComponent from './components/texteriaComponent'

Vue.config.productionTip = false

Vue.component('buttonLoading', buttunLoadingComponent)
Vue.component('texteriaComponent', texteriaComponent)



fb.initializeApp({
	    apiKey: "AIzaSyA8BMetJkxF8Yuz4sa4KD1ih6hgRFbrQLU",
	    authDomain: "ynherb22.firebaseapp.com",
	    databaseURL: "https://ynherb22.firebaseio.com",
	    projectId: "ynherb22",
	    storageBucket: "ynherb22.appspot.com",
	    messagingSenderId: "833209840006",
	    appId: "1:833209840006:web:8404fd5731ace86eddfc07"
})

fb.auth().onAuthStateChanged(user => {
  if(user){
  	store.commit('userAuth', user.uid)
 	}
 
 new Vue({
 	el: '#app',
  router,
  store,
  render: h => h(App)
	})

})


