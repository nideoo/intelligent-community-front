<template>
    <div class="homepage">
        <div id="mapContainter"></div>
        <el-container class="home-content">
            <el-aside>
                <div class="sideBar flex-col flex-between">
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">人口统计</h4>
                            <ul class="people-item flex-child flex-col flex-between">
                                <li class="flex-start">
                                    <div class="sub-label">实有人口</div>
                                    <button class="number total-number">{{populationStatistics.syrk}} <span>人</span>
                                    </button>
                                </li>
                                <li class="flex-start">
                                    <div class="sub-label">常驻人口</div>
                                    <button class="number sub-number">{{populationStatistics.czrk}} <span>人</span>
                                    </button>
                                </li>
                                <li class="flex-start">
                                    <div class="sub-label">暂住人口</div>
                                    <button class="number sub-number">{{populationStatistics.zzrk}} <span>人</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">人口结构分析</h4>
                            <div class="item flex-child" id="peopleFxChart"></div>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">重点关注</h4>
                            <div class="item flex-child" id="keyChart"></div>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">人口流入地</h4>
                            <div class="item flex-child" id="PeopleLr"></div>
                        </div>
                    </div>
                </div>
            </el-aside>
            <el-main class="side-bottom">
                <el-row class="side-bottom-item flex-center">
                    <el-col :span="8">
                        <h4 class="sub-title">自住申报</h4>
                        <div class="bot-marquee">
                            <div class="bot-marquee-box">
                                <ul class="bot-content" :class="{marquee_top:animate}">
                                    <li class="flex-parent" v-for="item in selfDeclaration">
                                        <span class="flex-child bot-comm">{{item.address}}</span>
                                        <span class="bot-name">{{item.name}}</span>
                                        <div class="bot-photo"><img :src="item.img" alt=""></div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </el-col>
                    <el-col :span="8">
                        <h4 class="sub-title">人车动态</h4>
                        <div class="bot-marquee">
                            <div class="bot-marquee-box">
                                <ul class="bot-content" :class="{marquee_top:animate2}">
                                    <!--                  <li class="flex-between">-->
                                    <!--                    <span class="bot-comm bot-plateNo">王杰希</span>-->
                                    <!--                    <span class="bot-name">2017.12.23 12:09:08</span>-->
                                    <!--                    <div class="bot-photo"><img-->
                                    <!--                            src="../../../../static/images/photo/person1.jpg"/></div>-->
                                    <!--                  </li>-->
                                    <!--                  <li class="flex-between">-->
                                    <!--                    <span class="bot-comm bot-plateNo">沪H09784</span>-->
                                    <!--                    <span class="bot-name">2017.12.23 12:09:08</span>-->
                                    <!--                    <div class="bot-photo"><img-->
                                    <!--                            src="../../../../static/images/photo/person1.jpg"/></div>-->
                                    <!--                  </li>-->
                                    <li class="flex-between" v-for="item in humanVehicle" @click="openDetailModal(item)"
                                        v-if="item.web_socket_type=='face'">
                                        <span class="bot-comm bot-plateNo">{{item.username?item.username:'未知'}}</span>
                                        <span class="bot-name">{{item.overtime}}</span>
                                        <div class="bot-photo"><img :src="item.imgPath" alt="" onerror="this.src='../../../../static/img/default.png'"></div>
                                    </li>
                                    <li class="flex-between" v-for="item in humanVehicle" @click="openDetailModal(item)"
                                        v-if="item.web_socket_type=='vehicle'">
                                        <span class="bot-comm bot-plateNo">{{item.car_plate?item.car_plate:'未知'}}</span>
                                        <span class="bot-name">{{item.overtime}}</span>
                                        <div class="bot-photo"><img :src="item.imgPath" alt="" onerror="this.src='../../../../static/img/default.png'"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <h4 class="sub-title">预警信息</h4>
                        <div class="bot-marquee">
                            <div class="bot-marquee-box">
                                <ul class="bot-content" :class="{marquee_top:animate3}">
                                    <li class="side-bottom-car" v-for="item in warningInformation">
                                        <span class="bot-comm">{{item.address}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-aside>
                <div class="sideBar">
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">房屋统计</h4>
                            <div class="house-item people-item flex-child flex-mid-center">
                                <div class="house-icon"><img src="../../../../static/img/home-icon.png"/></div>
                                <ul class="flex-col flex-end">
                                    <li class="house-label">实有房屋</li>
                                    <li>
                                        <button class="number total-number">{{houseStatistics.syfw}}</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">房屋类型结构分析</h4>
                            <ul class="housefx-item flex-child flex-between ">
                                <li class="house-rent flex-mid-center" v-for="item in houseStructure">
                                    <div>
                                        <div class="number">{{item.value}}</div>
                                        <div>{{item.name}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">设备数量</h4>
                            <div class="item flex-child" id="deviceChart"></div>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-item-info flex-col flex-parent">
                            <h4 class="sub-title">车辆分析</h4>
                            <div class="item flex-child" id="carChart"></div>
                        </div>
                    </div>
                </div>
            </el-aside>
        </el-container>
        <div :is="detailView" :ismodalvisible.sync="isModalVisible" v-if="isModalVisible" :pageinfo="pageInfo"></div>
    </div>
</template>
<script>
    import faceDetail from '@/components/vue/homePage/modules/face'
    import vehicleDetail from '@/components/vue/homePage/modules/vehicle'

    let map;
    let PeopleLr, peopleFxChart, keyChart, houseChart, deviceChart, carChart;

    export default {
        name: "homepage",
        data() {
            return {
                selfDeclaration: [],
                humanVehicle: [],
                warningInformation: [],
                animate: false,
                animate2: false,
                animate3: false,
                websock: null,

                populationStatistics: [],
                populationStructure: [],
                populationFocus: [],
                populationInflow: [],
                houseStatistics: [],
                houseStructure: [],
                deviceStatistics: [],
                carStatistics: [],

                //  实时抓拍详情
                detailView: "faceDetail",
                isModalVisible: false,
                //详情数据
                pageInfo:{}
            }
        },
        components: {faceDetail, vehicleDetail},
        methods: {
            initMap() {
                let _self = this;
                map = new AMap.Map('mapContainter', {
                    resizeEnable: true,
                    center: [106.01459, 30.629378],//南充市经纬度
                    zoom: 9,
                    zooms: [10, 14],
                    mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
                });

                AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
                    _self.initPage(DistrictExplorer);
                });
            },
            getAllRings(feature) {

                var coords = feature.geometry.coordinates,
                    rings = [];

                for (var i = 0, len = coords.length; i < len; i++) {
                    rings.push(coords[i][0]);
                }

                return rings;
            },
            getLongestRing(feature) {
                var rings = this.getAllRings(feature);

                rings.sort(function (a, b) {
                    return b.length - a.length;
                });

                return rings[0];
            },
            initPage(DistrictExplorer) {
                let _self = this;
                //创建一个实例
                var districtExplorer = new DistrictExplorer({
                    map: map
                });

                var countryCode = 100000, //全国
                    districtCodes = [
                        // 511300,  //南充市
                        511304//南充市嘉陵区
                    ];
                districtExplorer.loadMultiAreaNodes(
                    //只需加载全国和市，全国的节点包含省级
                    [countryCode].concat(districtCodes),
                    function (error, areaNodes) {
                        var countryNode = areaNodes[0],
                            cityNodes = areaNodes.slice(1);

                        var path = [];

                        //首先放置背景区域，这里是大陆的边界
                        path.push(_self.getLongestRing(countryNode.getParentFeature()));
                        for (var i = 0, len = cityNodes.length; i < len; i++) {
                            //逐个放置需要镂空的市级区域
                            path.push.apply(path, _self.getAllRings(cityNodes[i].getParentFeature()));
                        }

                        //绘制带环多边形
                        //https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon
                        var polygon = new AMap.Polygon({
                            bubble: true,
                            lineJoin: 'round',
                            strokeColor: '#2b69c8', //线颜色
                            strokeOpacity: 1, //线透明度
                            strokeWeight: 2, //线宽
                            fillColor: '#2b69c8', //填充色
                            fillOpacity: 0.3, //填充透明度
                            map: map,
                            path: path
                        });
                    });
            },
            //get data
            initData() {
                let vm = this;
                // 人口统计
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'rktj-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.populationStatistics = res.data.obj;
                    }
                }).catch(function (error) {

                });
                //人口结构分析
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'rkjgfx-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.populationStructure = res.data.obj;
                        vm.initPeopleFx(res.data.obj);
                    }
                }).catch(function (error) {

                });
                //重点关注
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'zdgz-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.populationFocus = res.data.obj;
                        vm.initKeyChart(res.data.obj);
                    }
                }).catch(function (error) {

                });
                //人口流入地
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'rklrd-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.populationInflow = res.data.obj;
                        vm.initPeopleLr(res.data.obj);
                    }
                }).catch(function (error) {

                });
                //房屋统计
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'fwtj-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.houseStatistics = res.data.obj;
                    }
                }).catch(function (error) {

                });
                //房屋类型分析
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'fwlxjgfx-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.houseStructure = res.data.obj;
                    }
                }).catch(function (error) {

                });
                //设备数量
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'sbsl-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.deviceStatistics = res.data.obj;
                        vm.initDevice(res.data.obj);
                    }
                }).catch(function (error) {

                });
                //车辆分析
                this.$ajax({
                    type: "get",
                    url: this.baseUrl().base + 'clfx-statistics',
                    dataType: "json"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        vm.carStatistics = res.data.obj;
                        vm.initCar(res.data.obj);

                    }
                }).catch(function (error) {

                });
            },
            //  人口统计
            initKeyChart(obj) {
                let xData = [], yData = [];
                obj.forEach(function (v, i) {
                    xData.push(v.name);
                    yData.push(v.value);
                })
                var colorList = {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: '#0c1e3a' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#3694f8' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
                let option = {

                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        },
                        extraCssText: 'width:auto;height:auto;'
                    },

                    grid: {
                        x: 10,
                        y: 0,
                        x2: 30,
                        y2: 0,
                        containLabel: true
                    },

                    xAxis: {
                        type: 'value',
                        max: 2000,
                        interval: 250,
                        name: '人',
                        nameLocation: 'end',
                        nameTextStyle: {
                            color: '#8597c1',
                            fontStyle: 9,
                            padding: [0, 0, -26, -8]
                        },
                        boundaryGap: [0, 0.01],
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#8597c1'
                            }
                        },
                        axisLabel: {
                            show: false,
                            interval: '0',
                            textStyle: {
                                fontSize: 12,
                                color: '#fff'
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }

                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                                fontSize: 12
                            },
                            symbol: ['none', 'arrow'],
                            symbolSize: [4, 4]

                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: xData
                    },
                    series: [
                        {
                            type: 'bar',
                            data: yData,
                            itemStyle: {
                                borderColor: '#3694f8',
                                borderWidth: 1,
                                color: function (params) {
                                    return colorList;
                                }
                            },
                            barWidth: '40%'
                        }

                    ]
                };

                keyChart.setOption(option);

            },
            initPeopleFx(obj) {
                let xData = [], yData = [];
                obj.forEach(function (v, i) {
                    xData.push(v.name);
                    yData.push(v.value);
                });
                let _self = this;
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#00ccff', '#ffcc00'],
                    legend: {
                        // orient: 'vertical',
                        x: 'center',
                        bottom: 0,
                        itemWidth: 12,
                        itemHeight: 4,
                        itemGap: 20,
                        data: xData,
                        textStyle: {
                            color: "#fff"
                        }
                    },

                    series: [
                        {
                            name: '男女比例',
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '40%'],
                            hoverAnimation: false,
                            data: obj,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                peopleFxChart.setOption(option);

            },
            initPeopleLr(obj) {
                let xData = [], yData = [];
                obj.forEach(function (v, i) {
                    xData.push(v.name);
                });

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c} ({d}%)'
                    },
                    color: ['#f6d003', '#d2da33', '#c0ed60', '#45ddd3', '#04b7eb', '#ffdb5d', '#ee82ed', '#8fca5f', '#b995f5'],
                    legend: {
                        x: 'center', //控制lengend距离玫瑰图距离
                        bottom: -5,
                        textStyle: {
                            fontSize: 12,
                            // width: 130,
                            // height: 20,
                            color: "#fff",
                        },
                        itemWidth: 10,
                        itemHeight: 4,
                        itemGap: 5,
                        data: ['新疆', '西藏', '四川', '境外人员', '港澳台'],
                    },
                    series: [{
                        hoverAnimation: false, //设置饼图默认的展开样式
                        radius: ['50%', '72%'],
                        center: ['50%', '42%'],
                        name: 'pie',
                        type: 'pie',
                        clockwise: true,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 5,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.2)'
                            }
                        },
                        data: obj
                    },
                        {
                            name: '外边框',
                            type: 'pie',
                            clockWise: false, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            center: ['50%', '42%'],
                            radius: ['82%', '82%'],
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 9,
                                name: '',
                                itemStyle: {
                                    normal: {
                                        borderWidth: 1,
                                        borderColor: '#2f6689'
                                    }
                                }
                            }]
                        }]
                };
                PeopleLr.setOption(option);
            },
            //  设备
            initDevice(obj) {
                let yData = [], xData = [], totalNum = 0;
                obj.filter((item, i) => {
                    xData.push(item.name);
                    yData.push(item.value);
                });
                let option = {
                    grid: {
                        right: '15%',
                        left: '15%',
                        top: '5%',
                        bottom: 0,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                show: true,
                                color: "#4c6590"
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        data: xData
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                show: true,
                                color: "#4c6590"
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#4c6590"
                            }
                        }
                    },
                    series: [{
                        data: yData,
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                borderColor: '#b4d006',
                                borderWidth: 1,
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#b4d006'
                                }, {
                                    offset: 1,
                                    color: '#162732'
                                }]),
                            }
                        },
                        // label: {
                        //   normal: {
                        //     show: true,
                        //     position: 'top',
                        //     color: "#fff",
                        //     formatter: '{c}'
                        //   }
                        // }
                    }]
                };
                deviceChart.setOption(option);

            },
            //  车辆
            initCar(obj) {
                let legendData = [];
                obj.forEach(function (item, i) {
                    legendData.push(item.name)
                });
                let option = {
                    color: ['#14b38b', '#007add', '#758cea', '#e15d68', '#EEC900', '#E9967A', '#FF00FF', '#7D26CD'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '车辆统计',
                            type: 'pie',
                            roseType: 'area',
                            z: 10,
                            radius: ['50%', '80%'],
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor: "#1f2839",
                                    label: {
                                        show: true,
                                        position: 'outside',
                                        color: '#ddd',
                                        formatter: function (params) {
                                            let percent = 0;
                                            let total = 0;
                                            for (let i = 0; i < obj.length; i++) {
                                                total += parseInt(obj[i].value);
                                            }
                                            percent = ((parseInt(params.value) / total) * 100).toFixed(0);
                                            if (params.name !== '') {
                                                return params.name + '\n{white|' + percent + '%}';
                                            } else {
                                                return '';
                                            }
                                        },
                                        rich: {
                                            white: {
                                                color: '#ddd',
                                                align: 'center',
                                                padding: [5, 0]
                                            }
                                        }
                                    },
                                    labelLine: {
                                        show: true
                                    }
                                }
                            },
                            data: obj
                        }
                    ]
                };
                carChart.setOption(option);

            },

            //  bottom
            getData() {
                let _self = this;
                this.$ajax({
                    type: "get",
                    url: "../../../static/json/home.json",
                }).then(function (res) {
                    _self.selfDeclaration = res.data.selfDeclaration;
                    _self.warningInformation = res.data.warningInformation;
                })
            },
            showMarquee: function () {
                let vm = this;
                this.animate = true;
                setTimeout(() => {
                    this.selfDeclaration.push(this.selfDeclaration[0]);
                    this.selfDeclaration.shift();
                    this.animate = false;
                }, 1000);

                this.animate3 = true;
                setTimeout(() => {
                    this.warningInformation.push(this.warningInformation[0]);
                    this.warningInformation.shift();
                    this.animate3 = false;
                }, 1000);
            },

            //实时抓拍websocket推送信息
            getSnapMsg() {
                const wsuri = "ws://47.103.46.142:8080/kafka-index-websocket";
                // //判断当前浏览器是否支持WebSocket
                if ('WebSocket' in window) {
                    this.websock = new WebSocket(wsuri);//这里面的this都指向vue
                } else {
                    alert('Not support websocket')
                }
                this.websock.onopen = this.websocketopen;
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
                this.websock.onerror = this.websocketerror;
            },
            //websocket消息推送
            websocketopen() {//打开
                // console.log("WebSocket连接成功")
            },
            websocketonmessage(e) { //数据接收
                console.log(e);
                let vm = this;
                vm.animate2 = true;
                if (e.data && e.data !== "连接成功") {
                    let data = eval('(' + e.data + ')');
                    if (data.web_socket_type == 'face') {
                        data.imgPath = vm.baseUrl().imgPath + data.picture;
                        data.overtime = vm.timestampToTime(data.datetime);
                    }
                    if (data.web_socket_type == 'vehicle') {
                        data.imgPath = vm.baseUrl().imgPath + data.picture;
                        data.overtime = vm.timestampToTime(data.start_time);
                    }

                    setTimeout(function () {
                        if (vm.humanVehicle.length > 4) {
                            vm.humanVehicle.shift();
                            vm.animate2 = false;
                        }
                        vm.humanVehicle.push(data);
                        console.log(vm.humanVehicle);
                    }, 500);
                }

                //web_socket_type ：vehicle--车
                //                  face   --脸
                // let data = JSON.parse(e.data);
            },
            websocketclose() {  //关闭
                // console.log("WebSocket关闭");
            },
            websocketerror() {  //失败
                _self.$message({
                    message: 'WebSocket连接失败！',
                    type: 'error',
                    duration: 1500
                });
            },
            openDetailModal(obj){
                console.log(obj);
                this.pageInfo=obj;
                this.detailView = obj.web_socket_type+'Detail';
                this.isModalVisible = true;
            }
        },
        beforeDestroy() {
            if (this.websock) {
                this.websock.close();
            }
        },
        created: function () {
            // 页面显示
            setInterval(this.showMarquee, 2000);
        },
        mounted() {
            let vm = this;
            this.initData();
            this.getData();
            this.initMap();
            PeopleLr = this.$echarts.init(document.getElementById('PeopleLr'));//人口统计
            peopleFxChart = this.$echarts.init(document.getElementById('peopleFxChart'));//人口结构分析
            keyChart = this.$echarts.init(document.getElementById('keyChart'));//重点关注
            deviceChart = this.$echarts.init(document.getElementById('deviceChart'));//设备分析
            carChart = this.$echarts.init(document.getElementById('carChart'));//车辆分析
            window.addEventListener('resize', () => {
                PeopleLr.resize();
                peopleFxChart.resize();
                keyChart.resize();
                deviceChart.resize();
                carChart.resize();
            });
            this.getSnapMsg();

        }
    }
</script>
<style lang="scss" scoped>
</style>
