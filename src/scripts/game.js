// Added for developer purposes not intending to keep
import THREE from "../../node_modules/three/build/three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


// Game class to hold all game logic
class Game {
    constructor() {
        this.init();
    }

    //constructor function handling too much logic so I put a lot of it into
    // an initialization method
    init() {
        const that = this; 

        // Create scene and camera to be rendered later
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
        this.camera.position.set(1, 1, 5); 

        // Remember to select the canvas to render to and hand it to the renderer
        const canvas = document.querySelector("#game");

        // Create renderer to render and handle our scene
        this.renderer = new THREE.WebGLRenderer({
            canvas, 
            alpha: true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement ); 

        // Create lighting for more reflictive and ambient effect
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10); 
        // Create soft ambient lighting
        const ambient = new THREE.AmbientLight( 0x707070 );

        // So I can view and move around the plane while I work
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.scene.add( light, ambient ); 

        //Choosing to utilize GLTFLoader to work with assets
        const loader = new GLTFLoader();

        // takes in a destination url for assets, what to do on the load, what to do during the load
        // and what to do if there is an error
        loader.load("/src/assets/musclepack.fbx", function(objects) {
            // ran into a dependancy issue said that you need fflate 
            const cars = objects.array;
            that.playerCar = object[0];
            that.scene.add( playerCar ); 
            // might need to update or set controls for the actual car here 

            // add shadows to everything that is related to the car
            playerCar.traverse( function(child) {
                // make sure to only add shadows to meshes
                if (child.isMesh){
                    child.castShadow = true; 
                    child.recieveShadow = true;
                };
            });

                // animate the whole game once the actual file we are loading has loaded
                that.animate();

        }, null, function(error) {
            console.error(error);
        });
        
    }

    // will have an animate function to actually render and animate everything
    // this function is equivelant to our game loop

    animate() {
        const that = this; 

        //needs to be passed in this way otherwise it won't work 
        requestAnimationFrame( function() { that.animate(); } );

        this.controls.update();

        this.renderer.render ( this.scene, this.camera );
    };
};

export default Game;