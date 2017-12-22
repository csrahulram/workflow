(function () {
    var sourceData;
    var project = [
        {
            "name": "idmpREADY",
            "Assign": "xxxxx",
            "duration":"12months",
            
        },
        {
            "name": "PharmaREADY",
            "Assign": "xxxxx",
            "duration":"12months",
            
        },
        {
            "name": "rmREADY",
            "Assign": "xxxxx",
            "duration":"12months",
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
        project.forEach(function (s, ind) {
            // console.log(s.name)
            var html = '<div class="item-wrapper btn">'
            html +='<div >'
            html +='<label>Name</label>'
            html += '<div class="name" index="' + ind + '" >' + s.name + ' </div>'
             html +='<label>Project Duration</label>'
            html += '<div class="name" index="' + ind + '" >' + s.duration + ' </div>'
            html +='<label>Project Manager</label>'
           html += '<div class="name" index="' + ind + '" >' + s.Assign + ' </div>'
           html +='</div>'
            html += ' <div class="delete-btn btn icon" id="delete_btn" index="' + ind + '" onclick="$.event.trigger({type:\'delete\',message:this})"></div>'
            html += '<div class="edit-btn btn icon" id="edit_btn" index="' + ind + '"  onclick="$.event.trigger({type:\'edit\',message:this})"></div>'
            html += '</div>'
            $('#user_content').append(html);

        })
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
        src.Assign = $('#modal_addrole').val();
        src.duration = $('#modal_duration').val();
        console.log(src);
        project.push(src);
         render();
        closeModal();

    }
    function onDelete(e) {
        // console.log('hi')
        ind = e.message.getAttribute('index');
        var removeitem = project.splice(ind, 1);
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
        console.log((project[ind].Role))
        $('#lightbox').removeClass('hide');
        $('#update_modal').removeClass('hide');
        $('#update_modal').show();
        $('#modal_update').val(project[ind].name);
         $('#modal_role').val(project[ind].Assign);
          $('#modal_duration').val(project[ind].duration);

}
  function onUpdate() {
    project[ind].name = $('#modal_update').val();
      project[ind].Assign = $('#modal_role').val();
      project[ind].duration =  $('#modal_duration').val();
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