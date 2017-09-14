<template>
    <div class="chartcon" :id='piechartmax'></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'pieChartMax',
    props:['piechartmax','pieChartMaxData'],
    data(){
      return{

      }
    },
    mounted (){
      this.initLine(this.piechartmax)
    },
    methods:{
      initLine(chartID) {
        var _this = this;
        let myChart = echarts.init(document.getElementById(chartID));
        myChart.setOption({
          title: {
            text:_this.pieChartMaxData.name,
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
              radius: [32, 36],
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
                {value:_this.pieChartMaxData.value, name:_this.name,itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#72d2fd'},
                      {offset: 1, color: '#6697f4'}
                    ]
                  )
                },
                  emphasis:{
                    show:false
                  }
                }},
                {value:100-_this.pieChartMaxData.value,name:'11',itemStyle:{normal:{show:false},emphasis:{show:false,color:'#e7f1ff'}}}
              ]
            },
            {
              name:'',
              type:'pie',
              radius:[26,27],
              center:['50%','40%'],
              itemStyle:{
                normal:{
                  color:'#85c7fb'
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
        this.initLine(this.piechartmax)
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