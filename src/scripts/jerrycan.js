import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class JerryCans {
    constructor(scene) {
        this.scene = scene; 
        this.cans = [];
        this.boxGeoms = [];
        this.init();
    }

    init() {
        const that = this;
        const loader = new GLTFLoader();
        
        loader.load("./src/assets/models/jerry.glb", function(glb) {
            that.jerryCan = glb.scene;
            that.jerryCan.receiveShadow = true; // Still working on lighting
            const min = Math.floor(-20);
            const max = Math.floor(5);
            const rando = Math.floor((Math.random() * (max - min) + min));

            const min2 = Math.floor(400);
            const max2 = Math.floor(600);
            const rando2 = Math.floor((Math.random() * (max2 - min2) + min2));
            that.jerryCan.scale.set(1.0, 1.0, 1.0);
            that.jerryCan.position.set(rando, 1.5, rando2);
                
            // Add shadows to everything that is related to the car (still trying to implement these with the lighting)
            that.jerryCan.traverse( function(child) {
                // Make sure to only add shadows to meshes
                if (child.isMesh){
                    child.castShadow = true; 
                    child.receiveShadow = true;
                };
                if (child.geometry) {
                    child.geometry.computeBoundingBox();
                };
            });

            that.scene.add( that.jerryCan ); 
        },
        // Boilerplate
        function(xhr) {
            console.log((xhr.loaded/xhr.total * 100) + "% Loaded");
        }, function(error) {
            console.error(error);
        }
        );
    };

    newJerry() {
        if (this.jerryCan) {
            const clone = this.jerryCan.clone();
            this.cans.push(clone);
            const boxClone = new THREE.Box3().setFromObject(clone);
            this.boxGeoms.push(boxClone);
            this.scene.add( clone );
        }
    }

    reset() {
        for (let i = 0; i < this.cans.length; i++) {
            const min = Math.floor(-20);
            const max = Math.floor(5);
            const rando = Math.floor((Math.random() * (max - min) + min));

            const min2 = Math.floor(100);
            const max2 = Math.floor(450);
            const rando2 = Math.floor((Math.random() * (max2 - min2) + min2));
            this.cans[i].position.set(rando, 0.3, rando2);
        }
    }
};

export default JerryCans;