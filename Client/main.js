$(document).ready(function(){

    // let signupHidden = false
    // $("#register").click(function(e){
    //     e.preventDefault()
    //     if (signupHidden) {
    //         $('#field-signup').show();
    //         signupHidden = false
    //     } else {
    //         $('#field-signup').hide();
    //         signupHidden = true
    //     }
    // });

    // let signinHidden = false
    // $("#login").click(function(e){
    //     e.preventDefault()
    //     if (signinHidden) {
    //         $('#field-signin').show();
    //         signinHidden = false
    //     } else {
    //         $('#field-signin').hide();
    //         signinHidden = true
    //     }
    // });

    

    // GET TODOS
    $.ajax({
        url: "http://localhost:3000/todos",
        method: "GET",
    })
        .done(function(todos){
            console.log(todos);
            
        })
        .fail(function(err){

        })
});