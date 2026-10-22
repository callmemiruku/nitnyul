// อัปเดตเวลาบน Status Bar หน้า Home
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// ฐานข้อมูลรายชื่อแชทและข้อความ
let chatData = {
  'อิง': {
    name: 'หมูอ้วน 🐽',
    avatar: '<img src="image/ohyul2.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">',
    unread: false,
    defaultReply: 'อย่าแกล้งเค้า',
    messages: [
      { type: 'date', text: 'iMessage • จันทร์ 18:30' },
      { text: 'เลิกยังครับ', sender: 'me' },
      { text: 'อยากไปกินข้าวด้วยอะ', sender: 'me' },
      { text: 'อาจารพึ่งปล่อย', sender: 'them' },
      { text: 'เค้าอยากกินตามสั่งหลังมอ', sender: 'them' },
      { text: 'ลงมา', sender: 'me' },
      { text: 'เค้าอยู่ใต้ตึกคณะเธอ', sender: 'me' },
      { type: 'date', text: 'iMessage • พุธ 16:14' },
      { text: 'ซ้อมหลีดเสร็จยัง', sender: 'me' },
      { text: 'เค้าเตะบอลรอกับเพื่อนนะ', sender: 'me' },
      { text: 'จะกลับละบอกเดี๋ยวไปรับครับ', sender: 'me' },
      { type: 'date', text: 'iMessage • พุธ 17:40' },
      { text: 'เค้าซ้อมเสร็จแล้ว', sender: 'them' },
      { type: 'date', text: 'iMessage • ศุกร์ 19:30' },
      { text: 'หายไปไหน', sender: 'them' },
      { text: 'ทำไมตื่น', sender: 'me' },
      { text: 'จะกอดแต่หาเธอไม่เจอ', sender: 'them' },
      { text: 'เค้าออกมาวิ่ง', sender: 'me' },
      { text: 'เดี๋ยวกลับไปให้กอดครับ', sender: 'me' },
      { type: 'date', text: 'iMessage • วันนี้ 15:54' },
      { text: 'คิดถึงอ้วน', sender: 'me' },
      { text: 'อาราย', sender: 'them' },
      { text: 'ไปหาได้ไหมครับ', sender: 'me' },
      { text: 'ซื้อชานมมาให้เค้าด้วย', sender: 'them' },
      { text: 'หมูอ้วน', sender: 'me' }
    ],
    rules: {
      'อิง': 'คำว่าพี่ไปไหน',
      'คิดถึง': 'เค้าก็คิดถึง',
      'รักเธอนะ': 'เค้ารักเอิทมากกว่าอีก',
      'หมูอ้วน': 'เค้าไม่ใช่หมูนะ'
    }
  },
  'ริว': {
    name: 'พี่ริว',
    avatar: '<img src="image/ryul.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">',
    unread: true,
    defaultReply: 'เตะบอลเปล่าน้อง',
    messages: [
      { type: 'date', text: 'iMessage • อังคาร 14:54' },
      { text: 'คืนนี้ไปอินดี้เปล่าไอเอิท', sender: 'them' },
      { text: 'ถามอิงก่อน', sender: 'me' },
      { text: 'มึงตัวติดกันหรอวะ', sender: 'me' },
      { type: 'date', text: 'iMessage • เมื่อวาน 09:45' },
      { text: 'พี่ริว', sender: 'me' },
      { text: 'ไร', sender: 'them' },
      { text: 'ทำไมอิงไม่ตอบแชท', sender: 'me' },
      { text: 'นี่กูชื่ออิงเรอะ', sender: 'them' }
    ],
    rules: {
      'พี่ริว': 'ทักไปถามอิงเอง',
      'อิงงอน': 'สมควร'
    }
  },
  'หลุย': {
    name: 'หลุยส์',
    avatar: '<img src="image/louis.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">',
    unread: false,
    defaultReply: 'ว่าไงเพื่อน',
    messages: [
      { type: 'date', text: 'iMessage • เมื่อวาน 20:35' },
      { text: 'เข้าเกมดิ้', sender: 'them' },
      { text: 'ไม่ว่าง', sender: 'me' }, 
      { text: 'ดูหนังกับแฟน', sender: 'me' }
    ],
    rules: {
      'คิดถึงแฟน': 'กูต้องรู้ไหม'
    }
  }
};

let activeChatId = null;

// ฐานข้อมูลเนื้อหาโน้ต
let notesData = {
  '1': {
    title: 'งาน',
    date: '17 ตุลาคม 2569 เวลา 08:30',
    content: '- วิจัย ส่งเล่ม 02/11 \n- งานกลุ่มกฎหมาย คิดหัวข้อไปเสนอเพื่อน \n- เก็บชั่วโมงกิจกรรมที่มอ 05/11'
  },
  '2': {
    title: 'หมูอิง',
    date: '10 พฤษภาคม 2568',
    content: '- อิงขี้หนาว \n- ชอบกินชา ไม่กินกาแฟ \n- ชอบดูหนังไซไฟกับรอมคอม \n- ชอบแมว \n- ลูกคนเล็ก \n- ชอบสีเขียว \n- ชอบใส่สร้อยกับต่างหู \n- ชอบกินขนม เค้กสตอเบอร์รี่จะชอบเป็นพิเศษ \n- อิงบอกว่าเจอกันครั้งแรกไม่ชอบหน้าเอิทเลย \n- อิงชอบบึนปากตอนงอน \n- อิงชอบต่อเลโก้ \n-'
  }
};

// เปิดหน้าต่างแอป (จำกัดเฉพาะ 'โน้ต' และ 'ข้อความ')
function openApp(appName) {
  if (appName !== 'โน้ต' && appName !== 'ข้อความ') {
    return;
  }

  const modal = document.getElementById('appModal');

  if (appName === 'โน้ต') {
    renderNotesList();
  } else if (appName === 'ข้อความ') {
    renderChatList();
  }

  // เปลี่ยนสีตัวหนังสือ Status Bar เป็นสีดำ
  const statusBar = document.querySelector('.status-bar');
  if (statusBar) {
    statusBar.style.color = '#000000';
    statusBar.querySelectorAll('svg').forEach(svg => {
      svg.setAttribute('fill', '#000000');
      if (svg.getAttribute('stroke')) svg.setAttribute('stroke', '#000000');
    });
  }

  modal.style.display = 'flex';
}

// ปิดแอปกลับไปหน้า Home
function closeApp() {
  document.getElementById('appModal').style.display = 'none';
  activeChatId = null;

  // คืนค่าสี Status Bar กลับเป็นสีขาว
  const statusBar = document.querySelector('.status-bar');
  if (statusBar) {
    statusBar.style.color = '#ffffff';
    statusBar.querySelectorAll('svg').forEach(svg => {
      svg.setAttribute('fill', '#ffffff');
      if (svg.getAttribute('stroke')) svg.setAttribute('stroke', '#ffffff');
    });
  }
}

// หน้าแสดงรายการรายชื่อแชททั้งหมด (Chat List)
function renderChatList() {
  activeChatId = null;
  const content = document.getElementById('modalContent');
  
  let listHTML = `
    <div class="imessage-container">
      <div class="imessage-header">
        <button class="back-link" onclick="closeApp()">‹ หน้าหลัก</button>
        <div style="width: 50px;"></div>
      </div>
      <div class="chat-list">
        <div class="chat-list-header">ข้อความ</div>
  `;

  for (let id in chatData) {
    const chat = chatData[id];
    const textMsgs = chat.messages.filter(m => m.type !== 'date');
    const lastMsg = textMsgs[textMsgs.length - 1]?.text || '';
    
    listHTML += `
      <div class="chat-item" onclick="openChatRoom('${id}')">
        <div class="avatar">${chat.avatar}</div>
        <div class="chat-info">
          <div class="chat-top-row">
            <span class="chat-name">${chat.name}</span>
            <span class="chat-time">${chat.time || ''}</span>
          </div>
          <div class="chat-preview">${lastMsg}</div>
        </div>
        ${chat.unread ? '<div class="unread-dot"></div>' : ''}
      </div>
    `;
  }

  listHTML += `</div></div>`;
  content.innerHTML = listHTML;
}

// หน้าห้องสนทนาแชท (Chat Room)
function openChatRoom(chatId) {
  activeChatId = chatId;
  const chat = chatData[chatId];
  chat.unread = false;

  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="imessage-container">
      <div class="imessage-header">
        <button class="back-link" onclick="renderChatList()">‹ ข้อความ</button>
        <div class="imessage-user-info">
          <span class="user-name-title">${chat.name}</span>
          <span class="imessage-sub">iMessage</span>
        </div>
        <div style="width: 50px;"></div>
      </div>

      <div class="chat-room-body" id="chatRoomBody">
        ${chat.messages.map(msg => {
          if (msg.type === 'date') {
            return `<div class="date-divider">${msg.text}</div>`;
          }
          return `
            <div class="msg-bubble ${msg.sender === 'me' ? 'msg-sent' : 'msg-received'}">
              ${msg.text}
            </div>
          `;
        }).join('')}
      </div>

      <div class="chat-input-bar">
        <div class="input-wrapper">
          <input type="text" id="msgInput" class="chat-input" placeholder="iMessage" onkeypress="handleKeyPress(event)">
          <button id="sendBtn" class="send-btn" onclick="sendMessage()">↑</button>
        </div>
      </div>
    </div>
  `;

  scrollToBottom();
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text || !activeChatId) return;

  const chat = chatData[activeChatId];
  chat.messages.push({ text: text, sender: 'me' });
  input.value = '';

  renderMessagesOnly();
  showTypingAndReply();
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}

function renderMessagesOnly() {
  const body = document.getElementById('chatRoomBody');
  if (!body || !activeChatId) return;

  const chat = chatData[activeChatId];
  body.innerHTML = chat.messages.map(msg => {
    if (msg.type === 'date') {
      return `<div class="date-divider">${msg.text}</div>`;
    }
    return `
      <div class="msg-bubble ${msg.sender === 'me' ? 'msg-sent' : 'msg-received'}">
        ${msg.text}
      </div>
    `;
  }).join('');
  
  scrollToBottom();
}

function showTypingAndReply() {
  const body = document.getElementById('chatRoomBody');
  if (!body || !activeChatId) return;

  const chat = chatData[activeChatId];
  const lastMyMessage = chat.messages[chat.messages.length - 1].text;

  const typingDiv = document.createElement('div');
  typingDiv.id = 'typingIndicator';
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  body.appendChild(typingDiv);
  scrollToBottom();

  setTimeout(() => {
    document.getElementById('typingIndicator')?.remove();

    let replyText = chat.defaultReply || 'อ้อ';

    if (chat.rules) {
      for (let keyword in chat.rules) {
        if (lastMyMessage.includes(keyword)) {
          replyText = chat.rules[keyword];
          break;
        }
      }
    }

    chat.messages.push({ text: replyText, sender: 'them' });
    renderMessagesOnly();
  }, 1500);
}

// หน้าแสดงรายการโน้ตทั้งหมด
function renderNotesList() {
  const content = document.getElementById('modalContent');
  
  let html = `
    <div class="notes-container">
      <div class="imessage-header">
        <button class="back-link" onclick="closeApp()">‹ หน้าหลัก</button>
        <span class="imessage-title">โน้ต</span>
        <div style="width: 50px;"></div>
      </div>
      <div class="notes-list-body">
        <div class="notes-main-title">โน้ต</div>
  `;

  for (let id in notesData) {
    const note = notesData[id];
    html += `
      <div class="note-card" onclick="openNoteDetail('${id}')">
        <div class="note-card-title">${note.title}</div>
        <div class="note-card-snippet">${note.content.split('\n')[0]}</div>
      </div>
    `;
  }

  html += `</div></div>`;
  content.innerHTML = html;
}

// หน้าอ่านเนื้อหาโน้ต
function openNoteDetail(noteId) {
  const note = notesData[noteId];
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="notes-container">
      <div class="imessage-header">
        <button class="back-link" onclick="renderNotesList()">‹ โน้ตทั้งหมด</button>
        <span class="imessage-title">บันทึก</span>
        <span style="font-size: 14px; color: #007aff; cursor: pointer; font-weight: 600;" onclick="renderNotesList()">เสร็จสิ้น</span>
      </div>
      <div class="note-editor-body">
        <div class="note-date-header">${note.date}</div>
        <h2 style="margin-bottom: 12px; font-size: 20px;">${note.title}</h2>
        <div style="white-space: pre-line; color: #333;">${note.content}</div>
      </div>
    </div>
  `;
}

function scrollToBottom() {
  const body = document.getElementById('chatRoomBody');
  if (body) {
    body.scrollTop = body.scrollHeight;
  }
}

// =======================================
// SYSTEM PASSCODE LOGIC
// =======================================
const CORRECT_PASSCODE = '0803';
let currentInput = '';

function showPasscodePage() {
  document.getElementById('lockMainPage').style.opacity = '0';
  document.getElementById('passcodePage').classList.add('active');
}

function pressKey(num) {
  if (currentInput.length < 4) {
    currentInput += num;
    updateDots();

    if (currentInput.length === 4) {
      setTimeout(checkPasscode, 200);
    }
  }
}

function deleteKey() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDots();
  } else {
    document.getElementById('lockMainPage').style.opacity = '1';
    document.getElementById('passcodePage').classList.remove('active');
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.dot-item');
  dots.forEach((dot, index) => {
    if (index < currentInput.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  });
}

function checkPasscode() {
  if (currentInput === CORRECT_PASSCODE) {
    unlockScreen();
  } else {
    const dotsContainer = document.getElementById('passcodeDots');
    dotsContainer.classList.add('shake');

    setTimeout(() => {
      dotsContainer.classList.remove('shake');
      currentInput = '';
      updateDots();
    }, 400);
  }
}

function unlockScreen() {
  const lockScreen = document.getElementById('lockScreen');
  if (lockScreen) {
    lockScreen.style.transform = 'translateY(-100%)';
    lockScreen.style.opacity = '0';
    setTimeout(() => {
      lockScreen.style.display = 'none';
    }, 400);
  }
}

function updateLockScreenClock() {
  const now = new Date();
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const clockEl = document.getElementById('lockClock');
  if (clockEl) {
    clockEl.textContent = `${hours}:${minutes}`;
  }

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateString = now.toLocaleDateString('th-TH', options);
  
  const dateEl = document.getElementById('lockDate');
  if (dateEl) {
    dateEl.textContent = dateString;
  }
}

setInterval(updateLockScreenClock, 1000);
updateLockScreenClock();