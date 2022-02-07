import { Earcut } from "three/src/extras/Earcut";
import * as THREE from "three";

export function createMesh(vertices, color) {
    const tGeometry = new THREE.BufferGeometry();
    tGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices.flat()), 3)
    );
    const tMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.75,
      color,
      side: THREE.DoubleSide
    });
    const tMesh = new THREE.Mesh(tGeometry, tMaterial);
    tMesh.geometry.computeVertexNormals();
    tMesh.geometry.computeFaceNormals();
  
    return tMesh;
}
  
export function generateBuildingGeometriesFromData(data, currentBuildingIndex) {
  // Iterate buildings, convert each building into a group of lines
  const buildingGeometries = data.items.map((building, index) => {
    const tBuildingGroup = new THREE.Group();
    // Iterate building parts (roof, walls, base, floors)
    building.items.forEach(buildingPart => {
      const tBuildingPartGroup = generateGeometriesFromBuildingPart(
        buildingPart, currentBuildingIndex === index);
      tBuildingGroup.add(tBuildingPartGroup);
    });

    return tBuildingGroup;
  });

  return buildingGeometries;
}

export function createPolyline(vertices, color) {
    const tGeometry = new THREE.BufferGeometry();
    tGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices.flat()), 3)
    );
  
    return new THREE.Line(tGeometry, new THREE.LineBasicMaterial({ color }));
}
  
function generateGeometriesFromBuildingPart(buildingPart, currentBuilding) {
    const tBuildingPartGroup = new THREE.Group();
    if (buildingPart.tags.type === 'floors') {
      // All floors are grouped
      buildingPart.items.forEach(floorGroup => {
        // Each individual floor is a group of polylines
        floorGroup.items.forEach(floorPolygon => {
          // Create mesh from closed polyline (easier to handle selection with a mesh)
          const vertices = floorPolygon.points.map(point => [point.x, point.y, point.z]);
          const triangleIndices = Earcut.triangulate(vertices.flat(Infinity), undefined, 3);
          const tMesh = createMesh(triangleIndices.map(index => vertices[index]), currentBuilding ? 'blue' : 'gray');
          tBuildingPartGroup.add(tMesh);
        });
      });
    } else {
      buildingPart.items.forEach(polygon => {
        // Create line
        const vertices = polygon.points.map(point => [point.x, point.y, point.z]);
        const tLine = createPolyline(vertices, 'lightgray');
        tBuildingPartGroup.add(tLine);
      });
    }
  
    return tBuildingPartGroup;
}
