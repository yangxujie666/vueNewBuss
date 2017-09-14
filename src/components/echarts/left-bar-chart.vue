<template>
    <div class="chartcon" :id='leftbarchart'></div>
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
    name: 'leftBarChart',
    props:['leftbarchart','trade'],
    data(){
      return{

      }
    },
    mounted (){
      this.initBar(this.leftbarchart)
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
                '<p>'+param[0].name+':</p>'+
                '<p>新注册企业数量<span style="font-size:16px;color:#fd7e23;font-weight:bold;">'+param[0].value+'</span>家</p>'+
                '<i style="position:absolute;bottom:-23px;left:30px;width:0;height:0;border:12px solid transparent;border-top:11px solid #d7e8fd;"></i>'+
                '<i style="position:absolute;bottom:-20px;left:32px;width:0;height:0;border:10px solid transparent;border-top:10px solid #fff;"></i>'+
                '</div>'
            }
          },
          calculable: true,
          legend: {
            show:false
          },
          xAxis: [{
            type: 'category',
            data: this.trade.xData,
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
              interval:0,
              rotate:45,
              textStyle:{
                color:'#999'
              },
              formatter:function (value, index){
                var xLabel='';
                return xLabel = value.substring(0,4)+'...'
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

          }
          ],
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
            barWidth:20,
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
            data: this.trade.seriesData
          }]
        });
      }
    },
    watch:{
      pieoptionlist(){
        this.initBar(this.leftbarchart)
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