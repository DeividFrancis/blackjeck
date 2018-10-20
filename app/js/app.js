var api = "172.18.0.2:5000";
var url = "//" + api;

$(document).ready(() => {
    console.log("Hello");

    $.ajax({
        url: url,
        method: 'GET',
        success: (data) => {
            console.log(data);
            
        }
    })
    
});