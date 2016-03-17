// Global variables
timer = null;
var triggerWidth = 500;

jQuery(document).ready(function() {

	var menu = new Menu(); //Initialize Mobile Menu ?????????????????????????????????
	
	//alert('hi');

	if(jQuery('ul.pager').length) {
		// Customize Pager Styling
		changeThisOrChildContentsTo('.pager-first', 'First');
		changeThisOrChildContentsTo('.pager-previous', 'Prev');
		changeThisOrChildContentsTo('.pager-next', 'Next');
		changeThisOrChildContentsTo('.pager-last', 'Last');
		jQuery('.pager-ellipsis:eq(1)').addClass('pager-ellipsis-last');
		jQuery('.pager-current').wrapInner('<span class="inner" />');

		prevItems = jQuery('.pager .pager-current').prevAll('.pager-item').each(function(index, element) {jQuery(this).addClass("prev-" + (index+1));});
		nextItems = jQuery('.pager .pager-current').nextAll('.pager-item').each(function(index, element) {jQuery(this).addClass("next-" + (index+1));});
		hiddenCount = hiddenMax = 8;

		//Call Pager Resize Function
		resizeFunction();

		jQuery(window).resize(function() {
			resizeFunction();
		});
	}
	
	// Scrolls user to error on webform pages
	if(jQuery('.node-type-webform #messages').length)
		jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: jQuery('#messages').offset().top}, 500);

});

// Something for Campaign Monitor
function modCampaignMonitorEmailSignups(placeholder) {
	emailText = placeholder;
	jQuery('.campaignmonitor-subscribe-form .form-item-email input').val(emailText).focus(function() {
		me = jQuery(this);
		me.removeClass("hasError");
		if(me.val() == emailText)
		me.val("");}).blur(function() {
			if(this.value === "") this.value = emailText;});

	jQuery('.campaignmonitor-subscribe-form').submit(function () {
		input = jQuery(this).find('.form-item-email input');
		input.blur();
		if(input.val() == emailText) {
			input.addClass("hasError");
			return false; }});
}

// Handles Pager Resizing and Logic
function resizeFunction() {

	sum = 0;
	jQuery('.pager').children().each(function () {if(jQuery(this).css("display") != "none") sum += jQuery(this).outerWidth(true);});
	targetWidth = jQuery('.pager').outerWidth(true);
	while(sum > targetWidth && hiddenCount > 0) {
		jQuery('.pager .prev-' + hiddenCount + ', .pager .next-' + hiddenCount).hide().each(function() { sum -= jQuery(this).outerWidth(true);});
		hiddenCount--;
	}
	doContinue = true;
	while(doContinue && sum < targetWidth && hiddenCount < hiddenMax) {
		hiddenCount++;
		groupWidth = 0;
		itemsInQuestion = jQuery('.pager .prev-' + hiddenCount + ', .pager .next-' + hiddenCount);
		itemsInQuestion.each(function() {groupWidth += jQuery(this).outerWidth(true);});
		
		if(groupWidth + sum <= targetWidth) {
			sum += groupWidth;
			itemsInQuestion.show(groupWidth);
		}
		
		else {
			doContinue = false;
			hiddenCount--;
		}
	}
}


// Pager Resize Polling
function resizeUpdate() {resizeFunction(); timer = null;}
jQuery(window).resize(function() {if(!timer) timer = setTimeout(resizeUpdate, 100);});

// Function for Theming Pager Items
function changeThisOrChildContentsTo(target, contents) {
	realTarget = jQuery(target);
	if(realTarget.children().html(contents).length === 0)
    	realTarget.html(contents);}