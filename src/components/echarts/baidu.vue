<template>
    <div class="maps-wrapper">
        <div id="allmap"></div>
        <div id="r-result">
            <input type="text" id="suggestId" placeholder="请输入地名或街道名" />
            <i class="serach"></i>
        </div>
        <div id="searchResultPanel"></div>
    </div>
</template>

<script>
    // 引入基本模板

//    import  '../../assets/js/baidu2.js'
//    import '../../assets/js/baidu.js'
    export default {
        name: 'baidu',
        props:["mapdata"],
        data(){
            return {
                'listParam':{
                    isShow:false,
                    point:[],
                    infoData:{},
                    listData:[]
                },
                "listPoint": []
            }

        },
        mounted (){
            let that = this
            let map = new BMap.Map("allmap");
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 6);
            map.enableScrollWheelZoom();

            let icon = new BMap.Icon("../../../static/img/root.png", new BMap.Size(52, 52));
        },
        methods:{
                mapInit(pointData,listData,infoData,centerPoint) {
                    let that = this
                    let map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 6);
                    map.enableScrollWheelZoom();

                    let icon = new BMap.Icon("../../../static/img/root.png", new BMap.Size(52, 52));


                    //let MAX = 2000;
                    let markers = [];
                    /*for (let i = 0; i < MAX; i++) {
                        let point = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
                        let marker = new BMap.Marker(point);
                        // 具体位置添加点击事件
                        marker.addEventListener("click",function(e){
//                    console.log(e)
                            that.listParam.isShow = true
                            that.listParam.point = e.point
                            that.$emit("showlist",that.listParam);
                        });
                        markers.push(marker);
                    }*/
                    pointData.forEach(function(v,i){
                        let point = new BMap.Point(v[0], v[1]);
                        let marker = new BMap.Marker(point);
                        // 具体位置添加点击事件
                        marker.addEventListener("click",function(e){
                            that.listParam.isShow = true
                            that.listParam.point = e.point
                            that.listParam.infoData = infoData[i]

                            console.log(that.listParam)
                            that.$emit("showlist",that.listParam)
                        });
                        markers.push(marker);
                    })
                    //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
                    let markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});




                    //地图放大功能--可以用来修改右侧列表
                    map.addEventListener("zoomend",function(type, target){
//                        console.log("type",type);
//                        console.log("lng:" + map.getViewport().center.lng + "  lat:"+map.getViewport().center.lat);
//                        console.log("地图缩放至：" + this.getZoom() + "级");
//                        console.log(map.getViewport())
                        that.listPoint = [map.getViewport().center.lng,map.getViewport().center.lat]
                        that.$emit("showlistPoint",that.listPoint)
                    })

//            let top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
                    let top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
//            map.addControl(top_left_control);
                    map.addControl(top_left_navigation);


                    //搜索功能
                    // 百度地图API功能
                    function G(id) {
                        return document.getElementById(id);
                    }
                    // 初始化地图,设置城市和地图级别。

                    let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                        {"input" : "suggestId"
                            ,"location" : map
                        });

                    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                        let str = "";
                        let _value = e.fromitem.value;
                        let value = "";
                        if (e.fromitem.index > -1) {
                            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        }
                        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                        value = "";
                        if (e.toitem.index > -1) {
                            _value = e.toitem.value;
                            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        }
                        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                        G("searchResultPanel").innerHTML = str;
                    });

                    let myValue;
                    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                        let _value = e.item.value;
                        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                        setPlace();
                    });
                    //请求新数据
                    function setPlace(){
                        map.clearOverlays();    //清除地图上所有覆盖物
                        function myFun(){
                            //console.log(local.getResults())
                            let pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                            map.centerAndZoom(pp, 10);
                            map.addOverlay(new BMap.Marker(pp, {icon: icon}));    //添加标注
                            //console.log(map.getOverlays())

                        }
                        let local = new BMap.LocalSearch(map, { //智能搜索
                            onSearchComplete: myFun
                        });
                        local.search(myValue);
                    }
                },
            clearValue() {
                    document.getElementById('suggestId').value = ''
            }
        },
        watch:{
            mapdata(){
                let pointArr = []
                let listArr = []
                let infoArr = []
                this.mapdata.forEach(function(v,i){
                    pointArr.push(v.point)
                    listArr.push({
                            "entName": v.entName,
                            "legalPerson": v.legalPerson,
                            "capitalNum": v.capitalNum,
                            "entId": v.entId,
                        })
                    infoArr.push(v.entDetiles)

                })
                /*console.log(pointArr)
                console.log(listArr)
                console.log(infoArr)*/
                this.mapInit(pointArr,listArr,infoArr)
            }
        }
    }
</script>

<style scoped>
    .maps-wrapper{
        width: 100%;
        height: 100%;
    }
    #allmap{
        width:100%;
        height:100%;
    }
    #r-result{
        position: absolute;
        width: 230px;
        height: 32px;
        border-width: 1px;
        border-style: solid;
        border-left-color:#5ab6fd;
        border-right-color:#5ab6fd;
        border-top-color:#0078e9 ;
        border-bottom-color: #0078e9;
        overflow: hidden;
        border-radius: 5px;
        z-index: 1;
        top: 20px;
        left: 95px;
        background: #fff;
    }
    #r-result input{
        width: 190px;
        height: 32px;
        height: 32px;
        border: none;
        outline: none;
        border-radius: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #79b2fc;
        padding-left:10px ;
        box-sizing: border-box;
    }
    #searchResultPanel{
        border:1px solid #C0C0C0;
        width:150px;
        height:200px;
        overflow: auto;
        display:none;
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
    .tangram-suggestion-main>div:nth-child(1){
        height: 200px!important;
        overflow: auto;
    }
    .tangram-suggestion{
        height: 200px!important;
        overflow: auto;
    }
</style>