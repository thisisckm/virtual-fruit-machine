'use strict';
const Rules = require('./rules');

module.exports = class VFM {

    static get resultJackpot() {
        return 1;
    }

    static get resultLucky() {
        return 2;
    }

    static get resultConsolation() {
        return 3;
    }

    static get resultNone() {
        return 4;
    }

    _slotSize = 4;
    _config;
    _fruits;

    _bet;
    _jackpotPrize;
    _luckyPrize;
    _xConsolation;

    constructor(config) {
    
        this._config = config;
        this.myBalance = 20;
        this.yourBalance = 0;
        this.credit = 0;
        this.rules = new Rules();

        this.#init();
        this.#setupPrize();

    }

    #init() {

        const difficulty_level = this._config.has('difficulty_level') ? this._config.get('difficulty_level') : 'normal';

        switch(difficulty_level) {
            case 'normal':
                this._fruits = 'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE';
                break;
            case 'easy':
                this._fruits = 'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG';
                break;
            case 'hard':
                this._fruits = 'AAAAAAAABBBBBBBBBBBBBBBBBBCCCCCCCCCCC';
                break;
            default:
                this._fruits = 'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE';
                break;
        }

        this._bet = this._config.has('bet') ? this._config.get('bet'): 0.20;

    }

    #setupPrize() {
    
        this._jackpotPrize = this._config.has('prize.jackpot') ? this._config.get('prize.jackpot'): 20;
        this._luckyPrize = this._config.has('prize.lucky') ? this._config.get('prize.lucky') : 10;
        this._xConsolation = this._config.has('prize.consolation_time') ? this._config.get('prize.consolation_time') : 5;

    }

    #shuffle(data) {
        var a = data.split(""),
        n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    /**
     * This finction generat the slot position with the combination of ABCDE, based 
     * on the siz of the slot (slotSize) configuration
     * 
     * @returns return array of slot's position. Eg [ 'A', 'B', 'D, 'C']
     */
    #makeSlotPosition() {
        var result = '';
        var characters = this._fruits;
        characters = this.#shuffle(characters);
        var charactersLength = characters.length;
        for (var i = 0; i < this._slotSize; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result = result.split("");
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
     * @returns list of slot position, and resultType
     */
    spin() {
        const slotPosition = this.#makeSlotPosition()

        // Charge fee for spin
        if (this.myBalance != 0) {
            this.myBalance += this._bet;
            this.yourBalance -= this._bet;

        }
        else { // Else charge the fee from the credit
            this.myBalance += this._bet;
            this.credit -= this._bet;
        }

        var resultType = VFM.resultNone;
        
        if (this.rules.isJackpot(slotPosition)) { // Process for Jackpot
            if (this.myBalance >= this._jackpotPrize) {
                this.myBalance -= this._jackpotPrize;
                this.yourBalance += this._jackpotPrize;
            }
            else {
                this.yourBalance += this.myBalance;
                this.credit += (this._jackpotPrize - this.myBalance);
                this.myBalance = 0;
            }
            resultType = VFM.resultJackpot;
        }
        else if (this.rules.isLucky(slotPosition)) { // Process for different character
            if (this.myBalance >= this._luckyPrize) {
                this.myBalance -= this._luckyPrize;
                this.yourBalance += this._luckyPrize;
            }
            else {
                this.yourBalance += this.myBalance;
                this.credit += (this._luckyPrize - this.myBalance);
                this.myBalance = 0;
            }
            resultType = VFM.resultLucky;
        }
        else if (this.rules.isKeepTheChange(slotPosition)) { // Process for two or more adjacent slots containing the same character
            
            const consolationPrize = this._xConsolation * this._bet;

            if (this.myBalance >= consolationPrize) {
                this.myBalance -= consolationPrize;
                this.yourBalance += consolationPrize;
            }
            else {
                this.yourBalance += this.myBalance;
                this.credit += (consolationPrize - this.myBalance);
                this.myBalance = 0;
            }
            resultType = VFM.resultConsolation;

        }

        return [slotPosition, resultType];
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
