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
    console.log(drawingSketches)
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
    check();

    function check(){
        if(x==0){
            geometry = new THREE.Geometry();    
                geometry.vertices.push(
                  new THREE.Vector3(-1,1,0),
                  new THREE.Vector3(-1,-1,0),
                  new THREE.Vector3(1,-1,0)
                );
                geometry.faces.push(new THREE.Face3(0,1,2));
                geometry.computeBoundingSphere();
            material = new THREE.MeshBasicMaterial({color: 0xffff00});
            cone1 = new THREE.Mesh(geometry, material );
            scene.add(cone1);
            x=1
            check()
        }
        else if(x==10){
            mygeometry = new THREE.Geometry();    
                mygeometry.vertices.push(
                  new THREE.Vector3(1,-1,0),
                  new THREE.Vector3(1,1,0),
                  new THREE.Vector3(-1,1,0)
                );
                mygeometry.faces.push(new THREE.Face3(0,1,2));
                mygeometry.computeBoundingSphere();
                material = new THREE.MeshBasicMaterial({color: 0xffff00});
                cone = new THREE.Mesh(mygeometry, material );
                scene.add(cone);

        }
        else {
            console.log(x)
            x=x+1
            setTimeout(check, 1000); // check again in a second

        }
    }

    var render = function () {
        requestAnimationFrame(render);
        cone1.rotation.x += 0.01;
        cone1.rotation.y += 0.01;
        if (x==10){
            cone.rotation.x = cone1.rotation.x
            cone.rotation.y = cone1.rotation.y 
        }
        renderer.render(scene, camera);

    };
    render();

}