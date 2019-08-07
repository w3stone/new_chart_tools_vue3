// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'handsontable/dist/handsontable.full.css'
import './assets/css/iconfont.css' 
import App from './App'
import router from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'


// import {dataGet, dataPost, dataPostXD, dataPostFormdata, dataPostCxl} from './assets/scripts/ajaxFn.js'
// import{
//     setCookie, getCookie, clearCookie,
//     setSession, getSession, clearSession,
//     setCache, getCache, checkCache, ifCacheFn
// } from './assets/scripts/storageFn.js'


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, axios);


//全局
// Vue.prototype.$dataGet = dataGet;
// Vue.prototype.$dataPost = dataPost;
// Vue.prototype.$dataPostXD = dataPostXD;
// Vue.prototype.$dataPostFormdata = dataPostFormdata;
// Vue.prototype.$dataPostCxl = dataPostCxl;
// //
// Vue.prototype.$setCookie = setCookie;
// Vue.prototype.$getCookie = getCookie;
// Vue.prototype.$clearCookie = clearCookie;
// //
// Vue.prototype.$setSession = setSession;
// Vue.prototype.$getSession = getSession;
// Vue.prototype.$clearSession = clearSession;
// //
// Vue.prototype.$setCache = setCache;
// Vue.prototype.$getCache = getCache;
// Vue.prototype.$checkCache = checkCache;
// Vue.prototype.$ifCacheFn = ifCacheFn;


//对象深拷贝
Vue.prototype.$deepCopy = function(data){
    try {
        return JSON.parse(JSON.stringify(data)); 
    } catch (error) {
        return data;
    }
}

//数字string串转number
Vue.prototype.$string2Num = function(val) {

    let int_reg = new RegExp("^-?\\d+$"); //整数
    let float_reg = new RegExp("^[-+]?[0-9]+(\\.[0-9]+)?$"); //正负整数或小数
    
    if( int_reg.test(val) ){
        return parseInt(val);

    }else if( float_reg.test(val) ){
        return parseFloat(val);

    }else{
        return val;
    }
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
