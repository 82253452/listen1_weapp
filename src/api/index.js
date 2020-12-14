/*
* 接口api
*
* {url} {method} {auth}
* default
* /test/api GET FALSE
* */
export const COMMON_TOKEN = "/common/ypQiniuToken"
export const LOGIN = "/api/mini/login POST"
export const PHONE_INFO = "/api/mini/getPhoneNoInfo POST"
export const USER_INFO = "/api/mini/user"

export const CAR_RENTAL_LIST = "/api/carRental/list"
export const CAR_RENTAL_GET = id => `/api/carRental/get/${id}`




