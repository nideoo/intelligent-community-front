import Vue from 'vue'
import Router from 'vue-router'
import unDeveloped from '@/components/vue/BeingDeveloped/unDeveloped'
import header from '@/components/header/header.vue'
import Info from '@/components/vue/info'

//首页
import homePage from '@/components/vue/homePage/home'
//人房管理
import humanHouse from '@/components/vue/humanHouse/humanHouse'

//视频监控
import videoMonitor from '@/components/vue/videoMonitor/videoMonitor'

//研判分析
import judgementAnalysis from '@/components/vue/judgementAnalysis/judgementAnalysis'
import trackCheck from '@/components/vue/judgementAnalysis/trackCheck'

//统计分析
import houseTj from '@/components/vue/statisticalAnalysis/houseTj'
import peopleTj from '@/components/vue/statisticalAnalysis/peopleTj'
import deviceTj from '@/components/vue/statisticalAnalysis/deviceTj'
import tjtb from '@/components/vue/statisticalAnalysis/tjtb'

//系统管理
import houseManage from '@/components/vue/systemManagement/houseManage'
import deviceManage from '@/components/vue/systemManagement/deviceManage'
import bkManage from '@/components/vue/systemManagement/bkManage'
import keyManage from '@/components/vue/systemManagement/keyManage'
import renyuanBk from '@/components/vue/systemManagement/renyuanBk'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: "/home",
    },
    {
        path: '/home',
        name: 'home',
        menuName: '首页',
        hasChild: false,
        menuShow: true,
        components: {
            default: homePage,
            headers: header,
        },
        meta: {
            requiresAuth: true //判断进入该页面是否需要登陆
        }
    },
    {
        path: '/humanHouse',
        name: 'humanHouse',
        menuName: '人房管理',
        hasChild: false,
        menuShow: true,
        components: {
            default: humanHouse,
            headers: header,
        },
        meta: {
            requiresAuth: true //判断进入该页面是否需要登陆
        }
    },
    {
        path: '/videoMonitor',
        name: 'videoMonitor',
        menuName: '视频监控',
        hasChild: false,
        menuShow: true,
        components: {
            default: videoMonitor,
            headers: header,
        },
        meta: {
            requiresAuth: true //判断进入该页面是否需要登陆
        }
    },
    {
        path: '',
        name: '',
        isTitle: true,
        menuName: '嘉陵区社区管控平台',
        menuShow: true,
        class: "header-title"
    },
    {
        path: '/judgement/abnormalAccess',
        name: 'judgement',
        menuName: '研判分析',
        isTitle: false,
        hasChild: true,
        menuShow: true,
        components: {
            default: Info,
            headers: header,
        },
        meta: {
            requiresAuth: true //判断进入该页面是否需要登陆
        },
        children: [
            {
                path: '/judgement/abnormalAccess',
                name: 'judgement/abnormalAccess',
                menuName: '门禁异常',
                hasChild: false,
                menuShow: true,
                component: judgementAnalysis,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/judgement/trackCheck',
                name: 'judgement/trackCheck',
                menuName: '轨迹核查',
                hasChild: false,
                menuShow: true,
                component: trackCheck,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/statistical',
        name: 'statistical',
        menuName: '统计分析',
        hasChild: true,
        menuShow: true,
        components: {
            default: Info,
            headers: header,
        },
        meta: {
            requiresAuth: true //判断进入该页面是否需要登陆
        },
        children: [
            {
                path: '/statistical/houseTj',
                name: 'statistical/houseTj',
                menuName: '房屋统计',
                hasChild: false,
                menuShow: true,
                component: houseTj,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/statistical/peopleTj',
                name: 'statistical/peopleTj',
                menuName: '人员统计',
                hasChild: false,
                menuShow: true,
                component: peopleTj,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/statistical/deviceTj',
                name: 'statistical/deviceTj',
                menuName: '设备统计',
                hasChild: false,
                menuShow: true,
                component: deviceTj,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/statistical/tjtb',
                name: 'statistical/tjtb',
                menuName: '统计图表',
                hasChild: false,
                menuShow: true,
                component: tjtb,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'system',
        menuName: '系统管理',
        hasChild: true,
        menuShow: true,
        components: {
            default: Info,
            headers: header,
        },
        meta: {
            requiresAuth: true //判断进入该页面是否需要登陆
        },
        children: [
            {
                path: '/statistical/keyManage',
                name: 'statistical/keyManage',
                menuName: '重点关注',
                hasChild: false,
                menuShow: true,
                component: keyManage,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/statistical/renyuanBk',
                name: 'statistical/renyuanBk',
                menuName: '人员关注',
                hasChild: false,
                menuShow: true,
                component: renyuanBk,
                meta: {
                    requiresAuth: true
                }
            }
            // {
            //   path: '/statistical/houseManage',
            //   name: 'statistical/houseManage',
            //   menuName: '房屋管理',
            //   hasChild: false,
            //   menuShow: true,
            //   component: houseManage,
            //   meta: {
            //     requiresAuth: true
            //   }
            // },
            // {
            //   path: '/statistical/deviceManage',
            //   name: 'statistical/deviceManage',
            //   menuName: '设备管理',
            //   hasChild: false,
            //   menuShow: true,
            //   component: deviceManage,
            //   meta: {
            //     requiresAuth: true
            //   }
            // },
            // {
            //   path: '/statistical/bkManage',
            //   name: 'statistical/bkManage',
            //   menuName: '布控管理',
            //   hasChild: false,
            //   menuShow: true,
            //   component: bkManage,
            //   meta: {
            //     requiresAuth: true
            //   }
            // },
        ]
    }
]
const router = new Router({
    routes
});
export default router;
