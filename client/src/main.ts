import {SceneManager} from './game/SceneManager';
import {CarController} from './game/CarController';
import {RenderLoop} from './game/RenderLooop';
import { RaceEngine } from './game/RaceEngine';
import { SetupScreen } from './ui/SetupScreen';
import type { RaceConfig } from './ui/SetupScreen';

const sceneManager = new SceneManager();

const keyPassed = new Set<string>();

window.addEventListener("keydown", (e) => {
  keyPassed.add(e.key);
});

window.addEventListener("keyup", (e) => {
  keyPassed.delete(e.key);
});

new SetupScreen((config: RaceConfig) => {
  console.log("Starting Race with:", config);

  const carController = new CarController();

  const raceEngine = new RaceEngine(
    carController.mesh,
    sceneManager.scene,
    config.totalLaps,
    config.isInfinite
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
});
