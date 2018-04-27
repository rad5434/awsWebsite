function generation() {
  num = parseInt(document.getElementById("num_of_generations").value); //number the user wants
  //document.getElementById("generate_2D").style.background = "gray";
  //document.getElementById("storage").style.background = "";
  get3Ddata(num);	//this should get us the num in 3d
}

function checkdata(data){
	//console.log("In Checkdata from get3Ddata");
	drawingSketches = JSON.parse(data) //make data global and then let draw parse it
	//console.log("Recieved 3D data from GANdb");
	//console.log(drawingSketches);
	var custom_p5 = new p5(sketch, num,drawingSketches ,'sketch');
};

function get3Ddata(numberOfSketchesNeeded){
	//console.log("In get3Ddata from generation");
	var xhttp = new XMLHttpRequest();
    var url = "https://cbeeix86ff.execute-api.us-east-1.amazonaws.com/Final/"+num;
	//console.log("Ready to recieve GanDB 3D data")
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200)
        checkdata(this.responseText);
    };
    xhttp.open("GET",  url, true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send();
};


var sketch = function(p,num,drawingSketches){

    //console.log("My sketch Object");
    //console.log(drawingSketches)
    var tempObject
    var count=0;
    var len=0;
    var temp=10;
    var sides
    var vertices
    p.setup = function() {
        p.createCanvas(1200,1200);
        p.stroke(255);     // Set line drawing color to white
        p.frameRate(30);
        //console.log("Setup is finished");
    };


    p.draw = function() {

        if(count!=num){ //count is the nth boat that is currently being drawn
            if(drawingSketches){
                //console.log("Below is drawingSketches");
                //console.log(drawingSketches);
                if(drawingSketches.results[count]){
                    tempObject=drawingSketches.results[count];
                    sides = tempObject[0].data.sides
                    vertices = tempObject[0].data.vertices
                }
                p.frameRate(50);
                var z = p.color('black');
                p.stroke(z);
                if(len<sides[0].length){    //need to do 3 lines per iteration (trianlge). currently we only have 1

                    //p.line(((vertices[0].x_data[len]/2)*35)+300, (tempObject.y_data[len]/2)+300, (t(empObject.x_data[len+1]/2)*35)+300, (tempObject.y_data[len+1]/2)+300);
                    p.line((vertices[0][sides[0][len]]*35)+300,(vertices[1][sides[0][len]]*35)+300,(vertices[2][sides[0][len]]*35)+300,(vertices[0][sides[1][len]]*35)+300,(vertices[1][sides[1][len]]*35)+300,(vertices[2][sides[1][len]]*35)+300)
                    p.line((vertices[0][sides[1][len]]*35)+300,(vertices[1][sides[1][len]]*35)+300,(vertices[2][sides[1][len]]*35)+300,(vertices[0][sides[2][len]]*35)+300,(vertices[1][sides[2][len]]*35)+300,(vertices[2][sides[2][len]]*35)+300)
                    p.line((vertices[0][sides[2][len]]*35)+300,(vertices[1][sides[2][len]]*35)+300,(vertices[2][sides[2][len]]*35)+300,(vertices[0][sides[0][len]]*35)+300,(vertices[1][sides[0][len]]*35)+300,(vertices[2][sides[0][len]]*35)+300)
                    len+=1;
                }
                else{
                  console.log("ready for another one")
                  len=0;
                  count=count+1;
                  p.background('white');
                }
            }
        }
    };
}

//console.log(tempObject);
//console.log(tempObject[0].data);//This gives me the data block
//console.log(tempObject[0].data.sides[0])//This gives me the first array of sides
//console.log(tempObject[0].data.vertices[0])// And this gives the first array of vertices
