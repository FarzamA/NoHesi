import Game from "./scripts/game";


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const g = new Game();
    g.animate();

    //trying to handle weird stuff that happens on window resize
    window.addEventListener('resize', onWindowResize, false)
    
    function onWindowResize() {
        g.camera.aspect = window.innerWidth/ window.innerHeight;
        
        // necessary after updating the aspect of our camera field
        g.camera.updateProjectionMatrix();
        g.renderer.setSize(window.innerWidth, window.innerHeight); 
        // not sure why but this throws an error if I do g.renderer.render()
        g.renderer.render();
    }

    
});


