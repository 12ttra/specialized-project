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