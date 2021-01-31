/*INCLUDES:
hsl to rgb to hex: https://codepen.io/enxaneta/pen/15d04eb1b8b68c95cd5298b46b2eabb8
Lea Verou's color contrast:
https://codepen.io/enxaneta/pen/729bdb57bcace876689066ba81417fc7
Input type range object for palette:
https://codepen.io/enxaneta/pen/623d2df0480cba649976132ec3413c08
*/
//var swatches = ["6ab150", "506ab1","6a50b1","#964fb0", "b1506a"];
//var swatches = ["2a80b9", "8f44ad","16a086", "f1c40f","e77e23"];
var swatches = ["#5F3152", "#874D6E", "#DCAB74", "#F4D8A0", "#5C9696"];

function buildHTML(swatches){
  var html = "";
for( var i = 0,len = Math.min(5, swatches.length); i < len; i++){  
html += '<div class="color" data-color="'+swatches[i]+'"><p></p><div class="controls"><div class="inputDiv h"></div><div class="inputDiv s"></div><div class="inputDiv l"></div></div></div>';}
  document.body.innerHTML = html;
}

buildHTML(swatches);


function display_hex(ry){
  return "#" + ry[0] + ry[1] + ry[2];
}

function display_rgb(ry){
  return "rgb(<i>" + Math.round(ry[0]) +"</i>, <i>"+  Math.round(ry[1]) +"</i>, <i>"+  Math.round(ry[2]) + "</i>)";
}

function display_hsl(ry){
  return "hsl(<i>" +  Math.round(ry[0]) +"</i>, <i>"+  Math.round(ry[1]) +"</i>%, <i>"+  Math.round(ry[2]) + "</i>%)";
}




var colors = document.querySelectorAll(".color");
var hexRy,rgbRy,hslRy;

for (var i = 0; i < colors.length; i++) {
  var p = colors[i].querySelector("p");
  hexRy = hex2ry(colors[i].dataset.color);
  rgbRy = hex2rgb(hexRy);
  hslRy = rgb2hsl(rgbRy);

  //create the hue input
  var h = new Input();
  h.att.max = 360;
  h.att.value = Math.round(hslRy[0]);
  h.create(colors[i].querySelector(".h"));
  inputsRy.push(h);
  //create the saturation input
  var s = new Input();
  s.att.value = Math.round(hslRy[1]);
  s.create(colors[i].querySelector(".s"));
  inputsRy.push(s);
  //create the l input
  var l = new Input();
  l.att.value = Math.round(hslRy[2]);
  l.create(colors[i].querySelector(".l"));
  inputsRy.push(l);

  var thisHex = display_hex(hexRy);
  var thisRgb = display_rgb(rgbRy);
  var thisHsl = display_hsl(hslRy);

  colors[i].style.backgroundColor = thisHex;
  colors[i].style.setProperty("--foo", thisHex);
  p.innerHTML = thisHex + "<br>";
  p.innerHTML += thisRgb + "<br>";
  p.innerHTML += thisHsl;
  getFontColor(rgbRy, colors[i]);

}

function updateDisplay() {
  
  for (var i = 0; i < colors.length; i++) {
    var p = colors[i].querySelector("p");
    var H = colors[i].querySelector(".h input").value;
    var S = colors[i].querySelector(".s input").value;
    var L = colors[i].querySelector(".l input").value;
    hslRy = [H, S, L];console.log(hslRy)
    rgbRy = hsl2rgb(hslRy);
    hexRy = hsl2hex(hslRy);

    var thisHex = display_hex(hexRy);
    var thisRgb = display_rgb(rgbRy);
    var thisHsl = display_hsl(hslRy);

    colors[i].style.backgroundColor = thisHex;
    colors[i].style.setProperty("--foo", thisHex);
    p.innerHTML = thisHex + "<br>";
    p.innerHTML += thisRgb + "<br>";
    p.innerHTML += thisHsl;
    getFontColor(rgbRy, colors[i]);

  }
}

for (var n = 0; n < inputsRy.length; n++) {
  //inputsRy[n].update();
  (function(n) {
    inputsRy[n].input.addEventListener("input", function() {
      inputsRy[n].update();
      updateDisplay()
    }, false)
  }(n));
}