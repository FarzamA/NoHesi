const THREE = require('three');
// Added for developer purposes not intending to keep
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Game class to hold all game logic
class Game {
    constructor() {
        // Grab our canvas element from index.html
        this.canvas = document.querySelector("#game");

        // Instantiate scene
        this.scene = new THREE.Scene(); 

        // Create a camera, might need multiple later for splash screen
        // Prespective Camera so that everything that is further away looks smaller
        this.camera = new THREE.PrespectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );

        // Pass in our canvas we initially grabbed so our game can be rendered on the canvas tag
        // Also allows us to style the canvas will utilize later to create skybox
        this.renderer = new THREE.WebGLRenderer({
            canvas, 
            alpha: true
        });

        // Set the size of the render I will be keeping everything in one scene so this works perfectly
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // this way things don't look too distored
        this.renderer.setPixelRatio( window.devicePixelRatio );

        document.body.appendChild( this.renderer.domElement );

        //adding this for now(developer purposes so I can look around while building)
        const controls = new OrbitControls( camera, this.renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // Phong material insead of lambert or basic for reflectiveness
        // 0x stands for a hexadecimal character
        const material = new THREE.MeshPhongMaterial( { color: 0x00aaff })

        const light = 
    }
}