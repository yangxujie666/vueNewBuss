<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main basic-info">
                <div class="main1">
                    <h3 class="public-title">工商注册信息</h3>
                    <table>
                        <tbody  class="tbody">
                        <tr>
                            <td>统一社会信用码/注册码</td>
                            <td>{{societyCode}}</td>
                            <td>法定代表人</td>
                            <td>{{legalPerson}}</td>
                        </tr>


                        <tr>
                            <td>企业名称</td>
                            <td>{{entName}}</td>
                            <td>成立日期</td>
                            <td>{{registerDate}}</td>
                        </tr>
                        <tr>
                            <td>注册资本</td>
                            <td>{{regAsset}}</td>
                            <td>企业类型</td>
                            <td>{{entType}}</td>
                        </tr>
                        <tr>
                            <td>营业期限自</td>
                            <td>{{termOperationStart}}</td>
                            <td>营业期限至</td>
                            <td>{{termOperationEnd}}</td>
                        </tr>
                        <tr>
                            <td>登记机关</td>
                            <td>{{regAuthority}}</td>
                            <td>核准日期</td>
                            <td>{{issueDate}}</td>
                        </tr>
                        <tr>
                            <td>登记状态</td>
                            <td>{{regStatus}}</td>
                            <td>注销日期</td>
                            <td>{{logoutDate}}</td>
                        </tr>
                        <tr>
                            <td>注册地址</td>
                            <td colspan="3">{{residence}}</td>
                        </tr>
                        <tr>
                            <td>经营范围</td>
                            <td colspan="3">{{scopeBusiness}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="main2">
                    <h3 class="public-title">股东信息</h3>
                    <table>
                        <thead class="thead">
                            <tr>
                                <th>序号</th>
                                <th>股东名称</th>
                                <th>股东类型</th>
                                <th>证照/证件类型</th>
                                <th>证照/证件号码</th>
                            </tr>
                        </thead>
                        <tbody  class="tbody">
                            <tr v-for="(item,index) in main2Data">
                                <td>{{index +1}}</td>
                                <td>{{item.shareholderName}}</td>
                                <td>{{item.shareholderType}}</td>
                                <td>{{item.idType}}</td>
                                <td>{{item.idCode}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
                <div class="main3">
                    <h3 class="public-title">主要成员</h3>
                    <table>
                        <thead class="thead">
                        <tr>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>职务</th>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>职务</th>
                        </tr>
                        </thead>
                        <tbody  class="tbody">
                            <tr v-for="(item,index) in main3Data">
                                <td>{{index+1}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.duty}}</td>
                                <td>{{index+4}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.duty}}</td>

                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import simplifyPaging from '../../components/details/simplifyPaging.vue'
    export default {
        name:'index',
        data () {
            return {
              entName:'',
              entType:'',
              issueDate:'',
              legalPerson:'',
              logoutDate:'',
              regAsset:'',
              regAuthority:'',
              regStatus:'',
              registerDate:'',
              residence:'',
              scopeBusiness:'',
              societyCode:'',
              termOperationEnd:'',
              termOperationStart:'',
              main2Data:[],
              main3Data: [],
              industryId:'',
              page:1,
              pageSize:5
            }
        },
        mounted(){
          this.initBasicInfoData();
        },
        methods:{
          initBasicInfoData(){
            this.industryId = this.$route.params.id;
            var params = {
              industryId:this.industryId
            };
            this.getIndustryRegistrateInfo(params);
            this.getShareholderInfo(params);
            this.getKeyPersonnel(params);
          },
          getIndustryRegistrateInfo (params) {
            api.getIndustryRegistrateInfoData(params)
              .then(res => {
                this.entName=res.data.industryRegistrateInfo.entName;
                this.entType=res.data.industryRegistrateInfo.entType;
                this.issueDate=res.data.industryRegistrateInfo.issueDate;
                this.legalPerson=res.data.industryRegistrateInfo.legalPerson;
                this.logoutDate=res.data.industryRegistrateInfo.logoutDate;
                this.regAsset=res.data.industryRegistrateInfo.regAsset;
                this.regAuthority=res.data.industryRegistrateInfo.regAuthority;
                this.regStatus=res.data.industryRegistrateInfo.regStatus;
                this.registerDate=res.data.industryRegistrateInfo.registerDate;
                this.residence=res.data.industryRegistrateInfo.residence;
                this.scopeBusiness=res.data.industryRegistrateInfo.scopeBusiness;
                this.societyCode=res.data.industryRegistrateInfo.societyCode;
                this.termOperationEnd=res.data.industryRegistrateInfo.termOperationEnd;
                this.termOperationStart=res.data.industryRegistrateInfo.termOperationStart;
              })
          },
          getShareholderInfo (params) {
            api.getShareholderInfoData(params)
              .then(res => {
                this.main2Data = res.data;
              })
          },
          getKeyPersonnel(params) {
            api.getKeyPersonnelData(params)
              .then(res => {
                this.main3Data = res.data;
              })
          }
        },
        components:{
            simplifyPaging
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
        table-layout: fixed;
    }
    .thead tr{
       /* background: -webkit-linear-gradient(left,#e5f1ff,#f8fbff);*/
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
    .tbody tr td{
        border:1px solid #cce1fc;
        text-align: left;
        padding:10px;
        box-sizing: border-box;
    }
    .basic-info .tbody tr td:nth-child(odd){
        width:15%;
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
    .basic-info .main1 .tbody tr td:nth-child(odd){
        /*background: -webkit-linear-gradient(left,#e5f1ff,#f8fbff);*/
        background: #f1f7ff;
        text-align: center;
    }
    .basic-info .main2 .tbody tr td:first-child{
        width:8%;
        text-align: center;
    }
    .basic-info .main2 .tbody tr td:not(:first-child){
        width:23%;
        text-align: center;
    }
    .basic-info .main2 .tbody tr td:nth-child(2){
        padding-left:50px;
        box-sizing: border-box;
        text-align: left;
    }
    .basic-info .main3 tr td{
        width:21%;
        text-align: center;
    }
    .basic-info .main2 tr td:nth-child(1),
    .basic-info .main2 tr th:nth-child(1){
        width:86px;
        text-align: center;
    }
    /*.basic-info .main2 tr td:nth-child(2),*/
    /*.basic-info .main2 tr th:nth-child(2){*/
        /*width:270px;*/
        /*text-align: center;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
    /*}*/
    .basic-info .main3 tr td:nth-child(1),
    .basic-info .main3 tr th:nth-child(1){
        width:86px;
        text-align: center;
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
</style>

