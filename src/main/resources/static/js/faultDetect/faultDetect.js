$(document).ready(function () {
    initEcharts();
$("#skip_fIndex").click(function () {
        window.location.href="faultDetect_communicate";
    })
})



function initEcharts() {
    $(".c1").animate({
        height: "70%"
    }, 1000);
    $(".c2").animate({
        height: "50%"
    }, 1000);
    $(".c3").animate({
        height: "33%"
    }, 1000);
    $(".c4").animate({
        height: "23%"
    }, 1000);
    $(".c5").animate({
        height: "13%"
    }, 1000)
    //$('#container1').hotSpot();

// 基于准备好的dom，初始化echarts实例
var myChart3 = echarts.init(document.getElementById('energyLost'));
var option3 = {
    title: {
        text: '2016-02-27'
    },
    tooltip: {
        trigger: 'axis',
        textStyle: {color: '#fff'}
    },
    legend: {
        data: ['单位信息流量综合能耗', '']
    },
    toolbox: {
        show: true,
        feature: {
            //dataZoom: {},
            //dataView: {readOnly: false},
            //magicType: {type: ['line', 'bar']},
            //restore: {},
            saveAsImage: {}
        }
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value} kgce',
                textStyle: {color: '#fff'}
            }
        },
        {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C',
                textStyle: {color: '#fff'}
            },
            splitLine: {show: false},

        }
    ],
    series: [

        {
            name: '单位信息流量综合能耗',
            type: 'bar',
            data: [100, 150, 120, 130, 180, 175],
            barWidth: '50',
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        },
        // {
        // name:'温度',
        //  type:'line',
        //  data:[11, 11, 15, 13, 12, 13],
        //   markPoint : {
        //      data : [
        //          {type : 'max', name: '最大值'},
        //          {type : 'min', name: '最小值'}
        //      ],
        //      itemStyle:{normal:{'color':'rgba(250,0,0,0.8)'}}
        //   },
        //  markLine : {
        //      data : [
        //          {type : 'average', name: '平均值'}
        //     ]
        //  },
        //   yAxisIndex: 1
        // }

    ]
};
myChart3.setOption(option3);
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('test'));

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['主设备能耗', '机房总能耗'],
        textStyle: {color: '#fff'}
    },

    grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },

    xAxis: [
        {
            type: 'category',
            data: ['机房A', '机房B', '机房C', '机房D', '机房E', '机房F'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}

        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    type: 'dotted'
                }
            },
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    axis: {
        splitLine: {show: false}
    },
    series: [
        {
            name: '主设备能耗',
            type: 'line',
            stack: 'PUE',
            itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
            data: [16, 10, 20, 13, 12, 15]
        },
        {
            name: '机房总能耗',
            type: 'line',
            stack: 'PUE',
            itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
            data: [14, 7, 16, 11, 9, 12]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

//营业厅能耗
var hallChart = echarts.init(document.getElementById('hallLost'));
var option3 = {
    tooltip: {
        trigger: 'axis',
        textStyle: {color: '#fff'}
    },
    legend: {
        data: ['营业厅能耗', '']
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: ['营业厅1', '营业厅2', '营业厅3', '营业厅4', '营业厅5', '营业厅6'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    type: 'dotted'
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {color: '#fff'}
            }
        }

    ],
    series: [
        {
            name: '营业厅能耗',
            type: 'line',
            data: [10, 7, 19, 13, 18, 20],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        }
    ]
};
hallChart.setOption(option3);

//基站能耗
var stationChart = echarts.init(document.getElementById('stationLost'));
var stationOption = {
    tooltip: {
        trigger: 'axis',
        textStyle: {color: '#fff'}
    },
    legend: {
        data: ['基站能耗', '']
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: ['基站1', '基站2', '基站3', '基站4'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {color: '#fff'}
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    type: 'dotted'
                }
            }
        }
    ],
    series: [

        {
            name: '基站能耗',
            type: 'bar',
            data: [100, 150, 120, 80],
            barWidth: '30',
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        }
    ]
};
stationChart.setOption(stationOption);

//办公楼总体能耗
var bChart = echarts.init(document.getElementById('buildingLost'));
var bOption = {
    tooltip: {
        trigger: 'axis',
        textStyle: {color: '#fff'}
    },
    legend: {
        data: ['办公楼总体能耗', '']
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: ['办公楼'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {color: '#fff'}
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    type: 'dotted'
                }
            }
        }
    ],
    series: [

        {
            name: '办公楼总体能耗',
            type: 'bar',
            data: [300],
            barWidth: '50',
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        }
    ]
};
bChart.setOption(bOption);

//每层能耗
var fChart = echarts.init(document.getElementById('floorLost'));
var fOption = {
    tooltip: {
        trigger: 'axis',
        textStyle: {color: '#fff'}
    },
    legend: {
        data: ['每层能耗', '']
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: ['-1楼', '1楼', '2楼', '3楼', '4楼', '5楼'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    type: 'dotted'
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {color: '#fff'}
            }
        }

    ],
    series: [
        {
            name: '营业厅能耗',
            type: 'line',
            data: [10, 37, 39, 23, 18, 20],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        }
    ]
};
fChart.setOption(fOption);
//部门能耗
var dChart = echarts.init(document.getElementById('departmentLost'));
var dOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c}kwh ({d}%)",
        textStyle: {color: '#fff'}
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['研发', '运营', '后勤', '人力', '供应'],
        textStyle: {color: '#fff'}
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['65%', '70%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: true,
                    formatter: '{b}:{c}kwh({d}%)',
                    position: 'left'
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data: [
                {value: 23, name: '研发'},
                {value: 40, name: '运营'},
                {value: 30, name: '后勤'},
                {value: 10, name: '人力'},
                {value: 15, name: '供应'},
            ]
        }
    ]
};
dChart.setOption(dOption);

//部门能耗排名
var rChart = echarts.init(document.getElementById('departmentRank'));
var rOption = {
    tooltip: {
        trigger: 'axis',
        textStyle: {color: '#fff'}
    },
    legend: {
        data: ['部门能耗排名', '']
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: ['运营', '后勤', '研发', '供应', '人力'],
            splitLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {color: '#fff'}
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    type: 'dotted'
                }
            }
        }
    ],
    series: [

        {
            name: '基站能耗',
            type: 'bar',
            data: [40, 30, 23, 15, 10],
            barWidth: '30',
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        }
    ]
};
rChart.setOption(rOption);
}