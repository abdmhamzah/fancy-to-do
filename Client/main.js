$(document).ready(function(){

    if (!localStorage.getItem('token') || localStorage.getItem('token') == null) {
        $('#nav-signin').show()
        $('#nav-signup').show()
        $('#nav-todos').hide()
        $('#nav-holiday').hide()
        $('#nav-signout').hide()
        $('#field-holiday').hide()
    } else {
        $('#nav-signin').hide()
        $('#nav-signup').hide()
        $('#nav-todos').show()
        $('#nav-holiday').show()
        $('#nav-signout').show()
        $('#field-todos').show()
        $('#field-holiday').hide()
        showTodos()
    }

    // TOGGLE SIGNUP
    $('#nav-signup').click(function(e){
        e.preventDefault()
        $('#field-signup').toggle()
        $('#field-signin').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
        $('#field-holiday').hide()
    })

    // TOGGLE SIGNIN
    $('#nav-signin').click(function(e){
        e.preventDefault()
        $('#field-signin').toggle()
        $('#field-signup').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
        $('#field-holiday').hide()
    })

    // TOGGLE TODOS
    $('#nav-todos').click(function(e){
        e.preventDefault()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-addTodo').hide()
        $('#field-holiday').hide()
        showTodos()
        $('#field-todos').show()
    })

    // TOGGLE HOLIDAY
    $('#nav-holiday').click(function(e){
        e.preventDefault()
        $('#field-addTodo').hide()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
        showHoliday()
        $('#field-holiday').show()
    })

    // TOGGLE ADD TODO
    $('#todos-add-todo').click(function(e){
        e.preventDefault()
        $('#field-addTodo').toggle()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-holiday').hide()
    })
});

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
        method: 'POST',
        data: newUser
    })
        .done(signup => {
            $('#signup_email').val('')
            $('#signup_username').val('')
            $('#signup_password').val('')

            $('#field-signup').hide()
            $('#field-signin').show()
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
        method: 'POST',
        data: user
    })
        .done(signin => {
            $('#signin_username').val('')
            $('#signin_password').val('')

            $('#field-signin').hide()
            $('#field-todos').show()

            console.log(signin.token);
            localStorage.setItem('token', signin.token)

            showTodos()
        })
        .fail(err => {
            console.log(err);
        })
    
}) 


// GET TODOS
function showTodos(){
    let token = localStorage.token

    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'GET',
        headers: {
            token: token
        }
    })
        .done(todos => {
            $('#todos').empty()
            
            todos.todos.forEach(el => {
                let statusTodo = ''
                if (el.status == false) {
                    statusTodo = 'Undone'
                } else {
                    statusTodo = 'Done'
                }
                $('#todos').append(`
                    <tr>
                        <td scope="col">${el.title}</td>
                        <td scope="col">${el.description}</td>
                        <td scope="col">${statusTodo}</td>
                        <td scope="col">${el.due_date}</td>
                    <tr>
                `)
            });
        })
        .fail(err => {
            console.log(err);
        })
}

// ADD TODO
$('#add-todo').submit(function(e){
    e.preventDefault()

    let token = localStorage.token

    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'POST',
        headers: {
            token: token
        }
    })
        
})

// EDIT TODO

// DELETE TODO

// HOLIDAY
function showHoliday(){
    let token = localStorage.token
    
    $.ajax({
        url: 'http://localhost:3000/todos/holiday/ID/2020',
        method: 'GET',
        headers: {
            token: token
        }
    })
    .done(holiday => {
        $('#holiday').empty()
        
        holiday.forEach(el => {
            let date = new Date(el.date.iso).toDateString()
            $('#holiday').append(`
                <tr>
                    <td>${date}</td>
                    <td>${el.name}</td>
                </tr>
            `)
        });
    })
    .catch(err => {
        console.log(err);
    })
}