/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { dispatch } from 'vuex'

if (process.env.NODE_ENV === 'production') {
  register('https://ivanshavliuga.github.io/shulte2/service-worker.js', {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      localStorage.appmessage = 'start app'
      dispatch('startApp')
    },
    cached () {
      localStorage.appmessage = 'cached app'
      console.log('Content has been cached for offline use.')
    },
    updated () {
      localStorage.appmessage = 'updated app'
      console.log('New content is available; please refresh.')
    },
    offline () {
      localStorage.appmessage = 'offline app'
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      localStorage.appmessage = 'error app'
      console.error('Error during service worker registration:', error)
    }
  })
}
