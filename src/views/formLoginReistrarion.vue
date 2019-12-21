<template>
  <div class="position_form">
    
    <div class="form">
    
    <button type="button" class="btn btn-primary" 
      v-for="item in tabs" :key="item" v-on:click="currentTabs = item">{{item}}</button>
      
      <transition name="fade">
        <keep-alive>
        <component  :is="currentTabs"> </component>
        </keep-alive>
      </transition>
    </div>

    <transition name="fade">
      <alertsComponent v-if="flagErr"> </alertsComponent>
    </transition>

  </div>
</template>

<script>
const alertsComponent = () => import('../components/Alerts.vue');
import Registration from '../components/Registration.vue';
import Login from '../components/Login.vue';

export default {
  data () {
    return {
      currentTabs: 'Login',
      tabs: ['Login','Registration']
    }
  },
  components: {
    Login,
    Registration,
    alertsComponent
  },
  computed: {
    flagErr () {
      return this.$store.getters.flagErr
    }
  },
  created () {
    if(this.$route.query['LoginError']) {
      this.$store.commit('typeError', {text:'Sign in or sign up', flag: true})
    }
  }
}
</script>

<style lang="scss" scoped>
.position_form {
  display: flex;
  justify-content: center;
  overflow: hidden;
  height:100vh;
 
}

.form {
  position: relative;
  width: 20%;
}

.btn {
  margin: 10px;
}

input {
  width: 100px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s;

}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
  position: absolute;

}

</style>
