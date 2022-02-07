import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import CameraControls from "./CameraControls";
import { loadData } from "./services/fetchBuildingData";
import { loadFont, createText } from "./utils/generateTextUtil";
import * as ObjectGenerator from "./utils/generateObjectsUtil";
import Group from "./components/Group";
import BuildingEditor from "./components/BuildingEditor";

THREE.Object3D.DefaultUp.set(0, 0, 1);

export default function App() {
  const [initialData, setInitialData] = useState(
    [{"width": 10000, "height": 10000, "roofAngle": 60},
      {"width": 5000, "height": 10000, "roofAngle": 60},
      {"width": 2500, "height": 10000, "roofAngle": 60}]
  );

  const [buildingResponse, setBuildingResponse] = useState([]);
  const [buildingGeometries, setBuildingGeometries] = useState();
  const [sampleGeometries, setSampleGeometries] = useState([]);

  const [currentBuildingIndex, setCurrentBuildingIndex] = useState();

  useEffect(() => {
    loadData(initialData)
      .then(data => {
        setBuildingResponse(data.items);
        return data;
      })
      .then(data => ObjectGenerator.generateBuildingGeometriesFromData(data, currentBuildingIndex))
      .then(geometries => setBuildingGeometries(geometries));
  }, [initialData, currentBuildingIndex]);

  useEffect(() => {
    loadFont()
      .then(font => {
        // Sample threejs objects
        setSampleGeometries([
          ObjectGenerator.createPolyline(
            [
              [0, 10000, 0],
              [10000, 10000, 0],
              [10000, 10000, 10000],
              [0, 10000, 10000],
              [0, 10000, 0]
            ],
            "hotpink"
          ),
          createText("sample", "purple", font, [0, 10000, 10000])
        ]);
      });
  }, []);

  return (
    <div>
      <Canvas style = {{ height: 250 }}
      camera = {{
        up: [0, 0, 1],
        position: [40000, 500, 20000],
        near: 1000,
        far: 400000,
        fov: 70
      }}
      onCreated = {({ gl }) => {
        gl.setClearColor("#eeeeee");
      }}>
        <ambientLight intensity={ 1.0 } />
        <directionalLight intensity={ 0.2 } position = { [1, 1, 1] } />
        <Group items={ sampleGeometries } />
        { buildingGeometries && buildingGeometries.length > 0 &&
          buildingGeometries.map((buildingGeometry, index) => {
            return <primitive
              key={ index }
              object={ buildingGeometry }
              onClick={() => {
                setCurrentBuildingIndex(index)
              }} />;
          })
        }
        <CameraControls />
      </Canvas>
      <BuildingEditor
        initialData={initialData}
        currentBuildingIndex={currentBuildingIndex}
        buildingResponse={buildingResponse}
        setInitialData={setInitialData}
      />
    </div>
  );
}
