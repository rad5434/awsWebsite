function generation() {
  num = parseInt(document.getElementById("num_of_generations").value); //number the user wants
  get3Ddata(num);   //this should get us the num in 3d
}

function checkdata(data){
    drawingSketches = JSON.parse(data) //make data global and then let draw parse it
    sketch(num,drawingSketches)
};

function get3Ddata(numberOfSketchesNeeded){
    var xhttp = new XMLHttpRequest();
    var url = "https://cbeeix86ff.execute-api.us-east-1.amazonaws.com/Final/"+num;
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200)
        checkdata(this.responseText);
    };
    xhttp.open("GET",  url, true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send();
};


function sketch(num,drawingSketches){
    var tempObject
    var count=0;
    var len=0;
    var temp=10;
    var sides
    var vertices
    console.log(drawingSketches)
    if(drawingSketches.results[count]){
        tempObject=drawingSketches.results[count];
        sides = tempObject[0].data.sides
        vertices = tempObject[0].data.vertices
    }
    var x=0
    var geometry=new Array(tempObject[0].data.sides)
    var material,cone
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/1.3, window.innerHeight/1.3);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    var light = new THREE.DirectionalLight(0xffffff, 0.55);
    light.position.set(0, 0, 1);
    scene.add(light);
    var scene_array= new Array(tempObject[count].data.sides);   //scene array will the size of the total sides
    //console.log(x)
    check();
    function check(){
	console.log(tempObject[0].data.sides[0].length)
	console.log("x")
	if(x>=0){
		/*x=0;
		count+=1
		tempObject=drawingSketches.results[count];
        	sides = tempObject[0].data.sides
        	vertices = tempObject[0].data.vertices
		scene_array= new Array(tempObject[count].data.sides);*/
		console.log("Finished")
		var loader = new THREE.OBJLoader();
		loader.load("80.obj", function(model) {
    model.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.color = 0xffb830;
        }
    });
    model.position.set(0, 0, -53);
    scene.add(model);
    window.model = model;
    render.render(scene, camera);
});
	}
	else{
	console.log(x)
        geometry[x] = new THREE.Geometry();    
            geometry[x].vertices.push(
              new THREE.Vector3((vertices[0][sides[0][len]]),(vertices[1][sides[0][len]]),(vertices[2][sides[0][len]])),
              new THREE.Vector3((vertices[0][sides[1][len]]),(vertices[1][sides[1][len]]),(vertices[2][sides[1][len]])),
              new THREE.Vector3((vertices[0][sides[2][len]]),(vertices[1][sides[2][len]]),(vertices[2][sides[2][len]]))
            );
	    console.log((vertices[0][sides[0][len]]),(vertices[1][sides[0][len]]),(vertices[2][sides[0][len]]));
            console.log((vertices[0][sides[1][len]]),(vertices[1][sides[1][len]]),(vertices[2][sides[1][len]]));
	    console.log((vertices[0][sides[2][len]]),(vertices[1][sides[2][len]]),(vertices[2][sides[2][len]]))
	    len=len+1
	    geometry[x].faces.push(new THREE.Face3(0,1,2));
            geometry[x].computeBoundingSphere();
        material = new THREE.MeshBasicMaterial({color: 0xF8F8FF});
        scene_array[x] = new THREE.Mesh(geometry[x], material );
        scene.add(scene_array[x]);
        x=x+1
        setTimeout(check, 10); // check again in a second
	}
    }

    var render = function () {
        requestAnimationFrame(render);
	//console.log(scene_array[0].rotation.x)
	/*if (x%20==0){
        scene_array[0].rotation.x += 0.02;
        scene_array[0].rotation.y += 0.02;
        for(var i=1;i<x;i++){           //goes up to the value of x
            scene_array[i].rotation.x = scene_array[0].rotation.x;
            scene_array[i].rotation.y = scene_array[0].rotation.y;
        }
	}*/
        renderer.render(scene, camera);

    };
    render();

}
