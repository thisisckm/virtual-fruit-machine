const util = require('util');
const kleur = require('kleur');

/**
 * Generate the prompt message with the balances.
 * 
 * If the credit balance is avaiable then prompt message with credit balance is generated.
 * 
 * @param {*} vfm 
 * @returns 
 */
function generatePromptMessage(vfm) {
    var message = "Are you ready to bet?";
    if (vfm) {
        if (vfm.credit) {
            message = util.format('I hold %s, you hold %s, In Credit %s. Shall we continue?', vfm.myBalance.toFixed(2), 
                vfm.yourBalance.toFixed(2), vfm.credit.toFixed(2));
        }
        else {
            message = util.format('I hold %s, you hold %s. Shall we continue?', vfm.myBalance.toFixed(2), vfm.yourBalance.toFixed(2));
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
function diplaySlots(result) {
    console.log();
    console.log(kleur.bold().bold().yellow(result[0].join(" ")));
    console.log();
    console.log(kleur.bgGreen(result[1]));
    console.log();
}
module.exports = { generatePromptMessage, diplaySlots };
