// 鼠标经过时，选项卡触发
$(function(){
    $(".nav-pills li").hover(
        function(){
            $(this).find(".dropdown-menu").show();   
        },
        function(){
            $(this).find(".dropdown-menu").hide(); 
        }


    )   
})