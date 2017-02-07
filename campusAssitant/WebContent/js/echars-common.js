define([ 'echarts' ], function(echarts) {
	var echartsCommon = new Object();
	echartsCommon.labelTop = {
		normal: {
			label: {
				color: '#ed272e',
				show: false,
				position: 'center',
				formatter: '{b}',
				textStyle: {
					baseline: 'bottom'
				}
			},

			labelLine: {
				show: false
			}
		}
	};
	echartsCommon.labelBottom = {
		normal: {
			color: function() {
				return '#f1f1f1'
			},
			label: {
				show: true,
				position: 'center'
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	echartsCommon.creatPie = function(id, completeValue, unfinishedValue) {
		var domMain = document.getElementById(id);
		var myChart = echarts.init(domMain);
		var option = {
			series: [ {
				type: 'pie',
				radius: [ '85%', '100%' ],
				itemStyle: {
					normal: {
						color: function() {
							return '#ed272e'
						},
						label: {
							formatter: function(params) {
								return (100 - params.value).toFixed(2) + '%'
							},
							textStyle: {
								baseline: 'middle',
								fontSize: 30,
								color: '#434343'
							}
						},
						labelLine: {
							show: false
						}
					}
				},
				data: [ {
					value: unfinishedValue,
					name: '未体验',
					itemStyle: echartsCommon.labelBottom
				}, {
					value: completeValue,
					name: '已体验',
					itemStyle: echartsCommon.labelTop
				} ]
			} ]
		};
		myChart.setOption(option);
	};
	echartsCommon.createLine = function(id, dataX, dataY, nameY,showY,formate) {
		if(null == showY){
			showY = false;
		}
		if(null == formate){
			formate = '{value}%';
		}
		var domMain = document.getElementById(id);
		var myChart = echarts.init(domMain);
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'none' // 默认为直线，可选为：'line' | 'shadow'
				},
				padding: [ 5, 45, 5, 25 ]
			},
			calculable: false,
			grid: {
				borderWidth: 0
			},
			xAxis: [ {
				type: 'category',
				boundaryGap: false,
				splitLine: {
					lineStyle: {
						color: '#ededed'
					}
				},
				axisLine: { // 坐标轴线
					show: false
				// 默认显示，属性show控制显示与否
				},
				axisLabel: {
					textStyle: {
						color: '#929292',
						fontFamily: 'microsoft yahei'
					},
					margin: 25
				},
				axisTick: {
					show: false
				},
				data: dataX
			} ],
			yAxis: [ {
				type: 'value',
				splitNumber: 3,
				data: dataY,
				axisLine: { // 坐标轴线
					show: false
				// 默认显示，属性show控制显示与否
				},
				splitLine: {
					lineStyle: {
						color: '#ededed'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#929292'
					},
					formatter: formate
				}
			} ],
			series: [ {
				name: nameY,
				type: 'line',
				data: dataY,
				symbol: 'emptyCircle',
				symbolSize: 6,
				itemStyle: {
					normal: {
						color: '#ed272e'
					}
				}
			} ]
		};
		myChart.setOption(option);
	};

	echartsCommon.createProductTypePie = function(id, yData, seriesData) {
		var domMain = document.getElementById(id);
		var myChart = echarts.init(domMain);
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			color: [ '#EC272E', '#FF8578', '#FFBDA3' ],
			legend: {
				x: 'center',
				y: 'bottom',
				textStyle: {
					fontSize: 16,
					fontFamily: 'microsoft yahei'
				},
				data: yData
			},
			series: [ {
				type: 'pie',
				radius: '75%',
				center: [ '50%', '40%' ],
				itemStyle: {
					normal: {
						borderColor: '#FFFFFF',
						borderWidth: '1',
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					},
					emphasis: {
						borderColor: '#FFFFFF',
						borderWidth: '1'
					}
				},
				data: seriesData
			} ]
		};

		myChart.setOption(option);
	};

	/**
	 * 柱状图
	 */
	echartsCommon.barGraph = function(id, yData, xData, name) {
		var domMain = document.getElementById(id);
		var myChart = echarts.init(domMain);
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'none'
				},
				textStyle: {
					color: '#c8c8c8'
				},
				formatter: '{a}:<br/><span style="font-size: 20px;color:#FFFFFF;">{c}</span><br/>{b}',
				padding: [ 5, 60, 5, 25 ]
			},
			calculable: false,
			grid: {
				borderWidth: 0
			},
			xAxis: [ {
				type: 'category',
				axisLabel: {
					textStyle: {
						color: '#929292'
					},
					margin: 25
				},
				axisLine: { // 坐标轴线
					show: false
				// 默认显示，属性show控制显示与否
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				data: xData
			} ],
			yAxis: [ {
				type: 'value',
				splitLine: {
					borderColor: '#ededed'
				},
				axisLabel: {
					textStyle: {
						color: '#929292'
					}
				},
				axisLine: { // 坐标轴线
					show: false
				// 默认显示，属性show控制显示与否
				},
				splitNumber: 3
			} ],
			series: [ {
				name: name,
				type: 'bar',
				itemStyle: {
					normal: {
						color: '#e4e4e4'
					},
					emphasis: {
						color: '#ed272e'
					}
				},
				data: yData
			} ]
		};

		myChart.setOption(option);
	}

	return echartsCommon;
});