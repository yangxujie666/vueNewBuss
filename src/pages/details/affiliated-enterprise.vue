<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main affiliated">
                <div class="main1">
                    <h3 class="public-title">对外投资</h3>
                    <table class="table">
                        <thead class="thead">
                            <tr>
                                <th>被投资企业名称</th>
                                <th>被投资企业法人</th>
                                <th>地区</th>
                                <th>注册资本</th>
                                <th>成立日期</th>
                                <th>登记状态</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="(item,index) in main1Data">
                                <td :title="item.entName">{{item.entName}}</td>
                                <td>{{item.legalPerson}}</td>
                                <td>{{item.area}}</td>
                                <td>{{item.regAsset}}</td>
                                <td>{{item.registerDate}}</td>
                                <td class="unuse" :class="item.registerStatus === 0? 'use':''">{{item.registerStatusTxt}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-show="showPage">
                        <pagination
                                :pageSize="pageSize"
                                :total="total"
                                :layout="layout"
                                :pageCount="pageCount"
                                @pageChange="pageChange">
                        </pagination>
                    </div>

                </div>
                <div class="main2">
                    <h3 class="public-title">股东</h3>
                    <table  class="table2">
                        <thead class="thead">
                        <tr>
                            <th>股东名称</th>
                            <th>股东类型</th>
                            <th>证照/证件类型</th>
                            <th>证照/证件号码</th>
                        </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="(item,index) in main2Data">
                                <td :title="item.shareholderName">{{item.shareholderName}}</td>
                                <td>{{item.shareholderType}}</td>
                                <td>{{item.idType}}</td>
                                <td>{{item.idCode}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
                <div class="main3">
                    <h3 class="public-title">分支机构</h3>
                    <table class="table3">
                        <thead class="thead">
                            <tr>
                                <th>分支机构名称</th>
                                <th>分支机构注册号/统一社会信用代码</th>
                                <th>分支机构登记机关</th>
                                <th>登记状态</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="(item,index) in main3Data">
                                <td :title="item.branchName">{{item.branchName}}</td>
                                <td>{{item.branchSocietyCode}}</td>
                                <td>{{item.registerOrganization}}</td>
                                <td class="unuse" :class="item.registerStatus === 0? 'use':''">{{item.registerStatusTxt}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
                <div class="main4">
                    <h3 class="public-title">疑似关系</h3>
                    <table class="table">
                        <thead class="thead">
                            <tr>
                                <th>疑似企业名称</th>
                                <th>法人</th>
                                <th>地区</th>
                                <th>注册资本</th>
                                <th>成立日期</th>
                                <th>登记状态</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="(item,index) in main4Data">
                                <td :title="item.entName">{{item.entName}}</td>
                                <td>{{item.legalPerson}}</td>
                                <td>{{item.area}}</td>
                                <td>{{item.regAsset}}</td>
                                <td>{{item.registerDate}}</td>
                                <td class="unuse" :class="item.registerStatus === 0? 'use':''">{{item.registerStatusTxt}}</td>
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
    import pagination from '@/components/pagination/pagination.vue'
    export default {
        name: 'index',
        data() {
            return {
                industryId:'',
                layout: "next, pager,prev",
                page:1,
                pageSize:10,
                total:10,
                pageCount:1,
                main1Data:[],
                main2Data:[],
                main3Data:[],
                main4Data:[],
                entName:'',
                showPage:false
            }
        },
       mounted() {
          this.initBasicInfoData();
       },
       methods:{
            initBasicInfoData(){
              this.industryId = this.$route.params.id;
              this.entName = this.$route.params.name;
              let params = {
                industryId:this.industryId,
                page:this.page,
                pageSize: this.pageSize,
                entName:this.entName
              };
              let params1 = {
                    industryId:this.industryId
              };
              this.getInvestmentAbroad(params);
              this.getShareholder(params1);
              this.getBranch(params1);
              this.getSuspectedRelationship(params1);
            },
            getInvestmentAbroad (params){
                let _this = this
              api.getInvestmentAbroadData(params)
                .then(res => {
                    this.main1Data = res.data;

                    if(res.data.length>0){
                        _this.page = res.page
                        _this.total = res.totalRecord
                        _this.pageCount = _this.total/_this.pageSize
                        _this.showPage = true
                    }else{
                        _this.showPage = false
                    }
                })
            },
            getShareholder (params) {
              api.getShareholderData(params)
                .then(res => {
                    this.main2Data = res.data;
                    //console.log(res.data)
                })
            },
            getBranch (params) {
              api.getBranchData(params)
                .then(res => {
                  this.main3Data = res.data;
                })
            },
            getSuspectedRelationship (params) {
              api.getSuspectedRelationshipData(params)
                .then(res => {
                  this.main4Data = res.data;
                })
            },
           pageChange(msg){
                console.log(msg)
               this.page = msg
               let params = {
                   industryId:this.industryId,
                   page:this.page,
                   pageSize: this.pageSize,
                   entName:this.entName
               }
               this.getInvestmentAbroad(params)
           }
          },
        components:{
            pagination
        }
    }
</script>

<style scope>
    body,html{
        background: #fbfbfc;
        height: 100%;
    }
    .main-warp {
        width: 1200px;
        margin: 0 auto;
    }
    .main {
        padding: 12px 20px 100px 20px;
        box-sizing: border-box;
        background: #fff;
        margin-top: 20px;
        border-radius: 3px;
    }

    .main .public-title {
        font-size: 16px;
        color: #484848;
        height: 18px;
        line-height: 18px;
        margin-bottom: 16px;
    }

    .main .public-title:before {
        display: inline-block;
        width: 4px;
        margin-right: 6px;
        height: 100%;
        content: "";
        vertical-align: middle;
        overflow: hidden;
        background: -webkit-linear-gradient(top, #026bf0, #27b8ff);
    }

    .main table {
        width: 100%;
        border: 1px solid #cce1fc;
        color: #525558;
        table-layout: fixed;
    }

    .thead tr {
        /*background: -webkit-linear-gradient(left, #e5f1ff, #f8fbff);*/
        background: #f1f7ff;
        height: 38px;
        border: 1px solid #cce1fc;
        text-align: center;
    }

    .thead tr th {
        border-right: 1px solid #cce1fc;
    }

    .thead tr th:last-child {
        border-right: none;
    }

    .tbody tr {
        height: 38px;
        border: 1px solid #cce1fc;
    }

    .affiliated table tr td {
        height: 38px;
        border: 1px solid #cce1fc;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .affiliated table tr td:nth-child(1),.affiliated table tr th:nth-child(1){
        width:306px;
        padding:0 72px;
        box-sizing: border-box;
    }
    .affiliated .table tr td:nth-child(2),.affiliated .table tr th:nth-child(2){
        width:242px;

        box-sizing: border-box;
    }
    .affiliated .table tr td:nth-child(2){
        padding-left:100px;
    }
    .affiliated .table tr td:nth-child(3),.affiliated .table tr th:nth-child(3){
        width:218px;
        box-sizing: border-box;
    }
    .affiliated .table tr td:nth-child(3){
        padding-left:95px;
    }
    .affiliated .table tr td:nth-child(4),.affiliated .table tr th:nth-child(4){
        width:152px;
        box-sizing: border-box;
    }
    .affiliated .table tr td:nth-child(4){
        padding-left:34px;
    }
    .affiliated .table tr td:nth-child(5),.affiliated .table tr th:nth-child(5){
        width:142px;
        box-sizing: border-box;
    }
    .affiliated .table tr td:nth-child(5){
        padding-left:36px;
    }
    .affiliated .table tr td:nth-child(6),.affiliated .table tr th:nth-child(6){
        width:97px;
        box-sizing: border-box;
    }
    .affiliated .table tr td:nth-child(6){
        padding-left:34px;
    }
    .affiliated .table2 tr td:nth-child(2),.affiliated .table2 tr th:nth-child(2){
        width:242px;
        box-sizing: border-box;
    }
    .affiliated .table2 tr td:nth-child(2){
        padding-left:88px;
        padding-right:20px;
    }
    .affiliated .table2 tr td:nth-child(3),.affiliated .table2 tr th:nth-child(3){
        width:352px;
        box-sizing: border-box;
    }
    .affiliated .table2 tr td:nth-child(3){
        padding-left:142px;
        padding-right:20px;
    }
    .affiliated .table2 tr td:nth-child(4),.affiliated .table2 tr th:nth-child(4){
        width:260px;
        box-sizing: border-box;
    }
    .affiliated .table2 tr td:nth-child(4){
        padding-left:56px;
        padding-right:20px;
    }
    .affiliated .table3 tr td:nth-child(2),.affiliated .table3 tr th:nth-child(2){
        width:394px;
        text-align: center;
        box-sizing: border-box;
    }
    .affiliated .table3 tr td:nth-child(3),.affiliated .table3 tr th:nth-child(3){
        width:362px;
        text-align: center;
        box-sizing: border-box;
    }
    .affiliated .table3 tr td:nth-child(4),.affiliated .table3 tr th:nth-child(4){
        width:97px;
        text-align: center;
        box-sizing: border-box;
    }
    .unuse {
        color: #ef2100;
    }

    .use {
        color: #00af10;
    }
    .main2, .main3, .main4 {
        margin-top: 20px;
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



