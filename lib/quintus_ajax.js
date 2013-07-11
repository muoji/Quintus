Quintus.Ajax = function(Q) {

Q.getXMLHttp = function() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

Q.ajax = function(options) {
    var xmlhttp = Q.getXMLHttp();

    xmlhttp.open(options.method || "GET", options.url, (options.async !== undefined && options.async) || true);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            if(options.success) {
                options.success(JSON.parse(xmlhttp.responseText));
            }
        }
    };

    if(options.data) {
        if(options.dataType == "json") {
            xmlhttp.setRequestHeader("Content-type","application/json; charset=utf-8");
            xmlhttp.send(JSON.stringify(options.data));
        } else {
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            var d = [];
            for(var i in options.data) {
                var _ = options.data[i];
                if(typeof yourVariable === 'object') {
                    _ = encodeURIComponent(JSON.stringify(_));
                }
                d.push(i+"="+_);
            }
            xmlhttp.send(d.join("&"));
        }
    } else {
        xmlhttp.send();
    }
};

};
