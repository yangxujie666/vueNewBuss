<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main industry-trends">
                <div class="main1">
                    <h3 class="public-title">行业新增投资事件({{totalRecord}})<span class="money-total fr">共{{assetSize}}人民币</span></h3>
                    <table>
                        <thead class="thead">
                            <tr>
                                <th>融资企业</th>
                                <th>成立时间</th>
                                <th>地区</th>
                                <th>最新融资时间</th>
                                <th>轮次</th>
                                <th>注册资本</th>
                                <th>投资方</th>
                            </tr>
                        </thead>
                        <tbody  class="tbody">
                            <tr v-for="(item,index) in main1Data">
                                <td>{{item.nominalName}}</td>
                                <td>{{item.registerTime}}</td>
                                <td>{{item.area}}</td>
                                <td>{{item.lastdate}}</td>
                                <td>{{item.round}}</td>
                                <td>{{item.regAsset}}</td>
                                <td>{{item.investor}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                    <div class="note">*注：新注册企业展现近3个月内注册的企业</div>
                </div>
                <div class="main2">
                    <h3 class="public-title">行业舆情热度</h3>
                    <div class="echarts-box" >
                        <ul class="select-date">
                            <li :class="current==0?'active':''" @click="toggleClass(0)">近一周</li>
                            <li :class="current==1?'active':''" @click="toggleClass(1)">近一月</li>
                            <li :class="current==2?'active':''" @click="toggleClass(2)">近三月</li>
                        </ul>
                        <IndustryHeat :chartId="'industryHeat'" :lineData="chartData"></IndustryHeat>
                    </div>
                </div>
                <div class="main3">
                    <h3 class="public-title">行业重要舆情</h3>
                    <div class="mnselect" @click="showlist()">
                        <p v-text="choice">{{choice}}</p><i></i>
                        <ul v-show="ok">
                            <li v-for="item in items" v-bind:value="item.value" @click="selectLi(item.text)">{{item.text}}</li>
                        </ul>
                    </div>
                    <div class="msg-list">
                        <div class="list" v-for="item in listData">
                            <div class="list-title">
                                <span :class="'company-type natureOfCase'+item.natureOfCase">{{item.natureOfCaseText}}</span>
                                <span class="company-from">来源：{{item.articleSource}}</span>
                                <span class="company-date">{{item.eventDate}}</span>
                            </div>
                            <div class="list-content"><a href="###">{{item.eventConten}}</a></div>
                            <div class="list-company">关联企业：{{item.affiliatedEnterprise}}</div>
                        </div>
                        <div class="note">*注：行业舆情展现近3个月内该行业的重要舆情事件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IndustryHeat from '../../components/details/industryTrends.vue'
    import simplifyPaging from '../../components/details/simplifyPaging.vue'
    import api from '../../api.js'
    export default {
        name:'index',
        data () {
            return {
                msg:'这是同行业动态页面',
                current:0,
                totalRecord:4,
                assetSize:'1000万',
                ok:false,
                items:[{text:'正面',value:'0'},{text:'中性',value:'1'},{text:'负面',value:'2'}],
                choice:'全部',
                main1Data:[],
                chartData:{},
                listData:[]
            }
        },
        components:{
            IndustryHeat,
            simplifyPaging
        },
        mounted(){
            this.firstLoad()
        },
        methods:{
            //获取数据
            firstLoad(){
                let _this = this
                this.industryId = this.$route.params.id;
                let params = {
                    industryId:this.industryId
                }
                api.getInvestmentEvent(params)
                    .then(res=>{
                        //console.log(res)
                        _this.totalRecord = res.data.length
//                        _this.assetSize = res.assetSize
                        _this.main1Data = res.data
                    })
                api.getPublicHeat(params)
                    .then(res=>{
                        //console.log(res)
                        _this.chartData = res.data
                    })
                api.getImportantOpinion(params)
                    .then(res=>{
                        //console.log(res)
                        _this.listData = res.data
                    })
            },
            //模拟下拉框
            showlist(){
                this.ok = !this.ok
            },
            selectLi(text) {
                this.choice = text
            },
            toggleClass(item){
                this.current = item
                let timeDring = event.target.innerHTML
                let params = {
                    industryId:this.industryId,
                    date:timeDring
                }
                let _this = this
                api.getImportantOpinion(params)
                    .then(res=>{
                        //console.log(res)
                        _this.listData = res.data
                    })
            }
        },
        match:{

        }
    }
</script>

<style scope>
    body,html{
        background: #fbfbfc;
        height: 100%;
    }
    .main-warp{
        width:1200px;
        margin:0 auto;
    }

    .main{
        padding:12px 20px 100px 20px;
        box-sizing: border-box;
        background: #fff;
        margin-top:20px;
        border-radius: 3px;
    }
    .main .public-title{
        font-size:16px;
        color:#484848;
        height:18px;
        line-height:18px;
        margin-bottom:16px;
    }
    .main .public-title:before{
        display: inline-block;
        width: 4px;
        margin-right:6px;
        height:100%;
        content:"";
        vertical-align:middle;
        overflow:hidden;
        background: -webkit-linear-gradient(top,#026bf0,#27b8ff);
    }
    .main table{
        width:100%;
        border:1px solid #cce1fc;
        color:#525558;
    }
    .thead tr{
        /*background: -webkit-linear-gradient(left,#e5f1ff,#f8fbff);*/
        background: #f1f7ff;
        height:38px;
        border:1px solid #cce1fc;
        text-align: center;
    }
    .thead tr th{
        border-right:1px solid #cce1fc;
    }
    .thead tr th:last-child{
        border-right:none;
    }
    .tbody tr{
        height:38px;
        border:1px solid #cce1fc;
    }
    .industry-trends .tbody tr td{
        border:1px solid #cce1fc;
        text-align: left;
        padding:0;
        box-sizing: border-box;
    }
    .industry-trends .tbody tr td:nth-child(1){
        width: 326px;
        padding:0 35px;
        box-sizing: border-box;
    }
    .industry-trends .tbody tr td:nth-child(2){
        width: 112px;
        text-align: center;
    }
    .industry-trends .tbody tr td:nth-child(3){
        width: 90px;
        padding: 0 26px;
        box-sizing: border-box;
    }
    .industry-trends .tbody tr td:nth-child(4){
        width:110px;
        text-align: center;
    }
    .industry-trends .tbody tr td:nth-child(5){
        width:80px;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .industry-trends .tbody tr td:nth-child(6){
        width: 160px;
        padding:0 20px;
        box-sizing: border-box;
    }
    .industry-trends .tbody tr td:nth-child(7){
        width: 280px;
        padding:0 30px;
        box-sizing: border-box;
    }
    .industry-trends .tbody tr td:nth-child(4),.industry-trends .tbody tr td:nth-child(2){
        text-align: center;
        padding-left:0;
    }
    .industry-trends .thead tr th:nth-child(1){
        width:326px;
    }
    .industry-trends .thead tr th:nth-child(2){
        width:112px;
    }
    .industry-trends .thead tr th:nth-child(3){
        width:90px;
    }
    .industry-trends .thead tr th:nth-child(4){
        width:110px;
    }
    .industry-trends .thead tr th:nth-child(5){
        width:80px;
    }
    .industry-trends .thead tr th:nth-child(6){
        width:160px;
    }
    .industry-trends .thead tr th:nth-child(7){
        width:280px;
    }
    .unuse {
        color:#ef2100;
    }
    .use{
        color:#00af10;
    }
    .main2,.main3{
        margin-top:20px;
    }
    .basic-info table td{
        padding-left:10px;
        box-sizing: border-box;
        text-align: left;
    }
    .echarts-box{
        width:1160px;
        height:355px;
        border:1px solid #cce1fc;
        border-radius: 3px;
        position: relative;
        z-index:8;
    }
    .echarts-box .select-date{
        position:absolute;
        right:40px;
        top:10px;
        z-index:9;
    }
    .echarts-box .select-date li{
        display: inline-block;
        font-size:12px;
        color:#888888;
        margin-left:55px;
        cursor: pointer;
    }
    .echarts-box .select-date li.active{
        color:#0092ff;
    }
    .echarts-box .select-date li:hover{
        text-shadow: 0 0 15px #333;
    }
    .money-total{
        color:#fd7e23;
        font-weight:bold;
    }
    .note{
        color:#939393;
        font-size:12px;
        height:30px;
        line-height:30px;
        padding-left:36px;
        box-sizing: border-box;
    }
    /*.main1 .note{*/
        /*margin-top:-35px;*/
    /*}*/
    .main3{
        position: relative;
    }
    .mnselect{
        position: absolute;
        right:0;
        top:0;
        display: inline-block;
        float: right;
        width:84px;
        height:25px;
        border:1px solid #cce1fc;
        border-radius: 3px;
        cursor: pointer;
    }
    .mnselect p{
        height:25px;
        line-height:25px;
        display: inline-block;
        padding-left:10px;
        box-sizing: border-box;
    }
    .mnselect i{
        position: relative;
        display: inline-block;
        float:right;
        height:27px;
        width:26px;
        margin:-1px;
        border-radius: 0 3px 3px 0;
        background: -webkit-linear-gradient(top,#026cf0,#26b5fe);
    }
    .mnselect i:before{
        position: absolute;
        left:9px;
        top:9px;
        content:'';
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 8px solid #fff;
    }
    .mnselect ul{
        width:84px;
        border:1px solid #cce1fc;
        border-radius: 3px;
        background:#fff;
    }
    .mnselect ul li{
        width:84px;
        height:25px;
        line-height: 25px;
        padding-left:10px;
        box-sizing: border-box;
    }
    .mnselect ul li:hover{
        background: #24a7fa;
        color: #fff;
    }
    .msg-list .list{
        border-bottom:1px dashed #d7e9fe;
        margin-bottom:15px;
    }
    .msg-list .company-type{
        width:54px;
        height:26px;
        border-radius: 3px;
        display: inline-block;
        text-align: center;
        line-height:26px;
        font-size:12px;
        color:#fff;
    }
    .msg-list .company-from{
        height:26px;
        display: inline-block;
        margin-left:24px;
        line-height:26px;
        font-size:14px;
        color:#999999;
    }
    .msg-list .company-date{
        height:26px;
        display: inline-block;
        float:right;
        line-height:26px;
        font-size:14px;
        color:#999999;
    }
    .msg-list .list-content{
        height:30px;
        line-height:30px;
    }
    .msg-list .list-content a{
        font-size:14px;
        color:#6aa1f6;
        text-decoration: none;
    }
    .msg-list .list-company{
        height:30px;
        line-height:30px;
        font-size:14px;
        color:#333333;
    }
    .msg-list .note{
        padding-left:0;
    }
    .natureOfCase0{
        background: -webkit-linear-gradient(top left,#ff6602,#fd8622);
    }
    .natureOfCase1{
        background: -webkit-linear-gradient(top left,#fda128,#fdbf2d);
    }
    .natureOfCase2{
        background: -webkit-linear-gradient(top left,#61b1fc,#6687f4);
    }
    .el-pager li,
    .el-pagination .btn-prev,
    .el-pagination .btn-next,
    .el-pager li:last-child{
        border:none;
    }
    .el-pagination{
        /*margin-top:20px;*/
    }
    .echarts-box>div:nth-child(2){
        display: block;
        background-color: transparent!important;
        border: none!important;
        border-width: 0!important;
        box-shadow:0 0 0 0 transparent!important;
    }
</style>