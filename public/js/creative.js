// handle form
$('#join-meeting-button').click(function (e) {
    console.log("join clicked");
    if(!validateJoin()) {
        return;
    }
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
    if(!validateCreate()) {
        return;
    }
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
                              +'<input id="polling-create-option' + (count-2) + '" name="pollingOption'+
                              (count-2) + '" type="text">'
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

function validateJoin() {
    var error = "";
    var errorExist = false;
    var errorColor = '#ffff4c';
    var legalName = /^[a-zA-Z]+$/; // allow letters, numbers, and underscores
    var legalCode = /^\d+$/
    var firstname = document.getElementById("join-input-firstname");
    var lastname = document.getElementById("join-input-lastname");
    var code = document.getElementById("join-input-code");
    var errorMessage = document.getElementById("error-message");
    var errorInput = document.createElement('ul');
    //initialize color 
    code.style.background = 'White';
    firstname.style.background = 'White';
    lastname.style.background = 'White';
    $('#error-message ul').remove();

    if(!(legalCode.test(code.value)) || code.value.length!=6) {
        code.style.background = errorColor;
        error += "<li>Please enter a 6-digit code.</li>";
        errorExist = true;
    }
    if (firstname.value == "") {
        firstname.style.background = errorColor;
        error += "<li>Please enter the firstname.</li>";
        errorExist = true;
    }
    else if (!legalName.test(firstname.value)) {
        firstname.style.background = errorColor;
        error += "<li>Please enter your correct firstname</li>";
        errorExist = true;
    }

    if (lastname.value == "") {
        lastname.style.background = errorColor;
        error += "<li>Please enter the lastname.</li>";
        errorExist = true;
    }
    else if (!legalName.test(lastname.value)) {
        lastname.style.background = errorColor;
        error += "<li>Please enter your correct lastname</li>";
        errorExist = true;
    } 

    if(errorExist) {
        console.log(error);
        errorInput.innerHTML = error;
        errorInput.style.color = 'Red';

        errorMessage.appendChild(errorInput);
        return false;
    }
    else {
        return true;
    }
}

function validateCreate() {
    var error = "";
    var errorExist = false;
    var errorColor = '#ffff4c';

    var errorInput = document.createElement('ul');
    var errorMessage= document.getElementById("error-message");
    var title = document.getElementById("polling-create-title");
    var count = document.getElementById("polling-create-form").elements.length - 2;
    var options = [];
    for(var i=0; i<count; i++) {
        options[i] = (document.getElementById("polling-create-option"+(i+1)));
    }
    if(errorMessage == undefined) {
        console.log("errorMessage undefined");
    }
    //initialize background color
    for(var i=0; i<count; i++) {
        options[i].style.background = 'White';
    }
    title.style.background = 'White';
    //clear error message
    $('#error-message ul').remove();

    if(title.value=="") {
        title.style.background = errorColor;
        error += "<li>Please enter your question in title.</li>";
        errorExist = true;
    }

    for(var i=0; i<count; i++) {
        if(options[i].value=="") {
            options[i].style.background = errorColor;
            error += "<li>Please fill in option" + (i+1) + ".</li>";
            errorExist = true;
        }
    }

    if(errorExist) {
        console.log(error);
        errorInput.innerHTML = error;
        errorInput.style.color = 'Red';
        errorMessage.appendChild(errorInput);
        return false;
    }
    else {
        return true;
    }
}


