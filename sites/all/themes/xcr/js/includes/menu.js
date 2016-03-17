/*
      ___           ___   
     /  /\         /  /\  
    /  /:/_       /  /:/_ 
   /  /:/ /\     /  /:/ /\
  /  /:/ /::\   /  /:/ /:/
 /__/:/ /:/\:\ /__/:/ /:/ 
 \  \:\/:/~/:/ \  \:\/:/  
  \  \::/ /:/   \  \::/   
   \__\/ /:/     \  \:\   
     /__/:/       \  \:\  
     \__\/         \__\/  

flexBox v1.3.0 (March 20, 2015)

-------------------------------
---- Version 1.3.1 Changelog ----
-------------------------------

1. JSHINT Cleanup - See Wiki fo Full Details
2. Better Compatability with the Bootstrap Menu

www.secondform.com

*/

var Menu = function() { 
	'use strict';
	var globals = { 
		menu: jQuery('.navbar-collapse .navbar-nav').not('.secondary'), // Drupal Bootstrap has a Secondary Menu for things like "My Account" and "Logout". We turn this off.
		additional: "",
		trigger: 768,
		resizeTimer: null,
		flag: false,
		titles: false,
		prepend: { 
			content: null,
			to: "#mobile-nav-menu-wrapper"
		},
		append: { 
			content: null, //"<div class='menu-footer-wrapper'><div class='inner-wrapper'></div></div>",
			to: "#mobile-nav-menu-wrapper"
		} 
	},
	init = function() {

		//Create Mobile Menu Markup
		var body = jQuery('body');
			body.prepend('<div class="mobile-nav-menu-wrapper" id="mobile-nav-menu-wrapper"></div>');
		
		var menuWrapper = jQuery('#mobile-nav-menu-wrapper');
			menuWrapper.prepend('<div class="menu-overlay"></div>');
			menuWrapper.prepend('<div id="mobile-nav-menu" class="header-fix"><div class="block-inner"><div class="content"><ul class="menu"></div></div></div></div>');
			
		var menuItems = globals.menu.clone().find('li');	
			jQuery('#mobile-nav-menu .menu').append(menuItems);

		//Optional
		process.prepend();
		process.append();
		process.titles();
		process.additional();
		
		//Click Operations
		jQuery("#nav-icon").click(function() {
			jQuery(this).toggleClass('close');
			jQuery('#mobile-nav-menu').toggleClass('visible');
			jQuery('.menu-overlay').toggleClass('visible');	
			body.toggleClass('nav-expanded');
			
			//Transition Fix (Component of Menu Scrolling)
			if(globals.flag === true) {
				body.removeClass('transition-fix').clearQueue();
				globals.flag = false;
			}
			else { 
				globals.flag = true;
				body.delay(500).queue(function(){
					jQuery(this).addClass('transition-fix').clearQueue();
				});
			}
			
			return false;
		});
		
		//Disengages Mobile Menu when Toggle Width is Exceeded
		jQuery(window).resize(function() { 
			if (globals.trigger !== 0) { 
				if (globals.resizeTimer) { window.clearTimeout(globals.resizeTimer); } // Clear Timer	
				globals.resizeTimer = window.setTimeout(function() {
					if((jQuery('body').hasClass('nav-expanded') || jQuery('#mobile-nav-menu').hasClass('visible')) && (jQuery(window).width() >= globals.trigger)) { process.disable(); }	
				}, 50); // New Timer 
			}
		});
		
		//jQuery('#mobile-nav-menu').autoCenter({wrapper: '.block-inner', cfooter: '.menu-footer-wrapper'});
	},
	process = {
		disable: function disable() { //Closes the Menu
			jQuery("#nav-icon").removeClass('close');
			jQuery('body').removeClass('nav-expanded transition-fix');
			jQuery('#mobile-nav-menu').removeClass('visible');
			jQuery('.menu-overlay').removeClass('visible');
			globals.flag = false;
		},
		prepend: function prepend() {
			if(globals.prepend.content !== null) { 
				jQuery(globals.prepend.to).prepend(globals.prepend.content);
			}
		},
		append: function append() {
			if(globals.append.content !== null) { 
				jQuery(globals.append.to).append(globals.append.content);
			}
		},
		titles: function titles() { //Creates Subtitles for Menu items using the "Title" attribute.
			if(globals.titles === true) { 
				jQuery('#mobile-nav-menu a').each(function() { 
					var current = jQuery(this);
						current.append('<span class="title">' + current.attr('title') + '</div>').wrapInner('<div class="inner-wrapper">').wrapInner('<div class="nav-wrapper">');
				});
			}
		},
		additional: function additional() { 
			if(jQuery(globals.additional).length) { 
				jQuery(globals.additional).find('li').each(function() { 
					jQuery('#mobile-nav-menu').find('.menu').append(jQuery(this).clone());
				});
			}	
		}
	};
	if (this instanceof Menu) { init(); } 
		else { return new Menu(); } //Creates a new Menu should it not be defined as new.
};