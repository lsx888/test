<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="echarts.js"></script>
<title>hello echarts！</title>
</head>
<body>
 <div id="main" style="width: 600px;height:400px;"></div> 
 <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
        		//主题
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
            	//data与name的值一致（name此时值为‘销量1’）
                data:['销量1']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量1',
              //“bar”：  条状图，pie：“饼状态图”
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
	
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 
    </script>
</body>
</html>