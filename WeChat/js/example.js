$(function () {
    var currCar;
    $(document.body).on('click',function(e){
        var el = $(e.target);

        if(el.hasClass('weui_panel_ft')){
            var html = $(".weui_panel_bd").html();
            $(".weui_panel_bd").append(html);
        }

        if(el.hasClass('showTooltips')){
            var weui_input = $('.weui_input').val();
            if(weui_input == ''){
                $('.js_tooltips').show();
                setTimeout(function (){
                    $('.js_tooltips').hide();
                }, 1000);
            } else {
                $('#dialog').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog').off('click').hide();
                });
            }
        }

        if(el.hasClass('weui_cell') || el.hasClass('chepaihao')){
            currCar = el.hasClass('weui_cell') ? el : el.parents('a');
            var mask = $('#mask');
            var weuiActionsheet = $('#weui_actionsheet');
            weuiActionsheet.addClass('weui_actionsheet_toggle');
            mask.show()
                .focus()
                .addClass('weui_fade_toggle').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            // 取消
            $('#actionsheet_cancel').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            // 删除
            $('#deleteCar').one('click', function () {
                console.log(currCar.length);
                currCar.remove();
                hideActionSheet(weuiActionsheet, mask);
            });
            // 设为默认
            $('#setDefault').one('click', function () {
                $('.icon_sp_area').remove();
                currCar.append('<div class="icon_sp_area"><i class="weui_icon_success"></i></div>');
                hideActionSheet(weuiActionsheet, mask);
            });
            mask.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet(weuiActionsheet, mask) {
                weuiActionsheet.removeClass('weui_actionsheet_toggle');
                mask.removeClass('weui_fade_toggle');
                mask.on('transitionend', function () {
                    mask.hide();
                }).on('webkitTransitionEnd', function () {
                    mask.hide();
                });
            }
        }

        if(el.hasClass('no_parking_record') || el.parents('div').hasClass('no_parking_record')){
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                $('#dialog2').off('click').hide();
            });
        }

    });

});
