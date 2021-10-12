import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


class PedCar {
    constructor(scene, num) {
        this.boxGeoms = [];
        this.cars = [];
        this.scene = scene;
        this.numCars = num;
        this.init();
    }

    init() {
        const that = this;
        const loader = new GLTFLoader();

        // for (let i = 0; i < this.numCars; i++) {
            // const that2 = that;
            loader.load("./src/assets/cars/pedCar/scene.gltf", function(gltf) {
                const pedCar = gltf.scene; 
                const min = Math.floor(-20);
                const max = Math.floor(5);
                const rando = Math.floor((Math.random() * (max - min) + min));

                const min2 = Math.floor(100);
                const max2 = Math.floor(450);
                const rando2 = Math.floor((Math.random() * (max2 - min2) + min2));
                pedCar.recieveShadow = true; 
                pedCar.scale.set(0.015, 0.015, 0.015);
                pedCar.position.set(rando, 0.3, rando2);


                pedCar.traverse( function(c) {
                    if (c.isMesh) {
                        // c.geometry.computeBoundingBox;
                        c.castShadow = true; 
                        c.recieveShadow = true; 
                    };

                    if (c.geometry) {
                        c.geometry.computeBoundingBox();
                    };
                });

                // handling the bounding box logic 
                const pedBox = new THREE.Box3().setFromObject(pedCar);

                // console.log( pedBox );

                that.boxGeoms.push(pedBox)
                that.cars.push(pedCar)

                // instantiating an instance of the object we just made 
                // and reusing it in order to optimize the amount of models we load
                // here we just load copies of models instead of before we were loading the same model 
                // multiple times
                for (let i = 0; i < (that.numCars-1); i++) {
                    // console.log(pedCar)
                    const clone = pedCar.clone();
                    that.cars.push(clone);
                    const boxClone = new THREE.Box3().setFromObject(clone);
                    that.boxGeoms.push(boxClone);
                    that.scene.add( clone );
                }

                that.scene.add( pedCar );
                
            }, 
            function(xhr) {
                console.log((xhr.loaded/xhr.total * 100) + '% Loaded'); 
            },
            function(error) {
                console.error(error);
            });
        // };

        

        
    }
}

export default PedCar;