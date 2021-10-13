import Game from "./scripts/game";


document.addEventListener('DOMContentLoaded', () => {
    const g = new Game();
    g.animate();

    // Handling window resize logic
    window.addEventListener('resize', onWindowResize, false);
    
    function onWindowResize() {
        // setting camera frustrum (basically viewport/how big the screen is)
        g.camera.aspect = window.innerWidth/ window.innerHeight;
        
        // necessary after updating the aspect of our camera field
        g.camera.updateProjectionMatrix();
        g.renderer.setSize(window.innerWidth, window.innerHeight); 
        g.animate();
    };
    
});


