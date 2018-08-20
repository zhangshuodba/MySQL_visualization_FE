<template>
  <div>
    <div id="container" style=" width:100%; height:350px;"></div>
  </div>
</template>	

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

var myChart = echarts.init(document.getElementById('main'));

export default { 
	data(){
		return {
			data_xAxis:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
			data_series:[5, 20, 36, 10, 10, 20]

		}
	},
	computed:{

	},
	methods:{
		graph1(){
			myChart.setOption({
   legend: {},
    tooltip: {},
    dataset: {
        // 提供一份数据。
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: {type: 'category'},
    // 声明一个 Y 轴，数值轴。
    yAxis: {},
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]});
		}


	},
	created(){
		this.graph1()
	}
}





</script>
