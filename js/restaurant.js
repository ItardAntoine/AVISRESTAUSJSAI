

class Restaurant {

	constructor(restaurant, map){
		this.element = restaurant;
		if(!restaurant.opening_hours){
			this.element.openingStatus = 'Non précisé';
		}
		else if (restaurant.opening_hours.isOpen()){
			this.element.openingStatus = "Ouvert";
		}
		else {
			this.element.openingStatus = "Fermé";
		}
		this.marker = new Marker(this.element, map);
		this.reviews = [] ;
		this.addtoasidelist(map.element);
	}

	addtoasidelist(map){

		let ctnElt = document.createElement("div");
	    ctnElt.className = "restaurant-ctn-aside";

	    let nomRestaurantElt = document.createElement("h2");
	    nomRestaurantElt.style.color = "Black";
	    nomRestaurantElt.textContent = this.element.name;

	    let restaurantAdresseElt = document.createElement("p");
	    restaurantAdresseElt.textContent = this.element.formatted_address;

	    let priceLevelElt = document.createElement("p");
	    priceLevelElt.textContent = "Prix : ";

	    let eurosElt = document.createElement("div");
	    eurosElt.className = "euros-ctn-Elt";

	    draweuros(priceLevelElt, this.element.price_level);

	    let ratingElt = document.createElement("span");
	    ratingElt.textContent = "Note :" + this.element.rating;

	    let starElt = document.createElement("span");
	    starElt.className = "star-ctn-Elt";

	    drawstars(starElt, this.element.rating);
	    
	    let openingStatutElt = document.createElement("p");
	    openingStatutElt.textContent = "Ouvert/fermé :" + this.element.openingStatus;

	    let buttoncommentaries = document.createElement("button"); 
	    buttoncommentaries.textContent = "Commentaires des consommateurs";

	    buttoncommentaries.addEventListener('click' , ()=>{

			document.getElementById("pop-up-view").style.display = "block";
			document.getElementById("pop-up-view-content").innerHTML = "";
			document.querySelector("#pop-up-view-content").style = null;
			this.getCommentaries(map);

		});

	    let buttonstreetview = document.createElement("button");
	    buttonstreetview.textContent = "Street view";

		buttonstreetview.addEventListener('click' , ()=>{

			document.getElementById("pop-up-view").style.display = "block";
			document.getElementById("pop-up-view-content").innerHTML = "";
			this.showstreetview();

		});


		ctnElt.appendChild(nomRestaurantElt);
		ctnElt.appendChild(restaurantAdresseElt);
		ctnElt.appendChild(priceLevelElt);
		ctnElt.appendChild(eurosElt);
		ctnElt.appendChild(ratingElt);
		ctnElt.appendChild(starElt);
		ctnElt.appendChild(openingStatutElt);
		ctnElt.appendChild(buttoncommentaries);
		ctnElt.appendChild(buttonstreetview);
		this.starElt = starElt;
		this.ratingElt = ratingElt ;

	    document.getElementById("restaurant-list").appendChild(ctnElt);
		
	}

	showstreetview(){

		let streetview = new google.maps.StreetViewPanorama(
			document.getElementById('pop-up-view-content'), {
        		position: this.element.geometry.location,
        		pov: {
          			heading: 34,
          			pitch: 10

	        }
		})
	}
	
	getCommentaries(map){

		const popupview = document.getElementById("pop-up-view-content");

		const addreviews = popupview => {

			this.addCommentForm(popupview);
			this.reviews.forEach( review => {

				this.addCommentTolist(review, popupview);

	 		});
		};
		
		if (!this.element.place_id) {
			this.reviews = [];
			this.addCommentForm(popupview);
		}
		else if(this.reviews.length > 0){
			addreviews(popupview);
		}
		else {
			let request = {
	 			placeId: this.element.place_id,
	  			fields: ['reviews']
			};

			let service = new google.maps.places.PlacesService(map);

			const callback = (placeReviews, status) => {
				
	 			if (status == google.maps.places.PlacesServiceStatus.OK) {

					this.reviews = placeReviews.reviews ; 
					addreviews(popupview);
	  			}
			};

			service.getDetails(request, callback);
		}
		
	}


	/**/
	addCommentTolist(comment, commentsList){

		let ctnElt = document.createElement("div");
	    ctnElt.className = "commentary-ctn";

	    let nameElt = document.createElement("h3");
	    nameElt.style.color = "Black";
	    nameElt.textContent = comment.author_name;

	    let commentaryContentElt = document.createElement("p");
	    commentaryContentElt.textContent = comment.text;

	    let ratingElt = document.createElement("span");
	    ratingElt.textContent = "Note :" + comment.rating;

		ctnElt.appendChild(nameElt);
		ctnElt.appendChild(commentaryContentElt);
		ctnElt.appendChild(ratingElt);

	    commentsList.appendChild(ctnElt);
	}

	addCommentForm(popupview){


		const newCommentForm = document.createElement("form");
		newCommentForm.className = "form-comment";

		const authorName = document.createElement("input");
		authorName.placeholder = "Votre nom";
		authorName.required = true;

		const textArea = document.createElement("input");
		textArea.placeholder = "Votre commentaire";
		textArea.required = true;

		const rating = document.createElement("input");
		rating.placeholder = "Votre note";
		rating.type = "number";
		rating.min = "0";
		rating.max = "5";
		rating.required = true;

		const button = document.createElement("input");

		button.value ="ajouter votre avis";
		button.type = "submit";

		newCommentForm.appendChild(authorName);
		newCommentForm.appendChild(textArea);
		newCommentForm.appendChild(rating);
		newCommentForm.appendChild(button);

		newCommentForm.addEventListener("submit" , e =>{

			e.preventDefault();

			const review = {
				author_name : authorName.value , 
				rating : rating.value ,
				text : textArea.value  
			};

			this.reviews.push(review);
			this.element.rating = (this.element.rating * (this.reviews.length - 1) + Number(review.rating)) / this.reviews.length ;
			console.log(typeof this.element.rating , typeof review.rating , typeof this.reviews.length);
			this.addCommentTolist(review , popupview)
	    	drawstars(this.starElt, this.element.rating);
	    	this.ratingElt.innerHTML = 'Note :' + (Math.round(this.element.rating * 10) / 10);
	    	 

		});

		popupview.appendChild(newCommentForm) ;
	}

}
