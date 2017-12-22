


$(document).ready(function () {
    
    var env = 'dev'//'prod';
   var sourceData={};

    if (env == 'dev') {
        sourceData.name = 'admin';
        // sourceData.passWord = 'welcome@123';
    }
    $(document).on('change_page', openPage);
    // $(document).on('component_onload',openComponent)
    // $(document).on('open_component', openComponent);
    if (sourceData.name == 'admin') {
        $.event.trigger({
            type: 'change_page',
            location: 'login',
            message: sourceData,
        });
    }


    function autologin(){
        $.ajax({
            url: '/getUser',
            type: 'GET',
            success: function (data) {
                if(data.status == 200){
                    sourceData.username = data.data.username;
                    $.event.trigger({
                        type: 'change_page',
                        location: 'dashboard',
                        message: sourceData,
                    });
                }
            }
        });
    }

    autologin();

    function openPage(e) {
        $('#view').load('html/view/' + e.location + '.html', function () {
            $.getScript('js/view/' + e.location + '.js', function (data, textStatus, jqxhr) {
                if (textStatus == 'success') {
                    $.event.trigger({
                        type: 'page_onload',
                        location: e.location,
                        message: e.message
                    });
                }
            });
        });
    }

});
