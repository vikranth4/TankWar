var cnv=document.getElementById("game");
var ctx=cnv.getContext("2d");

cnv.height=document.documentElement.clientHeight;
cnv.width=document.documentElement.clientWidth;
if(cnv.width>cnv.height){
    cnv.width=cnv.height;
}

    VirtualJoystick.prototype._buildJoystickBase	= function()
     {
	var canvas	= document.createElement( 'canvas' );
	canvas.width	= 126;
	canvas.height	= 126;
	
	var ctx		= canvas.getContext('2d');
	ctx.beginPath(); 
	ctx.strokeStyle = this._strokeStyle; 
	ctx.lineWidth	= 6; 
	ctx.arc( canvas.width/2, canvas.width/2, 18, 0, Math.PI*2, true); 
	ctx.stroke();	

	ctx.beginPath(); 
	ctx.strokeStyle	= this._strokeStyle; 
	ctx.lineWidth	= 2; 
	ctx.arc( canvas.width/2, canvas.width/2, 30, 0, Math.PI*2, true); 
	ctx.stroke();
	
	return canvas;
}
        VirtualJoystick.prototype._buildJoystickStick	= function()
                    {
	var canvas	= document.createElement( 'canvas' );
	canvas.width	= 86;
	canvas.height	= 86;
	var ctx		= canvas.getContext('2d');
	ctx.beginPath(); 
	ctx.strokeStyle	= this._strokeStyle; 
	ctx.lineWidth	= 6; 
	ctx.arc( canvas.width/2, canvas.width/2, 18, 0, Math.PI*2, true); 
	ctx.stroke();
	return canvas;
}

         var joystick = new VirtualJoystick({
		mouseSupport	: false,
        strokeStyle	: 'black',
         stationaryBase: true,
        baseX		: 100,
		baseY		: cnv.height/4-(cnv.height/4)/2,
        limitStickTravel: true,
        stickRadius	: 50,
	});

	   joystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageY < cnv.height/4 && (touch.pageX<cnv.width/2)){
           return true;
        }	
         return false;
	});

       var joystick1 = new VirtualJoystick({
		mouseSupport	: false,
        strokeStyle   :  'black',
         stationaryBase: true,
        baseX		: 100,
		baseY		: cnv.height-(cnv.height/4)+(cnv.height/4)/2,
        limitStickTravel: true,
        stickRadius	: 50,
	});
	   joystick1.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageY >= 3*(cnv.height/4) && (touch.pageX<cnv.width/2))	return true;
		return false;
	});

         
        
        
var keyboard = new THREEx.KeyboardState(); 
var clock = new THREE.Clock();
var frameTime=0;

var GRAVITY=0.08;
var speedY=0;
var speedX=0;
var GRAVITY1=0.08;
var speedY1=0;
var speedX1=0;


var state="down";
var state1="up";
var shot=false;
var shot1=false;



var blueUP=new Image();
var blueDown=new Image();
var blueRight=new Image();
var blueLeft=new Image();

var blackUp=new Image();
var blackDown=new Image();
var blackRight=new Image();
var blackLeft=new Image();

var weaponU=new Image();
var weaponD=new Image();
var weaponR=new Image();
var weaponL=new Image();


var arena=new Image();
var fire1=new Image();
var fire2=new Image();


arena.src="js/arena.jpg";
fire1.src="js/fireButton.png";
fire2.src="js/fireButton.png";

blackUp.src="js/blacktankU.png";
blackDown.src="js/blacktankD.png";
blackRight.src="js/blacktankR.png";
blackLeft.src="js/blacktankL.png";

weaponU.src="js/weaponU.png";
weaponD.src="js/weaponD.png";
weaponR.src="js/weaponR.png";
weaponL.src="js/weaponL.png";

blueUP.src="js/bluetankU.png";
blueDown.src="js/bluetankD.png";
blueRight.src="js/bluetankR.png";
blueLeft.src="js/bluetankL.png";

var reStart=true;
var gameState="play";

 var fireSound = new Audio("js/Fire.wav"); 
 var mySound = new Audio("js/truck.mp3"); 
var lifelost=new Audio("js/lifelost.mp3");

//screen.orientation.lock("portrait-primary");



function disableScroll(){
    scrollTop=window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft=window.pageXOffset || document.documentElement.scrollLeft;
}
window.onscroll=function(){
    window.scrollTo(0,0);
}


function drawText(text,x,y,color)
{
    ctx.fillStyle=color;
    ctx.font="45px fantasy";
    ctx.fillText(text,x,y);
    ctx.text
}

function DisplayName(text,x,y,color)
{
    ctx.fillStyle=color;
    ctx.font="20px Arial";
    ctx.fillText(text,x,y);
}

function drawCount(text,x,y,color)
{
    ctx.fillStyle=color;
    ctx.font="100px fantasy";
    ctx.fillText(text,x,y);
    ctx.text
}

const ply1={
    x:cnv.width/2,
    y:(cnv.height/4)+50,
    width:0.2*cnv.width,
    height:0.12*cnv.height,
    score:0,
    color:"BLUE"
}
const ply2={
    x:cnv.width/2,
    y:3*(cnv.height/4)-50-0.12*cnv.height,
    width:0.2*cnv.width,
    height:0.12*cnv.height,
    score:0,
    color:"RED"
}
const weapon1XY={
    x:ply1.x+(ply1.width/2)-((0.65*ply1.width)/2),
    y:((ply1.height)-(0.85*ply1.height))/2 + ply1.y,
    height:0.80*ply1.height,
     width:0.65*ply1.width,
    color:"BLACK"
}
const weapon1LR={
    x:((ply1.width)-(0.85*ply1.height))/2 + ply1.x,
    y:ply1.y+(ply1.height/2)-(0.65*ply1.width/2),
    width:0.85*ply1.height,
    height:0.65*ply1.width,
    color:"BLACK"
}


const weapon2XY={
    x:ply2.x+(ply2.width/2)-(0.65*ply2.width)/2,
    y:((ply1.height)-(0.85*ply2.height))/2 + ply2.y,
    width:0.65*ply1.width,
    height:0.80*ply2.height,
    color:"BLACK"
}
const weapon2LR={
    x:((ply2.width)-(0.85*ply2.height))/2 + ply2.x,
    y:ply2.y+(ply2.height/2)-(0.65*ply2.width/2),
    width:0.85*ply2.height,
    height:0.65*ply1.width,
    color:"BLACK"
}

   
function playerCollision(p1,p2){
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.bottom=ply1.y+ply1.height;
    
    p2.top=ply2.y;
    p2.left=ply2.x;
    p2.right=ply2.x+ply2.width;
    p2.bottom=ply2.y+ply2.height;
    
    return (p1.right>p2.left && p1.top<p2.bottom && p1.left<p2.right && p1.bottom>p2.top);
}

function player1UPCollision(p1,p2){//ply1 collides UP position 
    p1.top=ply1.y;
    if(state==("right")){
    p1.topX1=ply1.x+(ply1.width/4)-((ply1.width/4)/3);  
    p1.topX2=ply1.x+(3*(ply1.width/4))+((ply1.width/4)/1);
    }
    if(state==("left")){
    p1.topX1=ply1.x+(ply1.width/4)-((ply1.width/4)/1);  
    p1.topX2=ply1.x+(3*(ply1.width/4))+((ply1.width/4)/3);
    }
         
    p2.top=ply2.y;
    p2.left=ply2.x;
    p2.right=ply2.x+ply2.width;
    p2.bottom=ply2.y+ply2.height;
    
  
  
    return((p1.topX1>p2.left || p1.topX2>p2.left) && (p1.topX1<p2.right || p1.topX2<p2.right) && p1.top<p2.bottom && p1.top>p2.top);  
}
function player1DownCollision(p1,p2){//ply1 collides Down position
    
    p1.bottom=ply1.y+ply1.height;
    if(state=="right"){
    p1.bottomX1=ply1.x+(ply1.width/4)-((ply1.width/4)/3); 
    p1.bottomX2=ply1.x+(3*(ply1.width/4))+((ply1.width/4)/1);
    }
     if(state=="left"){
    p1.bottomX1=ply1.x+(ply1.width/4)-((ply1.width/4)/1); 
    p1.bottomX2=ply1.x+(3*(ply1.width/4))+((ply1.width/4)/3);
    }
    
    p2.top=ply2.y;
    p2.left=ply2.x;
    p2.right=ply2.x+ply2.width;
    p2.bottom=ply2.y+ply2.height;
    
    return(p1.bottom>p2.top && p1.bottom<p2.bottom && (p1.bottomX1>p2.left || p1.bottomX2>p2.left) && (p1.bottomX1<p2.right || p1.bottomX2<p2.right));
}

function player1LeftCollision(p1,p2){//ply1 collides Left position
    
    p1.left=ply1.x;
    p1.leftY1=ply1.y+(ply1.height/4)-((ply1.height/4)/2);
    p1.leftY2=ply1.y+(3*(ply1.height/4))+((ply1.height/4)/2);

    p2.top=ply2.y;
    p2.left=ply2.x;
    p2.right=ply2.x+ply2.width;
    p2.bottom=ply2.y+ply2.height;
    
    return(p1.left<p2.right && p1.left>p2.left && (p1.leftY1>p2.top || p1.leftY2>p2.top) && (p1.leftY1<p2.bottom || p1.leftY2<p2.bottom));
}

function player1RightCollision(p1,p2){//ply1 collides right position
    
    p1.right=ply1.x+ply1.width;
    p1.rightY1=ply1.y+(ply1.height/4)-((ply1.height/4)/3);
    p1.rightY2=ply1.y+(3*(ply1.height/4))+((ply1.height/4)/3);
    
    p2.top=ply2.y;
    p2.left=ply2.x;
    p2.right=ply2.x+ply2.width;
    p2.bottom=ply2.y+ply2.height;
    
    return(p1.right>p2.left && p1.right<p2.right && (p1.rightY1>p2.top-10 || p1.rightY2>p2.top-10) && (p1.rightY1<p2.bottom || p1.rightY2<p2.bottom)); 
}

function player2UPCollision(p1,p2){//ply2 collides up position
    p2.top=ply2.y;
    if(state1=="right"){
    p2.topX1=ply2.x+(ply2.width/4)-((ply2.width/4)/3);
    p2.topX2=ply2.x+(3*(ply2.width/4))+((ply2.width/4)/1);
    }
    
    if(state1=="left"){
    p2.topX1=ply2.x+(ply2.width/4)-((ply2.width/4)/1);
    p2.topX2=ply2.x+(3*(ply2.width/4))+((ply2.width/4)/3);
    }
    
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.bottom=ply1.y+ply1.height;
    
    return((p2.topX1>p1.left || p2.topX2>p1.left) && (p2.topX1<p1.right || p2.topX2<p1.right) && p2.top<p1.bottom && p2.top>p1.top);
}

function player2RightCollision(p1,p2){//ply2 collides right position
    p2.right=ply2.x+ply2.width;
    p2.rightY1=ply2.y+(ply2.height/4)-((ply2.height/4)/2);
    p2.rightY2=ply2.y+(3*(ply2.height/4))+((ply2.height/4)/2);
    
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.bottom=ply1.y+ply1.height;
    
    
    return(p2.right>p1.left && p2.right<p1.right && (p2.rightY1>=p1.top || p2.rightY2>=p1.top) && (p2.rightY1<=p1.bottom || p2.rightY2<=p1.bottom)); 
}

function player2LeftCollison(p1,p2){//ply2 collides left position
    p2.left=ply2.x;
    p2.leftY1=ply2.y+(ply2.height/4)-((ply2.height/4)/2);
    p2.leftY2=ply2.y+(3*(ply2.height/4))+((ply2.height/4)/2);
    
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.bottom=ply1.y+ply1.height;
    
    return(p2.left>p1.left && p2.left<p1.right && (p2.leftY1>p1.top || p2.leftY2>p1.top) && (p2.leftY1<p1.bottom || p2.leftY2<p1.bottom));
}

function player2DownCollision(p1,p2){//ply2 collides down position
    p2.bottom=ply2.y+ply2.height;
    if(state1=="right"){
    p2.bottomX1=ply2.x+(ply2.width/4)-((ply2.width/4)/3);
    p2.bottomX2=ply2.x+(3*(ply2.width/4))+((ply2.width/4)/1);
    }
    if(state1=="left"){
    p2.bottomX1=ply2.x+(ply2.width/4)-((ply2.width/4)/1);
    p2.bottomX2=ply2.x+(3*(ply2.width/4))+((ply2.width/4)/3);
    }
    
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.bottom=ply1.y+ply1.height;
    
    return(p2.bottom>p1.top && p2.bottom<p1.bottom && (p2.bottomX1>p1.left || p2.bottomX2>p1.left) && (p2.bottomX1<p1.right || p2.bottomX2<p1.right));
}

function weaponxyCollision(w1,w2){//XY-XY collision
    w1.top=weapon1XY.y;
    w1.left=weapon1XY.x;
    w1.right=weapon1XY.x+weapon1XY.width;
    w1.bottom=weapon1XY.y+weapon1XY.height;
    
    w2.top=weapon2XY.y;
    w2.left=weapon2XY.x;
    w2.right=weapon2XY.x+weapon2XY.width;
    w2.bottom=weapon2XY.y+weapon2XY.height;
    
    return (w1.right>w2.left && w1.top<w2.bottom && w1.left<w2.right && w1.bottom>w2.top); 
}

function weaponlrCollision(w1,w2){//LR-LR Collision
    w1.top=weapon1LR.y;
    w1.left=weapon1LR.x;
    w1.right=weapon1LR.x+weapon1LR.width;
    w1.bottom=weapon1LR.y+weapon1LR.height;
    
    w2.top=weapon2LR.y;
    w2.left=weapon2LR.x;
    w2.right=weapon2LR.x+weapon2LR.width;
    w2.bottom=weapon2LR.y+weapon2LR.height;
    
    return (w1.right>w2.left && w1.top<w2.bottom && w1.left<w2.right && w1.bottom>w2.top); 
}

function weaponXLCollision(w1,w2){//XY-LR Collision
    w1.top=weapon1XY.y;
    w1.left=weapon1XY.x;
    w1.right=weapon1XY.x+weapon1XY.width;
    w1.bottom=weapon1XY.y+weapon1XY.height;
    
    w2.top=weapon2LR.y;
    w2.left=weapon2LR.x;
    w2.right=weapon2LR.x+weapon2LR.width;
    w2.bottom=weapon2LR.y+weapon2LR.height;
    
    return (w1.right>w2.left && w1.top<w2.bottom && w1.left<w2.right && w1.bottom>w2.top); 
}

function weaponLXCollision(w1,w2){//LR-XY Collision
    w1.top=weapon1LR.y;
    w1.left=weapon1LR.x;
    w1.right=weapon1LR.x+weapon1LR.width;
    w1.bottom=weapon1LR.y+weapon1LR.height;
    
    w2.top=weapon2XY.y;
    w2.left=weapon2XY.x;
    w2.right=weapon2XY.x+weapon2XY.width;
    w2.bottom=weapon2XY.y+weapon2XY.height;
    
    return (w1.right>w2.left && w1.top<w2.bottom && w1.left<w2.right && w1.bottom>w2.top); 
}

function weaponXYply1Collision(w1,p1){
     w1.top=weapon2XY.y;
    w1.left=weapon2XY.x;
    w1.right=weapon2XY.x+weapon2XY.width;
    w1.bottom=weapon2XY.y+weapon2XY.height;
    
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.down=ply1.y+ply1.height;
    
    return (w1.right>p1.left && w1.top<p1.bottom && w1.left<p1.right && w1.bottom>p1.top); 
}

function weaponLYply1Collsion(w1,p1){
    w1.top=weapon2LR.y;
    w1.left=weapon2LR.x;
    w1.right=weapon2LR.x+weapon2LR.width;
    w1.bottom=weapon2LR.y+weapon2LR.height;
     
    p1.top=ply1.y;
    p1.left=ply1.x;
    p1.right=ply1.x+ply1.width;
    p1.down=ply1.y+ply1.height;
    
    return (w1.right>p1.left && w1.top<p1.bottom && w1.left<p1.right && w1.bottom>p1.top); 
}

function weaponXYply2Collison(w1,p1){
    w1.top=weapon1XY.y;
    w1.left=weapon1XY.x;
    w1.right=weapon1XY.x+weapon1XY.width;
    w1.bottom=weapon1XY.y+weapon1XY.height;
    
    p1.top=ply2.y;
    p1.left=ply2.x;
    p1.right=ply2.x+ply2.width;
    p1.down=ply2.y+ply2.height;
    
    return (w1.right>p1.left && w1.top<p1.bottom && w1.left<p1.right && w1.bottom>p1.top); 
}

function weaponLRply2Collision(w1,p1){
    w1.top=weapon1LR.y;
    w1.left=weapon1LR.x;
    w1.right=weapon1LR.x+weapon1LR.width;
    w1.bottom=weapon1LR.y+weapon1LR.height;
     
    p1.top=ply2.y;
    p1.left=ply2.x;
    p1.right=ply2.x+ply2.width;
    p1.down=ply2.y+ply2.height;
    
    return (w1.right>p1.left && w1.top<p1.bottom && w1.left<p1.right && w1.bottom>p1.top); 
}


     var input = new CanvasInput({
     canvas :document.getElementById("game"),
         x:(cnv.width/2)-((0.32*cnv.height)/4),
         y:400,
  fontSize: 10,
  fontFamily: 'Airal',
  fontColor: 'white',
  width: 150,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'PLAYER 1 NAME',
    backgroundImage: "js/arena.jpg",
         
     });


     var input2 = new CanvasInput({
     canvas :document.getElementById("game"),
         x:(cnv.width/2)-((0.32*cnv.height)/4),
         y:450,
  fontSize: 10,
  fontFamily: 'Airal',
  fontColor: 'white',
  width: 150,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'PLAYER 2 NAME',
    backgroundImage: "js/arena.jpg",
});
    

function render(){
 
    frameTime = clock.getDelta();
    
    ctx.drawImage(arena,0,0,cnv.width,cnv.height);
    
    ctx.drawImage(fire1,3*(cnv.width/4),cnv.height/4-(cnv.height/4)/2-25,50,50);
    ctx.drawImage(fire2,3*(cnv.width/4),cnv.height-(cnv.height/4)+(cnv.height/4)/2-20,50,50);
    drawText(ply1.score,cnv.width/2,cnv.height/4-(cnv.height/4)/2,"#5C6B73");
    drawText(ply2.score,cnv.width/2,cnv.height-(cnv.height/4)+(cnv.height/4)/2,"#5C6B73");
    DisplayName(input.value(),10,30,"CYAN");
    DisplayName(input2.value(),10,cnv.height-30,"STEELBLUE");
    
    ctx.fillStyle="BLACK";
    ctx.moveTo(0,cnv.height/4);
    ctx.lineTo(cnv.width,cnv.height/4);
    ctx.moveTo(0,3*(cnv.height/4));
    ctx.lineTo(cnv.width,3*(cnv.height/4));
    ctx.stroke();

    if(state=="up")
    {      
        ctx.drawImage(weaponU,weapon2XY.x,weapon2XY.y,weapon2XY.width,weapon2XY.height);
        ctx.drawImage(blueUP,ply2.x,ply2.y,ply2.width,ply2.height);
    }
   
    if(state1=="up")
    {
        ctx.drawImage(weaponU,weapon1XY.x,weapon1XY.y,weapon1XY.width,weapon1XY.height);
        ctx.drawImage(blackUp,ply1.x,ply1.y,ply1.width,ply1.height);         
    }
    
    if(state=="down")
    {     
        ctx.drawImage(weaponD,weapon2XY.x,weapon2XY.y+15,weapon2XY.width,weapon2XY.height);
      ctx.drawImage(blueDown,ply2.x,ply2.y,ply2.width,ply2.height);    
    }
    
    if(state1=="down"){
        ctx.drawImage(weaponD,weapon1XY.x,weapon1XY.y,weapon1XY.width,weapon1XY.height);
        ctx.drawImage(blackDown,ply1.x,ply1.y,ply1.width,ply1.height);    
    }
    
    if(state=="right"){
        ctx.drawImage(weaponR,weapon2LR.x+15,weapon2LR.y,weapon2LR.width,weapon2LR.height);
        ctx.drawImage(blueRight,ply2.x,ply2.y,ply2.width,ply2.height);
    }
    if(state1=="right"){
        ctx.drawImage(weaponR,weapon1LR.x,weapon1LR.y,weapon1LR.width,weapon1LR.height);
        ctx.drawImage(blackRight,ply1.x,ply1.y,ply1.width,ply1.height);    
    }
    
    if(state=="left"){
        ctx.drawImage(weaponL,weapon2LR.x,weapon2LR.y,weapon2LR.width,weapon2LR.height);
        ctx.drawImage(blueLeft,ply2.x,ply2.y,ply2.width,ply2.height);
    }
    if(state1=="left")
        {
           ctx.drawImage(weaponL,weapon1LR.x,weapon1LR.y,weapon1LR.width,weapon1LR.height);
            ctx.drawImage(blackLeft,ply1.x,ply1.y,ply1.width,ply1.height);     
        }
    
    //**********************************************
      
    if(!reStart){
        mySound.pause();
       // lifelost.play();
        if(ply1.score==10){
            drawText(input.value()+" WINS",0,cnv.height/2,"#5C6B73");
            gameState="GameOver";
        }
        
        if(ply2.score==10){
             drawText(input2.value()+" WINS",0,cnv.height/2,"#5C6B73");
            gameState="GameOver";
        }
        
        
        if(gameState=="play"){
            DisplayName("Click to Continue",cnv.width/2,cnv.height/2,"#5C6B73");
        }
        
        if(gameState=="GameOver"){
             DisplayName("Click to Restart",cnv.width/2,cnv.height/2,"#5C6B73");
            cnv.addEventListener("touchstart",function(e){
         var touch	= e.changedTouches[0];
        if(touch.pageY>cnv.height/4+20 && touch.pageY<3*(cnv.height/4)-20){   

        state1="up";
        ply1.x=cnv.width/2;
        ply1.y=(cnv.height/4)+50;
        weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
        weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
        weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
        weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
        ply1.score=0;
            
        state="down";
        ply2.x=cnv.width/2;
        ply2.y=3*(cnv.height/4)-50-0.12*cnv.height;
        weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
        weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
        weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
        weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
        ply2.score=0;
            
        var count1=2;
        var counter1=setInterval(timer1, 1000); //1000 will  run it every 1 second
           
        function timer1()
        {
           // lifelost.pause();
            count1=count1-1;
            if (count1 <= 0)
            {
                clearInterval(counter1);
                 reStart=true; 
                return;
            }
                render();
            drawCount(count,cnv.width/4,cnv.height/2,"RED");
        
        }
            
        }
        }); 
           gameState="play"; 
        }
        
       
       cnv.addEventListener("touchstart",function(e){
            var touch	= e.changedTouches[0];
        if(touch.pageY>cnv.height/4+20 && touch.pageY<3*(cnv.height/4)-20){   
        if(gameState=="play"){
             
        state1="up";
        ply1.x=cnv.width/2;
        ply1.y=(cnv.height/4)+50;
        weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
        weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
        weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
        weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
        
        state="down";
        ply2.x=cnv.width/2;
        ply2.y=3*(cnv.height/4)-50-0.12*cnv.height;
        weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
        weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
        weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
        weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
            
        reStart=true; 
           }
        }
        }); 
        
    }
    

    
}
// var mySound;

function update(){

     mySound.play();
    
    if(shot=="true" || shot1=="true"){
        mySound.stop();
    }
    
    //out of boundary check
    
    if(ply1.x<=0){
        ply1.x=0;
        ply2.score+=1;
        reStart=false;
    }
    
    if(ply1.x>=cnv.width-ply1.width){
        ply1.x=cnv.width-ply1.width;
         ply2.score++;
        reStart=false;
    }
    
    if(ply2.x<=0){
        ply2.x=0;
        ply1.score++;
        reStart=false;
    }
    if(ply2.x>=cnv.width-ply2.width){
        ply2.x=cnv.width-ply2.width;
        ply1.score++;
        reStart=false;
    }
    
    if(ply1.y<=cnv.height/4){
        ply1.y=cnv.height/4;
         ply2.score++;
        reStart=false;
    }
    if(ply1.y>=(3*(cnv.height/4)-ply1.height)){
        ply1.y=3*(cnv.height/4)-ply1.height;
         ply2.score++;
        reStart=false;
    }
    
    if(ply2.y<=cnv.height/4){
        ply2.y=cnv.height/4;
        ply1.score++;
        reStart=false;
    }
    
    if(ply2.y>=3*(cnv.height/4)-ply2.height){
        ply2.y=3*(cnv.height/4)-ply2.height;
        ++ply1.score;
        reStart=false;
    }
//**************************************************************************
    
        //**************************************
      if(shot==false)
        {   
    if(keyboard.pressed("D"))//right
        {
             if(state=="right")
                {
                    ply2.x+=20 * (frameTime+0.25);
                    weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
                    weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
                }
            state="right";
            weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
            weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
           
            
        }
  
    if(keyboard.pressed("A"))//left
        {
             if(state=="left")
                {
                    ply2.x-=20 * (frameTime+0.25);
                    weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
                    weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
                }
           state="left"; 
             weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
            weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
           
        }
            
    if(keyboard.pressed("W"))//up
        {
            if(state=="up"){
                ply2.y-=20 * (frameTime+0.25);
                weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
                weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
            }
            state="up";
            weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width/2);
           weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
        }
    
    if(keyboard.pressed("S"))
        {
             if(state=="down"){
                ply2.y+=20 * (frameTime+0.25);
                weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
                weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
            }
            state="down";
             weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
            weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
        }
        

            if(keyboard.pressed("space")){
                fireSound.play();
                 shot=true;
            if(state=="right"){
                 speedX=120;
                 weapon2LR.x+=speedX;
            }
            if(state=="left"){
                speedX=-120;
                weapon2LR.x+=speedX; 
            }
            if(state=="up"){
                speedY=-120;
                weapon2XY.y+=speedY;
            }
            if(state=="down"){
                speedY=120;
                weapon2XY.y+=speedY;
            }
            }
        }

    //************************************************************
    //player 1
    if(shot1==false){
                
        if(keyboard.pressed("right")){
            if(state1=="right")
                {
                    ply1.x+=20 * (frameTime+0.25);
                    weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
                    weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
                }
            state1="right";
            weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
            weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
        }
      
        if(keyboard.pressed("left")){
             if(state1=="left")
                {
                    ply1.x-=20 * (frameTime+0.25);
                    weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
                    weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
                }
           state1="left"; 
             weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
            weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
        }
  
        if(keyboard.pressed("up")){
             if(state1=="up"){
                ply1.y-=20 * (frameTime+0.25);
                weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
                weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
            }
            state1="up";
            weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
            weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
        }
        

        
        if(keyboard.pressed("down")){
            if(state1=="down"){
                ply1.y+=20 * (frameTime+0.25);
                weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
                weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
            }
            state1="down";
             weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
            weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
        }
        

    if(keyboard.pressed("shift")){
         shot1=true;
        fireSound.play();
            if(state1=="right"){
                 speedX1=120;
                 weapon1LR.x+=speedX1;
            }
            if(state1=="left"){
                speedX1=-120;
                weapon1LR.x+=speedX1; 
            }
            if(state1=="up"){
                speedY1=-120;
                weapon1XY.y+=speedY1;
            }
            if(state1=="down"){
                speedY1=120;
                weapon1XY.y+=speedY1;
            }   
    }

}

//******************************************************************************//joystick control
    //player1
    if(joystick1.right()){
        if(state=="right")
                {
                    ply2.x+=20 * (frameTime+0.25);
                    weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
                    weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
                }
            state="right";
            weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
            weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
    }
    
    if(joystick1.left()){
        if(state=="left")
                {
                    ply2.x-=20 * (frameTime+0.25);
                    weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
                    weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
                }
           state="left"; 
             weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
            weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
        }
    
    
    if(joystick1.up()){
         if(state=="up"){
                ply2.y-=20 * (frameTime+0.25);
                weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
                weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
            }
            state="up";
            weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
            weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
    }

    if(joystick1.down()){
         if(state=="down"){
                ply2.y+=20 * (frameTime+0.25);
                weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
                weapon2LR.y=ply2.y+(ply2.height/2)-(0.65*ply2.width)/2;
            }
            state="down";
             weapon2XY.x=ply2.x+(ply2.width/2)-(0.65*ply2.width)/2;
            weapon2XY.y=((ply2.height)-(weapon2XY.height))/2 + ply2.y;
    }
//***********************************************************************
    //player2
    if(joystick.right()){
         if(state1=="right")
                {
                    ply1.x+=20 * (frameTime+0.25);
                    weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
                    weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
                }
            state1="right";
            weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
            weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
    }
    
    if(joystick.left()){
         if(state1=="left")
                {
                    ply1.x-=20 * (frameTime+0.25);
                    weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
                    weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
                }
           state1="left"; 
             weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
            weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
    }
    
    if(joystick.up()){
         if(state1=="up"){
                ply1.y-=20 * (frameTime+0.25);
                weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
                weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
            }
            state1="up";
            weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
            weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
    }
    
    if(joystick.down()){
        if(state1=="down"){
                ply1.y+=20 * (frameTime+0.25);
                weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
                weapon1LR.y=ply1.y+(ply1.height/2)-(0.65*ply1.width)/2;
            }
            state1="down";
             weapon1XY.x=ply1.x+(ply1.width/2)-((0.65*ply1.width)/2);
            weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
    }

//******************************************************************
       
        
    cnv.addEventListener("touchend",function(e){       
        var touch	= e.changedTouches[0];
        if(touch.pageY>3*(cnv.height/4) && touch.pageX>3*(cnv.width/4)){
              
             if(shot==false){
                 
                 
            if(state=="right"){
                 speedX=60;
                 weapon2LR.x+=speedX;
                shot=true;
                fireSound.play();
            }
             }
            if(shot==false){
            if(state=="left"){
                speedX=-60;
                weapon2LR.x+=speedX; 
                shot=true;
                  fireSound.play();
            }
            }
            if(shot==false){
            if(state=="up"){
                speedY=-60;
                weapon2XY.y+=speedY;
                shot=true;
                  fireSound.play();
            }
            }
            if(shot==false){
            if(state=="down"){
                speedY=60;
                weapon2XY.y+=speedY;
                shot=true;
                  fireSound.play();
            }
            }
        }
        
    });
    
         if(shot1==false){    
         cnv.addEventListener("touchend",function(e){
        var touch	= e.changedTouches[0];
       
         if(touch.pageY<cnv.height/4 && touch.pageX>3*(cnv.width/4)){   
            if(shot1==false){
    
              
            if(state1=="right"){
                 speedX1=60;
                 weapon1LR.x+=speedX1;
                shot1=true;
                  fireSound.play();
            }
            }
            if(shot1==false){
            if(state1=="left"){
                speedX1=-60;
                weapon1LR.x+=speedX1; 
                shot1=true;
                  fireSound.play();
            }
            }
            if(shot1==false){
            if(state1=="up"){
                speedY1=-60;
                weapon1XY.y+=speedY1;
                shot1=true;
                  fireSound.play();
            }
            }
            if(shot1==false){
            if(state1=="down"){
                speedY1=60;
                weapon1XY.y+=speedY1;
                shot1=true;
                  fireSound.play();
            } 
            }
    
        }   
    });
     }

    
    
    
//****************************************************************************
  //Player 2
    if(state=="left")
        {
        if(weapon2LR.x<=ply2.x-weapon2LR.width)
			{
				speedX=0;
				 weapon2LR.x=ply2.x-weapon2LR.width;
                speedX+=GRAVITY;
			     weapon2LR.x+=speedX;  
			}
            else if(weapon2LR.x>=((ply2.width)-(0.85*ply2.height))/2 + ply2.x)
            {
                weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;
            }
        else
            {
                speedX=5;
			 speedX+=GRAVITY;
			 weapon2LR.x+=speedX;
            }
             if(shot==true){
                if(weapon2LR.x>=((ply2.width)-(0.85*ply2.height))/2 + ply2.x){
                    shot=false;
                }
            }
            
        }
    
    if(state=="right"){
        
         if(weapon2LR.x>=ply2.x+ply2.width)
			{
				speedX=0;
				 weapon2LR.x=ply2.x+ply2.width;
                speedX+=GRAVITY;
			     weapon2LR.x-=speedX;  
			}
    else if(weapon2LR.x<=((ply2.width)-(0.85*ply2.height))/2 + ply2.x)
         {
                weapon2LR.x=((ply2.width)-(0.85*ply2.height))/2 + ply2.x;      
        }
    else
        {
            speedX=5;
			speedX+=GRAVITY;
			weapon2LR.x-=speedX;
        }
         if(shot==true){
                if(weapon2LR.x<=((ply2.width)-(0.85*ply2.height))/2 + ply2.x){
                    shot=false;
                }
            }
     }
    
    if(state=="up")
        {
            if(weapon2XY.y<=ply2.y-weapon2XY.height)
			{
				speedY=0;
				 weapon2XY.y=ply2.y-weapon2XY.height;
                speedY+=GRAVITY;
			     weapon2XY.y+=speedY;  
			}
    else if(weapon2XY.y>=(((ply2.height)-weapon2XY.height)/2 + ply2.y))
         {
            weapon2XY.y=((ply2.height)-weapon2XY.height)/2 + ply2.y;
        }
    else
        {
            speedY=5;
			speedY+=GRAVITY;
			weapon2XY.y+=speedY;
        } 
            if(shot==true){
                if(weapon2XY.y>=(((ply2.height)-weapon2XY.height)/2 + ply2.y)){
                    shot=false;
                }
            }
    }
    
    if(state=="down")
        {
            if(weapon2XY.y>=ply2.y+ply2.height)
			{
				speedY=0;
				 weapon2XY.y=ply2.y+ply2.height;
                speedY+=GRAVITY;
			     weapon2XY.y-=speedY;  
			}
    else if(weapon2XY.y<=(((ply2.height)-weapon2XY.height)/2 + ply2.y))
         {
                weapon2XY.y=((ply2.height)-weapon2XY.height)/2 + ply2.y-5;
        }
    else
        {
            speedY=5;
			speedY+=GRAVITY;
			weapon2XY.y-=speedY;
        } 
             if(shot==true){
                if(weapon2XY.y<=(((ply2.height)-weapon2XY.height)/2 + ply2.y-5)){
                    shot=false;
                }
            }
            
    }
//*******************************************************************************
    //player 1
    
     if(state1=="left")
        {
        if(weapon1LR.x<=ply1.x-weapon1LR.width)
			{
				speedX1=0;
				 weapon1LR.x=ply1.x-weapon1LR.width;
                speedX1+=GRAVITY1;
			     weapon1LR.x+=speedX1;  
			}
            else if(weapon1LR.x>=((ply1.width)-(0.85*ply1.height))/2 + ply1.x)
            {
                weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;
            }
        else
            {
                speedX1=5;
			 speedX1+=GRAVITY1;
			 weapon1LR.x+=speedX1;
            }
             if(shot1==true){
                if(weapon1LR.x>=((ply1.width)-(0.85*ply1.height))/2 + ply1.x){
                    shot1=false;
                }
            }
            
        }
    
    if(state1=="right"){
        
         if(weapon1LR.x>=ply1.x+ply1.width)
			{
				speedX1=0;
				 weapon1LR.x=ply1.x+ply1.width;
                speedX1+=GRAVITY1;
			     weapon1LR.x-=speedX1;  
			}
    else if(weapon1LR.x<=((ply1.width)-(0.85*ply1.height))/2 + ply1.x)
         {
                weapon1LR.x=((ply1.width)-(0.85*ply1.height))/2 + ply1.x;      
        }
    else
        {
            speedX1=5;
			speedX1+=GRAVITY1;
			weapon1LR.x-=speedX1;
        }
         if(shot1==true){
                if(weapon1LR.x<=((ply1.width)-(0.85*ply1.height))/2 + ply1.x){
                    shot1=false;
                }
            }
     }
    
    if(state1=="up")
        {
            if(weapon1XY.y<=ply1.y-weapon1XY.height)
			{
				speedY1=0;
				 weapon1XY.y=ply1.y-weapon1XY.height;
                speedY1+=GRAVITY1;
			     weapon1XY.y+=speedY1;  
			}
    else if(weapon1XY.y>=((ply1.height)-weapon1XY.height)/2 + ply1.y)
         {
            weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
        }
    else
        {
            speedY1=5;
			speedY1+=GRAVITY1;
			weapon1XY.y+=speedY1;
        } 
            if(shot1==true){
                if(weapon1XY.y>=((ply1.height)-weapon1XY.height)/2 + ply1.y){
                    shot1=false;
                }
            }
    }
    
    if(state1=="down")
        {
            if(weapon1XY.y>=ply1.y+ply1.height)
			{
				speedY1=0;
				 weapon1XY.y=ply1.y+ply1.height;
                speedY1+=GRAVITY1;
			     weapon1XY.y-=speedY1; 
			}
    else if(weapon1XY.y<=((ply1.height)-weapon1XY.height)/2 + ply1.y)
         {
                weapon1XY.y=((ply1.height)-weapon1XY.height)/2 + ply1.y;
        }
    else
        {
            speedY1=5;
			speedY1+=GRAVITY1;
			weapon1XY.y-=speedY1;
        } 
             if(shot1==true){
                if(weapon1XY.y<=((ply1.height)-weapon1XY.height)/2 + ply1.y){
                    shot1=false;
                }
            }
            
    }

//*********************************************************************************
    //collision detection
    
    //player-player collision
   if(playerCollision(ply1,ply2)){
        if(state=="up" && state1=="down"){
            ply1.y-=30;
            weapon1XY.y-=10;
            ply2.y+=30;
            weapon2XY.y+=10;
        }
        
        if(state1=="up" && state=="down"){
            ply1.y+=30;
            weapon1XY.y+=10;
            ply2.y-=30;
            weapon2XY.y-=10;
        }
          if(state=="right" && state1=="left"){
            ply1.x+=30;
            weapon1LR.x+=10;
            ply2.x-=30;
            weapon2LR.x-=10;
        }
        
        if(state1=="right" && state=="left"){
            ply1.x-=30;
            weapon1LR.x-=10;
            ply2.x+=30;
            weapon2LR.x+=10;
        }
//***********************************************************ply1(left-right)  ply2(up-down)  
        
             
        if(state=="up" && state1=="up" && ply1.y<ply2.y){
            weapon2XY.y=ply2.y+20;
            ply2.y=ply1.y+ply1.height;
        }
         if(state=="up" && state1=="up" && ply1.y>ply2.y){
            weapon1XY.y=ply1.y+20;
             ply1.y=ply2.y+ply2.height;
        }
        if(state=="down" && state1=="down" && ply1.y<ply2.y){
            weapon1XY.y=ply1.y-20;
            ply1.y=ply2.y-ply2.height;
        }
         if(state=="down" && state1=="down" && ply1.y>ply2.y){
             weapon2XY.y=ply2.y-20;
            ply2.y=ply1.y-ply1.height;
        }
        if(state=="right" && state1=="right" && ply1.x>ply2.x){
            weapon2LR.x=ply2.x-20;
            ply2.x=ply1.x-ply2.width;
        }
         if(state=="right" && state1=="right" && ply1.x<ply2.x){
            weapon1LR.x=ply1.x-20;
             ply1.x=ply2.x-ply1.width;
        }
        if(state=="left" && state1=="left" && ply1.x>ply2.x){
            weapon1LR.x=ply1.x+20;
            ply1.x=ply2.x+ply2.width;
        }
         if(state=="left" && state1=="left" && ply1.x<ply2.x){
            weapon2LR.x=ply2.x+20;
             ply2.x=ply1.x+ply1.width;
        }
        
    }
    
    if(player1UPCollision(ply1,ply2) && state1=="up"){     
        weapon1XY.y=ply1.y+20;
        ply1.y=ply2.y+ply2.height;
         
    }
        if(player2UPCollision(ply1,ply2) && state=="up"){
        weapon2XY.y=ply2.y+20;
        ply2.y=ply1.y+ply1.height;
    }
    
    
    if(player1DownCollision(ply1,ply2) && state1=="down"){
        weapon1XY.y=ply1.y-20;
        ply1.y=ply2.y-ply1.height;
       
    }
        if(player2DownCollision(ply1,ply2) && state=="down"){
        weapon2XY.y=ply2.y-20;
        ply2.y=ply1.y-ply2.height;
    }
    
     if(player1LeftCollision(ply1,ply2) && state1=="left"){
        weapon1LR.x=ply1.x+20;
        ply1.x=ply2.x+ply2.width;
    }
    
    if(player1RightCollision(ply1,ply2) && state1=="right"){
        weapon1LR.x=ply1.x-20;
        ply1.x=ply2.x-ply1.width;
    }
    

    if(player2RightCollision(ply1,ply2) && state=="right"){
        weapon2LR.x=ply2.x-20;
        ply2.x=ply1.x-ply2.width;
    }
    
    if(player2LeftCollison(ply1,ply2) && state=="left"){
        weapon2LR.x=ply2.x+20;
        ply2.x=ply1.x+ply1.width;
    }
    

    
    //weapon player collision

    
  if(weaponXYply1Collision(weapon2XY,ply1)){
        if(state=="up"){
            ply1.y-=30;
            weapon1LR.y=ply1.y;
        }
        if(state=="down"){
            ply1.y+=30;
             weapon1LR.y=ply1.y;
        }
    }
    
    if(weaponLYply1Collsion(weapon2XY,ply1)){
        if(state=="left"){
            ply1.x-=30;
            weapon1XY.x=ply1.x;
        }
        if(state=="right"){
            ply1.x+=30;
            weapon1XY.x=ply1.x;
        }
    }
    
    if(weaponXYply2Collison(weapon1XY,ply2)){
        if(state1=="up"){
            ply2.y-=30;
            weapon2LR.y=ply2.y;
        }
        if(state1=="down"){
            ply2.y+=30;
            weapon2LR.y=ply2.y;
        }
    }
    
    if(weaponLRply2Collision(weapon1LR,ply2)){
        if(state1=="left"){
            ply2.x-=30;
            weapon2XY.x=ply2.x;
        }
        if(state1=="right"){
            ply2.x+=30;
            weapon2XY.x=ply2.x;
        }
    }

}
function game(){
   
if(reStart){
    update(); 
    render();
}
    

}



//****************************************************************GAME START
var tank=new Image();
var playButton=new Image();
var war=new Image();
war.src="js/war.png";
playButton.src="js/playButton.png";
tank.src="js/tank.png";



window.onload=function(){
    ctx.drawImage(arena,0,0,cnv.width,cnv.height);
    ctx.drawImage(tank,(cnv.width/2)-100,0,0.32*cnv.height,0.32*cnv.height); 
    ctx.drawImage(playButton,(cnv.width/2)-((0.32*cnv.height)/4),300,(0.32*cnv.height)/2,(0.32*cnv.height)/2);
    ctx.drawImage(war,-570,-500,1500,1500);
     

    cnv.addEventListener("click",function(e){
    if(e.x>(cnv.width/2)-((0.32*cnv.height)/4) && e.x<((cnv.width/2)-((0.32*cnv.height)/4))+((0.32*cnv.height)/2) && e.y>300 && e.y<300+((0.32*cnv.height)/2)){  
            input.destroy();
            input2.destroy();
        
        var count=4;

        var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

        function timer()
        {
            count=count-1;
            if (count <= 0)
            {
                clearInterval(counter);
                const framepersecond=30;
                setInterval(game,1000/framepersecond);
                return;
            }
            render();
            drawCount(count,cnv.width/4,cnv.height/2,"RED");
        }
       
                   
    }

    });
    
}
 












