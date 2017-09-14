<template>
    <div class="wrapper-analysis">
        <div class="header-wrapper">
            <div class="header">
                <ul class="left-header fl">
                    <li @click="switchs(0)">新注册企业动态<i></i></li>
                    <li class="active" @click="switchs(1)">新注册企业分析<i></i></li>
                </ul>
            </div>
        </div>
        <div class="main-analysis">
            <div class="select-wrapper1">
                <Selects @getTime="gettimes"></Selects>
            </div>
            <div class="top-wrapper cf">
                <div class="new-register-wrapper fl">
                    <div class="enterprise-num-wrapper">
                        <p class="title-no title1"><i></i>新注册企业数量</p>
                        <div class="bottom-enterprise-num-wrapper cf">
                            <p class="total-num fl"><i>{{entNum}}万</i>家</p>
                            <p class="growth-decrease  fr" :class="entStatus === 1? 'growth-increase': ''"><i class="arrow"></i><span class="percent-num">{{entPercent}}%</span><span class="text" v-text="entText"></span></p>
                        </div>
                    </div>
                    <div class="registered-capital-wrapper">
                        <p class="title"><i></i>新注册资本</p>
                        <div class="bottom-enterprise-num-wrapper cf">
                            <div class="cf">
                                <p class="total-num fl"><i>{{capitalNum}}亿</i>元</p>
                                <p class="growth-decrease fr" :class="capitalStatus === 1? 'growth-increase': ''"><i class="arrow"></i><span class="percent-num">{{capitalPercent}}%</span><span class="text" v-text="capitalText"></span></p>
                            </div>
                            <div class="registered-capital" v-text="capitalEconomicStatusText">经济活跃</div>
                        </div>
                    </div>
                </div>
                <div class="financing-rate-wrapper fl">
                    <p class="title-no title2"><i></i>融资率</p>
                    <div class="chart-wrapper" v-if="financingRate0">
                        <liquidfillChart :financingRateData0="financingRate0"  :financingRateData1="financingRate1"></liquidfillChart>
                    </div>
                </div>
                <div class="financing-rate-wrapper fl">
                    <p class="title-no title3"><i></i>注册资本分布</p>
                    <div class="chart-wrapper" v-if="capitalDistribution">
                        <p class="proportion-max">占比最高：{{capitalDistribution.name}}<span>{{capitalDistribution.value}}%</span></p>
                        <pieChart :piechartid="'chart1'" :capitalDistributionData="capitalDistribution"></pieChart>
                    </div>
                </div>
                <div class="financing-rate-wrapper enterprise-type fl">
                    <p class="title-no title4"><i></i>企业类型分布</p>
                    <div class="chart-wrapper" v-if="classDistribution">
                        <p class="proportion-max">占比最高：{{classDistribution.name}}<span>{{classDistribution.value}}%</span></p>
                        <pieChart :piechartid="'chart2'" :capitalDistributionData="classDistribution"></pieChart>
                    </div>
                </div>
            </div>
            <div class="center-wrapper cf">
                <div class="new-register-ent fl">
                    <p class="title"><i></i>新注册企业</p>
                    <div class="chart-wrapper1" v-if="newRegisterEnterprise">
                        <leftBarLineChart :leftbarlinechart="'chart3'" :newRegisterEnterprise="newRegisterEnterprise"></leftBarLineChart>
                        <p class="average-num">月均注册企业：<span>{{newRegisterEnterprise.average}}家</span></p>
                    </div>
                </div>
                <div class="new-register-ent fr">
                    <p class="title"><i></i>新注册企业注册资本</p>
                    <div class="chart-wrapper1" v-if="newRegisterCapital">
                        <rightBarLineChart :rightbarlinechart="'chart4'" :newRegisterCapital="newRegisterCapital"></rightBarLineChart>
                        <p class="average-num">户均注册资本：<span>{{newRegisterCapital.average}}元</span></p>
                    </div>
                </div>
            </div>
            <div class="center-wrapper1 cf">
                <div class="distribution-area fl">
                    <p class="title"><i></i>新注册企业分布地区</p>
                    <div class="map-chart-wrapper" v-if="mapData">
                        <mapChart :mapid="'chart5'" :mapData="mapData"></mapChart>
                    </div>
                </div>
                <div class="growth-rate fl"  v-if="newRegisterGrowthRate">
                    <div class="average-rate">
                        <p class="title"><i></i>新注册企业平均增长率</p>
                        <div class="chart-wrapper2">
                            <span class="percent"><i>{{newRegisterGrowthRate.averagee}}</i>%</span>
                            <pieChartAverage :piechartaverage="'chart6'" :newRegisterGrowthRate="newRegisterGrowthRate"></pieChartAverage>
                        </div>
                    </div>
                    <div class="max-rate">
                        <p class="title"><i></i>新注册企业增长率最高</p>
                        <div class="chart-wrapper2">
                            <div class="chart-wrapper2-block" v-for="(item,index) in newRegisterGrowthRate.maxRate">
                                <span class="percent"><i>{{item.value}}</i>%</span>
                                <pieChartMax :piechartmax="'chart7'+index" :pieChartMaxData="item"></pieChartMax>
                            </div>
                        </div>
                    </div>
                    <div class="min-rate">
                        <p class="title"><i></i>新注册企业增长率最低</p>
                        <div class="chart-wrapper2 chart-wrapper2-noborder">
                            <div class="chart-wrapper2-block" v-for="(item,index) in newRegisterGrowthRate.minRate">
                                <span class="percent"><i>{{item.value}}</i>%</span>
                                <pieChartMax :piechartmax="'chart8'+index" :pieChartMaxData="item"></pieChartMax>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-wrapper cf" v-if="trade">
                <div class="new-register-ent fl">
                    <p class="title"><i></i>新注册企业所在行业</p>
                    <div class="chart-wrapper1">
                        <leftBarChart :leftbarchart="'chart9'" :trade="trade"></leftBarChart>
                    </div>
                </div>
                <div class="new-register-ent fr">
                    <p class="title"><i></i>新注册企业增长率最高的行业</p>
                    <div class="chart-wrapper1">
                        <rightBarChart :rightbarchart="'chart10'" :maxTrade="maxTrade"></rightBarChart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import api from '@/api'
  import pieChart from '@/components/echarts/pie-chart'
  import leftBarLineChart from '@/components/echarts/left-bar-line-chart'
  import rightBarLineChart from '@/components/echarts/right-bar-line-chart'
  import leftBarChart from '@/components/echarts/left-bar-chart'
  import rightBarChart from '@/components/echarts/right-bar-chart'
  import pieChartAverage from '@/components/echarts/pie-chart-average'
  import pieChartMax from '@/components/echarts/pie-chart-max'
  import mapChart from '@/components/echarts/map'
  import liquidfillChart from '@/components/echarts/liquidfill'
  import Selects from '../../components/select/select.vue'
  export default {
    name:'index',
    data () {
      return {
        entNum:'',
        entStatus:'',
        entPercent:'',
        capitalNum:'',
        capitalStatus:'',
        capitalPercent:'',
        capitalEconomicStatus:'',
        capitalEconomicStatusText:'',
        entText:'',
        capitalText:'',
        financingRate0:0,
        financingRate1:0,
        capitalDistribution:'',
        classDistribution:'',
        newRegisterEnterprise:'',
        newRegisterCapital:'',
        newRegisterGrowthRate:'',
        trade:'',
        maxTrade:'',
        mapData:'',
        areaId:'100',
        trands:'全部行业',
        date:'1周'
      }
    },
    mounted () {
        this.initChartData();
    },
    methods: {
        switchs(ind) {
            if(ind == 0){
                this.$router.push({path: '/index'})
            }else{
                this.$router.push({path: '/analysis'})
            }
        },
        //  获取子组件传的参数
        gettimes(msg) {
          this.timeDuring = msg
          if(msg.page === 0) {
            console.log(msg.text)
            this.areaId = msg.text.code;
          }else if(msg.page === 1){
            this.trands = msg.text
          }else if(msg.page === 2){
            this.date = msg.text;
          }
            this.initChartData();
        },
        initChartData() {
            var params={
              areaId:this.areaId,
              industryId:this.trands,
              date:this.date
            }
            this.getDataList(params);
        },
        getDataList (params) {
          api.getAnalysisData(params)
            .then(res => {
              this.entNum = res.data.entNum;
              this.entStatus = res.data.entStatus;
              this.entPercent = res.data.entPercent;
              this.capitalNum = res.data.capitalNum;
              this.capitalStatus = res.data.capitalStatus;
              this.capitalPercent = res.data.capitalPercent;
              this.capitalEconomicStatus = res.data.capitalEconomicStatus;
              this.financingRate0 = parseInt(res.data.financingRate)/100;
              this.financingRate1 = (parseInt(res.data.financingRate)-10) / 100;
              this.capitalDistribution = res.data.capitalDistribution;
              this.classDistribution = res.data.classDistribution;
              this.newRegisterEnterprise = res.data.newRegisterEnterprise;
              this.newRegisterCapital = res.data.newRegisterCapital;
              console.log(parseInt(res.data.financingRate))
              if ( this.entStatus > 0) {
                this.entText = '同比增长';
              } else {
                this.entText = '同比下降';
              }
              if ( this.capitalStatus > 0) {
                this.capitalText = '同比增长';
              } else {
                this.capitalText = '同比下降';
              }
              let economicStatus = document.getElementsByClassName('registered-capital');
              if ( this.capitalEconomicStatus === -1) {
                this.capitalEconomicStatusText = '经济低迷';
                economicStatus[0].className='registered-capital registered-capital1'
              } else if (this.capitalEconomicStatus === 0) {
                this.capitalEconomicStatusText = '经济活跃';
                economicStatus[0].className='registered-capital'
              } else if (this.capitalEconomicStatus === 1) {
                this.capitalEconomicStatusText = '经济非常活跃';
                economicStatus[0].className='registered-capital registered-capital2'
              }
            })
          api.getAnalysisData1(params)
            .then(res => {
              this.newRegisterGrowthRate = res.data.newRegisterGrowthRate;
              this.trade = res.data.trade;
              this.maxTrade = res.data.maxTrade;
              this.mapData = res.data.mapData;
            })
        }
    },
    components: {
      pieChart,
      leftBarLineChart,
      rightBarLineChart,
      leftBarChart,
      rightBarChart,
      pieChartAverage,
      pieChartMax,
      mapChart,
      liquidfillChart,
      Selects
    }
  }
</script>

<style scope>
    html,
    body,
    .app,
    .wrapper {
        min-height: 100%;
    }
    .wrapper-analysis {
        min-height: 100%;
        box-sizing: border-box;
        background: #fbfbfc;
    }
    /*头部*/
    .header-wrapper {
        height: 60px;
        border-bottom: 1px solid #d0e4fd;
        background: #fff;
    }
    .header {
        width: 1200px;
        margin: 0 auto;
    }
    .left-header li{
        position: relative;
        float: left;
        width: 160px;
        line-height: 60px;
        font-size: 16px;
        color: #999;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }
    .left-header li.active {
        background-image: -webkit-gradient(linear, 100% 0, 0 0, from(rgba(0, 140, 255, 1)), to(rgba(0, 88, 211, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .left-header li.active i {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: -webkit-linear-gradient(left, #0055cf, #008cff);
    }
    .right-header {
        position: relative;
        width: 310px;
        height: 30px;
        border-width: 1px;
        border-style: solid;
        border-left-color:#5ab6fd;
        border-right-color:#5ab6fd;
        border-top-color:#0078e9 ;
        border-bottom-color: #0078e9;
        border-radius: 16px;
        margin-top: 12px;
    }
    .right-header input {
        width:286px;
        height:30px;
        line-height: 30px;
        color: #79b2fc;
        font-size: 14px;
        display: inline-block;
        outline: none;
        border: none;
        padding-left: 24px;
        border-radius: 16px;
    }
    .right-header input::-webkit-input-placeholder{
        color: #79b2fc;
    }
    .serach{
        width: 16px;
        height:16px;
        background: url("../../../static/img/search.png") no-repeat center;
        display: inline-block;
        position: absolute;
        right: 10px;
        top:8px;
        cursor: pointer;
    }
    /*主体*/
    .main-analysis {
        width: 1200px;
        margin: 0 auto;
    }
    .select-wrapper1 {
        height: 30px;
        line-height: 30px;
        margin: 36px 0 16px 0;
    }
    .top-wrapper {
        height: 320px;
        border: 1px solid #cce1fc;
        border-radius: 5px;
    }
    .new-register-wrapper {
        width: 300px;
        border-right: 1px solid #cce1fc;
    }
    .title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #cce1fc;
        background: -webkit-linear-gradient(right, #f8fbff, #e5f1ff);
        font-size: 16px;
        color: #333;
        border-radius: 5px 5px 0 0;
    }
    .title-no {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #cce1fc;
        background: #f8fbff;
        font-size: 16px;
        color: #333;
    }
    .title i,
    .title-no i {
        float: left;
        width: 4px;
        height: 18px;
        margin: 16px 6px 0 18px;
        background: -webkit-linear-gradient(top, #0068f0, #29bbff);
    }
    .bottom-enterprise-num-wrapper {
        padding: 28px 0 28px 27px;
        border-bottom: 1px solid #cce1fc;

    }
    .total-num {
        font-size: 16px;
        color: #444;
    }
    .total-num i {
        font-size: 22px;
        color: #fd8425;
        font-weight: bold;
    }
    .growth-decrease {
        margin: 6px 20px 0 0;
        font-size: 16px;
        color: #444;
    }
    .growth-decrease .arrow {
        float: left;
        width: 13px;
        height: 14px;
        margin: 4px 2px 0 0;
        background: url(../../../static/img/arrow-down.png) no-repeat;
    }
    .growth-increase .arrow {
        background: url(../../../static/img/arrow-up.png) no-repeat;
    }
    .growth-decrease .percent-num {
        margin-right: 6px;
        color: #4eb326;
    }
    .growth-increase .percent-num {

        color: #fc8425;
    }
    .registered-capital-wrapper .bottom-enterprise-num-wrapper{
        padding: 20px 0 18px 27px;
    }
    .registered-capital {
        width: 130px;
        height: 34px;
        margin: 23px auto 0;
        padding-right: 27px;
        background: url(../../../static/img/registered-capital.png) no-repeat;
        font-size: 12px;
        color: #fd8425;
        line-height: 34px;
        text-align: center;
    }
    .registered-capital1 {
        background: url(../../../static/img/registered-capital1.png) no-repeat;
        color: #45b0e9;
    }
    .registered-capital2 {
        background: url(../../../static/img/registered-capital2.png) no-repeat;
        color: #ff6630;
     }
    .financing-rate-wrapper {
        width: 298px;
        border-right: 1px solid #cce1fc;
    }
    .chart-wrapper {
        height: 270px;
    }
    .enterprise-type {
        width: 299px;
        border-right: none;
    }
    .new-register-ent {
        width: 592px;
        border: 1px solid #cce1fc;
        border-radius: 5px;
    }
    .chart-wrapper1 {
        width: 100%;
        height: 412px;
    }
    .center-wrapper1 {
        border: 1px solid #cce1fc;
        border-radius: 5px;
    }
    .distribution-area {
        width: 900px;
        border-right: 1px solid #cce1fc;
    }
    .growth-rate {
        width: 297px;
    }
    .map-chart-wrapper {
        height: 589px;
    }
    .chart-wrapper2 {
        height: 162px;
        border-bottom: 1px solid #cce1fc;
    }
    .center-wrapper1 {
        margin-top: 16px;
    }
    .title1 {
        background: -webkit-linear-gradient(left, #e5f1ff, #e9f3ff);
    }
    .title2 {
        background: -webkit-linear-gradient(left, #e9f3ff, #eff6ff);
    }
    .title3 {
        background: -webkit-linear-gradient(left, #eff6ff, #f4f9ff);
    }
    .title4 {
        background: -webkit-linear-gradient(left, #f4f9ff, #f8fbff);
    }
    .chart-wrapper2-noborder {
        border-bottom: none;
    }
    .top-wrapper,
    .center-wrapper1,
    .center-wrapper {
        margin-top: 16px;
        background: #fff;
    }
    .bottom-wrapper {
        margin-top: 16px;
        margin-bottom: 20px;
    }
    .bottom-wrapper>div{
        background: #fff;
    }
    .chart-wrapper {
        position: relative;
    }
    .proportion-max {
        position: absolute;
        top: 20px;
        left: 60px;
        font-size: 14px;
        color: #444;
    }
    .proportion-max span {
        padding: 0 5px;
        font-size: 20px;
        color: #fd8425;
    }
    .chart-wrapper1,
    .chart-wrapper2,
    .chart-wrapper2-block {
        position: relative;
    }
    .average-num {
        position: absolute;
        left: 200px;
        bottom: 20px;
        font-size: 12px;
        color: #333;
    }
    .average-num span {
        font-size: 18px;
        color: #fd7e23;
        font-weight: bold;
    }
    .percent {
        position: absolute;
        top: 53px;
        left: 126px;
        width: 50px;
        font-size: 12px;
        color: #b6b6b6;
        text-align: center;
    }
    .percent i {
        font-size: 16px;
        color: #333;
        /*font-weight: bold;*/
    }
    .chart-wrapper2-block {
        float:left;
        width: 33.3%;
        height: 100%;
    }
    .chart-wrapper2-block .percent {
        left: 25px;
    }
</style>
