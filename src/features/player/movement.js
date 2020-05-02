import store from '../../config/store'
import { SPRITE_SIZE } from '../../config/constants'

export default function handleMovement(player) {
    
    function getNewPosition(direction) {
        const oldPos = store.getState().player.position

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

    function dispatchMove(direction) {
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: getNewPosition(direction)
            }
        })
    }

    function handleKeyDown(e) {
        e.preventDefault()

        switch(e.keyCode) {
            case 37:
            case 65:
                // Left arrow
                return dispatchMove('WEST')
            case 38:
            case 87:
                // Up arrow
                return dispatchMove('NORTH')
            case 39:
            case 68:
                // Right arrow
                return dispatchMove('EAST')
            case 40:
            case 83:
                // Down arrow
                return dispatchMove('SOUTH')
            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', e => {
        handleKeyDown(e)
    })

    return player
}