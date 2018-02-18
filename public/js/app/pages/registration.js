"use strict";

//Page empty sample and template.
(function () {
    var sourceData;

    $(document).on('on_page_load', onLoad);
    $(document).on('on_page_unload', onUnload);

    function onLoad(e) {
        $(document).off('on_page_load', onLoad);
        sourceData = e.message;
        main();
    }

    function main() {
        $('#username').focus();
        //$('#login_form').submit(doLogin);
    }

    function doLogin(e){
        e.preventDefault();
        $.ajax({
            url : '/api/public/auth',
            method:'POST',
            type:'text/json',
            data: {'username':$('#username').val(), 'password':$('#password').val()},
            success: loginHandler,
            error: errorHandler
        })
    }

    function loginHandler(e){
        console.log(e);
    }

    function errorHandler(e){
        console.log(e);
    }

    function onUnload(e) {
        $(document).off('on_page_unload', onUnload);
    }
}());