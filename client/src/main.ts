import {SceneManager} from './game/SceneManager';
import {CarController} from './game/CarController';
import {RenderLoop} from './game/RenderLooop';
import { RaceEngine } from './game/RaceEngine';
import { SetupScreen } from './ui/SetupScreen';
import { ResultsScreen } from './ui/ResultsScreen';
import type { RaceConfig } from './ui/SetupScreen';

type AppState = "setup" | "racing" | "results";

const sceneManager = new SceneManager();

const keyPassed = new Set<string>();

window.addEventListener("keydown", (e) => {
  keyPassed.add(e.key);
});

window.addEventListener("keyup", (e) => {
  keyPassed.delete(e.key);
});

let appState: AppState = "setup";
let setupScreen: SetupScreen;
let resultsScreen: ResultsScreen;

const startSetup = () => {
  appState = "setup";

  setupScreen = new SetupScreen((config: RaceConfig) => {
    startRace(config);
  }); 
}

const startRace = (config: RaceConfig) => {
  appState = "racing";

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
    () => {
      showResults(raceEngine);
    }
  );

  renderLoop.start();
}

const showResults = (raceEngine: RaceEngine) => {
  appState = "results";

  const stats = raceEngine.getStats();

  resultsScreen = new ResultsScreen(
    stats.lapTimes,
    stats.average,
    () => {
      startSetup();
    }
  );

  resultsScreen.show();
}

startSetup();