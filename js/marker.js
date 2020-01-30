

class Marker{

	constructor(restaurant, map, latLng, address_){
		/**/
		const name = restaurant && restaurant.name || null;
		const location = restaurant && restaurant.geometry.location || latLng ; 
		const address = restaurant && restaurant.formatted_address || address_ ;
		const pricelvl = restaurant && restaurant.price_level || null;
		const rating = restaurant && restaurant.rating || null;
		const openingstatut = restaurant && restaurant.openingStatus || null;

		this.element = new google.maps.Marker({position: location, map : map.element}); 

		
		/**/
		
		let infoWindowContent = "";
		infoWindowContent += name && "<h3>" + name + "</h3>" || "";
		infoWindowContent += "<p> " + address + "</p>";
		infoWindowContent += pricelvl && "<p> Catégorie prix : " + pricelvl + "</p>" || "";
		infoWindowContent += rating && "<p> Note : " + rating + "</p>" || "";
		infoWindowContent += openingstatut && "<p> Statut : " + openingstatut + "</p>" || "";

		this.infowindow = new google.maps.InfoWindow({

			content: infoWindowContent 

		});
		/**/
		
		this.element.addListener('click', ()=> {
	    	if (restaurant) { this.infowindow.open(map.element, this.element); }
	    	else {
	    		const restaurant_ = {
	    			geometry : {
	    				location: location
	    			},
	    			formatted_address : address,
	    			price_level : 0,
	    			rating : 0,
	    			opening_status: 'Non défini'
	    		}
	    		document.getElementById("pop-up-view").style.display = "block";
				document.getElementById("pop-up-view-content").innerHTML = "";
				this.openNewRestauForm(restaurant_, map);
	    	}
  		});
	}

	openNewRestauForm(restaurant_, map){

		const form = document.createElement('form');
		form.className = "form-comment";
		form.innerHTML = `
            <input type ="text" placeholder="entrer le nom de votre restaurant" required>
            <br>
            <input type ="text" value = "${restaurant_.formatted_address}" readonly="readonly">
            <br>
            <input type="submit" value="Valider">
   		`;

    	form.addEventListener('submit', e => {
    		e.preventDefault();
    		restaurant_.name = form.querySelector('input[type="text"]').value;
    		map.addNewRestaurant(restaurant_);

    	});

    	document.getElementById("pop-up-view-content").appendChild(form);

	}

	closeForm(){

		this.infowindow.close() ;
	}
}

