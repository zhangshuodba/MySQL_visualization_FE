<template>
  <div>
    <div id="audit" style=" width:100%; height:350px;"></div>
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








   title : {
        text: '数据库空间占用图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['mysql','test','inception','slow','performance_schema','sys','information_schema','zabbix']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 110],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'mysql'},
                {value:5, name:'information_schema'},
                {value:15, name:'performance_schema'},
                {value:25, name:'sys'},
                {value:20, name:'inception'},
                {value:35, name:'slow'},
                {value:30, name:'test'},
                {value:40, name:'zabbix'}
            ]
        },
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['75%', '50%'],
            roseType : 'area',
            data:[
                {value:10, name:'mysql'},
                {value:5, name:'test'},
                {value:15, name:'inception'},
                {value:25, name:'slow'},
                {value:20, name:'performance_schema'},
                {value:35, name:'sys'},
                {value:30, name:'information_schema'},
                {value:40, name:'zabbix'}
            ]
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

            this.$nextTick(function() {  
            this.drawGraph('audit')  
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
