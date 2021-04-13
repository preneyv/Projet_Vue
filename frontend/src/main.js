import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AuthService from './services/auth'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faCaretUp, faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faNpm, faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck)
library.add(faTimes)
library.add(faCaretUp)
library.add(faCaretDown)
library.add(faBars)
library.add(faGithub)
library.add(faNpm)
library.add(faWikipediaW)

const Vue = createApp(App)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(store)

AuthService.updateStoreFromToken()

Vue.use(router)
Vue.mount('#app')