import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'

import './styles.css'

function getTileSprite(type) {
    switch(type) {
        default:
        case 0:
            return 'grass'
        case 1:
            return 'rock'
        case 2:
            return 'tree'
        case 3:
            return 'chest'
    }
}

function MapTile(props) {
    return <div
        className={`tile ${getTileSprite(props.tile)}`}
        style={{
            height: SPRITE_SIZE,
            width: SPRITE_SIZE
        }}
    />
}

function MapRow(props) {
    return <div className="row"
        style={{
            height: SPRITE_SIZE
        }}
    >
        {
            props.tiles.map(tile => <MapTile tile={tile} />)
        }
    </div>
}

function Map(props) {
    return (
        <div
            style={{
                width: '800px',
                height: '400px',
                border: '4px solid white'
            }}
        >
            {
                props.tiles.map(row => <MapRow tiles={row} />)
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles
    }
}

export default connect(mapStateToProps)(Map)