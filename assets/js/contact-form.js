(function($, window, document, undefined) {
    'use strict';
    var form = $('#contact-form');
    form.submit(function(event) {
        event.preventDefault();

        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        var formData = {
            name: $('input[name="name"]').val(),
            email: $('input[name="email"]').val(),
            mobile: $('input[name="mobile"]').val(),
            product: $('input[name="product"]').val(),
            message: $('textarea[name="message"]').val()
        };

        $.ajax({
            type: 'POST',
            url: 'process.php',
            data: formData,
            dataType: 'json',
            encode: true
        })
        .done(function(data) {
            if (!data.success) {
                if (data.errors.name) {
                    $('input[name="name"]').addClass('has-error');
                    $('input[name="name"]').after('<span class="help-block">' + data.errors.name + '</span>');
                }
                if (data.errors.email) {
                    $('input[name="email"]').addClass('has-error');
                    $('input[name="email"]').after('<span class="help-block">' + data.errors.email + '</span>');
                }
                if (data.errors.message) {
                    $('textarea[name="message"]').addClass('has-error');
                    $('textarea[name="message"]').after('<span class="help-block">' + data.errors.message + '</span>');
                }
            } else {
                form.html('<div class="alert alert-success">' + data.message + '</div>');
            }
        })
        .fail(function(data) {
            console.log(data);
        });
    });
})(jQuery, window, document);
