<template>
    <el-container class="memberTj">
        <el-header class="headerPage"></el-header>
        <el-main style="margin-top: 20px;">
            <el-row class="content-box">
                <el-col :span="10">
                    <div class="aside">
                        <h4 class="box-title">房屋统计</h4>
                        <div id="houseTJ" class="charts"></div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="aside">
                        <h4 class="box-title">居住密度统计</h4>
                        <div id="jzmdTJ" class="charts"></div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="aside">
                        <h4 class="box-title">房屋登记情况统计</h4>
                        <div id="fwdjTJ" class="charts"></div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="aside">
                        <h4 class="box-title">居住情况统计</h4>
                        <div id="jzqkTJ" class="charts"></div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="aside">
                        <h4 class="box-title">户型分析统计</h4>
                        <div id="hxfxTJ" class="charts"></div>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="aside">
                        <h4 class="box-title">房屋数量统计</h4>
                        <div class="flex-parent" style="height: 90%">
                            <ul class="flex-child flex-between fwtj">
                                <li class="flex-y-center">
                                    <div>
                                        <h4>338</h4>
                                        <p class="houseIcon icon-village"></p>
                                        <p>小区数量</p>
                                    </div>
                                </li>
                                <li class="flex-y-center">
                                    <div>
                                        <h4>737</h4>
                                        <p class="houseIcon icon-building"></p>
                                        <p>楼栋单元数量</p>
                                    </div>
                                </li>
                                <li class="flex-y-center">
                                    <div>
                                        <h4>19875</h4>
                                        <p class="houseIcon icon-fw"></p>
                                        <p>房屋数量</p>
                                    </div>
                                </li>
                            </ul>
                            <div id="houseNumTJ" class="charts flex-child" style="height: 100%"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    let houseTJ, jzmdTJ, fwdjTJ, jzqkTJ, hxfxTJ, houseNumTJ;
    export default {
        data() {
            return {}
        },
        methods: {
            getData() {
                let _self = this;
                this.$ajax({
                    type: "get",
                    url: "../../../static/json/tjfx.json",
                }).then(function (res) {
                    _self.drawHouseTJ(res.data.house);//房屋统计
                    _self.drawJzmdTJ(res.data.house_jzmd);//居住密度
                    _self.drawFwdjTJ(res.data.house_fwdj);//房屋登记情况
                    _self.drawJzqkTJ(res.data.house_jzqk);//居住情况
                    _self.drawHxfxTJ(res.data.house_hxfx);//户型分布
                    _self.drawHouseNumTJ(res.data.house_num);//房屋数量
                })
            },
            ////房屋统计
            drawHouseTJ(obj) {
                let yData = [], xData = [], totalNum = 0;
                obj.filter((item, i) => {
                    xData.push(item.name);
                    yData.push(item.number);
                });
                let option = {
                    grid: {
                        right: '8%',
                        left: '3%',
                        top: '15%',
                        bottom: '3%',
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
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#59feff'
                                }, {
                                    offset: 1,
                                    color: '#029bff'
                                }]),
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color: "#fff",
                                formatter: '{c}'
                            }
                        }
                    }]
                };
                houseTJ.setOption(option);
            },
            //居住密度
            drawJzmdTJ(obj) {
                let data = [],legendData=[];
                obj.forEach(function (item, i) {
                    data.push({
                        value: item.number,
                        name: item.name,
                    });
                    legendData.push(item.name)
                });
                let option = {
                    color: ["#1d2088", "#758cea", "#410f82", "#008278", "#c8213d", "#71d7a6"],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x: '2%',
                        y: '3%',
                        orient: "horizontal",
                        data: legendData,
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            color: '#fff',
                            borderRadius: 0
                        }
                    },
                    series: [
                        {
                            name: '居住密度',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: data.sort(function (a, b) {
                                return a.value - b.value
                            }),
                            roseType: 'angle',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 10,
                                    length2: 30
                                }
                            },

                        }
                    ]
                };
                jzmdTJ.setOption(option);
            },
            //房屋登记情况
            drawFwdjTJ(obj) {
                let data = [], legendData = [];
                obj.forEach(function (item, i) {
                    data.push({
                        value: item.value,
                        name: item.name,
                    });
                    legendData.push(item.name)
                });
                let seriesObj = [{
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    radius: ['40%', '60%'],
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'outside',
                                color: '#ddd',
                                formatter: function (params) {
                                    let percent = 0;
                                    let total = 0;
                                    for (let i = 0; i < obj.length; i++) {
                                        total += obj[i].value;
                                    }
                                    percent = ((params.value / total) * 100).toFixed(0);
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
                    data: data
                }];
                let option = {
                    tooltip: {
                        show: false
                    },
                    legend: {
                        x: '2%',
                        y: '3%',
                        orient: "horizontal",
                        data: legendData,
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            color: '#fff',
                            borderRadius: 0
                        }
                    },
                    toolbox: {
                        show: false
                    },
                    color: ["#305fcb", "#ff9c88", "#410f82", "#008278", "#758cea"],
                    series: seriesObj
                };
                fwdjTJ.setOption(option);
            },
            //居住情况
            drawJzqkTJ(obj) {
                let data = [], legendData = [];
                obj.forEach(function (item, i) {
                    data.push({
                        value: item.number,
                        name: item.name,
                    });
                    legendData.push(item.name)
                });
                let option = {
                    color: ['#14b38b', '#007add', '#758cea', '#e15d68', '#EEC900', '#E9967A', '#FF00FF', '#7D26CD'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x: '2%',
                        y: '3%',
                        orient: "horizontal",
                        data: legendData,
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            color: '#fff',
                            borderRadius: 0
                        }
                    },
                    series: [
                        {
                            name: '学历统计分析',
                            type: 'pie',
                            roseType: 'area',
                            z: 10,
                            radius: ['30%', '60%'],
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
                                                total += obj[i].number;
                                            }
                                            percent = ((params.value / total) * 100).toFixed(0);
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
                            data: data
                        }
                    ]
                };
                jzqkTJ.setOption(option);
            },
            //户型分布
            drawHxfxTJ(obj) {
                let data = [], legendData = [];
                obj.forEach(function (item, i) {
                    data.push({
                        value: item.number,
                        name: item.name,
                    });
                    legendData.push(item.name)
                });
                let option = {
                    tooltip: {
                        show: false
                    },
                    legend: {
                        x: '2%',
                        y: '3%',
                        orient: "horizontal",
                        data: legendData,
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            color: '#fff',
                            borderRadius: 0
                        }
                    },
                    toolbox: {
                        show: false
                    },
                    color: ["#64236e", "#007add", "#009944", "#008278", "#758cea"],
                    series: [{
                        name: '',
                        type: 'pie',
                        clockWise: false,
                        radius: [0, '60%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'outside',
                                    color: '#ddd',
                                    formatter: function (params) {
                                        let percent = 0;
                                        let total = 0;
                                        for (let i = 0; i < obj.length; i++) {
                                            total += obj[i].number;
                                        }
                                        percent = ((params.value / total) * 100).toFixed(0);
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
                        data: data
                    }]
                };
                hxfxTJ.setOption(option);
            },
            //房屋数量
            drawHouseNumTJ(obj) {
                let data = [], legendData = [],total=0;
                obj.list.filter((v,j)=>{
                    total+=v.number
                });
                obj.checkedIn.forEach(function (item, i) {
                    data.push( {
                            value:item.number,
                            name:item.name,
                            itemStyle: {
                                normal: {
                                    color: '#007add'
                                }
                            },
                            label: {
                                normal: {
                                    position: 'center',
                                    color:'#fff',
                                    formatter: '{name|'+item.name+'率}\n\n{d} %',
                                    textStyle: {
                                        fontSize: 20
                                    },
                                    rich:{
                                        name:{
                                            textStyle: {
                                                fontSize: 12,
                                                padding: [10, 0]
                                            },
                                        }
                                    }
                                }
                            },
                            labelLine:{
                                show:false
                            }
                        },
                        {
                            value:total-item.number,
                            name:'占位',
                            hoverAnimation:false,
                            animation:false,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#535353'
                                }
                            },
                            label: {
                                show:false
                            }
                        });
                    legendData.push(item.name);
                });
                let option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x: '2%',
                        y: '3%',
                        orient: "horizontal",
                        data: legendData,
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            color: '#fff',
                            borderRadius: 0
                        }
                    },
                    series : [
                        {
                            name: '入住情况',
                            type: 'pie',
                            radius : ['45%', '55%'],
                            labelLine:{
                                show:false
                            },
                            data:data
                        }
                    ]
                };
                houseNumTJ.setOption(option);
            }
        },
        mounted() {
            houseTJ = this.$echarts.init(document.getElementById('houseTJ'));//房屋统计
            jzmdTJ = this.$echarts.init(document.getElementById('jzmdTJ'));//居住密度
            fwdjTJ = this.$echarts.init(document.getElementById('fwdjTJ'));//房屋登记情况
            jzqkTJ = this.$echarts.init(document.getElementById('jzqkTJ'));//居住情况
            hxfxTJ = this.$echarts.init(document.getElementById('hxfxTJ'));//户型分布
            houseNumTJ = this.$echarts.init(document.getElementById('houseNumTJ'));//房屋数量
            this.getData();
            window.addEventListener('resize', () => {
                houseTJ.resize();
                jzmdTJ.resize();
                fwdjTJ.resize();
                jzqkTJ.resize();
                hxfxTJ.resize();
                houseNumTJ.resize();
            });
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../assets/sass/tjfx";
</style>
