<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main">{{msg}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'warningClass',
        data () {
            return {
                msg:'这是预警类页面'
            }
        },
        components:{
            //simplifyPaging
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
        color:#000;
    }
    
</style>

