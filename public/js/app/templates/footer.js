"use strict";

//Page empty sample and template.
(function () {
    var sourceData;

    $(document).on('on_footer_load', onLoad);

    function onLoad(e) {
        $(document).off('on_footer_load', onLoad);
        sourceData = e.message;
        main();
    }

    function main() {
        //Page specific code
        console.log('Footer loaded');
    }
    
}());