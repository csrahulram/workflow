"use strict";

//Page empty sample and template.
(function () {
    var sourceData;

    $(document).on('on_page_load', onLoad);
    $(document).on('on_page_unload', onUnload);

    function onLoad(e) {
        $(document).off('on_page_load', onLoad);
        sourceData = e.message;


        $('#open_popup').on('click', onOpenPopup);

        main();
    }

    function main() {
        $('h1').html('This text can be changed')
    }

    function onOpenPopup(){
        $.event.trigger({
            type:'open_popup',
            url:'info',
            message:{'info':'This is info message vivek'},
            onclose:onPopupClose
        })
    }

    function onPopupClose(data){
        console.log(data);
    }

    function onUnload(e) {
        //Remove listeners of buttons, events and auto calling scripts
    }
}());