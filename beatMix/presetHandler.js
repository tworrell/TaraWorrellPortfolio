// Use this presets array inside your presetHandler
const presets = require('./presets');

function getPreset(index) {
    return presets[index] || null;
}


function createOrUpdatePreset(index, array) {
    if (!presets[index]) {
        return;
      }
      presets[index] = array;
      return presets[index];
}



function presetHandler(method, index, presetNewArr) {
    if (method === 'GET') {
        let preset = getPreset(index);
        if (preset) {
            return [200, preset];
        } else {
            return [404];
        }
      } else if (method === 'PUT') {
          const newPreset = createOrUpdatePreset(index, presetNewArr);
          if (newPreset) {
              return [200, newPreset];
        } else {
            return [404];
        }
      } else {
          return [400];
      }
}

// Leave this line so that the presetHandler function can be used elsewhere:
module.exports = presetHandler;
