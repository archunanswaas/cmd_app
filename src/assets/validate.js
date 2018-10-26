
/* $( "#uploadForm" ).validate({
    rules: {
        uploadfiles: {
            required: true,
            extension: "xls"
        },
        platform_id: {
            required: true,
        }
    },
    messages: {
        uploadfiles:{
            required: "This field is required",
            accept: "Only file type XLSX is allowed"
        },
        platform_id: {
            required: "This field is required"
        }

    },
    highlight: function ( element, errorClass, validClass ) {
		$( element ).parents( ".col-sm-4" ).addClass( "has-error" ).removeClass( "has-success" );
	},
	unhighlight: function (element, errorClass, validClass) {
		$( element ).parents( ".col-sm-4" ).addClass( "has-success" ).removeClass( "has-error" );
	}


  }); */


 


$( "#signupForm" ).validate( {
    rules: {
        firstname: "required",
        lastname: "required",
        username: {
            required: true,
            minlength: 2
        },
        password: {
            required: true,
            minlength: 5
        },
        confirm_password: {
            required: true,
            minlength: 5,
            equalTo: "#password"
        },
        email: {
            required: true,
            email: true
        },
        agree: "required"
    },
    messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        username: {
            required: "Please enter a username",
            minlength: "Your username must consist of at least 2 characters"
        },
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        },
        confirm_password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
            equalTo: "Please enter the same password as above"
        },
        email: "Please enter a valid email address",
        agree: "Please accept our policy"
    },
    errorElement: "em",
    errorPlacement: function ( error, element ) {
        // Add the `help-block` class to the error element
        error.addClass( "help-block" );

        if ( element.prop( "type" ) === "checkbox" ) {
            error.insertAfter( element.parent( "label" ) );
        } else {
            error.insertAfter( element );
        }
    },
    highlight: function ( element, errorClass, validClass ) {
        $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
    },
    unhighlight: function (element, errorClass, validClass) {
        $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
    },
    
    submitHandler: function (form) {
        alert('is good');
        return false;
    }

    
} );



