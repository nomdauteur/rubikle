var shifts = 0;
var emojis='';

function getRandomLevel() {
  console.log(LETTERS);
  setField();
display_letters();
  var items = [];
  var lang = document.getElementById("lang").innerText;
  if (lang == 'RU') items = words_ru_suggest;
  else items = words_en_suggest;
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
      LETTERS[i][j]["letter"]=l[i][j];
  console.log(LETTERS);
  display_letters();
}



function exportRes() {
  var res = grabField();
  console.log(res);
  var result = {"goal":document.getElementById("levelText").value.split("\n").filter(item => item.length > 0),
"current":res};
console.log(result);
  document.getElementById("levelres").value=JSON.stringify(result);
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