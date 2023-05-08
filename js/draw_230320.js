let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 0;
let yValue = 0;

//Make data
let linePts = [];
linePts.push(new THREE.Vector2(10, 60));
linePts.push(new THREE.Vector2(300, 700));

linePts.push(new THREE.Vector2(50, 250));
linePts.push(new THREE.Vector2(350, 250));

linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(150, 200));

let boxPts = [];

boxPts.push(new THREE.Vector2(100, 100));
boxPts.push(new THREE.Vector2(300, 300));


function draw_line(p0, p1) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function draw_point(p) {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function draw_box(minPt, maxPt) {
    let p0 = new THREE.Vector2(minPt.x, minPt.y);
    let p1 = new THREE.Vector2(minPt.x, maxPt.y);
    let p2 = new THREE.Vector2(maxPt.x, maxPt.y);
    let p3 = new THREE.Vector2(maxPt.x, minPt.y);
    draw_line(p0, p1);
    draw_line(p1, p2);
    draw_line(p2, p3);
    draw_line(p3, p0);
}

function draw_circle(ctr, radius) {
    ctx.beginPath();
    ctx.arc(ctr.x, ctr.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_image() {
    ctx.strokeStyle = "blue";
    draw_line(linePts[0], linePts[1]);
    ctx.strokeStyle = "red";
    draw_line(linePts[2], linePts[3]);
    ctx.strokeStyle = "green";
    draw_box(boxPts[0], boxPts[1])
    ctx.strokeStyle = "black";
    draw_circle(new THREE.Vector2(xValue, yValue), 110);

    line_line_intersection(linePts[0],linePts[1],linePts[2],linePts[3]);
    line_box_intersection(linePts[0],linePts[1],boxPts[0],boxPts[1]);
    line_box_intersection(linePts[2],linePts[3],boxPts[0],boxPts[1]);
    line_circle_intersection(linePts[0],linePts[1],new THREE.Vector2(xValue, yValue), 110)
    line_circle_intersection(linePts[2],linePts[3],new THREE.Vector2(xValue, yValue), 110)
    box_circle_intersection(boxPts[0],boxPts[1],new THREE.Vector2(xValue, yValue), 110)
}

function line_line_intersection(p0, p1, p2, p3) {
    // y=ax+b : 직선의 방정식
    // a:기울기 : y증가량 / x증가량
    // y=a0x+b0  y=a1x+b1
    let intersectionPt;
    let intersectionX;
    let intersectionY;
    let a0 = (p1.y - p0.y) / (p1.x - p0.x); 
    let b0 = p0.y - a0 * p0.x; 

    let a1 = (p3.y - p2.y) / (p3.x - p2.x);
    let b1 = p2.y - a1 * p2.x;

    // 하나의 선분만이 x = n이라는 식을 가질때, 예외처리 필요
    if(p2.x - p3.x == 0 && p0.x - p1.x != 0){
        intersectionX = p2.x;
        intersectionY = p2.x * a0 + b0; 
    }
    else if(p2.x - p3.x != 0 && p0.x - p1.x == 0){
        intersectionX = p1.x;
        intersectionY = p1.x * a1 + b1;
    }
    else{
    //직선의 교점? a0x+b0=a1x+b1 --> (a0-a1)x = b1 -b0
        intersectionX = (b1 - b0) / (a0 - a1);
        intersectionY = a0 * intersectionX + b0;
    }
    if (p0.x > intersectionX || p1.x < intersectionX)
        return;
    if (p2.x > intersectionX || p3.x < intersectionX)
        return;
    if (p0.y > intersectionY || p1.y < intersectionY)
        return;
    if (p2.y > intersectionY || p3.y < intersectionY)
        return;

    intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

function line_box_intersection(lineP0, lineP1, boxMinPt, boxMaxPt) {
    let dot1 = new THREE.Vector2(boxMinPt.x, boxMaxPt.y);
    let dot2 = new THREE.Vector2(boxMaxPt.x,boxMinPt.y);

    line_line_intersection(lineP0, lineP1, boxMinPt, dot1);
    line_line_intersection(lineP0, lineP1, dot1, boxMaxPt);
    line_line_intersection(lineP0, lineP1,  dot2,boxMaxPt);
    line_line_intersection(lineP0, lineP1, dot2, boxMinPt);
}

function line_circle_intersection(lineP0, lineP1, circleCtr, circleRadius) {
    //Need to write...
    let x1, x2, y1, y2;
    let a = (lineP1.y - lineP0.y) / (lineP1.x - lineP0.x); 
    let b = lineP0.y - a * lineP0.x;

    // x = 3 이런 형태의 직선과 원이 만났을 때
    // 원 방정식에 x 값을 대입하고 y값을 근의 공식으로 구한다.
    if(lineP1.x - lineP0.x == 0){
        x1 = lineP0.x;
        x2 = lineP1.x;
        let C_ = circleCtr.y*circleCtr.y + (circleCtr.x - x1)*(circleCtr.x-x1) - circleRadius*circleRadius;
        let B_ = circleCtr.y;
        let D_ = B_*B_ - C_;

        y1 = B_ + Math.sqrt(D_);
        y2 = B_ - Math.sqrt(D_);        
    }
    else{
        // 근의 공식 사용. 
        // 직선의 방정식 y = ax+b를 원의 방정식에 대입한다.
        // 직선의 방정식을 대입하고 다 전개한 뒤에 변수에 코드를 넣었다...
        // Ax^2 + BX + C = 0형식의 식
        let k = circleCtr.y - b;
        let A = 1 + a*a;
        let B = 2*circleCtr.x + 2*a*k;
        let C = circleCtr.x*circleCtr.x + k*k - circleRadius*circleRadius;
        let D = B*B - (4*A*C);
        
        // 근의 공식으로 x,y값 도출
        x1 = (B + Math.sqrt(D)) / (2*A);
        x2 = (B - Math.sqrt(D)) / (2*A);
        y1 = a*x1 + b;
        y2 = a*x2 +b;
    }


    // 값이 선분 위에 존재하는지 확인
    if(x1>= lineP0.x && x1<=lineP1.x && y1>=lineP0.y && y1 <= lineP1.y){
        let dot1 = new THREE.Vector2(x1, y1);
        draw_point(dot1);
    }
    if(x2>= lineP0.x && x2 <=lineP1.x && y2>=lineP0.y && y2<=lineP1.y){
        let dot2 = new THREE.Vector2(x2,y2);
        draw_point(dot2);    
    }
}

function box_circle_intersection(boxMinPt, boxMaxPt, circleCtr, circleRadius) {
    let dot1 = boxMinPt;
    let dot2 = new THREE.Vector2(boxMinPt.x , boxMaxPt.y);
    let dot3 = boxMaxPt;
    let dot4 = new THREE.Vector2(boxMaxPt.x, boxMinPt.y);

    // 박스의 네가지 점을 매개변수로 준다.
    line_circle_intersection(dot1, dot2, circleCtr, circleRadius);
    line_circle_intersection(dot2, dot3, circleCtr, circleRadius);
    line_circle_intersection(dot4, dot3, circleCtr, circleRadius);
    line_circle_intersection(dot1, dot4, circleCtr, circleRadius);
}

//Keyboard Input
// 원점이 좌상단에 있다.
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        xValue += 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        xValue -= 5;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        yValue -= 5;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        yValue += 5;
    }
}

//Animation Callback
function clear(){
    ctx.clearRect(0, 0, c.width, c.height);
}
function update(){
    clear();
    draw_image();
    requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);