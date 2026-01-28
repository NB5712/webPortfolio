$(function(){
    //menu_wrap
    $('.menu_icon').click(function(){
        $('.menu_wrap').css('top',0);
    });













    $('#gnb > ul > li').click(function(){
        //클릭한 하위의 submenu가 숨김면 if 실행문 실행
        if( $(this).children('ul').css('display') == 'none' ){
            $('.submenu').slideUp();
        }
        $(this).children('ul').slideDown();
    });











});