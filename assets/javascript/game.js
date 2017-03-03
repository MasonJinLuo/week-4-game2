var selectedCharacter = [];
var availableCharacters = []
var availableEnemies = []
var defenders = []
var indexTracker = []
var attack = true


function startUp() {

    var moon = document.createElement("IMG");
  	moon.className = ("img-button moon")
    moon.setAttribute("src", "assets/images/moon.jpg");
    moon.setAttribute("alt", "moon");
    moon.setAttribute("data-atk", 8);
    moon.setAttribute("data-hp", 180);
    moon.setAttribute("counteratkvalue", 18);
    $("#characters").append(moon);

    var mars = document.createElement("IMG");
    mars.className = ("img-button mars")
    mars.setAttribute("src", "assets/images/mars.jpg");
    mars.setAttribute("alt", "mars");
    mars.setAttribute("data-atk", 8);
    mars.setAttribute("data-hp", 150);
    mars.setAttribute("counteratkvalue", 15);
    $("#characters").append(mars);

    var venus = document.createElement("IMG");
    venus.className = ("img-button venus")
    venus.setAttribute("src", "assets/images/venus.jpg");
    venus.setAttribute("alt", "venus");
    venus.setAttribute("data-atk", 8);
    venus.setAttribute("data-hp", 120);
    venus.setAttribute("counteratkvalue", 12);
    $("#characters").append(venus);

    var pluto = document.createElement("IMG");
    pluto.className = ("img-button pluto")
    pluto.setAttribute("src", "assets/images/pluto.jpg");
    pluto.setAttribute("alt", "pluto");
    pluto.setAttribute("data-atk", 8);
    pluto.setAttribute("data-hp", 180);
    pluto.setAttribute("counteratkvalue", 18);
    $("#characters").append(pluto);

    availableCharacters.push(moon, mars, venus, pluto)

}




$(document).ready(function event () {

    $(".img-button").on("click", function () {

        if (selectedCharacter.length === 0) {
            var selectedCharacterIndex = availableCharacters.indexOf(this); 
            selectedCharacter.push(availableCharacters[selectedCharacterIndex]);
            availableCharacters.splice(selectedCharacterIndex , 1); //this is same as at first isn't it. yes? it just magically worked..lol maybe glitchy
            $("#yourCharacter").append(this);
            
            for (i = 0; i < availableCharacters.length ; i++) {

                availableEnemies.push(availableCharacters[i]);
                $("#availableEnemies").append(availableEnemies[i]); 
                
            }

        }
        
        else if (defenders.length === 0){
            var defenderIndex = availableEnemies.indexOf(this)
            defenders.push(availableEnemies[defenderIndex]); // also try to put repeating stuffs into a variable
            availableEnemies.splice(defenderIndex , 1);
            $("#defender").append(this);

        }


    });
      

    $("#attack").on("click", function(){
        if ( selectedCharacter.length === 1 && defenders.length === 1 && attack === true){
            defenderHp = parseInt($(defenders[0]).attr("data-hp")); //retrieving defender HP
            yourCharacterAtk = parseInt($(selectedCharacter[0]).attr("data-atk"));  //retrieving your character's attack 

        
            $("#dHp").data("dHp", defenderHp) //store defender HP
            $("#cAtk").data("cAtk", yourCharacterAtk) // store your Character's attack
           

            defenderHp = ($("#dHp").data("dHp") - $("#cAtk").data("cAtk")); // calculating the damage done and determining the NEW defender HP
            $("#yourAtkDmg").html(yourCharacterAtk) //print it on HTML

            $(defenders[0]).attr("data-hp", defenderHp); // reDefining the defender HP
            $(selectedCharacter[0]).attr("data-atk", yourCharacterAtk +8) //reDefining your Character's attack
            console.log(defenderHp)
            console.log(yourCharacterAtk)
            
            defenderAtk = parseInt($(defenders[0]).attr("counteratkvalue")); // retrieving defender's attack damage
            yourCharacterHp = parseInt($(selectedCharacter[0]).attr("data-hp"));  //retrieving your character's Hp

            $("#cHp").data("cHp", yourCharacterHp) //store your character HP
            $("#dAtk").data("dAtk", defenderAtk) //store your defenderAtk

            yourCharacterHp =  ($("#cHp").data("cHp") -  $("#dAtk").data("dAtk")) // calculating the damage done to you 
            $(selectedCharacter[0]).attr("data-hp", yourCharacterHp) //reDefining your Character's HP
            console.log(yourCharacterHp)
            console.log(defenderAtk)

            $("#counterAtkDmg").html(defenderAtk)

        }

        if (yourCharacterHp <= 0) {

            $("#notice").html("You Lose, Please Press Restart and Try again.")
            attack = false
           
        }

        if (defenderHp <= 0) {
            
            $("#notice").html("You have defeated a defender, please click on another enemy to fight!")
            $("#defender").empty()
            defenders = []

        }
        if(defenders.length === 1 && yourCharacterHp > 0){
                    $("#notice").empty() //for the purpose of clearing the notice
                }

        if (availableEnemies.length === 0 && defenders.length === 0){
            $("#notice").html("Congratulations! You have defeated all of your enemies! You Win!")
        }


    });
    
    $("#restart").on("click", function(){
    selectedCharacter = [];
    availableCharacters = []
    availableEnemies = []
    defenders = []
    indexTracker = []
    attack = true
    $("#dHp").removeData()
    $("#characters").empty()
    $("#yourCharacter").empty()
    $("#availableEnemies").empty() 
    $("#defender").empty()
    $("#yourAtkDmg").empty()
    $("#counterAtkDmg").empty()  
    $("#notice").empty()
    startUp()
    event()



 });


});



