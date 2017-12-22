(function () {
    var sourceData;
    var roles = [
        {
            "name": "ST",
            "Assign": "Ram",
            "duration":"12months",
            
        },
        {
            "name": "SD",
            "Assign": "Naresh",
            "duration":"12months",
            
        },
        {
            "name": "SSE",
            "Assign": "Naveen",
            "duration":"2months",
        },
        
    ]


    $(document).on('page_onload', onLoad);

    function onLoad(e) {
        $(document).off('page_onload', onLoad);

        main();
        $('#add_btn').on('click', onAddbtn);
        $('#add_user').click(adduser);
          $('#update_user').click(onUpdate);
          $('#back_to_dashboard').click(dashboard);
        $(document).on('delete', onDelete)
        $(document).on('edit', onedit)
    }
    function main() {
        render();
    }
    function render() {
        $('#user_content').empty();
        // console.log('hi')
        roles.forEach(function (s, ind) {
            // console.log(s.name)
            var html = '<div class="item-wrapper btn">'
            html +='<div >'
            html +='<label>Role name</label>'
            html += '<div class="name" index="' + ind + '" >' + s.name + ' </div>'
             html +='<label>Project Duration</label>'
            html += '<div class="name" index="' + ind + '" >' + s.duration + ' </div>'
            html +='<label>Assignee name</label>'
           html += '<div class="name" index="' + ind + '" >' + s.Assign + ' </div>'
           html +='</div>'
            html += ' <div class="delete-btn btn icon" id="delete_btn" index="' + ind + '" onclick="$.event.trigger({type:\'delete\',message:this})"></div>'
            html += '<div class="edit-btn btn icon" id="edit_btn" index="' + ind + '"  onclick="$.event.trigger({type:\'edit\',message:this})"></div>'
            html += '</div>'
            $('#user_content').append(html);

        })
        console.log($('#count').val(roles.length))
      ; 
    }
  
                

    function onAddbtn() {
        // console.log('hi')
        $('#lightbox').removeClass('hide');
        $('#add_modal').removeClass('hide');
        $('#add_modal').show();
    }
    function adduser() {
        var src = {}
        src.name = $('#modal_text').val();
        src.duration = $('#modal_duration').val();
        src.Assign = $('#modal_addrole').val();
    //     $('#modal_duration').val('');
    //     $('#modal_text').val('');
    //    $('#modal_addrole').val('');
    //     console.log(src);
        roles.push(src);
         render();
        closeModal();

    }
    function onDelete(e) {
        // console.log('hi')
        ind = e.message.getAttribute('index');
        var removeitem = roles.splice(ind, 1);
        console.log(removeitem);
        render();
    }
    function closeModal() {
        // console.log('come')
        $('#lightbox').addClass('hide');
        $('#add_modal').addClass('hide');
          $('#update_modal').addClass('hide');

    }
    function onedit(e) {
//    console.log(user);
        ind = e.message.getAttribute('index');
        console.log((roles[ind].duration))
        $('#lightbox').removeClass('hide');
        $('#update_modal').removeClass('hide');
        $('#update_modal').show();
        $('#modal_update').val(roles[ind].name);
        $('#modal_due').val(roles[ind].duration);
        $('#modal_role').val(roles[ind].Assign);
        
}
  function onUpdate() {
    roles[ind].name = $('#modal_update').val();
      roles[ind].duration = $('#modal_due').val();
       roles[ind].Assign = $('#modal_role').val();
    // console.log(user[ind]);
    render();
    closeModal();
} 
function dashboard(){
    $.event.trigger({
            type: 'change_page',
            location: 'dashboard',
            message: 'dashboard'
        })
}

}());