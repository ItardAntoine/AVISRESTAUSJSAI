

class Mymap {

	constructor(latLng){
		this.element ;
		this.service ;
		this.restaurants = [] ;
		this.streetview ;
		this.init(latLng) ;
		this.filteredRestaurants =[] ;



	}
	
	init(latLng){

		this.element = new google.maps.Map(document.getElementById('map'), {
			center: latLng,
			zoom: 6
		});
		this.geocoder = new google.maps.Geocoder;
		this.getRestaurants(latLng);
		this.addListeners();

	}

	addListeners(){

		this.addFilterFormListener();

		this.element.addListener('click', e => {

         	this.placeMarkerAndPanTo(e.latLng);

        });
    	document.querySelector(".pop-up-view-btn").addEventListener('click' , function() {

    		this.parentNode.style.display = "none";
    		document.querySelector("#pop-up-view-content").style = null;

    	});
	}
    /**/
	placeMarkerAndPanTo(latLng) {
  
		this.reversegeocodeLatLng(latLng, address => {

			if(this.tempMarker){

				this.tempMarker.element.setMap(null);
				this.tempMarker = null;
			}

			this.tempMarker = new Marker(null , this , latLng , address);

			this.element.panTo(latLng);

		}, error=>{

			window.alert("une erreur est survenue");

			console.log(error);

		});
	}

	reversegeocodeLatLng(latLng, callbackSuccess, callbackError){

		const geocoder = new google.maps.Geocoder;

		geocoder.geocode({'location': latLng}, (results, status) => {
			
			if (status === 'OK') {

				if (results[0]) {

					const address = results[0].formatted_address;
					callbackSuccess(address);	
            	} 
				else {

				callbackError("résultat vide mais statut OK");

            	}
          	} 
			
			else {

            	callbackError('Geocoder failed due to: ' + status);
          	}

        });
	}

	getRestaurants(position) {  
 
		const request = {
		    location: position,
		    radius: '5000',
		    query: 'restaurant',
		};

		this.service = new google.maps.places.PlacesService(this.element);
		this.service.textSearch(request, (restaurants, status) => {


		 	if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (let i = 0 , restaurant; i < restaurants.length; i++) {
      			    restaurant = restaurants[i];
      			    this.addNewRestaurant(restaurant);
		    	}
		  	}
		});
	}

	addNewRestaurant(restaurant) {
	    this.restaurants.push(new Restaurant(restaurant, this));  	
	}

	/**/

	addFilterFormListener(){

		const filterform = document.getElementById("filter-form"); 

		filterform.addEventListener('submit', e => {
			e.preventDefault();
			this.filteringRestaurants();

		})
	}

	filteringRestaurants(){

		const rateMin = document.querySelector("form input[placeholder ='min']").value ;

		const rateMax = document.querySelector("form input[placeholder ='max']").value ;

		if(rateMin > rateMax){

			alert("Le minimum doit être inférieur au maximum");

			return ;

		}

		document.getElementById("restaurant-list").innerHTML = "";

		this.filteredRestaurants = this.restaurants.filter(restaurant => restaurant.element.rating >= rateMin && restaurant.element.rating <= rateMax)
		
		this.filteredRestaurants.forEach(restaurant => {

			restaurant.addtoasidelist(this.element);

		})
	}

}

