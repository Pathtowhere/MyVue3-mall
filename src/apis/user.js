import http from '@/utils/http.js'

export function loginAPI(user) {
    return http.post('/login', user)
}
