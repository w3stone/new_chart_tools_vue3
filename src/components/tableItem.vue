<template>
	<div class="tableItem" :id="tableId">
        <div class="title_bar clearfix"> 
            <!-- <h4><i class="rotate_icon el-icon-sort" @click="rotateTable" title="行列转换"></i>{{tableName}}</h4> -->
            <!-- <i class="el-icon-arrow-up collapseBtn" @click="toggleShow" :class="{hover:isShowing, unhover:!isShowing}"></i> -->
        </div>
        <transition name="slide-fade">
            <div class="table_box">
                <table class="su_table" stripe v-show="isShowing">
                    <colgroup>
                        <col v-for="(item, index) in thead" :key="index" :name="'td'+index">
                    </colgroup>

                    <thead>
                        <tr>
                            <th v-for="(item, index) in thead" :key="index" style="white-space:nowrap">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(each, index) in tbody" :key="index">
                            <td v-for="(item, index) in each" :key="index" :class="'td'+index" style="white-space:nowrap">
                                {{index!=0? thousandBitSeparator(item): item}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
	export default {
        name:'tableItem',
        props:["tableName", "tableObj", "tableId"],
        data: function(){
            return {
                isShowing: true, //表格显示状态,
                tableArr: []
            }
        },
        computed:{
            colNum(){
                return this.tableObj.thead.length;
            },
            colWidth(){
                if(this.colNum!=0){
                    return parseInt(100/this.colNum);
                }else{
                    return 100;
                }
            },
            thead(){
                //console.log(this.tableArr);
                return this.tableArr? this.tableArr[0]: [];
            },
            tbody(){
                //console.log(this.tableArr);
                return this.tableArr? this.tableArr.slice(1, this.tableArr.length): [];
            }
        },
        methods:{
            //转换为千分位
            toThousands(num){
                num = (num || 0).toString();
                let result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) { result = num + result; }
                return result;
            },
            //table行列转换
            rotateTable(){
                //console.log(this.tableArr);
                //this.tableArr = rotateArr(this.tableArr);
            },
            toggleShow(){
                this.isShowing = !this.isShowing;
            },
            thousandBitSeparator(num){
                let reg = new RegExp("^[-+]?[0-9]+(\\.[0-9]+)?$"); //正负整数或小数
                if(reg.test(num)){
                    num = parseFloat(num);
                    return num!=0? num.toLocaleString(): "/";
                }else{
                    return num; //返回原值
                }
            }
        },
        watch:{
            tableObj:{
                handler(newVal, oldVal){
                    //console.log(newVal, oldVal);
                    this.tableArr = newVal.tableArr;
                }
            }
        }
	}
</script>

<style lang="scss" type="text/css">
    .tableItem{
        $tableBorderColor: #e6e6e6;
        $tableActiveColor: #ebf5f6; //表格高亮颜色

        //标题
        .title_bar{
            position: relative;

            h4{
                font-size: 18px;
                height: 20px;
                color: #606060;
                font-weight: normal; 
                margin-bottom: 8px;
            }
            .collapseBtn{
                display: block;
                position: absolute;
                right: 8px;
                top: 0px;
                font-size: 25px;
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
        }
        //切换按钮
        .rotate_icon{
            margin-left: 10px;
            &:hover{
                opacity: 0.8;
            }
        }
        .table_box{
            overflow: auto;
        }

        //表格
        table{
            width: 100%;
            background-color: #fff;
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid $tableBorderColor;

            th,td{
                position: relative;
                padding: 15px 15px;
                min-height: 20px;
                line-height: 20px;
                font-size: 14px;
                font-weight: normal;
                text-align: right;
                //border: 1px solid #ddd;
            }
            thead>tr{
                background-color: #fbfbfb; 
                border-bottom: 1px solid $tableBorderColor;
            }
            
            tbody>tr{
                border-bottom: 1px solid $tableBorderColor;

                &:nth-child(even){
                    background-color: #fbfbfb;
                }
                
                &:hover{
                    background-color: $tableActiveColor;
                }
                
                &.active{
                    background-color: $tableActiveColor;
                } 
            }

        }
    
    }
    
</style>