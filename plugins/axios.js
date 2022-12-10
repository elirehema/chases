export default function ({ $axios, redirect, store }, inject) {
  $axios.setHeader('Content-Type', 'application/json')
  // $axios.setToken(store.getters.accessToken, 'Bearer');

  const api = $axios.create({
    headers: {
      common: {
        Accept: '*/*',
        'Content-Type': 'application/json'

      }
    }
  })

  api.onRequest((config) => {
    config.withCredentials = false
    const token = localStorage.getItem('accessToken')
    api.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    api.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With')
    api.setHeader('Access-Control-Allow-Origin', '*')
    api.setHeader('Accept', '*/*')
    if (config.url != '/users/signin') {
      // api.setHeader('Authorization', token)
    }
  })

  api.onError((error) => {
    const message = error.response.data.defaultUserMessage
    const code = parseInt(error.response && error.response.status)
  })
  /** api.onResponse(response => {
    // Vue.toasted.show('Success ', { icon: 'check-circle', type: 'success' });
  });
  api.onResponseError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      const message = error.response.data.defaultUserMessage
      Vue.toasted.error(`${message}`, {
        icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'error',
        theme: 'bubble', duration: 5000
      });
    }
    if (code === 401) {
      const message = error.response.data.defaultUserMessage;
      Vue.toasted.error(`${message}`, {
        icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'info',
        theme: 'outline', duration: 5000
      });
    }
  });
  **/

  // Set baseURL to something different
  // eslint-disable-next-line no-console

  /** For UI developers with no local API **/
  /* api.setBaseURL(  process.env.baseUrl ); */

  /** For production */
  api.setBaseURL(process.env.NODE_ENV === 'production' ? process.env.baseUrl : process.env.localUrl)
  // Inject to context as $api
  inject('api', api)
}
