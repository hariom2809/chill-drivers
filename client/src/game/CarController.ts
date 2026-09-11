import * as THREE from "three";

export class CarController {
    position: THREE.Vector3;
    rotation: number;
    speed: number;

    private acceleration = 10;
    private maxSpeed = 30;
    private drag = 0.9;
    private stearAmount = 2;

    private input = {
        accelerate: false,
        break: false,
        left: false,
        right: false,
    };

    constructor() {
        this.position   = new THREE.Vector3(0, 0, 0);
        this.rotation   = 0;
        this.speed      = 0;
    }

    handleInput (keys: Set<string>) {
        this.input.accelerate   = keys.has("w") || keys.has("ArrowUp");
        this.input.break        = keys.has("s") || keys.has("ArrowDown");
        this.input.left         = keys.has("a") || keys.has("ArrowLeft");
        this.input.right        = keys.has("d") || keys.has("ArrowRight");
    };

    update(deltaTime: number) {
        if (this.input.accelerate) { 
            this.speed += this.acceleration * deltaTime; 
        }
        if (this.input.break) { 
            this.speed -= this.acceleration * deltaTime; 
        }

        this.speed = Math.min(this.speed , this.maxSpeed);

        if (!this.input.accelerate && !this.input.break) {
            this.speed *= this.drag;
        }

        const speedFactor = Math.min( Math.abs(this.speed) / this.maxSpeed, 1);

        if (this.input.left) { 
            this.rotation += this.stearAmount * deltaTime * speedFactor; 
        }
        if (this.input.right) { 
            this.rotation -= this.stearAmount * deltaTime * speedFactor; 
        }

        const direction = new THREE.Vector3(
            Math.sin(this.rotation),
            0,
            Math.cos(this.rotation)
        );

        this.position.add( direction.multiplyScalar( this.speed * deltaTime) );
    }
}