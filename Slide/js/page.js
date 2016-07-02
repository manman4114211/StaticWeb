$('.player-btn').click(function(){
    $(this).toggleClass('player-btn-stop');
    var audio = document.getElementById('music');
    if(audio!==null){
        if(!audio.paused){
            audio.pause();//暂停
        }else{
            audio.play();//播放
        }
    }
})