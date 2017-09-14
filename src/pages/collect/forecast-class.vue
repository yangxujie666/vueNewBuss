<template>
    <div class="wrapper">
        <div class="main-warp">
            <div class="main"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'forecastClass',
        data () {
            return {
                msg:'这是企业基本信息页面',

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
    }
    
</style>

