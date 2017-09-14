<template>
    <div class="wrapper">
        <div class="header-wrapper">
            <div class="header">
                <a class="btn-back" @click="btnBack"><i></i>返回</a>
            </div>
        </div>
        <div class="main-list">
            <ul class="search-wrapper cf">
                <li class="has-choose" :class="{active: !hasChoose}">
                    <span class="l-title">已选条件</span>
                    <ul class="has-choose-con cf" id="has-choose-con" @click="xBtn">
                    </ul>
                    <a class="btn-clear" @click="btnClear">清空</a>
                </li>
                <li :class="{showhide: !showHide0}">
                    <span class="l-title l-title1">注册资本</span>
                    <ul class="search-con">
                        <li v-for="item in registerCapital" @click="searchLiClick(0)">{{item.name}}</li>
                    </ul>
                </li>
                <li :class="{showhide: !showHide1}">
                    <span class="l-title l-title2">注册时间</span>
                    <ul class="search-con">
                        <li v-for="item in registerTime" @click="searchLiClick(1)">{{item.name}}</li>
                    </ul>
                </li>
                <li class="area-height show-hide" :class="[{active: !moreFlag0},{showhide: !showHide2}]">
                    <span class="l-title l-title3">省份</span>
                    <ul class="search-con cf">
                        <li v-for="item in areaData" @click="searchLiClick(2)">{{item.name}}</li>
                    </ul>
                    <a class="btn-more" @click="moreBtnClick(0)">更多<i></i></a>
                </li>
                <li class="primary-height" :class="[{active: !moreFlag1},{showhide: !showHide3}]">
                    <span class="l-title l-title4">一级行业</span>
                    <ul class="search-con primary-industry cf">
                        <li v-for="item in primaryIndustry" @click="searchLiClick(3)">{{item.tradeName}}</li>
                    </ul>
                    <a class="btn-more" @click="moreBtnClick(1)">更多<i></i></a>
                </li>
                <li class="two-level-height" :class="[{active: !moreFlag2},{showhide: !showHide4}]">
                    <span class="l-title l-title5">二级行业</span>
                    <ul class="search-con primary-industry cf">
                        <li v-for="item in twoLevelIndustry" @click="searchLiClick(4)">{{item.name}}</li>
                    </ul>
                    <a class="btn-more" @click="moreBtnClick(2)">更多<i></i></a>
                </li>
            </ul>
            <div class="select-wrapper cf">
                <div class="select fl">
                    <el-select v-model="value" placeholder="默认排序" @change="selectChange">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <a class="export fr" @click="senddata">数据导出</a>
            </div>
            <div class="list-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>企业名称</th>
                            <th>行业</th>
                            <th>地区</th>
                            <th>法人</th>
                            <th>注册资本</th>
                            <th>注册日期</th>
                            <th>收藏</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tableData" class="table-tr">
                            <td class="first"><p @click="goToDetails(item.id,item.entName)">{{item.entName}}</p></td>
                            <td>{{item.industry}}</td>
                            <td>{{item.area}}</td>
                            <td>{{item.legalPerson}}</td>
                            <td>{{item.regAsset}}</td>
                            <td>{{item.regDate}}</td>
                            <td class="last" @click="favoriteBtn(item)"><i></i></td>
                        </tr>
                    </tbody>
                </table>
                <div class="pop-favorite" id="pop-favorite">
                    <span>已收藏</span>
                </div>
                <div class="pop-cancel-favorite" id="pop-cancel-favorite">
                    <span>已取消收藏</span>
                </div>
            </div>
            <div class="pagination" v-show="showPage">
                <pagination
                        :pageSize="pageSize"
                        :total="total"
                        :layout="layout"
                        :currentPage = "page"
                        :pageCount="pageCount"
                        @pageChange="pageChange">
                </pagination>
            </div>

        </div>
    </div>
</template>

<script>
  import pagination from '@/components/pagination/pagination.vue'
  import api from '../../api.js'

  export default {
    name:'index',
    data () {
      return {
        pageSize:10,
        total:1,
        pageCount:1,
        layout: "jumper, next, pager,prev",
        showHide0:true,
        showHide1:true,
        showHide2:true,
        showHide3:true,
        showHide4:false,
        showtwo:true,
        hasChoose: true,
        moreFlag0:true,
        moreFlag1:true,
        moreFlag2:true,
        span0:'',
        span1:'',
        span2:'',
        span3:'',
        span4:'',
        span5:'',
        registerCapital:[
          {name: '100万以下',id:1},
          {name: '100万-500万',id:2},
          {name: '500万-1000万',id:3},
          {name: '1000万-5000万',id:4},
          {name: '5000万以上',id:5}
        ],
        registerTime:[
          {name: '最近一周',id:1},
          {name: '最近一个月',id:2},
          {name: '最近3个月',id:3},
          {name: '最近6个月',id:4},
          {name: '最近1年',id:5}
        ],
        areaData:[],
        primaryIndustry:[],
        twoLevelIndustry:[
          {name:'商业服务与用品',id:1},
          {name:'耐用消费品与服装',id:2},
          {name:'酒店、餐馆与休闲 ',id:3},
          {name:'零售业',id:4},
          {name:'食品与主要用品零售',id:5},
          {name:'食品、饮料与烟草',id:1},
          {name:'家庭与个人用品',id:2},
          {name:'医疗保健设备与服务',id:3},
          {name:'制药与生物科技',id:4},
          {name:'技术硬件与设备',id:5},
          {name:'半导体与半导体生产设备',id:1},
        ],
        options: [
          {value: '注册资本最大',label: '注册资本最大'},
          {value: '注册资本最小',label: '注册资本最小'},
          {value: '成立时间最长',label: '成立时间最长'},
          {value: '成立时间最短',label: '成立时间最短'}
        ],
        value: '',
        tableData:[],
        regAsset:'',
        regDate:'',
        area:'',
        firstTradeId:'',
        secondTradeId:'',
        page:1,
        sort:'',
        showPage:false

      }
    },
    mounted(){
        this.firstLoad()

    },
      created(){
          console.log(document.getElementsByClassName("search-con")[0].offsetHeight)
      },
    methods: {
       firstLoad(){
           let _this = this
           let params = {
               page:1,
               pageSize:this.pageSize
           }
           api.getListArea()
               .then(res=>{
                   _this.areaData = res.data
               })
           api.getListTrade()
               .then(res=>{
                   _this.primaryIndustry = res.data
               })
           api.getListDetiles(params)
               .then(res=>{

                   if(res.data.length>0){
                       _this.tableData = res.data
                       _this.page = res.page
                       _this.total = res.totalRecord
                       _this.pageCount = Math.ceil(_this.total/_this.pageSize)
                       _this.showPage = true
                   }else{
                       _this.showPage = false
                   }
               })
       },
        //
        selectChange(){
            console.log(this.value)
            let params = {
                page:1,
                pageSize:this.pageSize,
                regAsset: this.span0,
                regDate: this.span1,
                area: this.span2,
                firstTradeId: this.span3,
                secondTradeId: this.span4,
                sort: this.value
            }
            let _this = this
            api.getListDetiles(params)
                .then(res=>{

                    if(res.data.length>0){
                        _this.tableData = res.data
                        _this.page = res.page
                        _this.total = res.totalRecord
                        _this.pageCount = Math.ceil(_this.total/_this.pageSize)
                        _this.showPage = true
                    }else{
                        _this.showPage = false
                    }
                })
        },
        //导出数据
        senddata() {
            let params = {
                 regAsset: this.span0,
                 regDate: this.span1,
                 area: this.span2,
                 firstTradeId: this.span3,
                 secondTradeId: this.span4,
                 sort: this.value
             }
            let baseurl = 'http://192.168.20.110:8069/newReg/entList/sendData'
            location.href = baseurl+"?regAsset="+this.span0+"&regDate="+this.span1+"&area="+this.span2+"firstTradeId="+this.span3+"secondTradeId="+this.span4+"sort="+this.value

        },
      moreBtnClick (n) {
        if (n === 0) {
          if (this.moreFlag0) {
            event.target.innerText = '收起';
            event.target.classList.add('active');
            console.log(document.getElementsByClassName("search-con")[0].offsetHeight)
          } else {
            event.target.innerText = '更多';
            event.target.classList.remove('active');
          }
          this.moreFlag0 = !this.moreFlag0;
        } else if (n === 1) {
          if (this.moreFlag1) {
            event.target.innerText = '收起';
            event.target.classList.add('active');
          } else {
            event.target.innerText = '更多';
            event.target.classList.remove('active');
          }
          this.moreFlag1 = !this.moreFlag1;
        } else if (n === 2) {
          if (this.moreFlag2) {
            event.target.innerText = '收起';
            event.target.classList.add('active');
          } else {
            event.target.innerText = '更多';
            event.target.classList.remove('active');
          }
          this.moreFlag2 = !this.moreFlag2;
        }
      },
      searchLiClick (n) {
        if (this.hasChoose) {
          this.hasChoose = !this.hasChoose;
        }
        let liCon = event.target.innerText;
        let html = '<span>'+liCon+'</span><i>x</i>';
        let ulNode = document.getElementById('has-choose-con');
        let liNode = document.createElement("li");
        liNode.innerHTML = html;
        ulNode.appendChild(liNode);
        if (n === 0){
          this.showHide0 = !this.showHide0;
          liNode.id='choose0';
          this.span0 = event.target.innerText;
        } else if (n === 1) {
          this.showHide1 = !this.showHide1;
          liNode.id='choose1';
          this.span1 = event.target.innerText;
        } else if (n === 2) {
          this.showHide2 = !this.showHide2;
          liNode.id='choose2';
          this.span2 = event.target.innerText;
        } else if (n === 3) {
          this.showHide3 = !this.showHide3;
          liNode.id='choose3';
          this.span3 = event.target.innerText;
          this.showHide4 = true;
        } else if (n === 4) {
          this.showHide4 = !this.showHide4;
          liNode.id='choose4';
          this.span4 = event.target.innerText;
        }
       /* let params = {
              page:this.page,
              pageSize:this.pageSize,
              regAsset: this.span0,
              regDate: this.span1,
              area: this.span2,
              firstTradeId: this.span3,
              secondTradeId: this.span4

        }
        let _this = this
        api.getListDetiles(params)
              .then(res=>{
                  _this.tableData = res.data
                  _this.page = res.page
                  _this.total = res.totalRecord
                  _this.pageCount = _this.total/_this.pageSize
        })*/
        this.getParams();

      },
      btnClear () {
        this.hasChoose = true;
        this.showHide0=true;
        this.showHide1=true;
        this.showHide2=true;
        this.showHide3=true;
        this.span0 = '';
        this.span1 = '';
        this.span2 = '';
        this.span3 = '';
        this.span4 = '';
//        this.showHide4=true;
        let ulCon = document.getElementById('has-choose-con');
        while(ulCon.hasChildNodes())
        {
          ulCon.removeChild(ulCon.firstChild);
        }
        this.getParams();
      },
      xBtn (e) {
        if(e.target.nodeName == "I"||e.target.nodeName == "SPAN") {
          let id = e.target.parentNode.id;
          if (id == 'choose0') {
            this.showHide0 = true;
            this.span0 = '';
          } else if (id == 'choose1') {
            this.showHide1 = true;
            this.span1 = '';
          } else if (id == 'choose2') {
            this.showHide2 = true;
            this.span2 = '';
          } else if (id == 'choose3') {
            this.showHide3 = true;
            this.span3 = '';
            if (this.showHide4) {
              this.showHide4 = false;
            }
          } else if (id == 'choose4') {
            this.showHide4 = true;
            this.span4 = '';
          }
          let parentNode = e.target.parentNode.parentNode;
          let liNode = e.target.parentNode;
          parentNode.removeChild(liNode);
          let length = parentNode.children.length;
          if (length === 0) {
            this.hasChoose = true;
          }
          this.getParams();

        }
      },
      getParams () {
          let params = {
              page:1,
              pageSize:this.pageSize,
              regAsset: this.span0,
              regDate: this.span1,
              area: this.span2,
              firstTradeId: this.span3,
              secondTradeId: this.span4,
              sort: this.value
          }
          let _this = this
          api.getListDetiles(params)
              .then(res=>{

                  if(res.data.length>0){
                      _this.tableData = res.data
                      _this.page = res.page
                      _this.total = res.totalRecord
                      _this.pageCount = Math.ceil(_this.total/_this.pageSize)
                      _this.showPage = true
                  }else{
                      _this.showPage = false
                  }
              })
      },
      btnBack () {
        this.$router.push('/index')
      },
      favoriteBtn (item) {
        let tableEle = document.getElementsByClassName("table-tr");
        let len = tableEle.length;
        let trNode = event.target.parentNode.parentNode;
        let popFavorite = document.getElementById("pop-favorite");
        let popCancelFavorite = document.getElementById("pop-cancel-favorite");
        for ( let i =0; i < len; i++) {
          tableEle[i].classList.remove('active');
        }
        trNode.classList.add('active');
        if (event.target.className) {
            //取消收藏
            let params = {
                id:item.entid
            }
            let _this = this
            let ev = event
            api.getCollectStatus1(params)
                .then(res=>{
                    ev.target.classList.remove('active');
                    popFavorite.classList .remove('active');
                    popCancelFavorite.classList .add('active');
                    setTimeout(function () {
                        popCancelFavorite.classList.remove('active')
                    },2000)
                })


        } else {

            let params = {
                id:item.id,
                entName: item.entName,
                industry: item.industry,
                area: item.area,
                legalPerson:item.legalPerson,
                regAsset:item.regAsset,
                regDate:item.regDate

            }
            console.log(params)
            let _this = this
            let ev = event
            api.getCollectStatus(params)
                .then(res=>{
                    ev.target.classList.add('active');
                    popFavorite.classList.add('active');
                    popCancelFavorite.classList .remove('active');
                    setTimeout(function () {
                        popFavorite.classList.remove('active');
                    },2000);
                })
        }
      },
      pageChange (val) {
          this.page = val;
          let params = {
              page:this.page,
              pageSize:this.pageSize,
              regAsset: this.span0,
              regDate: this.span1,
              area: this.span2,
              firstTradeId: this.span3,
              secondTradeId: this.span4

          }
          let _this = this
          api.getListDetiles(params)
              .then(res=>{
                  _this.tableData = res.data
                  _this.page = res.page
                  _this.total = res.totalRecord
                  _this.pageCount = _this.total/_this.pageSize
              })
        console.log(`你给后台发送的数据是 当前是第${val}页 每页${this.pageSize}条`)
      },
      goToDetails(id,name) {
          this.$router.push('/details/'+id+'/'+name)
          if (localStorage.getItem('n')){
              localStorage.removeItem('n')
          }
//          top.window.addTab(cloudEntUrl+name,name,'newRegDetiles'+id)
      }
    },
    components: {
      pagination
    }
  }
</script>

<style scope>
    body,html{
        width:100%;
        height:100%;
        background: #fbfbfc;
    }
    .app{
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
    .main-list {
        width: 1200px;
        margin: 0 auto;
        padding: 0;
    }
    .search-wrapper {
        margin: 20px 0;
        border: 1px solid #cce1fc;
        border-radius: 5px;
        background: #f8fbff;
        border-bottom: none;
        overflow:hidden;
    }
    .search-wrapper li {
        position: relative;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #cce1fc;
    }
    .l-title {
        position: absolute;
        width: 86px;
        height: 100%;
        padding-left: 30px;
        border-right: 1px solid #cce1fc;
        background: #e7f2ff;
        font-size: 14px;
        color: #666;
    }
    .search-con {
        float:left;
        width: 920px;
        margin-left: 110px;
        padding-left: 24px;
    }
    .search-con li {
        float: left;
        width: 100px;
        margin-right:0;
        border: none;
        font-size: 14px;
        color: #333;
    }
    .search-con li:hover {
        color: #1a69c4;
        cursor: pointer;
    }
    .btn-more {
        float: right;
        width: 58px;
        height: 24px;
        margin: 12px 30px 0 0;
        line-height: 24px;
        border: 1px solid #cce1fd;
        border-radius: 5px;
        background: url(../../../static/img/btn-more.png) no-repeat 38px 8px;
        font-size: 12px;
        color: #1a69c4;
        cursor: pointer;
        text-indent: 9px;
        -webkit-user-select:none;
        user-select:none;
    }

    .btn-more:hover {
        text-decoration: none;
        background-color: #cce1fd;
    }
    .btn-more.active {
        background: url(../../../static/img/btn-more1.png) no-repeat 38px 9px;
    }
    .area-height,
    .primary-height,
    .two-level-height {
        transition: height .5s linear;
        overflow:hidden;
    }
    .area-height.active,
    .primary-height.active,
    .two-level-height.active {
        height: 150px;
        transition: height .5s linear;
    }
    .primary-industry li {
        width: auto;
        margin-right: 30px;
    }
    /*.search-wrapper>li:last-child {*/
        /*border-bottom: none;*/
    /*}*/
    .has-choose {
        display: none;
    }
    .has-choose.active {
        display: block;
    }
    .has-choose .l-title {
        background: none;
        border: none;
        color: #ff0000;
    }
    .has-choose-con {
        float: left;
        width: 900px;
        margin-left: 110px;
        padding-left: 24px;
    }
    .has-choose-con li {
        position: relative;
        float: left;
        height: 26px;
        padding: 0 30px 0 15px;
        margin:11px 10px 0 0;
        line-height: 26px;
        border: 1px solid #faa664;
        background: #fff4eb;
        border-radius: 5px;
        font-size: 14px;
        color: #fd8425;
        cursor: pointer;
    }
    .has-choose-con li:hover{
        opacity: .7;
    }
    .has-choose-con li i {
        position: absolute;
        right: 10px;
        top: -1px;
        cursor: pointer;
    }
    .btn-clear {
        float: right;
        width: 58px;
        height: 24px;
        margin: 12px 30px 0 0;
        line-height: 24px;
        border: 1px solid #7fb5f8;
        background: rgba(21,142,244,.08);
        border-radius: 5px;
        color: #3274c8;
        text-align: center;
        cursor: pointer;
    }
    .btn-clear:hover {
        background: rgba(21,142,244,.18);
        text-decoration: none;
    }
    .search-wrapper>li.showhide {
        display: none;
    }
    .btn-back {
        float: right;
        width: 70px;
        height: 26px;
        margin-top: 21px;
        line-height: 26px;
        border: 1px solid #016adc;
        border-radius: 5px;
        color: #007beb;
        font-size: 12px;
        cursor: pointer;
    }
    .btn-back i {
        float: left;
        width: 13px;
        height: 11px;
        margin: 7px 8px 0 12px;
        background: url(../../../static/img/btn-back.png) no-repeat;
    }
    .btn-back:hover {
        background: #016adc;
        color: #fff;
        text-decoration: none;
    }
    .btn-back:hover i {
        background: url(../../../static/img/btn-back1.png) no-repeat;
    }
    .l-title1 {
        background: -webkit-linear-gradient(top, #e5f1ff, #e9f3ff);
    }
    .l-title2 {
        background: -webkit-linear-gradient(top, #e9f3ff, #eff6ff);
    }
    .l-title3 {
        background: -webkit-linear-gradient(top, #eff6ff, #f4f9ff);
    }
    .l-title4 {
        background: -webkit-linear-gradient(top, #f4f9ff, #f8fbff);
    }
    .l-title5 {
        background: -webkit-linear-gradient(top, #f8fbff, #fbfdff);
    }
    .export {
        width: 70px;
        height: 26px;
        line-height: 26px;
        background: -webkit-linear-gradient(right, #f98d3a, #fda865);
        border-radius: 5px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
    .export:hover {
        background: #f98d3a;
        text-decoration: none;
    }
    .list-table {
        position: relative;
        margin: 20px 0;
    }
    .list-table table {
        width: 100%;
        border: 1px solid #cce1fc;
        color: #4c4c4c;
        text-align: center;
    }
    .list-table table thead {
       // background: -webkit-linear-gradient(right, #f8fbff, #e5f1ff);
        background: #f1f7ff;
    }
    .list-table table thead tr {
        border-bottom: 1px solid #cce1fc;
    }
    .list-table table thead tr th {
        font-size: 12px;
        color: #4c4c4c;
    }
    .list-table table tr {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #cce1fc;
    }
    .list-table tbody tr td,
    .list-table thead tr th {
        border-right: 1px solid #cce1fc;
    }
    .list-table tbody tr:last-child {
        border-bottom: none;
    }
    .list-table table tr td:last-child,
    .list-table thead tr th:last-child {
        border-right: none;
    }
    .list-table table tr td.first p{
        width: 250px;
        color: #1a69c4;
        text-align: left;
        text-indent: 30px;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
        cursor: pointer;
    }
    .table td i {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../static/img/no-favorite.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        vertical-align: middle;
    }

    .table td i.active {
        background: url(../../../static/img/favorite.png) no-repeat;
    }
    .table td.last {
        padding: 0 10px;
    }
    .table-tr:hover,
    .table-tr.active {
        background: #dfedfe;
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
</style>
