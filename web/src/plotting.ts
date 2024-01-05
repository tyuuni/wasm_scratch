import * as THREE from 'three';
import * as Stats from 'stats.js';


const gao = () => {

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);

};

const getCodecModule = async (): Promise<WebAssembly.Instance> => {
    const response = await fetch('/public/codec.wasm').then(r => r.blob());
    const buffer = await response.arrayBuffer();
    const module = await WebAssembly.compile(buffer);
    return WebAssembly.instantiate(module, {});
}

const getMotionData = async (): Promise<boolean> => {
    const axisConfigBlob = await fetch('/axis');
    const motionBufferBlob = await fetch('/motions');
    let data = new Uint8Array(await axisConfigBlob.arrayBuffer());
    console.log(data)
    return true;
}



const app = async () => {
    const codec = await getCodecModule();
    if (!codec) {
        window.alert("wasm file missing");
        return;
    }
    const hasData = await getMotionData();
    if (!hasData) {
        window.alert("no calculated motion data");
        return;
    }
};

app();

// let SCREEN_WIDTH = window.innerWidth;
// let SCREEN_HEIGHT = window.innerHeight;
// let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

// let activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera, activeHelper: THREE.CameraHelper;
// let cameraPerspective: THREE.PerspectiveCamera, cameraPerspectiveHelper: THREE.CameraHelper;
// let cameraOrthoHelper: THREE.CameraHelper;;



// const frustumSize = 600;

// const init = () => {
//     const container = document.createElement('div');
//     document.body.appendChild(container);

//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000);
//     camera.position.z = 2500;

//     cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * aspect, 150, 1000);

//     cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective);
//     scene.add(cameraPerspectiveHelper);

//     const cameraOrtho = new THREE.OrthographicCamera(0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000);

//     cameraOrthoHelper = new THREE.CameraHelper(cameraOrtho);
//     scene.add(cameraOrthoHelper);

//     activeCamera = cameraPerspective;
//     activeHelper = cameraPerspectiveHelper;

//     // counteract different front orientation of cameras vs rig

//     cameraOrtho.rotation.y = Math.PI;
//     cameraPerspective.rotation.y = Math.PI;

//     const cameraRig = new THREE.Group();

//     cameraRig.add(cameraPerspective);
//     cameraRig.add(cameraOrtho);

//     scene.add(cameraRig);

//     const mesh = new THREE.Mesh(
//         new THREE.SphereGeometry(100, 16, 8),
//         new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
//     );
//     scene.add(mesh);

//     const mesh2 = new THREE.Mesh(
//         new THREE.SphereGeometry(50, 16, 8),
//         new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
//     );
//     mesh2.position.y = 150;
//     mesh.add(mesh2);

//     const mesh3 = new THREE.Mesh(
//         new THREE.SphereGeometry(5, 16, 8),
//         new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
//     );
//     mesh3.position.z = 150;
//     cameraRig.add(mesh3);

//     const geometry = new THREE.BufferGeometry();
//     const vertices = [];

//     for (let i = 0; i < 10000; i++) {

//         vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
//         vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
//         vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z

//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

//     const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x888888 }));
//     scene.add(particles);


//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
//     container.appendChild(renderer.domElement);

//     renderer.autoClear = false;


//     const stats = new Stats();
//     container.appendChild(stats.dom);

//     window.addEventListener('resize', function () {

//         SCREEN_WIDTH = window.innerWidth;
//         SCREEN_HEIGHT = window.innerHeight;
//         aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

//         renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

//         camera.aspect = 0.5 * aspect;
//         camera.updateProjectionMatrix();

//         cameraPerspective.aspect = 0.5 * aspect;
//         cameraPerspective.updateProjectionMatrix();

//         cameraOrtho.left = - 0.5 * frustumSize * aspect / 2;
//         cameraOrtho.right = 0.5 * frustumSize * aspect / 2;
//         cameraOrtho.top = frustumSize / 2;
//         cameraOrtho.bottom = - frustumSize / 2;
//         cameraOrtho.updateProjectionMatrix();

//     });
//     document.addEventListener('keydown',
//         function (event) {

//             switch (event.keyCode) {

//                 case 79: /*O*/

//                     activeCamera = cameraOrtho;
//                     activeHelper = cameraOrthoHelper;

//                     break;

//                 case 80: /*P*/

//                     activeCamera = cameraPerspective;
//                     activeHelper = cameraPerspectiveHelper;

//                     break;

//             }

//         });
//     return {
//         container,
//         scene,
//         camera,
//         cameraOrtho,
//         cameraRig,
//         mesh,
//         renderer,
//         stats,
//     };
// }

// const {
//     container,
//     scene,
//     camera,
//     cameraOrtho,
//     cameraRig,
//     mesh,
//     renderer,
//     stats,
// } = init();

// animate();


//

// function animate() {

//     requestAnimationFrame(animate);

//     render();
//     stats.update();

// }


// function render() {

//     const r = Date.now() * 0.0005;

//     mesh.position.x = 700 * Math.cos(r);
//     mesh.position.z = 700 * Math.sin(r);
//     mesh.position.y = 700 * Math.sin(r);

//     mesh.children[0].position.x = 70 * Math.cos(2 * r);
//     mesh.children[0].position.z = 70 * Math.sin(r);

//     if (activeCamera === cameraPerspective) {

//         cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r);
//         cameraPerspective.far = mesh.position.length();
//         cameraPerspective.updateProjectionMatrix();

//         cameraPerspectiveHelper.update();
//         cameraPerspectiveHelper.visible = true;

//         cameraOrthoHelper.visible = false;

//     } else {

//         cameraOrtho.far = mesh.position.length();
//         cameraOrtho.updateProjectionMatrix();

//         cameraOrthoHelper.update();
//         cameraOrthoHelper.visible = true;

//         cameraPerspectiveHelper.visible = false;

//     }

//     cameraRig.lookAt(mesh.position);

//     renderer.clear();

//     activeHelper.visible = false;

//     renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
//     renderer.render(scene, activeCamera);

//     activeHelper.visible = true;

//     renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
//     renderer.render(scene, camera);

// }
