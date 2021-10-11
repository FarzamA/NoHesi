import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


class PedCar {
    constructor() {
        this.init();

        console.log(this.cars);
        console.log(this.boxGeoms);
    }

    init() {
        const that = this;
        const loader = new GLTFLoader();
        this.boxGeoms = [];
        this.cars = [];

        const arr = [1, 2, 3, 4];

        
    }
}

export default PedCar;