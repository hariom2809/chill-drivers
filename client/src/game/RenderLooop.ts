import * as THREE from "three";
import { CarController} from "./CarController";
import { RaceEngine } from "./RaceEngine";

export class RenderLoop {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private carController: CarController;
    private keyPassed: Set<string>;
    private raceEngine: RaceEngine;

    private previousTime = 0;
    private readonly cameraOffset = new THREE.Vector3(0, 6, -10);

    constructor(
        renderer: THREE.WebGLRenderer,
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        carController: CarController,
        keyPassed: Set<string>,
        raceEngine: RaceEngine
    ) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.carController = carController;
        this.keyPassed = keyPassed;
        this.raceEngine = raceEngine;
    }

    start() {
        this.scene.add(this.carController.mesh);
        requestAnimationFrame(this.loop);
    }

    private loop = (currentTime: number) => {
        const deltaTime = this.previousTime === 0 ? 0 : (currentTime - this.previousTime) / 1000;

        this.previousTime = currentTime;

        this.carController.handleInput(this.keyPassed);
        this.carController.update(deltaTime);
        this.raceEngine.update();

        this.updateCamera();

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.loop);
    }

    private updateCamera() {
        const offset = this.cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), this.carController.rotation);

        this.camera.position.copy(this.carController.position).add(offset);
        this.camera.lookAt(this.carController.position);
    }
}