var level = 0;
var checkRestarted = false;
$(document).ready(function(){
    
    
    //This is just a test for an each loop in Jquery 
    // $(".btn").each(function(index){
    //       console.log(index + ": "+$(this).attr("id"));
    // });
     //-----------Step_5---------------
     //Create an empty array that will be set in the last index with the id btn choosen before
     var userClickedPattern = [];
     //If the variable is not defined not set the array
    
    
    
    //-----------Step_3----------------
    //Create an array that is being set with the random color generated before 
    var gamePattern = [];
    

    //-----------Step_2----------------
    //Relate the generated random number with an array of the button colors
    //And set a variable with this random color
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour; 
    
    //To add some delay to the loop of the pattern xD
    function task(i) {
        setTimeout(function () {
            animatePress(gamePattern[i]);
            playSound(gamePattern[i]);
        }, 1000 * i);
    } 

    function patternSequence(){

    
    if(checkLoaded === true){ // if the game has started xD
    
      randomChosenColour = buttonColours[nextSequence()];
      gamePattern.push(randomChosenColour);

       setTimeout(() => {
           for (var i = 0; i < gamePattern.length; i++) {
               task(i); //Calling the delay method to slow this down like animated xD
           } 
       }, 1000);

 }

}
     
    function restartGame(){
          checkRestarted = true;
          $(document).keypress(function(){
            window.location.reload();
          });
    }
   
   
    function failedFunction (){
        $("h1").text("You are a fool! Try again by pressing a key xD");
    }

   //------------Step_9---------------
   //Check the answer of the user and trying to set a couple of things...
    function checkAnswer(currentLevel){
    
        $(userClickedPattern).each(function(index){
            console.log("Value of userClicked: "+this ," Value of pattern: "+gamePattern[index]);
           if(this.toString().trim() !==gamePattern[index].toString().trim()){
                  clearArrayPatternSecuence();
                  console.log("you are a fool!");
                  failedFunction();
                  restartGame();
           }else if(userClickedPattern.length === gamePattern.length){
                clearArrayofUserClick();
                patternSequence();
           }

        });
   
}
    
   function clearArrayPatternSecuence(){
       gamePattern.length = 0;
   }
  

   function clearArrayofUserClick(){
      userClickedPattern.length = 0;
    //    $(userClickedPattern).each(function(index){
        //       userClickedPattern[index].pop();
        //    });
   }


    //-----------Step_1---------------
    //Generates a random number between 0 and 3
    //And i create a variable level that indicates wich level is increasing it by succeding the rounds 
    
    function nextSequence(){
        $("h1").text("Level "+level);
        randomNumber = Math.floor(Math.random()*4);
        level++;
        return randomNumber;
    }
    
    // $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // var choosenSound = new Audio("sounds/"+randomChosenColour+".mp3");
    // choosenSound.play();
    

    //-----------Step_4---------------
    //Add a click event listener to the button that will be pressed and save the id of this node to a variable
    
    
    //-----------Step_6---------------
    //Function that plays the button color choosen
    function playSound(name){
        var btnChoosen = new Audio("sounds/"+name+".mp3");
        btnChoosen.play();
    }

    //----------Step7-----------------
    //Function to animate the btn choosen
    function animatePress(currentColor){
        $("#" + currentColor).addClass("pressed").delay(100).queue(function(){
            $("#" + currentColor).removeClass("pressed").dequeue();
        });
        
    }

    //When the user click a btn and the game has started xD
    $(".btn").click(function(){
        if(checkRestarted ===false){
        var  userChosenColour = this;
        userClickedPattern.push(this.id);
        
        playSound(this.id); 
        animatePress(this.id);
        checkAnswer(level); 
        // for(var i=0; i<userClickedPattern.length;i++){
        //  console.log($(userClickedPattern[i]).attr("id"));
        // }
        }
     }); 
    

      

     //------------Step_8----------
     //When a key is pressed the game start! but just call one the nextSequence function
     //For that i will create a boolean to test if this has been pressed 
     var checkLoaded = false;
     $(document).keypress(function(){
        if(checkLoaded === false){ 
        userClickedPattern.length=0;
        checkLoaded = true;   
        // nextSequence();
        patternSequence();
        console.log("The function has been called");
        }
     });





});