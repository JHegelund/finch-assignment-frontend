import React from 'react';

export default class Group extends React.Component{
    render(){
        return (
        <group {...this.props}>
            { this.props.items &&
            this.props.items.map((tObject, index) => {
                return <primitive key={ index } object={ tObject } />;
            })
            }
        </group>
        );
    }
}