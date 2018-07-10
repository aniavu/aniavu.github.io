var unknown_token = '7b292b6a1f515410';

/**
 * Add a listener to an element by id
 */
function addById (id, fu) {
  var e = document.getElementById(id);
  e.addEventListener('click', fu, false);   
}

function isValid(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function register () {
  var email_div = document.getElementById('beta_registration');
  var email = document.getElementById('beta_email_input').value;

  if (!email) { //not empty
    alert('You haven\'t inserted an email!');
  } else {
    if (isValid(email)) {
      $('#step_1').fadeOut(1000, subscribe(email));
    } else {
      alert("This does not seem like a  valid email!");
    }
  }
}

///////////////// AJAX ///////////////////
function subscribe (email) {
  return function() {
    $.ajax({ 
      url: 'http://api.gist.ly/email/subscribe/' + email +'FROMGOHAPPY.IO/',
      data: 'token=' + unknown_token, // Send value of the clicked button
      dataType: 'json',
      success: function(data) {
        var resp = document.getElementById('step_3');
        if (data["status"] != 'OK') {
          resp.innerHTML = "<p>Something Went Wrong..</p>";
        } else {
          resp.innerHTML = "<p>Got that, thanks!</p>";
        }
        $("#step_3").fadeIn(1000);
      },
      error: function(data) {
        var resp = document.getElementById('step_3');
        resp.innerHTML = "<p>Done!</p>";
        $("#step_3").fadeIn(1000);
      },
    });
    return true;
  }
}

function addById (id, fu) {
  var e = document.getElementById(id);
  if (!e) {
    return;
  }
  e.addEventListener('click', fu, false);   
}

/**
 * Main JS file for GhostScroll behaviours
 */
var $post = $('.post'), 
	$first = $('.post.first'), 
	$last = $('.post.last'), 
	$fnav = $('.fixed-nav'),
	$postholder = $('.post-holder'),
	$postafter = $('.post-after'),
	$sitehead = $('#site-head');

/*globals jQuery, document */
(function ($) {
    "use strict";
    function srcTo (el) {
    	$('html, body').animate({
			scrollTop: el.offset().top
		}, 1000);
    }
    $(document).ready(function(){
        $postholder.each(function (e) {
        	if(e % 2 != 0)
        		$(this).css({
						// these are the darker posts
                    'background': '#242E35',
                    'color'     : '#F8F7F1',
                })
        })

        $postafter.each(function (e) {
        	var bg = $(this).parent().css('background-color')
					console.log(e, $(this).parent(), bg);
        	$(this).css('border-top-color', bg)

        	//if(e % 2 == 0)
        	//	$(this).css('left', '6%')

        })
        

        $('.btn.first').click( function () {
        	srcTo ($first)
        })
        $('.btn.last').click( function () {
        	srcTo ($last)
        })
        $('#header-arrow').click(function () {
            srcTo ($first)
        })

        $('.post-title').each(function () {
        	var t = $(this).text(),
        	    index = $(this).parents('.post-holder').index();
        	$fnav.append("<a class='fn-item' item_index='"+index+"'>"+t+"</a>")

        	$('.fn-item').click(function () {
        		var i = $(this).attr('item_index'),
        			s = $(".post[item_index='"+i+"']")

        		$('html, body').animate({
					scrollTop: s.offset().top
				}, 400);

        	})
        })

        $('.post.last').next('.post-after').hide();
        if($sitehead.length) { 
            $(window).scroll( function () {
            	var w = $(window).scrollTop(),
            		g = $sitehead.offset().top,
            		h = $sitehead.offset().top + $(this).height()-100;

            	if(w >= g && w<=h) {
            		$('.fixed-nav').fadeOut('fast')
            	} else {
                    if($(window).width()>500)
            		  $('.fixed-nav').fadeIn('fast')
            	}

            	$post.each(function () {
            		var f = $(this).offset().top,
            			b = $(this).offset().top + $(this).height(),
            			t = $(this).parent('.post-holder').index(),
            		 	i = $(".fn-item[item_index='"+t+"']"),
            		 	a = $(this).parent('.post-holder').prev('.post-holder').find('.post-after');

            		 $(this).attr('item_index', t);

            		if(w >= f && w<=b) {

            			i.addClass('active');
            			a.fadeOut('slow')
            		} else {
            			i.removeClass('active');
            			a.fadeIn('slow')
            		}
            	})
            });
        }
        $('li').before('<span class="bult fa fa-asterisk icon-asterisk"></span>')
        $('blockquote p').prepend('<span class="quo icon-quote-left"></span>')
            .append('<span class="quo icon-quote-right"></span>')

        addById('submitbutton', register);

    });

    $post.each(function () {
        var postText = $(this).html();
        var fa  = [];
        for(var i=0; i < icons.length; i++) {
            fa[i]       = {};
            fa[i].str   = "@"+ icons[i]+ "@";
            fa[i].icon  = icons[i];
            fa[i].int   = postText.search(fa[i].str);

            if(fa[i].int > -1 ) { 
                fa[i].count = postText.match(new RegExp(fa[i].str,"g")).length;
                for(var j=0; j < fa[i].count; j++) {
                    $(this).html($(this).html().replace(fa[i].str, "<i class='fa "+fa[i].icon+"'></i>"))
                }
            }
        }
    })
    
    //$('.image').fancybox({
    //  helpers: {
    //    overlay: {
    //      locked: false
    //    }
    //  }
    //});
    
    $.fancybox.defaults.hideScrollbar = false;

}(jQuery));

