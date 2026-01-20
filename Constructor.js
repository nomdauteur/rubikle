var LETTERS = [['a','b','c','d','e'],['f','g','h','i','j'],['k','l','m','n','o'],['p','q','r','s','t'],['u','v','w','x','y']]

function display_letters_constructor() {
  for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
      document.getElementById("word_"+(i+1)+"_pos_"+(j+1)).innerText=LETTERS[i][j];
    }
  }
}

function getRandomLevel() {
  console.log("called");
  console.log(document.getElementById("lang"));
  var items = [];
  var lang = document.getElementById("lang").innerText;
  if (lang == 'RU') items = words_ru;
  else items = words_en;
  document.getElementById("levelText").value="";
  for (i=0;i<5;i++)
  document.getElementById("levelText").value+=items[Math.floor(Math.random()*items.length)]+"\n";
  document.getElementById("tryButton").addEventListener('click', tryOn);
  document.getElementById("exportButton").addEventListener('click', exportRes);
}

function tryOn() {
  console.log("Clicked!");
  var l = document.getElementById("levelText").value.split("\n");
  console.log(l);
  for (var i = 0; i < 5; i++)
    for (var j = 0; j < 5; j++)
      LETTERS[i][j]=l[i][j];
  console.log(LETTERS);
  display_letters_constructor();
}

function grabField() {
  var res=[];
  for (var i = 0; i < 5; i++)
  { res.push([]);
    for (var j = 0; j < 5; j++) {
      res[i].push(document.getElementById("word_"+(i+1)+"_pos_"+(j+1)).innerText);
    }
  }
  return res;
}

function exportRes() {
  var res = grabField();
  console.log(res);
  var beautified = [];
  for (var i = 0; i < 5; i++) {
    beautified.push(res[i].join(''));
    
  }
  console.log(beautified);
  var result = {"goal":document.getElementById("levelText").value.split("\n").filter(item => item.length > 0),
"current":beautified};
console.log(result);
  document.getElementById("res").value=JSON.stringify(result);
} 

function changeResult() {
  const dropdown = document.getElementById("lng");
  const resultSpan = document.getElementById("lang");
  // Get the selected value and display it
  resultSpan.textContent = dropdown.value;
  getRandomLevel();
}

// Set initial text on load
document.addEventListener('DOMContentLoaded', (event) => {
    changeResult();
});