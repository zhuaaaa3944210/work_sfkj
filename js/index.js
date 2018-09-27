
// 动画鼠标经过触发   通过添加类名
// $(selector).hover(inFunction,outFunction)
$(function(){
    $(".banner-list ul li").hover(
        function(){
        $(this).css({"border":"2px solid #000"});
        $(this).find(".banner-list-text").css({"font-size":"26px","color":"#000","text-decoration":"none"})
    },
    function(){
        $(this).css({"border":"2px solid #fff"});
        $(this).find(".banner-list-text").css({"font-size":"24px","color":"#FFF"})
       
    })
})