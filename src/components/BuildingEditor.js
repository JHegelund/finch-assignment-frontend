import React from 'react';
import '../styles/buildingEditor.css';

export default class BuildingEditor extends React.Component {
    render(){
      return (
        <div className="building-editor-container">
        {this.props.currentBuildingIndex >= 0 ? 
        this.props.initialData.map((buildingData, buildingIndex) => (
          <div
            key={buildingIndex}
            className={`building-editor ${buildingIndex === this.props.currentBuildingIndex ? "active" : ""}`}>
            <p>Building name: {this.props.buildingResponse[buildingIndex].tags.name}</p>
            <p>Building area: {this.props.buildingResponse[buildingIndex].tags.area}</p>
            <strong>Height: </strong>
            <input
              type="number"
              min="0"
              value={buildingData.height}
              onChange={input => this.props.setInitialData(
                this.props.initialData.map((data, index) => index === buildingIndex ? {...data, height: !input.target.value ? "" : parseInt(input.target.value)} : data))}
              />
            <strong>Width: </strong>
            <input
              type="number"
              min="0"
              value={buildingData.width}
              onChange={input => this.props.setInitialData(
                this.props.initialData.map((data, index) => index === buildingIndex ? {...data, width: !input.target.value ? "" : parseInt(input.target.value)} : data))}
              />
            <strong>Roof angle: </strong>
            <input
              type="number"
              min="0"
              value={buildingData.roofAngle}
              onChange={input => this.props.setInitialData(
                this.props.initialData.map((data, index) => index === buildingIndex ? {...data, roofAngle: !input.target.value ? "" : parseInt(input.target.value)} : data))}
              />
          </div>
        )) : (
          <div>
            <p>No building selected - select a building to start editing</p>
          </div>
        )}
      </div>
      );
    }
}