/*
 * main.js is the entry point for the application.
 */
define(function(require) {

	var foundation = require('foundation');
	var toastr = require('toastr');

	// Events and keypress handlers in the FabMo-Dashboard

	/********** Layout Resize Fonctions **********/
	var resizedoc = function(){
		//L & R = width of left & right menus
		var l=0; var r=0;

		//Screen displays based on size
		
		if($("body").width()/parseFloat($("body").css("font-size"))>40.063) {
			$("#main").addClass("offcanvas-overlap-right"); //Show Left Menu
			$("#widget-links-general").removeClass("colapsed");//Show fulll left hand menu on full screen
			$("#left-menu").removeClass("colapsed");//Show fulll left hand menu on full screen
			l=parseInt($("#left-menu").css("width"))+1; //Save left menu size
		}
		else if ($("body").width()/parseFloat($("body").css("font-size"))<=40.063) {
			$("#main").addClass("offcanvas-overlap-right"); //Show Left Menu
			$("#widget-links-general").addClass("colapsed");//Show fulll left hand menu on full screen
			$("#left-menu").addClass("colapsed");//Show fulll left hand menu on full screen
			l=parseInt($("#left-menu").css("width"))+1; //Save left menu size
			$('#close_menu').css('display', 'none');
		} else {
			//No left & right menus
			$("#widget-links-general").removeClass("colapsed");
			$("#left-menu").removeClass("colapsed");
			$("#main").removeClass("offcanvas-overlap-right");
			$("#main").removeClass("offcanvas-overlap-left");
			l=0;
		}


		//If wide screen and Right menu
		if( ($("#main").hasClass("offcanvas-overlap-left")) && ($("body").width()/parseFloat($("body").css("font-size")))>60.063) {
			r=parseInt($("#right-menu").css("width")+1);
		} else {r=0;}

		//Save & calcul right menu size + 1px of margin
		r=r+l;
		if(l>1) l=l-1;
		
		//Set size attribute on div "Main Section"
		$(".main-section, .app-section").css("width",$("body").width()-r+"px");
		$(".main-section, .app-section").css("margin-left",l+"px");
		$(".main-section").css("height",$("#left-menu").height()+"px");

		//Resize app-icon container, so the icon are centered
		$("#app_menu_container").css(
			"width",
			$(".main-section").width() - ($(".main-section").width() % 132 )
		);
	};
	
	/////control for footer/////
	$('.footTab').click(function(){
		if ($('.footBar').height() === 0) {
			$('.footBar').css('height', '50px');
		}
		else {
			$('.footBar').css('height', '.0px');
		}
	});
	
	window.setInterval(function(){
   		$('.stopJob').toggleClass('blink');
	}, 500);

	var colapseMenu = function() {
		//L & R = width of left & right menus
		var l=0; var r=0;
		//If menu is colapsed, we remove this property
		if($("#widget-links-general").hasClass("colapsed"))	{
			$("#widget-links-general").removeClass("colapsed");
			$("#left-menu").removeClass("colapsed");
			l=parseInt($("#left-menu").css("width"))+1; //Save left menu size
			if ($("body").width()<640) {
				$('.collapseLeft').show(); // show tinted screen to close menu
			}
		}

		//If menu not colapsed, we colapse it
		else {
			$("#widget-links-general").addClass("colapsed");
			$("#left-menu").addClass("colapsed");
			$("#app_menu_container").css("width",
				$(".main-section").width() - ($(".main-section").width() % 132 )
			);
			$('.collapseLeft').hide();
			l=parseInt($("#left-menu").css("width"))+1; //Save left menu size		
		}
		//Handle collapse of left 
		$('.collapseLeft').click(function(){
			$('.collapseLeft').hide();
			$('#left-menu').addClass("colapsed");
			$('#widget-links-general').addClass("colapsed");
		});
			
		//As the size of document change, we call this function to ajust main div & app container size
		//resizedoc();
			//If wide screen and Right menu
		if ($("body").width()/parseFloat($("body").css("font-size"))>40.063) {
			if( ($("#main").hasClass("offcanvas-overlap-left")) && ($("body").width()/parseFloat($("body").css("font-size")))>60.063) {
				r=parseInt($("#right-menu").css("width")+1);
			} else {r=0;}
		
			//Save & calcul right menu size + 1px of margin
			r=r+l;
			
			//Set size attribute on div "Main Section"
			$(".main-section, .app-section").css("width",$("body").width()-r+"px");
			$(".main-section, .app-section").css("margin-left",l+"px");
			$(".main-section").css("height",$("#left-menu").height()+"px");
		}
	};

	var resizedocclick = function(){
		//Same function that resizedoc(), but inverse the class on ".main-section", because it has not changed yet after the click on "#left-menu" or #right-menu
		var l=0; var r=0

		if($("body").width()/parseFloat($("body").css("font-size"))>40.063) {
			l=parseInt($("#left-menu").css("width"))+1;
		}	
		else {l=0;}

		if( !($("#main").hasClass("offcanvas-overlap-left")) && ($("body").width()/parseFloat($("body").css("font-size")))>60.063) {
			r=parseInt($("#right-menu").css("width")+1);
		} else {r=0;}

		r=r+l;
		$(".main-section, .app-section").css("width",$("body").width()-r+"px");

		//Resize app-icon container, so the icon are centered
		$("#app_menu_container").css(
			"width",
			$(".main-section").width() - ($(".main-section").width() % 132 )
		);
	};

	var slideMenu = function(){
		var startClick = null;
		var endClick = null;

		$("body").on("touchstart" , function(event){
			startClick = event.originalEvent.touches[0].pageX;
		});
	};


	/********** Document Ready Init **********/
	$(document).ready( function() {
		//Call fundation for the document, and define a way to open the menus
		$(document).foundation({
	      offcanvas : {
	        open_method: 'overlap_single', 
	      }
	    });	

		resizedoc();
		//If size of the screen change, we resize the main & app container
		$(window).resize( function() {resizedoc();});

		//Idem if we colapse or un-colapse the right menu
		$("#icon_colapse").click(function() { 
			colapseMenu(); 
			
			});

		//Define the positions of the dashboard notifications
		toastr.options["positionClass"] = "toast-bottom-center";

		//Click & Swipe listener
		slideMenu();

		//Remove redirection on forms submit
		$("button[type='submit']").click(function(){
			return false; //Override the action of the button, so the user is not redirected to another page (no data lost)
		});
	});
	
	

	return {
		'resizedocclick' : resizedocclick,
		'resizedoc' : resizedoc,
		'colapseMenu' : colapseMenu

	}
})