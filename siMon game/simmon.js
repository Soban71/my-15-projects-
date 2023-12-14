var color=["Green","Red","Yellow","Blue"];
var arr=[]
var start=true;
    document.addEventListener("keypress",function(event){

        if(event.key == "Enter" && start== true){
            document.getElementById("heading").innerHTML= "Let's Start game";
            start=false;
            to_Store();
        }
    });
  

    function to_Store(){

        var chose=Math.floor(Math.random()*4);
        document.getElementById(color[chose]).classList.add('add');

        var audio= new Audio("gui.wav");
        audio.play()

        arr.push(color[chose]);

        setTimeout(()=>{
            document.getElementById(color[chose]).classList.remove('add');
        },200);

    }
    var i=0;
    function game(){
if(document.activeElement.id==arr[i]){
    if(i==arr.length-1){
        alert("correct");
        to_Store();
        i=0;
    }
    else{
        i++;
    }
}
    else{
        alert("incorrect");
        window.location.reload();
    }
    return;
}


   
    
   

