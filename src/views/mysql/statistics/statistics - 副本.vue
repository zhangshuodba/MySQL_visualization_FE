<template>
  <div>
    <!-- <Button type="primary">刷新</Button> -->
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        
        <MenuItem name="1">
            <Icon type="ios-paper" />
            <router-link :to="{name:'tablespace'}" type="ghost" style="margin-left: 8px">空间占比</router-link>
        </MenuItem>

    </Menu>
    <br>
    <div id="main_s" style=" width:100%; height:350px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
const myChart = require('echarts-gl/dist/echarts-gl.js')
  export default {  
      data() {  
            return {
                dbinfo:'',
               theme1: 'light',
               tps:[],
               qps:[],
               qps_time:[],
               tps_time:[],
                // 初始化空对象  
                chart: null,  
                // 初始化图表配置  
                opinion: ['A', 'B', 'C', 'D', 'E'],  
                opinionData: [{  
                    value: 26,  
                    name: 'A'  
                }, {  
                    value: 31,  
                    name: 'B'  
                }, {  
                    value: 18,  
                    name: 'C'  
                }, {  
                    value: 28,  
                    name: 'D' 
                }, {  
                    value: 21,  
                    name: 'E'  
                }]  
            }  
        },  
        methods: {
                  getParams () { 
        // 取到路由带过来的参数   
        let routerParams = this.$route.params.dbinfo  
        // 将数据放在当前组件的数据内  
        this.dbinfo = routerParams
      }, 
            // 绘图  
            drawGraph(id) {  
                // 绘图方法   
                this.chart = echarts.init(document.getElementById(id))  
                    // 皮肤添加同一般使用方式  
                this.chart.showLoading();
                    // 返回到data中  
                var that = this  
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                this.chart.setOption({  

    color: colors,

    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        // data:['2015 降水量', '2016 降水量']
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return 'TPS  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: this.tps_time
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return 'QPS  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data:this.qps_time
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name:'QPS',
            type:'line',
            xAxisIndex: 1,
            smooth: true,
            data: this.qps
        },
        {
            name:'TPS',
            type:'line',
            smooth: true,
            data: this.tps
        }
    ]
                })  
                this.chart.hideLoading()  
            },
          fetchqps(){
        fetch("http://100.73.20.3:8888/server/qps",{
            method: "POST",
            body:JSON.stringify(this.dbinfo)
        })
        .then(res => res.json())
        .then(data => {
               let tmp_tps=[]
               let tmp_qps=[]
               let tmp_tps_time=[]
               let tmp_qps_time=[]
            data.forEach(element => {
                    // tmp_tps.push(element.tps)
                    tmp_qps.push(element.qps)
                    tmp_tps.push(element.tps)
                    tmp_tps_time.push(element.time)
                    tmp_qps_time.push(element.time)
            });
            this.tps = tmp_tps
            this.qps = tmp_qps
            this.tps_time = tmp_tps_time
            this.qps_time = tmp_qps_time

            this.$nextTick(function() {  
            this.drawGraph('main_s')  
            });

        })
        .catch(err => console.log(err))
      },


        },  
        mounted() { 
        },
        watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可  
      '$route': 'getParams'
    },
        created(){
        this.getParams()
        this.fetchqps()
    }
}  


</script>
