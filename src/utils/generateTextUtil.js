import * as THREE from "three";

let font;
export async function loadFont() {
  return font ??
    new Promise(resolve => {
      new THREE.FontLoader().load('/OpenSans_Regular.json', resolve);
    })
    .then(loadedFont => loadedFont);
}

export function createText(text, color, font, position) {
  const tGeometry = new THREE.TextGeometry(
    text,
    {
      font,
      size: 2000,
      height: 10,
      bevelEnabled: false,
      curveSegments: 24
    }
  );
  const tMaterial = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
  const tMesh = new THREE.Mesh(tGeometry, tMaterial);
  tMesh.position.set(...position);
  tMesh.rotateX( Math.PI / 2 );
  return tMesh;
}