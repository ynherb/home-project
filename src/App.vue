<template>
  <div id="app">

    <template v-if="userAutho">
      <router-link to="/Home" tag="a" class="btn link_button"
        :class="activeClass == 'home' ? 'btn-primary' : 'btn-secondary'">
       Добавить новий товар на сайт
      </router-link>
      <router-link to="/About" tag="a" class="btn link_button"
        :class="activeClass == 'about' ? 'btn-primary' : 'btn-secondary'">
        Изменить количество
      </router-link>
      <button @click="logout" class="btn btn-primary logout">logout</button>
    </template>


    <transition name="router-animation" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>


    <loading-component v-if="loadingPage"> </loading-component>
  </div>
</template>

<script>
import loadingComponent from './components/loading'

export default {
  data () {
    return {}
  },
  computed: {
    userAutho () { return this.$store.getters.users },
    activeClass () { return this.$route.name.toLowerCase() },
    loadingPage () { return this.$store.getters.loadingPage }
  },
  methods: {
    logout () {
      this.$store.dispatch('asyncLogout').then(() => {
        this.$router.push('login') 
      })
    }
  },
  components: {
    loadingComponent
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow:hidden;
  z-index: 1;
  position: relative;
  min-height: 100vh;
}

body {
  overflow: hidden;
}

.logout {
  float: right;
  margin: 10px 10px 0 0;
}

.link_button {
  margin: 10px 10px 0 0;
}

.loading_button {
  opacity: 0;
  position: relative;
  
  &+div {
    position: absolute;
    left:0; right: 0; top: 0; bottom: 0;
    margin: auto;
  }
}

.disable_button {
  opacity: 1;
  
  &+div {
    display: none;
  }
}
.router-animation-enter-active, .router-animation-leave-active {
  transition: all .2s;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;

}
.router-animation-enter, .router-animation-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(300px);
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}

</style>
