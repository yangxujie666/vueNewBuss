<template>
    <div class="block">
        <el-pagination
                :page-size="pageSize"
                layout=" prev, pager, next"
                :total="total"
                :page-count="pageCount"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
        >

        </el-pagination>
    </div>
</template>
<script>
    export default {
        methods: {
            handleCurrentChange(val){
                console.log(val)
                this.$emit('pageChange', val)
            },
            handleSizeChange(val){
                console.log(`每页${val}条`)
            }
        },
        props: ['pageSize','total','layout','pageCount'],
        data() {
            return {
                currentPage4: 1
            };
        }
    }
</script>
<style scoped>
    .block{
        text-align: right;
    }
    .el-pagination__jump, .btn-next, .el-pager, .btn-prev {
        float: left!important;
    }
</style>