<template>
    <div class="echarts-wrapper">
        <div class="economic-status">经济活跃</div>
        <div class="echarts-img"></div>
        <div class="text">
            <p class="lively">活跃</p>
            <p class="downturn">低迷</p>
            <p class="livelyer">非常活跃</p>
        </div>
        <div :id="gauge">

        </div>
    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/gauge')

    export default {
        name: 'gauge',
        props:['gauge','gaugeData'],
        data(){
            return {
            }
        },
        mounted (){
      /*      console.log(this.gaugeData)
            this.initGauge(this.gauge)*/
        },
        methods:{
            initGauge(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    backgroundColor:"transparent",
                    tooltip : {
                        show:false
                    },
                    series: [
                        {
                            name: '',
                            type: 'gauge',
                            radius: '75%',
                            startAngle:210,
                            endAngle: -30,
                            pointer: {
                                length: '90%',
                                width: 6
                            },
                            itemStyle:{
                                normal:{
                                    color:'#fff'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 4, //柱子的宽度
                                    color: [[0, "#fff"], [1, "#fff"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
                                }
                            },
                            splitLine:{
                                show:false
                            },
                            axisTick:{
                                show:false
                            },
                            axisLabel:{
                                show:false
                            },
                            detail: {
                                show:false,
                                formatter:'{value}%'

                            },
                            data: this.gaugeData
                        }
                    ]
                })

            }
        },
        watch:{
            gaugeData(){
                this.initGauge(this.gauge)
            }
        }
    }
</script>

<style scoped>
    .economic-status{
        position: absolute;
        width: 100px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        top: 20px;
        left: 50%;
        margin-left: -50px;
    }
    .text>p{
        position: absolute;
        font-size: 14px;
        z-index: 1;
    }
    .text>p.lively{
        top:86px;
        left: 114px;
        color:#ffaf30;
    }
    .text>p.downturn{
        top:160px;
        left: 70px;
        color: #45b0e9;
    }
    .text>p.livelyer{
        top:160px;
        left: 140px;
        color: #ff6630;
    }
    .echarts-img{
        position: absolute;
        width: 100%;
        height: 218px;
        background: url(../../../static/img/gua.png) no-repeat center;
        z-index: 0
    }
    #gauge{
        height:170px;
        width:250px;
        position: absolute;
        top:41px;
        left: 3px;
    }
    .echarts-wrapper{
        position: relative;
        height:218px;
        width:100%;
        background: #fff;
    }
</style>