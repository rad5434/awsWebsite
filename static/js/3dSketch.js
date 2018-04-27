function generation() {
  num = parseInt(document.getElementById("num_of_generations").value); //number the user wants
  document.getElementById("generate_2D").style.background = "gray";
  document.getElementById("storage").style.background = "";
  get3Ddata(num);	//this should get us the num in 3d
}

function checkdata(data){
	console.log("In Checkdata from get3Ddata");
	drawingSketches = JSON.parse(data) //make data global and then let draw parse it
	console.log("Recieved 3D data from GANdb");
	console.log(drawingSketches);
	var custom_p5 = new p5(sketch, num,drawingSketches ,'sketch');
};

function get3Ddata(numberOfSketchesNeeded){
	console.log("In get3Ddata from generation");
	var xhttp = new XMLHttpRequest();
    var url = "https://cbeeix86ff.execute-api.us-east-1.amazonaws.com/Final/"+num;
	console.log("Ready to recieve GanDB 3D data")
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200)
        checkdata(this.responseText);
    };
    xhttp.open("GET",  url, true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send();
};


var sketch = function(p,num,drawingSketches){

    console.log("My sketch Object");
    console.log(drawingSketches)
    var tempObject
    var unitySketchObject=[];
    var count=0;
    var len=0;
    var y_axis=[]
    var temp=10;
    var randnum = Math.floor((Math.random() * 90) + 1);
    var flag=0;
    var anotherflag=0;
    for (var i=0; i<num;i++){
        y_axis.push(temp);
        temp=temp+100
    }
    p.setup = function() {
        p.createCanvas(800, 800);
        p.stroke(255);     // Set line drawing color to white
        p.frameRate(30);
        console.log("Setup is finished");
    };


    p.draw = function() {

        if(count!=num){
            if(drawingSketches){
                console.log("Below is drawingSketches");
                console.log(drawingSketches);
                if(sketchObject.results[count]){
                    tempObject=sketchObject.results[count];
                    console.log(tempObject);
                    count=count+1; //remove this later
                }
                /*var i =0;
                p.frameRate(12);
                var z = p.color('black');
                p.stroke(z);
                if(len<tempObject.x_data.length){
                    p.line((tempObject.x_data[len]/2)+200, (tempObject.y_data[len]/2)+300, (tempObject.x_data[len+1]/2)+200, (tempObject.y_data[len+1]/2)+300);
                    len+=2;
                }
                else{
                  len=0;
                  count=count+1;
                }*/
            }
        }
    };

}