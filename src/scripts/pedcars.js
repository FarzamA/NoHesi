import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


class Peds {
    constructor(scene) {
        this.boxGeoms = [];
        this.cars = [];
        this.scene = scene;
        this.init();
    }

    init() {
        const that = this;
        const loader = new GLTFLoader();
        loader.load("./src/assets/cars/pedCar/scene.gltf", function(gltf) {
            that.pedCar = gltf.scene; 
            const min = Math.floor(-20);
            const max = Math.floor(5);
            const rando = Math.floor((Math.random() * (max - min) + min));

            const min2 = Math.floor(400);
            const max2 = Math.floor(600);
            const rando2 = Math.floor((Math.random() * (max2 - min2) + min2));
            that.pedCar.recieveShadow = true; 
            that.pedCar.scale.set(0.015, 0.015, 0.015);
            that.pedCar.position.set(rando, 0.3, rando2);


            that.pedCar.traverse( function(c) {
                if (c.isMesh) {
                    c.castShadow = true; 
                    c.recieveShadow = true; 
                };

                if (c.geometry) {
                    c.geometry.computeBoundingBox();
                };
            });
                
        }, 
        // function(xhr) {
        //     // console.log((xhr.loaded/xhr.total * 100) + '% Loaded'); 
        // },
        // function(error) {
        //     // console.error(error);
        // }
        );
    }

    newCar() {
        if (this.pedCar) {
            const clone = this.pedCar.clone();
            this.cars.push(clone);
            const boxClone = new THREE.Box3().setFromObject(clone);
            this.boxGeoms.push(boxClone);
            this.scene.add( clone );
        }
    }

    reset() {
        for (let i = 0; i < this.cars.length; i++) {
            const min = Math.floor(-20);
            const max = Math.floor(5);
            const rando = Math.floor((Math.random() * (max - min) + min));

            const min2 = Math.floor(100);
            const max2 = Math.floor(450);
            const rando2 = Math.floor((Math.random() * (max2 - min2) + min2));
            this.cars[i].position.set(rando, 0.3, rando2);
        }
    }
}

export default Peds;