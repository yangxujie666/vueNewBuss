<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main similar-enterprise">
                <div class="main1">
                    <h3 class="public-title">同行业顶尖企业</h3>
                    <table>
                        <thead class="thead">
                            <tr>
                                <th>企业名称</th>
                                <th>法人</th>
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
                                <td>{{item.legalPerson}}</td>
                                <td>{{item.entAddress}}</td>
                                <td>{{item.industry}}</td>
                                <td>{{item.	investAmount}}</td>
                                <td>{{item.registerDate}}</td>
                                <td :class="item.registStatus==0?'use':'unuse'">{{item.regStatus}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                </div>
                <div class="main2">
                    <h3 class="public-title">同行业新注册企业</h3>
                    <table>
                        <thead class="thead">
                            <tr>
                                <th>企业名称</th>
                                <th>法人</th>
                                <th>地区</th>
                                <th>行业</th>
                                <th>注册资本</th>
                                <th>成立日期</th>
                                <th>登记状态</th>
                            </tr>
                        </thead>
                        <tbody  class="tbody">
                            <tr v-for="(item,index) in main2Data">
                                <td>{{item.entName}}</td>
                                <td>{{item.legalPerson}}</td>
                                <td>{{item.entAddress}}</td>
                                <td>{{item.industry}}</td>
                                <td>{{item.	investAmount}}</td>
                                <td>{{item.registerDate}}</td>
                                <td :class="item.registStatus==0?'use':'unuse'">{{item.regStatus}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<simplifyPaging></simplifyPaging>-->
                    <div class="note">*注：新注册企业展现近3个月内注册的企业</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplifyPaging from '../../components/details/simplifyPaging.vue'
    import api from '../../api.js'
    export default {
        name:'index',
        data () {
            return {
                page:1,
                pageSize:5,
                industryId:'',
                main1Data:[],
                main2Data:[]
            }
        },

        mounted(){
          this.firstLoad()
        },
        methods: {
            firstLoad(){
                let _this = this
                this.industryId = this.$route.params.id;
                var params = {
                    industryId:this.industryId
                };
                api.getTopCompanies(params)
                    .then(function (res) {
                        console.log(res)
                        _this.main1Data = res.data
                    })
                api.getNewCompanies(params)
                    .then(res => {
                        console.log(res)
                        _this.main2Data = res.data
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
    .tbody tr td{
        height:38px;
        border:1px solid #cce1fc;
        text-align: left;
        /*padding-left:3%;*/
        box-sizing: border-box;
    }

    .similar-enterprise .tbody tr td:nth-child(1),.similar-enterprise .thead tr th:nth-child(1){
        width: 325px;
        padding: 0 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(2),.similar-enterprise .thead tr th:nth-child(2){
        width: 112px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;

    }
    .similar-enterprise .tbody tr td:nth-child(2){
        padding-left: 40px;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(3){
        padding-left: 40px;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(4){
        padding-left: 30px;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(5){
        padding-left: 35px;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(3),.similar-enterprise .thead tr th:nth-child(3){
        width: 108px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(4),.similar-enterprise .thead tr th:nth-child(4){
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(5),.similar-enterprise .thead tr th:nth-child(5){
        width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(6),.similar-enterprise .thead tr th:nth-child(6){
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        box-sizing: border-box;
    }
    .similar-enterprise .tbody tr td:nth-child(7),.similar-enterprise .thead tr th:nth-child(7){
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        box-sizing: border-box;
    }
    .thead tr th{
        text-align: center!important;
    }
    .similar-enterprise .tbody tr td:last-child{
        text-align: center;
        padding-left:0;
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
    .note{
        color:#939393;
        font-size:12px;
        height:30px;
        line-height:30px;
        padding-left:36px;
        box-sizing: border-box;
    }
    .main2 .note{
        /*margin-top:-35px;*/
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