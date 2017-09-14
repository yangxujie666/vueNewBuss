<template>
    <div class="echarts-box" :id="chartId"></div>
</template>
<script>
    import echarts from 'echarts'

    export default {

        name: 'industryHeat',
        props:['chartId','lineData'],
        data () {
            return {}
        },
        mounted (){
           this.lineChart(this.chartId)
        },
        methods: {
            lineChart(chartID) {
                let  myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                color: '#ffc39b',
                                width:3
                            }
                        },
                        formatter: function(params) {
                          var html='';
                          return html +='<div style="position:relative;padding:10px 13px;background:#fff;border:1px solid #d7e8fd;border-radius:5px;font-size:12px;color:#7a7a7a;line-height:26px;box-shadow:0 0 10px 0 rgba(6,115,242,.4);">'+
                            '<p>'+params[0].seriesName+'：<span style="font-size:16px;color:#fd7e23;font-weight:bold;">'+params[0].value+'</span></p>'+
                            '<p>日期：<span style="font-size:16px;color:#fd7e23;font-weight:bold;">'+params[0].axisValue+'</span></p>'+
                            '</div>'
                            return params[0].seriesName + ": <span style='color:#fd7e23;font-size:14px;'>" + params[0].value + "</span>" + "<br>日期: <span style='color:#fd7e23;font-size:14px;'>" + params[0].axisValue + "</span>" + "<br>";
                        },
                        textStyle: {
                            align: 'left',
                            color: '#8a8b8c',
                            fontSize: '12'
                        },
                        backgroundColor: '#fff',
                        borderWidth: '1',
                        borderColor: '#5694d0',
                        extraCssText: 'box-shadow: 0 0 15px rgba(70, 150, 241, 0.7);'
                    },
                    backgroundColor:'#fff',
                    grid:{
                        top:40,
                        bottom:40,
                        left:60,
                        right:40,
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,//折线距离y轴有无距离
                        axisLabel: {
                            interval:0,
                            textStyle: {
                                fontSize: 12,
                                color: "#666666",
                                fontFamily: "微软雅黑"
                            },
                            margin: 10
                        },
                        axisTick: {
                            show:false,
                            length: 4,
                            lineStyle: {
                                color: "#404E79",
                                width: 2,
                                opacity: 0.5
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#35518f",
                                type: "solid",
                                opacity:0.2
                            }
                        },
                        data : this.lineData.xData
                    },
                    yAxis: {
                        type: 'value',
                        name:'舆情指数',
                        nameTextStyle:{
                            color:'#666666'
                        },
                        min: 0,
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14,
                                color: "#666666",
                                fontFamily: "微软雅黑"
                            },
                            formatter:'{value}',
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#dae9fd', //分割线颜色
                                type: "solid",
                                opacity:0.7
                            }
                        }
                    },
                    lineStyle:{
                        normal:{
                            color:'#6495f7'
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#00daff',
                            borderWidth:'2'
                        }
                    },

                    series : [
                        {
                            name:'舆情指数',
                            type:'line',
                            smooth:true,
                            itemStyle:{
                                normal:{
                                    symbolSize: 0
                                },
                                emphasis: {
                                    color:'#ff6905',
                                    borderColor:'#feffff',
                                    symbolSize: 10
                                }
                            },
                            lineStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#2897f7'
                                    }, {
                                        offset: 1,
                                        color: '#2abafe'
                                    }]),
                                }
                            },
                            areaStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#cbe5fe'
                                    },
                                        {
                                            offset: 1,
                                            color: '#cce1fd'
                                        }]),
                                    opacity:0.6

                                }
                            },
                            data:this.lineData.seriesData,
                            symbol:'circle'
                        }

                    ]
                });
            }
        },
        watch:{
            lineData(){
                this.lineChart(this.chartId)
            }
        }
    }
</script>
<style scoped>
    .echarts-box{
        width: 100%;
        height:100%;
    }
    .echarts-box>div:nth-child(1){
        width: 100%;
        height:100%;
    }
</style>