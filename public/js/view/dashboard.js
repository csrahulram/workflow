(function () {
    var value;
    var sourceData = {};
    var activitylist = [
        {
            "name": "Project",
            "info": "Click this button to view/edit projects",
            "count": 3,
            "route": "edit_list"
        },
        {
            "name": "roles",
            "info": "Click this button to view/edit roles",
            "count": 3,
            "route": "edit_list"
        },
        {
            "name": "user",
            "info": "Click this button to view/edit users",
            "count": 3,
            "route": "edit_list"
        }
    ]

    $(document).on('page_onload', onLoad);
    
    function onLoad(e) {
        sourceData = e.message;
        
        console.log(e.message);
        $(document).off('page_onload', onLoad);

        $(document).on('card', page);
        main();
        //  $('#btn_login').click(changePage);
    }
    function main() {
        // console.log(sourceData.data);
        // dashboard();
        $('#profile_name').html(sourceData.username);
        render();
         
    }
    function render() {
          $('#container_wrapper').empty();
             activitylist.forEach(function (value, ind) {
        var html='<div class="card" >'
        html +='<div class="name" index="' + ind + '" onclick="$.event.trigger({type:\'card\',message:this})">'+ value.name+'</div>'
        html += '</div>'
            $('#container_wrapper').append(html);
        })

    }
    // function projectPage(e) {
    //     console.log(e);
    //        $('.card').html('project');
    //     $.event.trigger({
    //         type: 'change_page',
    //         location: 'project',
    //         message: 'dashboard'
    //     })
    // }
    function page(e){
        ind = e.message.getAttribute('index');
        console.log(e.message.innerHTML)
       console.log('higfjgf')
            $.event.trigger({
            type: 'change_page',
            location: e.message.innerHTML,
            message: 'dashboard',
    })

    }

    // function rolesPage(e) {
    //     console.log(e);
    //     $.event.trigger({
    //         type: 'change_page',
    //         location: 'roles',
    //         message: 'dashboard'
    //     })
    // }
}());