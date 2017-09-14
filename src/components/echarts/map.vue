<template>
    <div class="chartcon" :id='mapid'></div>
</template>

<script>
  // 引入基本模板
   let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
    require('echarts/lib/chart/map')
    require('echarts/map/js/china.js')
    require('echarts/map/json/china.json')
//  require('echarts/map/js/province/anhui.js')
//  require('echarts/map/json/province/anhui.json')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'mapChart',
    props:['mapid','mapData'],
    data(){
      return{

      }
    },
    mounted (){
      this.initBar(this.mapid)
    },
    methods:{
      randomData() {
        return Math.round(Math.random()*1000);
      },

      initBar(chartID) {
        var _this=this;
        let myChart = echarts.init(document.getElementById(chartID));
        myChart.setOption({
          title: {
            show:false
          },
          tooltip: {
            trigger: 'item',
            backgroundColor:'transparent',
            formatter:function(param){
              param.data.value = param.data.value?param.data.value:0;
              param.data.value1 = param.data.value1?param.data.value1:0;
              var html='';
              return html +='<div style="position:relative;padding:10px 13px;background:#fff;border:1px solid #d7e8fd;border-radius:5px;font-size:12px;color:#7a7a7a;line-height:26px;box-shadow:0 0 10px 0 rgba(6,115,242,.4);">'+
                '<p style="color:#737374;">'+param.name+':</p>'+
                '<p style="color:#333;">新注册企业数量：<span style="font-size:16px;color:#fd7e23;font-weight:bold;">'+param.data.value+'</span>家</p>'+
                '<p style="color:#333;">增长率：<span style="font-size:16px;color:#fd7e23;font-weight:bold;">'+param.data.value1+'</span>%</p>'+
                '<i style="position:absolute;bottom:-23px;left:30px;width:0;height:0;border:12px solid transparent;border-top:11px solid #d7e8fd;"></i>'+
                '<i style="position:absolute;bottom:-20px;left:32px;width:0;height:0;border:10px solid transparent;border-top:10px solid #fff;"></i>'+
                '</div>'
            }
          },
          legend: {
            show:false
          },
          visualMap: {
            min: 0,
            max: 2500,
            itemWidth:10,
            itemHeight:89,
            left: 50,
            bottom: 40,
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            color:['#008ffc','#e2f3fe']
          },
          series: [
            {
              name: '',
              type: 'map',
              mapType: 'china',
              roam: false,
              showLegendSymbol:false,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle:{
                normal:{
                  // areaColor:'rgba(226,243,254,.15)',
                  areaColor:'#e2f3fe',
                  borderColor:'#91d4fc'
                },
                emphasis:{
                  areaColor:'#fed23d'
                }
              },
              markPoint:{
                symbolSize:0,
              },
              data:this.mapData
            }

          ]
        });
      }
    },
    watch:{
      pieoptionlist(){
        this.initBar(this.mapid)
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