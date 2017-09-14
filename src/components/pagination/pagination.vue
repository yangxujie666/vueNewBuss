<template>
    <div class="pagination-wrap cf">
        <el-button  slot class="pagenation-btn">确定</el-button>
        <el-pagination
                :page-size="pageSize"
                :layout="layout"
                :total="total"
                :page-count="pageCount"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
        >

        </el-pagination>


    </div>
</template>

<script>
  export default {
    computed: {
      hasBtn(){
        return this.layout.indexOf('jumper') > 0
      }
    },
    data () {
      return {

      }
    },
    props: ['pageSize','total','layout','pageCount','currentPage'],
    mounted() {
        console.log(this.pageSize,this.total,this.pageSize,this.pageCount)
    },
    methods: {
      handleCurrentChange(val){
        this.$emit('pageChange', val)
      },
      handleSizeChange(val){
        console.log(`每页${val}条`)
      }
    }

  }

</script>

<style scope>

    .pagination-wrap {
        margin: 20px 0;
    }
    .total {
        float: left;
        margin-left: 24px;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
    }
    .total i {
        padding: 0 5px;
        color: #f39f1d;
    }
    .el-pager li {
        height: 32px!important;
        line-height: 32px!important;
        padding: 0 17px!important;
        margin-right: 6px!important;
        color: #333;
        border: 1px solid #ddd !important;
        border-radius: 3px;
        background: #fff!important;
        vertical-align: middle!important;
    }

    .el-pager li.active {
        min-width: 32px !important;
        border: 1px solid #ddd !important;
        border-radius: 3px;
        background: #fff!important;
        color: #f6800e!important;
    }
    .el-pager li:hover {
        color: #f6800e;
    }
    .el-pagination button.disabled {
        background: transparent;
    }

    .el-pagination__editor {
        min-width: 30px;
        height: 32px;
        line-height: 35px;
        padding: 0 4px;
        border: 1px solid #ddd !important;
        border-radius: 5px!important;
        background: #fff !important;
        color: #333 !important;
    }

    .pagenation-btn {
        float: right;
        width: 65px!important;
        height: 32px !important;
        padding: 0 5px;
        margin: 2px 0 0 9px!important;
        border-color: #ddd!important;
        background: #ec771c;
        background: -webkit-linear-gradient(top, #f7f7f7, #ebebeb);
        border-radius: 3px;
        font-size: 12px;
        color: #333;
        outline: none;
        cursor: pointer;
        line-height: 30px !important;

    }
    .pagenation-btn:hover {
        color: #333;
        background: -webkit-linear-gradient(top, #ebebeb, #ebebeb);
    }

    .el-pagination .btn-next,
    .el-pagination .btn-prev {
        width: 30px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #ddd !important;
        border-radius: 5px!important;
        background: rgba(255, 255, 255, 1)!important;
        color: #333 !important;
    }
    .el-pagination button.disabled {
        background: transparent;
    }
    .el-pagination .btn-next:hover,
    .el-pagination .btn-prev:hover {
        background: #f7f7f7!important;
    }
    .el-pagination .btn-next.disabled:hover,
    .el-pagination .btn-prev.disabled:hover {
        background: none!important;
    }

    .el-pager {
        height: 32px;
        padding: 0 10px!important;
        border: none !important;
        background: none !important;
    }
    .el-pagination button,
    .el-pagination span {
        height: 32px;
        line-height: 32px;
        color: #333!important;
    }
    .el-pagination span {
        margin-top: -1px;
    }
    .el-pagination__jump,
    .btn-next,
    .el-pager,
    .btn-prev {
        float: right;
    }
    .el-pager li.btn-quicknext,
    .el-pager li.btn-quickprev {
        line-height: 16px;
    }
    .el-pager li.active+li {
        padding-left: 17px;
    }
    .el-pagination {
        margin-top: 0!important;
    }
    .el-button {
        padding: 0 15px!important;
    }
</style>
