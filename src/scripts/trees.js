import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Tree {
    constructor(scene, pos) {
        this.scene = scene; 
        this.pos = pos;
        this.trees = [];
        this.init();
    }

    init() {
        const that = this;
        const loader = new GLTFLoader();
        
        loader.load("./src/assets/models/treepurple.glb", function(glb) {
            that.tree = glb.scene;
            that.tree.receiveShadow = true; // Still working on lighting
            that.tree.scale.set(0.5, 0.5, 0.5);
            that.tree.position.set(that.pos, 0.3, 25);
                
            // Add shadows to everything that is related to the car (still trying to implement these with the lighting)
            that.tree.traverse( function(child) {
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

    newTree( pos ) {
            for (let i = 1; i < 11; i++) {
                const clone = this.tree.clone();
                clone.position.set(pos, 0.3, (i * 50));
                this.scene.add(clone);
                this.trees.push(clone); 
            }
    }
};

export default Tree;
