<template>
    <div class="wrapper">
        <div class="main-warp database">
            <div class="main">
                <div class="main1">{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'databaseClass',
        data () {
            return {
                msg:'这是基础数据库类页面',

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
    .database .main1{
        height:100px;
        background:#fff;
    }
</style>

