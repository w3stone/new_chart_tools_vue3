/**cookie & localStorage相关方法**/

/**cookie**/
//设置cookie 
function setCookie(cookieName, cookieValue, exphour) {
    var exp = new Date();
    exphour = exphour || 24;
    exp.setTime(exp.getTime() + 1000*60*60*exphour); //默认保存24小时    	
    
    document.cookie = cookieName + "=" + cookieValue +"; expires=" + exp.toGMTString();
}

//取Cookie的值
function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == cookieName)
            return arr[1];
    }
    return "";
}

//清空cookie
function clearCookie(cookieName) {
    setCookie(cookieName, null, -1);
}

/**session**/
//设置session
function setSession(sessionName, sessionValue) {
    sessionStorage.setItem(sessionName, sessionValue);
}

//获取session
function getSession(sessionName) {
    var sessionResult =  sessionStorage.getItem(sessionName);
    if(sessionResult=="true"){
        return true;
    }else if(sessionResult=="false"){
        return false;
    }else{
        return sessionResult;
    }
}

//清楚session
function clearSession(sessionName) {
    sessionStorage.removeItem(sessionName);
}


/**localStorage**/
//设置缓存
function setCache(localstorageName, value){
    if(typeof value == "object")
        value =  JSON.stringify(value);

    localStorage.setItem(localstorageName, value);
    // 保存缓存的时间
    localStorage[localstorageName+"CacheTime"] = new Date().getTime();

}

//获取缓存
function getCache(localstorageName){
    var result = localStorage.getItem(localstorageName);

    if (typeof result == 'string') {
        try { 
            return JSON.parse(result);
        } catch(e) {
            return result;
        }
    }

}

//判断数据是否缓存
function checkCache(localstorageName){  
	if(!localStorage[localstorageName]){ //没有缓存
        return false;

    }else{ //如果有缓存
        var time = new Date().getTime() - localStorage[localstorageName+"CacheTime"];
        
        if(time> 20*1000){ //缓存时间超过20s
            localStorage.removeItem(localstorageName); //清除该localstorage;
            return false;
        }
        return true;
    }

}

//有无缓存方法
function ifCacheFn(localstorageName, yesCallback, noCallback){
    if(checkCache(localstorageName)){ //有缓存
        yesCallback(getCache(localstorageName));

    }else{ //没有缓存
        noCallback();

    }
}


export{
    setCookie, getCookie, clearCookie,
    setSession, getSession, clearSession,
    setCache, getCache, checkCache, ifCacheFn
}