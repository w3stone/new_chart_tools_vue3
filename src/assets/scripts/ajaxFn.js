import router from '@/router.js'
import axios from 'axios'
import {Message} from 'element-ui' //获取消息框
import {getSession, clearSession} from './storageFn.js'
import store from '@/store.js'


var axiosSource = null; //存储上一次请求的标记
var needMessage = true;


//初始化参数
function initFn(params, yesCallback, noCallback, argument){
    if (typeof argument[1]=="function"){
        yesCallback = argument[1];
        noCallback = argument[2];
        params = {};
    }
    
    return {
        "params": Object.assign(params, baseParams),
        "yesCallback": yesCallback,
        "noCallback": noCallback
    } 
}


//get再封装
function dataGet(apiName, params, yesCallback, noCallback){
    var obj = initFn(params, yesCallback, noCallback, arguments);
    params = obj.params;
    yesCallback = obj.yesCallback;
    noCallback = obj.noCallback;

    var apiUrl = domain + apiName;
    getStandard(apiUrl, params).then( ([data, all]) => {
        if(yesCallback) yesCallback(data, all);

    }).catch(error =>{
        if(noCallback) noCallback(error);
    });
}


//post再封装
function dataPost(apiName, params, yesCallback, noCallback){
    var obj = initFn(params, yesCallback, noCallback, arguments);
    params = obj.params;
    yesCallback = obj.yesCallback;
    noCallback = obj.noCallback;

    var apiUrl = domain + apiName;
    postStandard(apiUrl, params, false).then( ([data, all]) => {
        if(yesCallback) yesCallback(data, all);

    }).catch(error => {
        if(noCallback) noCallback(error);
    });
}

//post再封装(含交互)
function dataPostXD(apiName, params, yesCallback, noCallback){
    var obj = initFn(params, yesCallback, noCallback, arguments);
    params = obj.params;
    yesCallback = obj.yesCallback;
    noCallback = obj.noCallback;
    
    var apiUrl = domain + apiName;
    postStandard(apiUrl, params, false).then( ([data, all]) => {
        this.$message({message: '操作成功！', type:'success', duration:1500});
        if(yesCallback) yesCallback(data, all);

    }).catch(error => {
        this.$message({message: error, type:'error', duration:1500});
        if(noCallback) noCallback(error);

    });
}

//post再封装(含拦截器)
function dataPostCxl(apiName, params, yesCallback, noCallback){
    var obj = initFn(params, yesCallback, noCallback, arguments);
    params = obj.params;
    yesCallback = obj.yesCallback;
    noCallback = obj.noCallback;

    var apiUrl = domain + apiName;
    postStandard(apiUrl, params, true).then( ([data, all]) => {
        if(yesCallback) yesCallback(data, all);

    }).catch(error => {
        if(noCallback) noCallback(error);
    });
}

//formdata提交
function dataPostFormdata(apiName, formData, yesCallback, noCallback){
    $.ajax({
        type: 'post',
        contentType: false, 
        processData: false,
        url: domain + apiName,
        data: formData,
        success: (response) => { //上传成功
            if(response.state==1){
                if(yesCallback) yesCallback(response.data);
            }else{
                if(noCallback) noCallback(response.data);
                console.log(response);
                this.$message({message:'上传失败！', type:'error'});
            }
        },
        error: (response) => {
            console.log(response);
            this.$message({message:'上传失败！', type:'error'});
        }
    });
}


export{dataGet, dataPost, dataPostXD, dataPostFormdata, dataPostCxl}


//ajaxPost封装
function postStandard(apiUrl, params, ifInterceptor){
    //取消上一次请求
    if(ifInterceptor) cancelRequest();

    return new Promise((resolve, reject) => {
        axios.post(apiUrl, params, {
            headers:{
                'Authorization':'Bearer ' + getSession("token")
            },
            cancelToken: new axios.CancelToken(function executor(c) {
                axiosSource = c;
            })
        }).then(response => {
            var all = response.data;
            var data = response.data.data;

            if(!all.hasOwnProperty("state")){
                resolve([all]); //回调

            }else if(all.state==1){ //成功
                resolve([data,all]); //回调

            }else{ //失败
                if(all.state==4) logout(); //退出登陆
                console.log(all.state, all.message);
                store.commit('setLoading', false); //关闭载入动画
                reject(all.message);
            }   
        }, error => {
            console.log(error);
            store.commit('setLoading', false); //关闭载入动画
            reject("500");

        }).catch(error => {
            if(axios.isCancel(error)) {
                console.log('Rquest canceled', error.message); //请求如果被取消，这里是返回取消的message
            } else {
                store.commit('setLoading', false); //关闭载入动画
                reject(error);
                console.log(error);
            }
        });
    });
}


//ajaxGet封装
function getStandard(apiUrl, params){
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
                headers:{
                    'Authorization':'Bearer ' + getSession("token")
                },
                params: params
            }).then(response => {
            //console.log(response);
            var url = apiUrl + "?" + transPars(params);
            resolve([url]);
    
        }, error => {
            console.log(error);
            reject("500");
    
        }).catch(error => {
            console.log(error);
        });
    });
}



//退出登陆
function logout(){
    sessionStorage.clear();
    router.push("/login"); //改变路由
    if(needMessage){
        Message({message: "登陆已超时，请重新登陆！", type:'warning', duration:1000});
        needMessage = false;

        var timer = setTimeout(()=>{
            needMessage = true;
            clearTimeout(timer);
        }, 1000);
    }
}


//取消请求
var cancelRequest = ()=>{
    if(typeof axiosSource ==='function'){
        axiosSource('终止请求');
    }
}

//对象转&分割
function transPars(params){
    var arr = [];
    for(var key in params){
        arr.push(key + '=' + params[key])
    }
    return arr.join("&");
}

