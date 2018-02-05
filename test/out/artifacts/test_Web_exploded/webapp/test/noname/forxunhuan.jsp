<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 引入css -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible"content="IE=EmulateIE9"/>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
<title>for循环的bug</title>
<link >
</head>
<body> 
<span id="a">a</span>
<span id="b">b</span>
<span id="c">c</span>

<script type="text/javascript">
 /* var time=500;
	function forbug (){
		var myArray = [ "a", "b","c","d","e","f"];
		var string="";
		var length=myArray.length;
		for (var i = 0; i < length; i++) {
			string += myArray[i];
			string += i;
		}
		console.log(string);
		time--;
		if( time!=0){
			setTimeout(forbug(),2000);
		}else{
			console.log("文本结束");
		}
		
	};
forbug();	 */
/* 
var ttime=500;
function fornobug (){
	var myArray = [ "a", "b","c","d","e","f"];
	var length=myArray.length;
	var string="";
	for (var i = 0; i < length; i++) {
		string += myArray[i];
		string += i;
	}
	console.log(string);
	ttime--;
	if( ttime!=0){
		setTimeout(fornobug(),2000);
	}else{
		console.log("文本结束");
	}
	
};

fornobug(); */


var time=500;
function forbug (){
	var myArray = [ "a", "b","c","d","e","f"];
	var string="";
	var length=myArray.length;
	for (var i = 0; i < length; i++) {
		console.log(myArray[i]+myArray[i+1]+myArray[i+2]+myArray[i+3]+myArray[i+4]);
		break;
	}
	time--;
	if( time!=0){
		setTimeout(forbug(),2000);
	}else{
		console.log("文本结束");
	}
	
};
forbug();	



</script>

</body>

</html>