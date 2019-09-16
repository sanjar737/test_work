import store from '../store'

export function homeGuard (to, from, next) {
  if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
}

export function loginGuard (to, from, next) {
  if (store.getters.token) {
    next('/')
  } else {
    next()
  }
}
