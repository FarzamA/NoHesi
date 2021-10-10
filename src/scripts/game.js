// Added for developer purposes not intending to keep
import * as THREE from "three"
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Skybox from "./skybox";


// Game class to hold all game logic
class Game {
    // create scene with inital controls
    constructor() {
        this.init();
        this.skybox = new Skybox(1100, 1100, 1100, 'retrosun');
        this.lights();
        this.plane();
        this.loadAssets();

        this.road();
        
        this.setupControls();
        this.scene.add( this.skybox.box );
    }
    
    //initialization method needs to be more compartamentalized --- BREAK THIS DOWN
    init() {
        // Create scene and camera to be rendered later
        this.scene = new THREE.Scene();
        // Set the background of the scene
        // this.scene.background = new THREE.Color(0, 0, 0)
        // dev purposes
        this.scene.add( new THREE.AxesHelper(5) );
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // adjust height to make it seem like head height
        this.camera.position.y = 3; 
        this.camera.position.z = 2; 

        //rotating initial camera to start off facing the sunset might change later
        this.camera.rotateY(-Math.PI);
        
        // Grab the things we need from index.html
        const canvas = document.querySelector("#game");
        
        // Create renderer to render and handle our scene
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement ); 
        
        // Adding fps/ms/other resource tracker 
        this.stats = Stats(); 
        document.body.appendChild(this.stats.dom)
    };

    
    // Create lighting
    lights() {
        const light = new THREE.DirectionalLight(0xffffff, 3);
        const helper = new THREE.DirectionalLightHelper( light, 5 );
        // const ambient = new THREE.AmbientLight( 0x707070 );
        light.position.set(2, 10, 5); 
        
        this.scene.add( light, helper ); 
    };
    
    // Create a basic plane
    plane() {
        // making a plane for the game to be staged on 
        const geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100); 
        // Rotating the plane to make it flat by 90 degrees around the x axis
        geometry.rotateX(-Math.PI * 0.5);

        const color = new THREE.Color("rgb(0, 65, 171)");

        // threejs comes with mad materials explore these for materials of your car, also takes a color as an option
        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, wireframe: true } );

        material.opacity = 0.5;
        material.transparent = true;

        // to make the actual plane you create a mesh passing in the geometry and the material 
        // a mesh like a mesh between the two
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(0, 0, 0);

        this.scene.add( plane );
    }

    //thinking about maing this road into its own little class 

    road() {
        const geometry = new THREE.PlaneGeometry(30, 1000, 100, 100);

        geometry.rotateX(-Math.PI * 0.5);

        const color = new THREE.Color("rgb(21, 12, 28)");

        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide });

        const road = new THREE.Mesh( geometry, material );

        road.position.set(0, 0.3, 0);

        this.scene.add( road );
    }

    setupControls() {
        const menu = document.querySelector("#menu");
        const startButton = document.querySelector("#start-button");
        
        
        const controls = new PointerLockControls( this.camera, this.renderer.domElement );
        startButton.addEventListener("click", function() {
            controls.lock();
        }, false);
        

        // need this in order to be able to focus in and out of start menu 
        controls.addEventListener('lock', function() {
            menu.style.display = 'none';
        }); 
        controls.addEventListener('unlock', () => (menu.style.display = 'block'));

        // make keyboard controls for pointer locked splash screen \
        // event returns the **KEYCODE**
        const onKeyDown = function(event) {
            switch(event.code) {
                case "KeyW":
                    controls.moveForward(0.25);
                    break; 
                case "KeyA":
                    controls.moveRight(-0.25);
                    break;
                case "KeyS":
                    controls.moveForward(-0.25);
                    break;
                case "KeyD":
                    controls.moveRight(0.25);
                    break;
            };
        };

        document.addEventListener('keydown', onKeyDown, false);
    }

    //Choosing to utilize GLTFLoader to work with assets
    loadAssets() {
        const that = this;
        const loader = new GLTFLoader();
        
        // takes in a destination url for assets, what to do on the load, what to do during the load
        // and what to do if there is an error
        loader.load("./src/assets/scene.gltf", function(gltf) {
            // ran into a dependancy issue said that you need fflate 
            console.log(gltf);
            that.playerCar = gltf.scene;
            that.playerCar.position.set(2, 1.0, 5);
            // might need to update or set controls for the actual car here 
            
            // add shadows to everything that is related to the car
            that.playerCar.traverse( function(child) {
                // make sure to only add shadows to meshes
                if (child.isMesh){
                    child.castShadow = true; 
                    child.recieveShadow = true;
                };
            });
                    
            // animate the whole game once the actual file we are loading has loaded
            //that.animate();
            that.scene.add( that.playerCar ); 
                
            }, function(load) {
                console.log((load.loaded/load.total * 100) + "% Loaded");
            }, function(error) {
                console.error(error);
            });
            
    }

    // will have an animate function to actually render and animate everything
    // this function is equivelant to our game loop
    animate() {
        const that = this; 

        //needs to be passed in this way otherwise it won't work 
        requestAnimationFrame( function() { that.animate(); } );

        // this.controls.update();

        this.renderer.render ( this.scene, this.camera );
    };
};

export default Game;