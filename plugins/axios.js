export default function ({ $axios, redirect, store }, inject) {
  $axios.setHeader('Content-Type', 'application/json')
  // $axios.setToken(store.getters.accessToken, 'Bearer');

  $axios.defaults.withCredentials = true
  const api = $axios.create({
    headers: {
      common: {
        Accept: '*/*',
        'Content-Type': 'application/json'

      }
    }
  })

  api.onRequest((config) => {
    /** 
    const token = store.getters.accessToken
    api.setHeader('Content-Type', 'application/json')
    if (config.url != '/users/signin') {
      api.setHeader('Authorization', 'Bearer ' + token)
    }
    **/
  })

  api.onError((error) => {
    const message = error.response.data.defaultUserMessage
    const code = parseInt(error.response && error.response.status)
  })
  /** api.onResponse(response => {
    // Vue.toasted.show('Success ', { icon: 'check-circle', type: 'success' });
  });
  **/
  api.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      const message = error.response.data.defaultUserMessage
      Vue.toasted.error(`${message}`, {
        icon: 'close-circle',
        position: 'top-center',
        keepOnHover: true,
        type: 'error',
        theme: 'bubble',
        duration: 5000
      })
    }
    if (code === 401) {
      const message = error.response.data.error
      store.dispatch('_logoutsession')
      /**
      *  console.log(message)
      Vue.toasted.error(`${message}`, {
        icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'info',
        theme: 'outline', duration: 5000
      });
      **/
    }
  })

  // Set baseURL to something different
  // eslint-disable-next-line no-console

  /** For UI developers with no local API **/
  /* api.setBaseURL(  process.env.baseUrl ); */

  /** For production */
  api.setBaseURL(process.env.DEPLOY_ENV === 'prod' ? process.env.baseUrl : process.env.localUrl)
  // Inject to context as $api
  inject('api', api)
}
