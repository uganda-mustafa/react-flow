import React, { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
/**
 * Node Details: 
 * Required Parameters - x, y
 * Optional Parameters - ?
 * Input - ?
 * Output - ?
 */
function ClickNode({ id, data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);
    return (
        <>
            <Handle type="target" position={Position.Top} id={id} isConnectable={isConnectable} />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        {data.label}
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />
        </>
    );
}


export default memo(ClickNode);
