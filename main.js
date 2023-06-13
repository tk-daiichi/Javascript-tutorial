// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let para = document.querySelector("p");

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// 画面上にボールを生成するためのクラスを宣言

class Shape {

    constructor(x,y,velX,velY){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

class Ball extends Shape {

   constructor(x, y, velX, velY, color, size, exists) {
    super();
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true;
   }

   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   update() { //ボールを動かし、画面枠に衝突するとボールが跳ね返るように
      if ((this.x + this.size) >= width) {
         this.velX = -(Math.abs(this.velX));
      }

      if ((this.x - this.size) <= 0) {
         this.velX = Math.abs(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(Math.abs(this.velY));
      }

      if ((this.y - this.size) <= 0) {
         this.velY = Math.abs(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }

   collisionDetect() { //ボール同士が衝突したときボールの色をランダムに変化
      for (const ball of balls) {
         if (!(this === ball) && ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
         }
      }
   }

}

class EvilCircle extends Shape{ //衝突したボールを消す邪悪なボールを生成
    constructor(x,y){
        super(x,y,20,20);
        this.color = "white";
        this.size = 30;
        window.addEventListener("keydown", (e) => { //邪悪なボールをWASDキーで操作
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        });
    }

    draw() { 
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 3;
    }

    checkBounds() { //画面端に出そうなボールを少し押し戻す
        if ((this.x + this.size) >= width) {
            this.x = width - this.size - 10;
        }
   
        if ((this.x - this.size) <= 0) {
            this.x = this.size + 10;
        }
   
        if ((this.y + this.size) >= height) {
            this.y = height - this.size - 10;
        }
   
        if ((this.y - this.size) <= 0) {
            this.velY = this.size + 10;
        }
          
    }

    collisionDetect() { //通常のボールと邪悪なボールが衝突したとき、通常のボールを消去
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) { 
                    ball.exists = false;
                    counts -= 1;
                    para.textContent = "Balls count" + counts;
                }
            }
        }
    }    
}


// 2種類のボールを生成
const balls = [];

while (balls.length < 10) {
    const size = random(10,20);
    const ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    randomRGB(),
    size
   );

    balls.push(ball);
}

const evilball = new EvilCircle(random(0,width), random(0,height)); // sizeの参照が上手くいかない


// ボールと表示されているボールの個数を画面上に表示

evilball.draw();
let counts = balls.length;  // やや力技　要改善
                            // 次のボールの初回生成前にボールの消去判定がある場合、その数値の変化は反映されない
                            // 例）ボール1生成→邪悪ボール生成→ボール1消去判定→ボール2生成...だと1→0→1...と表示されるべき
                            // 数フレームなので見た目にはわからないが、実際は初期値から始まり減少している

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) {
        if (ball.exists){
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }        
        
        evilball.draw();
        evilball.checkBounds();
        evilball.collisionDetect();

    }
    
    requestAnimationFrame(loop);
}

loop();



para.textContent += ` ${counts}`;

