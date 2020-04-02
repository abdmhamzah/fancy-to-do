

$(document).ready(function(){

    // $.ajax({
    //     url: 'http://localhost:3000/todos',
    //     type: 'GET',
    //     headers: {
    //         "token": localStorage.getItem('token')
    //     },
    // })
    //     .done(result => {
    //         console.log(result);
    //     })
    //     .fail(err => {
    //         console.log(err);
    //     })


    // TOGGLE SIGNUP
    $('#nav-signup').click(function(e){
        e.preventDefault()
        $('#field-signup').toggle()
        $('#field-signin').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
    })

    // TOGGLE SIGNIN
    $('#nav-signin').click(function(e){
        e.preventDefault()
        $('#field-signin').toggle()
        $('#field-signup').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
    })

    // TOGGLE TODOS
    $('#nav-todos').click(function(e){
        e.preventDefault()
        $('#field-todos').toggle()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-addTodo').hide()
    })

    // TOGGLE ADD TODO
    $('#todos-add-todo').click(function(e){
        e.preventDefault()
        $('#field-addTodo').toggle()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
    })

    // SIGNUP
    $('#signup').submit(function(e){
        e.preventDefault()

        let newUser = {
            email: $('#signup_email').val(),
            username: $('#signup_username').val(),
            password: $('#signup_password').val()
        }

        console.log(newUser);
        $.ajax({
            url: 'http://localhost:3000/user/signup',
            type: 'POST',
            data: newUser
        })
            .done(signup => {
                $('#field-signup').hide()
                $('#field-signin').show()
                
                console.log(signup);
                localStorage.setItem('token', signup)
            })
            .fail(err => {
                console.log(err);
            })
    })

    // SIGNIN
    $('#signin').submit(function(e){
        e.preventDefault()

        let user = {
            username: $('#signin_username').val(),
            password: $('#signin_password').val()
        }

        console.log(user);
        $.ajax({
            url: 'http://localhost:3000/user/signin',
            type: 'POST',
            data: user
        })
            .done(signin => {
                $('#field-signin').hide()
                $('#field-todos').show()

                console.log(signin);
                
            })
            .fail(err => {
                console.log(err);
            })
        
    })

    // GET TODOS

    // ADD TODO
    
});