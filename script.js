const NEED_TYPES = [
  "Language Support",
  "Transport",
  "Cannot Evacuate",
  "Medicine",
  "Food / Water",
  "Shelter",
  "Understood",
  "Needs Explanation",
];

const URGENCY_BY_NEED = {
  "Cannot Evacuate": "High",
  Transport: "High",
  Medicine: "High",
  Shelter: "Medium",
  "Language Support": "Medium",
  "Food / Water": "Medium",
  "Needs Explanation": "Medium",
  Understood: "Low",
};

const FEEDBACK_ACTIONS = [
  { label: "I understand", needType: "Understood" },
  { label: "I need this explained", needType: "Needs Explanation" },
  { label: "I need transport", needType: "Transport", priority: true },
  { label: "I cannot evacuate", needType: "Cannot Evacuate", priority: true },
  { label: "I need medicine", needType: "Medicine", priority: true },
  { label: "I need shelter", needType: "Shelter" },
];

const demoResident = {
  residentName: "Chen family",
  suburb: "Sunnybank",
  language: "Mandarin",
  consentToShare: true,
};

const VOICE_LANGUAGES = [
  {
    id: "en",
    label: "English",
    lang: "en-AU",
    text: "Chen family, Sunnybank has a high flood risk tonight. Pack medicine, identification, and a phone charger. Do not use flooded roads. Because you do not have a car, request transport now.",
  },
  {
    id: "zh",
    label: "Mandarin",
    lang: "zh-CN",
    text: "陈先生一家，Sunnybank 当前有较高洪水风险。请准备药物、证件和手机充电器，不要经过积水道路。如果你们没有车，请现在点击需要交通协助。",
  },
  {
    id: "vi",
    label: "Vietnamese",
    lang: "vi-VN",
    text: "Gia đình Chen, Sunnybank tối nay có nguy cơ lũ cao. Hãy chuẩn bị thuốc, giấy tờ tùy thân và sạc điện thoại. Không đi qua đường ngập nước. Nếu không có xe, hãy yêu cầu hỗ trợ di chuyển ngay.",
  },
  {
    id: "ar",
    label: "Arabic",
    lang: "ar",
    text: "عائلة تشن، هناك خطر فيضان مرتفع في صني بانك الليلة. جهزوا الدواء والهوية وشاحن الهاتف. لا تستخدموا الطرق المغمورة بالمياه. إذا لم تكن لديكم سيارة، اطلبوا المساعدة في النقل الآن.",
  },
];

let selectedRequest = createRequest("Transport");
let selectedVoiceLanguage = VOICE_LANGUAGES[0];

function createRequest(needType) {
  if (!NEED_TYPES.includes(needType)) {
    throw new Error(`Unsupported need type: ${needType}`);
  }

  return {
    id: "REQ-001",
    residentName: demoResident.residentName,
    suburb: demoResident.suburb,
    language: demoResident.language,
    needType,
    urgency: URGENCY_BY_NEED[needType],
    status: "Pending",
    timestamp: "10:42 AM",
    consentToShare: demoResident.consentToShare,
  };
}

function setActiveTab(tabId) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabId);
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === tabId);
  });
}

function renderFeedbackActions() {
  const actions = document.querySelector("#feedback-actions");
  actions.innerHTML = "";

  FEEDBACK_ACTIONS.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `feedback-button${action.priority ? " priority" : ""}`;
    button.textContent = action.label;
    button.addEventListener("click", () => submitFeedback(action.needType));
    actions.append(button);
  });
}

function submitFeedback(needType) {
  selectedRequest = createRequest(needType);
  renderQueue();
  renderRequestJson();

  const result = document.querySelector("#request-result");
  result.classList.add("show");

  if (needType === "Transport") {
    result.innerHTML = [
      "Request sent to community support team.",
      "Your request: Transport",
      "Location: Sunnybank",
      "Language: Mandarin",
      "Urgency: High",
    ].join("<br />");
    return;
  }

  result.innerHTML = [
    "Request sent to community support team.",
    `Your request: ${selectedRequest.needType}`,
    `Location: ${selectedRequest.suburb}`,
    `Language: ${selectedRequest.language}`,
    `Urgency: ${selectedRequest.urgency}`,
  ].join("<br />");
}

function renderQueue() {
  const queueBody = document.querySelector("#queue-body");
  const queueCount = document.querySelector("#queue-count");
  const row = document.createElement("div");
  row.className = "queue-row";
  row.setAttribute("role", "row");

  row.innerHTML = `
    <strong>${selectedRequest.residentName}</strong>
    <strong>${selectedRequest.suburb}</strong>
    <strong>${selectedRequest.language}</strong>
    <strong>${selectedRequest.needType}</strong>
    <strong><span class="pill ${selectedRequest.urgency.toLowerCase()}">${selectedRequest.urgency}</span></strong>
    <strong><span class="pill ${selectedRequest.status.toLowerCase()}">${selectedRequest.status}</span></strong>
  `;

  queueBody.replaceChildren(row);
  queueCount.textContent = "1 pending";
}

function renderRequestJson() {
  document.querySelector("#request-json").textContent = JSON.stringify(selectedRequest, null, 2);
}

function setupVoicePlayback() {
  const button = document.querySelector("#play-voice");
  const status = document.querySelector("#voice-status");
  const options = document.querySelector("#language-options");

  if (!button || !status || !options) return;

  if (!("speechSynthesis" in window)) {
    button.disabled = true;
    status.textContent = "Voice playback unavailable in this browser";
    return;
  }

  function renderLanguageOptions() {
    options.innerHTML = "";

    VOICE_LANGUAGES.forEach((language) => {
      const languageButton = document.createElement("button");
      languageButton.type = "button";
      languageButton.className = `language-option${language.id === selectedVoiceLanguage.id ? " active" : ""}`;
      languageButton.textContent = language.label;
      languageButton.setAttribute("aria-pressed", String(language.id === selectedVoiceLanguage.id));
      languageButton.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        button.classList.remove("playing");
        selectedVoiceLanguage = language;
        button.innerHTML = `<span aria-hidden="true">▶</span> Play ${language.label}`;
        status.textContent = `${language.label} voice-ready explanation`;
        renderLanguageOptions();
      });
      options.append(languageButton);
    });
  }

  button.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(selectedVoiceLanguage.text);
    utterance.lang = selectedVoiceLanguage.lang;
    utterance.rate = 0.92;

    button.classList.add("playing");
    status.textContent = `Playing ${selectedVoiceLanguage.label} explanation`;

    utterance.onend = () => {
      button.classList.remove("playing");
      status.textContent = `${selectedVoiceLanguage.label} voice-ready explanation`;
    };

    utterance.onerror = () => {
      button.classList.remove("playing");
      status.textContent = "Voice playback stopped";
    };

    window.speechSynthesis.speak(utterance);
  });

  renderLanguageOptions();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

setupVoicePlayback();
renderFeedbackActions();
renderQueue();
renderRequestJson();
