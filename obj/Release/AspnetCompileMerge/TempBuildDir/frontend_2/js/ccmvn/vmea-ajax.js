(function ($) {
    "use strict";

var ajaxURL = vmea_ajax_script.ajaxurl;

/**
* Child Category Posts Ajax Function
*
* vmagazine-multiple-category
*/
$('.vmea-mul-cat .vmagazine-tab-links li').first('li').addClass('active');

    $('.vmea-mul-cat .child-cat-tabs .vmagazine-tab-links a').on('click', function(e)  {
        
      $.dis = $(this);
        var currentAttrValue 	= $(this).attr('data-id');
        var currentAttrSlug 	= $(this).attr('data-slug');
        var currentAttrLayout 	= $(this).attr('class');
        var currentLayout   	= $(this).attr('data-layout');
        var postCount 			= $(this).attr('data-count');
        var postLengths 		= $(this).attr('data-length');
        var postBtm 			= $(this).attr('data-btn');
        var postMeta 			= $(this).attr('data-meta');
        var titleLength 		= $(this).attr('data-title');

        $(this).parent('li').addClass('active').siblings().removeClass('active');

        if($(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).length > 0){
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();

        } else {
          $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-loader').show();
          $.ajax({
              url : ajaxURL,
              
              data:{
                      action : 'vmagazine_ea_tabs_ajax_action',
                      category_id:  currentAttrValue,
                      category_slug: currentAttrSlug,
                      class: currentAttrLayout,
                      layout: currentLayout,
                      limit: postCount,
                      plength: postLengths,
                      readMore: postBtm,
                      post_meta: postMeta,
                      titleLength: titleLength,
                  },
              type:'post',
               success: function(res){                                        
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').append(res);
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();
                      $('.block-loader').hide();
                  }
          });
      }
    });



/*
*
* load-more ajax for grid/list posts 
*
* 
*/
   $('body').on('click','.vmea-grid-list .gl-posts',function(){

       var $this        = $(this); 
       var cat_ID       = $this.attr('data-cat');
       var ban_off      = $this.attr('data-offset');
       var Layout       = $this.attr('data-type');
       var PostPerPage  = $this.attr('data-id');
       var postLength   = $this.attr('data-length');
       var postMeta     = $this.attr('data-meta');
       var imgURL       = $this.attr('data-url');
       var catShow      = $this.attr('data-cat-show');

       
       $.ajax({
           url: ajaxURL,
           type: 'post',
           dataType: 'json',
           data: {
               action: 'vmagazine_ea_grid_list_ajax_load',
               banner_offset: ban_off,
               cat_id: cat_ID,
               layout: Layout,
               postper_page: PostPerPage,
               pLength: postLength,
               data_meta: postMeta,
               data_url: imgURL,
               catShow: catShow 
           },
           beforeSend: function() {
              $('.vm-ajax-load-more').addClass('posts-loading');
           },
           complete: function() {
               $('.vm-ajax-load-more').removeClass('posts-loading');
           },
            success: function( resp ) {  
              if(resp){
                var off = (parseInt(ban_off) + parseInt(PostPerPage));
                $this.attr( 'data-offset', off);
                var $elems = $( resp.message1 );
                var masCon = $this.siblings('.posts-wrap');
                masCon.append( $elems); 
                console.log(resp.message3);
                if( resp.message2 < 1 ){
                  $this.siblings('#loading-grid').removeClass('posts-loading');
                  
                  $this.remove();
                }
              }
              else{
                
               $('.vm-ajax-load-more').removeClass('posts-loading');
                $this.remove();
              }   
            }
       });
   }); 


/* --------------------------------------------------------------------------------------------------------------------------- */
/**
* Slider Tab
*
* slider-tab
*/
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
  

$('.vmea-slider-tab .slider-tab-links li').first('li').addClass('active');

    $('.vmea-slider-tab .slider-cat-tabs .slider-tab-links a').on('click', function(e)  {
        
      $.dis = $(this);
        var currentAttrValue = $(this).attr('data-id');
        var currentAttrSlug = $(this).attr('data-slug');
        var PostPerPage = $(this).attr('data-offset');


        $(this).parent('li').addClass('active').siblings().removeClass('active');

        if($(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).length > 0){
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();

        } else {
          $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-loader').show();
          $.ajax({
              url : ajaxURL,
              
              data:{
                      action : 'vmagazine_ea_slider_tab_action',
                      category_id:  currentAttrValue,
                      category_slug: currentAttrSlug,
                      postper_page: PostPerPage,
                  },
              type:'post',
               success: function(res){                                        
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').append(res);
                      vmagazine_cat_tabs('.'+currentAttrSlug);
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();
                      $('.block-loader').hide();
                  }
          });
      }
    });

/* --------------------------------------------------------------------------------------------------------------------------- */
/**
* VMagazine: Multiple Category Tabbed
*
* multiple-category-tabbed
*/ 
$('.vmea-mul-cat-tabbed .vmagazine-tabbed-links li').first('li').addClass('active');

    $('.vmea-mul-cat-tabbed .multiple-child-cat-tabs .vmagazine-tabbed-links a').on('click', function(e)  {
        
      $.dis = $(this);
      var currentAttrValue  = $(this).attr('data-id');
      var currentAttrSlug   = $(this).attr('data-slug');
      var excerpts          = $(this).attr('data-count');
      var currentAttrLayout = $(this).attr('class');
      var currentMeta       = $(this).attr('data-meta');

      $(this).parent('li').addClass('active').siblings().removeClass('active');

      if($(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).length > 0){
          $(this).parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
          $(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();

      } else {
        $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-loader').show();
        $.ajax({
            url : ajaxURL,
            
            data:{
                    action : 'vmagazine_ea_cat_tabbed_ajax_action',
                    category_id:  currentAttrValue,
                    category_slug: currentAttrSlug,
                    post_excerpt: excerpts,
                    class: currentAttrLayout,
                    show_meta: currentMeta
                },
            type:'post',
            success: function(res){                                        
                    $.dis.parents('.block-header').siblings('.block-content-wrapper').append(res);
                    $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
                    $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();
                    $('.block-loader').hide();
                }
        });
      }
    });

/*===========================================================================================================*/
/**
  * Tab cat slider
  * 
  * vmagazine-block-post-slider
  */
  /**
* block post slider
*/
    
  function vmagazine_block_post_slider($slider_class){
      $('.vmea-block-post-slider .vmagazine-block-post-slider '+ $slider_class).each(function(){
        var Id = $(this).attr('data-slug');
        var NewId = Id;
        var target = '.'+Id+' .block-post-slider-wrapper';
        NewId = $(target).slick({
          dots: true,
          speed: 600,
          rtl: rtl_str,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
         
        });
      })
    } 
    $('.vmea-block-post-slider .vmagazine_block_post_slider').each(function(){
        var first_active_tab_content = $(this).find('.block-content-wrapper .block-cat-content:first').attr('data-slug');
        if(first_active_tab_content){
        vmagazine_block_post_slider('.' + first_active_tab_content);
        }
    });


/*
 * Block Post Slider
 *
 * vmagazine-block-post-slider
 *
  */
  $('.vmea-block-post-slider .vmagazine-tabbed-post-slider li').first('li').addClass('active');

    $('.vmea-block-post-slider .multiple-child-cat-tabs-post-slider .vmagazine-tabbed-post-slider a').on('click', function(e)  {
        
      $.dis = $(this);
        var currentAttrValue = $(this).attr('data-id');
        var currentAttrSlug = $(this).attr('data-slug');
        var PostPerPage = $(this).attr('data-offset');
        var PostMeta = $(this).attr('data-meta');


        $(this).parent('li').addClass('active').siblings().removeClass('active');

        if($(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).length > 0){
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();

        } else {
          $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-loader').show();
          $.ajax({
              url : ajaxURL,
              
              data:{
                      action : 'vmagazine_block_post_slider_action',
                      category_id:  currentAttrValue,
                      category_slug: currentAttrSlug,
                      postper_page: PostPerPage,
                      post_meta: PostMeta
                  },
              type:'post',
               success: function(res){                                        
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').append(res);
                      vmagazine_block_post_slider('.'+currentAttrSlug);
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();
                      $('.block-loader').hide();
                  }
          });
      }
    });


/* ---------------------------------------------------------------------------------------------- */
/**
* block post slider
* block-post-slider
*
*/
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

  $('.vmea-block-post-slider .vmagazine-tabbed-post-slider li').first('li').addClass('active');

    $('.vmea-block-post-slider .multiple-child-cat-tabs-post-slider .vmagazine-tabbed-post-slider a').on('click', function(e)  {
        
      $.dis = $(this);
        var currentAttrValue = $(this).attr('data-id');
        var currentAttrSlug = $(this).attr('data-slug');
        var PostPerPage = $(this).attr('data-offset');
        var PostMeta = $(this).attr('data-meta');


        $(this).parent('li').addClass('active').siblings().removeClass('active');

        if($(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).length > 0){
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
            $(this).parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();

        } else {
          $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-loader').show();
          $.ajax({
              url : ajaxURL,
              
              data:{
                    action : 'vmagazine_ea_block_post_slider_action',
                    category_id:  currentAttrValue,
                    category_slug: currentAttrSlug,
                    postper_page: PostPerPage,
                    post_meta: PostMeta
                  },
              type:'post',
               success: function(res){                                        
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').append(res);
                      vmagazine_block_post_slider('.'+currentAttrSlug);
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.block-cat-content').hide();
                      $.dis.parents('.block-header').siblings('.block-content-wrapper').find('.'+currentAttrSlug).show();
                      $('.block-loader').hide();
                  }
          });
      }
    });

/* ---------------------------------------------------------------------------------------------- */
/**
* 
* Slider Tab Carousel
*
* slider-tab-carousel
*
*/
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

/**
* AJAX function
* Slider Tab Carousel
*
* slider-tab-carousel
*
*/
  $('.vmea-slider-tab-carousel .slider-tab-links-carousel li').first('li').addClass('active');

    $('.vmea-slider-tab-carousel .slider-cat-tabs-carousel .slider-tab-links-carousel a').on('click', function(e)  {
        
      $.dis = $(this);
        var currentAttrValue  = $(this).attr('data-id');
        var currentAttrSlug   = $(this).attr('data-slug');
        var PostPerPage       = $(this).attr('data-offset');
        var PostMeta          = $(this).attr('data-meta');


        $(this).parent('li').addClass('active').siblings().removeClass('active');

        if($(this).parents('.block-header').siblings('.block-content-wrapper-carousel').find('.'+currentAttrSlug).length > 0){
            $(this).parents('.block-header').siblings('.block-content-wrapper-carousel').find('.block-cat-content-carousel').hide();
            $(this).parents('.block-header').siblings('.block-content-wrapper-carousel').find('.'+currentAttrSlug).show();

        } else {
          $.dis.parents('.block-header').siblings('.block-content-wrapper-carousel').find('.block-loader').show();
          $.ajax({
              url : vmagazine_ajax_script.ajaxurl,
              
              data:{
                      action : 'vmagazine_ea_slider_tab_carousel_action',
                      category_id:  currentAttrValue,
                      category_slug: currentAttrSlug,
                      postper_page: PostPerPage,
                      post_meta: PostMeta
                  },
              type:'post',
               success: function(res){                                        
                      $.dis.parents('.block-header').siblings('.block-content-wrapper-carousel').append(res);
                      vmagazine_cat_tabs_carousel('.'+currentAttrSlug);
                      $.dis.parents('.block-header').siblings('.block-content-wrapper-carousel').find('.block-cat-content-carousel').hide();
                      $.dis.parents('.block-header').siblings('.block-content-wrapper-carousel').find('.'+currentAttrSlug).show();
                      $('.block-loader').hide();
                  }
          });
      }
    });



}(jQuery));