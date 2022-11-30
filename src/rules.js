'use strict';

module.exports = class Rules {

    /**
     * Check whether the slot position is in the Jackpot position
     * 
     * T
     * @param {*} slotPosition 
     * @returns If the characters in each slot are the same then true, else false
     */
    isJackpot(slotPosition) {
 
        return slotPosition.every(char => char === slotPosition[0]);
 
    }

    /**
     * Check whether the slot position is in the Different/Unqiue position
     *  
     * @param {*} slotPosition 
     * @returns If each slot has a different character then true, else false
     */
    isLucky(slotPosition) {
 
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        var unique = slotPosition.filter(onlyUnique);
        return unique.length === 4
 
    }

    /**
     * Check whether the slot position is in the Adjacent same position
     *  
     * @param {*} slotPosition 
     * @returns If each slot have two or more adjacent slots containing the same character then true, else false
     */
    isKeepTheChange(slotPosition) {
        
        for (var index = 0; index < slotPosition.length - 1; index++) {
            if (slotPosition[index] == slotPosition[index + 1]) {
                return true;
            }
        }
        return false;
 
    }

}