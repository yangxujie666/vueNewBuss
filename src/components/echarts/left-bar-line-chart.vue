<template>
    <div class="chartcon" :id='leftbarlinechart'></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'leftBarLineChart',
    props:['leftbarlinechart','newRegisterEnterprise'],
    data(){
      return{
        xData:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月','9月','10月','11月','12月'],
        seriesData:{
          barData:[3000,4200, 5000, 5500, 6500, 6800, 6500, 7090, 6541, 5485, 4148, 3698],
          lineData:[ 13, 14, 18, 20, 23, 25,24, 28, 35, 54, 89, 65,]
        }
      }
    },
    mounted (){
      this.initBar(this.leftbarlinechart)
    },
    methods:{
      initBar(chartID) {
        let myChart = echarts.init(document.getElementById(chartID));
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer:{
              type:'shadow',
                z:0,
                shadowStyle: {
                    color:'#f8f8f8'
                }
            },
            position:function(point, params, dom, rect, size){
              return [point[0], '10%'];
            },
            confine:true,
            backgroundColor:'transparent',
            formatter: function(param){
              var html='';
              return html +='<div style="position:relative;padding:10px 13px;background:#fff;border:1px solid #d7e8fd;border-radius:5px;font-size:12px;color:#7a7a7a;line-height:26px;box-shadow:0 0 10px 0 rgba(6,115,242,.4);">'+
                '<p>2017年'+param[0].name+'新注册企业：</p>'+
                '<p><span style="font-size:16px;color:#fd7e23;font-weight:bold;">'+param[0].value+'</span>家<span style="font-size:16px;color:#fd7e23;margin-left:20px;font-weight:bold;">'+param[1].value+'%</span>增长率</p>'+

                '<i style="position:absolute;bottom:-23px;left:30px;width:0;height:0;border:12px solid transparent;border-top:11px solid #d7e8fd;"></i>'+
                '<i style="position:absolute;bottom:-20px;left:32px;width:0;height:0;border:10px solid transparent;border-top:10px solid #fff;"></i>'+
                '</div>'
            }
          },
          calculable: true,
          legend: {
            top:20,
            right:10,
            data: ['数量', '增长率'],
            textStyle: {
              color: "#000"
            }
          },
          xAxis: [{
            type: 'category',
            data: this.newRegisterEnterprise.xData,
            axisLine: {
              lineStyle: {
                color: "#ccc",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}',
              textStyle:{
                color:'#999'
              }
            },
            splitLine: {
              show: false,

            },
          }],
          yAxis: [
          {
            type: 'value',
            name: '数量',
            nameTextStyle: {
              color:'#999'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle:{
                color:'#999'
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
                width: 1
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(204,204,204,.22)',
                type : "solid"
              }
            },
            axisTick: {
              show: false
            },

          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              show: true,
              formatter: '{value}%',
              textStyle:{
                color:'#999'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
                width: 1
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,0,0,1)',
                type : "dashed"
              }
            }

          }],
          grid: {
            x: '60',
            x2: '60',
            y: '80',
            y2: '85'
          },
          series: [
          {
            name: '数量',
            type: 'bar',
            barWidth:14,
            itemStyle:{
              normal:{
                color:new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#72d2fd'},
                    {offset: 1, color: '#80a9f9'}
                  ]
                )
              }
            },
            data: this.newRegisterEnterprise.seriesData.barData
          },
          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            symbolSize:5,
            lineStyle:{
              normal:{
                color:'#ea504a'
              }
            },
            itemStyle:{
              normal:{
                borderColor:'#fc4528',
                borderWidth:3
              }
            },
            data: this.newRegisterEnterprise.seriesData.lineData
          }]
        });
      }
    },
    watch:{
      pieoptionlist(){
        this.initBar(this.leftbarlinechart)
      }
    }
  }
</script>

<style scoped>
    .chartcon{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>