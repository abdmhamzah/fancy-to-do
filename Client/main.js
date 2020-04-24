$(document).ready(function(){

    // SHOW NAVBAR 
    if (!localStorage.getItem('token') || localStorage.getItem('token') == null) {
        $('#nav-signin').show()
        $('#nav-signup').show()
        $('#nav-todos').hide()
        $('#nav-holiday').hide()
        $('#nav-signout').hide()
        $('#field-signup').hide()
        $('#field-signin').show()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-holiday').hide()
    } else {
        $('#nav-signin').hide()
        $('#nav-signup').hide()
        $('#nav-todos').show()
        $('#nav-holiday').show()
        $('#nav-signout').show()
        $('#field-signup').hide()
        $('#field-signin').hide()
        showTodos()
        $('#field-todos').show()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-holiday').hide()
    }

    // SHOW SIGNUP
    $('#nav-signup').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-signup').show()
        $('#field-signin').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-holiday').hide()
    })

    // SHOW SIGNIN
    $('#nav-signin').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-signin').show()
        $('#field-signup').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-holiday').hide()
    })

    // SHOW TODOS
    $('#nav-todos').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-holiday').hide()
        showTodos()
        $('#field-todos').show()
    })

    // SHOW HOLIDAY
    $('#nav-holiday').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
        showHoliday()
        $('#field-holiday').show()
    })

    // SHOW ADD TODO
    $('#todos-add-todo').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-addTodo').show()
        $('#field-editTodo').hide()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-holiday').hide()
    })

    // SHOW EDIT TODO
    $('#todos-edit-todo').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-addTodo').hide()
        $('#field-editTodo').show()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-holiday').hide()
    })

    // LOGOUT
    $('#nav-signout').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-addTodo').hide()
        $('#field-editTodo').hide()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-holiday').hide()
        signOut()
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
            $('#success').empty()
            $('#error').empty()
            $('#signup_email').val('')
            $('#signup_username').val('')
            $('#signup_password').val('')

            $('#field-signup').hide()
            $('#field-signin').show()

            $('#success').append(`<div class="alert alert-success" role="alert"> Selamat! Anda telah terdaftar </div>`)
        })
        .fail(err => {
            $('#error').empty()
            $('#error').append(`<div class="alert alert-danger" role="alert"> Data yang anda isi salah </div>`)
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
            $('#success').empty()
            $('#error').empty()

            $('#nav-signin').hide()
            $('#nav-signup').hide()
            $('#nav-todos').show()
            $('#nav-holiday').show()
            $('#nav-signout').show()
            $('#field-signup').hide()
            $('#field-signin').hide()
            showTodos()
            $('#field-todos').show()
            $('#field-addTodo').hide()
            $('#field-editTodo').hide()
            $('#field-holiday').hide()

            localStorage.setItem('token', signin.token)

            $('#success').append(`<div class="alert alert-success" role="alert"> Anda berhasil Sign In</div>`)
        })
        .fail(err => {
            $('#error').empty()
            $('#error').append(`<div class="alert alert-danger" role="alert"> Username / Password anda salah </div>`)
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
                        <td scope="col">
                            <a onclick="updateTodo(${el.id})" "><button class="btn btn-info" type="submit">Edit</button></a>
                            <a onclick="deleteTodo(${el.id})" "><button class="btn btn-light" type="submit">Delete</button></a>
                        </td>
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

    let token = localStorage.getItem('token')
    let data = {
        title: $('#add-title').val(),
        description: $('#add-description').val(),
        status: $('#add-status').val(),
        due_date: $('#add-due_date').val()
    }

    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'POST',
        data: data,
        headers: {
            token: token
        },
    })
        .done(newTodo => {
            console.log(newTodo);
            $('#success').empty()
            $('#error').empty()
            $('#add-title').val(''),
            $('#add-description').val(''),
            $('#add-status').val(''),
            $('#add-due_date').val('')

            showTodos()
            $('#field-addTodo').hide()
            $('#field-todos').show()

            $('#success').append(`<div class="alert alert-success" role="alert"> Todo ${newTodo.todo.title} berhasil ditambahkan </div>`)
        })
        .fail(err => {
            $('#error').empty()
            $('#error').append(`<div class="alert alert-danger" role="alert"> Data yang Anda isi Salah </div>`)
        })
})
    
// EDIT TODO
$('#edit-todo').submit(function(e){
    e.preventDefault()

    let token = localStorage.token
    let data = {
        title: $('#edit-title').val(),
        description: $('#edit-description').val(),
        status: $('#edit-status').val(),
        due_date: $('#edit-due_date').val()
    }

    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'PUT',
        data: data,
        headers: {
            token: token
        },
    })
        .done(editedTodo => {
            $('#success').empty()
            $('#error').empty()
            $('#edit-title').val(''),
            $('#edit-description').val(''),
            $('#edit-status').val(''),
            $('#edit-due_date').val('')

            showTodos()
            $('#field-addTodo').hide()
            $('#field-todos').show()

            $('#success').append(`<div class="alert alert-success" role="alert"> Todo ${editedTodo.todo.title} berhasil dirubah </div>`)
        })
        .fail(err => {
            $('#error').empty()
            $('#error').append(`<div class="alert alert-danger" role="alert"> Data yang Anda isi Salah </div>`)
        })
})

// FORM EDIT TODO
function updateTodo(id){
    $('#field-addTodo').hide()
    $('#field-editTodo').show()
    $('#field-todos').hide()
    $('#field-signup').hide()
    $('#field-signin').hide()
    $('#field-holiday').hide()

    $ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'GET',
        headers: {
            token: token
        },
    })
        .done(todo => {
            $('edit-title').append(`<input type="text" class="form-control" value="${todo.title}" placeholder="${todo.title}" name="title">`)
            $('edit-description').append(`<textarea class="form-control" rows="4" value="${todo.description}" placeholder="${todo.description}" name="description"></textarea>`)
            if (todo.status) {
                $('edit-status').append(`<select class="form-control"  name="status">
                                            <option value="false" selected>Undone</option>
                                            <option value="true">Done</option>
                                        </select>`)
            } else {
                $('edit-status').append(`<select class="form-control"  name="status">
                                            <option value="false" selected>Undone</option>
                                            <option value="true">Done</option>
                                        </select>`)
            }
            $('edit-due_date').append(`<input type="date" class="form-control" value="${todo.due_date}" placeholder="${todo.due_date}" name="due_date">`)
        })
        .fail(err => {
            $('#error').empty()
            $('#error').append(`<div class="alert alert-danger" role="alert"> Gagal mendapatkan Todo dari Server </div>`)
        })
}


// DELETE TODO
function deleteTodo(id){

    let token = localStorage.token

    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'DELETE',
        headers: {
            token: token
        }
    })
        .done(deleteTodo => {
            $('#success').empty()
            $('#error').empty()

            showTodos() 
            $('#field-addTodo').hide()
            $('#field-todos').show()

            $('#success').append(`<div class="alert alert-success" role="alert"> Todo berhasil dihapus </div>`)
        })
        .fail(err => {
            $('#error').empty()
            $('#error').append(`<div class="alert alert-danger" role="alert"> Gagal menghapus Todo </div>`)
        })
}


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


// SIGNIN GOOGLE
function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/user/signin-google',
        method: 'POST',
        data: {
            token: id_token
        },
        statusCode: {
            200: function(response) {

                $('#success').empty()
                $('#error').empty()

                $('#nav-signin').hide()
                $('#nav-signup').hide()
                $('#nav-todos').show()
                $('#nav-holiday').show()
                $('#nav-signout').show()
                $('#field-signup').hide()
                $('#field-signin').hide()
                showTodos()
                $('#field-todos').show()
                $('#field-addTodo').hide()
                $('#field-editTodo').hide()
                $('#field-holiday').hide()

                // console.log('>> response Signin Google', response.token);
                localStorage.setItem('token', response.token)

                $('#success').append(`<div class="alert alert-success" role="alert"> Anda berhasil Sign In</div>`)
            }
        }
    })
}


// SIGN OUT 
function signOut() {
    
    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2) {
        auth2.signOut().then(function() {
            console.log('User signed out.');
        });
    }

    $('#success').empty()

    localStorage.removeItem('token')
    localStorage.clear()
    $('#nav-signin').show()
    $('#nav-signup').show()
    $('#nav-todos').hide()
    $('#nav-holiday').hide()
    $('#nav-signout').hide()
    $('#field-signin').show()
    $('#field-todos').hide()
    $('#field-addTodo').hide()
    $('#field-editTodo').hide()
    $('#field-holiday').hide()

    $('#success').append(`<div class="alert alert-success" role="alert"> Anda berhasil Sign Out</div>`)
}