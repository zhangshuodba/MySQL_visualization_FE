<template>
  <div>
       <h3>vue2.0中使用echart</h3>
        <div id="main_s" style=" width:100%; height:350px;"></div>  //这里的高度一定要的，不然是不会显示图标的  
  </div>
</template>

<script>
import echarts from 'echarts';   //这里是你必须的，千万不能忘记！
const myChart = require('echarts-gl/dist/echarts-gl.js')
  export default {  
      data() {  
            return {  
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
            // 绘图  
            drawGraph(id) {  
                // 绘图方法  
                this.chart = echarts.init(document.getElementById(id))  
                    // 皮肤添加同一般使用方式  
                this.chart.showLoading();  
                    // 返回到data中  
                var that = this  
                this.chart.setOption({  
                    title: {  
                        text: '此处为标题',  
                        subtext: '副标题',  
                        x: 'center'  
                    },  
                    tooltip: {  
                        trigger: 'item',  
                        formatter: "{a} <br/>{b} : {c} ({d}%)"  
                    },  
                    legend: {  
                        x: 'center',  
                        y: 'bottom',  
                        data: this.opinion // this  
                    },  
                    toolbox: {  
                        show: true,  
                        feature: {  
                            mark: {  
                                show: true  
                            },  
                            dataView: {  
                                show: true,  
                                readOnly: false  
                            },  
                            magicType: {  
                                show: true,  
                                type: ['pie']  
                            },  
                            restore: {  
                                show: true  
                            },  
                            saveAsImage: {  
                                show: true  
                            }  
                        }  
                    },  
                    calculable: true,  
                    series: [{  
                        name: '种类',  
                        type: 'pie',  
                        // 内圆半径，外圆半径  
                        radius: [30, 100],  
                        // 位置，左右，上下  
                        center: ['50%', '50%'],  
                        roseType: 'area',  
                        data: this.opinionData, // this  
                    }]  
                })  
                this.chart.hideLoading()  
            }  
        },  
        mounted() {  
            this.$nextTick(function() {  
                this.drawGraph('main_s')  
            })  
        }  
}  




</script>
