<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<script type="text/javascript">
	var ctx = "/iSignServer";
	var ctxStatic = "/iSignServer/static";
</script>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>四川CA电子证明系统 --帮助中心</title>

    <link href="bootstrap.min.css" rel="stylesheet">
	<link href="help.css"  rel="stylesheet">
    <link href="cropper.css"  rel="stylesheet">


  </head>

  <body>

    <div class="blog-masthead">
      <div class="container">
      </div>
    </div>
	<br>

	<!--  代码开始 -->
	<div class="container">
		<div class="row"> 
			<form action="http://125.69.77.63:9191/iSignServer/webservice/pdf/signPdfByServer" method="POST" id="signTestForm" enctype="multipart/form-data">
				<p>请选择一个PDF文件:</p>
	                   <input type="file"  id="uploadPdfFile" name="uploadPdfFile">
	            <br>
	            <p>应用：</p>                        
	             <input type="text" class="form-control" id="appCode" value="Test" name="appCode" readonly="readonly"/>   
	             <br>  <br>
	             
	             <p>流水号：</p>                        
	             <input type="text" class="form-control" id="requestId" value="9527" name="requestId"/>   
	             <br>  <br>                    
	            
	             <button type="button" class="btn btn-info block full-width m-b input-height" onclick="signTest();">签署PDF</button>
	             <a class="btn btn-info btn-rounded" id="downloadSignPdf" style="display:none;" href="#">下载文件</a>
	             
	             <span style="color:red;" id="errorMsg"></span>
             </form>                       
		</div>
	</div>
	
	
	<!-- 接口返回说明 -->
	<div class="container">
		<div class="row">
			<div class="panel panel-primary panel-bottom">
			<div class="panel-heading">返回JSON字段说明</div>
			<div class="panel-body panel-body-padding">
				
				<table class="table table-hover table-bordered table-font">
			<thead>
				<tr>

					<th class="text-center">字段名称</th>
					<th class="text-center">内容说明</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>code</td>
					<td>返回状态码，200为正常，500为有异常信息</td>
				</tr>
				<tr>
					<td>message</td>
					<td>当code为200时，该值为空，为500时，为对应的错误信息</td>
				</tr>
				<tr>
					<td>pdfUrl</td>
					<td>签署后PDF下载地址</td>
				</tr>
				<tr>
					<td>pdfPath</td>
					<td>签署后PDF在服务器的路径</td>
				</tr>
				<tr>
					<td>appCode</td>
					<td>签署对应的应用CODE</td>
				</tr>
				<tr>
					<td>requestId</td>
					<td>签署请求流水号</td>
				</tr>
			</tbody>
			
			</table>
				
				
				
			</div>		
		</div>
		</div>
	</div>
	
	
	
	
	<!--  代码结束 -->
	
          
    <script type="text/javascript" src="jquery-1.10.2.min.js"></script>
    <script src="bootstrap.min.js"></script>  
    <script src="cropper.min.js"></script>
    <script type="text/javascript" src="ajaxfileupload.js"></script>
    
   	<script type="text/javascript">
   		
   		
   		function signTest(){
   			var appCode = $("#appCode").val();
   			var requestId = $("#requestId").val();
   			var param ={"appCode":appCode,"requestId":requestId};
			$.ajaxFileUpload({
							url : $("#signTestForm").attr("action"),
							secureuri : false,
							fileElementId : 'uploadPdfFile',
							dataType : 'json',
							data: param,
							success : function(data, status){
								if(data.code == 200){
									var downloadUrl = data.data[0].pdfUrl;
									$("#downloadSignPdf").attr("href",downloadUrl);
									$("#downloadSignPdf").show();
								}else{
									$("#errorMsg").html("错误信息:" + data.message);								}
							},
							error : function(data, status, e){
								$("#errorMsg").html("系统错误:" + data.message);		
							}
						})
   		}
   		
   	</script>
   
    
       
  </body>
</html>