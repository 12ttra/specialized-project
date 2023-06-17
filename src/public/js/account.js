//PAGE REGISTER

const btnRegister = document.querySelector("#register-page .right button");
btnRegister.addEventListener("click", register);

function register(e){
    let fullname = document.getElementById("fullname").value;
    let birthday = document.getElementById("birthday").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let message_noti= document.getElementsByClassName("message__noti");
    let params = {
        'name': fullname,
        'birthday': birthday,
        'email': email,
        'password': pass,
        'cPassword': pass
    };
    $.ajax({
        url: "/account/register-post",
        type: 'POST',
        data: params,
        dataType: "json",
        success: function (result) {
            if(result.status == '1'){
                message_noti.innerHTML = result.message;
                btnRegister.style.visibility = "hidden";
                window.location.href="/account/login";
            } else {
                message_noti.innerHTML = result.message;
                btnRegister.style.visibility = "visible";
               
            }
        },
        error: function (error) {
            console.log("Error");
            alert(error.responseJSON.message);
        }
    }).done(function (msg){
        console.log(msg);
    });
}

//PAGE LOGIN 
//const btnLogin = document.querySelector("#btn-login");
//btnRegister.addEventListener("click", login);

const login = (e)=>{
    let email = document.getElementById("email-login").value;
    let password = document.getElementById("pass-login").value;
    let message_noti= document.getElementsByClassName("message-error");
    let params = {
        'email': email,
        'password': password,
    };
    $.ajax({
        url: "/account/login",
        type: 'POST',
        data: params,
        dataType: "json",
        success: function (result) {
            if(result.status == '1'){
                window.location.href = "/home";
            } else {
                message_noti.innerHTML = result.message;
               
            }
        },
        error: function (error) {
            console.log("Error");
            alert(error.responseJSON.message);
        }
    }).done(function (msg){
        console.log(msg);
    });
}
