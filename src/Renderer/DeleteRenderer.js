import React from 'react';

function DeleteRenderer(props) {

    const buttonClick = (e) => {
        let deletedRow = props.node.data;
        e.gridApi.updateRowData({ remove: [deletedRow] })  // It will delete amd update the row 
    }

    return (
        <span><button  id='deleteBtn' onClick={() => buttonClick(props.node)}>X</button></span>
    );
}


export default DeleteRenderer;