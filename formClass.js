$(document).ready(function() {

    //alert('ok');

    $(document).on("submit", ".ajaxform", function(event) { //~ alert('inside function');
        //~ return false;

        var posturl = $(this).attr('action');

        var callbackFunction = $(this).attr('data-callback_function');
        if (callbackFunction) {
            if (callbackForm(callbackFunction) == false) {

                return false;

            }

        }

        var btn_txt;

        var formid = $(this).attr('id');

        if (formid)

            var formid = '#' + formid;

        else

            var formid = ".ajaxform";

        $(this).ajaxSubmit({

            url: posturl,

            dataType: 'json',

            beforeSend: function() {

                $(".submit").attr("disabled", 'disabled');

                $('.formmessage').remove();

                $(formid).find('.box-error').attr("placeholder", "")
                $(formid).find('.help-block').html("");

                $(formid).find('.box-error').removeClass('box-error');
                $(formid).find('.is-invalid').removeClass('is-invalid');

                $(formid).find('.alert').removeClass('alert-info').removeClass('alert-success').removeClass('alert-danger').fadeIn(200);
                $(formid).find('.alert').addClass('alert-info');

                $(formid).find('.alert').show();

                $(formid).find('.ajax_message').html('<strong>Please Wait ! <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></strong>');
            },

            success: function(response) {

                //alert('success');

                $(".submit").removeAttr("disabled", 'disabled');

                $(formid).find('.alert').removeClass('alert-info').removeClass('alert-success').removeClass('alert-danger').fadeOut(200);
                $(formid).find('.form-group').removeClass('has-error');
                $(formid).find('.display-error').removeClass('box-error');


                $(formid).find('.alert').removeClass('alert-info').removeClass('alert-success').removeClass('alert-danger').fadeOut(200);
                if (response.status == "success") {

                    //alert("ok");

                    $(formid).find('.alert').fadeIn();

                    $(formid).find('.alert').addClass('alert-success').children('.ajax_message').html(response.success_msg);
                    $(formid).find('.alert').fadeOut(8000);

                } else {

                    $(formid).find('.alert').fadeIn();

                    $(formid).find('.alert').addClass('alert-danger').children('.ajax_message').html('<h5><strong>' + response.error_msg + '</strong></h5>');
                    $.each(response.errorArray, function(key, value) { //~ if (!/\brequired\b/.test(value)){
                        //~ }

                        var field_array = key.split('.');

                        if (field_array.length >= 1) {

                            var keyNew = '';

                            $.each(field_array, function(key2, value2) {

                                if (key2 == 0)

                                    keyNew += value2;

                                if (key2 == 1) {

                                    keyNew += '[';

                                    keyNew += value2;

                                    keyNew += ']';

                                }

                                if (key2 == 2) {

                                    keyNew += '[';

                                    keyNew += value2;

                                    keyNew += ']';

                                }

                            });

                            key = keyNew;

                        } else {

                            $(formid).find('.ajax_message').append(value + '<br>');

                        }

                        console.log(key + " => " + value);

                        var placeH = value;

                      //  $(formid).find('input[name="' + key + '"], select[name="' + key + '"],textarea[name="' + key + '"]').attr("placeholder", placeH);

                        $(formid).find('input[name="' + key + '"], select[name="' + key + '"],textarea[name="' + key + '"]').addClass('is-invalid');
                        $(formid).find('input[name="' + key + '"], select[name="' + key + '"],textarea[name="' + key + '"]').next().html(placeH);
                        //~ if ( $(this).is('select') )

                        //~ $(formid).find('.selectOption').addClass('state-error');

                    });

                }

                if (response.resetform) {

                    $(formid).resetForm();

                }

                if (response.loginstatus == 'success') {

                    window.location.href = response.url;

                }

                if (response.slideToTop) {

                    $('html, body').animate({

                        scrollTop: $(formid).offset().top - 290

                    }, 800);

                }

                if (response.url) {

                    window.location.href = response.url;

                }

                if (response.selfReload) {

                    window.location.reload();

                }

                if (response.closeModal) {

                    $(response.closeModal).modal('toggle');

                }

                if (response.closeModalAll) {

                    $('.close').click();

                }

                if (response.redirect == 'yes') {

                    window.location.href = response.redirectUrl;

                }

                if (response.load_refresh) {

                    //~ alert('load_refresh');

                    //~ alert('.'+response.main_div);

                    //~ alert('.'+response.sub_div);

                    $('.' + response.main_class).load(response.refreshUrl + ' .' + response.sub_class);

                }

                if (response.updateList) {

                    $('#' + response.updateList).html(response.listData);

                }

                if (response.edited) {

                    $('input[name="id"]').val('');

                    $('#img_preview').html('');

                    $('#audio_preview').html('');

                }

                if (response.video == "yes") {

                    $("#thisdiv2").load(" #thisdiv2 > *");

                }

                if (response.hideModel) {

                    setTimeout(function() {

                        $('.modal').modal('hide');

                    }, 3000);

                }

                if (response.ajaxPageCallBack) {

                    response.formid = formid;

                    ajaxPageCallBack(response);

                }

            },

            error: function(response) {

                //console.log(response);

                var error_msg = response.responseJSON.message;

                if (error_msg && error_msg != '' && error_msg != undefined) {
                    $(formid).find('.alert').fadeIn();

                    $(formid).find('.alert').addClass('alert-danger').children('.ajax_message').html('<h5><strong>' + error_msg + '</strong></h5>');
                }

                //alert('server error');

            }

        });

        return false;

    });

    $(document).on("click", ".alert .close", function(event) {
        $(this).closest(".ajax_report").hide();
        $(this).closest(".alert").hide();
    });

});

function slideToElement(element, position) {

    var target = $(element);

    $('html, body').animate({

        scrollTop: target.offset().top - 100

    }, 500);

}

function slideToDiv(element) {

    $("html, body").animate({

        scrollTop: $(element).offset().top - 50

    }, 1000);

}

function slideToTop() {

    $("html, body").animate({

        scrollTop: 50

    }, 1000);

}

function isset(variable) {

    if (typeof(variable) != "undefined" && variable !== null) {
        return true;
    } else {

        return false;

    }

}

function hide_alert_message() {

    setTimeout(function() {

        $('.alert.alert-dismissable').fadeOut(1000);

    }, 3000);

}
