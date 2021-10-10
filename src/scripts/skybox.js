import * as THREE from "three";

//1. Load each image as a Texture
//2. Map each Texture to a Material array
//3. Add Material array to the Skybox cube

class Skybox {
    constructor(width, height, depth, filename) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        const material = this.createMaterials(filename);

        this.box = new THREE.Mesh( this.geometry, material );
    }

    createMaterials(filename) {
        const paths = this.loadPaths(filename);
        const materials = paths.map(image => {
            let texture = new THREE.TextureLoader().load(image);

            // console.log(image);

            //instead of returning hte texture we just want to return a mesh that's made of basic material
            // with our texture files mapped to it
            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        })

        // console.log(materials);

        return materials;
    }

    loadPaths(filename) {
        const base = `./src/assets/skybox/${filename}/${filename}`;
        // choosing png because this is how my assets are
        const type = ".png";
        const sides = ['ft','bk', 'up', 'dn', 'rt', 'lf'];
        const finalPaths = sides.map(side => {
            return base + "_" + side + type;
        })

        return finalPaths
    }
}

export default Skybox;