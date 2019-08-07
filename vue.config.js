const webpack= require('webpack');

var version = new Date().getTime();
var assetsDir = 'web';


module.exports = {
    lintOnSave: false,  //eslint 是否在保存行为的时候检查代码
    productionSourceMap: false,
    publicPath: "./", //导出路径
    assetsDir: assetsDir, //静态资源文件夹
    css: { //全局scss变量
        loaderOptions:{
            sass:{
                data: `@import "@/assets/scss/color.scss";`
            }
        }
    },
    devServer: { //测试环境代理
        port: 8020 //测试端口
    }, 
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') { //为生产环境修改配置
            config.mode = 'production';
            
            //修改输出的js名称
            Object.assign(config.output, {
                filename: assetsDir + '/js/[name].[contenthash:8]_' + version + '.js',
                chunkFilename: assetsDir + '/js/[name].[contenthash:8]_' + version + '.js'
            });
            
            //修改输出的css名称
            config.plugins.some(obj => {
                if(obj.options){
                    if(obj.options.filename && obj.options.chunkFilename){
                        obj.options = {
                            filename: assetsDir + '/css/[name].[contenthash:8]_' + version + '.css',
                            chunkFilename: assetsDir + '/css/[name].[contenthash:8]_' + version + '.css'
                        }
                        return true; //跳出循环
                    }
                }
            })
            //console.log(JSON.stringify(config));

        } else { //为开发环境修改配置

            
        }
    }
}
