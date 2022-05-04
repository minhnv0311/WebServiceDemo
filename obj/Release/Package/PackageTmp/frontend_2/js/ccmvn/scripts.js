(function ($) {
    "use strict";

  var isEditMode = false;

 	

 	var lazyLoad = function ($scope, $ ) {
 		$('.lazy').Lazy();
 	}


	/**
	* Featured slider
	*/
   var featuredSliderElement = function( $scope, $ ){

  		$('.featuredSlider').lightSlider({
	    item:1,
	    slideMargin:0,
	    enableDrag:true,
	    loop:true,
	    pager:true,
	    /*rtl: rtl_str,*/
	    pagerHtml: true,
	    auto:true,
	    speed: 700,
	    pause: 4200,
	    onSliderLoad: function() {
	           $('.featuredSlider').removeClass( 'cS-hidden' );
	           
	       }
	    });

	   $('.lazy').Lazy();
     	
   }



/* 
* Full width Slider
*
* layout one 
*/

var fullWidthSliderElement = function( $scope, $ ){

	var sliderCount = $('.vmagazine-fullwid-slider').attr('data-count');
	if( sliderCount == 0 ){
		sliderCount = 4;
	}
	var sliderLayoutOne = $('.vmagazine-fullwid-slider').hasClass('block_layout_1');
	var sliderLayoutTwo = $('.vmagazine-fullwid-slider').hasClass('block_layout_2');
	

	if( sliderLayoutOne === true ){
		$('.vmagazine-fullwid-slider.block_layout_1 .slick-wrap').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.vmagazine-fullwid-slider.block_layout_1 .posts-tab-wrap'
		});
		$('.vmagazine-fullwid-slider.block_layout_1 .posts-tab-wrap').slick({
		  slidesToShow: 4,
		  slidesToScroll: 1,
		  asNavFor: '.vmagazine-fullwid-slider.block_layout_1 .slick-wrap',
		  dots: false,
		  arrows: true,
		  centerMode: false,
		  focusOnSelect: true,
		  responsive: [
		          {
		            breakpoint: 1366,
		            settings: {
		              slidesToShow: 3,
		              slidesToScroll: 3,
		              infinite: true,
		             
		            }
		          },
		          {
		            breakpoint: 800,
		            settings: {
		              slidesToShow: 2,
		              slidesToScroll: 2
		            }
		          },
		          {
		            breakpoint: 500,
		            settings: {
		              slidesToShow: 1,
		              slidesToScroll: 1
		            }
		          }
		        
		      ]
		});  

	}

	/* 
	* Full width Slider
	*
	* layout two 
	*/
	if( sliderLayoutTwo === true ){
		var mobArrow;
		if ($(window).width() <= 768){
		    mobArrow = true;
		}else{
		   mobArrow = false;
		}

		$('.vmagazine-fullwid-slider.block_layout_2 .slick-wrap').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: mobArrow,
		  fade: true,
		  asNavFor: '.vmagazine-fullwid-slider.block_layout_2 .posts-tab-wrap'
		})

		$('.vmagazine-fullwid-slider.block_layout_2 .posts-tab-wrap').slick({
		  slidesToShow: sliderCount,
		  slidesToScroll: 4,
		  asNavFor: '.vmagazine-fullwid-slider.block_layout_2 .slick-wrap',
		  dots: false,
		  arrows: mobArrow,
		  centerMode: false,
		  centerPadding: 0,
		  focusOnSelect: true,
		  vertical: true,
		  responsive: [
		          {
		            breakpoint: 1366,
		            settings: {
		              slidesToShow: sliderCount,
		              slidesToScroll: 3,
		              infinite: true,
		            }
		          },
		          {
		            breakpoint: 966,
		            settings: {
		              slidesToShow: 2,
		              slidesToScroll: 1
		            }
		          },
		          {
		            breakpoint: 480,
		            settings: {
		              slidesToShow: 1,
		              slidesToScroll: 1
		            }
		          }
		        
		      ]
		});
	}

	$('.lazy').Lazy();
}




  /**
  * Category slider
  */
  var categorySlider = function( $scope, $ ){
  	$('.widget-cat-slider').lightSlider({
    item:1,
    slideMargin:0,
    /*rtl: rtl_str,*/
    loop:false,
    controls:true,
    enableDrag:true,
    speed: 700,
    onSliderLoad: function() {
           $('.widget-cat-slider').removeClass( 'cS-hidden' );
       }
  });
  $('.lazy').Lazy();
  	
  }


/* --------------------------------------------------------------------------------------------------------------------------- */
/**
* Slider Tab
*
* slider-tab
*/
var vmeaTabSlider = function( $scope, $ ){

  function vmagazine_cat_tabs($slider_class){
    $('.vmea-slider-tab .vmagazine-slider-tab '+ $slider_class).each(function(){
      var Id = $(this).attr('data-slug');
      var NewId = Id;
      var target = '.'+Id+' .tab-cat-slider';
      NewId = $(target).slick({
        dots: true,
        speed: 600,
        /*rtl: rtl_str,*/
        arrows: false,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: 0,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
      });
    })
  } 
  $('.vmea-slider-tab .vmagazine-slider-tab').each(function(){
	  var first_active_tab_content = $(this).find('.block-content-wrapper .block-cat-content:first').attr('data-slug');
	  if(first_active_tab_content){
	  vmagazine_cat_tabs('.' + first_active_tab_content);
	  }
    $('.lazy').Lazy();
  });      
  
  }

/* --------------------------------------------------------------------------------------------------------------------------- */
/**
* Block Post Slider
* 
* block-post-slider
*/
var VmeaBlockPostSlider = function( $scope, $ ){

	function vmagazine_block_post_slider($slider_class){
      $('.vmea-block-post-slider .vmagazine-block-post-slider '+ $slider_class).each(function(){
        var Id = $(this).attr('data-slug');
        var NewId = Id;
        var target = '.'+Id+' .block-post-slider-wrapper';
        NewId = $(target).slick({
          dots: true,
          speed: 600,
          /*rtl: rtl_str,*/
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
         
        });
      })
    } 
    $('.vmea-block-post-slider .vmagazine-block-post-slider').each(function(){
        var first_active_tab_content = $(this).find('.block-content-wrapper .block-cat-content:first').attr('data-slug');
        if(first_active_tab_content){
        	vmagazine_block_post_slider('.' + first_active_tab_content);
        }
    });

    $('.lazy').Lazy();
}
    
  

/* --------------------------------------------------------------------------------------------------------------------------- */
/**
  * Slider Tab Carousel
  * 
  * slider-tab-carousel
  */
var vmeaSliderTabCarousel = function( $scope, $ ){

  function vmagazine_cat_tabs_carousel($slider_class){
      $('.vmea-slider-tab-carousel .vmagazine-slider-tab-carousel '+ $slider_class).each(function(){
        var Id = $(this).attr('data-slug');
        var NewId = Id;
        var target = '.'+Id+' .tab-cat-slider-carousel';
        NewId = $(target).slick({
          dots: true,
          speed: 600,
          arrows: true,
          /*rtl: rtl_str,*/
          focusOnSelect: true,
          //centerMode: true,
          centerPadding: 0,
          slidesToShow: 4,
          responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
              ]
        });
      })
    } 
    $('.vmea-slider-tab-carousel .vmagazine-slider-tab-carousel').each(function(){
        var first_active_tab_content = $(this).find('.block-content-wrapper-carousel .block-cat-content-carousel:first').attr('data-slug');
        if(first_active_tab_content){
        vmagazine_cat_tabs_carousel('.' + first_active_tab_content);
        }
    });

    $('.lazy').Lazy();

}
/* --------------------------------------------------------------------------------------------------------------------------- */
/**
* vmagazine-block-post-carousel(small)
*  xxxxxx
*/
var vmeaBlockPostCarousel = function( $scope, $ ){

	/**
	* Block posts carousel
	*/
	$('.vmea-block-post-carousel .vmagazine-post-carousel.block_layout_1 .block-carousel').slick({
	  infinite: true,
	  slidesToShow: 3,
	  slidesToScroll: 3,
	  /*rtl: rtl_str,*/
	  arrows: true,
	  dots: true,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 500,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});

	$('.vmea-block-post-carousel .vmagazine-post-carousel.block_layout_2 .block-carousel').slick({
	  infinite: true,
	  slidesToShow: 3,
	  slidesToScroll: 3,
	  arrows: true,
	  dots: false,
	  /*rtl: rtl_str,*/
	  centerMode: true,
	  centerPadding: '60px',
	  responsive: [
	    {
	      breakpoint: 992,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        centerPadding: '30px'
	      }
	    },
	    {
	      breakpoint: 500,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 420,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        centerPadding: '30px'
	      }
	    }
	  ]
	});
	/*$('body').on('click', '.vmagazine-lSPrev', function () { 
	    NewId.goToPrevSlide(); 
	});

	$('body').on('click', '.vmagazine-lSNext', function () { 
	    NewId.goToNextSlide(); 
	}); */

	$('.lazy').Lazy();
}

/* --------------------------------------------------------------------------------------------------------------------------- */
/**
* vmagazine-block-post-carousel(small)
*/
var vmeaBPcarouselSlider = function( $scope, $){

	$('.vmea-carousel-slider-small .vmagazine-block-post-car-small .carousel-wrap').lightSlider({
		item:3,
		loop:true,
		auto:true,
		controls: true,
		slideMargin: 0,
		/*rtl: rtl_str,*/
		pager:false,
		speed:600,
		enableDrag:true,
		responsive : [
		        {
		            breakpoint:800,
		            settings: {
		                item:2,
		                slideMove:1,
		                slideMargin:6,
		              }
		        },
		        {
		            breakpoint:500,
		            settings: {
		                item:1,
		                slideMove:1
		              }
		        }
		    ],
		onSliderLoad: function() {
		       $('.vmea-carousel-slider-small .vmagazine-block-post-car-small .carousel-wrap').removeClass( 'cS-hidden' );
		   }
	});
	$('.lazy').Lazy();
}
 	

 	 $(window).on('elementor/frontend/init', function () {
        if(elementorFrontend.isEditMode()) {
            isEditMode = true;
        }
        
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-recent-posts.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-post-column.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-mul-cat.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-grid-list.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-mul-cat-tabbed.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-top-trending-block.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-about-author.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-timeline-posts.default', lazyLoad);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-slider-tab.default', vmeaTabSlider);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-slider-tab-carousel.default', vmeaSliderTabCarousel);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-block-post-carousel.default', vmeaBlockPostCarousel);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-block-post-slider.default', VmeaBlockPostSlider);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-featured-slider.default', featuredSliderElement);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-fullwidth-slider.default', fullWidthSliderElement);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-cat-post-slider.default', categorySlider);
        elementorFrontend.hooks.addAction('frontend/element_ready/vmea-carousel-slider-small.default', vmeaBPcarouselSlider);
       
    });



  
 	
}(jQuery));