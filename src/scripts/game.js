import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Skybox from "./skybox";
import Peds from "./pedcars";
import Sound from "./sounds";
import Tree from "./trees";


// Game class to hold all game logic
class Game {
    constructor() {
        // Variable to represent that user should be in the beginning scene
        this.inGame = false;
        // Variable to represent that user should be in the end scene
        this.gameOver = false;
        // Variable to represent if the game is paused (Helps to update what the button says)
        this.isPaused = false;
        // Handles boilerplate scene/camera/renderer
        this.init();
        // Create new skybox (images are 1024 x 1024 for 'retrosun')
        this.skybox = new Skybox(1000, 1000, 1000, 'retrosun');
        this.scene.add( this.skybox.box );
        // Load player car
        this.loadAssets();
        // Create text 
        this.createText();
        // Create Lighting
        this.lights();
        //Create Plane
        this.plane();
        //Create Cars
        this.road();
        this.tree = new Tree(this.scene, 18.5);
        this.populated = false;
        // this.populate();
        //Create Ped Cars
        this.peds = new Peds(this.scene);
        // Setup Controls
        this.setupControls();
        // In order to get bouncing animation on text
        this.clock = new THREE.Clock();
        // Implement score
        this.gameTimer = new THREE.Clock();
        this.score = 0;
        this.scoreEle = document.createElement("p");
        const htmlEle = document.querySelector("#score");
        htmlEle.appendChild(this.scoreEle);
        // Implement soundtrack 
        this.sound = new Sound("track1.mp3");

    }

    populate() {
        // for (let i = 0; i < 10; i++) {
            this.tree.newTree(18.5);
            this.tree.newTree(-18.5);

            // this.peds.newCar();
            // this.scene.remove(this.peds.cars[-1]);
        // }
    }
    
    init() {
        // Create scene to be rendered later
        this.scene = new THREE.Scene();

        // Dev purposes
        // this.scene.add( new THREE.AxesHelper(5) );

        // Create camera to be rendered added to thes scene (Basic first person viewing angles, etc...)
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        // Adjust height and position
        this.camera.position.set(0.3, 2.0, -3.0)

        // Adjust viewing angle
        this.camera.rotateY(-Math.PI);
        this.camera.rotateX(Math.PI*0.093);

        // Might utilize this later if the camera needs to be focused on a point
        this.cameraTarget = new THREE.Vector3(0, 0, 0);
        
        // Grab canvas element
        const canvas = document.querySelector("#game");
        
        // Create renderer to render and handle our scene
        // DO NOT SET ALPHA TO TRUE CAUSES CLIPPING
        this.renderer = new THREE.WebGLRenderer({canvas});


        // Handle rest of renderer logic
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        // Deal with clicking things within the scene itself
        this.renderer.domElement.addEventListener('click', this.rayCast.bind(this), false); 
    };

    
    // Attempt to Create lighting
    lights() {
        // Need special THREE class color (kind of work better)
        const color = new THREE.Color("rgb(175,0,98)");
        const pointLightColor = new THREE.Color("rgb(255, 206, 99)"); //orange

        // Color + Intensity
        const light = new THREE.DirectionalLight(color, 1.0);
        light.castShadow = true;
        light.rotateX(Math.PI * 0.5);
        light.position.set(2, 200, 1000); 

        const pointLight = new THREE.PointLight( pointLightColor, 1 );
        const pointLight2 = new THREE.PointLight( pointLightColor, 1 );
        pointLight.castShadow = true;
        pointLight.position.set(5, 15, 10);
        pointLight2.castShadow = true;
        pointLight2.position.set(-5, 15, 10);
        // Dev tool
        // const helper = new THREE.PointLightHelper( pointLight );
        
        // Trying to mess around with shadows
        this.spotLight = new THREE.SpotLight(pointLightColor, 2);
        this.spotLight.castShadow = true;


        // Create ambient lighting
        // const ambient = new THREE.AmbientLight( 0x707070, 0.6 );
        
        // Hemisphere light (neccesary to show color on text)
        const hemi = new THREE.HemisphereLight(0xffeeb1, 0x80820, 4)
        
        // Add lights to the scene
        this.scene.add(  this.spotLight, light, pointLight, hemi ); 
    };

    // Create a basic plane
    plane() {
        // making a plane for the game to be staged on 
        const geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100); 
        // Rotating the plane to make it flat by 90 degrees around the x axis
        geometry.rotateX(-Math.PI * 0.5);

        const color = new THREE.Color("rgb(0, 18, 214)");

        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, wireframe: true } );

        this.plane = new THREE.Mesh( geometry, material );

        this.scene.add( this.plane );
    }

    // Create Road
    road() {
        const geometry = new THREE.PlaneGeometry(30, 1000, 100, 100);

        geometry.rotateX(-Math.PI * 0.5);

        const color = new THREE.Color("rgb(0, 0, 0)");

        // Phong material for shiny refllective light effect
        const material = new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide });

        const road = new THREE.Mesh( geometry, material );

        road.receiveShadow = true;

        road.position.set(-0.5, 0.3, 0);

        this.scene.add( road );
    }

    setupControls() {
        const that = this; // Preserving scope

        const menu = document.querySelector(".menu");
        const crosshair = document.querySelector(".crosshair");
        const startButton = document.querySelector("#start-button");
        
        
        this.controls = new PointerLockControls( this.camera, this.renderer.domElement );
        startButton.addEventListener("click", function() {
            that.controls.lock();
        }, false);
        

        // need this in order to be able to focus in and out of start menu 
        this.controls.addEventListener('lock', function() {
            // menu.style.display = 'none';
            if (!that.inGame || that.gameOver) {
                crosshair.style.display = 'flex';
            }
            that.score += that.gameTimer.getDelta();
            that.gameTimer.start();
            menu.classList.add('hidden');
            
            
            that.isPaused = false;
        }); 
        this.controls.addEventListener('unlock', function() {
            // menu.style.display = 'block';
            crosshair.style.display = 'none';
            that.gameTimer.stop();
            if (!that.gameOver) {
                const button = document.getElementById("start-button").innerHTML = 'Resume Game';
            } else {
                const button = document.getElementById("start-button").innerHTML = 'Try Again';
            }
            menu.classList.remove('hidden');
            that.isPaused = true;
        } );


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
            };
        };

        document.addEventListener('keydown', onKeyDown, false);
    }

    // Choosing to utilize GLTFLoader to work with assets
    loadAssets() {
        const that = this;
        const loader = new GLTFLoader();
        
        // takes in a destination url for assets, what to do on the load, what to do during the load
        // and what to do if there is an error
        loader.load("./src/assets/cars/playerCar/scene.gltf", function(gltf) {
            that.playerCar = gltf.scene;
            that.playerCar.recieveShadow = true; // Still working on lighting
            that.playerCar.position.set(0.3, 0.3, 0);
            
            // Add shadows to everything that is related to the car (still trying to implement these with the lighting)
            that.playerCar.traverse( function(child) {
                // Make sure to only add shadows to meshes
                if (child.isMesh){
                    child.castShadow = true; 
                    child.recieveShadow = true;
                };

                if (child.geometry) {
                    child.geometry.computeBoundingBox();
                };
            });

            // Create Collider 
            that.playerBox = new THREE.Box3().setFromObject(that.playerCar);
   
            // Add the car to the scene
            that.scene.add( that.playerCar ); 
                
            },
            // Boilerplate
            function(xhr) {
                console.log((xhr.loaded/xhr.total * 100) + "% Loaded");
            }, function(error) {
                console.error(error);
            });

           
    }

    // Game loop + allows for things to easily move on screen
    animate() {
        //needs to be passed in this way otherwise it won't work 
        const that = this;
        requestAnimationFrame( function() { that.animate() } );

        if (!this.populated) {
            // setInterval(() => {
                this.peds.newCar();
                this.populate()
                this.populated = true;
            // }, 2000); 
        }

        // Declaring outside if statement below bc used by multiple functions
        const time = this.clock.getElapsedTime();
        
        // Weird bug where everything still becomes out of position over time
        if (this.textMesh) {
            this.textMesh.position.y += (Math.cos(time) * 0.0002);
            this.gitText.position.y += (Math.cos(time) * 0.0002);
            this.linkedText.position.y += (Math.cos(time) * 0.0002);
            this.titleText.position.y += (Math.cos(time) * 0.01);
        };

        this.spotLight.position.set(0, 30, 0);
        
        
        if (this.inGame && !this.isPaused && !this.gameOver) {
            this.score += 1;
            this.scoreEle.innerHTML = `${this.score}`;
            // if we do it this way it'll add a car on every frame update
            // setInterval(this.peds.newCar(this.score), 4000);

            switch(this.score) {
                case 100:
                    if (this.populated)
                    this.peds.newCar();
                    break;
                case 1000: // score amount to add a new car
                    this.peds.newCar(); // can make this dynamic later by specifying car type, will also help scale difficulty
                    break;
                case 2700: 
                    this.peds.newCar();
                    break;
                case 5000:
                    this.peds.newCar();
                    break;
                case 8000:
                    this.peds.newCar();
                    break;
                case 10000:
                    this.peds.newCar();
                    this.peds.newCar();
                    break;
                case 15000:
                    this.peds.newCar();
                    this.peds.newCar();
                    break;
                case 20000:
                    this.peds.newCar();
                    this.peds.newCar();
                    break;
                case 27000:
                    this.peds.newCar();
                    this.peds.newCar();
                    this.peds.newCar();
                    break;
                case 32000:
                    this.peds.newCar();
                    this.peds.newCar();
                    this.peds.newCar();
                    break;
                case 37000:
                    this.peds.newCar();
                    this.peds.newCar();
                    this.peds.newCar();
                    break;
            }
    
            this.skybox.box.rotation.x += (Math.cos(time) * 0.0001);
            this.plane.rotation.y += 0.01;
            for (let i = 0; i < this.tree.trees.length; i++) {
                if (this.tree.trees[i].position.z < -30 ) {
                    this.tree.trees[i].position.z = 350;
                } else {
                    this.tree.trees[i].position.z -= 0.10;
                }
            }
            // this.tree2.tree.position.z -= 0.01

            // Random car spawn after they hit -10 z index
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
                    this.peds.cars[i].position.z -= 1.0;
                }
            }

            this.updateColliders();

            for (let i = 0; i < this.peds.boxGeoms.length; i++) {
                if (this.peds.boxGeoms[i].intersectsBox(this.playerBox)) {
                    this.gameOver = true
                    // Logic for once the game is over
                    this.controls.unlock();
                    this.camera.position.set((that.playerCar.position.x) , 2.0, (that.playerCar.position.z - 2.0));
                    this.textMesh.position.set((that.playerCar.position.x + 0.6) , (that.playerCar.position.y + 1.5), (that.playerCar.position.z + 2.0));
                    this.scene.add( this.textMesh, this.titleText );
                   
                }
            };

            if (this.gameOver) {
                this.sound.stop();
                for (let i = 0; i < this.peds.cars.length; i++) {
                    this.scene.remove(this.peds.cars[i])
                }
    
                for (let i = 0; i < this.peds.cars.length; i++) {
                    this.peds.cars.pop();
                    this.peds.boxGeoms.pop();
                }
            };
        }

        this.renderer.render ( this.scene, this.camera );
    };

    updateColliders() {
        this.playerBox.setFromObject(this.playerCar);

        //updating ped colliders aka box3 each time we animate
        for (let i = 0; i < this.peds.boxGeoms.length; i++) {
            this.peds.boxGeoms[i].setFromObject(this.peds.cars[i]);
        };
    }

     //Raycasting for selection of specific objects
    rayCast( event ) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        

        const that = this;

        // const geometry = new THREE.BufferGeometry();
        // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [(( event.clientX / window.innerWidth ) * 2 - 1), (-( event.clientX / window.innerWidth ) * 2 - 1), 10], 3 ) );
        // const material = new THREE.PointsMaterial( { color: 0x888888 } );

        // const points = new THREE.Points( geometry, material );

        // this.scene.add(points);

       


        // calculate mouse position in normalized device coordinates
	    // (-1 to +1) for both components
        function onMouseMove( event ) {
            that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            that.mouse.y = -( event.clientY / window.innerWidth ) * 2 + 1;
            // const ctx = document.querySelector("#cursor").getContext('2d');
            // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            // ctx.arc(that.mouse.x, that.mouse.y, RADIUS, 0, degToRad(360), true);

            
            // ctx.fillRect(that.mouse.x, that.mouse.y, 1, 1);
        };

        this.render();

        this.renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );

    };

    // Handles all logic when something inside the scene is clicked
    render() {
        this.raycaster.setFromCamera( this.mouse, this.camera )
        // console.log(this.raycaster.ray.direction);

        // const geometry = new THREE.BufferGeometry();
        // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.raycaster.ray.origin, 3 ) );
        // const material = new THREE.PointsMaterial( { color: 0x888888 } );

        // const point = new THREE.Points( geometry, material )

        // this.scene.add( point )

        const intersects = this.raycaster.intersectObjects( this.scene.children );

        // for (let i = 0; i < intersects.length; i++) {
        //     // You can do anything you want here, this is just an example to make the hovered object transparent
        //     const newMaterial = intersects[i].object.material.clone();
        //     newMaterial.transparent = true;
        //     newMaterial.opacity = 0.5;
        //     intersects[i].object.material = newMaterial;
        //   }
        
        // the real magic
        if (intersects.length > 0) {
            if ( (intersects[0].object.parent.parent) && (this.playerCar.children.includes(intersects[0].object.parent.parent.parent.parent)) ) {
                this.textMesh.position.set(
                    (this.playerCar.position.x + 0.6), 
                    (this.playerCar.position.y + 1.5), 
                    (this.playerCar.position.z + 2.0)
                );
                this.scene.add( this.textMesh );
            } else if (this.textMesh === intersects[0].object) { // once user clicks drive
                // reset the position of ped cars and go to game camera
                if (this.gameOver) {
                    this.score = 0;
                    this.sound.stop();
                    for (let i = 0; i < this.peds.cars.length; i++) {
                        this.scene.remove(this.peds.cars[i]);
                    };
        
                    for (let i = 0; i < this.peds.cars.length; i++) {
                        this.peds.cars.pop();
                        this.peds.boxGeoms.pop();
                    };
                };
                this.peds.reset();
                this.updateCamera();
            } else if (this.gitText === intersects[0].object) {
                window.open("https://github.com/FarzamA/");
            } else if (this.linkedText === intersects[0].object) {
                window.open("https://www.linkedin.com/in/farzam-ahmad-41b024154/");
            };
        }

        this.renderer.render( this.scene, this.camera );
    };

    updateCamera() {
        this.playerCar.position.set(0.3, 0.3, 0);
        // copy allows for u to take the properties of another camera and put them into the one called
        this.camera.position.set(1, 3, -10);
        // utilizing 0,0,0
        this.camera.lookAt( this.cameraTarget );
        // the parent of the textmesh is the scene which where we want to get rid of it from after click
        this.textMesh.removeFromParent();
        const crosshair = document.querySelector(".crosshair");
        // making a variable to declare game start 
        this.inGame = true;
        crosshair.style.display = "none"
        this.scene.remove( this.titleText );
        this.peds.reset();

        // for (let i = 1; i < this.peds.cars.length; i++) {
        //     this.scene.remove( this.peds.cars[i] );
        // }
        // this.peds = new Peds(this.scene);
        this.gameOver = false; 
        // this.peds.newCar();
        this.gameTimer.start();

        this.sound.play();
    }

    createText() {
        const loader = new FontLoader(); 
        const that = this;

        loader.load('./src/assets/fonts/pixel.json', function ( font ) {
            const titleGeo = new TextGeometry ('NO HESITATION', {
                font: font,
                size: 5.0,
                height: 1.0
            })

            const linkedGeo = new TextGeometry ('LINKEDIN', {
                font: font,
                size: 0.7,
                height: 0.15
            });

            const gitGeo = new TextGeometry ('GITHUB', {
                font: font,
                size: 0.7,
                height: 0.15
            });

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

            that.titleText = new THREE.Mesh( titleGeo, materials );
            that.titleText.castShadow = true;

            that.titleText.position.set(18, 15, 100);
            that.titleText.rotateY(-Math.PI)


            that.gitText = new THREE.Mesh( gitGeo, materials );
            that.gitText.castShadow = true;

            that.gitText.position.set(-15.7, 2, 0);
            that.gitText.rotateY(Math.PI*0.5)

            that.linkedText = new THREE.Mesh( linkedGeo, materials );
            that.linkedText.castShadow = true;

            that.linkedText.position.set(-15.7, 1.3, 0);
            that.linkedText.rotateY(Math.PI*0.5)

            that.textMesh = new THREE.Mesh( geometry, materials );
            that.textMesh.castShadow = true;

            that.textMesh.rotateY(Math.PI * 0.5);

            that.scene.add( that.gitText, that.linkedText, that.titleText );
            

        },  function(load) {
            console.log((load.loaded/load.total * 100) + "% Loaded");
        });
    }
};

export default Game;