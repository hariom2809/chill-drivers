import {SceneManager} from './game/SceneManager';
import {CarController} from './game/CarController';
import {RenderLoop} from './game/RenderLooop';
import { RaceEngine } from './game/RaceEngine';

const sceneManager = new SceneManager();

const carController = new CarController();

const keyPassed = new Set<string>();

window.addEventListener("keydown", (e) => {
  keyPassed.add(e.key);
});

window.addEventListener("keyup", (e) => {
  keyPassed.delete(e.key);
});

const raceEngine = new RaceEngine(
  carController.mesh,
  sceneManager.scene, 
  3, 
  false
);

const renderLoop = new RenderLoop(
  sceneManager.renderer,
  sceneManager.scene,
  sceneManager.camera,
  carController,
  keyPassed,
  raceEngine,
);

renderLoop.start();