
// ------------------ ELEMENTS ------------------
const chatBotBtn = document.getElementById('chatBotBtn');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// ------------------ CLEAR OLD STORAGE (wipe everything) ------------------
sessionStorage.removeItem("eduHacksChat");

// ------------------ QA PAIRS ------------------
const qaPairs = [
  { keywords: ["how do i apply","application process","apply","university application","apply for university"], answer: `To apply, start by selecting your desired university and program. Fill out the online application form, upload your ID and academic documents, and pay the application fee. You can get step-by-step help on our <a href="../HTML files/howToApply.html">Apply to University page</a>.` },
  { keywords: ["bursary","bursaries","funding","financial aid","nsfas","funds","scholarship","scholarships"], answer: `Popular bursaries include NSFAS, Funza Lushaka, Sasol, FNB, Absa, and Standard Bank. Each has its own requirements. Visit our <a href="../HTML files/Bursaries.html">Bursaries page</a> for details and how to apply.` },
  { keywords: ["nsfas application","apply nsfas","nsfas","nsfas website","financial aid nsfas"], answer: `NSFAS is the National Student Financial Aid Scheme. To apply, visit <a href="https://www.nsfas.org.za">NSFAS Official Website</a>, create an account, and submit your application online before the deadline.` },
  { keywords: ["study abroad","foreign university","overseas study","international studies","study outside south africa"], answer: `Studying abroad involves choosing a program, preparing documents, applying for scholarships, and handling visas. Check our <a href="../HTML files/StudyAbroad.html">Study Abroad guide</a> for detailed instructions.` },
  { keywords: ["required documents","documents needed","application documents","what to submit","bursary documents"], answer: `You will typically need your ID, academic transcripts, proof of income, and possibly a motivational letter. Always check the specific requirements of each bursary or program.` },
  { keywords: ["multiple bursaries","apply for more than one bursary","more than one bursary"], answer: `You can apply for multiple bursaries, but normally you may only accept one when awarded. Read each bursary's conditions carefully.` },
  { keywords: ["contact edu hacks","contact support","email edu hacks","help","get in touch"], answer: `You can reach us via our <a href="../HTML files/FAQ.html">Contact page</a> or email us at <a href="QueryCrest">QueryCrest@gmail.com</a>.` },
  { keywords: ["hello","hi","hey","good morning","good afternoon","greetings"], answer: "Hello! 👋 Welcome to EduHacks. I can assist you with bursaries, studying abroad, university applications, and study tips. How can I help you today?" },
  { keywords: ["thanks","thank you","thx","appreciate"], answer: "You're welcome! 😊 Let me know if you have more questions." },
  { keywords: ["study tips","how to study","learning tips","exam preparation","study smarter"], answer: `We have a complete guide to studying smarter. Visit our <a href="../HTML files/tipsAndTutorials.html">Study Tips page</a> for strategies and advice on exams, time management, and productivity.` }
];

// ------------------ CHAT WINDOW ------------------
chatBotBtn.onclick = () => {
  chatWindow.style.display = 'flex';
  chatBotBtn.style.display = 'none';
  chatInput.focus();
};

chatClose.onclick = () => {
  chatWindow.style.display = 'none';
  chatBotBtn.style.display = 'flex';
};

// ------------------ APPEND MESSAGE ------------------
function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'userMsg' : 'botMsg');
  const bubble = document.createElement('div');
  bubble.classList.add('msgBubble');
  bubble.innerHTML = text;
  msgDiv.appendChild(bubble);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ------------------ GET ANSWER ------------------
function getAnswer(input) {
  input = input.toLowerCase().trim();
  for (let pair of qaPairs) {
    for (let kw of pair.keywords) {
      if (input.includes(kw)) {
        return pair.answer;
      }
    }
  }
  return "Sorry, I don't have an answer for that yet. You can ask me about bursaries, studying abroad, university applications, or study tips!";
}

// ------------------ SEND MESSAGE ------------------
function sendMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;
  appendMessage(userText, 'user');
  chatInput.value = '';
  
  setTimeout(() => {
    const answer = getAnswer(userText);
    appendMessage(answer, 'bot');
  }, 600);
}

sendBtn.onclick = sendMessage;
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ------------------ WELCOME MESSAGE ------------------
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    appendMessage("Hi! 👋 Welcome to QueryCrest. I can help you with bursaries, studying abroad, university applications, and study tips. How can I assist you today?", 'bot');
  }, 800);
});

