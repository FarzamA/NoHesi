import * as THREE from "three";
// import Stats from "three/examples/jsm/libs/stats.module";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Skybox from "./skybox";
import PedCar from "./pedcars";
import Sound from "./sounds";


// Game class to hold all game logic
class Game {
    // create scene with inital controls
    constructor() {
        const that = this;
        this.inGame = false;
        this.gameOver = false;

        this.init();

        this.skybox = new Skybox(900, 900, 900, 'retrosun');
        this.loadAssets();
        this.lights();


        this.plane();


        this.peds = new PedCar(this.scene, 20);

        this.isPaused = false;

        this.clock = new THREE.Clock();

        this.road();

        this.gameTimer = new THREE.Clock();
        this.scoreEle = document.createElement("p");
        
        this.sound = new Sound("track1.mp3");
        this.setupControls();
        this.scene.add( this.skybox.box );
    }
    
    //initialization method needs to be more compartamentalized --- BREAK THIS DOWN
    init() {
        // Create scene and camera to be rendered later
        this.scene = new THREE.Scene();
        // Set the background of the scene
        // this.scene.background = new THREE.Color(0, 0, 0)
        // dev purposes
        // this.scene.add( new THREE.AxesHelper(5) );
        this.camera = new THREE.PerspectiveCamera( 85, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // adjust height to make it seem like head height
        this.camera.position.set(0.3, 1.7, -3.0)

        //rotating initial camera to start off facing the sunset might change later
        this.camera.rotateY(-Math.PI);
        this.camera.rotateX(Math.PI*0.093);

        this.cameraController = new THREE.Object3D();
        this.cameraController.add( this.camera );
        this.cameraTarget = new THREE.Vector3(0, 0, 0);

        this.scene.add( this.cameraController );
        
        // Grab the things we need from index.html
        const canvas = document.querySelector("#game");
        
        // Create renderer to render and handle our scene
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement )
        
        this.renderer.domElement.addEventListener('click', this.rayCast.bind(this), false); 
    };

    
    // Create lighting
    // Lighting is necessary to bounce off of any loaded models
    lights() {
        
        const color = new THREE.Color("rgb(175,0,98)")
        // const color2 = new THREE.Color("rgb(219, 172, 0)")

        const light = new THREE.DirectionalLight(color, 1.0);

        // const light2 = new THREE.DirectionalLight(color2, 0.5);

        // const helper2 = new THREE.DirectionalLightHelper( light2, 5 );
        
        this.spotLight = new THREE.SpotLight(color, 2);
        this.spotLight.castShadow = true;


        const helper = new THREE.DirectionalLightHelper( light, 5 );
        const ambient = new THREE.AmbientLight( 0x707070, 0.6 );
        light.rotateX(Math.PI * 0.5);
        light.position.set(2, 200, 1000); 

        // light2.rotateX(Math.PI * 0.4);
        // light2.position.set(2, 300, 1000);

        const hemi = new THREE.HemisphereLight(0xffeeb1, 0x80820, 4)
        
        this.scene.add(  this.spotLight, hemi, light, ambient, helper ); 
    };

    // Create a basic plane
    plane() {
        // making a plane for the game to be staged on 
        const geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100); 
        // Rotating the plane to make it flat by 90 degrees around the x axis
        geometry.rotateX(-Math.PI * 0.5);

        const color = new THREE.Color("rgb(0, 18, 214)");

        // threejs comes with mad materials explore these for materials of your car, also takes a color as an option
        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, wireframe: true } );

        material.opacity = 0.5;
        material.transparent = true;

        // to make the actual plane you create a mesh passing in the geometry and the material 
        // a mesh like a mesh between the two
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.position.set(0, 0, 0);

        this.scene.add( this.plane );
    }

    //thinking about maing this road into its own little class 

    road() {
        // debugger
        const geometry = new THREE.PlaneGeometry(30, 1000, 100, 100);

        geometry.rotateX(-Math.PI * 0.5);

        const color = new THREE.Color("rgb(0, 0, 0)");

        const material = new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide });

        const road = new THREE.Mesh( geometry, material );

        road.position.set(-0.5, 0.3, 0);

        this.scene.add( road );
    }

    setupControls() {

        const that = this;

        const menu = document.querySelector(".menu");
        const startButton = document.querySelector("#start-button");
        
        
        this.controls = new PointerLockControls( this.camera, this.renderer.domElement );
        startButton.addEventListener("click", function() {
            that.controls.lock();
        }, false);
        

        // need this in order to be able to focus in and out of start menu 
        this.controls.addEventListener('lock', function() {
            // menu.style.display = 'none';
            menu.classList.add('hidden');
            
            that.isPaused = false;
        }); 
        this.controls.addEventListener('unlock', function() {
            // menu.style.display = 'block';
            if (!that.gameOver) {
                const button = document.getElementById("start-button").innerHTML = 'Resume Game';
            } else {
                const button = document.getElementById("start-button").innerHTML = 'Try Again';
            }
            menu.classList.remove('hidden');
            that.isPaused = true;
        } );

        // this.controls.addEventListener('change', function() {
        //     if (that.inGame) {
        //         return;
        //     }
        // })

        // make keyboard controls for pointer locked splash screen \
        // event returns the **KEYCODE**
        const onKeyDown = function(event) {
            switch(event.code) {
                case "KeyW":
                    if ((!that.inGame || that.gameOver) && that.controls.isLocked) {
                        that.controls.moveForward(0.25);
                    } else if (!that.gameOver) {
                        if (that.playerCar.position.z < 5) {
                            that.playerCar.position.z += 0.5;
                        };
                    };
                    break; 
                case "KeyA":
                    if ((!that.inGame || that.gameOver) && that.controls.isLocked) {
                        that.controls.moveRight(-0.25);
                    } else if (!that.gameOver) {
                        if (that.playerCar.position.x < 10.5) {
                            that.playerCar.position.x += 0.5;
                        };
                    };
                    break;
                case "KeyS":
                    if ((!that.inGame || that.gameOver) && that.controls.isLocked) {
                        that.controls.moveForward(-0.25);
                    } else if (!that.gameOver) {
                        if (that.playerCar.position.z > -5) {
                            that.playerCar.position.z -= 0.5;
                        }
                    };
                    break;
                case "KeyD":
                    if ((!that.inGame || that.gameOver) && that.controls.isLocked) {
                        that.controls.moveRight(0.25);
                    } else if (!that.gameOver) {
                        if (that.playerCar.position.x > -10.5) {
                            that.playerCar.position.x -= 0.5;
                        }
                    };
                    break;
                case "KeyM":
                    that.sound.stop();
                    break;
                // case "Escape":
                //     const menu = document.querySelector(".menu");
                //     menu.classList.remove('hidden');
                //     break;
            };
        };

        document.addEventListener('keydown', onKeyDown, false);
    }

    //Choosing to utilize GLTFLoader to work with assets
    loadAssets() {
        const that = this;
        const loader = new GLTFLoader();
        
        // takes in a destination url for assets, what to do on the load, what to do during the load
        // and what to do if there is an error
        loader.load("./src/assets/cars/playerCar/scene.gltf", function(gltf) {
            // ran into a dependancy issue said that you need fflate 
            // console.log(gltf);
            that.playerCar = gltf.scene;
            that.playerCar.recieveShadow = true;
            that.playerCar.position.set(0.3, 0.3, 0);
            // that.playerCar.userData = { URL: "http://google.com" }
            // might need to update or set controls for the actual car here 
            
            // add shadows to everything that is related to the car
            that.playerCar.traverse( function(child) {
                // make sure to only add shadows to meshes
                if (child.isMesh){
                    child.castShadow = true; 
                    child.recieveShadow = true;
                };

                if (child.geometry) {
                    child.geometry.computeBoundingBox();
                };
            });

            // handling the bounding box logic 
            that.playerBox = new THREE.Box3().setFromObject(that.playerCar);

            // console.log(that.playerBox);

            // that.playerBox.setfromObject({object: that.playerCar});


                    
            // animate the whole game once the actual file we are loading has loaded
            //that.animate();
            that.scene.add( that.playerCar ); 
                
            },
            // for testing purposes change this back to null later
            function(load) {
                console.log((load.loaded/load.total * 100) + "% Loaded");
            }, function(error) {
                console.error(error);
            });

           
    }

    // will have an animate function to actually render and animate everything
    // this function is equivelant to our game loop
    animate() {
        const that = this; 

        //needs to be passed in this way otherwise it won't work 
        requestAnimationFrame( function() { that.animate() } );

        const time = this.clock.getElapsedTime();
        // remember to utilize time to keep track of score down the line
        // will save trouble later
        // console.log(time);

        if (this.textMesh) {
            // this.textMesh.rotation.y += 0.001;
            this.update(time);
        };

        if (this.gameOver) {
            this.sound.stop();
        };

        this.spotLight.position.set(0, 30, 0);
        
        if (this.inGame && !this.isPaused && !this.gameOver) {

            
            // console.log(this.gameTimer.getElapsedTime());
            this.scoreEle.innerHTML = `${Math.floor(this.gameTimer.getElapsedTime() * 100)}`;
            const htmlEle = document.querySelector("#score");
            htmlEle.appendChild(this.scoreEle);
    
            // const menu = document.getElementById("start-button").innerHTML = 'Resume Game';
            // this.playerCar.rotation.x += (Math.sin(time) * 0.0003);
            // debugger
            // this.skybox.box.rotation.z += 0.01;
            this.skybox.box.rotation.x += (Math.cos(time) * 0.0001);
            this.plane.rotation.y += 0.01;
            // debugger
            for (let i = 0; i < this.peds.cars.length; i++) {
                if (this.peds.cars[i].position.z < -10) {
                    const min = Math.floor(-20);
                    const max = Math.floor(5);
                    const rando = Math.floor((Math.random() * (max - min) + min));

                    const min2 = Math.floor(200);
                    const max2 = Math.floor(450);
                    const rando2 = Math.floor((Math.random() * (max2 - min2) + min2));

                    this.peds.cars[i].position.z = rando2; 
                    this.peds.cars[i].position.x = rando;
                } else {
                    this.peds.cars[i].position.z -= 0.75;
                }
            }


            this.updateColliders();
            // console.log(this.pedBox);
            for (let i = 0; i < this.peds.boxGeoms.length; i++) {
                if (this.peds.boxGeoms[i].intersectsBox(this.playerBox)) {
                    console.log('hit');
                    this.gameOver = true
                    // what happens after the game is over
                    this.controls.unlock();
                    this.cameraController.position.set((this.playerCar.position.x+3), 0, (this.playerCar.position.z-3));
                    this.scene.add( this.textMesh )
                }
            };
        }

        

        // this.controls.update();
        //     this.render();
        // };


        this.renderer.render ( this.scene, this.camera );


        // this attatches a light to your camera position and moves it as
        // you move in order to shine a light on everything you look at
        // if (this.playerCar) {
           
        // };
        // this.spotLight.rotateY(-Math.PI);
    };

    updateColliders() {
        this.playerBox.setFromObject(this.playerCar);

        //updating ped colliders aka box3 each time we animate
        for (let i = 0; i < this.peds.boxGeoms.length; i++) {
            this.peds.boxGeoms[i].setFromObject(this.peds.cars[i]);
        };
    }

    endScreen() {

    }

    update( time ) {
        this.textMesh.position.y += (Math.cos(time) * 0.001);
    }

     //Raycasting for selection of specific objects
    rayCast( event ) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        const that = this;


        // calculate mouse position in normalized device coordinates
	    // (-1 to +1) for both components
        function onMouseMove( event ) {
            that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            that.mouse.y = -( event.clientY / window.innerWidth ) * 2 + 1;
        };

        this.render();

        this.renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
    };


    render() {
        this.raycaster.setFromCamera( this.mouse, this.camera )

        const intersects = this.raycaster.intersectObjects( this.scene.children );
        
        // console.log(intersects);
        if (intersects.length > 0) {
            // need to find a better way to deal w this bc console gets an error everytime you click something that doesn't have a parent
            if ( (intersects[0].object.parent.parent) && (this.playerCar.children.includes(intersects[0].object.parent.parent.parent.parent)) ) {
                if (!this.textMesh) {
                    this.createText();
                }
                // console.log(this.playerCar.children.includes(intersects[0].object.parent.parent.parent.parent))
                // window.open(intersects[0].object.userData.URL);
            } else if (this.textMesh === intersects[0].object) {
                // console.log(intersects[0].object);
                    this.updateCamera();
                    this.inGame = true; 
                    this.gameOver = false; 
                    this.isPaused = false;
                    this.gameTimer.start();

                // reset the position of everything
                

            };
        }

        this.renderer.render( this.scene, this.camera );
    };

    updateCamera() {
        // copy allows for u to take the properties of another camera and put them into the one called
        this.cameraController.position.set(1, 1, -10);
        // utilizing 0,0,0
        this.camera.lookAt( this.cameraTarget );
        // the parent of the textmesh is the scene which where we want to get rid of it from after click
        this.textMesh.removeFromParent();

        // making a variable to declare game start 
        this.inGame = true;
        this.gameTimer.start();

        this.sound.play();
    }

    createText() {
        console.log('clicked');
        const loader = new FontLoader(); 
        const that = this;

        loader.load('./src/assets/fonts/pixel.json', function ( font ) {
            const geometry = new TextGeometry('DRIVE', {
                font: font, 
                size: 0.7, 
                height: 0.08
            });

            const color1 = new THREE.Color("rgb(91, 17, 140)");
            const color2 = new THREE.Color("rgb(20, 20, 102)");

            const materials = [
                new THREE.MeshPhongMaterial( { color: color1, flatShading: true }), //sets the front
                new THREE.MeshPhongMaterial( { color: color2 }) // sets the side
            ];

            that.textMesh = new THREE.Mesh( geometry, materials );

            // that.textMesh.position.set(0.25, 2.2, 0.85);
            that.textMesh.position.set((that.playerCar.position.x - 0.5) , (that.playerCar.position.y + 1.5), (that.playerCar.position.z + 1.0));
            
            // that.textMesh.position.y += 5.0;
            // that.textMesh.position.x -= 0.30;
            // that.textMesh.position.z += 0.85;
            that.textMesh.rotateY(-Math.PI * 0.5);
            // debugger
            that.scene.add( that.textMesh );
            

        },  function(load) {
            console.log((load.loaded/load.total * 100) + "% Loaded");
        });

        // debugger

    }
};

export default Game;