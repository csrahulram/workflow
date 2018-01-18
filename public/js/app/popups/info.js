"use strict";

//Page empty sample and template.
(function () {
    var sourceData;
    var onClose;
    $(document).on('on_popup_load', onLoad);
    $(document).on('on_page_unload', onUnload);

    function onLoad(e) {
        $(document).off('on_popup_load', onLoad);
        sourceData = e.message;
        if(e.onclose){
            onClose = e.onclose;
        }   
        $('#popup_close').on('click', onClosePopup);

        main();
    }

    function main() {
        $('h1').html(sourceData.info);
    }

    function onClosePopup(){
        $.event.trigger({
            type:'close_popup',
            url:'info'
        });
        onClose('Message from popup');
    }

    function onPopupClose(data){
        console.log(data);
    }

    function onUnload(e) {
        //Remove listeners of buttons, events and auto calling scripts
    }
}());