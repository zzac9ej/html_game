function gamestart() {
  var window = document.getElementById("window");
  var bangs = document.getElementById("bangs");
  var point = document.getElementById("point");
  var stick = document.getElementById("stick");
  var start = document.getElementById("start");
  var begin = document.getElementById("begin");
  show(window);
  show(bangs);
  show(point);
  show(stick);
  show(start);
  show(begin);
}
function show (s) {
  if(s.style.display == 'black'){
    s.style.display = 'none';
  }
  else{
    s.style.display = 'black';
  }
}