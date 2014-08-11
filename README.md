yAJAXUpload
=================

Super simple HTML5 AJAX file upload XHR with progress bar inspired by [kwanlae blog](http://kwanlae.wordpress.com/2012/02/15/file-upload-using-html5-form-javascript-jquery-express-node-js/)

Requirement
-----------

HTML5 compliant browser. You can [test it here](http://html5test.com/)

Usage
-----

Include yAJAXUpload js file. Yes, no other dependency as it uses javascript DOM api

```html
<script src="../dist/jquery.ajaxupload.js"></script>
```

Create `AjaxUpload` object for **each file input control** :

```javascript
var a = new AjaxUpload({
	uploadUrl:"fileUpload.php", // upload url
	inputFile:$("#inputFile") // file input element
	progressBar:$("#progess"), // bootstrap progress bar jquery element
	comment:"...", // additional post data
	fileKey:"myFile", // post file data	
	dateKey: "date", // additional post key (name)
	commentKey: "comment"	 // additional post key (name)
})
.onComplete(function(e){
	// handle if complete
	if(e.success==true){
		// do something
	}else{
		// handled exception
		alert(e.error);
	}
})
.onError(function(d){
	// unhandled exception
	alert("Upload failed: "+d.error);
})
.upload();

````

Applicable for this html example

````html
<input id='inputFile' type='file' class="form-control">
   <span id='upload' class="btn btn-success">     
    	<span class="glyphicon glyphicon-send"></span> Upload     
    </span>
    <div class="progress">
 	<div id="progress" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
 </div>
````

Designed to be used together with [Twitter Bootstrap] (http://getbootstrap.com) progress bar. Once `upload()` invoked, it will automatically update progress bar `aria-valuenow` and css `width`.
