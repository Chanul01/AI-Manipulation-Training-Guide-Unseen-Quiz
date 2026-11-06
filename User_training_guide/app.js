// ==============================================================

const app = document.getElementById("app");
const progress = document.getElementById("progress");
let currentScenario = 0;
let answers = {}; // Remembers which answer was chosen for each scenario.
let revealed = {}; // Remembers whether its explanation was opened.
let quizAnswers = {}; // Stores unanswered/selected responses; never scores during quiz.
let quizPage = 0;
let quizSubmitted = false;
let quizStarted = false; // Whether the user started the quiz.
let submissionPending = false; // Whether confirmation is awaiting a click.

// Prevent text entered in content.js from being interpreted as HTML.
function escapeHTML(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

// Show the welcome screen.
function showHome() {
  progress.textContent = "Introduction";
  app.innerHTML = `<div class="panel">
    <h1>${escapeHTML(CONTENT.title)}</h1>
    <p>${escapeHTML(CONTENT.intro)}</p>
    <div class="before"><strong>Before you start</strong><p>${escapeHTML(CONTENT.beforeStart)}</p></div>
    <h2>How the training works</h2>
    <ol>${CONTENT.instructions.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ol>
    <p class="small">After the guide you can try a separate quiz with unfamiliar conversations. Answers are kept only while this page stays open; nothing is sent to a server.</p>
    <div class="actions"><button class="primary" data-action="start">Start scenario 1</button></div>
  </div>`;
}

// Render conversation bubbles. Clues are highlighted only AFTER the answer.
function makeChat(messages, showClues, userSpeaker = "You") {
  return `<div class="chat">${messages.map(m => {
    let text = escapeHTML(m.text);
    if (showClues && m.highlight) {
      const clue = escapeHTML(m.highlight);
      text = text.replace(clue, `<mark>${clue}</mark>`);
    }
    return `<div class="message ${m.speaker === userSpeaker ? "user" : ""}">
      <span class="speaker">${escapeHTML(m.speaker)}</span><p>${text}</p></div>`;
  }).join("")}</div>`;
}

function showScenario(number) {
  currentScenario = number;
  const s = CONTENT.scenarios[number];
  const answered = answers[number] !== undefined;
  const showExplanation = !!revealed[number];
  progress.textContent = `Training: scenario ${number + 1} of ${CONTENT.scenarios.length}`;

  const answerButtons = s.options.map((option, i) => `<button class="option ${answers[number] === i ? "selected" : ""}"
    data-answer="${i}" ${answered ? "disabled" : ""}>${String.fromCharCode(65 + i)}. ${escapeHTML(option)}</button>`).join("");

  const feedback = answered ? `<div class="answer ${answers[number] === s.correct ? "" : "incorrect"}">
    <strong>${answers[number] === s.correct ? "Correct." : "Not quite."}</strong>
    ${escapeHTML(answers[number] === s.correct ? "You've noticed the key concern." : "The explanation below shows what to look for.")}
    <p><strong>Best answer: ${String.fromCharCode(65 + s.correct)}.</strong> ${escapeHTML(s.options[s.correct])}</p>
    </div>` : "";

  const explanation = showExplanation ? `<div id="explanation" class="learning">
    <h2>What was actually going on?</h2>
    <section><h3>The technique</h3><p><strong>${escapeHTML(s.technique)}</strong></p>
      <p>${escapeHTML(s.whatIsHappening)}</p></section>
    <section><h3>Why this may influence someone</h3><p>${escapeHTML(s.whyPersuasive)}</p></section>
    <section><h3>Tips: how to spot this in another conversation</h3>
      <ul>${s.clues.map(clue => `<li>${escapeHTML(clue)}</li>`).join("")}</ul>
      <p class="small">The yellow highlights in the conversation show phrases worth examining.</p></section>
    <section><h3>What you could do</h3><div class="tip">${escapeHTML(s.response)}</div></section>
    <section><h3>What's the difference from ordinary support?</h3><p>${escapeHTML(s.distinction)}</p></section>
  </div>` : "";

  const nextLabel = number === CONTENT.scenarios.length - 1 ? "Finish training" : "Next scenario";
  app.innerHTML = `<div class="before"><strong>Before you start</strong><p>${escapeHTML(CONTENT.beforeStart)}</p></div>
    <div class="layout">
      <div class="conversation"><h2>Conversation: ${escapeHTML(s.title)}</h2>
        <p class="caption">${escapeHTML(s.context)}</p>${makeChat(s.conversation, showExplanation)}</div>
      <div>
        <div class="learning"><h2>Before we explain, what do you think?</h2>
          <p>${escapeHTML(s.question)}</p>
          <div class="options">${answerButtons}</div>
          ${feedback}
          ${answered && !showExplanation ? `<button class="primary" data-action="reveal">Reveal the explanation</button>` : ""}
          ${!answered ? `<p class="small">Read the conversation first. Your choice will unlock the explanation.</p>` : ""}
        </div>
        ${explanation}
      </div>
    </div>
    <div class="actions">
      <button class="secondary" data-action="home">Back to introduction</button>
      ${number > 0 ? `<button class="secondary" data-action="previous">Previous scenario</button>` : ""}
      <button class="primary" data-action="next" ${!showExplanation ? "disabled" : ""}>${nextLabel}</button>
      ${quizStarted && !quizSubmitted ? '<button class="secondary" data-action="returnQuiz">Return to unfinished quiz</button>' : ""}
    </div>`;
}

function showFinish() {
  progress.textContent = "Training complete";
  app.innerHTML = `<div class="panel"><h1>Training guide complete</h1>
    <p>You have explored three ways AI conversations can influence users: emotional guilt, human-like relationship claims, and excessive agreement or flattery.</p>
    <p>Now apply what you learned to <strong>brand-new conversations</strong>. The quiz has 10 questions, and you will see all feedback only after submitting.</p>
    <div class="actions"><button class="primary" data-action="beginQuiz">Proceed to Quiz</button>
    <button class="secondary" data-action="reviewTraining">Review training guide</button></div>
  </div>`;
}

// Quiz screens: 3 questions on each of three new full-length conversations,
// plus 1 question on a fourth new conversation to make 10 questions exactly.
function showQuizIntro() {
  progress.textContent = "Quiz introduction";
  app.innerHTML = `<div class="panel"><h1>Unseen conversations quiz</h1>
    <p>${escapeHTML(QUIZ.introduction)}</p>
    <ol><li>Read each conversation before answering.</li>
    <li>Select one answer for each question.</li>
    <li>You can go back and change answers until you submit.</li>
    <li>All 10 questions must be answered before you can submit.</li>
    <li>If a question is missing, the website will take you to it.</li></ol>
    <p class="small">The conversations and questions are intentionally different from those in the guide. Your answers are not saved when you close this tab.</p>
    <div class="actions"><button class="primary" data-action="quizStart">Start quiz</button>
    <button class="secondary" data-action="reviewTraining">Review training guide</button></div></div>`;
}

function quizCount() { return QUIZ.scenarios.reduce((sum, s) => sum + s.questions.length, 0); }
function quizKey(scenario, question) { return `${scenario}-${question}`; }
function countAnswered() { return Object.keys(quizAnswers).length; }

function showQuizPage(number) {
  quizPage = number;
  const scenario = QUIZ.scenarios[number];
  progress.textContent = `Quiz: conversation ${number + 1} of ${QUIZ.scenarios.length} · ${countAnswered()} / ${quizCount()} answered`;
  const questionBoxes = scenario.questions.map((question, qIndex) => {
    const key = quizKey(number, qIndex);
    const numberBefore = QUIZ.scenarios.slice(0, number).reduce((total, s) => total + s.questions.length, 0);
    return `<section class="question-block"><h3>Question ${numberBefore + qIndex + 1} of ${quizCount()}</h3>
      <p>${escapeHTML(question.prompt)}</p>
      <div class="options">${question.options.map((option, optionIndex) =>
        `<button type="button" class="option ${quizAnswers[key] === optionIndex ? "selected" : ""}"
          data-quiz-question="${qIndex}" data-quiz-answer="${optionIndex}"
          aria-pressed="${quizAnswers[key] === optionIndex}">${String.fromCharCode(65 + optionIndex)}. ${escapeHTML(option)}</button>`).join("")}</div></section>`;
  }).join("");
  const last = number === QUIZ.scenarios.length - 1;
  app.innerHTML = `<div class="quiz-intro"><strong>Unseen assessment</strong>
    <p class="small">Answers and correct techniques remain hidden until final submission.</p>
    <div class="quiz-status" id="quizCount" role="status" aria-live="polite">Answered ${countAnswered()} / ${quizCount()}</div>
    <details class="quiz-help"><summary>How do I use this quiz?</summary><p>Choose one option for each question. Previous/Next lets you review conversations, and your selections stay selected. Explanations appear only after final submission. Missing answers are identified automatically.</p></details></div>
    <div class="layout"><div class="conversation"><h2>Conversation: ${escapeHTML(scenario.title)}</h2>
      <p class="caption">${escapeHTML(scenario.context)}</p>${makeChat(scenario.conversation, false, scenario.userSpeaker)}</div>
      <div class="learning"><h2>Read and judge the conversation</h2>${questionBoxes}</div></div>
    <p id="quizError" role="status" class="status-bad"></p>
    <div class="actions"><button class="secondary" data-action="reviewTraining">Review training guide</button>
      ${number > 0 ? '<button class="secondary" data-action="quizPrevious">Previous conversation</button>' : ''}
      <button class="primary" data-action="${last ? 'quizSubmit' : 'quizNext'}">${last ? 'Review and submit answers' : 'Next conversation'}</button>
      ${last ? '<button class="secondary" data-action="quizFirst">Back to first conversation</button>' : ""}
    </div>`;
  window.scrollTo(0, 0);
}

// Find the first unanswered question to avoid searching manually through all pages.
function firstMissingAnswer() {
  for (let scenario = 0; scenario < QUIZ.scenarios.length; scenario++) {
    for (let question = 0; question < QUIZ.scenarios[scenario].questions.length; question++) {
      if (quizAnswers[quizKey(scenario, question)] === undefined) return {scenario, question};
    }
  }
  return null;
}
function submitQuiz() {
  const missing = firstMissingAnswer();
  if (missing) {
    const questionNumber = QUIZ.scenarios.slice(0, missing.scenario)
      .reduce((total, scenario) => total + scenario.questions.length, 0) + missing.question + 1;
    showQuizPage(missing.scenario);
    document.getElementById("quizError").textContent = `Question ${questionNumber} is unanswered. Please complete it before submitting.`;
    const block = document.querySelectorAll(".question-block")[missing.question];
    if (block) {
      block.scrollIntoView({block: "center"});
      block.querySelector(".option")?.focus();
    }
    return;
  }
  submissionPending = true;
  showQuizConfirm();
}
function showQuizConfirm() {
  progress.textContent = "Quiz: confirm submission";
  app.innerHTML = `<div class="panel"><h1>Submit your quiz?</h1>
    <p>You have completed all ${quizCount()} questions.</p>
    <p>Submitting will lock your answers and reveal your results. You can return to make changes before submitting.</p>
    <div class="actions"><button class="primary" data-action="confirmSubmit">Yes, submit my answers</button>
    <button class="secondary" data-action="cancelSubmit">No, review my answers</button></div></div>`;
}
function getQuizScore() {
  return QUIZ.scenarios.reduce((total, scenario, sIndex) =>
    total + scenario.questions.filter((question, qIndex) => quizAnswers[quizKey(sIndex, qIndex)] === question.correct).length, 0);
}
function showQuizResults() {
  if (!quizSubmitted) return;
  progress.textContent = "Quiz results";
  const score = getQuizScore();
  const message = score <= 5
    ? "Try again. Review the correct answers, then attempt the quiz again."
    : score <= 8
      ? "Good work! You recognise many of the signs. Try again toperfect your understanding."
      : "Excellent work! You have demonstrated strong understanding of AI manipulation techniques.";
  let count = 0;
  const review = QUIZ.scenarios.map((scenario, sIndex) => scenario.questions.map((question, qIndex) => {
    count++;
    const choice = quizAnswers[quizKey(sIndex, qIndex)];
    const correct = choice === question.correct;
    return `<div class="result-card"><h3>Question ${count}: ${escapeHTML(scenario.title)}
      — <span class="${correct ? "status-good" : "status-bad"}">${correct ? "Correct" : "Incorrect"}</span></h3>
      <p><strong>${escapeHTML(question.prompt)}</strong></p>
      <p>Your answer: ${escapeHTML(question.options[choice])}</p>
      <p>Correct answer: ${String.fromCharCode(65 + question.correct)}. ${escapeHTML(question.options[question.correct])}</p></div>`;
  }).join("")).join("");
  app.innerHTML = `<div class="panel"><h1>Your quiz results</h1>
    <h2>Score: ${score} / ${quizCount()}</h2><p><strong>${escapeHTML(message)}</strong></p>
    <p class="note">The quiz measures performance on these 10 unseen questions only. It is not a clinical or professional assessment.</p>
    <div class="actions"><button class="primary" data-action="retryQuiz">Retry quiz</button>
    <button class="secondary" data-action="reviewTraining">Review training guide</button>
    <button class="secondary" data-action="finish">Finish (close tab)</button></div>
    <details class="answer-review"><summary>Review all 10 questions and answers</summary>${review}</details></div>`;
  window.scrollTo(0, 0);
}
function showClosedMessage() {
  progress.textContent = "Finished";
  app.innerHTML = `<div class="panel"><h1>You're finished</h1>
    <p>Thank you for completing the training and quiz.</p>
    <p>Your browser may prevent this page from closing itself. If the tab is still open, please close it manually using <strong>Ctrl+W</strong> (or <strong>Cmd+W</strong> on Mac).</p>
    <div class="actions"><button class="secondary" data-action="reviewTraining">Review training guide</button></div></div>`;
}

// Buttons all use this one click handler.
app.addEventListener("click", function(event) {
  const answerButton = event.target.closest("[data-answer]");
  if (answerButton && answers[currentScenario] === undefined) {
    answers[currentScenario] = Number(answerButton.dataset.answer);
    showScenario(currentScenario);
    return;
  }
  const choiceButton = event.target.closest("[data-quiz-question]");
  if (choiceButton && !quizSubmitted) {
    const qIndex = Number(choiceButton.dataset.quizQuestion);
    const answerIndex = Number(choiceButton.dataset.quizAnswer);
    quizAnswers[quizKey(quizPage, qIndex)] = answerIndex;
    document.querySelectorAll(`[data-quiz-question="${qIndex}"]`).forEach(button => {
      const selected = Number(button.dataset.quizAnswer) === answerIndex;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.getElementById("quizCount").textContent = `Answered ${countAnswered()} / ${quizCount()}`;
    progress.textContent = `Quiz: conversation ${quizPage + 1} of ${QUIZ.scenarios.length} · ${countAnswered()} / ${quizCount()} answered`;
    document.getElementById("quizError").textContent = "";
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "start") showScenario(0);
  else if (action === "reveal") { revealed[currentScenario] = true; showScenario(currentScenario); }
  else if (action === "home") showHome();
  else if (action === "previous") showScenario(currentScenario - 1);
  else if (action === "next" && revealed[currentScenario]) {
    if (currentScenario < CONTENT.scenarios.length - 1) showScenario(currentScenario + 1);
    else showFinish();
  }
  else if (action === "restart") { answers = {}; revealed = {}; showScenario(0); }
  else if (action === "beginQuiz") { quizAnswers = {}; quizSubmitted = false; quizPage = 0; quizStarted = false; submissionPending = false; showQuizIntro(); }
  else if (action === "quizStart") { quizStarted = true; showQuizPage(0); }
  else if (action === "returnQuiz" && quizStarted && !quizSubmitted) showQuizPage(quizPage);
  else if (action === "quizFirst") showQuizPage(0);
  else if (action === "quizNext") showQuizPage(quizPage + 1);
  else if (action === "quizPrevious") showQuizPage(quizPage - 1);
  else if (action === "quizSubmit") submitQuiz();
  else if (action === "confirmSubmit" && submissionPending) { quizSubmitted = true; submissionPending = false; showQuizResults(); }
  else if (action === "cancelSubmit") { submissionPending = false; showQuizPage(QUIZ.scenarios.length - 1); }
  else if (action === "retryQuiz") { quizAnswers = {}; quizSubmitted = false; quizStarted = true; submissionPending = false; showQuizPage(0); }
  else if (action === "reviewTraining") { showScenario(0); }
  else if (action === "finish") { showClosedMessage(); window.close(); }
});

showHome();
