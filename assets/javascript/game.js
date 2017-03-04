var selectedCharacter = [];
var availableCharacters = []
var availableEnemies = []
var defenders = []
var indexTracker = []
var attack = true; 

function startUp() {

    var moonWrapper = $('<div>')
    var moonHp = $('<div>')
    moonHp.addClass("hp")
    moonWrapper.attr("id", "moonWrapper")
    moonWrapper.addClass("wrapper")
    var moon = $('<img>');
  	moon.addClass("img-button moon")
    moon.attr("src", "assets/images/moon.jpg");
    moon.attr("alt", "Sailor Moon");
    moonWrapper.attr("counteratkvalue", 18);
    moonWrapper.data("atk", 8);
    moonWrapper.data("hp", 180);
    $("#characters").append(moonWrapper);
    moonWrapper.append(moon);
    moonWrapper.append(moonHp)
    moonHp.attr("id", "moonHp")
    moonHp.html(180)



    var marsWrapper = $('<div>')
    var marsHp = $('<div>')
    marsHp.addClass("hp")
    marsWrapper.attr("id", "marsWrapper")
    marsWrapper.addClass("wrapper")
    var mars = $('<img>');
    mars.addClass("img-button mars")
    mars.attr("src", "assets/images/mars.jpg");
    mars.attr("alt", "Sailor Mars");
    marsWrapper.data("atk", 8);
    marsWrapper.data("hp", 150);
    marsWrapper.attr("counteratkvalue", 15);
    $("#characters").append(marsWrapper);
    marsWrapper.append(mars);
    marsWrapper.append(marsHp)
    marsHp.attr("id", "marsHp")
    marsHp.html(150)


    var venusWrapper = $('<div>')
    var venusHp = $('<div>')
    venusHp.addClass("hp")
    venusWrapper.attr("id", "venusWrapper")
    venusWrapper.addClass("wrapper")
    var venus = $('<img>');
    venus.addClass("img-button venus")
    venus.attr("src", "assets/images/venus.jpg");
    venus.attr("alt", "Sailor Venus");
    venusWrapper.data("atk", 8);
    venusWrapper.data("hp", 120);
    venusWrapper.attr("counteratkvalue", 12);
    $("#characters").append(venusWrapper);
    venusWrapper.append(venus);
    venusWrapper.append(venusHp)
    venusHp.attr("id", "venusHp")
    venusHp.html(120)


    var plutoWrapper = $('<div>')
    var plutoHp = $('<div>')
    plutoHp.addClass("hp")
    plutoWrapper.attr("id", "venusWrapper")
    plutoWrapper.addClass("wrapper")
    var pluto = $('<img>');
    pluto.addClass("img-button pluto")
    pluto.attr("src", "assets/images/pluto.jpg");
    pluto.attr("alt", "Sailor Pluto");
    plutoWrapper.data("atk", 8);
    plutoWrapper.data("hp", 180);
    plutoWrapper.attr("counteratkvalue", 18);
    $("#characters").append(plutoWrapper);
    plutoWrapper.append(pluto);
    plutoWrapper.append(plutoHp)
    plutoHp.attr("id", "plutoHp")
    plutoHp.html(180)

    
    availableCharacters.push(moonWrapper[0], marsWrapper[0], venusWrapper[0], plutoWrapper[0])
}




$(document).ready(function() {
    startUp();
    event();
    
    $("#restart").on("click", function(){
        selectedCharacter = [];
        availableCharacters = []
        availableEnemies = []
        defenders = []
        indexTracker = []
        attack = true
        $("#moonWrapper").removeData()
        $("#marsWrapper").removeData()
        $("#venusWrapper").removeData()
        $("#plutoWrapper").removeData()
        $("#dHp").removeData()
        $("#dAtk").removeData()
        $("#cHp").removeData()
        $("#cAtk").removeData()
        $("#characters").empty()
        $("#yourCharacter").empty()
        $("#availableEnemies").empty() 
        $("#defender").empty()
        $("#yourAtkDmg").empty()
        $("#counterAtkDmg").empty()  
        $("#notice").empty()
        startUp()
        event();



    });


});

function event () {
    $(".wrapper").off("click")
    $("#attack").off("click")
    $(".wrapper").on("click", function () {
        if (selectedCharacter.length === 0) {
            var selectedCharacterIndex = availableCharacters.indexOf(this); 
            console.log(availableCharacters.indexOf(this))
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
            var defenderHp = parseInt($(defenders[0]).data("hp")); //retrieving defender HP
            var yourCharacterAtk = parseInt($(selectedCharacter[0]).data("atk"));  //retrieving your character's attack 

        console.log('test: ' + $(selectedCharacter[0]).data("atk"))
            $("#dHp").data("dHp", defenderHp) //store defender HP
            $("#cAtk").data("cAtk", yourCharacterAtk) // store your Character's attack
           

            defenderHp = ($("#dHp").data("dHp") - $("#cAtk").data("cAtk")); // calculating the damage done and determining the NEW defender HP
            $("#yourAtkDmg").html(yourCharacterAtk) //print it on HTML

            $(defenders[0]).data("hp", defenderHp); // reDefining the defender HP
            $(selectedCharacter[0]).data("atk", yourCharacterAtk +8) //reDefining your Character's attack
            $(defenders[0]).find(".hp").html(defenderHp)
            console.log(defenderHp)
            console.log(yourCharacterAtk)
            
            var defenderAtk = parseInt($(defenders[0]).attr("counteratkvalue")); // retrieving defender's attack damage
            var yourCharacterHp = parseInt($(selectedCharacter[0]).data("hp"));  //retrieving your character's Hp

            $("#cHp").data("cHp", yourCharacterHp) //store your character HP
            $("#dAtk").data("dAtk", defenderAtk) //store your defenderAtk

            yourCharacterHp =  ($("#cHp").data("cHp") -  $("#dAtk").data("dAtk")) // calculating the damage done to you 
            $(selectedCharacter[0]).data("hp", yourCharacterHp) //reDefining your Character's HP
            $(selectedCharacter[0]).find(".hp").html(yourCharacterHp)

            $(".selectedName").html($(selectedCharacter[0]).find(".img-button").attr("alt"))
            $(".defenderName").html($(defenders[0]).find(".img-button").attr("alt"))
            
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

        if (availableEnemies.length === 0 && defenders.length === 0 && availableCharacters.length === 0){
            $("#notice").html("Congratulations! You have defeated all of your enemies! You Win!")
        }


    });
}


