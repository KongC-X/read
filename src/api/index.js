import { get, post } from '../utils/request'
import { APP_ID, APP_SECRET } from '../utils/const'

const API_URL = 'https://test.youbaobao.xyz:18081'

export function getHomeData (params) {
  return get(`${API_URL}/book/home/v2`, params)
}

export function recommend () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function freeRead () {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function hotBook () {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

export function getOpenId (code) {
  return get(`${API_URL}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}

export function register (openId, userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}

export function search (params) {
  return get(`${API_URL}/book/search`, params)
}

export function hotSearch () {
  return get(`${API_URL}/book/hot-search`)
}

export function bookDetail (params) {
  return get(`${API_URL}/book/detail`, params)
}

export function bookRankSave (params) {
  return get(`${API_URL}/book/rank/save`, params)
}

export function bookContents (params) {
  return get(`${API_URL}/book/contents`, params)
}

export function bookShelf (params) {
  return get(`${API_URL}/book/shelf/get`, params)
}

export function bookShelfSave (params) {
  return get(`${API_URL}/book/shelf/save`, {
    shelf: JSON.stringify(params)
  })
}

export function bookShelfRemove (params) {
  return get(`${API_URL}/book/shelf/remove`, {
    shelf: JSON.stringify(params)
  })
}

export function searchList (params) {
  return get(`${API_URL}/book/search-list`, params)
}

export function categoryList () {
  return get(`${API_URL}/book/category/list/v2`)
}

export function userDay (params) {
  return get(`${API_URL}/user/day`, params)
}
