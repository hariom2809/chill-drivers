import * as THREE from "three";
import { TextureHelper } from "three/examples/jsm/Addons.js";

export class RaceEngine {
    private car: THREE.Object3D;
    private finishLine: THREE.Mesh;
    private currentLap: number;
    private lapTimes: number[];
    private raceStartTime: number;
    private lapStartTime: number;
    
    private previousZ: number;
    private totalLaps: number;
    private isInfinite: boolean;

    constructor(
        car: THREE.Object3D, 
        scene: THREE.Scene,
        totalLaps: number,
        isInfinite: boolean
    ) {
        this.car = car;

        // Invisible Finish Line
        const geometry = new THREE.BoxGeometry(20, 2, 0);
        const material = new THREE.MeshBasicMaterial({
            visible: false
        });

        this.finishLine = new THREE.Mesh(geometry, material);

        // Finish Line Position
        this.finishLine.position.set(0, 1, 0);
        scene.add(this.finishLine);

        // Current car positon
        this.previousZ = this.car.position.z;
        
        this.currentLap = 1;
        this.lapTimes = [];

        this.raceStartTime = performance.now();
        this.lapStartTime = this.raceStartTime;

        this.totalLaps = totalLaps;
        this.isInfinite = isInfinite;
    }

    update(): void{
        const currentZ = this.car.position.z;

        if (this.previousZ > 0 && currentZ <= 0) {
            const now = performance.now();
            const lapTime = now - this.lapStartTime;

            this.lapTimes.push(lapTime);
            this.currentLap++;

            this.lapStartTime = now;

            console.log(`Lap Time = ${lapTime/1000}s`);
            console.log(`Current Lap = ${this.currentLap}`);
        }

        this.previousZ = currentZ;
    }

    isRaceComplete(): boolean{
        if (this.isInfinite) {
            return false;
        }
        return this.currentLap > this.totalLaps;
    }

    getStats() {
        const totalTime = this.lapTimes.reduce(
            (sum, lapTime) => sum + lapTime, 
            0
        );

        const average = this.lapTimes > 0 ? totalTime / this.lapTimes.length : 0;

        return {lapTimes: this.lapTimes, average};
    }
    
}