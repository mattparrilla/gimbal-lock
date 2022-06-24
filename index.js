import * as THREE from "three";
import { calcBetaOffset, calcGammaOffset } from "./angleCalcs.js";
import { makeCube } from './makeCube.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cube = makeCube();
scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
};

let initialOrientation;
function onDeviceOrientation (e) {
  // use initial angle as our "origin"
  if (!initialOrientation) {
    initialOrientation = {
      alpha: e.alpha,
      beta: e.beta,
      gamma: e.gamma
    }
  }
  
  // move camera X and Y positions between -2 and 2 depending on
  // angles of beta and gamma, keeping Z position fixed
  camera.position.set(
    THREE.MathUtils.lerp(0, 5, calcGammaOffset(e.gamma, initialOrientation.gamma)),
    THREE.MathUtils.lerp(0, 5, calcBetaOffset(e.beta, initialOrientation.beta)),
    5
  )
  camera.lookAt(0, 0, 0);
}

if (DeviceOrientationEvent) {
  // if iOS, need to get permission via a user interaction
  if (DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.addEventListener('click', async () => {
      await DeviceOrientationEvent.requestPermission();
      window.addEventListener('deviceorientation', onDeviceOrientation)
    });
  } else {
    window.addEventListener('deviceorientation', onDeviceOrientation)
  }
}

animate();