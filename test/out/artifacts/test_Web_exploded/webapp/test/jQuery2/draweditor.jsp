<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>图片编辑器的jquery的插件</title>
<link rel="stylesheet" type="text/css" href="draweditor/css/normalize.css">
<link rel="stylesheet" type="text/css" href="draweditor/css/wenk.min.css">
<link rel="stylesheet" type="text/css" href="draweditor/css/style.css">
<link rel="stylesheet" type="text/css" href="draweditor/css/jquery.ezdz.min.css">
<link rel="stylesheet" type="text/css" href="draweditor/css/jquery.minicolors-2.1.2.css">
</head>
<body>
<script>
//来源于https://github.com/mburakerman/draweditor 
//图片编辑器，可以作为一个单独页面来编辑图片
</script>
<div class="wrap-drop">
<input type="file" onchange="previewFile()" name="image" accept="image/jpeg , image/jpg , image/png"><br>
</div>

<div class="wrap-image-buttons">
<button id="image-background"><svg class="svgIcons backgroundSvg" width="16px" height="16px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve"><g id="image"><path d="M459,408V51c0-28.05-22.95-51-51-51H51C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357    C436.05,459,459,436.05,459,408z M140.25,267.75l63.75,76.5l89.25-114.75L408,382.5H51L140.25,267.75z" fill="#fff"/>
</g></svg> Make Background Image</button>
<button id="image-on"><svg class="svgIcons imageSvg" width="16px" height="16px" viewBox="0 0 561 561" style="enable-background:new 0 0 561 561;" xml:space="preserve">
<g id="photo-library">
<path d="M561,408V51c0-28.05-22.95-51-51-51H153c-28.05,0-51,22.95-51,51v357c0,28.05,22.95,51,51,51h357    C538.05,459,561,436.05,561,408z M242.25,267.75l63.75,76.5l89.25-114.75L510,382.5H153L242.25,267.75z M0,102v408    c0,28.05,22.95,51,51,51h408v-51H51V102H0z" fill="#fff"/></g></svg> Add Image</button>
</div>

<div class="wrap-canvas-background-color">
<p>or choose a background color</p>
<input type="text" id="hue" class="canvas-background-color" data-control="hue">
</div>

<div class="wrap-canvas">
<canvas id="c" width="500" height="400"></canvas>
</div>

<div class="wrap-text">
<input type="text" id="text" placeholder="Write your text and hit enter" />
Text color: <input type="text" id="hue" class="text-color" data-control="hue">
<select id="text-font"></br>
<option value="Arial">Arial</option>
<option value="Times New Roman">Times New Roman</option>
<option value="Comic Sans Ms">Comic Sans MS</option>
</select>
</div>

<div class="wrap-modes">
<button id="selection">
<svg class="svgIcons selectionSvg" width="16px" height="16px" viewBox="0 0 511.626 511.626" style="enable-background:new 0 0 511.626 511.626;" xml:space="preserve">
<g>
<path d="M506.199,242.968l-73.09-73.089c-3.614-3.617-7.898-5.424-12.848-5.424c-4.948,0-9.229,1.807-12.847,5.424   c-3.613,3.619-5.424,7.902-5.424,12.85v36.547H292.355V109.641h36.549c4.948,0,9.232-1.809,12.847-5.424   c3.614-3.617,5.421-7.896,5.421-12.847c0-4.952-1.807-9.235-5.421-12.851L268.66,5.429c-3.613-3.616-7.895-5.424-12.847-5.424   c-4.952,0-9.232,1.809-12.85,5.424l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.847   c3.619,3.615,7.898,5.424,12.85,5.424h36.545v109.636H109.636v-36.547c0-4.952-1.809-9.234-5.426-12.85   c-3.619-3.617-7.902-5.424-12.85-5.424c-4.947,0-9.23,1.807-12.847,5.424L5.424,242.968C1.809,246.585,0,250.866,0,255.815   s1.809,9.233,5.424,12.847l73.089,73.087c3.617,3.613,7.897,5.431,12.847,5.431c4.952,0,9.234-1.817,12.85-5.431   c3.617-3.61,5.426-7.898,5.426-12.847v-36.549H219.27v109.636h-36.542c-4.952,0-9.235,1.811-12.851,5.424   c-3.617,3.617-5.424,7.898-5.424,12.847s1.807,9.233,5.424,12.854l73.089,73.084c3.621,3.614,7.902,5.424,12.851,5.424   c4.948,0,9.236-1.81,12.847-5.424l73.087-73.084c3.621-3.62,5.428-7.905,5.428-12.854s-1.807-9.229-5.428-12.847   c-3.614-3.613-7.898-5.424-12.847-5.424h-36.542V292.356h109.633v36.553c0,4.948,1.807,9.232,5.42,12.847   c3.621,3.613,7.905,5.428,12.854,5.428c4.944,0,9.226-1.814,12.847-5.428l73.087-73.091c3.617-3.617,5.424-7.901,5.424-12.85   S509.82,246.585,506.199,242.968z" fill="#fff"/>
</g></svg> Selection Mode</button>
<button id="draw"><svg class="svgIcons drawSvg" width="16px" height="16px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
<g id="create">
<path d="M0,362.1V459h96.9l280.5-283.05l-96.9-96.9L0,362.1z M451.35,102c10.2-10.2,10.2-25.5,0-35.7L392.7,7.649    c-10.2-10.2-25.5-10.2-35.7,0l-45.9,45.9l96.9,96.9L451.35,102z" fill="#fff"/>
</g></svg> Draw Mode</button>
<div class="wrap-range">
<input type="range" id="range" min="1" max="50" value="1" >
<input type="text" id="value" value="1">
</div>
Brush color: <input type="text" id="hue" class="draw-color" data-control="hue">
</div>

<div class="wrap-delete">
<span data-wenk="To select an object, you have to click Selection Mode to activate it." data-wenk-pos="bottom"  data-wenk-length="medium">
<button id="delete"><svg class="svgIcons deleteSelectedSvg" width="16px" height="16px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
<g id="cancel">
<path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M382.5,346.8l-35.7,35.7    L255,290.7l-91.8,91.8l-35.7-35.7l91.8-91.8l-91.8-91.8l35.7-35.7l91.8,91.8l91.8-91.8l35.7,35.7L290.7,255L382.5,346.8z" fill="#fff"/></g></svg> Delete Selected Object</button></span>
<button id="delete-all">
<svg class="svgIcons deleteAllSvg" width="16px" height="16px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
<g id="clear">
<polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3     214.2,178.5   " fill="#fff"/>
</g></svg> Delete All Objects</button>
</div>

<div class="wrap-save">
<button id="save"><svg  class="svgIcons saveSvg" width="16px" height="16px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
<g id="save">
<path d="M357,0H51C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V102L357,0z M229.5,408    c-43.35,0-76.5-33.15-76.5-76.5s33.15-76.5,76.5-76.5c43.35,0,76.5,33.15,76.5,76.5S272.85,408,229.5,408z M306,153H51V51h255V153z" fill="#fff"/>
</g></svg> Save</button>
</div>

<script type="text/javascript" src="draweditor/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="draweditor/fabric-1.6.3.min.js"></script>
<script type="text/javascript" src="draweditor/jquery.ezdz.min.js"></script>
<script type="text/javascript" src="draweditor/jquery.minicolors-2.1.2.min.js"></script>
<script type="text/javascript" src="draweditor/script.js"></script>
</body>
</html>
