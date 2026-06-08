
// 날짜 최솟값 오늘로 설정
document.getElementById('fdate').min = new Date().toISOString().split('T')[0];

function selectProg(el) {
  document.querySelectorAll('.prog-option').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('selectedProg').value = el.dataset.val;
  document.getElementById('progErr').classList.remove('show');
}

function validate() {
  let ok = true;
  const checks = [
    { id:'selectedProg', errId:'progErr',   fn: v => v.trim()!=='',      msg:'' },
    { id:'fname',        errId:'fnameErr',  fn: v => v.trim()!=='',      msg:'' },
    { id:'fdate',        errId:'fdateErr',  fn: v => v!=='',             msg:'' },
    { id:'ftime',        errId:'ftimeErr',  fn: v => v!=='',             msg:'' },
    { id:'fphone',       errId:'fphoneErr', fn: v => /^0\d{1,2}-\d{3,4}-\d{4}$/.test(v), msg:'' },
    { id:'fcount',       errId:'fcountErr', fn: v => v!=='',             msg:'' },
  ];
  // email optional but validate format if filled
  const email = document.getElementById('femail').value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('femail').classList.add('err');
    document.getElementById('femailErr').classList.add('show');
    ok = false;
  } else {
    document.getElementById('femail').classList.remove('err');
    document.getElementById('femailErr').classList.remove('show');
  }

  checks.forEach(c => {
    const el  = document.getElementById(c.id);
    const err = document.getElementById(c.errId);
    if (!c.fn(el.value)) {
      el.classList.add('err'); err.classList.add('show'); ok = false;
    } else {
      el.classList.remove('err'); err.classList.remove('show');
    }
  });

  const agree = document.getElementById('fagree');
  if (!agree.checked) {
    document.getElementById('fagreeErr').classList.add('show'); ok = false;
  } else {
    document.getElementById('fagreeErr').classList.remove('show');
  }
  return ok;
}

function submitForm() {
  if (!validate()) {
    document.querySelector('.err-msg.show')?.scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }
  const prog  = document.getElementById('selectedProg').value;
  const name  = document.getElementById('fname').value.trim();
  const date  = document.getElementById('fdate').value;
  const time  = document.getElementById('ftime').value;
  const count = document.getElementById('fcount').value;

  // 날짜 포맷
  const d = new Date(date);
  const dateStr = `${d.getMonth()+1}월 ${d.getDate()}일`;
  const timeStr = time.replace(':','시 ')+'분';
  const noStr   = 'HG-' + Date.now().toString().slice(-6);

  document.getElementById('dProg').textContent  = prog;
  document.getElementById('dName').textContent  = name;
  document.getElementById('dDate').textContent  = `${dateStr} ${timeStr}`;
  document.getElementById('dCount').textContent = count;
  document.getElementById('dNo').textContent    = noStr;
  document.getElementById('doneMsg').textContent = `${dateStr} ${timeStr}, "${prog}" 봉사활동 신청이 완료되었습니다! 담당자 확인 후 연락드릴게요. 😊`;

  document.getElementById('formWrap').style.display   = 'none';
  document.getElementById('doneScreen').style.display = 'block';
  window.scrollTo({top:0,behavior:'smooth'});
}

function resetForm() {
  document.getElementById('formWrap').style.display   = 'block';
  document.getElementById('doneScreen').style.display = 'none';
  document.querySelectorAll('.prog-option').forEach(o=>o.classList.remove('selected'));
  ['selectedProg','fname','fdate','ftime','fphone','femail','fcount','fmotiv'].forEach(id=>{
    const el=document.getElementById(id); if(el){el.value=''; el.classList.remove('err');}
  });
  document.getElementById('fagree').checked=false;
  document.querySelectorAll('.err-msg').forEach(e=>e.classList.remove('show'));
  window.scrollTo({top:0,behavior:'smooth'});
}

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
