const timeline = [];

// Instructions
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Welcome to the Lexical Decision Task.</p>
    <p>Press <strong>J</strong> if the letter string is a word.</p>
    <p>Press <strong>F</strong> if the letter string is not a word.</p>
    <p>Press any key to begin.</p>
  `,
  choices: "ALL_KEYS"
});

// Fixation
const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:48px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 1000
};

// Trial
const ldt_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('word'),
  choices: ['f', 'j'],
  data: jsPsych.timelineVariable('metadata'),
  on_finish: function(data){
    data.correct = data.response === data.correct_key;
  }
};

// Procedure
timeline.push({
  timeline: [fixation, ldt_trial],
  timeline_variables: [
    {word: "house", correct_key: 'j'},
    {word: "flirp", correct_key: 'f'}
  ],
  randomize_order: true
});

// End screen
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>Thank you for participating! Press any key to finish.</p>',
  choices: "ALL_KEYS"
});

// Init
jsPsych.init({
  timeline: timeline
});
