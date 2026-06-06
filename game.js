// js 코드 분리했습니다
const ALL_QUESTIONS = [
  { emoji:'🦅', cat:'조류 · 상류', q:'흰꼬리수리에 대한 설명으로 옳은 것은?', choices:['오렌지색 앞니가 특징이다','날개 폭이 약 1.9~2.3m인 대형 맹금류이다','부드러운 등딱지를 가진다','토종 가재를 밀어낸다'], ans:1, explain:'흰꼬리수리는 한강 상류에서 볼 수 있는 대형 맹금류이며, 날개 폭이 약 1.9~2.3m에 달해요.' },
  { emoji:'🦅', cat:'조류 · 상류', q:'흰꼬리수리의 보호 등급은?', choices:['멸종위기 야생동물 1급','생태계 교란 야생생물','일반 가축','외래 식물'], ans:0, explain:'흰꼬리수리는 환경부 지정 멸종위기 야생동물 1급으로 보호받고 있어요.' },
  { emoji:'🦦', cat:'포유류 · 상류', q:'수달이 발견된다는 것은 무엇을 의미하나요?', choices:['물이 매우 오염되었다는 뜻','생태계가 건강하다는 뜻','외래종이 늘었다는 뜻','강둑이 무너졌다는 뜻'], ans:1, explain:'수달은 깨끗한 물에서 살아가는 동물이라 한강 생태계가 건강하다는 신호로 볼 수 있어요.' },
  { emoji:'🦦', cat:'포유류 · 상류', q:'수달의 주요 먹이는?', choices:['물고기, 개구리, 가재','수생식물만','나무 열매만','흙과 모래'], ans:0, explain:'수달은 물고기, 개구리, 가재 등을 먹고 사는 포유류예요.' },
  { emoji:'🐢', cat:'물속 생물 · 중류', q:'자라의 특징으로 옳은 것은?', choices:['오렌지색 앞니가 있다','등딱지가 부드럽고 코가 길쭉하다','날개 폭이 2m 이상이다','강한 포식성 외래 어종이다'], ans:1, explain:'자라는 거북과 비슷하지만 부드러운 등딱지와 길쭉한 코가 특징이에요.' },
  { emoji:'🐢', cat:'물속 생물 · 중류', q:'자라가 주로 사는 곳은?', choices:['강과 호수 주변','사막','깊은 바다','나무 위'], ans:0, explain:'자라는 강이나 호수 주변의 모래밭 근처에서 생활해요.' },
  { emoji:'🦞', cat:'⚠️위협종 · 중류', q:'미국가재의 원산지는?', choices:['남아메리카','북아메리카','아프리카','한국'], ans:1, explain:'미국가재는 북아메리카 원산의 외래 갑각류예요.' },
  { emoji:'🦞', cat:'⚠️위협종 · 중류', q:'미국가재가 문제가 되는 이유는?', choices:['토종 가재의 서식지를 차지하기 때문에','물을 깨끗하게 만들기 때문에','멸종위기 1급이기 때문에','날개가 너무 크기 때문에'], ans:0, explain:'미국가재는 번식력과 적응력이 강해 토종 가재와 수생생물의 서식지를 위협해요.' },
  { emoji:'🐡', cat:'⚠️위협종 · 하류', q:'배스에 대한 설명으로 옳은 것은?', choices:['수생식물을 대량으로 먹는다','북미 원산의 육식성 물고기이다','부드러운 등딱지를 가진다','깨끗한 물의 지표 동물이다'], ans:1, explain:'배스는 북미 원산의 육식성 물고기로 토종 물고기와 양서류를 잡아먹어 생태계를 교란해요.' },
  { emoji:'🐡', cat:'⚠️위협종 · 하류', q:'배스가 한강 생태계에 주는 영향은?', choices:['토종 어류 감소','수질 정화','새들의 둥지 제공','강둑 안정화'], ans:0, explain:'배스는 강한 포식성 때문에 토종 어류 감소를 일으킬 수 있어요.' },
  { emoji:'🦫', cat:'⚠️위협종 · 하류', q:'뉴트리아의 특징적인 앞니 색깔은?', choices:['검은색','흰색','오렌지색','파란색'], ans:2, explain:'뉴트리아는 오렌지색 앞니가 특징인 남아메리카 원산 외래 포유류예요.' },
  { emoji:'🦫', cat:'⚠️위협종 · 하류', q:'뉴트리아가 생태계에 피해를 주는 방식은?', choices:['수생식물을 파괴하고 강둑에 굴을 판다','물고기만 보호한다','날개로 강물을 휘젓는다','꽃가루를 옮긴다'], ans:0, explain:'뉴트리아는 수생식물을 대량으로 먹고 강둑에 굴을 파 하천 환경을 훼손해요.' }
];

let questions = [];
let currentQ  = 0;
let score     = 0;
let answered  = false;
let difficulty = 'easy';
let timerID   = null;
let timeLeft  = 20;

// 난이도 선택
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    difficulty = btn.dataset.diff;
  });
});

function shuffle(arr) { return [...arr].sort(()=>Math.random()-0.5); }

function startQuiz() {
  const shuffled = shuffle(ALL_QUESTIONS);
  if (difficulty==='easy')   questions = shuffled.slice(0,4);
  else if (difficulty==='normal') questions = shuffled.slice(0,8);
  else questions = shuffled;
  currentQ=0; score=0; answered=false;
  document.getElementById('startScreen').style.display='none';
  document.getElementById('quizScreen').style.display='block';
  renderQ();
}

function renderQ() {
  answered = false;
  clearTimer();
  const q = questions[currentQ];
  const total = questions.length;
  document.getElementById('qProgress').textContent = `${currentQ+1} / ${total}`;
  document.getElementById('progressFill').style.width = `${(currentQ/total)*100}%`;
  document.getElementById('scoreLive').textContent = `${score}점`;
  document.getElementById('qCategory').textContent = q.cat;
  document.getElementById('qEmoji').textContent = q.emoji;
  document.getElementById('qText').textContent = q.q;

  const fb = document.getElementById('feedbackBox');
  fb.className='feedback-box'; fb.textContent='';
  const nb = document.getElementById('nextBtn');
  nb.classList.remove('show');
  nb.textContent = currentQ+1 < total ? '다음 문제 →' : '결과 보기 🏆';

  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML='';
  // shuffle choices with tracking of answer
  const indices = shuffle([0,1,2,3]);
  const newAns = indices.indexOf(q.ans);
  indices.forEach((origIdx, i) => {
    const btn = document.createElement('button');
    btn.className='choice';
    btn.textContent = `${['①','②','③','④'][i]} ${q.choices[origIdx]}`;
    btn.addEventListener('click', () => selectAnswer(i, newAns, origIdx===q.ans));
    choicesEl.appendChild(btn);
  });

  if (difficulty==='hard') startTimer();
  else {
    document.getElementById('timerCircle').style.display='none';
    document.getElementById('timerLabel').textContent='';
  }
}

function selectAnswer(idx, correctIdx, isCorrect) {
  if (answered) return;
  answered = true;
  clearTimer();
  const btns = document.querySelectorAll('.choice');
  btns.forEach((b,i)=>{ b.disabled=true; if(i===correctIdx) b.classList.add('correct'); else if(i===idx&&!isCorrect) b.classList.add('wrong'); });
  const fb = document.getElementById('feedbackBox');
  if (isCorrect) {
    score += difficulty==='hard' ? 3 : difficulty==='normal' ? 2 : 1;
    fb.className='feedback-box correct show';
    fb.textContent='✅ 정답! '+questions[currentQ].explain;
  } else {
    fb.className='feedback-box wrong show';
    fb.textContent='❌ 틀렸어요! '+questions[currentQ].explain;
  }
  document.getElementById('nextBtn').classList.add('show');
  document.getElementById('scoreLive').textContent = `${score}점`;
}

function nextQ() {
  currentQ++;
  if (currentQ >= questions.length) showResult();
  else renderQ();
}

// Timer (hard mode)
function startTimer() {
  timeLeft = 20;
  const tc = document.getElementById('timerCircle');
  const tl = document.getElementById('timerLabel');
  tc.style.display='flex'; tl.textContent='⏱️';
  tc.textContent=timeLeft; tc.className='timer-circle';
  timerID = setInterval(()=>{
    timeLeft--;
    tc.textContent=timeLeft;
    if (timeLeft<=10) tc.className='timer-circle warning';
    if (timeLeft<=5)  tc.className='timer-circle danger';
    if (timeLeft<=0) {
      clearInterval(timerID);
      if (!answered) {
        answered=true;
        document.querySelectorAll('.choice').forEach((b,i)=>{ b.disabled=true; });
        const fb=document.getElementById('feedbackBox');
        fb.className='feedback-box wrong show';
        fb.textContent='⏰ 시간 초과! '+questions[currentQ].explain;
        document.getElementById('nextBtn').classList.add('show');
      }
    }
  },1000);
}
function clearTimer() { if (timerID) { clearInterval(timerID); timerID=null; } }

function showResult() {
  clearTimer();
  document.getElementById('quizScreen').style.display='none';
  document.getElementById('resultScreen').style.display='block';
  const total = questions.length;
  const maxScore = total * (difficulty==='hard'?3:difficulty==='normal'?2:1);
  const pct = score/maxScore;
  const correct = questions.filter((_,i)=>false).length; // simplified
  // count from score
  const perQ = difficulty==='hard'?3:difficulty==='normal'?2:1;
  const correctCount = score/perQ;
  const wrongCount   = total - correctCount;

  let trophy='🏆', stars='⭐⭐⭐⭐⭐', grade='한강 생태 박사!', msg='완벽해요! 모든 문제를 맞혔네요. 진짜 한강 전문가예요!';
  if (pct<0.5) { trophy='🌱'; stars='⭐⭐'; grade='새싹 탐험가'; msg='도감을 다시 읽고 도전해봐요! 한강에 대해 더 많이 배울 수 있어요.'; }
  else if (pct<0.7) { trophy='🐟'; stars='⭐⭐⭐'; grade='물고기 친구'; msg='절반 이상 맞혔어요! 조금 더 공부하면 박사가 될 수 있어요.'; }
  else if (pct<0.9) { trophy='🦦'; stars='⭐⭐⭐⭐'; grade='한강 탐험가'; msg='훌륭해요! 한강 생태에 대해 잘 알고 있네요.'; }

  document.getElementById('rTrophy').textContent = trophy;
  document.getElementById('rStars').textContent  = stars;
  document.getElementById('rScore').textContent  = `${score}점`;
  document.getElementById('rGrade').textContent  = grade;
  document.getElementById('rMsg').textContent    = msg;
  document.getElementById('rCorrect').textContent = `${correctCount}개`;
  document.getElementById('rWrong').textContent   = `${wrongCount}개`;
  document.getElementById('rRate').textContent    = `${Math.round(pct*100)}%`;
  document.getElementById('rDiff').textContent    = {easy:'🌱 쉬움',normal:'🌿 보통',hard:'🏔️ 어려움'}[difficulty];
}

function retryQuiz() {
  document.getElementById('resultScreen').style.display='none';
  document.getElementById('startScreen').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
