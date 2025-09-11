const timeline = [];

// Example: Lexical Decision Task trial
const ldt_trial = {
  type: 'html-keyboard-response',
  stimulus: jsPsych.timelineVariable('word'),
  choices: ['f', 'j'],  // e.g., nonword vs. word
  data: jsPsych.timelineVariable('metadata'),
  on_finish: function(data){
    data.correct = data.response === data.correct_key;
  }
};

const ldt_procedure = {
  timeline: [ldt_trial],
  timeline_variables: [
    {word: "house", correct_key: 'j'},
    {word: "flirp", correct_key: 'f'}
  ]
};

timeline.push(ldt_procedure);

jsPsych.init({
  timeline: timeline,
  on_finish: function(){
    jsPsych.data.get().localSave('csv','ldt_data.csv');
  }
});
