<template>
    <div class="chartcon" :id='piechartid'></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'pieChart',
    props:['piechartid','capitalDistributionData'],
    data(){
      return{
      }
    },
    mounted (){
      this.initLine(this.piechartid)
    },
    methods:{
      initLine(chartID) {
        let myChart = echarts.init(document.getElementById(chartID));
        myChart.setOption({
          legend: {
            itemHeight: 8,
            itemWidth:8,
            align: 'left',
            bottom: 10,
            left: 10,
            right: 0,
            icon:"circle",
            textStyle: {
              color: '#999'
            },
            data:this.capitalDistributionData.xdata
          },
          tooltip: {
            show: true,
            backgroundColor:'transparent',
            position: ['36%','43%'],
            formatter:function(params){
              var html='';
              return html += '<div><p style="font-size:20px;text-align:center;color:'+params.color.colorStops[1].color+';">'+params.percent+'%</p><p style="font-size:12px;text-align:center;color:#575757;">'+params.name+'</p></div>'
            }

          },
          series : [
            {
              name:'',
              type:'pie',
              radius : [48, 50],
              center : ['50%', '50%'],
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
                {
                  value:'0',
                  itemStyle:{
                    normal:{
                      color:'#dbdbdc'
                    }
                  }
                }
              ]
            },
            {
              name:'',
              type:'pie',
              radius : [55, 75],
              center : ['50%', '50%'],
              avoidLabelOverlap: false,
              labelLine:{
                normal:{
                  show: false
                }
              },
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle:{
                normal:{
                  borderColor:'#fff',
                  borderWidth:1
                }
              },
              data:[
                {value:this.capitalDistributionData.seriesData[0], name:this.capitalDistributionData.xdata[0],itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#fa903e'},
                      {offset: 1, color: '#fb9240'}
                    ]
                  )

                }}},
                {value:this.capitalDistributionData.seriesData[1], name:this.capitalDistributionData.xdata[1],itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#80cd47'},
                      {offset: 1, color: '#77ca46'}
                    ]
                  )

                }}},
                {value:this.capitalDistributionData.seriesData[2], name:this.capitalDistributionData.xdata[2],itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#90cefe'},
                      {offset: 1, color: '#80b4fe'}
                    ]
                  )

                }}},
                {value:this.capitalDistributionData.seriesData[3], name:this.capitalDistributionData.xdata[3],itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#62adfb'},
                      {offset: 1, color: '#6587f3'}
                    ]
                  )

                }}},
                {value:this.capitalDistributionData.seriesData[4], name:this.capitalDistributionData.xdata[0],itemStyle:{normal:{color:
                  new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#feb72b'},
                      {offset: 1, color: '#fdb02a'}
                    ]
                  )

                }}}
              ]
            }

          ]
        });
      }
    },
    watch:{
      pieoptionlist(){
        this.initLine(this.piechartid)
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