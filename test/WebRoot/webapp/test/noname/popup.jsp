<html>
<head>
<style>
	*{ margin:0;padding:0;}
</style>
</head>
<body> 
	<div id="clock_div"></div>
 	<script>
		function my_clock(el){ 
			var today= new Date(); 
			var h=today.getHours();
			var m=today.getMinutes(); 
			var s=today.getSeconds();
			 m=m>=10 ? m:('0'+m); 
			 s=s>=10?s:('0'+s);
			 el.innerHTML=h+":"+m+":"+s; 
			 setTimeout(function(){my_clock(el)},1000); 
		}
		 varclock_div=document.getElementById('clock_div');
		my_clock(clock_div);
 	</script> 
 </body> 
 </html>

