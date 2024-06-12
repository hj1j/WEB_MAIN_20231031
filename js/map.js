var mapContainer= document.getElementById('map'), // 지도를표시할div 
    mapOption= {
        center: newkakao.maps.LatLng(37, 131), // 지도의중심좌표
        level: 3 // 지도의확대레벨
        };
var map= newkakao.maps.Map(mapContainer, mapOption); // 지도를생성
// 일반지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도 타입 컨트롤을 생성
var mapTypeControl= newkakao.maps.MapTypeControl();
// 지도에 컨트롤을 추가해야 지도위에표시
// kakao.maps.ControlPosition은컨트롤이표시위치TOPRIGHT는오른쪽위를의미
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
// 지도 확대축소를 제어할 수 있는 줌 컨트롤을 생성
var zoomControl= newkakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);