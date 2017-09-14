import axios from 'axios'


// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '';
axios.defaults.baseURL ='';
// axios.defaults.baseURL = 'http://result.eolinker.com/fkUv9Yld1ffee1c91f2f414afdcd8a682398ea00ddfa17c?uri=';
const baseurl = 'http://192.168.20.110:8069';
const baseMock  = 'http://result.eolinker.com/Tw4eTQNe8ae4f60729b4403d26b52719dacd22e1e460f04?uri=';
// axios.defaults.withCredentials = true;
//

let instance = axios.create({
    headers: {'tokenid': sessionStorage.getItem('tokenid')}
});

let instanceMock = axios.create({

});
//



//后台数据联调
export function Get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(baseurl + url, params)
            .then(response => {
                if (response.data.code == '1') {
                    resolve(response.data);
                }
                else if(response.data.code=='501') {
                    instanceMock.get(baseMock + url, params)
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error)
                        })
                }

            })
            .catch((error) => {
                instanceMock.get(baseMock + url, params)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
    })
}
//前端mock数据联调
/*export function Get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(baseMock+url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}*/

export default {
  /**
   * 获取企业分析-部分图表数据
   */
  getAnalysisData (params) {
      return Get('/newReg/analysisPages/getChartDatas',{params})
  },
  /**
   * 获取企业分析-部分图表数据
   */
  getAnalysisData1 (params) {
    return Get('/newReg/analysisPages/getChartDatas1',{params})
  },

    /**
     * 获取首页地区字典数据
     */
    getAreaData () {
        return Get('/newReg/businessMove/getBusinessArea')
    },
    /**
     * 获取首页一级、二级行业数据
     */
    getTrade (param) {
        return Get('/newReg/businessMove/getTrade',{param})
    },
    /**
     * 获取首页行业信息数据
     */
    getTradeData (params) {
        return Get('/newReg/businessMove/getShowData',{params})
    },

    /**
     * 获取企业详情-基本信息-工商注册信息数据
     */
    getIndustryRegistrateInfoData (params) {
         return Get('/newReg/entDetails/getBasicInfoData',{params})
    },
    /**
     * 获取企业详情-基本信息-股东信息数据
     */
    getShareholderInfoData(params) {
      return Get('/newReg/entDetails/getShareholderInfo',{params})
    },
    /**
     * 获取企业详情-基本信息-主要人员数据
     */
    getKeyPersonnelData(params) {
        return Get('/newReg/entDetails/getKeyPersonnelData',{params})
    },
    /**
     * 获取企业详情-关联企业-对外投资数据
     */
    getInvestmentAbroadData(params) {
        return Get('/newReg/entDetails/getInvestmentAbroadData',{params})
    },
    /**
     * 获取企业详情-关联企业-股东数据
     */
    getShareholderData(params) {
        return Get('/newReg/entDetails/getShareholderData',{params})
    },
    /**
     * 获取企业详情-关联企业-分支机构数据
     */
    getBranchData(params){
        return Get('/newReg/entDetails/getBranchData',{params})
    },
    /**
     * 获取企业详情-关联企业-疑似关系数据
     */
    getSuspectedRelationshipData(params){
        return Get('/newReg/entDetails/getSuspectedRelationshipData',{params})
    },
    /**
     * 获取企业详情-法人对外投资与任职-担任法人数据
     */
    getLegalPersonData(params){
        return Get('/newReg/entDetails/getLegalPersonData',{params})
    },
    /**
     * 获取企业详情-法人对外投资与任职-在外任职数据
     */
    getHoldOfficeOutsideData(params){
        return Get('/newReg/entDetails/getHoldOfficeOutsideData',{params})
    },
    /**
     * 获取企业详情-法人对外投资与任职-对外投资数据
     */
    getSuspectedRelationshipData1(params){
        return Get('/newReg/entDetails/getInvestmentAbroadData1',{params})
    },
    /**
     * 获取企业详情-同类企业-同行业顶尖企业
     */
    getTopCompanies(params) {
        return Get('/newReg/entDetails/getTopCompanies',{params})
    },
    /**
     * 获取企业详情-同类企业-新注册企业数据
     */
    getNewCompanies(params) {
        return Get('/newReg/entDetails/getNewCompanies',{params})
    },
    /**
     * 获取企业详情-同企业动态-行业新增投资事件
     */
    getInvestmentEvent(params) {
        return Get('/newReg/entDetails/getInvestmentEvent',{params})
    },
    /**
     * 获取企业详情-同类企业-新注册企业数据
     */
    getPublicHeat(params) {
        return Get('/newReg/entDetails/getPublicHeat',{params})
    },
    /**
     * 获取企业详情-同企业动态-行业重要舆情
     */
    getImportantOpinion(params) {
        return Get('/newReg/entDetails/getImportantOpinion',{params})
    },
    /**
     * 获取企业列表-省份
     */
    getListArea() {
         return Get('/newReg/entList/getListArea')
    },
    /**
     * 获取企业列表-行业
     */
    getListTrade() {
        return Get('/newReg/entList/getListTrade')
    },
    /**
     * 获取企业列表-企业详情
     */
    getListDetiles(params) {
       return Get('/newReg/entList/getListDetiles',{params})
    },
    /**
     * 获取企业列表-收藏
     */
    getCollectStatus(params) {
        return Get('/newReg/entList/getCollectStatus',{params})
    },
    /**
     * 获取企业列表-取消收藏
     */
    getCollectStatus1(params) {
        return Get('/newReg/entList/getCollectStatus1',{params})
    },
    /**
     * 获取企业列表-数据导出
     */
    getMap(params) {
        return Get('/newReg/businessMove/getMap',{params})
    },
    /**
     * 获取企业列表-数据导出
     */
    getMaplist(params) {
        return Get('/newReg/businessMove/getMaplist',{params})
    }
}
