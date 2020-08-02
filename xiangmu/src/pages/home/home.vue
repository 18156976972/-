<template>
  <div>
      <div id="main"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
     var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '热卖商品'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["苹果11","iPad mini","汉服","复古汉服","短袖"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 26, 10, 13]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  }
};
</script>
<style scoped>
#main{
  width: 75%;
  height: 500px;
  margin: 20px;
}
</style>