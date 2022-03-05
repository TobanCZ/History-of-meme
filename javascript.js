var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");


let imgHeight = 80; //tady mas velikost obrayzku

let xOffset = 250; //jak daleko mezi sebou to bude
let startXoffset = 100; //jak daleko to bude z leve strany

var data;

var imgArray = [];

async function load()
{
  await loadJSON(function(response) {
      data = JSON.parse(response);
      Draw();
   });
}

function Draw()
{
  canvas.height = document.documentElement.clientHeight;
  canvas.width = "5000";

  CreateImageArray()
  SpawnCircle();
  DrawLines();
}

function CreateImageArray()
{
  var year = 0;
  var temp = -1;

  var imagedata = data.images[0];
  console.log(imagedata);

  for(let i = 0; i < imagedata.length ; i++)
  {
    if(imagedata[i][2] > year)
    {
      year = imagedata[i][2];
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

      

      context.strokeStyle = "#005780"; //tady mas barvicku cary
      context.lineWidth = 1; //tady mas tloustku cary

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

