import * as THREE from "three";
import { TextureHelper } from "three/examples/jsm/Addons.js";

export class RaceEngine {
    private car: THREE.Object3D;
    private finishLine: THREE.Mesh;

    privae previousZ: number;

    constructor(car: THREE.Object3D, scene: THREE.Scene) {
        this.car = car;

        // Invisible Finish Line
        const geometry = new THREE.BoxGeometry(20, 2, 0);
        const material = new THREE.MeshBasicMaterial({
            visible: false
        });

        this.finishLine = new TextureHelper.Mesh(geometry, material);

        // Finish Line Position
        this.finishLine.position.set(0, 1, 0);
        scene.add(this.finishLine);

        // Current car positon
        this.previousZ = this.car.position.z;
    }

    update(): void{
        
    }
}