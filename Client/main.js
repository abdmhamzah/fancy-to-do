$(document).ready(function(){

    $('#nav-signup').click(function(e){
        e.preventDefault()
        $('#field-signup').toggle()
        $('#field-signin').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
    })

    $('#nav-signin').click(function(e){
        e.preventDefault()
        $('#field-signin').toggle()
        $('#field-signup').hide()
        $('#field-todos').hide()
        $('#field-addTodo').hide()
    })

    $('#nav-todos').click(function(e){
        e.preventDefault()
        $('#field-todos').toggle()
        $('#field-signup').hide()
        $('#field-signin').hide()
        $('#field-addTodo').hide()
    })

    $('#todos-add-todo').click(function(e){
        e.preventDefault()
        $('#field-addTodo').toggle()
        $('#field-todos').hide()
        $('#field-signup').hide()
        $('#field-signin').hide()
    })

    // SIGNUP

    // SIGNIN

    // GET TODOS

    // ADD TODO
    
});