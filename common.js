var LETTERS = [[{"letter":"a","color":"#007926"},{"letter":"b","color":"#008A37"},{"letter":"c","color":"#009B48"},{"letter":"d","color":"#00AC59"},{"letter":"e","color":"#00BD6A"}],[{"letter":"f","color":"#970000"},{"letter":"g","color":"#A80000"},{"letter":"h","color":"#B90000"},{"letter":"i","color":"#CA0000"},{"letter":"j","color":"#DB0000"}],[{"letter":"k","color":"#0023BB"},{"letter":"l","color":"#0034CC"},{"letter":"m","color":"#0045DD"},{"letter":"n","color":"#0056EE"},{"letter":"o","color":"#0067FF"}],[{"letter":"p","color":"#BB1500"},{"letter":"q","color":"#CC2600"},{"letter":"r","color":"#DD3700"},{"letter":"s","color":"#EE4800"},{"letter":"t","color":"#FF5900"}],[{"letter":"u","color":"#BB9100"},{"letter":"v","color":"#CCA200"},{"letter":"w","color":"#DDB300"},{"letter":"x","color":"#EEC400"},{"letter":"y","color":"#FFD500"}]]

function display_letters() {
  for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
      document.getElementById("word_"+(i+1)+"_pos_"+(j+1)).innerText=LETTERS[i][j]["letter"];
      document.getElementById("word_"+(i+1)+"_pos_"+(j+1)).style.backgroundColor=LETTERS[i][j]["color"];
      document.getElementById("word_"+(i+1)+"_pos_"+(j+1)).style.color="white";

    }
  }
}

function resize() {
  var w,h;

  if (window.innerWidth >= 9/16*window.innerHeight)
  {
    w = window.innerHeight * 9 / 16;
    h = window.innerHeight;
  }
  else {
    w = window.innerWidth;
    h = window.innerWidth * 16 / 9;
  } 
  WIDTH=w;
  HEIGHT=h * 9/16;

document.getElementById('upper').style.top = 0 +"px";
document.getElementById('upper').style.left = (window.innerWidth-w)/2 +"px";
document.getElementById('upper').style.width = w +"px";
document.getElementById('upper').style.height = h * 3/16 +"px";

document.getElementById('canvas').style.width = w +"px";
document.getElementById('canvas').style.height = h * 9/16 +"px";
document.getElementById('canvas').style.top = h*3/16 +"px";
document.getElementById('canvas').style.left = (window.innerWidth-w)/2 +"px";

document.getElementById('lower').style.width = w +"px";
document.getElementById('lower').style.height = h * 4/16 +"px";
document.getElementById('lower').style.top = h*12/16 +"px";
document.getElementById('lower').style.left = (window.innerWidth-w)/2 +"px";

for (var i = 1; i <=5; i++) {
  for (var j = 1; j <=5; j++) {
    var cell = document.getElementById("word_"+i+"_pos_"+j);

    cell.style.width = w/9 +"px";
    cell.style.height = w/9 +"px";
    cell.style.borderRadius = "2vmin";
    cell.style.border = "0.1vmin solid #323232";
    cell.style.top = w/9*(i+1) +"px";
    cell.style.left = w/9*(j+1) +"px";
    cell.style.fontSize=w/18 +"px";
  }
}

for (var i = 1; i <=5; i++) {
  var cell = document.getElementById("left_arrow_pos_"+i);
  cell.style.width = w/9 +"px";
  cell.style.height = w/9 +"px";
  cell.style.top = w/9*(i+1) +"px";
  cell.style.left = w/9 - vmin(2)+"px";
  cell.style.color="green";
  cell.style.border = "0.1vmin solid #00FF00";
  cell.style.marginRight="2vmin";
  cell.style.fontSize=w/18 +"px";

  cell = document.getElementById("right_arrow_pos_"+i);
  cell.style.width = w/9 +"px";
  cell.style.height = w/9 +"px";
  cell.style.top = w/9*(i+1) +"px";
  cell.style.left = w/9 * 7 +"px";
  cell.style.color="blue";
  cell.style.border = "0.1vmin solid #0000FF";
  cell.style.marginLeft="2vmin";
  cell.style.fontSize=w/18 +"px";

  cell = document.getElementById("up_arrow_pos_"+i);
  cell.style.width = w/9 +"px";
  cell.style.height = w/9 +"px";
  cell.style.top = w/9 - vmin(2) +"px";
  cell.style.left = w/9 * (i+1) +"px";
  cell.style.color="orange";
  cell.style.border = "0.1vmin solid #FFA500";
  cell.style.marginBottom="4vmin";
  cell.style.fontSize=w/18 +"px";

  cell = document.getElementById("down_arrow_pos_"+i);
  cell.style.width = w/9 +"px";
  cell.style.height = w/9 +"px";
  cell.style.top = w/9*7 +"px";
  cell.style.left = w/9 * (i+1) +"px";
  cell.style.color="red";
  cell.style.border = "0.1vmin solid #FF0000";
  cell.style.marginTop="2vmin";
  cell.style.fontSize=w/18 +"px";
  }


//setField();
}

function setField() {
  for (var i = 1; i <=5; i++) {
    for (var j = 1; j <=5; j++) {
      var d = document.createElement("div");
      d.id="word_"+i+"_pos_"+j;
      d.className="cell";
      
      document.getElementById("canvas").appendChild(d);
    }
  }

  for (var i = 1; i <=5; i++) {
    var d1 = document.createElement("div");
    d1.id="left_arrow_pos_"+i;
    d1.className="arrow";
    d1.innerText=String.fromCodePoint(9664);
    d1.addEventListener('click', shift);
    document.getElementById("canvas").appendChild(d1);

    var d2 = document.createElement("div");
    d2.id="right_arrow_pos_"+i;
    d2.className="arrow";
    d2.innerText=String.fromCodePoint(9654);
    d2.addEventListener('click', shift);
    document.getElementById("canvas").appendChild(d2);

    var d3 = document.createElement("div");
    d3.id="up_arrow_pos_"+i;
    d3.className="arrow";
    d3.innerText=String.fromCodePoint(9650);
    d3.addEventListener('click', shift);
    document.getElementById("canvas").appendChild(d3);

    var d4 = document.createElement("div");
    d4.id="down_arrow_pos_"+i;
    d4.className="arrow";
    d4.innerText=String.fromCodePoint(9660);
    d4.addEventListener('click', shift);
    document.getElementById("canvas").appendChild(d4);
  }
  resize();
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

function shift() {
  document.getElementById("res").style.display="none";
  document.getElementById("checkButton").disabled="";
  shifts +=1;
  console.log(this.id);
  var splitted = this.id.split('_');
  var direction = splitted[0];
  var index = splitted[3] - 1;
  if (direction == 'left') {
    var new_string =[' ',' ',' ',' ',' '];
    for (var i = 0; i < 5; i++) {
     new_string[(5+i-1)%5]=LETTERS[index][i];
    }
    LETTERS[index] = new_string;
    emojis+=String.fromCodePoint(8678);
  }
  if (direction == 'right') {
    var new_string =[' ',' ',' ',' ',' '];
    for (var i = 0; i < 5; i++) {
     new_string[(i+1)%5]=LETTERS[index][i];
    }     
    emojis+=String.fromCodePoint(8680);
    LETTERS[index] = new_string;
  }
  if (direction == 'up') {
    var new_string =[' ',' ',' ',' ',' '];
    for (var i = 0; i < 5; i++) {
     new_string[(5+i-1)%5]=LETTERS[i][index];
    }
    for (var i = 0; i < 5; i++)
    LETTERS[i][index] = new_string[i];

    emojis+=String.fromCodePoint(8679);

  }
  if (direction == 'down') {
    var new_string =[' ',' ',' ',' ',' '];
    for (var i = 0; i < 5; i++) {
     new_string[(i+1)%5]=LETTERS[i][index];
    }
    for (var i = 0; i < 5; i++)
    LETTERS[i][index] = new_string[i];

    emojis+=String.fromCodePoint(8681);
  }
  display_letters();
}

