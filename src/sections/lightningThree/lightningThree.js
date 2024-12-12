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
  100, // fov = Field Of View
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
window.addEventListener("resize", () => {
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
flash.power = 0;
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
function triggerFlash(xPos, yPos) {
  if (yPos > 400) {
    yPos = 250;
  }

  // If we didn't receive coords, default to random
  if (typeof xPos === "undefined" || typeof yPos === "undefined") {
    xPos = Math.random() * 800 - 400;
    yPos = 300 + Math.random() * 200;
  }

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

// Updated triggerFlash to accept z as well
function trigger3DFlash(xPos, yPos, zPos) {
  // If we didn't receive coords, default to random (or fallback to your logic)
  if (typeof xPos === "undefined" || typeof yPos === "undefined") {
    xPos = Math.random() * 800 - 400;
    yPos = 300 + Math.random() * 200;
  }
  if (typeof zPos === "undefined") {
    zPos = 100; // default z if none provided
  }

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
container.addEventListener("mouseenter", (e) => {
  const rect = container.getBoundingClientRect();
  const mouseX = e.clientX - rect.left; // mouse X relative to container
  const mouseY = e.clientY - rect.top; // mouse Y relative to container

  // Map mouseX from [0, rect.width] to [-400, 400]
  const xPos = (mouseX / rect.width) * 800 - 400;

  // Map mouseY from [0, rect.height] to [300, 500]
  const yPos = 300 + (mouseY / rect.height) * 200;

  triggerFlash(xPos, yPos);
});

container.addEventListener("mouseleave", (e) => {
  const rect = container.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const xPos = (mouseX / rect.width) * 800 - 400;
  const yPos = 300 + (mouseY / rect.height) * 200;

  triggerFlash(xPos, yPos);
});

container.addEventListener("click", (e) => {
  const rect = container.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Convert pixel coordinates to normalized device coordinates (NDC)
  const ndcX = (mouseX / rect.width) * 2 - 1;
  const ndcY = -(mouseY / rect.height) * 2 + 1;

  // Create a Raycaster
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);

  // Intersect with a plane at z=0 (or any plane you want)
  const planeZ = -100;
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeZ);

  const point = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, point);

  // Trigger the flash at this 3D point
  trigger3DFlash(point.x, point.y, 100);
});

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

  //   Lightening Animation: Random the flash position and light intensity
  // if (Math.random() > 0.93 || flash.power > 100) {
  //   if (flash.power < 100) {
  //     const flashX = Math.random() * 400;
  //     const flashY = 300 + Math.random() * 200;

  //     console.log(flashX, flashY);

  //     flash.position.set(flashX, flashY, 100);
  //   }
  //   flash.power = 50 + Math.random() * 500;
  // }

  // rerender every time the page refreshes (pause when on another tab)
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
