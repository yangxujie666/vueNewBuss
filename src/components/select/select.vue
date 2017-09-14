<template>
    <div class="select-wrapper cf">
        <div class="area-container fl">
            <span class="area-name fl">全国</span>
            <i class="drow-icon fr" @click="showArea"></i>
            <div class="area-select-container" v-show="showarea">
                <div class="area-items-box">
                    <div class="area-items" v-for="item in areaData">
                        <p class="area-during">{{item.areadetiles}}</p>
                        <ul class="area-info">
                            <li class="lis" v-for="val in item.area" @click="selectedArea(val)">{{val.name}}</li>
                        </ul>
                    </div>
            </div>
            </div>
        </div>
        <div class="trade-container fl">
            <span class="area-name fl" v-text="transText">{{transText}}</span>
            <i class="drow-icon fr" @click="showSrade"></i>
            <div class="area-showsrade-container" v-show="showsrade">
                <div class="trade-title cf">
                    <span class=""fl>选择行业</span>
                    <i class="close fr" @click="hideTrade"></i>
                </div>
                <div class="trade-select-wrapper">
                    <div class="trade-select-container">
                        <div class="trade-tap">
                            <div class="all-trade" @click="showFirst">
                                <span :class="spanShow==1?'active':''">全部行业</span>
                                <i class="down"></i>
                            </div>
                            <div class="second-trade" v-show="secondTrade">
                                <span id="second-trade">科学研究、技术服务和地质勘查</span>
                                <i class="down"></i>
                            </div>
                        </div>
                        <div class="trade-detiles-box">
                            <div class="trade-detiles"  v-show="firstDetiles">
                                <ul class="first-trade-detiles">
                                    <li class="trade-li" v-for="val in ftradeData" @click="selectFirsttrade(val)">{{val.tradeName}}</li>
                                </ul>
                            </div>
                            <div class="trade-detiles"  v-show="secondDetiles">
                                <ul class="first-trade-detiles">
                                    <li class="trade-lis" v-for="val in stradeData" @click="selectSecondtrade(val)">{{val}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="handle">
                        <span class="cansel" @click="cansel">取消</span>
                        <span class="sure" @click="sure">确定</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="time-container fr">
            <p class="time-during fl">时间范围：</p>
            <p class="fl">
                <el-radio-group v-model="radio" @change="change">
                    <el-radio class="radio" label="1周">1周</el-radio>
                    <el-radio class="radio" label="1个月">1个月</el-radio>
                    <el-radio class="radio" label="3个月">3个月</el-radio>
                    <el-radio class="radio" label="6个月">6个月</el-radio>
                    <el-radio class="radio" label="1年">1年</el-radio>
                </el-radio-group>
            </p>
        </div>
    </div>
</template>

<script>
    import api from '../../api.js'
//    import axios from 'axios'
    export default {
        name:"selects",
        data(){
            return {
                areaData:[

                    ],
                ftradeData:[],
                stradeData:['农业','林业','畜牧业','渔业','农、木、牧、渔业'],
                radio:"1周",
                showarea: false,
                showsrade: false,
                secondTrade: false,
                firstDetiles:true,
                secondDetiles: false,
                transText:'全部行业',
                spanShow:0
            }
        },
        mounted(){
            this.firstLoad()
        },
        methods:{
            //获取数据
            firstLoad() {
                let _this = this
                api.getAreaData()
                    .then(res=>{
                        //console.log(res)
                        _this.areaData = res.data
                    })
                api.getTrade()
                    .then(res=>{
                        //console.log(res)
                        _this.ftradeData = res.data
                    })
            },
            //页面事件
            change(param){
               this.$emit("getTime",{page:2,text:param})
            },
            showArea(){
                this.showsrade = false
                this.showarea = !this.showarea
                console.log(this.showarea)
            },
            selectedArea(val){
                // 弹出框
                document.getElementsByClassName("area-select-container")[0].style.display = "none"
                this.showarea = false
                // 文本赋值
                document.getElementsByClassName("area-name")[0].innerHTML = val.name;
                //父组件传参
                this.$emit("getTime",{page:0,text:val})
                //添加类
                let lis = document.getElementsByClassName("lis")
                for(let a = 0;a<lis.length;a++){
                    lis[a]. classList.remove("active")
                }
                event.target.classList.add("active")
            },
            showSrade() {
                this.showarea = false
                this.showsrade = !this.showsrade
                this.secondTrade = false
                this.secondDetiles = false
                this.firstDetiles = true
                this.spanShow = 0
                //一级行业初始化
                let lis = document.getElementsByClassName('trade-li')
                for(let b = 0;b<lis.length;b++){
                    lis[b].classList.remove("active")
                }
                //二级行业初始化
                let lisc = document.getElementsByClassName('trade-lis')
                for(let b = 0;b<lisc.length;b++){
                    lisc[b].classList.remove("active")
                }
            },
            selectFirsttrade(text){
                this.secondTrade = true
                this.secondDetiles = true
                this.firstDetiles = false
                this.spanShow = 1
                document.getElementById('second-trade').innerHTML = text.tradeName
                let lis = document.getElementsByClassName('trade-li')
                for(let b = 0;b<lis.length;b++){
                    lis[b].classList.remove("active")
                }
                event.target.classList.add("active")
                //二级行业初始化
                let lisc = document.getElementsByClassName('trade-lis')
                for(let b = 0;b<lisc.length;b++){
                    lisc[b].classList.remove("active")
                }
                let _this = this
                let param = {
                    industyId:text.industyId
                }
                /*api.getTrade()

                    .then(res=>{
                        console.log(res)
                        _this.stradeData = res.data
                    })*/
            },
            selectSecondtrade(){
                let lis = document.getElementsByClassName('trade-lis')
                for(let b = 0;b<lis.length;b++){
                    lis[b].classList.remove("active")
                }
                event.target.classList.add("active")
            },
            showFirst(){
                this.secondTrade = false
                this.secondDetiles = false
                this.firstDetiles = true
                this.spanShow = 0
            },
            hideTrade() {
                this.showsrade =  false
            },
            cansel(){
                this.showsrade = false
            },
            sure() {
                if(document.getElementsByClassName("trade-lis active").length>0){
                    let first = document.getElementsByClassName("trade-lis active")[0].innerHTML
                    this.transText = first
                }else if(this.secondTrade){
                    let second = document.getElementById("second-trade").innerHTML
                    this.transText = second
                }else{
                    document.getElementsByClassName("area-name")[1].innerHTML = "全部行业"
                    this.transText = "全部行业"
                }
                this.showsrade = false
                this.$emit("getTime",{page:1,text:this.transText})
            }
        }

    }
</script>

<style scoped>
    body{
        font-size: 14px;
    }
    .time-during{
        font-size: 14px;
        color: #444444;
    }
    .area-container,.trade-container{
        width: 130px;
        height:28px;
        border: 1px solid #c1dcff;
        border-radius: 5px;
        background: #fff;
        margin-right: 34px;
        position: relative;
    }
    .area-select-container{
        position: absolute;
        width: 375px;
        height: 320px;
        border: 1px solid #c1dcff;
        border-radius: 5px;
        box-shadow: 0 0 3px 2px rgba(6,15,242,.1);
        background: #fff;
        top: 36px;
        left: 0;
        z-index: 2;
        padding: 16px 10px 16px 16px;
        box-sizing: border-box;
    }
    .area-items-box{
        height: 100%;
        overflow-y: auto;
    }
   /* .area-items-box .area-items:nth-child(1) li.lis{
        background: #24a7fa;
        color: #fff;
    }*/
    .area-select-container::after,.area-showsrade-container::after{
        content: "";
        width:10px ;
        height: 10px;
        background: #fff;
        box-shadow: -2px -2px 0px 1px rgba(6,15,242,.1);
        transform:rotateZ(45deg);
        position: absolute;
        top: -3px;
        left: 20px;
        z-index:3;
    }
    .area-showsrade-container::after{
        background: #e7f1ff;
    }
    .area-items{
        display: flex;
        box-sizing: border-box;

    }
    .area-during{
        margin-right: 14px;
        font-size: 14px;
        font-weight:bold;
        height: 22px;
        line-height: 22px;
        color: #333333;
    }
    .area-info{
        flex:1;
        display: flex;
        box-sizing: border-box;
        flex-wrap: wrap;
    }
    .area-info li{
        width: 52px;
        height: 24px;
        border: 1px solid #cce1fc;
        border-radius: 5px;
        text-align: center;
        line-height: 24px;
        margin-right: 6px;
        margin-bottom: 6px;
        color: #333333;
        font-size: 14px;
        cursor: pointer;
    }
    .area-info li:hover{
        background: #dfedfe;
    }
    .area-info li.active{
        background: #24a7fa;
        color: #fff;
    }
    /*行业*/
    .area-showsrade-container{
        position: absolute;
        top: 36px;
        left: 0;
        width: 755px;
        height: 435px;
        border: 1px solid #c1dcff;
        border-radius: 5px;
        box-shadow: 0 0 3px 2px rgba(6,15,242,.1);
        background: #fff;
        z-index: 5;
        box-sizing: border-box;
        /*display: none;*/
    }
    .trade-title{
        width: 100%;
        height:42px;
        background: -webkit-linear-gradient(left, #e7f1ff, #f8fbff);
        border-bottom: 1px solid #cce1fc;
    }
    .trade-title span{
        color: #444444;
        font-size: 14px;
        line-height: 42px;
        padding-left: 17px;
    }
    .trade-select-wrapper{
        width: calc(100% - 30px);
        height: 364px;
        margin: 15px;
        box-sizing: border-box;
    }
    .trade-select-container{
        height: 320px;
        width: 100%;
    }
    .trade-detiles-box{
        height: 280px;
        width: 100%;
        border: 1px solid #cce1fc;
        border-radius:0 5px 5px 5px;
        box-sizing: border-box;
    }
    .trade-tap{
        height: 40px;
        line-height: 40px;
        display: flex;
    }
    .trade-tap>div{
        height: 40px;
        line-height: 40px;
        padding:0 60px 0 20px;
        border: 1px solid #cce1fc;
        border-bottom: none;
        border-radius: 5px 5px 0 0;
        position: relative;
        font-size: 14px;
        color: #444444;
    }
    .trade-tap>div.all-trade{
        cursor: pointer;
    }
    .trade-tap>div.second-trade{
        background: #f3f8ff;
    }
    .all-trade span.active{
        color: #999999;
    }
    .down{
        width: 16px;
        height: 8px;
        position: absolute;
        background: url(../../../static/img/down.png) no-repeat center;
        top: 16px;
        right: 16px;
    }
    .first-trade-detiles{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
    }
    .first-trade-detiles li{
        width: 33.3%;
        height: 36px;
        line-height: 36px;
        color: #444444;
        font-size: 14px;
        cursor: pointer;
        float: left;
    }
    .first-trade-detiles li:hover,
    .first-trade-detiles li.active{
        color: #1a69c4;
    }
    .first-trade-detiles li:hover{
        font-weight: 600;
    }
    /*操作按钮*/
    .close{
        width: 12px;
        height: 12px;
        background: url(../../../static/img/close.png) no-repeat center;
        margin: 13px 17px 0 0;
        cursor: pointer;
        -webkit-transform:rotateZ(0);
    }
    .close:hover{
        -webkit-transform:rotateZ(180deg);
        transition: all .5s linear ;
    }
    .handle{
        width: 100%;
        text-align: right;
        margin-top: 15px;
    }
    .handle span{
        display: inline-block;
        width: 80px;
        height: 30px;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        outline: none;
        margin-left: 18px;
        cursor: pointer;
    }
    .handle span.cansel{
        background:-webkit-linear-gradient(left,#fba866,#fa7712);
    }



    .handle span.cansel:hover {
        background: #fa7712;
    }
    .handle span.sure{
        background:-webkit-linear-gradient(left,#61b1fc,#6d8ef9);
    }

    .handle span.sure:hover{
        background: #6d8ffa;
    }

    .area-name{
        padding-left: 10px;
        color: #444444;
        font-size: 14px;
        width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .drow-icon{
        display: inline-block;
        width: 28px;
        height: 28px;
        background: url(../../../static/img/drow.png) no-repeat center;
        cursor: pointer;
    }
    .drow-icon:hover{
        opacity: .8;
    }
</style>
