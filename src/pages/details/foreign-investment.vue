<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main foreign">
                <div class="main1">
                    <h3 class="public-title">担任法人</h3>
                    <table>
                        <thead class="thead">
                        <tr>
                            <th>企业名称</th>
                            <th>地区</th>
                            <th>行业</th>
                            <th>注册资本</th>
                            <th>成立日期</th>
                            <th>登记状态</th>
                        </tr>
                        </thead>
                        <tbody  class="tbody">
                            <tr v-for="(item,index) in main1Data">
                                <td>{{item.entName}}</td>
                                <td>{{item.area}}</td>
                                <td>{{item.industry}}</td>
                                <td>{{item.regAsset}}</td>
                                <td>{{item.registerDate}}</td>
                                <td class="unuse" :class="item.registerStatus === 0? 'use':''">{{item.registerStatusTxt}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
                <div class="main2">
                    <h3 class="public-title">在外任职</h3>
                    <table>
                        <thead class="thead thead2">
                            <tr>
                                <th>企业名称</th>
                                <th>职位</th>
                                <th>地区</th>
                                <th>行业</th>
                                <th>注册资本</th>
                                <th>法人</th>
                                <th>登记状态</th>
                            </tr>
                        </thead>
                        <tbody  class="tbody tbody2">
                            <tr v-for="(item,index) in main2Data">
                                <td>{{item.entName}}</td>
                                <td>{{item.position}}</td>
                                <td>{{item.area}}</td>
                                <td>{{item.industry}}</td>
                                <td>{{item.regAsset}}</td>
                                <td>{{item.legalPerson}}</td>
                                <td class="unuse" :class="item.registerStatus === 0? 'use':''">{{item.registerStatusTxt}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
                <div class="main3">
                    <h3 class="public-title">对外投资</h3>
                    <table>
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
                        <tbody  class="tbody tbody3">
                            <tr v-for="(item,index) in main3Data">
                                <td>{{item.entName}}</td>
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
    import simplifyPaging from '../../components/details/simplifyPaging.vue'
    export default {
        name:'index',
        data () {
            return {
                page:1,
                pageSize:5,
                industryId:'',
                main1Data:[],
                main2Data:[],
                main3Data:[]
            }
        },
      mounted() {
        this.initBasicInfoData();
      },
      methods:{
        initBasicInfoData(){
          this.industryId = this.$route.params.id;
          var params = {
            industryId:this.industryId,
            page:this.page,
            pageSize: this.pageSize
          };
          this.getLegalPerson(params);
          this.getHoldOfficeOutside(params);
          this.getSuspectedRelationship1(params);
        },
        getLegalPerson (params){
          api.getLegalPersonData(params)
            .then(res => {
              this.main1Data = res.data;
            })
        },
        getHoldOfficeOutside (params) {
          api.getHoldOfficeOutsideData(params)
            .then(res => {
              this.main2Data = res.data;
            })
        },
        getSuspectedRelationship1 (params) {
          api.getSuspectedRelationshipData1(params)
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
    .foreign .tbody tr td{
        height:38px;
        border:1px solid #cce1fc;
        text-align: left;
        box-sizing: border-box;
    }
    .foreign .tbody tr td:nth-child(1){
        width:285px;
        padding:0 30px;
    }
    .foreign .tbody tr td:nth-child(2){
        width: 266px;
        padding-left: 120px;
    }
    .foreign .tbody tr td:nth-child(3){
        width:216px;
        padding-left: 50px;
    }
    .foreign .thead tr th:nth-child(3){
        width:216px;
    }
    .foreign .thead tr th:nth-child(2){
        width:266px;
    }
    .foreign .thead tr th:nth-child(4){
        width:156px;
    }
    .foreign .thead tr th:nth-child(5){
        width:140px;
    }
    .foreign .thead tr th:nth-child(6){
        width:97px;
    }
    .foreign .thead tr th:nth-child(1){
        width:285px;
    }
    .foreign .tbody3 tr td:nth-child(3){
        width:216px;
        padding-left: 93px;
    }
    .foreign .tbody tr td:nth-child(4){
        width:156px;
        padding:0 30px;
    }
    .foreign .tbody tr td:nth-child(5){
        width:140px;
        text-align: center;
    }
    .foreign .tbody tr td:nth-child(6){
        width:97px;
        text-align: center;
    }
    .foreign .tbody2 tr td{
        box-sizing: border-box;
    }
    .foreign .tbody2 tr td:nth-child(1){
        width:285px;
        padding:0 30px;
    }
    .foreign .tbody2 tr td:nth-child(2){
        width: 150px;
        padding-left: 50px;
    }
    .foreign .tbody2 tr td:nth-child(3){
        width:118px;
        padding-left: 46px;
    }
    .foreign .tbody2 tr td:nth-child(4){
        width:216px;
        padding-left: 50px;
    }
    .foreign .tbody2 tr td:nth-child(5){
        width:156px;
        padding:0 30px;
    }
    .foreign .tbody2 tr td:nth-child(6){
        width:140px;
        text-align: center;
    }
    .foreign .tbody2 tr td:nth-child(7){
        width:97px;
        text-align: center;
    }
    .foreign .thead2 tr th:nth-child(3){
        width:116px;
    }
    .foreign .thead2 tr th:nth-child(2){
        width:150px;
    }
    .foreign .thead2 tr th:nth-child(4){
        width:216px;
    }
    .foreign .thead2 tr th:nth-child(5){
        width:156px;
    }
    .foreign .thead2 tr th:nth-child(6){
        width:140px;
    }
    .foreign .thead2 tr th:nth-child(7){
        width:97px;
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
    .foreign table td:last-child{
        padding-left:0;
        box-sizing: border-box;
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



