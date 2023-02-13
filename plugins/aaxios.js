export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    $axios.setHeader('Content-Type', 'application/json; charset=utf8')
    $axios.setHeader('crossorigin', 'true')
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    $axios.setHeader('Access-Control-Allow-Credentials', 'true')
    $axios.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With')

    $axios.setHeader('Cache-Control: no-cache, no-store, must-revalidate')
    $axios.setHeader('Pragma: no-cache')
    $axios.setHeader('Expires: 0')
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      store.dispatch('_logoutsession')
    }
  })
}
