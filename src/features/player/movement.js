import store from '../../config/store'
import {
    SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH, SOLID_OBJECTS
} from '../../config/constants'

export default function handleMovement(player) {

    function getNewPosition(oldPos, direction) {
        switch(direction) {
            case 'WEST':
                return  [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
            case 'EAST':
                return  [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
            case 'NORTH':
                return  [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
            case 'SOUTH':
                return  [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
            default:
                return  [ oldPos[0], oldPos[1] ] 
        }
    }
    
    function observeBoundaries(newPos) {
        return (newPos[0] >= 0 && newPos[0] <= (MAP_WIDTH - SPRITE_SIZE))
            && (newPos[1] >= 0 && newPos[1] <= (MAP_HEIGHT - SPRITE_SIZE))
    }

    function observeImpassable(newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]

        return SOLID_OBJECTS[nextTile] === undefined
    }

    function dispatchMove(newPos) {
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos
            }
        })
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if(observeBoundaries(newPos) && observeImpassable(newPos)) {
            dispatchMove(newPos)
        }
    }

    function handleKeyDown(e) {
        e.preventDefault()

        switch(e.keyCode) {
            case 37:
            case 65:
                // Left arrow
                return attemptMove('WEST')
            case 38:
            case 87:
                // Up arrow
                return attemptMove('NORTH')
            case 39:
            case 68:
                // Right arrow
                return attemptMove('EAST')
            case 40:
            case 83:
                // Down arrow
                return attemptMove('SOUTH')
            default:
                console.log('Unknown key: ', e.keyCode)
        }
    }

    window.addEventListener('keydown', e => {
        handleKeyDown(e)
    })

    return player
}