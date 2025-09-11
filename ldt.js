const timeline = [];

// ----------------------
// Instructions
// ----------------------
const instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="instructions">
      <p>Welcome to the Lexical Decision Task.</p>
      <p>You will see a series of letter strings.</p>
      <p>If the string is a <strong>real English word</strong>, press the <strong>J</strong> key.</p>
      <p>If the string is a <strong>non-word</strong>, press the <strong>F</strong> key.</p>
      <p>Press any key to begin.</p>
    </div>
  `,
  choices: "ALL_KEYS"
};

timeline.push(instructions);

// ----------------------
// Fixation cross
// ----------------------
const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:48px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 1000
};

// ----------------------
// Lexical Decision Task trial
// ----------------------
const ldt_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('word'),
  choices: ['f', 'j'],
  data: jsPsych.timelineVariable('metadata'),
  on_finish: function(data){
    data.correct = data.response === data.correct_key;
  }
};

// ----------------------
// Procedure: fixation → trial
// ----------------------
const ldt_procedure = {
  timeline: [fixation, ldt_trial],
  timeline_variables: [
    {word: "house", correct_key: 'j'},
    {word: "flirp", correct_key: 'f'},
    {word: "table", correct_key: 'j'},
    {word: "blost", correct_key: 'f'}
  ],
  randomize_order: true
};

timeline.push(ldt_procedure);

// ----------------------
// End screen
// ----------------------
const end_screen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>Thank you for participating!<br>
             Your responses have been recorded.</p>
             <p>You may now close this window.</p>`,
  choices: "ALL_KEYS"
};

timeline.push(end_screen);

// ----------------------
// Initialize
// ----------------------
jsPsych.init({
  timeline: timeline,
  on_finish: function(){
    // Save data locally as CSV (can later redirect to Qualtrics)
    jsPsych.data.get().localSave('csv','ldt_data.csv');
  }
});
