// handle form
$('#join-meeting-button').click(function (e) {
    console.log("join clicked");
    $("#join-form").submit();
//    e.preventDefault();
//    var code = $('#join-input-code').val();
//    console.log(code);
//    var firstName = $("#join-input-firstname").val();
//    var lastName = $("#join-input-lastname").val();
//    var joinInputData = {
//        "code": code,
//        "firstName": firstName,
//        "lastName": lastName
//    }
//    console.log(joinInputData);
    // $.post('/home')
});

$('#polling-submit-button').click(function (e) {
    console.log("join clicked");
    $("#polling-create-form").submit();
//    e.preventDefault();
//    var code = $('#join-input-code').val();
//    console.log(code);
//    var firstName = $("#join-input-firstname").val();
//    var lastName = $("#join-input-lastname").val();
//    var joinInputData = {
//        "code": code,
//        "firstName": firstName,
//        "lastName": lastName
//    }
//    console.log(joinInputData);
    // $.post('/home')
});

$('#leave-meeting').click(function (e) {
    console.log("leave clicked");
    $.ajax({
    url: '/',
    type: 'DELETE',
    success: function(result) {
        console.log(result);
        console.log("leave the meeting successfully");
        window.location.href = '/';
    }
    });
});


(function ($) {
    "use strict"; // Start of use strict
	/*
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });
	*/
    // Fit Text Plugin for Main Header
    $("h1").fitText(
        0.8, {
            minFontSize: '30px',
            maxFontSize: '65px'
        }
    );

    $(".create-text-sm").fitText(
        1.5, {
            minFontSize: '12px',
            maxFontSize: '30px'
        }
    );

    $(".btn-xl").fitText(
        1.5, {
            minFontSize: '11px',
            maxFontSize: '18px'
        })

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

function pollingAdd() {
	var count = document.getElementById("polling-create-form").elements.length;
	if (count < 7) {
		var newInput = document.createElement('div');
		newInput.innerHTML ='<div class="create-text-sm create-header">'
                            +'Option '+(count-1)
                          +'</div>'
                          +'<div class="col-xs-12">'
                            +'<div class="create-text-sm input-short container-fluid">'
                              +'<input id="polling-create-option' + (count-1) + '" name="pollingOption'+
                              (count-1) + '" type="text">'
                            +'</div>'
                          +'</div>';
		newInput.className += 'input-group text-section'
		document.getElementById("polling-create-form").appendChild(newInput);
		if (count == 6)
			$("#polling-create-add").hide();
		if (count == 4)
			$("#polling-create-minus").show();
	}
}

function pollingRemove() {
	var count = document.getElementById("polling-create-form").elements.length;
	if (count > 4) {
		$('#polling-create-form .text-section:last-child').remove();
		if (count == 5)
			$("#polling-create-minus").hide();
		if (count == 7)
			$("#polling-create-add").show();
	}
}