
(function () {
    var sourceData = {};
    $(document).on('page_onload', onLoad);
    //   $(document).on('component_onload', onLoad);
    function onLoad() {

        $(document).off('page_onload', onLoad);
        
        // $(document).off('component_onload', onLoad);
        $('#btn_login').on('click', authenticate);
        //  $('#btn_login').click(changePage);
        //$('.header').css('display','none');
        //$('.footer').css('display','none');
        //main();
        //  $('#forget_pass').on('click',forgetpass);
    }

    

    function changePage(e) {
        console.log(e);
        $.event.trigger({
            type: 'change_page',
            location: 'dashboard',
            message: 'dashboards'
        })
    }
        // function forgetpass(){
        //     $.event.trigger({
        //         type: 'open_component',
        //         location: 'forgetpass',
                
        //     });
        // }
    function authenticate() {
        var username = $('#user_name').val();
        var password = $('#pass_word').val();
        userData = { 'username': username, 'password': password },
         $.ajax({
                url: '/authenticate',
                type: 'POST',
                data: userData,
                // contentType: "application/json",
                success: function (data) {
                    console.log(data);
                 if (data.status == 200) {
                    sourceData.username = data.data.username;
                        $('#profile_name').html(username);
                        $.event.trigger({
                            type: 'change_page',
                            location: 'dashboard',
                            message: sourceData
                         })
                        $('.header').css('display',' block');
                        $('.footer').css('display','block');
                    }
                    if (data.status == 404) {
                        $('#user_name').val("");
                        $('#pass_word').val("");
                        $('#invaild_user').html(data.message);
                        $('#invaild_user').addClass('invalid-user');
                    }
                }
            });
    }
    $('#btn_login').onkeypress = function(e){
        console.log('hi')
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      authenticate();
      return false;
    }
  }
}());