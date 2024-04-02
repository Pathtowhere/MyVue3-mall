import http from '@/utils/http'

export function getBannerAPI(distribuitionSite = '1') {
    //distribuitionSite,1为首页，2为分类页，默认是1
    return http.get('home/banner',{params:{distribuitionSite}})
}

export const getNewAPI = () => {
    return http.get('/home/new')
}
export const getHotAPI = () => {
    return http.get('/home/hot')
}
export const getGoodsAPI = () => {
    return http.get('/home/goods')
}
