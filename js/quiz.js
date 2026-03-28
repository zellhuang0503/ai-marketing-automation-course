// ========================================
// Quiz 測驗系統
// ========================================

const Quiz = {
  render(quizData, quizId) {
    return `<div class="quiz-container" id="quiz-${quizId}">
      ${quizData.map((q, i) => `
        <div class="quiz-card" id="quiz-${quizId}-${i}">
          <div class="quiz-question-num">測驗 ${i + 1} / ${quizData.length}</div>
          <div class="quiz-question">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, j) => `
              <div class="quiz-option" data-quiz="${quizId}" data-q="${i}" data-opt="${j}" onclick="Quiz.answer(this, ${j}, ${q.correct})">
                <span class="option-marker">${String.fromCharCode(65 + j)}</span>
                <span>${opt}</span>
              </div>
            `).join('')}
          </div>
          <div class="quiz-feedback-slot"></div>
        </div>
      `).join('')}
    </div>`;
  },

  answer(el, selected, correct) {
    const card = el.closest('.quiz-card');
    const options = card.querySelectorAll('.quiz-option');
    const feedbackSlot = card.querySelector('.quiz-feedback-slot');

    // Prevent re-answering
    if (card.dataset.answered) return;
    card.dataset.answered = 'true';

    const quizId = el.dataset.quiz;
    const qIndex = el.dataset.q;

    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (parseInt(opt.dataset.opt) === correct) {
        opt.classList.add('correct');
      } else if (parseInt(opt.dataset.opt) === selected && selected !== correct) {
        opt.classList.add('incorrect');
      }
    });

    const isCorrect = selected === correct;
    const quizData = Quiz._findQuizData(quizId, parseInt(qIndex));
    const explanation = quizData ? quizData.explanation : '';

    feedbackSlot.innerHTML = `
      <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
        ${isCorrect ? '✅ 正確！' : '❌ 不正確'}
        ${explanation ? `<br><br>${explanation}` : ''}
      </div>`;

    // Save result
    const key = `quiz_${quizId}_${qIndex}`;
    localStorage.setItem(key, JSON.stringify({ correct: isCorrect, selected }));
    Progress.updateOverall();
  },

  _findQuizData(quizId, qIndex) {
    // Try to find quiz data from concepts
    for (const c of CONTENT.concepts) {
      if (c.id === quizId && c.quiz && c.quiz[qIndex]) return c.quiz[qIndex];
    }
    // Try new content pages
    const extras = ['markdown', 'rss', 'json', 'ifelse', 'database'];
    for (const key of extras) {
      if (key === quizId && CONTENT[key] && CONTENT[key].quiz && CONTENT[key].quiz[qIndex]) {
        return CONTENT[key].quiz[qIndex];
      }
    }
    return null;
  },

  getScore(quizId, totalQuestions) {
    let correct = 0;
    let answered = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const result = localStorage.getItem(`quiz_${quizId}_${i}`);
      if (result) {
        answered++;
        if (JSON.parse(result).correct) correct++;
      }
    }
    return { correct, answered, total: totalQuestions };
  },

  resetQuiz(quizId, totalQuestions) {
    for (let i = 0; i < totalQuestions; i++) {
      localStorage.removeItem(`quiz_${quizId}_${i}`);
    }
  }
};
