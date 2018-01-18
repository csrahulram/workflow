"use strict";

//Page empty sample and template.
(function () {
    var sourceData;

    $(document).on('on_header_load', onLoad);

    function onLoad(e) {
        $(document).off('on_header_load', onLoad);
        sourceData = e.message;
        main();
    }

    function main() {
        //Page specific code
        console.log('Header loaded');
    }
    
}());