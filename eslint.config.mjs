import harmony from '@beskar-labs/harmony';

// Fix weird ESLint regression
harmony[0].languageOptions.globals.AudioWorkletGlobalScope =
  harmony[0].languageOptions.globals['AudioWorkletGlobalScope '];

delete harmony[0].languageOptions.globals['AudioWorkletGlobalScope '];

export default harmony;
