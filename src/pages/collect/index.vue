<template>
    <div class="wrapper1">
        <div class="main-warp">
            <div class="left-bar">
                <h3><i class="favorite-img1"></i>我的收藏</h3>
                <ul class="left-bar-list">
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name:'index',
    data () {
      return {
        current:0,
        msg:'这是企业动态详情页面'
      }
    },
    methods:{
        toggleClass:function(item){
            this.current = item;
        }
    }
  }
</script>

<style scope>
    html,body{
        background: #f1f1f1;
    }
    .wrapper1{
        margin-left: calc(100vw - 100%);
    }
    .main-warp{
        width:1200px;
        margin:0 auto;
    }
    .left-bar{
        float:left;
        width:230px;
        border:1px solid #d4d4d4;
        border-radius: 5px;
        box-shadow: 0 0 10px 1px rgba(6,15,53,.1);
        overflow: hidden;

    }
    .left-bar h3{
        font-size:18px;
        color:#fff;
        height:55px;
        line-height: 55px;
        background: url(../../../static/img/favorite-bg.png) no-repeat;
    }

    .left-bar-list li {

    }

    .nav a:not(:last-child):after{
        position: absolute;
        content: '';
        height: 1px;
        width: 100%;
        display: block;
        /*background: -webkit-linear-gradient(left, rgba(89, 7, 136, 0.09),#e3e3e3, rgba(228, 227, 227, 0.09));*/
        background: -webkit-linear-gradient(right, rgba(89, 7, 136, 0.09) 1%, #e3e3e3, rgba(228, 227, 227, 0.09) 99%);
        background: linear-gradient(to left, rgba(228, 227, 227, 0.09) 1%, #e3e3e3, rgba(89, 7, 136, 0.09) 99%);
    }    .favorite-num{
        color:#ff7108;
        float:right;
        margin-right:14px;
    }
    .favorite-img1 {
        float: left;
        width: 28px;
        height: 20px;
        margin: 17px 21px 0 25px;
        background: url(../../../static/img/favorite-img1.png) no-repeat;
    }
</style>
