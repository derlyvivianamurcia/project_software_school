import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader({visible}) {
    return visible  
        ? <div className="modal-backdrop show">
            <Spinner animation="grow" role="status" variant="info" size="lg" style={{"top": "50%","position": "absolute", "left": "50%"}}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
        :<></> 
}
