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

$('#create-meeting-button').click(function (e) {
    e.preventDefault();
    console.log("create clicked");
    window.location.href = '/create';
});


$('#create-meeting-cancel-button').click(function (e) {
    console.log("cancel create");
    $.ajax({
    url: '/',
    type: 'DELETE',
    success: function(result) {
        console.log("cancel the meeting successfully");
        window.location.href = '/';
    }
    });
});

$('#create-meeting-next-button').click(function (e) {
    console.log("creator enter the room");
    if(!validateCreate()) {
        return;
    }
    $("#create-form").submit();
});



$('#polling-submit-button').click(function (e) {
    console.log("polling submitted");
    if(!validatePolling()) {
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

$('#polling-vote-submit-button').click(function (e) {
    console.log("vote clicked");
	
    $("#polling-vote-form").submit();
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
        console.log("leave the meeting successfully");
        window.location.href = '/';
    }
    });
});

$('.home-delete-polling-button').click(function (e) {
    e.preventDefault();
    console.log("delete polling clicked");

    var deleteId = $(this).attr('id');
 
    var id = parseInt(deleteId.substring(6));
    console.log("ID is" + id);
    $.ajax({
    url: '/home',
    type: 'DELETE',
    dataType: 'json',
    data: {'id': id},
    success: function(result) {
        console.log("Delete polling successfully");
        window.location.href = '/home';
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
		newInput.innerHTML ='<label class="create-label">Option '+(count-1)+'</label>'
                          +'<input type="text" class="form-control" id="polling-create-option'+(count-2)+'" name="pollingOption'+(count-2)+ '" aria-describedby="inputError2Status">'
                          + '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'+
                          '<span id="inputError2Status" class="sr-only">(error)</span>'
		newInput.className += 'form-group has-feedback text-section'
        newInput.id = 'option'+(count-2)+'-polling-group'
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
		$('#polling-create-form .form-group:last-child').remove();
		if (count == 5)
			$("#polling-create-minus").hide();
		if (count == 7)
			$("#polling-create-add").show();
	}
}

function validateJoin() {
    var error = "";
    var errorExist = false;
    var errorColor = '#faebd7';
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
    var codeV = true;
    var codeVmessage;
	var firstnameV = true;
	var firstnameVmessage;
	var lastnameV = true;
	var lastnameVmessage;
    
    if(!(legalCode.test(code.value)) || code.value.length!=6) {
        code.style.background = errorColor;
        codeVmessage = "Please enter a 6-digit code";
        codeV = false;
    }
    if (firstname.value == "") {
        firstname.style.background = errorColor;
        firstnameVmessage = "Please enter your firstname";
        firstnameV = false;
    }
    else if (!legalName.test(firstname.value)) {
        firstname.style.background = errorColor;
        firstnameVmessage = "Please enter your correct firstname";
        firstnameV = false;
    }

    if (lastname.value == "") {
        lastname.style.background = errorColor;
        lastnameVmessage = "Please enter your lastname";
        lastnameV = false;
    }
    else if (!legalName.test(lastname.value)) {
        lastname.style.background = errorColor;
        lastnameVmessage = "Please enter your correct lastname";
        lastnameV = false;
    } 
	
	if (codeV && firstnameV && lastnameV)
		return true;
	else {
		console.log('error');
		if (!codeV) {
			$('#code-join-form-group').addClass(' has-error');
			$('#join-input-code').val('');
		}
		else
			$('#code-join-form-group').removeClass('has-error');
		if (!firstnameV) {
			$('#join-input-firstname').val('');
			$('#firstname-join-form-group').addClass(' has-error');
		}
		else
			$('#firstname-join-form-group').removeClass('has-error');
		if (!lastnameV) {
			$('#join-input-lastname').val('');
			$('#lastname-join-form-group').addClass(' has-error');
		}
		else
			$('#lastname-join-form-group').removeClass('has-error');
		$('#join-input-code').attr('placeholder', codeVmessage);
		$('#join-input-firstname').attr('placeholder', firstnameVmessage);
		$('#join-input-lastname').attr('placeholder', lastnameVmessage);
		return false;
	}
}

function validateCreate() {
    var error = "";
    var errorExist = false;
    var errorColor = '#faebd7';
    var legalName = /^[a-zA-Z]+$/; // allow letters, numbers, and underscores
    var firstname = document.getElementById("create-input-firstname");
    var lastname = document.getElementById("create-input-lastname");

    var errorMessage = document.getElementById("error-message");
    var errorInput = document.createElement('ul');
    //initialize color 
    firstname.style.background = 'White';
    lastname.style.background = 'White';
    $('#error-message ul').remove();
	
    var firstnameV = true;
	var firstnameVmessage;
	var lastnameV = true;
	var lastnameVmessage;
    
    if (firstname.value == "") {
        firstname.style.background = errorColor;
        firstnameVmessage = "Please enter your firstname";
        firstnameV = false;
    }
    else if (!legalName.test(firstname.value)) {
        firstname.style.background = errorColor;
        firstnameVmessage = "Please enter your correct firstname";
        firstnameV = false;
    }

    if (lastname.value == "") {
        lastname.style.background = errorColor;
        lastnameVmessage = "Please enter your lastname";
        lastnameV = false;
    }
    else if (!legalName.test(lastname.value)) {
        lastname.style.background = errorColor;
        lastnameVmessage = "Please enter your correct lastname";
        lastnameV = false;
    } 
	
	if (firstnameV && lastnameV)
		return true;
	else {
		console.log('error');
		if (!firstnameV) {
			$('#firstname-create-form-group').addClass(' has-error');
			$('#firstname-create-form-group').val('');
		}
		else
			$('#firstname-create-form-group').removeClass('has-error');
		if (!lastnameV) {
			$('#lastname-create-form-group').addClass(' has-error');
			$('#lastname-create-form-group').val('');
		}
		else
			$('#lastname-create-form-group').removeClass('has-error');
		$('#create-input-firstname').attr('placeholder', firstnameVmessage);
		$('#create-input-lastname').attr('placeholder', lastnameVmessage);
		return false;
	}
}


function validatePolling() {
    var error = "";
    var errorExist = false;
    var errorColor = '#faebd7';

    var errorInput = document.createElement('ul');
    var errorMessage= document.getElementById("error-message");
    var title = document.getElementById("polling-create-title");
    var count = document.getElementById("polling-create-form").elements.length - 2;
    var options = [];
    for(var i=0; i<count; i++) {
        options[i] = (document.getElementById("polling-create-option"+(i)));
    }
    if(errorMessage == undefined) {
        console.log("errorMessage undefined");
    }
    //initialize background color
    for(var i=0; i<count; i++) {
        options[i].style.background = 'White';
    }
    title.style.background = 'White';

  	var valid = true;
    var titleV = true;
	var titleVmessage = '';
    var optionsV = [];
	var optionsVmessage = [];
    if(title.value=="") {
        title.style.background = errorColor;
        titleVmessage = "Please enter your question here";
        titleV = false;
		valid = false;
    }

    for(var i=0; i<count; i++) {
        if(options[i].value=="") {
            options[i].style.background = errorColor;
            optionsVmessage[i] = "Please fill in option " + (i+1);
            optionsV[i] = false;
			valid = false;
        }
		else {
			optionsV[i] = true;
			optionsVmessage[i] = '';
		}
    }

    if(valid) {
       	return true;
    }
    else {
        console.log('error');
		if (!titleV) {
			$('#title-polling-group').addClass(' has-error');
			$('#title-polling-group').val('');
		}
		else
			$('#title-polling-group').removeClass('has-error');
		$('#polling-create-title').attr('placeholder', titleVmessage);
		for(var i=0; i<count; i++) {
			if(!optionsV[i]) {
				$('#option'+i+'-polling-group').addClass(' has-error');
				$('#polling-create-option'+i).attr('placeholder', optionsVmessage[i]);

			}
			else
				$('#option'+i+'-polling-group').removeClass('has-error');
		}
		return false;
    }
}


