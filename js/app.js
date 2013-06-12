
/* ----------------------------------- *\
CONTENTS

01. OPEN MENU
02. GALLERY
03. GALLERY LIGHTBOX
04. OPEN UPLOAD FORM
05. OPEN LOGIN FORM
06. SWIPE
07. SIGNING UP
08. FACEBOOK LOG IN
09. LOG IN
10. LOAD GALLERY 
11. FORM NAVIGATION
12. GEO LOCATION
13. UPLOAD PICTURE
14. PREVIEW PICTURE
15. SAVE INFORMATION
16.	LIKE SCORE
17.	UNLIKE SCORE
18. LIKE BUTTON
19. TILE  BUTTON
20. CLOSE BUTTON
21. EVENT CALENDAR CONTENT
22. EVENT CALENDAR ZOOM EFFECT
23. TRACK GALLERY
24. ADDMORE DROPDOWN CHANGE
25. CLOSE GALLERIES

99. $(document).ready
\* ----------------------------------- */


/* ----------------------------------- *\
01. OPEN MENU
\* ----------------------------------- */
var menu = true;

function openMenu(){
	// Animerer elementet #menuOpen ind fra venstre side
	$("#menuOpen").animate({ marginTop:"50px", marginLeft: "0px"},400);
	// Ændre boolean variable, således der vides at menuen nu er synlig
	menu = false;	
}
function closeMenu(){
	// Variabel deklareres sådan der vides hvor bred skærmen er
    var windowWidth = $(window).width();
    // Menuen slides nu til venstre med samme afstand som skærmen er bred
	$("#menuOpen").animate({ marginTop:"50px",  marginLeft: "-"+windowWidth+"px"},400);
	// Menuen er nu slidet ud og variablen ændres nu til true igen
	menu = true;	
}

$("#menu").click(function(){
	// Når menu ikonet klikkes, spørger om menuen allerede er synlig eller ej.
	if(menu == true){
		// Når menuen er udenfor skærmen kaldes funktionen der animerer den ind.
		openMenu();
	}else {
		// og omvendt når menuen starter inde.
		closeMenu();
	}
});

/* ----------------------------------- *\
02. GALLERY
\* ----------------------------------- */
  
  var galleryStatus = 1;
  var galleryOpen = false;

	//GALLERY SLIDE RIGHT
  function galleryRight(element) {
  	// Funktionen får en id som parameter, når funktionen kaldes.

  	// En variable deklareres når funktionen kaldes. Her er det størrelsen på hvert billede i galleriet.
  	var tileWidth = $(element).find(".pic").outerWidth(true, true);  

  	// If statement der konstaterer om man er nået til sidste billede i galleriet.
    if($(window).outerWidth(true, true) < $(element).outerWidth(true, true) - tileWidth*0.7) {
    	// Hvis dette er tilfældet, gøres en af to ting:
	    if(galleryOpen){ 
	    	// I tilfælde af, at galleriet er zoomet ind, bliver der animeret til venstre
	    	// med konstant der tager højde for, at der ikke er padding imellem billederne.
	       $(element).stop(true, true).animate({ marginLeft: "-="+tileWidth*0.9985+'px'})
	       galleryStatus = galleryStatus+1;
	    } else {
	    	// og hvis der ikke er zoomet ind, bliver der taget højde for, at der er 
	    	// afstand imellem de to billeder der skal animeres.
	      $(element).stop(true, true).animate({ marginLeft: "-="+tileWidth*1.002+'px'})
	      galleryStatus = galleryStatus+1;
	    }
    } else{
    	// Hvis man har nået enden, skal billederne ikke animeres. 
    	// I stedet udføres en shake effect for brugervenlighedens skyld.
          // SHAKE EFFECT!
  	}
      console.log(galleryStatus);
  }
  
  //GALLERY SLIDE LEFT
  function galleryLeft(element) {
  	var tileWidth = $(element).find(".pic").outerWidth(true, true)*1.002;  
      if($(element).offset().left  > -(tileWidth*0.7)  ) {
        // SHAKE EFFECT!
      } else{
        if(galleryOpen){ 
          $(element).stop(true, true).animate({ marginLeft: '+='+tileWidth*0.9965+'px'})
          galleryStatus = galleryStatus-1;
        } else { 
          $(element).stop(true, true).animate({ marginLeft: '+='+tileWidth*1+'px'})

          galleryStatus = galleryStatus-1;
        }
      }
      console.log(galleryStatus); 
  } 
	
/* ----------------------------------- *\
03. GALLERYTOP LIGHTBOX
\* ----------------------------------- */

function galleryPopUp() {
  $("#galleryTop").stop(true,true).animate({marginTop: '-1%', marginLeft: '-1%', width: '+=1040%'},400)
  // Missing: PopUp ved hvor langt brugeren er kommet                      ^^ der
  galleryOpen = true;
}

function galleryClose() {
  $("#galleryTop").stop(true,true).animate({marginTop: '+0%', marginLeft: '0%', width: '-=1040%'},400)

  galleryOpen = false;
}

$('body').on('click', '.postZoom', function() {
	if(galleryOpen == false){
			galleryPopUp()
		} else {
	   	 	galleryClose()	
		}
});

/* ----------------------------------- *\
04. OPEN UPLOAD FORM
\* ----------------------------------- */

function openUploadForm() {
  $("#fileupload").fadeIn(300);
  $("#uploadBG").fadeIn(200);
  uploadOpen = true;
}

function closeForm(){
	// Samtlige forms fader ud:
	$("#fileupload").fadeOut(300);
	$("#loginWrapper").fadeOut(300);
	$("#uploadBG").fadeOut(200);
	$(".error").fadeOut(100)
	// Login oplysninger bliver slettet:
	$("#loginName").removeClass('errorBorder');
	$("#loginPass").removeClass('errorBorder');
	$("#loginPass").removeAttr('value');
	$("#loginName").removeAttr('value');
	/* Boolean variablen sættes til falsk, 
	   således der kan spørgers på dette senere */ 
	uploadOpen = false;
}
var uploadOpen = false;
$("#uploadBtn").click(function(){
	// Når der trykkes på uploadknapper, spørges der om brugeren er logget ind.
	var currentUser = Parse.User.current();
	if (currentUser) {
		// Hvis brugeren er logget ind åbnes upload formularen
	    openUploadForm();

	} else {
		// Hvis brugeren ikke er logget ind åbnes login formularen
	 	openLoginForm();
	 	// samt en fejl kommer op på formularen, som fortæller man skal logge ind.
	 	$("#loginError").fadeIn(1000);
	}
 
});

$("#uploadBG").click(function(){
	// når der trykkes på den sorte baggrund bliver der spurgt om formularen er vist eller ej
	if (uploadOpen==false){
		// Hvis formularen ikke er vist, bliver den vist.
		openUploadForm();
		/* NOTE: Dette behøves i praksis ikke, da baggrunden aldrig bliver vist, hvis
		         Formularen ikke er vist. Dog er dette en ekstra sikkerhed */  
	} else {
		// Hvis formularen er vist, bliver den lukket ned
		closeForm();
	}
});

/* ----------------------------------- *\
05. OPEN LOGIN FORM
\* ----------------------------------- */
function openLoginForm() {
  $("#loginWrapper").fadeIn(300);
  $("#uploadBG").fadeIn(200);
  uploadOpen = true;
}



$
$('body').on('click', '#logIn', function() {
    openLoginForm();
});

/* ----------------------------------- *\
06. SWIPE
\* ----------------------------------- */


function swipeEvents(){
	// Til at udfører swipe event benyttes Hammer.js

	/* Først nulstilles alle swipe events for de fire gallerier med
	   i appen. Således begynder de ikke at swipe to gange, når funktionen
	   kaldes for anden gang.  */
	Hammer($(".gallery")).off("swiperight");
	Hammer($(".gallery")).off("swipeleft");

	// Når der swips til højre i galleriet bliver funktion eksekveret
	Hammer($(".gallery")).on("swiperight", function(event) {
		// Først spørges om elementet id.
		var id = $(this).attr("id");
		/* Elementets ID bruges som funktionen ID, 
		   sådan der vides hvilken galleri der blev swipet i */ 
		galleryLeft("#"+id);
		
	});


	Hammer($(".gallery")).on("swipeleft", function(event) {
		var id = $(this).attr("id");
		galleryRight("#"+id);
	});


	Hammer($(".eventCalendar")).on("pinchout", function(event) {
		openCalendar();
	});

	Hammer($(".eventCalendar")).on("pinchin", function(event) {
		closeCalendar();
	});

	
	Hammer($("#galleryTop")).on("doubletap", function(event) {
		if(galleryOpen == false){
			galleryPopUp()
		} else {
	   	 	galleryClose()	
		}
	});

	Hammer($("body")).on("swiperight", function(event) {
		//openMenu();
	});

	Hammer($("body")).on("swipeleft", function(event) {
		//closeMenu();
	});
}

	

/* ----------------------------------- *\
07. SIGNING UP / log out
\* ----------------------------------- */

function logout() {
	// Først logges der ud fra Parse databasen
	Parse.User.logOut()
	// Derefter bliver login knappen appendet ind i HTML'en igen
	$("#output").html('<div id="logIn"><img src="images/icon/lock.png" alt="log in">'+
	'<p id="usernametxt">Log in</p></div>');
}
var logOutVis = false;
$('body').on('click', '#loggedIn', function() {
	// Når der klikkes på ens brugernavn, bliver der spurgt om log out knappen er synlig
	if (logOutVis == false){
		// Dette vil i første omgang være falskt, hvorefter knappen bliver vist
		$("#logOut").fadeIn("slow")
		// Derefter ændres variablen til at være sand
		logOutVis= true;
	} else {
		// Således den derefter er sand, og knappen vil forsvinde.
		$("#logOut").fadeOut("slow")
		// Variablen vil derefter blive sat til falsk og kører derfor i ring.
		logOutVis= false;
	}
	
});

$('body').on('click', '#logOutBtn', function() {
	// Når log out knappen trykkes vil funktionen logout blive eksekveret
	logout();
	// Samtidig vil den fysiske knap forsvinde
	$("#logOut").fadeOut("slow")
	// og så vil variablen der deklarerer om knappen er synlig eller ej sættes til falsk.
	logOutVis= false;
});





$("#signupSend").click(function(){
	/* Når brugeren vælger at signe op, 
	   bliver der lavet en ny bruger */
	var user = new Parse.User();
	// Brugerinformationen bliver gemt i variabler
	var userName = $("#loginName").val();
	var userPass = $("#loginPass").val();

	// Variablerne bliver sat lig med brugerens password og username.
	user.set("username", userName);
	user.set("password", userPass);
	// Brugeren signes derefter op.
	user.signUp(null, {
	  success: function(user) {
	  	/* Hvis begge input er valide bliver logIn funktionen kaldt
	  	   med de samme input som der lige er signet op med.  */
	    logIn();
	  },
	  error: function(user, error) {
	  	// Hvis der sker en fejl, bliver fejlbeskeden fra serveren vist.
	    $("#loginError").html('<p>'+error.message+'</p>')
	    // Fejlen slider ind i toppen af formularen.
	    $("#loginError").slideDown(200)
	    // Feltet med brugernavnet får en rød streg omkring.
	    $("#loginName").addClass('errorBorder');
	    // Feltet med passwordet slettet
	    $("#loginPass").removeAttr('value');
	  }
  });
});

/* ----------------------------------- *\
08. FACEBOOK LOG IN
\* ----------------------------------- *

	// NICE TO HAVE - COMMING SOON

/* ----------------------------------- *\
09. LOG IN
\* ----------------------------------- */

function logIn() {
	// Når funktionen logIn bliver brugerens login information gemt som variabler
	var userName = $("#loginName").val();
	var userPass = $("#loginPass").val();
	// Derefter kaldes Parse databasen med brugernavn og kodeord
	Parse.User.logIn(userName, userPass , {
	  success: function(user) {
	    // I tilfælde af, at brugeren eksisterer gemmes brugernavnet som en variabel
	    var currentUser =  Parse.User.current().getUsername();
	    // Brugernavnet bliver derefter sat ind de to steder det bliver vist i appen's HTML.
	    $("#output").html('<div id="loggedIn"><img src="images/icon/lock_open.png" alt="log in">'+
		"<p>"+currentUser+"</p></div>");
		$(".uploadUser").html("<p>"+currentUser+"</p>");
		// Derefter lukkes formularen
		closeForm();
		/* En midlertidig løsning der sørger for, at den samme information 
		   ikke sendes to gange. I stedet brugernavn og kodeord sat til null */
		$("#loginPass").removeAttr('value');
		$("#loginName").removeAttr('value');
	  },
	  error: function(user, error) {
	  	// I tilfælde af, at brugerinformationen ikke er gyldtig, bliver der vist en fejl
	    $("#loginError").html('<p>'+error.message+'</p>')
	    // Fejlbeskeden bliver animeret ind
	    $("#loginError").slideDown(200)
	    // Begge inputfelter får class med en rød border omkring
	    $("#loginName").addClass('errorBorder');
	    $("#loginPass").addClass('errorBorder');
	    // Passwordet bliver slettet for en sikkerheds skyld
	    $("#loginPass").removeAttr('value');
	  }
	});
}

$("#loginSend").click(function(){
	/* Event handler for knappen log in.
	   Når knappen trykkes bliver funktionen logIn kaldt */	
	logIn();
});

$("#loginPass").keyup(function(event){
	/* Hvis man i password feltet trykker enter bliver
	   der forsøgt at logge ind */
    if(event.keyCode == 13){
    	logIn();	
    }
});


/* ----------------------------------- *\
10. LOAD GALLERY
\* ----------------------------------- */

function getGallery() {
	// Extender tabelen "Gallery" i parse databasen
	var Post = Parse.Object.extend("Gallery");
	// Opretter en forespørgsel på baggrund af overstående variabel
	var query = new Parse.Query(Post);
	// Sætter regler for forespørgslen. 
	query.descending("Score");
	// i dette tilfælde tager den de 20 med højeste score
	query.limit(20);
	// Forespørgslen sendes
	query.find({
		success: function(results) {
			/* Hvis forespørgslen lykkes slettes alt indhold i galleriet først
			for at sikre, at man under ingen omstændigheder kan få double content */
			$("#galleryTop").html("");
			// Her oprettet en Handlebars template ud fra indholdet af elementet #picture-template
			var template = Handlebars.compile($("#picture-template").html())
			// For hver af de tyve resultater sættes indholdet ind i templaten
			$(results).each(function(i,e){
				var q = e.toJSON();
				// de 20 templates sættes derefter ind i galleriet
				$("#galleryTop").append(template(q))
			});
		},
		error: function(error){
			// Hvis forespørgslen ikek lykkes, oprettes en fejlmedelelse i konsolen til debugging
			console.log(error.messsage)
		}
	});
}

/* ----------------------------------- *\
11. FORM NAVIGATION
\* ----------------------------------- */

function step1() {
    $("#uploadStep2").fadeOut(100);
    $("#uploadStep1").fadeIn(100);
}

function step2() {
    $("#uploadStep1").fadeOut(100);
    $("#uploadStep2").fadeIn(100);
}

// BACK BUTTON FROM PAGE 2 TO 1
$("#formBack").click(function(){
	step1();
});

$("#postBtn").click(function(e){
		e.preventDefault();
		savePost();
});


/* ----------------------------------- *\
12. GEO LOCATION - http://diveintohtml5.info/geolocation.html
\* ----------------------------------- */

	// NICE TO HAVE - COMMING SOON

/* ----------------------------------- *\
13. UPLOAD PICTURE
\* ----------------------------------- */
	var imageURL;
 $(function() {
 	// Først oprettes en variabel til billedet
    var file;
    // Når der vælges et billede bliver følgende funktion kaldt
    $('#fileselect').bind("change", function(e) {
    	var files = e.target.files || e.dataTransfer.files;
      	//  Variable file sættes lig med billedet fra input feltet
      	file = files[0];
    });

    // Når brugere vælger at gå videre, kaldes en funktion
    $('#nextBtn').click(function() {
    	// En if statement konstaterer om brugeren har valgt et billede eller ej
    	if($("#fileselect").val().length > 1){
    		//Hvis der er valgt et billedet, kaldes en funktion der skifter step
			step2();
 			/* Herefter oprettes der findelse til Parse igennem deres REST API
 			   Her bliver det oploadede billede gemt i deres fileuploadings system*/
 			var serverUrl = 'https://api.parse.com/1/files/' + file.name;

			$.ajax({
			type: "POST",
			beforeSend: function(request) {
			  request.setRequestHeader("X-Parse-Application-Id", 'kUhb5cjo8doj2bw4EUSqp1lpeiZCXbCVpWiknkDt');
			  request.setRequestHeader("X-Parse-REST-API-Key", '2Inp7UZpxFTgZaOrRRE2JyWbLtKD2vQ2yUWTnZZj');
			  request.setRequestHeader("Content-Type", file.type);
			},
			url: serverUrl,
			data: file,
			processData: false,
			contentType: false,
			success: function(data) {
				// Hvis det lykkedes at gemme billedet, sættes det ind som baggrund på siden
				$(".uploadPicBg").css({"background": "url("+data.url+")",
										"background-size": "cover"});
				// Derudover gemmes billedets URL i variablen imageURL
				imageURL = data.url;

			},
			error: function(data) {
				// Hvis det ikke lykkes at gemme billedet, bliver der alertet en fejl for brugeren
				alert("error uploading picture")
				var obj = jQuery.parseJSON(data);
			}
	    });
	   	} else {
	   		// Hvis brugeren ikke har valgt et billedet bliver en fejlmedelelse vist på over oploadingfeltet
	   		$("#uploadError").slideDown(200)
		}
     
    });


  });



/* ----------------------------------- *\
15. SAVE INFORMATION
\* ----------------------------------- */

function savePost(){
	// Når brugeren vælger at gemme et billede oprettes en ny række i tabelen "Gallery"
	var Post = Parse.Object.extend("Gallery");
	var post =  new Post();
	// Herefter gemmes bruger input som variabler til brug i databasen
	var postName = $("#postName").val();
	var postUser = Parse.User.current().getUsername();
	var postLocation = $("#postLocation").val();
	// URL fra tidligere bliver gemt under rækken "file"
	var postFile = imageURL;
	var postScore = 1;

	// Disse variabler sættes lig med de værdier i databasen der passer dertil.
	post.set("Name", postName);
	post.set("User", postUser);
	post.set("Location", postLocation);
	post.set("File", postFile);
	post.set("Score", postScore);

	// Der tjekker om brugeren har udfyldt de nødvendige felter
	if(postName.length > 0 || postLocation.length > 0){
		// Hvis brugeren har udfyldt felterne, gemmes den nye række
		post.save(null, {
			success: function() {
				/* Hvis det lykkes at gemme rækken, bliver funktionen getGallery 
				   kaldt for at opdatere galleriet*/
				getGallery();
				// Herefter forsvinder oploading formularen
				$("#fileupload").fadeOut(300);
	  			$("#uploadBG").fadeOut(200);
	  			// Fil inputet tømmes, således samme bruger kan oploade flere billeder
	  			$("#fileselect").val() == 
	  			// Derudover resetes de 2 steps i oploading formularen
	  			step1();

	  			// Der spørgers om nogle af de tilvalgte gallerier eksiterer
	  			if($("#galleryNewest").is('*')) {
	  				// Er det tilfældet bliver de kaldt igen, for at opdatere indholdet
	  				addGallery("descending", "createdAt", "#galleryNewest", 20);
	  			}

	  			if($("#galleryLocation").is('*')) {
	  				addGallery("descending", "Location", "#galleryLocation", 20);
	  			}

	  			if($("#galleryName").is('*')) {
	  				addGallery("descending", "Name", "#galleryName", 20);
	  			}
			},
			error: function(post, error){
				// Hvis det ikke lykkes af gemme åbnes en fejlmeddelelse
			    $("#postError").html('<p>'+error.message+'</p>')
			    $("#postError").slideDown(200)
			    // Der kommer rød border på de to felter der skal udfyldes
			    $("#postName").addClass('errorBorder');
			    $("#postLocation").addClass('errorBorder');
			}
		});
	} else {
		//Hvis brugeren ikke har udfyldt felterne vises en fejlmeddelse	
	    $("#postError").html('<p>Please fill out the form</p>')
	    $("#postError").slideDown(200)
	    $("#postName").addClass('errorBorder');
	    $("#postLocation").addClass('errorBorder');
	}
}


/* ----------------------------------- *\
16.	LIKE SCORE
\* ----------------------------------- */

function addScore(id){
	// Når brugeren liker et billede oprettes et kald til databasen
	var Point = Parse.Object.extend("Gallery");
	var point = new Point();
	// Funktionen har et parameter med de ID til det billede der ønskes at likes
	point.id = id;
	// Ud fra det ID ligges en til det nummer i feltet "score"
	point.increment("Score");

	// Herfter bliver det gemt i databasen
	point.save(null, {
	  success: function(point) {
	    
	  },
	  error: function(point, error) {
	   
	  }
	});
}



/* ----------------------------------- *\
17.	UNLIKE SCORE
\* ----------------------------------- */

function decreaseScore(id){
	var Point = Parse.Object.extend("Gallery");
	var point = new Point();
	point.id = id;
	// Increment the current value of the quantity key by -1
	point.increment("Score", -1);

	// Save
	point.save(null, {
	  success: function(point) {
	    
	  },
	  error: function(point, error) {
	   
	  }
	});
}



/* ----------------------------------- *\
18. LIKE BUTTON
\* ----------------------------------- */



$('body').on('click', '.likeBtn', function() {
	// Spørger om elementet har classen "selected"
	var likeActive = $(this).hasClass('selected');
	// Tager billedet ID fra parse som er gemt som HTML-5 Attribute
	var picID = $(this).parent().find('.postID').attr("data-value");
	// Spørger om elementet allerede er selcted
	if(likeActive == false){
		// Elementet er ikke selected, og det får tildelt classen "selected"
		$(this).addClass("selected");
		// Kalder funktionen addScore med billedet ID som parameter
		addScore(picID);

	} else {
		// Elementet er selected, og det får fjernet classen "selected"
		$(this).removeClass("selected");
		// Kalder funktionen decreaseScore med billedet ID som parameter
		decreaseScore(picID);
	}

});

/* ----------------------------------- *\
19. TILE  BUTTON
\* ----------------------------------- */

$('.tile').click(function(){
	// Hver gang brugeren trykker på et tile bliver der spurgt, om der skal åbnes en popup med information
	// Dette sker hvis elementet der trykkes på har en data-attribute 
	var id = $(this).attr("data-load");
	var color = $(this).css("background-color");
	if(id != null){
		// Hvis der findes en data attribute åbnes popupen, som har samme farve som elementet baggrund
		$("#contentOutput").css({
							"height": "200px",
							"margin": "1% 1% 1.6% 1%",
							"background": color,
							"padding": "2%"

		});
		// Popupen bliver animeret
		$("#contentOutputClose").fadeIn(400);
		$("#outputwrapper").fadeIn(400);
		// Informationen bliver loadet med et Ajax kald med elementets data-load attribute
		$('#outputwrapper').load('http://howyoumetyourfrontender.com/voodoo/v_7/ajax.html #'+id,function() {
		// Done loading...
		
		});
	}
});

/* ----------------------------------- *\
20. CLOSE BUTTON
\* ----------------------------------- */

$("#contentOutputClose").click(function(){
	$("#contentOutput").css({
						"height": "0px",
						"padding": "0%"
						
	});
	
	
	$("#contentOutputClose").fadeOut(100);
	$("#outputwrapper").html("");
	$("#events li").css("background-color","rgba(0,0,0,0)");

	setTimeout(function(){
		$("#contentOutput").css({"margin": "0%" })
	},1000);
});

$('#loginClose').click(function(){
	closeForm();
});
$('#uploadClose').click(function(){
	closeForm();
});



/* ----------------------------------- *\
21. EVENT CALENDAR CONTENT
\* ----------------------------------- */

$("#events li").click(function(){
	$("#events li").css("background-color","rgba(0,0,0,0)");
	$(this).css("background-color"," rgba(0,0,0,0.2)");
	var id = $(this).attr("data-load");
	if(id.length > 0){
		$("#contentOutput").css({
							"height": "200px",
							"margin": "1% 1% 1.6% 1%",
							"background": "#74c043",
							"padding": "2%"

		});
		$("#contentOutputClose").fadeIn(400);
		$("#outputwrapper").fadeIn(400);
		$('#outputwrapper').load('http://balder.ucn.dk/rasmus-larsen/voodoo/ajax.html #'+id,function() {
		// Done loading...
		
		});
	}
});

/* ----------------------------------- *\
22. EVENT CALENDAR ZOOM EFFECT
\* ----------------------------------- */
var calendarOpen = false;
function openCalendar() {
	$(".eventCalendar").css("padding", "49%");
	//$("#calenderWrapper").css("margin", "2%");
	calendarOpen =true;
}
function closeCalendar() {
	$(".eventCalendar").css("padding", "24%");
	//$("#calenderWrapper").css("margin", "4%");
	calendarOpen =false;
}
$("#calendarHeader").click(function(){
	if(calendarOpen == false){
		openCalendar();
	} else {
		closeCalendar();
	} 	
});

$(".calZoom").click(function(){
	if(calendarOpen == false){
		openCalendar();
	} else {
		closeCalendar();
	} 	
});


/* ----------------------------------- *\
23. TRACK GALLERY
\* ----------------------------------- */

/*
function trackGallery(){
	
	var Post = Parse.Object.extend("User");
	var settings =  new Post();

	settings.set("newestgallery", true);
	settings.set("locationgallery", false);
	settings.set("namegallery", false);

	settings.save(null, {
		success: function() {
			console.log("working")
		},
		error: function(post, error){
			console.log(error.message);
		}
	});
}

*/

function addGallery(rule, data, output, count) {
	var Post = Parse.Object.extend("Gallery");
	var query = new Parse.Query(Post);

	//query.descending("createdAt");
	query.descending(data);
	query.limit(count);

	query.find({
		success: function(results) {
			// Prevent double content
			$(output).html("");
			//trackGallery();
			// Setting up handlebars template
			var template = Handlebars.compile($("#picture-template").html())

			$(results).each(function(i,e){
				var q = e.toJSON();
				$(output).append(template(q))
			});
			swipeEvents();
		},
		error: function(error){
			console.log(error.messsage)
		}
	});
}

/* ----------------------------------- *\
24. ADDMORE DROPDOWN CHANGE
\* ----------------------------------- */

function addNewest() {
	var e = '<div class="headerNewest"><button class="closeNewest"></button></div><div class="gallery" id="galleryNewest"></div> ';
	$("#galleryOutput").append(e);
	addGallery("descending", "createdAt", "#galleryNewest", 20);
	$("#addmore option[value='newest']").remove();
}

function addLocation() {
	var e = '<div class="headerLocation"><button class="closeLocation"></button></div><div class="gallery" id="galleryLocation" ></div> ';
	$("#galleryOutput").append(e);
	addGallery("descending", "Location", "#galleryLocation", 20);
	$("#addmore option[value='location']").remove();
}

function addName() {
	var e = '<div class="headerName"><button class="closeName"></button></div><div class="gallery" id="galleryName" ></div> ';
	$("#galleryOutput").append(e);
	addGallery("descending", "Name", "#galleryName", 20);
	$("#addmore option[value='name']").remove();
}

function ddMenu(){
	if( $('#addmore').children().length ==1 ) { 
		$("#addmore").fadeOut(0);
	} else {
		$("#addmore").fadeIn("slow");
	}
}


$("#addmore").change(function(){
	var ddValue = $('#addmore :selected').text();
	if(ddValue == "Newest"){
		addNewest();
	}
	if(ddValue == "Location"){
		addLocation();
	}
	if(ddValue == "Name"){
		addName();
	}
	ddMenu();
	
});

/* ----------------------------------- *\
25. CLOSE GALLERIES
\* ----------------------------------- */

function removeGallery(gallery,header){
	$(gallery).hide( "drop" ,"1000" )
	$(header).fadeOut("1000")
	ddMenu();
	setTimeout(function() {
		$(gallery).remove();
    	$(header).remove();
	}, 1000);
}


$('body').on('click', '.closeNewest', function() {
	$("#addmore").append('<option value=newest>Newest</option>');
	removeGallery("#galleryNewest",".headerNewest");
});

$('body').on('click', '.closeLocation', function() {
	$("#addmore").append('<option value=location>Location</option>');
	removeGallery("#galleryLocation",".headerLocation");
});

$('body').on('click', '.closeName', function() {
	$("#addmore").append('<option value=name>Name</option>');
	removeGallery("#galleryName",".headerName");	
});




/* ----------------------------------- *\
99. $(document).ready
\* ----------------------------------- */
$(document).ready(function(){

	window.addEventListener("load",function() {
	    setTimeout(function(){
	        window.scrollTo(0, 1);
	    }, 0);
	});



	getGallery();
	swipeEvents();


});
