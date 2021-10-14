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
        // let pos = 25;

        
            loader.load("./src/assets/models/treepurple.glb", function(glb) {
                that.tree = glb.scene;
                that.tree.recieveShadow = true; // Still working on lighting
                that.tree.scale.set(0.5, 0.5, 0.5);
                that.tree.position.set(that.pos, 0.3, 25);
                
                // Add shadows to everything that is related to the car (still trying to implement these with the lighting)
                that.tree.traverse( function(child) {
                    // Make sure to only add shadows to meshes
                    if (child.isMesh){
                        child.castShadow = true; 
                        child.recieveShadow = true;
                    };

                    // if (child.geometry) {
                    //     child.geometry.computeBoundingBox();
                    // };
                });

                // that.trees.push(that.tree);
                // for (let i = 1; i < 10; i++) {
                //     const clone = tree.clone();
                //     that.trees.push(clone);
                //     clone.position.set(18.5, 0.3, (i * 1000));
                //     // that.scene.add(clone);
                // }

                // console.log("-----");

                
                // console.log(that.trees);

                // Create Collider 
                // that.playerBox = new THREE.Box3().setFromObject(that.trees);
    
                // Add the car to the scene
                // that.scene.add( that.tree )
            },
            // Boilerplate
            function(xhr) {
                console.log((xhr.loaded/xhr.total * 100) + "% Loaded");
            }, function(error) {
                console.error(error);
            });


            // for (let i = 0; i < this.trees.length; i++) {
            //     this.scene.add(this.trees[i]);
            // }
        };

        // this.newTree.call(this, null);

    newTree( pos ) {
        // console.log(this.trees.tree);
        // const min = Math.floor(-200);
        // const max = Math.floor(200);
        // const random = Math.floor((Math.random() * (max - min) + min));

        console.log(this.tree);
        for (let i = 1; i < 11; i++) {
            const clone = this.tree.clone();
            // this.treesArr.push(clone);
            clone.position.set(pos, 0.3, (i * 50));
            this.scene.add(clone);
            this.trees.push(clone);
        }
    }
};

export default Tree;
