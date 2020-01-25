/**
 * Quick'n'Dirty autoscroller...
 */
function scrollLeft() {

	var $items = $(".item");					// ALL items

	// No scroll if wrapper is hovered.
	if ( $('.item-wrapper').data('hover') )
		return;

	// Check so we have items, and more items than currently on screen... else return!
	if ( $items.length <= 0 || $items.first().offset().top == $items.last().offset().top )
		return;

	// Get items on screen... (based on top)
	var itemsOnScreen = 1;
	for ( x=1; x < $items.length; x++ ){
		if ( $items.first().offset().top == $items.eq(x).offset().top )
			itemsOnScreen++;
	}

	var $first = $items.slice(0,1),		// first item
	$rest  = $items.slice(1),			// All BUT the first items
	$off   = $items.slice(itemsOnScreen);		// All off screen items

	// Offset to scroll the rest of the elements when items adjust left.
	var offset = $rest.first().offset().left - $first.offset().left;

	// Animate the first item fast..
	$first.animate({left: -$first.outerWidth(true)-50 }, 400);

	// Set all off screen items to hidden, so we can fade in later..
	$off.hide();

	// Animate the rest of the items a little slower.
	$rest.animate({left: '-'+offset+'px'}, 800, ).promise().done( function() {
		// Reset the items CRAZY THINGS GOING ON HERE?!?!
		var newHtml = '<div class="item">' + $first.html().trim() + "</div>\n\r";
		$(".item-wrapper").append( newHtml );
		$items.first().remove();
		$items.css({left: ''});

		// Fade in all off screen (+ the last) items, cheat don't really matter.
		$off.fadeIn(400);
	});

}

/**
 * Set hover state, :hover fake.
 */
$('.item-wrapper').hover(
	function() { $(this).data('hover', true); },
	function() { $(this).data('hover', false); }
).data('hover', false);

/**
 * Set up interval
 */
$(document).ready( function() {
	var interval = setInterval( function(){
			scrollLeft();
	}, 3000 );
});
