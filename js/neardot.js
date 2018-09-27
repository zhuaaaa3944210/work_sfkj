
$(".form-group").css({"display":"none"});
$(".menu ul").css({"margin-bottom":"50px"})
function mapMarker(point) {
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
}
map = new BMap.Map("container");
map.setCurrentCity("上海市");
point=new BMap.Point(121.38058,31.21222);
map.centerAndZoom(point, 13);
// map.setCurrentCity("上海市"); 
map.enableScrollWheelZoom(false);
// 禁止拖拽
// map.disableDragging();
// 将第一个区标记在地图上 
mapMarker(point);
jQuery.support.cors = true;
$.ajax({
    // url:"http://47.92.34.144/thinkphp_5.0.16/public/index.php/index/address/areaInfoByCity?area_id=310101&city_name=%E4%B8%8A%E6%B5%B7%E5%B8%82",
    // encodeURI() 函数可把字符串作为 URI 进行编码。
    url: encodeURI("http://47.92.34.144/thinkphp_5.0.16/public/index.php/index/address/areaInfoByCity?city_name=上海市"),
    type: "post",
    // 目前只支持同步
    async: "false",
    cache: true,
    datatype: "json",
    success: function (data) {
        // eval将字符串转为对象数组 这里不能用？
        console.log(data);
        var areaList = data.result;
        // console.log(areaList);
        // ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明县"]

        // $.each(dotObj,function(index,item){
        //     // 循环获取到的数组    网点中包括name,对应的省，市province, city,xxaddr,dotTel,dotImg
        //     $(".list-group").html("洗车店的信息(name:"+name+",province:"+province+",city:"+city+",addr:"+addr+",dotTel:"+dotTel+",dotImg:"+dotImg)
        // })
        $(".list-group li").click(function () {
            //取到li值
            $(".right-city h3").html("上海市");
            // 清空原有数据
            $(".right-city ul").empty();
            // 动态插入标签
            for (var k = 0; k < areaList.length; k++) {
                $(".right-city ul").append("<li><a href='' id=" + k + " onclick='return false'></a></li>")
            }
            // 给生成的标签赋值
            $(".right-city ul li a").each(function (index, element) {
                $(this).html(areaList[index]);
            });
        })
    }
})
$(".menu ul").on("click", "li a", function () {
    $(this).parent().addClass("on").siblings().removeClass("on");
    $(".map-side").empty();
    // jQuery.support.cors = true;
    $.ajax({
        url: encodeURI("http://47.92.34.144/thinkphp_5.0.16/public/index.php/index/address/storeDetailsByAreaId?area_name=" + $(this).html()),
        type: "post",
        async: "false",
        cache: true,
        datatype: "json",
        success: function (data) {
            dotDetailObj = data;
            console.log(typeof data);
            if (dotDetailObj.status == 0) {
                for (var i = 0; i < dotDetailObj.result.store_details.length; i++) {
                    $(".map-side").append("<div class='list-group-item'><img src='store_img/" + dotDetailObj.result.store_details[i].store_image_url + "' alt='' class='list-group-item-img img-responsive pull-left' style='width:96px;height:72px;margin-right:12px'> <h2 class='list-group-item-heading' style='font-size:14px;'>" + dotDetailObj.result.store_details[i].store_name + "</h2><p class='list-group-item-text' style='font-size:12px;'>" + dotDetailObj.result.store_details[i].store_addr + "</p><h4 style='font-size:12px;'>" + dotDetailObj.result.store_details[i].store_phone + "</h4></div>");
                    // 点击搜索按钮的时候我们需要的在地图上给出标注，并在左侧显示信息
                    // 根据经纬度校准地图
                    // 创建map实例 
                    map = new BMap.Map("container");
                    map.setCurrentCity("上海市");
                    point=new BMap.Point(dotDetailObj.result.store_details[0].store_lat_lng.split(",")[1], dotDetailObj.result.store_details[0].store_lat_lng.split(",")[0])
                    map.centerAndZoom(point, 13);
                    // map.setCurrentCity("上海市"); 
                    map.enableScrollWheelZoom(false);
                    // 禁止拖拽
                    // map.disableDragging();
                    // 将第一个区标记在地图上 
                    mapMarker(point);
                }
            } else {
                console.log("暂无");
            }
        }
    })
    // 判断点击的城市与获取的城市相同时

})
// 处理第三级，点击左侧的店铺详情，右边地图出现标记
$(".map-side").on("click", ".list-group-item", function () {
    // 保存索引
    var index = $(this).index();
    // 点击图片的时候出现对应的地图标记
    console.log(dotDetailObj);
    if (dotDetailObj.status == 0) {
        for (var i = 0; i < dotDetailObj.result.store_details.length; i++) {
            // if()
            if (index == i) {
                var point = new BMap.Point(dotDetailObj.result.store_details[index].store_lat_lng.split(",")[1], dotDetailObj.result.store_details[index].store_lat_lng.split(",")[0]);
                // console.log(point);
                map.centerAndZoom(new BMap.Point(point[index], 16));
                // map.disableDragging();
                map.enableScrollWheelZoom(false);
                mapMarker(point);
            }
        }
    }
})
