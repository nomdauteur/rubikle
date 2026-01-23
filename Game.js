var WIDTH=0;
var HEIGHT=0;

var isGameOn;

var level_no = 0;

var GOAL=[];
var levels = [];

var shifts = 0;

var emojis="";



var game_no=0;

var loaded = false;

var border_style="0.5vmin solid #323232";

function changeGame() {
  newGame();
}

function setLngEn() {
  document.getElementById("lang").textContent="EN";
  document.getElementById("lng_EN").style.border=border_style;
  document.getElementById("lng_RU").style.border="";
  setLang();
  if (loaded) newGame();
}

function setLngRu() {
  document.getElementById("lang").textContent="RU";
  document.getElementById("lng_EN").style.border="";
  document.getElementById("lng_RU").style.border=border_style;
  setLang();
  if (loaded) newGame();
}



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
  document.getElementById("checkButton").textContent=setText("Проверить!","Check!");
  document.getElementById("changeButton").textContent=setText("Другая игра","Change game");
  document.getElementById("lng_EN").textContent=setText("АНГЛ","EN");
  document.getElementById("lng_RU").textContent=setText("РУС","RU");

}

function load() {
  

YaGames.init()
    .then((ysdk) => {
        document.getElementById("lang").textContent=ysdk.environment.i18n.lang.toUpperCase();
        

           while (document.getElementById("lang").textContent == "Language") {
            sleep(20);
        } 
        if (document.getElementById("lang").textContent=='RU') {
          document.getElementById("lng_EN").style.border="";
          document.getElementById("lng_RU").style.border=border_style;
        }
        else {
          document.getElementById("lng_EN").style.border=border_style;
          document.getElementById("lng_RU").style.border="";
        }
        setLang();
        ysdk.features.LoadingAPI?.ready();

        setField();
        display_letters();

        loaded = true;
        newGame();
     
    })
    .catch(console.error);

}

function insideNewGame() {
   shifts = 0;
    emojis="";
    var lang = document.getElementById("lang").innerText;
  if (lang.toUpperCase() == 'RU') levels = levels_ru;
  else levels = levels_en;
    level_no = Math.floor(Math.random()*levels.length);
    game_no = level_no+1;
    console.log(level_no);
    setLetters(levels[level_no]["current"]);
    GOAL = levels[level_no]["goal"];
  
    isGameOn=true;
    document.getElementById("checkButton").disabled="";
    
}

function newGame() 
  {
    document.getElementById("results").innerText=setText("Нажимайте на стрелки вокруг поля и собирайте слова. Удачной игры!", "Press arrows around the field to assemble words. Good luck!");
    resize();
    YaGames.init()

    .then((ysdk) => {
        // Informing about starting the gameplay.

        ysdk.features.GameplayAPI?.start();


    });
   
var shouldShow = Math.random();
    if (shouldShow > 0.5) {
    YaGames.init()

    .then((ysdk) => {

          ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {
          insideNewGame();
},

        onError: function(error) {

          console.log(error);

        }
    }
      });
    });
  }
  else insideNewGame();
  }

function isWord(word) {
  var lang = document.getElementById("lang").innerText.toUpperCase();
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
  if (all_words_flag && !all_words_match) {
    emojis+=String.fromCodePoint(8203)+String.fromCodePoint(9734);
    shifts=0;
    document.getElementById("results").innerText=setText("Ого, вы нашли набор слов, о котором мы не подумали! Продолжайте играть до победы.\n\n","Wow, you found a combination of words different from ours! Go on and play until you win!\n\n");
  }
  else if (all_words_match) {
    emojis+=String.fromCodePoint(8203)+String.fromCodePoint(11088);
    shifts=0;
    document.getElementById("results").innerText=setText("Вы победили!","You won!")+"\n\n"+emojis;
    YaGames.init()

    .then((ysdk) => {     

        ysdk.features.GameplayAPI?.stop(); 
      });
  } else {
    //emojis+=String.fromCodePoint(8203)+matches;
    document.getElementById("results").innerText=setText("К сожалению, пока до победы далеко. Вы нашли "+matches +" слов. Не сдавайтесь!","Unfortunately, you did not win yet. You found "+matches+" words. Don't give up!");
    
  }
  console.log(res);
  console.log(emojis);
}

