const util = require('util');
const prompts = require('prompts');
const config = require('config');

const Views = require('./views');
const VFM = require('./bl');

const bet = config.has('bet') ? config.get('bet'): 0.20;
const vfm = new VFM(config);
const views = new Views(config);

// Prompt configuration
var promptList = [{
  type: 'number',
  name: 'yourBalance',
  message: 'Your Balance?',
  validate: value => value < 1 ? `Balance should be more than £1` : true
},
{
  type: 'select',
  name: 'value',
  message: 'Are you ready to spin?',
  onRender(kleur) {
    this.msg = views.generatePromptMessage(vfm);
  },
  choices: [
    { title: 'spin', description: util.format('a spin cost you %s', views.currencyFormat(bet)), value: '1' },
    { title: 'nope', description: 'bye bye!', value: '0' }

  ],
  initial: 1
}]


// Prompt action
async function prompt() {

  var response = await prompts(promptList[0])
  if (promptList.length === 2) { // Check whether game is initialized
    vfm.yourBalance = response.yourBalance;
    promptList = [promptList[1]];
    return prompt();
  }
  else if (response.value == 1) { // Check whether spin is selected
    views.diplaySlots(vfm.spin());
    return vfm.isSpinAvailable() ? prompt() : false; // Check whether user have spain to continue
  }
  else {
    return false;
  }

}
prompt();
