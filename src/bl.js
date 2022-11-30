'use strict';
const Rules = require('./rules');

module.exports = class VFM {

    constructor(yourBalance) {
        this.slotSize = 4;
        this.myBalance = 20;
        this.yourBalance = yourBalance;
        this.rules = new Rules();
        this.credit = 0;
    }

    /**
     * This finction generat the slot position with the combination of ABCDE, based 
     * on the siz of the slot (slotSize) configuration
     * 
     * @returns return array of slot's position. Eg [ 'A', 'B', 'D, 'C']
     */
    #makeSlotPosition() {
        var result = '';
        var characters = 'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE';
        var charactersLength = characters.length;
        for (var i = 0; i < this.slotSize; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result = result.split('');
        result = result.sort((a, b) => 0.5 - Math.random());
        return result;
    }

    /**
     * This is primary function for the spin action. The following are the process carry out in 
     * this function.
     * 
     * 1. Making the slot's position
     * 2. Process the result based on the slot position rules
     * 3. Credit the balance based on the slot position rules
     * 
     * @returns list of slot position, and message
     */
    spin() {
        const slotPosition = this.#makeSlotPosition(4)

        // Charge fee .20p for spin
        if (this.myBalance != 0) {
            this.myBalance += 0.2;
            this.yourBalance -= 0.20;

        }
        else { // Else charge the fee from the credit
            this.myBalance += 0.2;
            this.credit -= 0.2;
        }

        var message = "Sorry bad luck. Give a try";

        if (this.rules.isJackpot(slotPosition)) { // Process for Jackpot
            if (this.myBalance >= 20) {
                this.myBalance -= 20;
                this.yourBalance += 20;
            }
            else {
                this.yourBalance += this.myBalance;
                this.credit += (20 - this.myBalance);
                this.myBalance = 0;
            }
            message = "Jackpot!!! <3";
        }
        else if (this.rules.isLucky(slotPosition)) { // Process for different character
            if (this.myBalance >= 10) {
                this.myBalance -= 10;
                this.yourBalance += 10;
            }
            else {
                this.yourBalance += this.myBalance;
                this.credit += (10 - this.myBalance);
                this.myBalance = 0;
            }
            message = "Cool. Your lucky!!! <3";
        }
        else if (this.rules.isKeepTheChange(slotPosition)) { // Process for two or more adjacent slots containing the same character
            if (this.myBalance >= 1) {
                this.myBalance -= 1;
                this.yourBalance += 1;
            }
            else {
                this.yourBalance += this.myBalance;
                this.credit += (1 - this.myBalance);
                this.myBalance = 0;
            }
            message = "Good try!!"
        }

        return [slotPosition, message];
    }

    /**
     * Find the is there is any spin avaiable for the player based on the
     * balances(yourBalance, credit)
     * 
     * @returns Boolen. If any balance avaiable return true, elese false
     */
    isSpinAvailable() {
        return this.yourBalance || this.credit;
    }
}