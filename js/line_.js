let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d"); // 2d context를 ctx로 정의
// 1주차 실습
//Make data
let pts = []; //배열 지정

// 벡터2를 이용해서 선분의 시작점과 끝점을 지정
// x값, y값 (2차원이어서 값을 두 개를 지정)
// 각 열에 x값 하나, y값하나를 pair로 저장
// chrome(웹페이지)의 원점은 좌측 상단
pts.push(new THREE.Vector2(0, 10));
pts.push(new THREE.Vector2(10, 10));
pts.push(new THREE.Vector2(0, 30));
pts.push(new THREE.Vector2(0, 200));

//Draw Line
// 선분을 그리기. draw_line이라는 사용자 정의 함수 이용
for (let i = 0; i < pts.length; i += 2) {
    draw_line(pts[i],pts[i+1]);
}

// 선분 그리기 함수를 정의
function draw_line(p0,p1)
{
    ctx.beginPath(); // 그림을 그리겠다 시작
    ctx.moveTo(p0.x, p0.y); // (공중에서) 시작점으로 옮김
    ctx.lineTo(p1.x, p1.y); //종이에 그리며 끝 점으로 옮김
    ctx.stroke(); // 그림 그리기를 종료 + 선분이어서 fill할 필요 없다.
}

//점을 그리기
function draw_point(p)
{
    ctx.fillStyle = "#ff0000"; //점의 색 지정 RGB값 이용.
    ctx.beginPath(); //점을 그리기 시작한다.
    //arc? 원호 
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, true); //점의 위치. 점의 크기
    ctx.fill(); //점을 그리기를 마무리한다.
}

// 두 개의 선분을 자료구조로 받은것은 x
// 점 4개를 기준으로 선분을 받아옴
// 선분과 선분이 만나는 지점을 표시하는 함수 완성하기
function line_line_intersection(p0, p1, p2, p3) {
    // y=ax+b : 직선의 방정식
    // a:기울기 : y증가량 / x증가량
    // y=a0x+b0  y=a1x+b1
    let a0 = (p1.y - p0.y) / (p1.x - p0.x);
    let b0 = p0.y - a0 * p0.x;

    let a1 = (p3.y - p2.y) / (p3.x - p2.x);
    let b1 = p2.y - a1 * p2.x;

    //직선의 교점? a0x+b0=a1x+b1 --> (a0-a1)x = b1 -b0
    let intersectionX = (b1 - b0) / (a0 - a1);
    let intersectionY = a0 * intersectionX + b0;

    if (p0.x > intersectionX || p1.x < intersectionX)
        return;
    if (p2.x > intersectionX || p3.x < intersectionX)
        return;
    if (p0.y > intersectionY || p1.y < intersectionY)
        return;
    if (p2.y > intersectionY || p3.y < intersectionY)
        return;

    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

line_line_intersection(pts[0],pts[1],pts[2],pts[3]);