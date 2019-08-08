<!--月均人均绩效-->
<template>
    <div class="chart_item">
        <h3 class="chart_title">{{title}}</h3>
        <div class="chart_outer_box">
            <div :id="panelId" class="main_chart" style="width:100%;height:500px;"></div>
            <table-item :tableObj="tableObj" v-show="false"></table-item>
        </div>
    </div>
</template>

<script>
    import tableItem from '@/components/tableItem.vue'
    
    export default {
        name: "chartItem",
        props:{
            panelId: String,
            data: Object,
            config: Object
        },
        data() {
            return {
                title: "",
                baseData:{
                    "title": "",
                    "xunit": "",
                    "xtitle": "",
                    "yunit": "个",
                    "ytitle": "",
                    "vunit": "",
                    "vtitle": "",
                    "nunit": "",
                    "ntitle": "",
                    "charttype": 101,
                    "chartdata": []
                },
                baseConfig:{
                    ifTitle: true
                    // titleFontSize: 22,
                    // labelFontSize: 16, //label字体大小
                    // axisFontSize: 16, //坐标轴字体大小
                    // axisTitleFontSize: 16, //坐标轴标题大小
                    // legendFontSize: 16,
                },
                tableObj: {}
            }
        },
        computed:{
            f_config(){
                let config = this.config || {};
                return Object.assign(this.baseConfig, config);
            }
        },
        methods:{
            //获取报表数据(根据url调)
            makeChart(){
                this.$nextTick(() => {
                    this.title = Enumerable.from(this.chartdata).select(o=>o.y).toArray()[0];
                    let suCharts = new SuCharts(this.data, this.panelId, this.data.charttype);
                    let option = suCharts.setOption(this.f_config);
                    delete option.toolbox;

                    let echart = echarts.init(document.getElementById(this.panelId), "walden"); //初始化echarts实例
                    echart.clear(); //清空
                    echart.setOption(option);

                    //给tableObj附上数据
                    this.tableObj = this.makeTableObj(suCharts.chartObj); 
                });
            },
            //
            makeTableObj(tableData){
                //debugger;
                if(this.f_data.chartdata.length==0){
                    return {thead:[],tbody:[]};
                }

                let temp = new Table(tableData);
                let chartType = 101;
                let result = temp.make3DTable();
                return result;
            }
        },
        components:{
            tableItem
        },
        watch:{
            chartdata:{
                handler(newVal, oldVal){
                    //console.log(newVal, oldVal);
                    this.makeChart();
                }
            }
        }
	}
</script>

<style lang="scss" type="text/css">
    .chart_item{
        .chart_title{
            font-size: 16px;
            color: #2B3D59;
        }
    }
</style>

