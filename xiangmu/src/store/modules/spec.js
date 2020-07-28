import {requestSpecList,requestSpecCount} from "../../util/request"

const state={
    //列表数据
    list:[],
    //一页的数量
    size:2,
    //数据总数量
    total:0,
    //当前的页码
    page:1
}
const mutations={
    //修改list
    changeList(state,arr){
        //传数据钱处理数据
        arr.forEach(i => {
            //后台的数据是"['白色','红色‘，’黄色‘]"形式，转换成纯数据 i 相当于add里的form
            i.attrs=JSON.parse(i.attrs)
        });
        state.list=arr;
    },
    //修改总数
    changeTotal(state,num){
        state.total=num;
    },
    //修改当前页码
    changePage(state,page){
        state.page=page
    }
}
const actions={
    //获取列表数据
    requestList(context,bool){
        //调用这个action,如果要分页，就不用传参；如果要取所有的数据，就传递一个true
        var params={}
        if(bool){
            params ={} //传空对象
        }else{
            params={
                page:context.state.page,//接收由list 页面，点击时得到的页码a
                size:context.state.size
            }
        }

        requestSpecList(params).then(res=>{
            //没有取到数据
            if(res.data.list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeList",res.data.list)
        })
    },
    //获取总的数量
    requestTotal(context){
        requestSpecCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    //页面修改页码
    changePage(context,page){
        context.commit("changePage",page)
    }
}
const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total;
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}