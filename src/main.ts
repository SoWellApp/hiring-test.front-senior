import './assets/main.css'

import { createApp } from 'vue'

import { Quasar, Notify } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
  iconSet: quasarIconSet
})

app.mount('#app')
