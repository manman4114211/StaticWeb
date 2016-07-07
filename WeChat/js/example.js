$(function () {
    var showTooltipsNum = 0;
    $(document.body).on('click',function(e){
        var el = $(e.target);

        if(el.hasClass('weui_panel_ft')){
            var html = $(".weui_panel_bd").html();
            el.before(html);
        }

        if(el.hasClass('showTooltips')){
            if(showTooltipsNum == 0){
                $('.js_tooltips').show();
                setTimeout(function (){
                    $('.js_tooltips').hide();
                }, 2000);
            } else {
                $('#dialog').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog').off('click').hide();
                });
            }
            showTooltipsNum++;
        }

    });
 
});
