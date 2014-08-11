/**
 * Simple Ajax file upload for HTML5 browser (utilizing xhr upload)
 * Dependencies: jQuery 1.8 (or above)
 * Author: yohanes.gultom@gmail.com
 */

/**
 * AjaxUpload
 * uploadUrl: String of upload URL
 * inputFile: DOM element of input type file
 * progressBar: DOM element of progress bar whose size will be progressively increased
 * params: map (key, value) of additional params which will be sent as POST fields
 */
function AjaxUpload(map) {
    
    var that = this;
    this.uploadUrl = map.uploadUrl;
    this.inputFile = map.inputFile;    
    this.progressBar = map.progressBar;
    this.fileKey = (map.fileKey) ? map.fileKey : 'uploadingFile';
    this.params = map.params;
    
    this.percentage = 0;
    this.percentageWidth = '0%';

    this.onComplete_ = function(res) {
        console.log(res);
    }
     
    this.onError_ = function(res) {
        console.error(res);
    }
     
    this.onCancel_ = function(res) {
        console.log(res);
    }

    this.upload = function() {      
        //var file = that.inputFile.get(0).files[0];
        var file = that.inputFile.files[0];
        if (file) {

            that.percentage=0;
            that.percentageWidth='0%';

            var fd = new FormData();
            fd.append(that.fileKey, file);
            fd.append(that.dateKey, (new Date()).toString());
            fd.append(that.commentKey, that.comment);
         
            var xhr = new XMLHttpRequest();
            var res;
            xhr.upload.addEventListener('progress', that.uploadProgress, false);
            xhr.addEventListener('load', function(evt) {
                that.uploadProgress;                
                try {
                    res = JSON.parse(evt.target.responseText)
                } catch (err) {
                    res = {error: err.message};
                }
                that.onComplete_(res);
            }, false);
            xhr.addEventListener('error', function(evt) {
                try {
                    res = JSON.parse(evt.target.responseText)
                } catch (err) {
                    res = {error: err.message};
                }
                that.onError_(res);
            }, false);
            xhr.addEventListener('abort', function(evt) {
                that.uploadProgress;
                try {
                    res = JSON.parse(evt.target.responseText)
                } catch (err) {
                    res = {error: err.message};
                }
                that.onCancel_(res);
            }, false);
         
            xhr.open('POST', that.uploadUrl);
            xhr.send(fd);
        }
    }    

    this.uploadProgress = function(evt) {
        if(evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);            
            var percentageCompleteStr = percentComplete.toString() + '%';
            that.percentage = percentComplete;
            that.percentageWidth = percentageCompleteStr;
            that.progressBar.innerHTML = that.percentageWidth;
            that.progressBar.setAttribute('aria-valuenow',that.percentage);
            that.progressBar.style.width = that.percentageWidth;
        } else {
            that.percentageWidth = 'unable to compute';
            that.progressBar.innerHTML = that.percentageWidth;
        }
    }
 
    /* overridable event handlers */

    this.onComplete = function(f) {
        that.onComplete_ = f;
        return that;
    }
     
    this.onError = function(f) {
        that.onError_ = f;
        return that;
    }
     
    this.onCancel = function(f) {
        that.onCancel_ = f;
        return that;
    }

}