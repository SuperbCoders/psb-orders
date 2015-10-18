(function() {
    
    var cnt = $('#login-page'),
        win = $(window);

    // Page container normally fits the page height, but doesn't go less the 530px
    win.resize(function(event) {
        var height = win.height();
        cnt.height(height > 530 ? height : 530);
    });

    // Form validation
    $('#login-form').validate({
        messages: {
            name: "Please specify your name",
            login: {
                required: "Для входа введите логин",
                minlength: "Для входа введите логин"
            },
            password: {
                required: "Для входа введите пароль",
                minlength: "Для входа введите пароль"
            }
        }
    });
})();