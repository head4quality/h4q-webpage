(function( $ ){

  $.fn.slideshow = function( options ) {

    if (this.length > 1){
      this.each(function() { $(this).slideshow(options) });
      return this;
    }

    var settings = {
      theme: false,
      controls: {
        enabled: true,
        prevLabel: "Prev",
        nextLabel: "Next"
      }
    };

    if ( options ) { 
      $.extend( settings, options );
    }
    
    // Setup elements
    var $this = $(this); // ul.atd-slideshow-slides
    var $slides = $this.children('li'); // li.atd-slideshow-slide
    var $slideshow = $('<div class="atd-slideshow" />'); // div.atd-slideshow
    var $controls = $('<div class="atd-slideshow-controls" />');
    var $arrowPrev = $('<button class="atd-slideshow-arrow prev">' + settings['controls']['prevLabel'] + '</button>');
    var $arrowNext = $('<button class="atd-slideshow-arrow next">' + settings['controls']['nextLabel'] + '</button>');
    var $pagination = false;
    
    var elID = $(this).attr('id');
    
    if ($('[atd-slideshow-pagination="#' + elID + '"]').length) {
      $pagination = $('[atd-slideshow-pagination="#' + elID + '"]');
    }
    
    // Insert left/right controls into slideshow
    if (settings['controls']['enabled']) {
      $arrowPrev.appendTo($controls);
      $arrowNext.appendTo($controls);
      $controls.appendTo($slideshow);
    }
    
    // Insert ul -> li into slideshow
    $slides.addClass('atd-slideshow-slide');
    $this.replaceWith($slideshow).appendTo($slideshow).addClass('atd-slideshow-slides');
    
    // Slideshow positioning
    var slideWidth = $slides.width();
    var current = 0;
    
    $arrowPrev.click(function() {
      switchSlide(current - 1);
    });
    
    $arrowNext.click(function() {
      switchSlide(current + 1);
    });
    
    function switchSlide(next) {
      current = next;
      
      if (current < 0) {
        current = $slides.length - 1;
      }
      
      if (current >= $slides.length) {
        current = 0;
      }
      
      console.log(current);
      
      $this.css('margin-left', -(slideWidth * current) + 'px');
      
      if ($pagination) {
        $pagination.children('[atd-slideshow-paginate]').removeClass('active');
        $pagination.children('[atd-slideshow-paginate="' + current + '"]').addClass('active');
      }
    }
    
    // Responsivized slideshow
    window.requestAnimationFrame(slideResize);
    
    function slideResize() {
      if (slideWidth != $slides.width()) {
        slideWidth = $slides.width();
        $this.css('margin-left', -(slideWidth * current) + 'px');
        $this.addClass('resizing');
      } else {
        $this.removeClass('resizing');
      }
      window.requestAnimationFrame(slideResize);
    }
    
    // Setup pagination element if it's there
    
    if ($pagination) {
      for (i = 0; i < $slides.length; i++) {
        var $page = $('<button class="atd-slideshow-pagination-btn" atd-slideshow-paginate="' + i + '">' + (i + 1) + '</button>');
        $page.appendTo($pagination);
      }
      
      $pagination.children('[atd-slideshow-paginate="' + current + '"]').addClass('active');
      
      $pagination.children('[atd-slideshow-paginate]').click(function() {
        switchSlide(parseInt($(this).attr('atd-slideshow-paginate')));
      });
    }
    
    // Misc options
    
    if (settings['theme']) {
      $slideshow.addClass(settings['theme'] + ' ' + elID);
      
      if ($pagination) {
        $pagination.addClass(settings['theme'] + '-pagination');
      }
    }

    return this;

  };

})(jQuery);

/* YOU DON'T NEED THIS YOU FOOL!!!! */

$(window).load(function() {
  if ($('[atd-slideshow]').length > 0) {
    $('[atd-slideshow]').slideshow({
      controls: {
        enabled: true,
        prevLabel: "&lsaquo;",
        nextLabel: "&rsaquo;"
      },
      theme: 'my-theme'
    });
  }
});