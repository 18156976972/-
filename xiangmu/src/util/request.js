//axios模块，
import axios from "axios"
import qs from "qs"

//响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次路径："+res.config.url)
    console.log(res)
    return res;
})

const baseUrl="/api"  