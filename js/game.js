const cvs = document.getElementById("canvas");
const cvs2 = document.getElementById ("canvas_2");
const ctx = cvs.getContext("2d");



const bee = new Image();
const bg = new Image();
const fg = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();



bg.src = "img/background.png";
bee.src = "img/bee.png";
fg.src = "img/down-space.png";
pipeTop.src = "img/pipe-1.png";
pipeBottom.src = "img/pipe-2.png";
 
//Audio

const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


const gap = 280;

document.addEventListener("keydown", moveUp);


function moveUp() {
    yPos -= 25  ;
    fly.play();
}
let pipe =[];

pipe[0] = {
    x : cvs.width,
    y : 0
}
let score = 0;
let xPos = 10;
let yPos = 150;
let grav = 0.8;




function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);
   
     pipe[i].x--;

     if(pipe[i].x == 11){
         pipe.push({
         x : cvs.width,
         y : Math.floor(Math.random() * pipeTop.height) - pipeTop.height
         });
     }
     
     
     if(xPos + bee.height >= pipe[i].x
        && xPos <= pipe[i].x + pipeTop.width
        && (yPos <= pipe[i].y + pipeTop.height
        || yPos + bee.height >= pipe[i].y + pipeTop.height + gap) || yPos + bee.height >=  cvs.height - fg.height) {
            location.reload();
        
        }
    
    
        if(pipe[i].x == 5){
          score++;
          score_audio.play();
        }
    }
  
   

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bee, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#FFFFFF";
    ctx.font ="20px Comic Sans MS,cursive";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
   
}
pipeBottom.onload = draw;
