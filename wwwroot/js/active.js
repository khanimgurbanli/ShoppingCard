
(function ($) {
    'use strict';

    var windows = $(window);
	var sticky = $('.header-sticky');
	var $body = $('body');  

    /*---------------------------------
        Menu Sticky
    -----------------------------------*/
    var windows = $(window);
    var sticky = $('.header-sticky');
    
    windows.on('scroll', function() {
        var scroll = windows.scrollTop();
        if (scroll < 230) {
            sticky.removeClass('is-sticky');
        }else{
            sticky.addClass('is-sticky');
        }
    });
    /*----------------------------------
        ScrollUp Active
    -----------------------------------*/
    $.scrollUp({
        scrollText: '<i class="icon-rt-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });   
    
    /*-----------------------------
    Category Menu Active
    ---------------------------- */	
    $(".categories_title").on("click", function() {
        $(this).toggleClass('active');
        $('.categories_menu_toggle').slideToggle('medium');
    }); 

    $('.categories-more-less').on('click', function(){
        $('.hide-child').slideToggle();
        $(this).toggleClass('rx-change');
    });	

    /* ----------------------------
    Category menu
    ------------------------------- */
    function categorySubMenuToggle(){
        $('.categories_menu_toggle li.menu_item_children > a').on('click', function(){
            if($(window).width() < 991){
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('open')) {
                    element.removeClass('open');
                    element.find('li').removeClass('open');
                    element.find('ul').slideUp();
                }
                else {
                    element.addClass('open');
                    element.children('ul').slideDown();
                    element.siblings('li').children('ul').slideUp();
                    element.siblings('li').removeClass('open');
                    element.siblings('li').find('li').removeClass('open');
                    element.siblings('li').find('ul').slideUp(); 
                }
            }
        });
        $('.categories_menu_toggle li.menu_item_children > a').append('<span class="expand"></span>');
    }
    categorySubMenuToggle();

    /*------------------------------------
        offcanvas mobile menu           
    ----------------------------------------*/
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

    /*----------------------------------------*/
	/*  Toolbar Button
    /*----------------------------------------*/
	var $overlay = $('.global-overlay');
	$('.toolbar-btn, .mobile-menu-active, .siderbar-widget-filte-button').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		var target = $this.attr('href');
		var prevTarget = $this.parent().siblings().children('.toolbar-btn').attr('href');
		$(target).toggleClass('open');
		$(prevTarget).removeClass('open');
		$($overlay).addClass('overlay-open');
        $($body).addClass('sidebar-open')
	});

    /*----------------------------------------*/
	/*  Close Button Actions
    /*----------------------------------------*/
	$('.close-button, .side-close-icon, body .global-overlay').on('click', function (e) {
		var dom = $('body').children();
		e.preventDefault();
		var $this = $(this);
		$this.parents('.open').removeClass('open');
		dom.find('.m-menu-side').removeClass('open');
		dom.find('.global-overlay').removeClass('overlay-open');
        $body.removeClass('sidebar-open')
        $($overlay).parent().removeClass('open');
        $('.show-filter-widget-inner').parent().removeClass('open');
	});

    /*----------------------------------------*/
	/*  Search Button Action
    /*----------------------------------------*/ 
    const searchIcon = document.querySelector('.search-sidebar')
    const searchTarget = document.querySelector('.popup-search-wrapper')
    const searchClose = document.querySelector('.search-close-button')

    searchIcon.addEventListener('click', function(){
        searchTarget.classList.add("search-open")
    })
    searchClose.addEventListener('click', function(){
        searchTarget.classList.remove("search-open")
    })

    /*----------------------------------------*/
	/*  Show More text Content Action
    /*----------------------------------------*/ 
    
    const blockExpand = document.querySelector('.block-expand')
    const expandContent = document.querySelector('.expand-content')
    if(blockExpand) {
        blockExpand.addEventListener('click', function(e){
            e.preventDefault();
            const text = this.textContent.trim()
            if(text === "Show more") {
                this.innerHTML = "Show less"
                this.classList.add('remove')
            } else {
                this.innerHTML = "Show more"
                this.classList.remove('remove')
            }
            expandContent.classList.toggle('expanded-content')
        })
    }

    /*----------------------------------------*/
	/*  Lode More Product Button Action
    /*----------------------------------------*/
    
    const lodeMoreItem = document.querySelector('.load-more-button');
    const elementList = [...document.querySelectorAll(".load-more-item")];
    var lodeShowItems = 4;
    var currentItems = 12;
    elementList.slice(0, currentItems).forEach(el=>{
        el.style.display = "block"
    });
    if(lodeMoreItem) {
        lodeMoreItem.addEventListener('click', function(e){
            e.target.classList.add('show-loader')
            for(let i = currentItems; i < currentItems + lodeShowItems; i++){
                setTimeout(()=> {
                    if(elementList[i]){
                        elementList[i].style.display = "block";
                    }
                }, 1000);
            }
            currentItems += lodeShowItems;
            if(currentItems >= elementList.length) {
                e.target.classList.add('loaded')
                setTimeout(()=> {
                    this.textContent = "All items loaded"
                }, 1200)
            }
        
        })
    }

    /*----------------------------------------*/
	/* Slider Active JS
    /*----------------------------------------*/

    var heroSlider = $('.hero-slider-one-active');
    heroSlider.slick({
        arrows: true,
        autoplay: false,
        autoplaySpeed: 5000,
        dots: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
              breakpoint: 767,
              settings: {
                dots: false,
              }
            }
        ]
    });


    /*--
    Product Slider
    --------------------------------------------*/
    var productSlider = $('.product-slider-active');
    productSlider.slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    var productSlider4 = $('.product-slider-active-4');
    productSlider4.slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    var productSliderDeals = $('.product-slider-active-deals');
    productSliderDeals.slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    
    var productSliderDeals2 = $('.product-slider-active-deals-2');
    productSliderDeals2.slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    var productGrid = $('.product-slider-active-grid');
    productGrid.slick({
        dots: false,
        infinite: true,
        rows: 2,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    var productGridTwo = $('.product-slider-active-grid-4');
    productGridTwo.slick({
        dots: false,
        infinite: true,
        rows: 2,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    var productGridFive = $('.product-slider-active-grid-5');
    productGridFive.slick({
        dots: false,
        infinite: true,
        rows: 2,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    prevArrow: false,
                    nextArrow: false,
                }
            }
        ]
    });
    var productGrid = $('.categories-slider-active');
    productGrid.slick({
        dots: false,
        infinite: true,
        rows: 2,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    prevArrow: false,
                    nextArrow: false
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    prevArrow: false,
                    nextArrow: false
                }
            }
        ]
    });
    

    var latestBlog = $('.latest-blog-active');
    latestBlog.slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    var testimonial = $('.testimonials-slider-active');
    testimonial.slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    
    var testimonial = $('.testimonials-slider-item-4-active');
    testimonial.slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    var productColHorizontal = $('.single-horizontal-slider');
    productColHorizontal.slick({
        dots: false,
        infinite: true,
        rows: 4,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        loop: true,
        prevArrow: false,
        nextArrow: false,
    });

    var latestBlog = $('.category-three-slider-active');
    latestBlog.slick({
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    var latestBlog = $('.category-four-slider-active');
    latestBlog.slick({
        dots: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 4,
        autoplay: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


    var productDetailsImagesTop = $('.product-details-images-top');
    productDetailsImagesTop.slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


    var blogDetailsImages = $('.blog-slider-details-active');
    blogDetailsImages.slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
    });

    /* Product Details Images Slider */
    $('.product-details-images').each(function(){
        var $this = $(this);
        var $thumb = $this.siblings('.product-details-thumbs');
        $this.slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: false,
            touchMove:false,
            fade: true,
            verticalSwiping:true,
            asNavFor: $thumb,
        });
    });
    $('.product-details-thumbs').each(function(){
        var $this = $(this);
        var $details = $this.siblings('.product-details-images');
        $this.slick({
            asNavFor: $details,
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: true,
            asNavFor: $details,
            prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-left-solid"> </i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-right-solid"> </i></button>',
        });
    });
    $('.modal').on('shown.bs.modal', function (e) {
        $('.product-details-images, .product-details-thumbs').slick('setPosition');
    }) 
    
     /* Product Details Images Thumbs Vertical Slider */
     $('.product-details-image-vertical').each(function(){
        var $this = $(this);
        var $thumb = $this.siblings('.product-details-thumbs-vertical');
        $this.slick({
            asNavFor: $thumb,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: false,
            touchMove:false,
            fade: true,
            verticalSwiping:true,
        });
    });
    $('.product-details-thumbs-vertical').each(function(){
        var $this = $(this);
        var $details = $this.siblings('.product-details-image-vertical');
        $this.slick({
            asNavFor: $details,
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical:true,
            dots: false,
            focusOnSelect: true,
            prevArrow: '<button type="button" class="slick-prev"> <i class="icon-rt-arrow-up"> </i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon-rt-arrow-down"> </i></button>',
        });
    });

    // Image zoom effect
    $('.img-zoom').zoom();


    /*----------------------------
    Packet Size
    -----------------------------*/
    const paSize = document.querySelectorAll(".packet-swatch-vareant");
    //const packetVareantPrice = document.querySelector('.packet-swatch-vareant-price')
    paSize.forEach((item) => {
        item.addEventListener("click", function (e) {
            paSize.forEach((item) => {
                item.classList.remove("active");
            });
            e.target.classList.add("active");
        });
        
    });

    /*------------------------------ 
    Cart Plus Minus Button
    ---------------------------------*/
    $(".cart-plus-minus").prepend('<div class="dec qtybutton">-</div>');
    $(".cart-plus-minus").append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
                } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    }); 


    /*-- 
    Countdown Activation 
    ------------------------------------*/
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Mins</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Secs</span></div>'));
		});
	});
        
    /*--
        price-slider active
    -------------------------------*/  
    $( "#price-slider" ).slider({
        range: true,
        min: 0,
        max: 120,
        values: [ 20, 115 ],
        slide: function( event, ui ) {
            $( "#min-price" ).val('$' + ui.values[ 0 ] );
            $( "#max-price" ).val('$' + ui.values[ 1 ] );
        }
    });
    $( "#min-price" ).val('$' + $( "#price-slider" ).slider( "values", 0 ));   
    $( "#max-price" ).val('$' + $( "#price-slider" ).slider( "values", 1 )); 
    

    /*----------------------------
    shop grid activation
    ------------------------------*/
    $('.shop-toolbar-btn > button').on('click', function (e) {
		e.preventDefault();
        $('.shop-toolbar-btn > button').removeClass('active');
		$(this).addClass('active');
		var parentsDiv = $('.shop-product-wrapper');
		var viewMode = $(this).data('role');
		parentsDiv.removeClass('grid-3 grid-list').addClass(viewMode);
		if(viewMode == 'grid-3'){
			parentsDiv.children().addClass('col-xl-3 col-lg-4 col-md-4 col-sm-6').removeClass('col-lg-3 col-cust-5 col-12 ');
		}
        if(viewMode == 'grid-list'){
			parentsDiv.children().addClass('col-12').removeClass('col-xl-3 col-lg-4 col-md-4 col-sm-6 col-cust-5');
		}
	});

    /*--
    Magnific Popup
    ------------------------*/
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    // Magnific Popup Video
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    /*--- 
    counter up active            
    ------------------------------------*/
    
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    /*--
        showlogin toggle function
    --------------------------*/
    $( '#showlogin' ).on('click', function() {
        $('#checkout-login' ).slideToggle(500);
    }); 

    /*--
        showcoupon toggle function
    --------------------------*/
    $( '#showcoupon' ).on('click', function() {
        $('#checkout-coupon' ).slideToggle(500);
    });
    /*--
        Checkout 
    --------------------------*/
    $("#chekout-box").on("change",function(){
        $(".account-create").slideToggle("100");
    });

    /*-- 
        Checkout 
    ---------------------------*/
    $("#chekout-box-2").on("change",function(){
        $(".ship-box-info").slideToggle("100");
    });   

    /*--
        Payment Select accordion option 
    ---------------------------*/
    const paymentAccBtn = document.querySelectorAll('input[name="paymentsSelector"]')
    const paymentsAccTextBody = document.querySelectorAll(".payments-text-body")
    for(let i = 0; i < paymentAccBtn.length; i++){
        paymentAccBtn[i].addEventListener('click', function(){
            this.classList.toggle("active");
            paymentsAccTextBody.forEach(item => {
                item.classList.remove("current")
            })
            if(paymentAccBtn[i].checked) {
                paymentsAccTextBody[i].classList.add("current")
            }
            
        })
    }


})(jQuery);