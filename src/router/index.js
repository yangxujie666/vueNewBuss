import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/dynamics/index'
import list from '@/pages/list/index'
import analysis from '@/pages/analysis/index'
import details from '@/pages/details/index'
import basicInfo from '@/pages/details/basic-info'
import affiliatedEnterprise from '@/pages/details/affiliated-enterprise'
import foreignInvestment from '@/pages/details/foreign-investment'
import similarEnterprise from '@/pages/details/similar-enterprise'
import industryTrends from '@/pages/details/industry-trends'
import databaseClass from '@/pages/collect/database-class'
import decisionClass from '@/pages/collect/decision-class'
import forecastClass from '@/pages/collect/forecast-class'
import warningClass from '@/pages/collect/warning-class'
import collect from '@/pages/collect/index'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: analysis
    },
    {
      path: '/details/:id/:name',
      name: 'details',
      component: details,
      children: [
        {
          path:'/details/:id/:name/basicInfo',
          name: 'basicInfo',
          component: basicInfo,
        },
        {
          path:'/details/:id/:name/affiliatedEnterprise',
          name: 'affiliatedEnterprise',
          component: affiliatedEnterprise,
        },
        {
          path:'/details/:id/foreignInvestment',
          name: 'foreignInvestment',
          component: foreignInvestment,
        },
        {
          path:'/details/:id/similarEnterprise',
          name: 'similarEnterprise',
          component: similarEnterprise,
        },
        {
          path:'/details/:id/industryTrends',
          name: 'industryTrends',
          component: industryTrends,
        },
        {
          path:'',
          component:basicInfo
        }
      ]
    },
    // {
    //       path: '/collect',
    //       name: 'collect',
    //       component: collect,
    //       children: [
    //           {
    //               path:'/collect/database-class',
    //               name: 'databaseClass',
    //               component: databaseClass,
    //           },
    //           {
    //               path:'/collect/decision-class',
    //               name: 'decisionClass',
    //               component: decisionClass,
    //           },
    //           {
    //               path:'/collect/forecast-class',
    //               name: 'forecastClass',
    //               component: forecastClass,
    //           },
    //           {
    //               path:'/collect/warning-class',
    //               name: 'warningClass',
    //               component: warningClass,
    //           }
    //       ]
    //   },
    {
      path:'',
      redirect: 'index'
    }
  ]
})
