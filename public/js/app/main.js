"use strict";
(function () {
    var redirect = "home";

    $(document).on('change_page', onChangePage);

    $(document).on('open_popup', onOpenPopup);
    $(document).on('close_popup', onClosePopup);

    $(document).on('load_header', onHeaderLoad);
    $(document).on('unload_header', onHeaderUnload);

    $(document).on('load_footer', onFooterLoad);
    $(document).on('unload_footer', onFooterUnload);

    $.ajaxSetup({
        cache: true
    });


    function onChangePage(e) {
        $.event.trigger({
            type: 'on_page_unload'
        });

        $('#page_view').load('html/pages/' + e.url + '.html', function () {
            $(function () {
                $('.lazy').Lazy();
            });
            $.getScript('js/app/pages/' + e.url + '.js', function (d, s, x) {
                if (s == 'success') {
                    $.event.trigger({
                        type: 'on_page_load',
                        message: {}
                    });
                }
            })
        });
    }


    function onOpenPopup(e) {
        $('#popup_view').load('html/popups/' + e.url + '.html', function () {
            $.getScript('js/app/popups/' + e.url + '.js', function (d, s, x) {
                if (s == 'success') {
                    $('#popup_view').removeClass('hide');
                    $.event.trigger({
                        type: 'on_popup_load',
                        message: e.message,
                        onclose: e.onclose
                    });
                }
            })
        });
    }

    function onClosePopup(e) {
        $('#popup_view').empty();
        $('#popup_view').addClass('hide');
    }


    function onHeaderLoad(e) {
        $.event.trigger({
            type: 'on_header_unload',
            message: {}
        });
        $('#header_container').load('html/templates/header.html', function () {
            $.getScript('js/app/templates/header.js', function (d, s, x) {
                if (s == 'success') {
                    $.event.trigger({
                        type: 'on_header_load',
                        message: {}
                    });
                }
            })
        });
    }

    function onHeaderUnload(e) {
        $('#header_container').empty();
    }




    function onFooterLoad(e) {
        $('#footer_container').load('html/templates/footer.html', function () {
            $.getScript('js/app/templates/footer.js', function (d, s, x) {
                if (s == 'success') {
                    $.event.trigger({
                        type: 'on_footer_load',
                        message: {}
                    });
                }
            })
        });
    }

    function onFooterUnload(e) {
        $('#footer_container').empty();
    }

    //Home redirect
    $.event.trigger({
        type: 'change_page',
        url: redirect
    });

    //Header load
    $.event.trigger({
        type: 'load_header'
    });

    //Footer load
    $.event.trigger({
        type: 'load_footer'
    });
}())