const util = require('util');
const kleur = require('kleur');
const figlet = require('figlet');

const VFM = require('./bl');

module.exports = class Views {

    _config;

    _currencyFormat;
    _noPrizeMessage;
    _jackpotPrizeMessage;
    _luckyPrizeMessage;
    _consolationPrizeMessage;


    constructor(config) {

        this._config = config;
        this.#setup();

    }


    #setup() {

        this._noPrizeMessage = this._config.has('message.no_prize') ? this._config.get('message.no_prize'): "Sorry bad luck. Give a try again.";
        this._jackpotPrizeMessage = this._config.has('message.jackpot') ? this._config.get('message.jackpot'): "Jackpot!!! <3";
        this._luckyPrizeMessage = this._config.has('message.lucky') ? this._config.get('message.lucky') : "Cool. Your lucky!!! <3";
        this._consolationPrizeMessage = this._config.has('message.consolation') ? this._config.get('message.consolation') : "Good try!!";

        const lang = this._config.has('local.lang') ? this._config.get('local.lang') : "en-GB";
        const currency_code = this._config.has('local.currency') ? this._config.get('local.currency') : "GBP";
        this._currencyFormat = Intl.NumberFormat(lang, {
            style: "currency", currency: currency_code,
        })

    }

    /**
     * Generate the prompt message with the balances.
     * 
     * If the credit balance is avaiable then prompt message with credit balance is generated.
     * 
     * @param {*} vfm 
     * @returns 
     */
    generatePromptMessage(vfm) {
        var message = "Are you ready to bet?";
        if (vfm) {
            if (vfm.credit) {
                message = util.format('I hold %s, you hold %s, In Credit %s. Shall we continue?', this._currencyFormat.format(vfm.myBalance), 
                    this._currencyFormat.format(vfm.yourBalance), this._currencyFormat.format(vfm.credit));
            }
            else {
                message = util.format('I hold %s, you hold %s. Shall we continue?', this._currencyFormat.format(vfm.myBalance), 
                this._currencyFormat.format(vfm.yourBalance));
            }
        }
        return message;
    }

    /**
     * Display the slot on the screen based on the result. Usual the result is
     * from the VFM.slot()
     * 
     * @param {} result 
     */
    diplaySlots(result) {
            
        figlet(result[0].join(""), function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
        })

        if (result[1] === VFM.resultJackpot) {
            console.log(kleur.bgGreen(this._jackpotPrizeMessage));
        }
        else if (result[1] === VFM.resultLucky) {
            console.log(kleur.bgCyan(this._luckyPrizeMessage));
        }
        else if (result[1] === VFM.resultConsolation) {
            console.log(kleur.bgMagenta(this._consolationPrizeMessage));
        }
        else {
            console.log(kleur.bgRed(this._noPrizeMessage));
        }

    }

    currencyFormat(value) {
        return this._currencyFormat.format(value);
    }
}