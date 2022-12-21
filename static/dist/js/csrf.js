// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
console.log("csrftoken: " + csrftoken);
console.log("cookie: " + document.cookie);

/*
 Fix below CSRF error:
[20/Dec/2022 16:29:07] "GET /ovpn/clientstatus HTTP/1.1" 200 6306
Forbidden (CSRF token missing.): /ovpn/clientstatus/list
[20/Dec/2022 16:29:07] "POST /ovpn/clientstatus/list HTTP/1.1" 403 2506

In the ajax field: add below headers:

"ajax": {
    'url': "clientstatus/list",
    'type': 'POST',
    "headers": { 'X-CSRFToken': csrftoken },
    'data': {},
    'dataType': 'json',
},
*/