// JavaScript Document
// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {
	
	// To understand behaviors, see https://drupal.org/node/756722#behaviors
	Drupal.behaviors.my_custom_behavior = {
	  attach: function(context, settings) {
		  	  
		 // PartialBorder();
		  
		  $( window ).resize(function() {
				//PartialBorder();	
		  });
		  
		  //alert($(window).width());

			jQuery('.more-link a').click(function (e) {
				var self = jQuery(this).closest('.group-more');
				//alert(self.next().attr('class'));
				if(jQuery(this).hasClass('more-hide')) {
					self.prev().slideDown();
					jQuery(this).addClass('more-show').removeClass('more-hide');
					jQuery(this).html('<i class="fa fa-chevron-circle-up"></i>');
					e.preventDefault();
				} else {
					self.prev().slideUp();
					jQuery(this).addClass('more-hide').removeClass('more-show');
					jQuery(this).html('<i class="fa fa-chevron-circle-down"></i>');
					e.preventDefault();
				}
					
			});

		  										
	  }
	};
	
	
	
	
	
})(jQuery, Drupal, this, this.document);

