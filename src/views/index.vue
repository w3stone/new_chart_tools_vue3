<template>
    <div class="chart_tool_page">
        <div class="inner">
            <h2 class="main_title">图表工具</h2>
            <el-form ref="form" :model="form" label-width="180px" class="form_item_list">
                <h3 class="sub_title"><i class="el-icon-set-up title_icon"></i>主要配置</h3>
                <div class="form_group clearfix">
                    <el-form-item label="图表标题：" prop="title" class="form_item left">
                        <el-input v-model="form.title" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="x轴标题：" prop="xtitle" class="form_item left">
                        <el-input v-model="form.xtitle" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="x轴单位：" prop="xunit" class="form_item left">
                        <el-input v-model="form.xunit" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="y轴标题：" prop="ytitle" class="form_item left">
                        <el-input v-model="form.ytitle" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="y轴单位：" prop="yunit" class="form_item left">
                        <el-input v-model="form.yunit" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="value标题：" prop="vunit" class="form_item left">
                        <el-input v-model="form.vtitle" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="value单位：" prop="vunit" class="form_item left">
                        <el-input v-model="form.vunit" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="name单位：" prop="nunit" class="form_item left">
                        <el-input v-model="form.nunit" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="图表模板id：" prop="charttype" class="form_item left">
                        <el-select v-model="form.charttype" placeholder="请选择">
                            <el-option-group v-for="(group,index) in charttypeOptions" :key="index" :label="group.name">
                                <el-option v-for="(item,indexc) in group.options" :key="indexc"
                                    :label="item.name" :value="item.type" :disabled="item.disabled">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label="图表数据：" prop="hotData" class="form_item">
                    <div class="form_hottable" :style="{overflowX:needOverflow?'auto':'initial'}">
                        <hot-table :data="hotData" :settings="hotSettings" :language="language" ref="hotTable"></hot-table>
                    </div>
                </el-form-item>

                <h3 class="sub_title">
                    <i class="el-icon-mouse title_icon"></i>其它配置
                    <i class="el-icon-arrow-up collapse_btn" @click="toggleShow" :class="{hover:configShowing, unhover:!configShowing}"></i>
                </h3>
                <transition name="slide-fade">
                    <div class="form_group clearfix" v-show="configShowing">
                        <el-form-item label="图表宽度：" prop="panelWidth" class="form_item left">
                            <el-input-number v-model="panelWidth" controls-position="right" :min="100" :max="1920"></el-input-number>
                        </el-form-item>

                        <el-form-item label="图表高度：" prop="panelHeight" class="form_item left">
                            <el-input-number v-model="panelHeight" controls-position="right" :min="100" :max="1080"></el-input-number>
                        </el-form-item>

                        <el-form-item label="图表主题：" prop="chartTheme" class="form_item left">
                            <el-select v-model="chartTheme" placeholder="请选择" disabled>
                                <el-option v-for="(val,index) in themeOptions" :key="index"
                                    :label="val" :value="val">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="标题字体大小：" prop="titleFontSize" class="form_item left">
                            <el-input-number v-model="chartConfig.titleFontSize" controls-position="right" :min="12" :max="36"></el-input-number>
                        </el-form-item>

                        <el-form-item label="图形上文本字体大小：" prop="labelFontSize" class="form_item left">
                            <el-input-number v-model="chartConfig.labelFontSize" controls-position="right" :min="12" :max="36"></el-input-number>
                        </el-form-item>

                        <el-form-item label="坐标轴刻度字体大小：" prop="axisFontSize" class="form_item left">
                            <el-input-number v-model="chartConfig.axisFontSize" controls-position="right" :min="12" :max="36"></el-input-number>
                        </el-form-item>

                        <el-form-item label="坐标轴标题字体大小：" prop="axisTitleFontSize" class="form_item left">
                            <el-input-number v-model="chartConfig.axisTitleFontSize" controls-position="right" :min="12" :max="36"></el-input-number>
                        </el-form-item>

                        <el-form-item label="滚动图例字体大小：" prop="legendFontSize" class="form_item left">
                            <el-input-number v-model="chartConfig.legendFontSize" controls-position="right" :min="12" :max="36"></el-input-number>
                        </el-form-item>

                        <el-form-item label="地图颜色：" prop="rangeLowColor" class="form_item left">
                            <el-input v-model="chartConfig.mapConfig.rangeLowColor" controls-position="right" placeholder="请输入"
                                @change="mapColorChanged">
                            </el-input>
                        </el-form-item>
                    </div>
                </transition>
            </el-form>

            <el-button type="primary" class="button_fixed" @click="getChart()">获取图表</el-button>
        </div>

        <!-- <el-dialog title="图表展现" :width="panelWidth+60" :visible.sync="chartDgVisible">
            <div class="chart_panel" :style="{'width':panelWidth+'px', 'height':panelHeight+'px'}" id="chart" ref="chart"></div>
        </el-dialog> -->

        <div class="main_chart" style="padding:10px 80px">
            <h3 class="sub_title"><i class="el-icon-data-analysis title_icon"></i>图表展现</h3>
            <div class="chart_panel" :style="{'width':panelWidth+'px', 'height':panelHeight+'px'}"
                id="chart" ref="chart">
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import {HotTable} from '@handsontable/vue';
    import Handsontable from 'handsontable';
    import 'handsontable/languages/zh-CN';
import { setTimeout } from 'timers';
	
	export default {
        name: "home",
        data (){
            return{
                rows: 10, //默认行数
                cols: 20, //默认列数
                //主要配置
                form:{
                    title: "",
                    xtitle: "",
                    xunit: "",
                    ytitle: "",
                    yunit: "",
                    vtitle: "",
                    vunit: "",
                    nunit: "",
                    charttype: 101
                },
                chartConfig:{ //图表配置
                    ifTitle: true, //标题
                    titleFontSize: 18,
                    labelFontSize: 16,
                    axisFontSize: 13,
                    axisTitleFontSize: 13, //坐标轴标题大小
                    legendFontSize: 13,
                    mapConfig: {
                        dataRangeShow: false,
                        rangeLowColor: "",
                        rangeHighColor: ""
                    }
                },
                needOverflow: false,
                language: 'zh-CN', //表格控件语言
                hotData: [], //表格数据
                hotSettings: {
                    colHeaders: [],//自定义列表头or 布尔值
                    rowHeaders: false,
                    currentRowClassName: 'currentRow', //为选中行添加类名，可以更改样式
                    currentColClassName: 'currentCol', //为选中列添加类名
                    autoWrapRow: true, //自动换行
                    contextMenu: {
                        items: {
                            'row_above': {},
                            'row_below': {},
                            'hsep1': '---------',
                            'col_left': {},
                            'col_right': {},
                            'hsep2': '---------',
                            'remove_row': {},
                            'remove_col': {},
                            'hsep3': '---------',
                            'clear_custom': {
                                name: '清空所有',
                                callback: function() {
                                    this.clear();
                                }
                            }
                        }
                    },
                    afterChange: (changes, source) => {
                        //console.log(changes, source);
                        this.$nextTick(()=>{
                            let dom = this.$refs.hotTable.$el;
                            let ownWidth = dom.clientWidth;
                            //console.log(dom.children);
                            let childrenDom = dom.children[1]; //取ht_clone_top.handsontable
                            let childrenWidth = childrenDom.clientWidth;
                            //判断
                            if(childrenWidth>ownWidth) this.needOverflow=true;
                        });
                    }
                },
                panelWidth: 1100,
                panelHeight: 480,
                chartTheme: "macarons", //图表主题
                themeOptions: ["macarons", "walden"],
                charttypeOptions:[
                    {name:'柱状图', options:[
                        {name:'普通柱状图', type: 101, disabled:false},
                        {name:'柱状图+增长率', type: 102, disabled:false},
                        {name:'柱状图+折线图', type: 103, disabled:true},
                        {name:'柱状图普通（含平均值线）', type: 104, disabled:false},
                        {name:'柱状图百分比（相同x和为100%, 堆叠）', type: 105, disabled:false},
                        {name:'柱状图百分比（相同x和为100%）', type: 106, disabled:false},
                        {name:'柱状图百分比（相同name,即相同颜色和为100%）', type: 107, disabled:false},
                        {name:'柱状图百分比（相同name,即相同颜色和为100%）+增长率', type: 108, disabled:true},
                        {name:'柱状图+增长率', type: 109, disabled:true},
                        {name:'普通柱状图堆叠', type: 110, disabled:false},
                        {name:'柱状图动态求和', type: 113, disabled:false}
                    ]},
                    {name:'散点图', options:[
                        {name:'普通散点图', type: 401, disabled:false},
                        {name:'相同颜色散点图', type: 402, disabled:false},
                        {name:'普通散点图(自动求平均)', type: 403, disabled:false},
                        {name:'散点图(分两组&双平均)', type: 404, disabled:true}
                    ]},
                    {name:'饼图', options:[
                        {name:'普通饼图', type: 201, disabled:false},
                        {name:'环形饼图', type: 202, disabled:false}
                    ]},
                    {name:'地图', options:[
                        {name:'中国省份地图', type: 99, disabled:false}
                    ]}
                ],
                echart: null, //echart对象
                configShowing: false, //其它配置项显示状态
                chartDgVisible: false, //图表弹框显示状态
            }
        },
        mounted(){
            this.hotData = this.initData();
        },
        methods:{
            initData(){ //初始化表格
                let outer = [];
                for(var i=0; i<this.rows; i++){
                    let inner = [];
                    for(var j=0; j<this.cols; j++){
                        inner.push("");
                    }
                    outer.push(inner);
                }
                return outer;
            },
            make3D_data(arr){ //拼接柱状图json
                let jsonList = [];
                for (var i=1; i<=arr[0].length && arr[0][i]!=""; i++){ //行循环
                    for(var j=1; j<=arr.length && arr[j][0]!=""; j++){ //列循环
                        jsonList.push({ "x":arr[0][i], "y":arr[j][0], "value":this.$string2Num(arr[j][i]) });
                    }
                }
                return jsonList;
            },
            make4D_data(arr){ //拼接散点图json
                let jsonList = [];
                for(var i=0; i<=arr.length && arr[i][0]!=""; i++){ //列循环
                    jsonList.push({
                        "name": arr[i][0], 
                        "x": this.$string2Num(arr[i][1]), 
                        "y": this.$string2Num(arr[i][2]), 
                        "value": this.$string2Num(arr[i][3])
                    });
                }
                return jsonList;
            },
            make2D_data(arr){ //拼接饼图、地图json
                let jsonList = [];
                for(var i=0; i<=arr.length && arr[i][0]!=""; i++){ //列循环
                    jsonList.push( {"name":arr[i][0], "value":this.$string2Num(arr[i][1])} );
                }
                return jsonList;
            },
            //获取图表
            getChart(){
                //拼接chartdata;
                this.form.chartdata = this.chartScheme();

                //绘图
                let suCharts = new SuCharts(this.form, "chart", this.form.charttype, this.chartTheme);
                let option = suCharts.setOption(this.chartConfig);
                //delete option.toolbox;

                this.echart = echarts.init(document.getElementById("chart"), this.chartTheme); //初始化echarts实例
                this.echart.clear(); //清空
                this.echart.resize(); //重新自适应
                this.echart.setOption(option);

            },
            toggleShow(){
                this.configShowing = !this.configShowing;
            },
            //图表类型分组
            chartScheme(){
                try {
                    let charttype = this.form.charttype;
                    let result = [];
                    if(charttype>100 && charttype<=199){
                        result = this.make3D_data(this.hotData);

                    }else if(charttype>400 && charttype<=499){
                        result = this.make4D_data(this.hotData);

                    }else if((charttype>200 && charttype<=299) || charttype==99){
                        result = this.make2D_data(this.hotData);
                    }
                    return result;

                } catch (error) {
                    console.log(error);
                    this.$message({message:'数据格式错误！', type:'error'});
                    return false;  
                }
            },
            //地图颜色自动赋值
            mapColorChanged(value){
                this.chartConfig.mapConfig.rangeHighColor = value;
            }
        },
		components:{
			HotTable
        }
	}
	
</script>

<style lang="scss" type="text/css">
    .chart_tool_page{
        .inner{
            width: 1400px;
            margin: 0 auto;
        }
        //hotTable样式覆盖
        #hot-display-license-info{
            line-height: 20px;
        }
        .handsontable{
            .wtHolder{
                height: auto !important;
            }
        }

        //标题
        .main_title{
            text-align: center;
            font-size: 24px;
            color: #2B3D59;
            padding: 20px 0;
        }
        //副标题
        .sub_title{
            font-weight: normal;
            text-align: center;
            padding: 20px 0;
            .title_icon{
                margin-right: 4px;
            }
        }
        //表单
        .form_group{
            width: 100%;
            .form_item{
                width: 33.33%;
                height: 40px;
            }
        }
        //图表
        .main_chart{
            text-align: center;
            .chart_panel{
                display: inline-block;
                border: 1px solid #ededed;
            }
        }
        .button_fixed{
            position: fixed;
            top: 20px;
            right: 30px;
        }

        //element样式覆盖
        .el-switch__label.is-active {
            color: $activeColor !important;
        }
        .el-switch.is-checked .el-switch__core {
            border-color: $activeColor !important;
            background-color: $activeColor !important;
        }
        .el-radio-button__orig-radio:checked+.el-radio-button__inner{
            border-color: $activeColor !important;
            background-color: $activeColor !important;
        }
    }
</style>
