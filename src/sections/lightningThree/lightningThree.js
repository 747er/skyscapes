import * as THREE from "three";
import texture1Url from "./rain1.jpg";
import texture2Url from "./rain2.jpg";
import texture3Url from "./rain3.jpg";

/***************************************************** Scene */

const scene = new THREE.Scene();
// Add fog into scene
scene.fog = new THREE.FogExp2(0x11111f, 0.002);

/***************************************************** Camera */

// Define camera: .PerspectiveCamera(field of view in degree, aspect ratio = width / height, near, far)
const camera = new THREE.PerspectiveCamera(
  60, // fov = Field Of View
  window.innerWidth / window.innerHeight, // aspect ratio = width / height
  1, // near clipping plane
  1000 // far clipping plane
);

// Set camera position
camera.position.set(0, 0, 1);

// Set the rotation angle of th ecamera to look up into the sky
camera.rotation.set(1.16, -0.12, 0.27);

/***************************************************** Renderer */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(scene.fog.color);
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer into HTML as a canvas element
const container = document.getElementById("lightning-scene");
container.appendChild(renderer.domElement);

/***************************************************** Resizer */

// Make canvas responsive
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight; // update aspect ratio
//   camera.updateProjectionMatrix(); // apply changes

//   renderer.setSize(window.innerWidth, window.innerHeight); // update size
//   renderer.setPixelRatio(window.devicePixelRatio); // use to render at the native screen resolution
// });

window.addEventListener("resize", () => {
  console.log("resize fire");
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

/***************************************************** Ambient Light */

// Define ambiant light: Illuminate all objects in the scene from all direction
const ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);

/***************************************************** Directional Light */

// Define directional light: reresent the moon light in the sky
const directionalLight = new THREE.DirectionalLight(0xffeedd);
// By default, the light will seems to come from above. To change he position light, I must move the whole light
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

/***************************************************** Point Light */

// Define lightning flash: Setup a pointLight with blue color
const flash = new THREE.PointLight(0x586aac, 50, 800, 2.5);
// Set lightning flash position behind the cloud
flash.position.set(200, 300, 100);
scene.add(flash);

/***************************************************** Cloud Texture Loader */

const loader = new THREE.TextureLoader();
// Set Texture loader
const texture1 = loader.load(texture1Url);
const texture2 = loader.load(texture2Url);
const texture3 = loader.load(texture3Url);

/************************************** Cloud 1 */

const cloudParticles1 = [];
// Define a geometry - 2000 unit plain square
const cloudGeometry1 = new THREE.PlaneBufferGeometry(2000, 2000);
// Define a material and map it to the texture 1
const cloudMaterial1 = new THREE.MeshLambertMaterial({
  map: texture1,
  transparent: true,
});

// Loop to randomly add each cloud to the scene
for (let p = 0; p < 25; p++) {
  const cloud1 = new THREE.Mesh(cloudGeometry1, cloudMaterial1);
  cloud1.position.set(
    Math.random() * 800 - 400,
    500,
    Math.random() * 500 - 450
  );
  // Set the cloud rotation angle to face the camera
  cloud1.rotation.x = 1.16;
  cloud1.rotation.y = -0.12;
  // Add some random around the z axis
  cloud1.rotation.z = Math.random() * 360;
  cloud1.material.opacity = 0.8;

  // Store the reference to each cloud in an array
  cloudParticles1.push(cloud1);

  // Add Cloud1 into scene
  scene.add(cloud1);
}

/************************************** Cloud 2 */

const cloudParticles2 = [];
const cloudGeometry2 = new THREE.PlaneBufferGeometry(2000, 2000);
const cloudMaterial2 = new THREE.MeshLambertMaterial({
  map: texture2,
  transparent: true,
});

for (let p = 0; p < 25; p++) {
  const cloud2 = new THREE.Mesh(cloudGeometry2, cloudMaterial2);
  cloud2.position.set(
    Math.random() * 800 - 400,
    500,
    Math.random() * 500 - 450
  );
  cloud2.rotation.x = 1.16;
  cloud2.rotation.y = -0.12;
  cloud2.rotation.z = Math.random() * 360;
  cloud2.material.opacity = 0.6;

  cloudParticles2.push(cloud2);

  scene.add(cloud2);
}

/************************************** Cloud 3 */

const cloudParticles3 = [];
const cloudGeometry3 = new THREE.PlaneBufferGeometry(2000, 2000);
const cloudMaterial3 = new THREE.MeshLambertMaterial({
  map: texture3,
  transparent: true,
});

for (let p = 0; p < 25; p++) {
  const cloud3 = new THREE.Mesh(cloudGeometry3, cloudMaterial3);
  cloud3.position.set(
    Math.random() * 800 - 400,
    500,
    Math.random() * 500 - 450
  );
  cloud3.rotation.x = 1.16;
  cloud3.rotation.y = -0.12;
  cloud3.rotation.z = Math.random() * 360; //Math.random()*2*Math.PI;
  cloud3.material.opacity = 0.8;

  cloudParticles3.push(cloud3);

  scene.add(cloud3);
}

/***************************************************** Events */
// Function to trigger the lightning flash
// function triggerFlash() {
//     // Initial bright flash
//     const initialPower = 50 + Math.random() * 500;
//     flash.power = initialPower;

//     // Slightly dim it after 50ms
//     setTimeout(() => {
//       flash.power = initialPower * 0.5; // half brightness
//     }, 50);

//     // Then turn it off after another 100ms (total 150ms)
//     setTimeout(() => {
//       flash.power = 0;
//     }, 150);
// }

function triggerFlash() {
  // Randomize position for variety:
  // For example, center around x=0 by subtracting half the range:
  const xPos = Math.random() * 800 - 400; // from -400 to 400
  const yPos = 300 + Math.random() * 200; // from 300 to 500
  const zPos = 100;
  flash.position.set(xPos, yPos, zPos);

  // Initial bright flash
  const initialPower = 50 + Math.random() * 500;
  flash.power = initialPower;

  // Slightly dim after 50ms
  setTimeout(() => {
    flash.power = initialPower * 0.5;
  }, 50);

  // Turn it off after another 100ms (total ~150ms)
  setTimeout(() => {
    flash.power = 0;
  }, 150);
}

// Listen for mouse events on the container
container.addEventListener("mouseenter", triggerFlash);
container.addEventListener("mouseleave", triggerFlash);

/***************************************************** Render */

// Render animation on every rendering phase
function render() {
  // Cloud Rotation Animation: In the array of clouds rotate the cloud one by one
  cloudParticles1.forEach((p) => {
    p.rotation.z -= 0.0004;
  });

  cloudParticles2.forEach((p) => {
    p.rotation.z -= 0.0002;
  });

  cloudParticles3.forEach((p) => {
    p.rotation.z -= 0.0003;
  });

  // Lightening Animation: Random the flash position and light intensity
  //   if (Math.random() > 0.93 || flash.power > 100) {
  //     if (flash.power < 100)
  //       flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
  //     flash.power = 50 + Math.random() * 500;
  //   }

  // rerender every time the page refreshes (pause when on another tab)
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
