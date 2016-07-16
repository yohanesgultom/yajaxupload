yAJAXUpload
=================
Super simple HTML5 AJAX file upload XHR with progress bar inspired by [kwanlae blog](http://kwanlae.wordpress.com/2012/02/15/file-upload-using-html5-form-javascript-jquery-express-node-js/)

Check the example and the [demo here](http://liveapp.ga/yajaxupload/example/)

Requirement
-----------
HTML5 compliant browser. You can [test it here](http://html5test.com/)

Usage
-----
Include yAJAXUpload js file. Yes, no other dependency as it uses javascript DOM api:
```html
<script src="../dist/yajaxupload.js"></script>
```
or the minified version (suggested for production):
```html
<script src="../dist/yajaxupload.min.js"></script>
```

Create `AjaxUpload` object for **each file input control** as simple as below example :
```javascript
var ajaxUpload = new AjaxUpload({
	// server side url returning JSON
	uploadUrl: 'fileUpload.php', 
	// input file DOM element
	inputFile: uploader.querySelector('.input-file'), 
	// progess bar DOM element whose width will be increased
	progressBar: uploader.querySelector('.progress-bar'), 
	// key for file in POST variables
	fileKey: 'myFile', 
	// params will be pass as POST variables
	params: {..}
}).onComplete(function(res) {
	// do something on upload complete
}).onError(function(res) {
	// do something on error
}).onCancel(function(res) {
	// do something on cancel
}).upload();
			
````

You are free to use [jQuery](http://jquery.com) as a selector. But please be aware that the `AjaxUpload` require DOM Element so you have to use `.get()` method as documented [here](http://api.jquery.com/jquery.get/) like this:

```javascript
var ajaxUpload = new AjaxUpload({
	uploadUrl:'fileUpload.php', 
	inputFile: uploader.find('.input-file').first().get(0), 
	progressBar: uploader.find('.progress-bar').first().get(0), 
	fileKey: 'myFile',
	params: {name: uploader.find('.input-file').attr('name')}
})		
```
