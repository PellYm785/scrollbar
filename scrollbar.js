$('*').each(function(index,element){
        $(element).scrollTop(0);
    });

$('*').children().each(function(index, element){
        var scroll,  // Integer
        $elements, // jQuery Object
        scrollHeight = element.scrollHeight, // Float
        height_scroll_box, // Float
        height,  // Float
        duration = 100, // Float
        max_top_scroll, // Float
        max_scroll_elements,
        top_scroll, // Float
        top_animate_scroll = 10, // Float
        $scrollbar = $('<div class="scrollbar">'),
        hide = false,
        position;

        if ($(element).hasClass('hide')){
            $(element).removeClass('hide');
            hide = true;
            console.log(element);

        }
        position = $(element).offset();

        
		
		//Si le contenu est plus qrand que le contenant
		
        if(overflow_height(element) && $(element)[0] != $('body')[0]){
            $(element).addClass('scroll_box');
            $(element).append($scrollbar);


            $scrollbar.css('height',function(){

                    height_scroll_box = $(this).parent().height();

                    height = height_scroll_box / scrollHeight * height_scroll_box;

                    return height;
                });

            max_top_scroll = $(element).height() - $scrollbar.height();
            max_scroll_elements = scrollHeight - $(element).height();


            $scrollbar.css({top: position.top});
            $scrollbar.css({left: position.left + $(element).width() - 5});
			
            $(element).bind(event_wheel, function(event){

                    scroll = event.originalEvent.deltaY;

                    $scrollbar.stop(false, true);
                    top_scroll = parseFloat($scrollbar.css('top'))-position.top;


                    if(scroll > 0){
                        if(top_scroll+top_animate_scroll > max_top_scroll){
                            top_animate_scroll = max_top_scroll-top_scroll;
                            duration = top_animate_scroll*10;
                        }
						console.log(position.top);
						animate_scroll($scrollbar, top_animate_scroll, '+', duration, position.top, max_scroll_elements, max_top_scroll);
                    }else{
                        if(top_scroll-top_animate_scroll < 0){
                            top_animate_scroll = top_scroll;
                            duration = top_animate_scroll*10;
                        }
						console.log(position.top);
						animate_scroll($scrollbar, top_animate_scroll, '-', duration, position.top, max_scroll_elements, max_top_scroll);
                    }
                    top_animate_scroll = 10;
                    duration = 100;

                });
            scrollHeight = 0;
        }
       /* if(hide){
            $(element).addClass('hide');
        }*/

    });

function animate_scroll($element, top_animate_scroll, direction , duration, sub_top, max_scroll_elements, max_top_scroll){

    $element.animate({
            'top' : direction+'='+top_animate_scroll+'px'
        },{
            duration: duration,
            easing: 'linear',
            step: function( now, fx ) {
                now -= sub_top;
                
                $(this).parent().scrollTop(now*max_scroll_elements / max_top_scroll);
            }
        });
}

function overflow_height(element) {
    return element.scrollHeight > element.clientHeight;
}