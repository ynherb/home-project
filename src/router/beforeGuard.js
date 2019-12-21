import store from '../store'
export default function (to, from, next) {
	if(store.getters.users){
		next()
	}
	else {
	   next('/login?LoginError=true')
	}

}