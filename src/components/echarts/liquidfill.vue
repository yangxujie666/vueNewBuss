<template>
    <div class="chart-wrapper">
        <div class="liquidfill" id="liquidfillId"></div>
        <div class="piechart" id="pieId"></div>
    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/pie')
    import liquidFill from '../../assets/js/echarts-liquidfill.min.js'
    export default {
      name:'liquidfillChart',
      props:['financingRateData0','financingRateData1'],
      data () {
          return {
            datas:{
              value:[0.5,0.2]
          }
          }
      },
      mounted () {
        this.Liquidfill();
        this.pieChart();
      },
      methods: {
        Liquidfill(){
          var containers = document.getElementById('liquidfillId');
          var options = {
            series: [{
              type: 'liquidFill',
              itemStyle:{
                normal:{
                  shadowBlur:0
                }
              },
              data: [
                {
                  value: this.financingRateData0,
                  direction: 'right',
                  itemStyle: {
                    normal: {
                      color: '#f98e3c',
                      opacity: 0.7
                    }
                  }
                },
                {
                  value: this.financingRateData1,
                  direction: 'right',
                  itemStyle: {
                    normal: {
                      color: '#f98e3c',
                      opacity: 0.3
                    }
                  }
                }],
              radius: '65%',
              center:["50%","50%"],
              outline: {
                show: false
              },
              backgroundStyle: {
                borderColor: '#e7f1ff',
                color:'#fff',
                borderWidth: 6,
              },
              label: {
                normal: {
                  textStyle: {
                    fontSize: 30,
                    color:'#fa8f3c'
                  }
                }
              }
            }]
          };

          var chart = echarts.init(containers);
          chart.setOption({
            baseOption: options
          });

          window.onresize = function () {
            chart.resize();
          };
        },
        pieChart (){
          var myChart = echarts.init(document.getElementById('pieId'));
          myChart.setOption({
            title: {
              show:false
            },
            tooltip:{
              show:false
            },
            color:['#fff'],
            series: [
              {
                name:'',
                type:'pie',
                radius: [82, 86],
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
                  {value:100-this.financingRateData0*100,name:'11',itemStyle:{normal:{show:false},emphasis:{show:false,color:'#fff'}}},
                  {value:this.financingRateData0*100, name:'1',itemStyle:{normal:{color:
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
                  }}
                ]
              }

            ]
          });
        }
      }
    }
</script>

<style scope>
    .chart-wrapper {
        position: relative;
    }
    .liquidfill {
        position: absolute;
        top: 40px;
        left: 50px;
        width: 200px;
        height: 200px;
    }
    .piechart {
        position: absolute;
        left: 0;
        top: 20px;
        width: 300px;
        height: 300px;
    }
</style>
