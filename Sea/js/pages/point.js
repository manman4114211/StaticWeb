define(function(require, exports, module){
    require('zepto');
    var layer = require('layer');
    
    /**禁止右键点击*/
    $(document).bind("contextmenu",function(e){
        return false;
    });

    $(document.body).on('click',function(e){
        var el = $(e.target);

        if(el.hasClass('btn-default')){
        	remind(el.html());
        }

    });
    
    window.setTimeout(function() {
        var cloned = $('div').clone();
        console.log(cloned);
    }, 1000);
    
    var remind  = function(msg){
    	layer.open({
    	    content: msg,
    	    shade: false,
    	    style: 'border: none; background-color: rgba(0,0,0,0.5); color: #fff;',
    	    time: 1.0,
    	    anim: true,
    	    fixed: false,
    	    top: 100
    	});
    };
});
