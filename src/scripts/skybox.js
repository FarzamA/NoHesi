import * as THREE from "three";

// Skybox Creation
class Skybox {
    // Try to keep it within the constraints of image for better quality and less clipping
    constructor(width, height, depth, filename) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        const material = this.createMaterials(filename);

        this.box = new THREE.Mesh( this.geometry, material );
    }

    // Mapping the array to a basic material(non reflective) and setting our images as the textures
    createMaterials(filename) {
        const paths = this.loadPaths(filename);
        const materials = paths.map(image => {
            let texture = new THREE.TextureLoader().load(image);

            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        })
        return materials;
    }

    // Creating file paths to skybox images
    loadPaths(filename) {
        const base = `./src/assets/skybox/${filename}/${filename}`;
        const type = ".png";
        const sides = ['ft','bk', 'up', 'dn', 'rt', 'lf'];
        const finalPaths = sides.map(side => {
            return base + "_" + side + type;
        });

        return finalPaths
    }
}

export default Skybox;