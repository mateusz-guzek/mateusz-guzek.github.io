import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';


const scene = new THREE.Scene()
scene.fog = new THREE.Fog( 0xcccccc, 5, 30)
scene.background = new THREE.Color(0xcccccc)
const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)





window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


{

    const color = 0xFFFFFF;
    const intensity = 10;
    const light = new THREE.SpotLight( color, intensity );
    light.decay = 1.2
    light.angle = 1.5
    light.penumbra = 0.5
    light.castShadow = true
    //light.position.set( - 1, 2, 4 );
    camera.add( light );
    scene.add(camera)


}

function createCube(x,y,z, color, size, texture) {

    const material = new THREE.MeshLambertMaterial({color: color})
    material.reflectivity = 0
    const geometry = new THREE.IcosahedronGeometry(size/1.5)
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    const pos_variationx = rand(-7,7)
    const pos_variationy = rand(-7,7)
    const pos_variationz = rand(-7,7)
    const rot_variationx = rand(-20,20)
    const rot_variationy = rand(-90,90)
    const rot_variationz = rand(-90,90)
    cube.position.x = pos_variationx
    cube.position.z = pos_variationz
    cube.position.y = pos_variationy
    cube.rotateX(rot_variationx/180)
    cube.rotateY(rot_variationy/180)
    cube.rotateZ(rot_variationz/180)
    return cube
}

const cubes = []

for(let x=-2; x<=2;x++) {
    for(let y=-2;y<=2;y++) {
        for(let z=-2;z<=2;z++) {
            const hue = rand(0,360)
            cubes.push(createCube(x,y,z,new THREE.Color(`hsl(${hue},100%,50%)`),0.70))
        }
    }
}

const controls = new DragControls( cubes, camera, renderer.domElement );

{
const clock = new THREE.Clock();
let rotationId = null
controls.addEventListener('hoveron', (event) => {
    clock.start()
    const hoveredCube = event.object;
    
    const rotationSpeed = 1.0; // Adjust the rotation speed as desired
    const rotationAxis = new THREE.Vector3(0.5, 0.5, -0.5); // Rotation axis
    
    
    // Function to update cube rotation
    function updateRotation() {
        const elapsedTime = clock.getDelta();

        const rotationAmount = rotationSpeed * elapsedTime;
        
        hoveredCube.rotateX(rotationAxis.x * rotationAmount)
        hoveredCube.rotateY(rotationAxis.y * rotationAmount)
        hoveredCube.rotateZ(rotationAxis.z * rotationAmount)
        
        // Keep updating the rotation
        rotationId = requestAnimationFrame(updateRotation);
    }
    
    // Start updating the rotation
    updateRotation();
});

controls.addEventListener('hoveroff', () => {
    if (rotationId !== null) {
        cancelAnimationFrame(rotationId);
        rotationId = null;
    }
});
}

// function rotateCubes(time) {
//     cubes.forEach((cube, index) => {
//         const rot = time * (0.05)
//         // cube.rotation.x = rot
//         // cube.rotation.y = rot
//         //const target = camera.position.clone()
//         //cube.lookAt(target)
//     })
    
// }

function explodeCubes(time) {
    cubes.forEach((cube, index) => {

    } )
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

const cam_distance = 5


camera.position.z = cam_distance
function animate(time) {
    time *= 0.001;
    camera.position.y = Math.sin(time*0.1)*5
    camera.position.x = cam_distance*Math.sin(time * 0.1)
    camera.position.z = cam_distance*Math.cos(time * 0.1)
    camera.lookAt(0,0,0)




    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)