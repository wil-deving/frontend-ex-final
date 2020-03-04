/**
 * Created by Williams on 21/2/2020.
 */
import React from 'react'
import './TileSectionField.scss'

const TitleSectionField = props => (
    <div className="container-title-section">
        <span id="text" >{props.texto}</span>
    </div>
)

export default TitleSectionField