/**
 * Created by Williams on 21/2/2020.
 */
import React from 'react'
import './TitleSectionField.scss'

const TitleSectionField = props => (
    <div className="container-title-section">
        <span id="text" >{props.texto}</span>
        <hr/>
    </div>
)

export default TitleSectionField