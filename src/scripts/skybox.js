import * as THREE from "three";

//1. Load each image as a Texture
//2. Map each Texture to a Material array
//3. Add Material array to the Skybox cube

class Skybox {
    constructor(width, height, depth, filename) {
        // Without this we error out in the console saying that our skybox is not 
        // actually a 3d object
        // this.sky = new THREE.Group();
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        const material = this.createMaterials(filename);

        // console.log(material);
        this.box = new THREE.Mesh( this.geometry, material );

        // this.sky.add(this.box)

        
    }

    createMaterials(filename) {
        const paths = this.loadPaths(filename);
        const materials = paths.map(image => {
            let texture = new THREE.TextureLoader().load(image);

            // console.log(image);

            //instead of returning hte texture we just want to return a mesh that's made of basic material
            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        })

        // console.log(materials);

        return materials;
    }

    loadPaths(filename) {
        const base = `./src/assets/skybox/${filename}/`;
        const basePath = base + filename;
        // choosing png because this is easy
        const type = ".png";
        const sides = ['ft','bk', 'up', 'dn', 'rt', 'lf'];
        const finalPaths = sides.map(side => {
            return basePath + "_" + side + type;
        })

        return finalPaths
    }
}

export default Skybox;