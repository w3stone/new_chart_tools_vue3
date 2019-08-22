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

                <el-form-item label="图表数据：" prop="" class="form_item form_chartdata">
                    <el-radio-group v-model="chartdataType" class="form_radio" @change="chartdataTypeChanged">
                        <el-radio-button :label="1">表格</el-radio-button>
                        <el-radio-button :label="2">JSON</el-radio-button>
                        <el-radio-button :label="3">echarts配置</el-radio-button>
                    </el-radio-group>

                    <div class="form_hottable" :style="{overflowX:needOverflow?'auto':'initial'}" v-show="chartdataType==1">
                        <hot-table :data="hotData" :settings="hotSettings" :language="language" ref="hotTable"></hot-table>
                    </div>

                    <div class="form_chart_json" v-show="chartdataType!=1">
                        <el-input type="textarea" v-model="jsonData" :rows="rows"></el-input>
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
                            <el-select v-model="chartTheme" placeholder="请选择">
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

        <!--图表弹框-->
        <chart-modal :panelWidth="panelWidth" :panelHeight="panelHeight" :visible.sync="chartDgVisible"
            :data="form" :option="option" :config="chartConfig" :theme="chartTheme">
        </chart-modal>

    </div>
</template>

<script>
    import {HotTable} from '@handsontable/vue';
    import Handsontable from 'handsontable';
    import 'handsontable/languages/zh-CN';
    import chartModal from '@/components/chartModal';
    import {baseParams, chartConfig, charttypeOptions} from '@/assets/scripts/file.js';
	
	export default {
        name: "home",
        data (){
            return{
                rows: 10, //默认行数
                cols: 20, //默认列数
                form: {}, //主要配置
                chartConfig: {}, //图表参数配置
                option: {}, //配置
                needOverflow: false,
                language: 'zh-CN', //表格控件语言
                hotData: [], //表格数据
                jsonData: "", //json数据
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
                themeOptions: ["macarons", "infographic", "roma", "shine", "vintage"],
                charttypeOptions: [],
                chartdataType: 1,
                echart: null, //echart对象
                configShowing: false, //其它配置项显示状态
                chartDgVisible: false, //图表弹框显示状态
            }
        },
        created(){
            this.charttypeOptions = charttypeOptions;
            this.form = baseParams;
            this.chartConfig = chartConfig;
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
            //获取图表
            getChart(){
                //拼接chartdata;
                let result = false;
                if(1==this.chartdataType){
                    result = this.chartScheme();

                }else if(2==this.chartdataType){
                    result = this.analyzeJson();

                }else if(3==this.chartdataType){
                    result = this.analyzeOption();
                }
                if(!result) return false;

                this.chartDgVisible = true;
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
            analyzeJson(){ //解析json
                let errorAlert = ()=>{
                    this.$message({message:'数据格式错误！', type:'error'});
                    return false;
                };
                let checkList = (list)=>{
                    return (list.length>0 && typeof list[0]!="undefined")? true: false;
                };
                let checkChartdata = (chartdata, callback)=>{
                    let xdata = Enumerable.from(chartdata).select(o=>o.x).distinct().toArray();
                    let ydata = Enumerable.from(chartdata).select(o=>o.y).distinct().toArray();
                    let valuedata = Enumerable.from(chartdata).select(o=>o.value).distinct().toArray();
                    let namedata = Enumerable.from(chartdata).select(o=>o.name).distinct().toArray();

                    if( checkList(xdata) && checkList(xdata) && checkList(valuedata) && checkList(namedata) ){
                        if(callback) callback();
                    }else{
                        return errorAlert();
                    }
                    return true;
                };

                try {
                    let json = JSON.parse(this.jsonData);
                    let chartdata = [];
                    if(json.hasOwnProperty("chartdata")){
                        chartdata = json.chartdata;
                        return checkChartdata(chartdata, ()=>{
                            this.form = json;
                        });

                    }else if(Array.isArray(json)){ //如果是数组
                        chartdata = json;
                        return checkChartdata(chartdata, ()=>{
                            this.form.chartdata = json;
                        });

                    }else{
                        return errorAlert();
                    }

                } catch (error) {
                    console.log(error);
                    return errorAlert();  
                }
            },
            analyzeOption(){ //解析option
                let errorAlert = ()=>{
                    this.$message({message:'数据格式错误！', type:'error'});
                    return false;
                };

                try {
                    let obj = JSON.parse(this.jsonData);
                    if(!obj.hasOwnProperty("series")){
                        return errorAlert();
                    }else{
                        this.option = obj;
                        return true;
                    }

                } catch (error) {
                    console.log(error);
                    return errorAlert();
                }
            },
            //图表类型分组
            chartScheme(){
                try {
                    let charttype = this.form.charttype;
                    let result = [];
                    if((charttype>100 && charttype<=199) || (charttype>300 && charttype<=399)){
                        result = this.make3D_data(this.hotData);

                    }else if(charttype>400 && charttype<=499){
                        result = this.make4D_data(this.hotData);

                    }else if((charttype>200 && charttype<=299) || charttype==99){
                        result = this.make2D_data(this.hotData);
                    }
                    this.form.chartdata = result;
                    return true;

                } catch (error) {
                    console.log(error);
                    this.$message({message:'数据格式错误！', type:'error'});
                    return false;  
                }
            },
            //地图颜色自动赋值
            mapColorChanged(value){
                this.chartConfig.mapConfig.rangeHighColor = value;
            },
            toggleShow(){
                this.configShowing = !this.configShowing;
            },
            chartdataTypeChanged(value){
                if(value!=1) this.jsonData = "";
            }
        },
		components:{
			HotTable, chartModal
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
        .form_chartdata{
            .form_radio{
                margin-bottom: 20px;
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
        //提交按钮
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
