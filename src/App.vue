<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { setTimeout, setInterval, clearTimeout } from 'timers';
    export default {
        name: 'app'
    }
</script>

<style lang="scss" type="text/css">
    #app {
        //font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-family: Arial,'Microsoft YaHei';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
    }
    html,body{
        box-sizing: border-box;
        font-size: 16px;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    .clearfix::after{
        content:"";
        display: table;
        clear: both;
    }
    .clearfix{
        *zoom:1;
    }
    h1,h2,h3,h4,h5,h6{
        margin: 0;
        padding: 0;
        cursor: default;
    }
    div,p{
        margin: 0;
        padding: 0;
    }
    img{
        width: 100%;
        vertical-align: middle;
    }
    i{
        font-style: normal;
    }
    ul,ol,ul li,ol li{
        list-style: none;
        padding: 0;
        margin: 0;
        cursor: default;
    }
    a{
        text-decoration: none;
        &:focus{
            outline: none;
        }
        &:hover{
            text-decoration: underline;
        }
    }
    input,button{
        border: none;
        outline: none;
    }
    .center{
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .updownCenter{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .left{ 
        float: left; 
    }
    .right{ 
        float: right; 
    }
    //文字溢出显示省略号
    .text_ellipsis{
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /**设置滚动条的样式**/
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    //滚动槽
    ::-webkit-scrollbar-track {
        background: transparent;
        //border: 1px solid #bbb;
        border-radius: 10px;
    }
    //滚动条滑块
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #cecece;
    }

    //重置样式
    .el-button--primary{
        background: $activeColor !important;
        border-color: $activeColor !important;

        &:hover{
            opacity: 0.8 !important;
        }
        &.is-disabled{
            background: $mainhoverColor !important;
            border-color: $mainhoverColor !important;
        }
    }
    //折叠按钮
    .collapse_btn{
        display: inline-block;
        font-size: 18px;
        width: 25px;
        cursor: pointer;

        &.hover{
            transform: rotate(180deg);
            transition: all .5s;
        }
        &.unhover{
            transform: rotate(360deg);
            transition: all .5s;
        }
    }
    
    /**label标签**/
    .label{
        display: inline;
        padding: .2em .6em .3em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25em;
    }
    .label-info{
        background-color: #49b8ff !important;
    }
    .label-success{
        background-color: #a4ce4e !important;
    }
    //动画效果
    .slide-fade-enter-active {
        transition: all .5s;
    }
    .slide-fade-leave-active {
        //transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        transition: all .5s;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }
    /**404 & 500**/
    .error_page{
        width: 100%;
        height: 100%;
        background-color: #fff;

        .error_box{
            text-align: center;
            width: 730px;
            height: 400px;
            z-index: 99;

            ul.error_logo{
                display: inline-block;

                li{
                    float: left;
                    width: 180px;
                    margin: 0 15px;
                }
                li.error_logo_middle{
                    padding-top: 30px;
                }
            }
            .bottom_line{
                display: inline-block;
                position: relative;
                width: 80%;
                height: 4px;
                background: #3a9fe8;
                border-radius: 4px;
                margin-top: 32px;

                &::after{
                    content: "";
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: #fff url($imgDomain + '/error_x.png') no-repeat;
                    background-size: cover;
                    bottom: -12px;
                    transform: translateX(-50%);
                }
            }
            h3.not_found{
                margin-top: 38px;
                height: 40px;
                line-height: 40px;
                font-size: 28px;
                letter-spacing: 2px;
            }
        }
    }
    //自定义表格
    .su_table{
        width: 100%;
        background-color: #fff;
        border-collapse: collapse;
        border-spacing: 0;
        border: 1px solid $tableBorderColor;

        th,td{
            //padding: 15px 18px;
            padding: 12px 10px;
            line-height: 23px;
            font-size: 14px;
            font-weight: normal;
            text-align: left;
            border: 1px solid $tableBorderColor;
        }
        th>p{
            color: #909399;
            font-weight: bold;
            text-align: center;
        }
        thead>tr, tbody>tr{
            border-bottom: 1px solid $tableBorderColor;
        }
        tbody>tr{
            // &:nth-child(even){
            //     background-color: #fafafa;
            // }
            &:hover, &.active{
                background-color: $tableActiveColor;
                // td{
                //     background-color: $tableActiveColor;
                // }
            }
        }

    }
    
</style>
