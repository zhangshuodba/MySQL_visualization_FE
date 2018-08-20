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
    title: {
        text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data_xiaoliang:['销量']
    },
    xAxis: {
        data: this.data_xAxis
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: this.data_series
    }]
});
		}


	},
	created(){
		this.graph1()
	}
}





</script>
