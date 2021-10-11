import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class WorldObjects {
    constructor() {
        this.position = new THREE.Vector3();
        this.collider = new THREE.Box3();

        this.loadmodel();
    }

    loadmodel() {
        const that = this; 
        const loader = new GLTFLoader(); 

        loader.load("./src/assets/car2/scene.gltf", function(gltf) {
            that.pedCar = gltf.scene; 
            that.pedCar.recieveShadow = true; 
            that.pedCar.position.set(5, 0.3, 5);

            that.pedCar.traverse( function(c) {
                if (c.isMesh) {
                    c.castShadow = true; 
                    c.recieveShadow = true; 
                };

                if (c.geometry) {
                    c.geometry.computeBoundingBox();
                };
            })
            
        }, 
        function(xhr) {
            console.log((xhr.loaded/xhr.total * 100) + '% Loaded'); 
        },
        function(error) {
            console.error(error);
        });
    }
}


export default WorldObjects