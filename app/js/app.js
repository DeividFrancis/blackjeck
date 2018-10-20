$(document).ready(() => {
    console.log("Hello");

    $.ajax({
        url: 'api',
        method: 'GET',
        success: (data) => {
            console.log(data);
            
        }
    })
    
});