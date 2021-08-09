import React from 'react'
import { useEffect } from 'react';
import './css/Alert.css'

function Alert(props) {
    if (props.show) {
        useEffect(() => {
            clearTimeout(timer);
            console.log('alert rendered')
            const timer = setTimeout(() => {
                props.closeAlert()
            }, 40000000)
        });
    }

    return (
        props.show ?
            <div className="Alert">
                <button onClick={props.closeAlert}>✖</button>
                {props.children}
            </div>
            : <React.Fragment></React.Fragment>
    )
}

export default Alert
