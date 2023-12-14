
var player1=Math.floor(Math.random()*6+1);

 var dic1="dice"+player1 +".png";

var image1="images/"+dic1;

var img1=document.querySelectorAll("img")[0];

img1.setAttribute("src",image1);


var player2=Math.floor(Math.random()*6+1);
var dic2="dice"+player2+".png";
var image2="images/"+dic2;
var img2=document.querySelectorAll("img")[1];
img2.setAttribute("src",image2);


if(player1>player2) {
    document.querySelector("h1").innerHTML="Player1 win the game";
}
else if (player1<player2) {
    document.querySelector("h1").innerHTML="Player2 win the game";
}
else{
    document.querySelector("h1").innerHTML="Game Drawn";
}