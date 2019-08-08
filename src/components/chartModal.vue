<!--月均人均绩效-->
<template>
    <div class="chart_modal" v-show="dgVisible" @click="dgVisible=false">
        <div class="chart_panel center" :style="{'width':panelWidth+'px', 'height':panelHeight+'px'}" id="chart" ref="chart"
            @click.stop="">
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";
    import 'echarts/theme/dark'
    import 'echarts/theme/infographic'
    import 'echarts/theme/macarons'
    import 'echarts/theme/roma'
    import 'echarts/theme/shine'
    import 'echarts/theme/vintage'

    export default {
        name: "chartModal",
        props:{
            data: Object,
            config: Object,
            theme: String,
            panelWidth: Number,
            panelHeight: Number,
            visible: Boolean
        },
        data() {
            return {
                dgVisible: false,
            }
        },
        computed:{
            f_config(){
                let config = this.config || {};
                return Object.assign(this.baseConfig, config);
            }
        },
        mounted(){
            this.dgVisible = this.visible;
        },
        methods:{
            makeChart(){
                //绘图
                let suCharts = new SuCharts(this.data, "chart", this.data.charttype, this.theme);
                let option = suCharts.setOption(this.config);
                //delete option.toolbox;

                this.echart = echarts.init(document.getElementById("chart"), this.theme); //初始化echarts实例
                this.echart.clear(); //清空
                this.echart.resize(); //重新自适应
                this.echart.setOption(option);
            }
        },
        watch:{
            visible:{
                handler(newVal, oldVal){
                    this.dgVisible = newVal;
                    if(newVal==true){
                        this.$nextTick(()=>{
                            this.makeChart();
                        })
                    }
                }
            },
            dgVisible:{
                handler(newVal, oldVal){
                    this.$emit('update:visible', newVal); //向父级返回值
                }
            }
        }
	}
</script>

<style lang="scss" type="text/css">
    .chart_modal{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        bottom: 0;
        z-index: 999;

        .chart_panel{
            display: inline-block;
            background-color: #fff;
            border: 1px solid #ededed;
        }
    }
</style>

