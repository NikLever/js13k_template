import { VRButton } from './VRButton.js';

class App{
    static STATES = {  };

	constructor(){
        const debug = false;

		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.clock = new THREE.Clock();
        
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 200 );

		this.camera.position.set( 0, 0, 4 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x050505 );

		this.scene.add( new THREE.HemisphereLight( 0xffffff, 0x404040, 1.5) );
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

       const light = new THREE.DirectionalLight(0xFFFFFF, 3);
       light.position.set(1,1,1);
       this.scene.add(light);
        
		container.appendChild( this.renderer.domElement );

        this.setupVR();
        
        window.addEventListener('resize', this.resize.bind(this) );

        this.renderer.setAnimationLoop( this.render.bind(this) );
	}	

    startGame(){
        
    }

    gameOver(options){
        const panel = document.getElementById('gameoverPanel');
        const details = document.getElementById('details');
        switch( options.state ){
            case App.STATES.DEAD:
                details.innerHTML = `<P>You ran out of life ${this.player.position.distanceTo(this.grail.position).toFixed(0)} metres away from the Holy Grail</p>`
                break;
            case App.STATES.COMPLETE:
                const tm = this.clock.elapsedTime - this.startTime;
                details.innerHTML = `<p>Congratulations</p><p>You found the grail in ${tm.toFixed(2)} seconds</p><p>Can you do better</p>`;
                break;
        }
        panel.style.display = 'block';
       
        this.vrButton.endSession();
    }

    random( min, max ){
        return Math.random() * (max-min) + min;
    }
    
    initScene(){

		this.scene.background = new THREE.Color( 0x0a0a0a );
		this.scene.fog = new THREE.Fog( 0x0a0a0a, 50, 100 );

		// ground
    } 

    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }

    setupVR(){
        this.renderer.xr.enabled = true;
        
        const button = new VRButton( this.renderer );
        this.vrButton = button;

        button.onClick = () => {
            
        }
        
        function onSelectStart() {
              
        }

        function onSelectEnd() {
              
        }

        const scope = this;

        this.renderer.xr.addEventListener( 'sessionend', function ( event ) {
            
        } );

        this.renderer.xr.addEventListener( 'sessionstart', function ( event ) {
           
        } );

        this.controllers = [];

        for (let i=0; i<=1; i++){
            const controller = this.renderer.xr.getController( i );
            controller.addEventListener( 'selectstart', onSelectStart );
            controller.addEventListener( 'selectend', onSelectEnd );
            controller.addEventListener( 'connected', ( event ) => {
                controller.gamepad = event.data.gamepad;
                controller.handedness = event.data.handedness;
                
            } );
            
            controller.addEventListener( 'disconnected', function () {
                
            } );

            this.root.add( controller );

            this.controllers.push({controller});
        }

    }

	render( time, frame ) {  
        const dt = this.clock.getDelta();
       
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };

window.app = new App();  