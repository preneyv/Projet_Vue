import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck)

const Vue = createApp(App)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(router).mount('#app')
