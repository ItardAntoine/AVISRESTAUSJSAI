



const drawstars = (ctnrElt, note)=>{
	ctnrElt.innerHTML="";
	for(let i = 1; i<=5 ; i++){

		if( i < note + 0.25){


			ctnrElt.innerHTML += "<i class=\"fas fa-star\"></i>"; 	
		}

		else if (i >= note + 0.25 && i <= note + 0.75){

			ctnrElt.innerHTML += "<i class=\"fas fa-star-half-alt\"></i>";
		// ajouter demi étoile; 	
		}
		else {

			ctnrElt.innerHTML += "<i class=\"far fa-star\"></i>";
		// ajouter étoile vide; 
		}

	}

};
/*
let drawstarsusers = drawstars();

drawstarsusers1 = drawstarsusers.filter(note);
*/


const draweuros = (ctnrElt, prix)=>{

	if(!prix){

		ctnrElt.innerHTML = "Pas d'informations";

		return;

	}

	for(let i = 0; i<6; i++){

		if(i < prix){

			ctnrElt.innerHTML += "<i class=\"fas fa-euro-sign\"></i>";
		}

		else {


			break;
		}

	}

};




