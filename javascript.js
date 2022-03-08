var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");

var timeline_canvas = document.getElementById("timeline");
var timeline = timeline_canvas.getContext("2d");

var dot = document.getElementById("dot");


let imgHeight = 75; //tady mas velikost obrayzku

let xOffset = 250; //jak daleko mezi sebou to bude
let startXoffset = 130; //jak daleko to bude z leve strany

let timelineXoffset = 80;
let timelineHeight = 30;

let smoothscroll = 0.1;

var data;

let showinfo = false;

var imgArray = [];
var yearArray = [];

async function load()
{
  await loadJSON(function(response) {
      data = JSON.parse(response);
      Draw();
   });
}

function Draw()
{
  CreateImageArray();
  SetCanvas();
  SpawnCircle();
  DrawLines();
  DrawTimeline();
}

function SetCanvas()
{
  let profivypocetwidth = imgArray.length*xOffset + startXoffset;
  canvas.height = document.documentElement.clientHeight;
  canvas.width = profivypocetwidth;
  var particles = document.getElementsByClassName("particles-js-canvas-el");
  particles[0].style.width = profivypocetwidth + "px";
  timeline_canvas.width = document.body.offsetWidth;
}

function CreateImageArray()
{
  var year = 0;
  var temp = -1;

  var imagedata = data.images[0];

  for(let i = 0; i < imagedata.length ; i++)
  {
    if(imagedata[i][2] > year)
    {
      year = imagedata[i][2];
      yearArray.push(year);
      imgArray.push([]);
      temp++;
    }
    imgArray[temp].push(imagedata[i][0]);
  }
}

function SpawnCircle()
{
  for(let x = 0; x < imgArray.length; x++)
  {
    for(let y = 0; y < imgArray[x].length; y++)
    {
      var img = document.createElement('img');
      var div = document.createElement('div');
      var container = document.getElementById('continer');
      img.id = "obrazek"; //tady si nastavis id obrazku
      img.src = "icons/" + imgArray[x][y];
      let proficalculationofimghight = canvas.offsetHeight / (imgArray[x].length + 1);
      proficalculationofimghight = proficalculationofimghight *(y+1);
      div.style.position = "absolute";
      div.style.left = x * xOffset + startXoffset + "px";
      div.style.top = proficalculationofimghight + "px";;
      div.style.zIndex = 2;
      img.height = imgHeight;
      img.id =  imgArray[x][y].replace(".png","");
      var nameofmeme = imgArray[x][y].replace(".png","");
      var idkuz = "onMemeClick(" + nameofmeme + ")"
      img.setAttribute("onclick",idkuz)
      div.appendChild(img);
      container.style.position = "relative";
      container.appendChild(div);
    }
  }
}

function DrawLines()
{
  for(let x = 0; x < imgArray.length; x++)
  {
    for(let y = 0; y < imgArray[x].length; y++)
    {
      let line_y = canvas.offsetHeight / (imgArray[x].length + 1);
      line_y = line_y *(y+1) + imgHeight /2;
      line_x = x * xOffset + startXoffset + imgHeight/2;

      

      context.strokeStyle = "#ffffff"; //tady mas barvicku cary
      context.lineWidth = 1.5; //tady mas tloustku cary

      if(imgArray[x+1] != null)
      {
        for(let z = 0; z < imgArray[x+1].length; z++)
        {
          let line2_y = canvas.offsetHeight / (imgArray[x+1].length + 1);
          line2_y = line2_y *(z+1) + imgHeight /2;
          line2_x = (x+1) * xOffset + startXoffset + imgHeight/2;
          


          context.beginPath();
          
          context.moveTo(line_x, line_y);
          context.lineTo(line2_x, line2_y);
          

          context.stroke();
        }
      } 
    }
  }
};

function DrawTimeline()
{
  timeline.strokeStyle = "#ffffff"; //tady mas barvicku timeliny
  timeline.lineWidth = 1; //tady mas tloustku timeliny
  timeline.beginPath();       
  timeline.moveTo(timelineXoffset, timelineHeight);
  timeline.lineTo(document.body.offsetWidth - timelineXoffset, timelineHeight);
  timeline.stroke();

  var timeline_div = document.getElementById("timeline_div");

  for(let i = 0; i < yearArray.length; i++)
  {
    var year_div = document.createElement("div");
    year_div.id = "year_div";

    var h2 = document.createElement("h2");
    h2.innerHTML = yearArray[i];

    year_div.append(h2);
    timeline_div.append(year_div);
  }
  


  
  dot.style.top = timelineHeight - dot.offsetHeight /2 + "px";
  dot.style.left = timelineXoffset - dot.offsetWidth/2 + "px";

}

function dotUpdate()
{
  let maxscroll = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  let width_timeline = document.body.offsetWidth - 2*timelineXoffset

  var value = map_range(window.scrollX, 0,maxscroll,0,width_timeline)

  dot.style.left = value - dot.offsetWidth/2 + timelineXoffset + "px";;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'obrazky.json', true); 
  xobj.onreadystatechange = function () {
  if (xobj.readyState == 4 && xobj.status == "200") {
    callback(xobj.responseText);
  }
  };
  xobj.send(null);  
}

function onMemeClick(meme)
{
  meme = meme.id;
  showinfo = true;

  var div = document.getElementById("info");
  var blok = document.getElementById("blok");
  var title = data.info[meme].name;
  var h1 = document.getElementById("title");
  var p = document.getElementById("text");
  var text = data.info[meme].info;

  var images = document.getElementsByClassName("images");
  var temp = images.length;
  
 
  if(images!= null)
  {
      for(let x = 0; x < temp; x++)
    {
      console.log(x)
      blok.removeChild(images[0]);
    }
  }
  
  if(data.info[meme].memes.image[0] != "")
  {
    for(let i = 0; i < data.info[meme].memes.image.length; i++)
    {
    var memes = document.createElement("img")
    memes.src = "memes/" + data.info[meme].memes.image[i];
    memes.className = "images";
    blok.appendChild(memes);
    }
  }

  var yt = document.getElementsByClassName("yt");
  var temp = yt.length;
  
 
  if(yt!= null)
  {
      for(let x = 0; x < temp; x++)
    {
      console.log(x)
      blok.removeChild(yt[0]);
    }
  }

  if(data.info[meme].memes.yt != "")
  {
    var iframe = document.createElement("iframe")
    iframe.src = data.info[meme].memes.yt.replace("watch?v=","embed/");
    iframe.className = "yt";
    blok.appendChild(iframe);
  }
  

  h1.innerHTML = title;
  p.innerHTML = text;

  div.style.display = "inline";
  var screen = document.getElementById("screen");
  screen.style.display="inline";
}

function hide()
{
  var d = document.getElementById("info");
  d.style.display = "none";

  var yt = document.getElementsByClassName("yt");
  var temp = yt.length;
  
  showinfo = false;
 
  if(yt!= null)
  {
      for(let x = 0; x < temp; x++)
    {
      console.log(x)
      blok.removeChild(yt[0]);
    }
  }
  var screen = document.getElementById("screen");
  screen.style.display="none";
}

async function scroll(event)
{
  if(event != null && showinfo == false)
  {
    y = event.deltaY / 2+ window.scrollX;
    x = window.scrollX;
    temp = Math.abs(y - x);

    while(temp > 10)
    {
      if(window.scrollX != document.documentElement.scrollWidth - document.documentElement.clientWidth && x < y)
      {
        window.scrollBy(15, 0);
      }
      else if(window.scrollX != 0 && x > y)
      {
        window.scrollBy(-15, 0);
      }
      else
      {
        break;
      }

      
      x = window.scrollX;
      temp = Math.abs(y - x);
      dotUpdate();
      await sleep(5);

    }
    
  }
}

  document.addEventListener('wheel',scroll());
  window.onwheel = scroll;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }