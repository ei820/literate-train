const terms = [
  {
    term: "Law",
    definition:
      "A body of rules of action or conduct prescribed by controlling authority and having legal binding force.",
  },
  { term: "Jurisprudence", definition: "The study of law." },
  { term: "Courts of Law", definition: "Courts that provide money remedies and rely on case precedent." },
  {
    term: "Equity Courts (Chancery)",
    definition: "Courts offering non-monetary remedies such as injunctions and specific performance.",
  },
  { term: "Merchant's Courts", definition: "Historical courts that handled commercial disputes." },
  { term: "Ecclesiastical Courts", definition: "Historical church-related courts." },
  {
    term: "Criminal Law",
    definition:
      "Law focused on punishment for offenses against society; government must prove guilt beyond a reasonable doubt.",
  },
  {
    term: "Civil Law",
    definition:
      "Law usually involving disputes between private parties; plaintiff must prove case by preponderance of evidence.",
  },
  { term: "Procedural Law", definition: "Rules on how legal cases are processed in courts." },
  { term: "Substantive Law", definition: "Law that defines rights, duties, and prohibited conduct." },
  { term: "Constitutional Law", definition: "Law from U.S. and state constitutions." },
  { term: "U.S. Code", definition: "Federal statutes enacted by Congress." },
  { term: "Code of Federal Regulations", definition: "Rules issued by federal administrative agencies." },
  { term: "Executive Orders", definition: "Directives issued by the President." },
  {
    term: "N.C. General Statutes",
    definition: "State statutes enacted by the North Carolina General Assembly.",
  },
  { term: "Local Laws", definition: "City or county ordinances." },
  { term: "Common Law", definition: "Judge-made law that relies on precedent (stare decisis)." },
  {
    term: "Stare Decisis",
    definition: "The principle of following prior judicial decisions to ensure consistency.",
  },
  {
    term: "National Legal Systems",
    definition: "Common law, civil law, and Sharia-based legal systems are major global categories.",
  },
  { term: "International Law", definition: "Law governing relations between nations." },
  { term: "Cyberlaw", definition: "Law related to internet and digital activity." },
  { term: "Plaintiff", definition: "Party who initiates a civil lawsuit." },
  { term: "Defendant", definition: "Party being sued or prosecuted." },
  {
    term: "Appellant",
    definition: "Party who lost in lower court and appeals the decision.",
  },
  { term: "Appellee", definition: "Party who won in lower court and responds to the appeal." },
  { term: "Judges vs. Justices", definition: "Judges usually serve trial/lower courts; justices often serve supreme courts." },
  {
    term: "Opinion Types",
    definition: "Unanimous, majority, concurring, and dissenting opinions explain court reasoning.",
  },
];

const quizQuestions = [
  {
    prompt: "Which burden of proof is used in criminal cases?",
    options: ["Preponderance of the evidence", "Beyond a reasonable doubt", "Clear and convincing evidence"],
    answer: "Beyond a reasonable doubt",
  },
  {
    prompt: "What does stare decisis mean?",
    options: ["Create new statutes", "Follow precedent", "Dismiss all appeals"],
    answer: "Follow precedent",
  },
  {
    prompt: "Who is the appellant?",
    options: ["Party who won in lower court", "Party who lost in lower court and appeals", "The trial judge"],
    answer: "Party who lost in lower court and appeals",
  },
];

const termGrid = document.getElementById("termGrid");
const searchInput = document.getElementById("searchInput");

function renderTerms(filter = "") {
  termGrid.innerHTML = "";
  const filtered = terms.filter(
    ({ term, definition }) =>
      term.toLowerCase().includes(filter.toLowerCase()) ||
      definition.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filtered.length) {
    termGrid.innerHTML = "<p>No terms match your search.</p>";
    return;
  }

  filtered.forEach(({ term, definition }) => {
    const card = document.createElement("article");
    card.className = "term-card";
    card.innerHTML = `<h3>${term}</h3><p>${definition}</p>`;
    termGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", (event) => renderTerms(event.target.value));

const flashcard = document.getElementById("flashcard");
const flashcardFront = document.getElementById("flashcardFront");
const flashcardBack = document.getElementById("flashcardBack");
const prevCard = document.getElementById("prevCard");
const nextCard = document.getElementById("nextCard");
const flipCard = document.getElementById("flipCard");
let currentCard = 0;

function renderFlashcard() {
  const item = terms[currentCard];
  flashcardFront.textContent = item.term;
  flashcardBack.textContent = item.definition;
  flashcard.classList.remove("flipped");
}

function toggleFlip() {
  flashcard.classList.toggle("flipped");
}

flashcard.addEventListener("click", toggleFlip);
flashcard.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    toggleFlip();
  }
});

flipCard.addEventListener("click", toggleFlip);
prevCard.addEventListener("click", () => {
  currentCard = (currentCard - 1 + terms.length) % terms.length;
  renderFlashcard();
});
nextCard.addEventListener("click", () => {
  currentCard = (currentCard + 1) % terms.length;
  renderFlashcard();
});

const quizPrompt = document.getElementById("quizPrompt");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
let currentQuestion = 0;

function renderQuestion() {
  const question = quizQuestions[currentQuestion];
  quizPrompt.textContent = question.prompt;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "feedback";

  question.options.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      const correct = choice === question.answer;
      quizFeedback.textContent = correct ? "Correct!" : `Not quite. Correct answer: ${question.answer}`;
      quizFeedback.classList.add(correct ? "correct" : "incorrect");

      setTimeout(() => {
        currentQuestion = (currentQuestion + 1) % quizQuestions.length;
        renderQuestion();
      }, 1100);
    });
    quizOptions.appendChild(btn);
  });
}

renderTerms();
renderFlashcard();
renderQuestion();
