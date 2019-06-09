

//First value in array is what's going to be typed. Second value is just added
var commands = {
      "about": {text: "Sure, I can tell you a little bit about myself", 
                card: true},
      "contact": {text: "You can contact me at nhuang321@gmail.com",
                card: false},
      "comics": {text: "Hope my comics bring a smile to your face :)", 
                card: true},
      "hi": {text: "Hi, there!", 
                card: false},
      "quotes": {text: "Here are some of my favorite quotes:",
                card: true},
      "home": {card: true}
      }
var cmdCounterOutput = 1;


function scroll (){
  $(document).ready(function () {
              $('html, body').animate({
                  scrollTop: $('#terminal-screen').get(0).scrollHeight
              }, 1500);
          });
}

function showCommand (command){
  var div = document.createElement("div");
  div.innerHTML = ">"+command;
  document.getElementById("terminal-screen").appendChild(div);
}
function display (command){
  display.command = command;
  function showCard(){
    if (commands[command].card){
      $('#terminal-screen').append($('#'+display.command).html());
    }
    scroll();
  }
  display.showCard = showCard;
  
  if (command != "home"){
    $('.prompt').tooltip('hide');
    scroll();
    type(command);
    cmdCounterOutput ++;
  }
  else{
    showCard();
    $('.prompt').tooltip('show');
  }
  
}




function type (command){
  if(command in commands){
    output = commands[command].text
  }
  else{
    output = "Are you sure you typed your command correctly?"
  }
  var options = {
      strings: [output],
      typeSpeed: 40,
      showCursor: false,
      onComplete: display.showCard
    }
  var div = document.createElement("div");
  div.id="cmd_"+cmdCounterOutput;
  document.getElementById("terminal-screen").appendChild(div);
  var typed = new Typed('#'+"cmd_"+cmdCounterOutput, options);
}


function intro () {
    display("home");
}

var options = {
      strings: ["Hi, I'm Nancy Huang! Welcome to my website :)"],
      typeSpeed: 40,
      onComplete: intro,
      showCursor: false
    }
  
var typed = new Typed(".screen-text", options);



$("#prompt-input").keydown(function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode == 13) {
    var command = document.getElementById("prompt-input").value.toLowerCase();
    document.getElementById("prompt-input").value='';
    showCommand(command);
    display(command);
  }
});

$(".terminal-footer").on('click', function(){
  document.getElementById("prompt-input").focus();
})