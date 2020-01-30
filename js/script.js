
let map ;


function init(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude; 
                const latLng = {lat : lat , lng : lng};  
                map = new Mymap(latLng);
            }, 
            error => {
                map = new Mymap({lat : 44, lng : 5.5});
                errorGeoLocation.innerHTML = error.message;
            }); 
        } 
        else {

            errorGeoLocation.innerHTML = "Geolocation is not supported by this browser.";
        }
    }


