const prompts = require('prompts');
const views = require('./views');
const VFM = require('./bl');
const vfm = new VFM(0);

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
    { title: 'spin', description: 'a spin cost you 20p', value: '1' },
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
