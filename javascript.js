var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");



let imgHeight = 100;

let xOffset = 250;

const imgArray = [
["circle.png", "circle.png"],
["circle.png", "circle.png","circle.png"],
["circle.png", "circle.png"],["circle.png", "circle.png", "circle.png"],["circle.png", "circle.png", "circle.png"]];

function load()
{
  canvas.height = document.documentElement.clientHeight;
  canvas.width = "5000";
  SpawnCircle();
  DrawLines();
}

function SpawnCircle()
{
  for(let x = 0; x < imgArray.length; x++)
  {
    for(let y = 0; y < imgArray[x].length; y++)
    {
      var img = document.createElement('img');
      img.src = imgArray[x][y];
      let proficalculationofimghight = canvas.offsetHeight / (imgArray[x].length + 1);
      proficalculationofimghight = proficalculationofimghight *(y+1);
      img.style.position = "absolute";
      img.style.left = x * xOffset + 50 + "px";
      img.style.top = proficalculationofimghight + "px";;
      img.style.zIndex = 2;
      img.height = imgHeight;
      document.getElementById('continer').appendChild(img);
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
      line_x = x * xOffset + 50 + imgHeight/2;

      

      context.strokeStyle = "#005780";
      context.lineWidth = 1;

      if(imgArray[x+1] != null)
      {
        for(let z = 0; z < imgArray[x+1].length; z++)
        {
          let line2_y = canvas.offsetHeight / (imgArray[x+1].length + 1);
          line2_y = line2_y *(z+1) + imgHeight /2;
          line2_x = (x+1) * xOffset + 50 + imgHeight/2;
          


          context.beginPath();
          
          context.moveTo(line_x, line_y);
          context.lineTo(line2_x, line2_y);
          

          context.stroke();
        }
      } 
    }
  }
};

