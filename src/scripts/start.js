import * as THREE from "three"

class StartWorld {
    constructor() {
        this.projector = new THREE.Projector();
        this.mouseVector = new THREE.Vector3();
        window.addEventListener( 'mousemove', onMouseMove, false ); 
    }
}