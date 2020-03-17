var baseParams = {
    title: "",
    xtitle: "",
    xunit: "",
    ytitle: "",
    yunit: "",
    vtitle: "",
    vunit: "",
    nunit: "",
    charttype: 101
};

var chartConfig = { //图表配置
    ifTitle: true, //标题
    titleFontSize: 20,
    labelFontSize: 16,
    axisFontSize: 13,
    axisTitleFontSize: 13, //坐标轴标题大小
    legendFontSize: 13,
    mapConfig: {
        dataRangeShow: false,
        rangeLowColor: "",
        rangeHighColor: ""
    }
};

var charttypeOptions = [ //图表类型字典表
    {name:'柱状图', options:[
        {name:'普通柱状图101', type: 101, disabled:false},
        {name:'柱状图+增长率102', type: 102, disabled:false},
        {name:'柱状图+折线图103', type: 103, disabled:true},
        {name:'普通柱状图（含平均值线）104', type: 104, disabled:false},
        {name:'柱状图百分比（相同x和为100%, 堆叠）105', type: 105, disabled:false},
        {name:'柱状图百分比（相同x和为100%）106', type: 106, disabled:false},
        {name:'柱状图百分比（相同name,即相同颜色和为100%）107', type: 107, disabled:false},
        {name:'柱状图百分比（相同name,即相同颜色和为100%）+增长率108', type: 108, disabled:true},
        {name:'柱状图+增长率（相同xdata之间的增长率）109', type: 109, disabled:true},
        {name:'普通柱状图堆叠110', type: 110, disabled:false},
        {name:'柱状图动态求和113', type: 113, disabled:false}
    ]},
    {name:'横向柱状图', options:[
        {name:'普通柱状图151', type: 151, disabled:false},
        {name:'普通柱状图（含平均值线）154', type: 154, disabled:false},
        {name:'柱状图百分比（相同x和为100%, 堆叠）155', type: 155, disabled:false},
        {name:'柱状图百分比（相同x和为100%）156', type: 156, disabled:true},
        {name:'柱状图百分比（相同name,即相同颜色和为100%）157', type: 157, disabled:true},
        {name:'普通柱状图堆叠160', type: 160, disabled:false},
        {name:'柱状图动态求和163', type: 163, disabled:false}
    ]},
    {name:'折线图', options:[
        {name:'普通折线图', type: 301, disabled:false},
        {name:'普通折线图（含平均值线）', type: 302, disabled:false}
    ]},
    {name:'散点图', options:[
        {name:'普通散点图', type: 401, disabled:false},
        {name:'相同颜色散点图', type: 402, disabled:false},
        {name:'普通散点图（自动求平均）', type: 403, disabled:false},
        {name:'散点图（分两组&双平均）', type: 404, disabled:true}
    ]},
    {name:'饼图', options:[
        {name:'普通饼图', type: 201, disabled:false},
        {name:'环形饼图', type: 202, disabled:false}
    ]},
    {name:'地图', options:[
        {name:'中国省份地图', type: 99, disabled:false}
    ]}
];

export {baseParams, chartConfig, charttypeOptions};