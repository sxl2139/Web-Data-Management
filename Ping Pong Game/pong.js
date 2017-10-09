/*global variables*/
/*variables to retrieve html elements*/
var court,ball,paddle,body;
/*variables to track ball and paddle positions*/
var ballX,ballY,paddleY;
/*variable to track time interval*/
var id;
/*variables to move ball*/
var x,y,ballSpeed=3,angle=0;
/*variables used to store scores*/
var currentScore=0,maxScore=0;
/*max top and max bottom position in court*/
var max,min;
/*end of global variables*/

/*initializes the game*/
function initialize(){
  //retrieve element from DOM
  court = document.getElementById('court');
  ball = document.getElementById('ball');
  paddle = document.getElementById('paddle');
  body = document.getElementById('gameBody');

  //randomly set the position of ball to the left border of court.
  max = court.offsetTop+court.offsetHeight/2-ball.offsetHeight/2;
  min = court.offsetTop-court.offsetHeight/2+ball.offsetHeight/2;
  ballY = Math.random() * (max - min) + min;
  ballX = 0;
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  //randomly set the angle betweem PI/4 and -PI/4
  var angleMax = Math.PI/4;
  var angleMin = -Math.PI/4;
  angle = Math.random() * (angleMax - angleMin) + angleMin;
  x = ballSpeed * Math.cos(angle * Math.PI / 180);
  y = ballSpeed * Math.cos(angle * Math.PI/180);
}

/*starts the game on click of submit or on left click on the court*/
function startGame(){
  //reset message and current score at the start of each game.
  messages.innerHTML='';
  currentScore=0;
  strikes.innerHTML=currentScore;
  id = setInterval(playGame,5);
}

function playGame()
{
  //move ball position
  ballX += x;
  ballY += y;

  //if ball crosses the right border end the game
  if((ballX + ball.offsetWidth) > court.offsetWidth)
  {
    //update message with current score
    var message='';
    if(currentScore==0)
      message = '<h4>You Loose!<br/>Click on Start Button to continue the Game.';
    if(currentScore>0)
      message = '<h4>Congragulations!You scored '+currentScore+' points.<br>Click on Start Button to continue the Game.';
      message=message+'<br>Click on Reset Button to Reset the Game. Reset Game clears your present Max Score</h4>';
      messages.innerHTML =message;

    //update max score
    if(currentScore>maxScore){
      maxScore=currentScore;
      score.innerHTML=maxScore;
    }

    //clear the interval, initialize game and clear onmousemove event
    clearInterval(id);
    initialize();
  }

  //bounce ball when it reaches bottom or top border
  if(ballY<min ||ballY>max)
      y = -y;

  //bounce ball when it reaches left border
  if(ballX<0)
      x = -x;

  //increment score if ball hits the paddle
  if(ballX + ball.offsetWidth >= paddle.offsetLeft && ballX + ball.offsetWidth < paddle.offsetLeft+paddle.offsetWidth){
    if(((ballY-ball.offsetHeight) <= paddleY) && ballY >= paddleY-paddle.offsetHeight){
      x = -x;
      //update score and message
      currentScore++;
      strikes.innerHTML=currentScore;
      message = '<h4>You scored '+currentScore+' points. Good going!!</h4>';
      messages.innerHTML=message;
    }
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

/*sets the speed of the game: slow, medium, fast*/
function setSpeed(speed){
  if(speed==0)
    ballSpeed = 3;
  if(speed==1)
    ballSpeed = 5;
  if(speed==2)
    ballSpeed = 8;
    x = ballSpeed * Math.cos(angle * Math.PI / 180);
    y = ballSpeed * Math.cos(angle * Math.PI/180);
}

/*resets the game*/
function resetGame(){
  maxScore=0;
  currentScore=0;
  clearInterval(id);
  initialize();
  messages.innerHTML='<h4>Please Click on Start Button to Start the Game</h4>';
  document.getElementById('score').innerHTML=maxScore;
  document.getElementById('strikes').innerHTML=currentScore;
}

/*moves paddle up and down w.r.to mouse*/
function movePaddle(e){
  var paddlePosY = (e.clientY - (court.offsetTop - document.documentElement.scrollTop));
  var minPaddlePos = 0;
  var maxPaddlePos = court.offsetHeight-court.offsetTop+paddle.offsetHeight/2;
  if(paddlePosY > (maxPaddlePos))
      paddlePosY = maxPaddlePos;
  else if(paddlePosY < (minPaddlePos))
          paddlePosY = minPaddlePos;
  // Copy position
  paddleY = paddlePosY;
  // Set position
  paddle.style.top = paddlePosY + 'px';
}
