<template>
    <div class="echarts" :id='barChart'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/bar')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/legend')
    export default {
        name: 'industrialStructureBar',
        props:['barChart','barChartData'],
        data(){
            return{

            }
        },
        mounted (){
//            this.initBar(this.barChart)
        },
        methods:{
            initBar(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                let seriesData = null
                let xAxisData = null
                if(this.barChartData.length>1){
                    seriesData = [
                        {
                            name: this.barChartData[0].name,
                            type: 'bar',
                            barWidth:16,
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                        offset: 0,
                                        color: '#6687f4'
                                    }, {
                                        offset: 1,
                                        color: '#61b1fc'
                                    }]),
                                    borderColor:'#fff',
                                    borderWidth:2
                                },
                                emphasis:{
                                    borderColor:'#4e74ec',
                                    borderWidth:1
                                }
                            },
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    offset:[0,-20],
                                    textStyle:{
                                        color:'#333333',
                                        fontSize:14
                                    },
                                    formatter:'{a}'
                                }
                            },
                            data: [{
                                name:this.barChartData[0].addRate,
                                value:parseInt(this.barChartData[0].value)
                            }]
                        },
                        {
                            name: this.barChartData[1].name,
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'bottom',
                                    offset:[0,20],
                                    textStyle:{
                                        color:'#333333',
                                        fontSize:14
                                    },
                                    formatter:'{a}'
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                        offset: 0,
                                        color: '#80a9f9'
                                    }, {
                                        offset: 1,
                                        color: '#72d2fd'
                                    }]),
                                    borderColor:'#fff',
                                    borderWidth:3
                                },
                                emphasis:{
                                    borderColor:'#5f93f3',
                                    borderWidth:1
                                }
                            },

                            data: [{
                                name:this.barChartData[1].addRate,
                                value:parseInt(this.barChartData[1].value)
                            }]
                        },
                        {
                            name:this.barChartData[2].name,
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    offset:[0,-20],
                                    textStyle:{
                                        color:'#333333',
                                        fontSize:14
                                    },
                                    formatter:'{a}'
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                        offset: 0,
                                        color: '#fba866'
                                    }, {
                                        offset: 1,
                                        color: '#f98d3a'
                                    }]),

                                    borderColor:'#fff',
                                    borderWidth:3
                                },
                                emphasis:{
                                    borderColor:'#f1752b',
                                    borderWidth:1
                                }
                            },

                            data: [{
                                name:this.barChartData[2].addRate,
                                value:parseInt(this.barChartData[2].value)
                            }]
                        }
                    ]
                    xAxisData = [this.barChartData[0].addRate,this.barChartData[1].addRate,this.barChartData[2].addRate]

                }else{
                    xAxisData = [this.barChartData[0].addRate]
                    seriesData = [
                        {
                            name:this.barChartData[0].name,
                            type: 'bar',
                            stack: '总量',
                            barWidth:30,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    offset:[0,-20],
                                    textStyle:{
                                        color:'#333333',
                                        fontSize:14
                                    },
                                    formatter:'{a}'
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                        offset: 0,
                                        color: '#fba866'
                                    }, {
                                        offset: 1,
                                        color: '#f98d3a'
                                    }]),

                                    borderColor:'#fff',
                                    borderWidth:3
                                },
                                emphasis:{
                                    borderColor:'#f1752b',
                                    borderWidth:1
                                }
                            },

                            data: [{
                                name:this.barChartData[0].addRate,
                                value:parseInt(this.barChartData[0].value)
                            }]
                        }
                    ]
                }
                myChart.setOption({
                    tooltip : {
                        trigger: 'item',
                        position:function(p){ //其中p为当前鼠标的位置
                            if(p[0]>400){
                                return [p[0]-150, p[1]+5];
                            }
                             return [p[0] + 10, p[1]+5];
                        },
                        formatter:function(param){
                            var html='';
                            console.log(param.name[0])
                            if(param.name[0] != "-"){
                                return html +='<div class="mask" style="position:absolute;padding:10px 13px;background:#fff;border:1px solid #d7e8fd;border-radius:5px;font-size:12px;color:#7a7a7a;line-height:20px;box-shadow:0 0 10px 0 rgba(6,115,242,.4);">'+
                                    '<p style="font-size:12px;color:#666;line-height: 20px;">'+param.seriesName+'结构占比：</p>'+
                                    '<p style="font-size:24px;color:#fd7e23;line-height: 36px;font-weight: bold">'+param.value+'%</p>'+
                                    '<p><span style="font-size:14px;color:#444444;">同比增长</span><span style="font-size:16px;color:#fd7e23;margin-left:5px;">'+param.name+'</span><i class="aaa" ></i></p>'+
                                    '</div>'
                            }else{
                                return html +='<div class="mask" style="position:absolute;padding:10px 13px;background:#fff;border:1px solid #d7e8fd;border-radius:5px;font-size:12px;color:#7a7a7a;line-height:20px;box-shadow:0 0 10px 0 rgba(6,115,242,.4);">'+
                                    '<p style="font-size:12px;color:#666;line-height: 20px;">'+param.seriesName+'结构占比：</p>'+
                                    '<p style="font-size:24px;color:#fd7e23;line-height: 36px;font-weight: bold">'+param.value+'%</p>'+
                                    '<p><span style="font-size:14px;color:#444444;">同比减少</span><span style="font-size:16px;color:#68c345;margin-left:5px;">'+(-parseInt(param.name) )+'</span><i class="bbb" ></i></p>'+
                                    '</div>'
                            }

                        }
                    },
                    xAxis:  {
                        type: 'value',
                        show:false,
                        data:xAxisData
                    },
                    yAxis: {
                        type: 'category',
                        show:false
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        top:'1%'
                    },
                    series: seriesData
                });
            }
        },
        watch:{
            barChartData(){
                this.initBar(this.barChart)
            }
        }
    }
</script>

<style scoped>
    .echarts{
        width: 100%;
        height: 95%;
    }
    .echarts canvas{
        width: 100%;
        height:100%;
    }
</style>