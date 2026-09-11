import * as THREE from "three";
import { CarController} from "./CarController";

export class RenderLoop {
    private renderer        = THREE.WebGLRenderer;
    private scene           = THREE.Scene;
    private camera          = THREE.PerspectiveCamera;
    private carController   = CarController;
    private keyPassed       = new Set<string>();

    private previousTime = 0;

    constructor(
        renderer: THREE.WebGLRenderer,
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        carController: CarController,
        keyPassed: Set<string>
    ) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.carController = carController;
        this.keyPassed = keyPassed;
    }

    start() {
        requestAnimationFrame(this.loop);
    }

    private loop = (currentTime: number) => {
        const deltaTime = (currentTime - this.previousTime) / 1000;

        this.previousTime = currentTime;

        this.carController.handleInput(this.keyPassed);
        this.carController.update(deltaTime);

        this.renderer.render(this.scene, this.camera);
        
        requestAnimationFrame(this.loop);
    }
}