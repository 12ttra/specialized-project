const btnRegister = document.querySelector("#register-page .right button");
btnRegister.addEventListener("click", register);

function register(e){
    let fullname = document.getElementById("fullname").value;
    let birthday = document.getElementById("birthday").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
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
            if(result.success){
                alert('Account created successfully! Thank you ');
                window.location.href="/account/login";
            } else {
                console.log("loi");
                alert("Loi dang ky");
            }
        },
        error: function (error) {
            console.log("loi");
            alert(error.responseJSON.message);
        }
    }).done(function (msg){
        console.log(msg);
    });
}