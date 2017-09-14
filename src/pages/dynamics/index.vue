<template>
    <div class="wrapper">
        <div class="header-wrapper">
            <div class="header">
                <ul class="left-header fl">
                    <li class="active" @click="switchs(0)">新注册企业动态<i></i></li>
                    <li @click="switchs(1)">新注册企业分析<i></i></li>
                </ul>
                <div class="right-header fr">
                    <input v-model="detile" @keyup.enter="searchPoint()" @click="clearValue" placeholder="请输入企业名称/法人名">
                    <i class="serach" @click="searchPoint"></i>
                </div>
            </div>
        </div>
        <div class="main-index">
            <div class="select-wrapper">
                <Selects @getTime="gettimes"></Selects>
            </div>
            <div class="context-wrapper cf">
                <div class="items items-num fl">
                    <div class="titles cf">
                        <p class="type-text fl">新注册企业数量</p>
                        <p class="num fr"><span>{{enterpriseQuantity.addBusinessNum}}</span>家</p>
                    </div>
                    <div class="newAdd-type">
                        <div class="newAdd-type-items">
                            <div class="newAdd-text newAdd-text1">
                                <p>新注册资本</p>
                            </div>
                            <p class="newAdd-num"><span>{{enterpriseQuantity.newCapital}}</span>元</p>
                        </div>
                        <div class="newAdd-type-items">
                            <div class="newAdd-text newAdd-texts">
                                <p>近一年内月均</p>
                                <p>新注册企业数量</p>
                            </div>
                            <p class="newAdd-num"><span>{{enterpriseQuantity.newAddBusiness}}</span>家</p>
                        </div>
                    </div>
                </div>
                <div class="items items-rate fl">
                    <div class="titles cf">
                        <p class="type-text fl">新注册企业同比增长率</p>
                        <p class="num fr"><span>{{businessGrowth.growthRate}}</span></p>
                    </div>
                    <div class="newAdd-type">
                        <Gauge :gauge="'gauge'" :gaugeData = "businessGrowth.avtiveStatu"></Gauge>
                    </div>
                </div>
                <div class="items items-ratio fr">
                    <div class="titles cf">
                        <p class="type-text">新注册企业产业结构占比</p>
                    </div>
                    <div class="newAdd-type" v-if="industryAccounted">
                        <IndustrialStructureBar :barChart = "'barChart'" :barChartData = "industryAccounted"></IndustrialStructureBar>
                    </div>
                </div>
            </div>
            <div class="map-wrapper cf">
                <div class="map-box fl">
                    <div class="map-info-wrapper" v-show="showmapList">
                        <h3 class="list-titles"><span @click="hideList"></span>企业信息</h3>
                        <div class="map-list-detiles">
                            <p class="lists-name">{{entDetiles.entName}}</p>
                            <div class="infos-wrapper">
                                <p><span>统一社会信用代码／注册号：</span><b>{{entDetiles.regNumber}}</b></p>
                                <p><span>法人：</span><b>{{entDetiles.legalPerson}}</b></p>
                                <p><span>注册资本：</span><b>{{entDetiles.capitalNum}}</b></p>
                                <p><span>注册日期：</span><b>{{entDetiles.regDate}}</b></p>
                                <p><span>注册状态：</span><b>{{entDetiles.regState}}</b></p>
                                <p><span>企业类型：</span><b>{{entDetiles.entType}}</b></p>
                                <p><span>营业范围：</span><b>{{entDetiles.businessScope}}</b></p>
                                <p><span>地址：</span><b>{{entDetiles.address}}</b></p>
                            </div>
                        </div>
                     </div>
                    <Baimap @showlist="showLists" @showlistPoint="showListsZoom" :mapdata="mapData"></Baimap>
                    <!--<div class="search-wrappers">-->
                        <!--<input type="text" v-model="inputVal"/>-->
                        <!--<i class="serach" @click="searchList"></i>-->
                    <!--</div>-->
                </div>
                <div class="list-box fr">
                    <div class="titles cf" @click="switchList">
                        <p class="type-text fl">新注册企业名单</p>
                        <p class="num more fr">>></p>
                    </div>
                    <div class="list-wrapper">
                        <div class="list-items" v-for="item in companyList">
                            <p class="list-name" :title="item.entName"><i @click="showList(item.entDetiles)"></i><span @click="switchDetiles(item.entid,item.entName)">{{item.entName}}</span></p>
                            <p class="list-detiles">
                                <span class="legal-person">法人 ：</span>
                                <b class="person-name">{{item.legalPerson}}</b>
                                <span class="capital">注册资本 ：</span>
                                <b class="capital-num">{{item.capitalNum}}</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
//获取组件
import Selects from '../../components/select/select.vue'
import IndustrialStructureBar from '../../components/echarts/industrialStructureBar.vue'
import Gauge from '../../components/echarts/gauge.vue'
import Baimap from '../../components/echarts/baidu.vue'

import {cloudEntUrl} from '@/baseUrl'
//获取请求数据
import api from '../../api.js'
export default {
  name:'index',
  data () {
    return {
        timeDuring:"",
        showmapList: false,
        inputVal:'请输入地名或街道名',
        enterpriseQuantity: {},
        businessGrowth:{},
        industryAccounted:{},
        clickNUm:1,
        companyList:[

        ],
        entdetilesInfo:{
        },
        centerPoint:[],
        areaCode:'',
        industyCode:'',
        date:'',
        detile:'',
        mapData:"",
        entDetiles:{
            entName: "陕西正奥教育科技有限公司",
            regNumber: "91610113MA6TYPGF2A",
            legalPerson: "罗清识",
            capitalNum: '1000万人民币',
            regDate: "2017-08-03",
            regState:"存续",
            entType: "有限责任公司(自然人投资或控股)",
            businessScope: "一般经营项目：商务信息咨询（不含金融、证券、保险、期货等限制审批项目）、企业管理咨询；会务会展服、翻译服务；房屋租赁（仅限自有房屋...",
            address: "陕西省西安市雁塔区电子二路中段国晟大厦4楼4024号房"
        }

    }
  },
  mounted(){
      this.firstLoad()
  },
  methods:{
       // 获取数据
      firstLoad(){
          let date = new Date()
          console.log(date)
          let param = {
              areaId: this.areaCode,
              industyId: this.industyCode,
              date: this.date,
              detile: this.detile
          }
          let _this = this
          api.getTradeData(param)
              .then(function(res){
                  _this.enterpriseQuantity = res.data.enterpriseQuantity
                  _this.businessGrowth  = res.data.businessGrowth
                  _this.industryAccounted = res.data.industryAccounted

              })
          api.getMap()
              .then(msg=>{
                //console.log(msg)
                  _this.mapData = msg.data
                  let listData = []
                  _this.mapData.forEach(function(v,i){
                      listData.push({
                          "entName": v.entName,
                          "legalPerson": v.legalPerson,
                          "capitalNum": v.capitalNum,
                          "entId": v.entId,
                          "point": v.point
                      })
                  })
                  if(listData.length>10){
                      _this.companyList = listData.slice(0,10)
                  }else{
                      _this.companyList = listData
                  }


              })
      },
      //  获取子组件传的参数
      gettimes(msg) {
        this.timeDuring = msg
        if(msg.page==0) {
            //console.log("地区"+msg.text)
            this.areaCode = msg.text.idCode

        }else if(msg.page==1){
            //console.log("行业"+msg.text)

        }else if(msg.page==2){
           // console.log("时间范围"+msg.text)
            this.date = msg.text

        }
          this.getRanderData();
      },
      getRanderData() {
          let param = {
              areaId: this.areaCode,
              industyId: this.industyCode,
              date: this.date,
              detile: this.detile
          }
          let _this = this
          api.getTradeData(param)
              .then(function(res){
                  //console.log(res)
                  _this.enterpriseQuantity = res.data.enterpriseQuantity
                  _this.businessGrowth  = res.data.businessGrowth
                  _this.industryAccounted = res.data.industryAccounted

              })
          //刷新地图
          api.getMap(param)
              .then(msg=>{

                  _this.mapData = msg.data
                  let listData = []
                  _this.mapData.forEach(function(v,i){
                      listData.push({
                          "entName": v.entName,
                          "legalPerson": v.legalPerson,
                          "capitalNum": v.capitalNum,
                          "entId": v.entId,
                          "point": v.point
                      })
                  })
                  if(listData.length>10){
                      _this.companyList = listData.slice(0,10)
                  }else{
                      _this.companyList = listData
                  }


              })
      },
      //点击搜索事件
      searchPoint() {
          let param = {
              areaCode: this.areaCode,
              industyCode: this.industyCode,
              date: this.date,
              detile: this.detile
          }
          let _this = this
          api.getTradeData(param)
              .then(function(res){
                  //console.log(res)
                  _this.enterpriseQuantity = res.data.enterpriseQuantity
                  _this.businessGrowth  = res.data.businessGrowth
                  _this.industryAccounted = res.data.industryAccounted

              })
      },
      switchs(ind) {
            if(ind == 0){
                this.$router.push({path: '/index'})
            }else{
                this.$router.push({path: '/analysis'})
            }
      },
      //跳转详情
      switchList() {
          let params = {
              areaCode: this.areaCode,
              industyCode: this.industyCode,
              date: this.date,
              detile: this.detile
          }
          this.$router.push({name:'list',params:params})
//          top.window.addTab(cloudEntUrl+"列表",'列表页','newRegList')
      },
      switchDetiles(id,name){
          this.$router.push('/details/'+id+'/'+name)
          if (localStorage.getItem('n')){
              localStorage.removeItem('n')
          }
//          top.window.addTab(cloudEntUrl+name,name,'newRegDetiles'+id)
      },
      showList(data) {
          this.showmapList = true
          this.entDetiles = data
      },
      searchList(){

      },
      //地图传输数据
      showLists(msg) {
               // console.log(msg)
              this.showmapList = msg.isShow
              this.entDetiles = msg.infoData
      },
      showListsZoom(msg) {
          //刷新地图
          console.log(msg)
          let param = {
              areaCode: this.areaCode,
              industyCode: this.industyCode,
              date: this.date,
              detile: this.detile,
              lng: msg[0],
              lat: msg[1]
          }
          console.log(param)
          let _this = this

          let time = null
          if(time){
              clearTimeout(time)
          }else{
              time = setTimeout(function () {
                  api.getMap(param)
                      .then(msg=>{
                          let listData = msg.data
                          if(listData.length>6){
                              _this.companyList = listData.slice(0,6)
                          }else{
                              _this.companyList = listData
                          }

                      })
              }, 300);
          }

      },
      hideList() {
          this.showmapList = false
      },
      clearValue() {
          this.detile = ''
      }

  },
  components:{
      Selects,
      IndustrialStructureBar,
      Gauge,
      Baimap
  },
  watch:{

  }
}
</script>

<style scope>
    body,html{
        width:100%;
        min-height:100%;
        height: 100%;
        background: #fbfbfc;
    }
    .app{
        min-height: 100%;
        height: 100%;
    }
    .wrapper{
        height: 100%;
    }
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
    input::-webkit-input-placeholder{
        color: #79b2fc;
    }
    .serach{
        width: 16px;
        height:16px;
        background: url(../../../static/img/search.png) no-repeat center;
        display: inline-block;
        position: absolute;
        right: 10px;
        top:8px;
        cursor: pointer;
    }
    /*主体板块*/
    .main-index{
        width: 1200px;
        margin:0 auto;
        /*height: calc(100% - 61px);*/
        padding: 20px 0;
        box-sizing: border-box;
    }
    .select-wrapper{
        height: 30px;
        line-height: 30px;
        margin: 16px 0;
    }

    /*主体内容板块*/
    .context-wrapper{
        height: 268px;
        border: 1px solid #cce1fc;
        border-radius: 5px;
        overflow: hidden;
    }
    .items-num,.items-rate{
        width: 299px;
        height:100%;
        border-right: 1px solid #cce1fc;
        box-sizing: border-box;
    }
    .items-ratio{
        width: 600px;
        height:100%;
    }
    .titles{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #e7f1ff;
        padding: 0 18px;
        box-sizing: border-box;
        border-bottom: 1px solid #cce1fc;
        background: -webkit-linear-gradient(left, #eff6ff, #f8fbff);
        cursor: pointer;
    }
    .items-num .titles{
        background: -webkit-linear-gradient(left, #e5f0ff, #e9f3ff);
    }
    .items-rate .titles{
        background: -webkit-linear-gradient(left, #e9f3ff, #eff6ff);
    }
    .items-ratio .titles{
        background: -webkit-linear-gradient(left, #eff6ff, #f8fbff);
    }
    .type-text{
        font-size: 16px;
        color: #333333;
        padding-left: 10px;
        background: url(../../../static/img/border.png) no-repeat left center;
    }
    .newAdd-num,.num{
        font-size: 14px;
        color: #444;
    }
    .more{
        color: #4399f9;
        font-size: 16px;
        cursor: pointer;
    }
    .more:hover{
        color:#0a72e0 ;
    }
    .num span{
        font-size:24px ;
        color: #4399f9;
        font-weight:bold;
    }
    .newAdd-type{
        width: 100%;
        height: 218px;
        padding: 0 18px 0 24px;
        box-sizing: border-box;
        background: #fff;
    }
    .newAdd-type-items{
        width: 100%;
        height: 100px;
        line-height: 100px;
        border-bottom: 2px solid #cce1fc;
        display: flex;
        justify-content: space-between;
    }
    .newAdd-type-items:nth-child(2){
        border-bottom: none;
    }
    .newAdd-text{
        color: #666;
        font-size: 14px;
        padding-left: 5px;

    }
    .newAdd-text p{
        line-height: 20px;
    }
    .newAdd-text1{
        margin-top: 44px;
    }
    .newAdd-texts{
        margin-top: 38px;
    }
    .newAdd-num span{
        color: #fc8425;
        font-size: 24px;
        font-weight: bold;
    }
        /*地图板块*/
    .map-wrapper{
        margin-top: 18px;
        height:450px;
    }
    .map-box{
        width:882px;
        height:100%;
        border: 1px solid #cce1fc;
        border-radius: 5px;
        position: relative;
    }
    .map-info-wrapper{
        width: 425px;
        height: 70%;
        border: 1px solid #cce1fc;
        border-radius: 5px;
        overflow: hidden;
        position: absolute;
        right: 8px;
        top: 8px;
        z-index: 2;
        background: #fff;
    }
    .list-titles{
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size:14px ;
        color:#444444 ;
        padding-left:24px ;
        box-sizing:border-box;
        background: -webkit-linear-gradient(left, #eff6ff, #f8fbff);
        border-bottom: 1px solid #cce1fc;
    }
    .list-titles span{
        float: right;
        width: 12px;
        height: 12px;
        background: url(../../../static/img/close.png) no-repeat center;
        margin: 13px 10px 0 0;
        cursor: pointer;
    }
    .map-list-detiles{
        padding:20px;
        height: calc(100% - 40px);
        box-sizing: border-box;
        overflow: hidden;
    }
    .infos-wrapper{
        padding-left: 17px;
        height:90%;
        overflow-y: auto;
    }
    .infos-wrapper p{
        line-height: 32px;
        display: flex;
    }
    .infos-wrapper span{
        font-size: 14px;
        color: #999999;
    }
    .infos-wrapper b{
        font-weight: normal;
        font-size: 14px;
        color: #666666;
        flex: 1;
    }

    .list-box{
        width: 298px;
        height:100%;
        border: 1px solid #cce1fc;
        border-radius: 5px;
        padding-bottom: 10px;
        box-sizing: border-box;
        background: #fff;
    }
    .list-wrapper{
        padding-top: 10px;
        height: calc(100% - 60px);
        width: 100%;
        padding: 0 14px;
        box-sizing: border-box;
        overflow-y: auto;
        background: #fff;
    }
    .list-items{
        border-bottom: 1px solid #cce1fc;
        padding: 5px 0;
    }
    .list-items:last-child{
        border-bottom: none;
    }
    .bordernone{
        border-bottom: none;
    }
    .list-items>p{
        line-height: 26px;
        height: 26px;
    }
    .lists-name{
        color: #0a72e0;
        font-size: 14px;
        padding-left: 17px;
        background: url(../../../static/img/loca.png) no-repeat left center;
    }
    .list-name{
        color: #0a72e0;
        font-size: 14px;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-name i{
        display: inline-block;
        height: 17px;
        width: 12px;
        background: url(../../../static/img/loca.png) no-repeat left center;
        margin-right: 7px;
        position: relative;
        top: 2px;
        cursor: pointer;
    }
    .list-detiles span{
        font-size: 12px;
        color: #999999;
    }
    .list-detiles b{
        color:#666666 ;
        font-size: 12px;
        font-weight: normal;
    }
    .legal-person{
        padding-left: 20px;
    }
    .capital{
        padding-left: 15px;
    }

    .search-wrappers{
        position: absolute;
        width: 230px;
        height: 32px;
        border-width: 1px;
        border-style: solid;
        border-left-color:#5ab6fd;
        border-right-color:#5ab6fd;
        border-top-color:#0078e9 ;
        border-bottom-color: #0078e9;
        border-radius: 5px;
        z-index: 1;
        top: 20px;
        left: 95px;
    }
    .search-wrappers input{
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        border-radius: 5px;
        color: #79b2fc;
        padding-left:10px ;
        box-sizing: border-box;
    }

    /*修改echarts*/
    .echarts>div:nth-child(2){
        display: block;
        background-color: transparent!important;
        border: none!important;
    }
    .echarts canvas{
        width: 100%;
        height:100%;
    }
    /*修改滚动条样式*/
    ::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track-piece
    {
        background-color: #CCCCCC;
        -webkit-border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:vertical
    {
        height: 5px;
        background-color: #999999;
        -webkit-border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:horizontal
    {
        width: 5px;
        background-color: #CCCCCC;
        -webkit-border-radius: 6px;
    }
    .list-name span{
        cursor: pointer;
    }
    .list-name span:hover{
        text-decoration:underline;
    }
    .tangram-suggestion-main>div:nth-child(1){
        height: 200px!important;
        overflow: auto;
    }
    .tangram-suggestion{
        height: 200px!important;
        overflow: auto;
    }
    #barChart .aaa {
        display: inline-block;
        background: url(../../../static/img/arrow-up.png) no-repeat;
        width: 13px;
        height: 14px;
        margin-left:7px;
    }
    #barChart .bbb {
        display: inline-block;
        background: url(../../../static/img/arrow-down.png) no-repeat;
        width: 13px;
        height: 14px;
        margin-left:7px;
    }
</style>
