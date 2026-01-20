var WIDTH=0;
var HEIGHT=0;

var isGameOn;

var level_no = 0;

var GOAL=[];
var levels = [];

var shifts = 0;

var emojis="";

var mode="daily";

var game_no=0;

var loaded = false;

var border_style="0.5vmin solid #323232";

function activateDaily() {
  if (mode=="daily") return;
  mode = "daily";
  document.getElementById("daily").style.border=border_style;
  document.getElementById("nondaily").style.border="none";
  newGame();
}

function activateNonDaily() {
  if (mode=="nondaily") return;
  mode = "nondaily";
  document.getElementById("nondaily").style.border=border_style;
  document.getElementById("daily").style.border="none";
  newGame();
}

function changeGame() {
  mode = "nondaily";
  document.getElementById("nondaily").style.border=border_style;
  document.getElementById("daily").style.border="none";
  newGame();
}

function changeResult() {
  const dropdown = document.getElementById("lng");
  const resultSpan = document.getElementById("lang");
  // Get the selected value and display it
  resultSpan.textContent = dropdown.value;
  setLang();
  if (loaded) newGame();
  
}

// Set initial text on load
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("lng").value = document.getElementById("lang").textContent;
    changeResult();
});



function setLetters(words) {
  LETTERS = [[{"letter":"a","color":"#007926"},{"letter":"b","color":"#008A37"},{"letter":"c","color":"#009B48"},{"letter":"d","color":"#00AC59"},{"letter":"e","color":"#00BD6A"}],[{"letter":"f","color":"#970000"},{"letter":"g","color":"#A80000"},{"letter":"h","color":"#B90000"},{"letter":"i","color":"#CA0000"},{"letter":"j","color":"#DB0000"}],[{"letter":"k","color":"#0023BB"},{"letter":"l","color":"#0034CC"},{"letter":"m","color":"#0045DD"},{"letter":"n","color":"#0056EE"},{"letter":"o","color":"#0067FF"}],[{"letter":"p","color":"#BB1500"},{"letter":"q","color":"#CC2600"},{"letter":"r","color":"#DD3700"},{"letter":"s","color":"#EE4800"},{"letter":"t","color":"#FF5900"}],[{"letter":"u","color":"#BB9100"},{"letter":"v","color":"#CCA200"},{"letter":"w","color":"#DDB300"},{"letter":"x","color":"#EEC400"},{"letter":"y","color":"#FFD500"}]];
  for (var i = 0; i < 5; i++)
    for (var j = 0; j < 5; j++)
      LETTERS[i][j]["letter"]=words[i][j];
    display_letters();
}

function grabField() {
  var res=[];
  for (var i = 0; i < 5; i++)
  { res.push([]);
    for (var j = 0; j < 5; j++) {
      res[i].push(document.getElementById("word_"+(i+1)+"_pos_"+(j+1)).innerText);
    }
  }
  var beautified = [];
  for (var i = 0; i < 5; i++) {
    beautified.push(res[i].join(''));
    
  }
  return beautified;
}



function setLang() {
  document.getElementById("header").textContent=setText("Рубикли!","Rubikle!");
  document.getElementById("man").innerHTML="<i>"+setText("Жмите стрелки вокруг поля и собирайте слова","Press arrows around the field to assemble words")+"</i>";
  document.getElementById("daily").textContent=setText("Ежедневная","Daily");
  document.getElementById("nondaily").textContent=setText("Случайная","Random");
  document.getElementById("checkButton").textContent=setText("Проверить!","Check!");
  document.getElementById("changeButton").textContent=setText("Другая игра","Change game");
  document.getElementById("cpy").textContent=setText("Копировать результаты","Copy results");

}

function load() {
  
  document.getElementById("daily").style.border=border_style;
  document.getElementById("nondaily").style.border="none";
setField();
display_letters();
loaded = true;
         newGame();

}

function newGame() 
  {
    resize();
    shifts = 0;
    emojis="";
    var lang = document.getElementById("lang").innerText;
  if (lang == 'RU') levels = levels_ru;
  else levels = levels_en;
    if (mode == "daily") {
      var begin_date = new Date("01/22/2026");
      var date_now = new Date();
      var diff = Math.floor((date_now.getTime()-begin_date.getTime()) / 1000 / 60 / 60 / 24);
      game_no = diff+1;
      level_no = (diff%levels.length);
    }
    else level_no = Math.floor(Math.random()*levels.length);
    console.log(level_no);
    setLetters(levels[level_no]["current"]);
    GOAL = levels[level_no]["goal"];
  
    isGameOn=true;
    document.getElementById("checkButton").disabled="";
    

  }

function isWord(word) {
  var lang = document.getElementById("lang").innerText;
  if (lang == 'RU') items = words_ru;
  else items = words_en;
  return items.includes(word);
}



function check() {
  document.getElementById("checkButton").disabled="true";
  var result = grabField(); 
  var all_words_flag = true;
  var all_words_match = true;
  for (var r of result) {
    if (!isWord(r)) all_words_flag = false;
  }
  var r_s = copyArr(result).sort();
  var g_s = copyArr(GOAL).sort();
  var matches = r_s.filter(value => g_s.includes(value)).length;
  for (var i = 0; i < 5; i++) {
    if (r_s[i] != g_s[i]) all_words_match=false;
  }
  var res =  {"win":all_words_match,"semiwin":all_words_flag};
  document.getElementById("res").style.display="block";
  document.getElementById("cpy").disabled="true";
  if (all_words_flag && !all_words_match) {
    emojis+=String.fromCodePoint(9734);
    shifts=0;
    document.getElementById("results").value=setText("Ого, вы нашли набор слов, о котором мы не подумали! Продолжайте играть до победы. Скопировать результат\n\n","Wow, you found a combination of words different from ours! Go on and play until you win! Copy results:\n\n")+"#rubikle No. "+game_no+": "+emojis;
      document.getElementById("cpy").disabled="";
  }
  else if (all_words_match) {
    emojis+=String.fromCodePoint(11088);
    shifts=0;
    document.getElementById("results").value=setText("Вы победили! Поделитесь результатом с друзьями:","You won! Share your result with friends!")+"\n\n#rubikle No. "+game_no+": "+emojis;
    document.getElementById("cpy").disabled="";
  } else {
    emojis+=matches;
    document.getElementById("results").value=setText("Увы, пока не повезло. Вы нашли "+matches+" слов. Продолжайте играть!", "Sorry, no luck for now. You found "+matches+" words. Keep playing!")+"\n\n#rubikle No. "+game_no+": "+emojis;
    document.getElementById("cpy").disabled="";
    

  }
  console.log(res);
  console.log(emojis);
}

function copyRes() {
   navigator.clipboard.writeText("#rubikle No. "+game_no+": "+emojis)
    .then(() => {
    })
    .catch(err => {
      console.error('Error in copying text: ', err);
    });
}