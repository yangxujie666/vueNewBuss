<template>
    <div class="wrapper1">
        <div class="main-warp">
            <div class="msg-wrap">
                <div class="company-name"><h3>{{entName}}</h3><i :class=" registStatus === 0 ? 'active': ''">{{registStatusTxt}}</i></div>
                <div><span>所属行业：</span><span>{{industry}}</span><span class="btn" @click="backIndex(entName)">企业星云图</span></div>
                <div>
                    <span>行业网址：</span>
                    <span class="web"><a href="###">{{entUrl}}</a></span>
                    <span class="address">企业地址：</span>
                    <span>{{entAddress}}</span>
                    <span class="favoriteBtn" @click="favoriteBtn" :class="{active: activeFlag}"></span>
                </div>
            </div>
            <div class="nav">
                <h3><span>产品及服务：</span><span>能源、矿产、化工</span></h3>
                <div>
                    <router-link :class="current==0?'active':''" :to="basicInfoPath" @click.native="toggleClass(0)">基本信息</router-link>
                    <router-link :class="current==1?'active':''" :to="affiliatedEnterprisePath"  @click.native="toggleClass(1)">关联企业</router-link>
                    <router-link :class="current==2?'active':''" :to="foreignInvestmentPath" @click.native ="toggleClass(2)">法人对外投资与任职</router-link>
                    <router-link :class="current==3?'active':''" :to="similarEnterprisePath" @click.native="toggleClass(3)">同类企业</router-link>
                    <router-link :class="current==4?'active':''" :to="industryTrendsPath" @click.native="toggleClass(4)">同行业动态</router-link>

                </div>
            </div>
            <router-view></router-view>
            <div class="pop-favorite" id="pop-favorite">
                <span>已收藏</span>
            </div>
            <div class="pop-cancel-favorite" id="pop-cancel-favorite">
                <span>已取消收藏</span>
            </div>
        </div>
    </div>
</template>

<script>
  import api from '@/api'
  import {cloudEntUrl} from '@/baseUrl'
  export default {
    name:'index',
    data () {
      return {
        current:0,
        activeFlag:false,
        entName:'',
        industry:'',
        entUrl:'',
        entAddress:'',
        productsServices:'',
        registStatusTxt:'',
        registStatus:'',
        industryId:'',
        page:1,
        pageSize:10,
        basicInfoPath:'',
        affiliatedEnterprisePath:'',
        foreignInvestmentPath:'',
        similarEnterprisePath:'',
        industryTrendsPath:'',
      }
    },
    beforeMount () {
       console.log()
      this.basicInfoPath=`/details/${this.$route.params.id}/basicInfo`;
      this.affiliatedEnterprisePath=`/details/${this.$route.params.id}/${this.$route.params.name}/affiliatedEnterprise`;
      this.foreignInvestmentPath=`/details/${this.$route.params.id}/foreignInvestment`;
      this.similarEnterprisePath=`/details/${this.$route.params.id}/similarEnterprise`;
      this.industryTrendsPath=`/details/${this.$route.params.id}/industryTrends`;
    },
    mounted () {
      if (localStorage.getItem('n')){
        var n = localStorage.getItem('n')
        this.current = n;
      }
      this.getIndustryRegistrateInfoData();
    },
    methods:{
        toggleClass:function(item){
          this.current = item;
          localStorage.setItem('n',item)
        },
        favoriteBtn (e) {
            this.activeFlag = !this.activeFlag;
            var popFavorite = document.getElementById("pop-favorite");
            var popCancelFavorite = document.getElementById("pop-cancel-favorite");
            if (this.activeFlag) {
              e.target.classList.remove('active');
              popFavorite.classList .add('active');
              popCancelFavorite.classList .remove('active');
              setTimeout(function () {
                popFavorite.classList.remove('active');
              },2000);
            } else {
              e.target.classList.add('active');
              popFavorite.classList.remove('active');
              setTimeout(function () {
                popCancelFavorite.classList.remove('active');
              },2000);
              popCancelFavorite.classList .add('active');
            }
        },
        getIndustryRegistrateInfoData () {
          this.industryId = this.$route.params.id;
          var params = {
            industryId:this.industryId
          };
          api.getIndustryRegistrateInfoData(params)
            .then(res => {
              this.entName = res.data.entName;
              this.industry = res.data.industry;
              this.entUrl = res.data.entUrl;
              this.entAddress = res.data.entAddress;
              this.productsServices = res.data.productsServices;
              this.registStatusTxt = res.data.registStatusTxt;
              this.registStatus = res.data.registStatus;
            })
        },
        backIndex(entName) {
            console.log(entName)
            console.log(cloudEntUrl)
            if(entName){
                top.window.addTab(cloudEntUrl+entName,entName,'newRegIndex')
            }else{
                top.window.addTab(cloudEntUrl+entName,'新注册企业','newRegIndex')
            }
            //top.window.addTab(cloudEntUrl+entName,entName,'newRegIndex')

        }
    }
  }
</script>

<style scope>
    .wrapper1{
        background: #fbfbfc;
        margin-left: calc(100vw - 100%);
    }
    .main-warp{
        position: relative;
        width:1200px;
        margin:0 auto;
    }
    .msg-wrap {
        border-bottom: 1px solid #cce1fc;
        line-height:26px;
        padding:20px;
        box-sizing: border-box;
    }
    .msg-wrap .company-name h3{
        color:#242424;
        font-size:22px;
        font-weight: bold;
        float: left;
        margin-right:20px;
    }
    .msg-wrap .company-name i{
        width:44px;
        height:20px;
        line-height:20px;
        display: inline-block;
        border-radius: 3px;
        background: #f98f3c;
        color:#fff;
        text-align: center;
        font-size:12px;
        margin-bottom:5px;
    }
    .msg-wrap .company-name i.active{
        background: #00af10;
    }
    .msg-wrap div{
        color:#242424;
        font-size:12px;
        height:30px;
        line-height:30px;
    }
    .msg-wrap .address{
        margin-left:80px;
    }
    .msg-wrap .web a{
        color:#0062d0;
    }
    .btn{
        border-radius: 5px;
        color:#ffffff;
        cursor: pointer;
        width:130px;
        height:30px;
        float:right;
        text-align: center;
        line-height: 30px;
        background: -webkit-linear-gradient(left,#61b1fc,#6587f4);
    }
    .btn::before{
        content: url(../../../static/img/btn-bg.png);
        display: inline-block;
        height:100%;
        margin-right:5px;
        vertical-align:middle;
        overflow:hidden;
    }
    .btn:hover{
        background:#6587f4 ;
    }
    .nav h3{
        padding:20px;
        box-sizing: border-box;
        margin-bottom:16px;
    }
    .nav>div{
        border:1px solid #cce1fc;
        border-radius: 3px;
        height:47px;
        line-height: 47px;
       /* background: -webkit-linear-gradient(left,#e5f1ff,#f8fbff);*/
        background: #f1f7ff;
    }
    .nav>div a{
        cursor: pointer;
        float:left;
        font-size:16px;
        font-weight: bold;
        color:#777777;
        width:238px;
        text-align: center;
        border-right:1px solid #cce1fc;
    }
    .nav>div a:hover{
        text-decoration: none;
        opacity: .8;
    }
    .nav>div a.active{
        color:#026cf1;
    }
    .nav>div a:last-child{
        border-right:none;
    }
    .favoriteBtn {
        float: right;
        width: 14px;
        height: 14px;
        margin: 10px 10px 0 0;
        background: url(../../../static/img/no-favorite.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .favoriteBtn.active {
        background: url(../../../static/img/favorite.png) no-repeat;
    }
    .pop-favorite,
    .pop-cancel-favorite {
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 180px;
        height: 48px;
        margin-left: -92px;
        margin-top: -24px;
        line-height: 48px;
        background: rgba(0, 0, 0, .6);
        border-radius: 5px;
    }

    .pop-favorite.active,
    .pop-cancel-favorite.active {
        display: block;
    }
    .pop-favorite span {
        display: inline-block;
        width: 100%;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }
    .pop-cancel-favorite span {
        display: inline-block;
        width: 100%;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }
    .nav a:not(:last-child):after {
        width: 0!important;
        background: none;
    }
</style>
