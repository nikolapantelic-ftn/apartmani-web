function viewLoginForm() {
    viewRegisterButton.attr("disabled", false);
    viewLoginButton.attr("disabled", true);
    registerForm.css("display", "none");
    loginForm.css("display", "block");
}

function viewRegisterForm() {
    viewLoginButton.attr("disabled", false);
    viewRegisterButton.attr("disabled", true);
    loginForm.css("display", "none");
    registerForm.css("display", "block");
}

var registerForm, loginform, viewRegisterButton, viewLoginButton;

$(document).ready(function () {
    registerForm = $('form[name="register"]');
    loginForm = $('form[name="login"]');
    viewLoginButton = $('button[name="viewloginbtn"]');
    viewRegisterButton = $('button[name="viewregisterbtn"]');
    viewLoginButton.attr("disabled", true);
    registerForm.css("display", "none");
    loginForm.css("display", "block");

    registerForm.submit(function (event) {
        event.preventDefault();
    });

    loginForm.submit(function (event) {
        event.preventDefault();
    });
});