//axios模块，
import axios from "axios"
import qs from "qs"

import store from "../store"   //从仓库中取token值
import {warningAlert} from "./alert"
import router from "../router"   //js中跳路由，引入

//响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次路径："+res.config.url)
    console.log(res)
    // 掉线重新登录
    if(res.data.msg==="登录已过期或访问权限受限"){
        warningAlert("登录已过期或访问权限受限")
        router.push("/login");
        return;
    }
    
    return res;
})

//请求拦截  加一个token
axios.interceptors.request.use(config => {
    //authorization  是后端需要的字段
    //config.headers 是请求数据时候得到的数
    // config.url 进入页面的路由
    //url: "/api/api/menulist"
    if (config.url != baseUrl + '/api/userlogin') { //不是刚登录，，就去加token
        config.headers.authorization = store.state.user.token;
    }
    return config
})




const baseUrl="/api"  
//菜单添加
export const requestMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//菜单列表
export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}

////菜单某一个条数据(点编辑时  ， 让add  里面自动请求一条数据)
export const requestMenuDetail = params => {
    return axios({
        url: baseUrl+'/api/menuinfo',
        method: "get",
        params
    })
}

//菜单修改  axios
export const requestMenuUpdate = params => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//菜单删除
export const requestMenuDelete = params =>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:qs.stringify(params)
    })
}


////////////////////////////////////////////
//角色列表的 获取

export const requestRoleList = ()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:'get'
    })
}

///角色添加
export const requestRoleAdd=(params)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(params)
    })
}

//获取某一角色信息
export const requestRoleDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:params
    })

}

//角色修改
export const requestRoleUpdate = (params) => axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
})

//角色删除
export const requestRoleDelete = params => axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify(params)
})

//////////////////////////////////
//管理员添加
export const requestManageAdd = params => axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
})
//管理员总数
export const requestManageCount = () => axios({
    url: baseUrl + "/api/usercount",
    method: "get",
})

//管理员列表
export const requestManageList = (params) => axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params
})

//管理员获取一条
export const requestManageDetail = (params) => axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params
})

//管理员修改
export const requestManageUpdate = (params) => axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
})

//管理员删除
export const requestManageDelete = params => axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(params)
})



////////////////////////////////////////
////分类添加

export const requestCateAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}

// 分类列表
export const requestCateList =(params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:params
    })
}
//分类某一个条数据
export const requestCateDetail = params => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params
    })
}

//分类修改
export const requestCateUpdate =(params)=>{
    var formDtae = new FormData()
    for(let i in params){
        formDtae.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:formDtae
    })
}

//分类删除
export const requestCateDelete = params => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}

////////////////////////////
//**1.商品规格添加**
export const requestSpecAdd = params =>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(params)
    })
}
//**2.商品规格总数（用于计算分页）**

export const requestSpecCount = () => axios({
    url: baseUrl + "/api/specscount",
    method: "get",
})

//**3.商品规格列表（分页）**
export const requestSpecList = (params) => axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params
})
//4.商品规格获取一条
export const requestSpecDetail = (params) => axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params
})

//5.商品规格修改
export const requestSpecUpdate = (params) => axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(params)
})

//6.商品规格删除
export const requestSpecDelete = params => axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify(params)
})


////////////////////////////////////////////////////////////////
//商品添加
export const requestGoodsAdd = (params) => {
    let formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })
}

//商品总数
export const requestGoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}
//商品列表
export const requestGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品某一个条数据
export const requestGoodsDetail = params => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}
//商品修改
export const requestGoodsUpdate = params => {
    let formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}

//商品删除
export const requestGoodsDelete = params => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
/////////////////////////////
//登录验证
export const requestLogin=(params)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:qs.stringify(params)
    })
}



/////////////////////////////////



//会员列表
export const requestMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}

///获取某个会员的具体信息
export const requestMemberDetail = params => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params
    })
}
//会员修改
export const requestMemberUpdate = (params) => axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(params)
})


///////////////////////////////////////
////1.轮播图添加

export const requestBannerAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: formData
    })
}

// 2分类列表
export const requestBannerList =()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get',
    })
}
//3分类某一个条数据
export const requestBannerDetail = params => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params
    })
}

//4分类修改
export const requestBannerUpdate =(params)=>{
    var formDtae = new FormData()
    for(let i in params){
        formDtae.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:formDtae
    })
}

//分类删除
export const requestBannerDelete = params => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}


/////////////////////////
////1.秒杀活动添加

export const requestSeckillDelete = params => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}
// 2.秒杀活动列表
export const requestSeckillList =()=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get',
    })
}
//3秒杀活动某一个条数据
export const requestSeckillDetail = params => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}

//4秒杀活动修改
export const requestSeckillUpdate =(params)=>{
    var formDtae = new FormData()
    for(let i in params){
        formDtae.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:formDtae
    })
}

//5秒杀活动删除
export const requestSeckillDelete = params => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}