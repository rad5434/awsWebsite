function generation() {
  num = parseInt(document.getElementById("num_of_generations").value); //number the user wants
  document.getElementById("generate_2D").style.background = "gray";
  document.getElementById("storage").style.background = "";
  //sendNumUnityDB(num);	we are not sending the num to Unity	
  

  get3Ddata(num);	//this should get us the num in 3d
  //getdata(checkdata);
}

function checkdata(data){
	console.log("In Checkdata from get3Ddata");
	drawingSketches = JSON.parse(data) //make data global and then let draw parse it
	console.log("Recieved 3D data from GANdb");
	console.log(drawingSketches);
	//var custom_p5 = new p5(sketch, num,drawingSketches ,'sketch');
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
