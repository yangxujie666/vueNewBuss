<template>
    <div class="chartcon" :id='piechartaverage'></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'pieChartAverage',
    props:['piechartaverage','newRegisterGrowthRate'],
    data(){
      return{
        text: '全国平均值',
        value: 14.9
      }
    },
    mounted (){
      this.initLine(this.piechartaverage)
    },
    methods:{
      initLine(chartID) {
        var _this = this;
        let myChart = echarts.init(document.getElementById(chartID));
        myChart.setOption({
          title: {
            text:_this.text,
            left:'center',
            bottom: 20,
            textStyle:{
              fontSize: 14,
              color: '#666',
              fontWeight:'normal'
            }
          },
          tooltip:{
            show:false
          },
          color:['#e7f1ff'],
          series: [
            {
              name:'',
              type:'pie',
              radius: [37, 43],
              center:['50%','40%'],
              hoverAnimation:false,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:this.newRegisterGrowthRate.averagee, name:_this.text,itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#fd9645'},
                      {offset: 1, color: '#f98d3a'}
                    ]
                  )
                },
                  emphasis:{
                    show:false
                  }
                }},
                {value:100-this.newRegisterGrowthRate.averagee,name:'11',itemStyle:{normal:{show:false},emphasis:{show:false,color:'#e7f1ff'}}}
              ]
            },
            {
              name:'',
              type:'pie',
              radius:[30,31],
              center:['50%','40%'],
              itemStyle:{
                normal:{
                  color:'#fd923c'
                }
              },
              tooltip: {
                show: false
              },
              hoverAnimation:false,
              legendHoverLink:false,
              label: {
                show:false,
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              lableLine: {
                show: false,
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data:[
                {value:'0'}
              ]
            }
          ]
        });
      }
    },
    watch:{
      pieoptionlist(){
        this.initLine(this.piechartaverage)
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