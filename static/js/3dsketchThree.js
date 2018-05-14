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
    var geometry,material,cone
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/3, window.innerHeight/3);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    var light = new THREE.DirectionalLight(0xffffff, 0.55);
    light.position.set(0, 0, 1);
    scene.add(light);
    var scene_array= new Array(tempObject[0].data.sides);   //scene array will the size of the total sides
    check();

    function check(){
        if(x==0){
            geometry = new THREE.Geometry();    
                geometry.vertices.push(
                  new THREE.Vector3((vertices[0][sides[0][len]]*10)+200,(vertices[1][sides[0][len]]*10)+200,(vertices[2][sides[0][len]]*10)+200),
                  new THREE.Vector3((vertices[0][sides[1][len]]*10)+200,(vertices[1][sides[1][len]]*10)+200,(vertices[2][sides[1][len]]*10)+200),
                  new THREE.Vector3((vertices[0][sides[2][len]]*10)+200,(vertices[1][sides[2][len]]*10)+200,(vertices[2][sides[2][len]]*10)+200)
                );
                geometry.faces.push(new THREE.Face3(0,1,2));
                geometry.computeBoundingSphere();
            material = new THREE.MeshBasicMaterial({color: 0xffff00});
            scene_array[x] = new THREE.Mesh(geometry, material );
            scene.add(scene_array[x]);
            x=x+1
            setTimeout(check, 1000); // check again in a second
            //check()
        }
    }

    var render = function () {
        requestAnimationFrame(render);
        scene_array[0].rotation.x += 0.01;
        scene_array[0].rotation.y += 0.01;
        for(var i=1;i<x;i++){           //goes up to the value of x
            scene_array[i].rotation.x = scene_array[0].rotation.x += 0.01;
            scene_array[i].rotation.y = scene_array[0].rotation.y += 0.01;
        }
        renderer.render(scene, camera);

    };
    render();

}