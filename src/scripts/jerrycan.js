import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class JerryCan {
    constructor(scene, pos) {
        this.scene = scene; 
        this.pos = pos;
        this.cans = [];
        this.init();
    }

    init() {
        const that = this;
        const loader = new GLTFLoader();
        
        loader.load("./src/assets/models/jerry.glb", function(glb) {
            that.jerryCan = glb.scene;
            that.jerryCan.receiveShadow = true; // Still working on lighting
            that.jerryCan.scale.set(0.5, 0.5, 0.5);
            that.jerryCan.position.set(that.pos, 0.3, 25);
                
            // Add shadows to everything that is related to the car (still trying to implement these with the lighting)
            that.jerryCan.traverse( function(child) {
                // Make sure to only add shadows to meshes
                if (child.isMesh){
                    child.castShadow = true; 
                    child.receiveShadow = true;
                };
            });
        },
        // Boilerplate
        // function(xhr) {
        //     // console.log((xhr.loaded/xhr.total * 100) + "% Loaded");
        // }, function(error) {
        //     // console.error(error);
        // }
        );
    };

    newJerry( pos ) {
            for (let i = 1; i < 11; i++) {
                const clone = this.jerryCan.clone();
                clone.position.set(pos, 0.3, (i * 50));
                this.scene.add(clone);
                this.cans.push(clone); 
            }
    }
};

export default JerryCan;