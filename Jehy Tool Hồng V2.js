// ==UserScript==
// @name         FB Auto Report V14.3 - Pink Edition + 13 Types + Speed Boost
// @namespace    http://tampermonkey.net/
// @version      14.3
// @description  Tăng tốc click, rút ngắn delay, tối ưu Meta, không đụng Something about
// @author       Gemini & User
// @match        https://www.facebook.com/*
// @match        https://m.facebook.com/*
// @match        https://touch.facebook.com/*
// @match        https://mbasic.facebook.com/*
// @match        https://web.facebook.com/*
// @match        https://*.facebook.com/*
// @grant        none
// ==/UserScript==

(async () => {
    'use strict';

    // ==========================================
    // CẤU HÌNH CHUNG (TĂNG TỐC)
    // ==========================================
    const SHOW_BORDERS = true;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const DELAY_TIME = isMobile ? 400 : 300;               // Nhanh hơn
    const INPUT_DELAY = isMobile ? 2000 : 1500;            // Giảm chờ sau nhập Meta
    const WAIT_FOR_ACTION = isMobile ? 1200 : 800;         // Giảm chờ Submit/Next/Done
    const DONE_DELAY = 400;                                // Nhanh hơn sau Done
    const SOMETHING_RETRIES = 4;                           // Giữ nguyên 4 lần
    const MAX_RETRIES = 5;
    const INTER_REPORT_DELAY = 500;                        // Giữa các loại report
    const LOOP_DELAY = 1500;                               // Sau mỗi vòng

    // ==========================================
    // ĐA NGÔN NGỮ (ĐẦY ĐỦ JP TỪ V12.18.1)
    // ==========================================
    const LANG = {
        menu: [
            "Profile settings see more options",
            "プロフィール設定のその他のオプションを見る",
            "その他のオプション",
            "その他のアクション",
            "プロフィール設定のその他のオプション","प्रोफ़ाइल सेटिंग पर ले जाने वाला 'और विकल्प देखें' बटन"
        ],
        reportProfile: [
            "Report profile", "Báo cáo trang cá nhân", "プロフィールを報告","प्रोफाइल रिपोर्ट गर्नुहोस्","प्रोफ़ाइल की रिपोर्ट करें"
        ],
        somethingAbout: [
            "Something about this profile", "Có gì đó về trang cá nhân này", "このプロフィールに関すること","यो प्रोफाइलका बारेमा केही कुरा","इस प्रोफ़ाइल के बारे में कुछ जानकारी"
        ],
        fakeProfile: [
            "Fake profile", "Trang cá nhân giả mạo", "偽プロフィール","नक्कली प्रोफाइल","फ़र्ज़ी प्रोफ़ाइल"
        ],
        notRealPerson: [
            "not a real person", "real person", "không phải người thật", "実在しない人物である","उहाँ वास्तविक व्यक्ति होइन","ये कोई असली व्यक्ति नहीं है"
        ],
        celebrity: [
            "celebrity", "public figure", "A celebrity or public figure",
            "Người nổi tiếng hoặc nhân vật công chúng",
            "有名人・著名人","सेलिब्रेटी वा प्रसिद्ध व्यक्ति","सेलिब्रिटी या सार्वजनिक हस्ती"
        ],
        under18: [
            "under 18", "involving someone", "dưới 18", "18歳未満の人物が関わる問題","18 वर्षभन्दा कम उमेरको कोही संलग्न भएको समस्या","यह 18 साल से कम उम्र के किसी व्यक्ति की समस्या से संबंधित है"
        ],
        physicalAbuse: [
            "Physical abuse", "Bạo hành thể chất", "身体的虐待","शारीरिक दुर्व्यवहार","यह शारीरिक दुर्व्यवहार से संबंधित है"
        ],
        violent: [
            "Violent",
            "hateful",
            "disturbing",
            "Bạo lực",
            "暴力的、不快、または悪意があるコンテンツ","हिंसात्मक, घृणापूर्ण वा बाधा पुर्‍याउने सामग्री",
	    "इसमें हिंसक, नफ़रत फैलाने वाला या असहज करने वाला कंटेंट है"
        ],
        credibleThreat: [
            "Credible threat", "threat to safety", "Đe dọa đáng tin",
            "信頼できる脅威", "脅迫", "暴力の脅威", "安全性への脅威","सुरक्षामा प्रमाणिक खतरा","यह सुरक्षा के लिए गंभीर खतरा है"
        ],
        scamFraud: [
            "Scam", "fraud", "false information", "Lừa đảo", "詐欺または虚偽の情報","स्क्याम, ठगी वा झुटो जानकारी","यह स्कैम, धोखाधड़ी या गलत जानकारी है"
        ],
        fraudOrScam: [
            "Fraud or scam", "Lừa đảo hoặc gian lận", "詐欺行為","ठगी वा स्क्याम","धोखाधड़ी या स्कैम"
        ],
        spam: [
            "Spam", "Tin rác", "スパム","स्प्याम","स्पैम"
        ],
        somethingElse: [
            "Something else", "Điều gì đó khác","अरू केही","कोई और समस्या है",
            "その他",
            "その他の問題",
            "その他の理由"
        ],
        suicideOrSelfHarm: [
            "Suicide or self-harm",
	    "自殺または自傷行為",
     	          "आत्महत्या वा आफैलाई चोट पुर्‍याउने",
	          "यह आत्महत्या या खुद को नुकसान पहुँचाने से संबंधित है"
        ],
        adultContent: [
            "Adult content", "成人向けコンテンツ","वयस्क सामग्री","इसमें अश्लील कंटेंट है"
        ],
        submit: [
            "Submit", "Gửi", "Send", "送信","पेस गर्नुहोस्","सबमिट करें"
        ],
        done: [
            "Done", "Xong", "Hoàn tất", "Close", "Đóng", "完了","सम्पन्न भयो","ओके"
        ],
        next: [
            "Next", "Tiếp", "Tiếp tục", "次へ","अर्को","आगे बढ़ें"
        ],
        terrorism: [
            "Seems like terrorism", "テロリズムだと思われる","आतङ्कवाद जस्तो देखिन्छ","यह आतंकवाद जैसा लग रहा है"
        ],
        callingForViolence: [
            "Calling for violence", "暴力を呼びかけている","हिंसाका लागि आह्वान","इसमें लोगों को हिंसा करने के लिए उकसाया गया है"
        ],
        organizedCrime: [
            "Seems like organized crime", "組織的犯罪と思われる","सङ्गठित अपराध जस्तो देखिन्छ","संगठित अपराध जैसा लग रहा है"
        ],
        eatingDisorder: [
            "Eating disorder", "摂食障害","खानपानसम्बन्धी विकार","भोजन संबंधी विकार"
        ],
        harassment: [
            "Bullying or harassment", "いじめまたは嫌がらせ", "डरधम्की वा दुर्व्यवहार","यह कंटेंट धमकाने या उत्पीड़न करने से संबंधित है"
        ],
        adultProstitution: [
            "Seems like prostitution", "売春だと思われる","वेश्यावृत्ति जस्तो देखिन्छ","यह कंटेंट वेश्यावृत्ति जैसा लग रहा है"
        ],
        me: [
            "Me", "Tôi", "自分","म","मैं"
        ]
    };

    // INPUT XPATH CHÍNH XÁC
    const INPUT_XPATH = "//*[@aria-label=\"Facebook Page name or URL\" or @aria-label=\"Facebookページ名またはURL\" or @aria-label=\"Facebook पृष्ठको नाम वा URL\" or @aria-label=\"Facebook पेज का नाम या URL\"]";

    // ==========================================
    // HÀM TIỆN ÍCH
    // ==========================================
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const getElementByXpath = (path) => {
        if (!path) return null;
        try { return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
        catch(e) { return null; }
    };
    const isInsidePanel = (el) => el.closest('#fb-auto-panel') !== null;

    function safeClick(el, showBorder = SHOW_BORDERS) {
        if (!el) return false;
        el.scrollIntoView({block: "center", inline: "center"});
        if (el.hasAttribute('aria-hidden')) el.removeAttribute('aria-hidden');
        if (showBorder) {
            el.style.outline = '3px solid #FF1493';
            el.style.outlineOffset = '2px';
        }
        el.focus();
        const opts = { bubbles: true, cancelable: true, view: window };
        el.dispatchEvent(new MouseEvent('pointerdown', opts));
        el.dispatchEvent(new MouseEvent('mousedown', opts));
        el.dispatchEvent(new MouseEvent('pointerup', opts));
        el.dispatchEvent(new MouseEvent('mouseup', opts));
        el.dispatchEvent(new MouseEvent('click', opts));
        return true;
    }

    function findActionButton(keywords) {
        const selectors = ['button', 'div[role="button"]', 'a[role="button"]', 'span[role="button"]', 'div[role="menuitem"]', 'div[tabindex="0"]'];
        let all = [...document.querySelectorAll(selectors.join(','))];
        all = all.filter(el => el.offsetParent !== null && !isInsidePanel(el));
        for (let el of all) {
            let txt = (el.innerText || "").trim().toLowerCase().replace(/[''']/g, "'").replace(/["""]/g, '"');
            for (let k of keywords) {
                let kw = k.toLowerCase().replace(/[''']/g, "'").replace(/["""]/g, '"');
                if (txt === kw || txt.includes(kw)) return el;
            }
        }
        return null;
    }

    function findButtonByKeywords(keywords) {
        let all = document.querySelectorAll('div[role="button"], button, span, div[role="menuitem"], div[tabindex="0"], li, a, div[role="option"]');
        for (let el of all) {
            if (!el.offsetParent || isInsidePanel(el)) continue;
            let txt = (el.innerText || "").trim().toLowerCase().replace(/[''']/g, "'").replace(/["""]/g, '"');
            for (let k of keywords) {
                let kw = k.toLowerCase().replace(/[''']/g, "'").replace(/["""]/g, '"');
                if (txt.includes(kw)) {
                    let clickable = el.closest('div[role="button"], button') || el;
                    clickable.scrollIntoView({block: "center", inline: "center"});
                    return clickable;
                }
            }
        }
        return null;
    }

    function simulateInputWithTracker(element, text) {
        element.focus();
        let lastValue = element.value;
        element.value = text;
        let event = new Event('input', { bubbles: true });
        let tracker = element._valueTracker;
        if (tracker) { tracker.setValue(lastValue); }
        element.dispatchEvent(event);
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function findMenuElement() {
        for (let lbl of LANG.menu) {
            let el = document.querySelector(`[aria-label="${lbl}"]`);
            if (el && el.offsetParent && !isInsidePanel(el)) return el;
        }
        let partial = document.querySelector('[aria-label*="プロフィール設定のその他のオプション"]');
        if (partial && partial.offsetParent && !isInsidePanel(partial)) return partial;
        let allBtns = document.querySelectorAll('div[role="button"], button, span[role="button"]');
        for (let btn of allBtns) {
            if (!btn.offsetParent || isInsidePanel(btn)) continue;
            if (btn.innerText.includes('その他') || btn.innerText.includes('Other') || btn.innerText.includes('More') || btn.innerText.includes('…')) {
                return btn.closest('div[role="button"], button') || btn;
            }
        }
        return null;
    }

    // CLICK META TỐC ĐỘ CAO
    async function clickMetaResult() {
        for (let retry = 4; retry > 0; retry--) { // giảm còn 4 lần retry
            let options = document.querySelectorAll('div[role="listbox"] span, ul[role="listbox"] span, div[role="presentation"] span');
            for (let span of options) {
                if (!span.offsetParent || isInsidePanel(span)) continue;
                if (span.innerText.trim() === "Meta") {
                    safeClick(span);
                    await sleep(1000); // nhanh hơn 1500
                    return true;
                }
            }
            let imgs = document.querySelectorAll('div[role="listbox"] img');
            if (imgs.length > 0) {
                safeClick(imgs[0]);
                await sleep(1000);
                return true;
            }
            if (retry === 2 || retry === 1) {
                let inp = getElementByXpath(INPUT_XPATH);
                if (inp) {
                    simulateInputWithTracker(inp, "Meta ");
                    await sleep(1500); // nhanh hơn 2000
                }
            }
            await sleep(500); // nhanh hơn 800
        }
        return false;
    }

    // HÀM XỬ LÝ ĐẶC BIỆT CHO "SOMETHING ELSE" (JP)
    async function findAndClickSomethingElse() {
        let keywords = LANG.somethingElse;
        let candidates = [];
        let all = document.querySelectorAll('div[role="button"], button, span, div[role="menuitem"], div[tabindex="0"], li, a, div');
        for (let el of all) {
            if (!el.offsetParent || isInsidePanel(el)) continue;
            let txt = (el.innerText || "").trim().toLowerCase().replace(/[''']/g, "'").replace(/["""]/g, '"');
            for (let k of keywords) {
                let kw = k.toLowerCase().replace(/[''']/g, "'").replace(/["""]/g, '"');
                if (txt === kw || txt.includes(kw)) {
                    candidates.push(el);
                    break;
                }
            }
        }
        if (candidates.length === 0) return false;
        let target = candidates[candidates.length - 1];
        if (SHOW_BORDERS) {
            target.style.outline = '3px solid #FF1493';
            target.style.outlineOffset = '2px';
            await sleep(300);
        }
        if (safeClick(target, false)) return true;
        let parent = target.closest('button, div[role="button"]');
        if (parent && !isInsidePanel(parent) && safeClick(parent, false)) return true;
        let current = target;
        while (current) {
            if (isInsidePanel(current)) break;
            if (safeClick(current, false)) return true;
            current = current.parentElement;
            if (current && current.tagName === 'BODY') break;
        }
        return false;
    }

    // ==========================================
    // 13 LOẠI BÁO CÁO (THÊM 2 LOẠI MỚI)
    // ==========================================
    const reportTypes = [
        {
            name: "Violent - Terrorism",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Violent content", keywords: LANG.violent },
                { name: "Terrorism", keywords: LANG.terrorism },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Violent - Calling for violence",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Violent content", keywords: LANG.violent },
                { name: "Calling for violence", keywords: LANG.callingForViolence },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Violent - Organized crime",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Violent content", keywords: LANG.violent },
                { name: "Organized crime", keywords: LANG.organizedCrime },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Suicide - Eating disorder",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Suicide or self-harm", keywords: LANG.suicideOrSelfHarm },
                { name: "Eating disorder", keywords: LANG.eatingDisorder },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Scam - Fraud or scam",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Scam, fraud", keywords: LANG.scamFraud },
                { name: "Fraud or scam", keywords: LANG.fraudOrScam },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Scam - Spam",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Scam, fraud", keywords: LANG.scamFraud },
                { name: "Spam", keywords: LANG.spam },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Celebrity",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Fake profile", keywords: LANG.fakeProfile },
                { name: "Celebrity or public figure", keywords: LANG.celebrity },
                { name: "Nhập tên Meta", inputData: "Meta ", special: "input" },
                { name: "Chọn Meta", special: "meta" },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Fake - Not a real person",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Fake profile", keywords: LANG.fakeProfile },
                { name: "Not a real person", keywords: LANG.notRealPerson },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Something else",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Something else", special: "somethingElse" },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Bullying - Harassment",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Under 18", keywords: LANG.under18 },
                { name: "Bullying or harassment", keywords: LANG.harassment },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Adult - Prostitution",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Adult content", keywords: LANG.adultContent },
                { name: "Prostitution", keywords: LANG.adultProstitution },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        // Hai loại mới
        {
            name: "Physical abuse",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Under 18", keywords: LANG.under18 },
                { name: "Physical abuse", keywords: LANG.physicalAbuse },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        },
        {
            name: "Credible threat",
            steps: [
                { name: "Menu", special: "menu" },
                { name: "Report profile", keywords: LANG.reportProfile },
                { name: "Something about", keywords: LANG.somethingAbout, optional: true },
                { name: "Violent content", keywords: LANG.violent },
                { name: "Credible threat", keywords: LANG.credibleThreat },
                { name: "Submit", keywords: LANG.submit, action: true },
                { name: "Next", keywords: LANG.next, action: true },
                { name: "Done", keywords: LANG.done, action: true, done: true }
            ]
        }
    ];

    // ==========================================
    // ANTI-SLEEP
    // ==========================================
    let audioLoop = null, titleInterval = null;
    let antiSleepEnabled = true;
    const SILENT_AUDIO = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////////////////////////////////wAAADFMYXZjNTguMzUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAIAAAAASAA8AxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA';
    function startAntiSleep() {
        if (!audioLoop) { audioLoop = new Audio(SILENT_AUDIO); audioLoop.loop = true; audioLoop.volume = 0.01; }
        audioLoop.play().catch(() => {});
        let tick = false;
        if (titleInterval) clearInterval(titleInterval);
        titleInterval = setInterval(() => {
            document.title = tick ? `🌸 Đã báo cáo: ${totalReportsDone}` : `🎀 Đã báo cáo: ${totalReportsDone}`;
            tick = !tick;
        }, 2000);
    }
    function stopAntiSleep() {
        if (audioLoop) audioLoop.pause();
        if (titleInterval) { clearInterval(titleInterval); document.title = "Facebook"; }
    }

    // ==========================================
    // UI & DRAG
    // ==========================================
    let isPaused = false, shouldStop = false, isRunning = false, isMini = false;
    let totalReportsDone = 0;
    let totalLoopsCompleted = 0;
    let skippedSteps = [];

    const panel = document.createElement("div");
    panel.id = "fb-auto-panel";
    Object.assign(panel.style, {
        position: "fixed", top: "50px", left: "10px", width: "280px",
        background: "linear-gradient(135deg, #1a0b1a 0%, #2d1a2d 100%)",
        color: "#FFB6C1", padding: "15px", borderRadius: "15px",
        zIndex: 999999, border: "2px solid #FF69B4",
        fontFamily: "monospace", fontSize: "12px",
        boxShadow: "0 0 20px rgba(255,105,180,0.6)",
        cursor: "default", userSelect: "none"
    });

    // Drag
    let isDragging = false, dragStartX, dragStartY, panelStartX, panelStartY;
    function onDragStart(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
        e.preventDefault();
        isDragging = true;
        dragStartX = e.clientX; dragStartY = e.clientY;
        const rect = panel.getBoundingClientRect();
        panelStartX = rect.left; panelStartY = rect.top;
        panel.style.transition = 'none';
        panel.setPointerCapture(e.pointerId);
    }
    function onDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const dx = e.clientX - dragStartX, dy = e.clientY - dragStartY;
        panel.style.left = (panelStartX + dx) + 'px';
        panel.style.top = (panelStartY + dy) + 'px';
        panel.style.right = 'auto';
    }
    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        panel.releasePointerCapture(e.pointerId);
        panel.style.transition = '';
    }
    panel.addEventListener('pointerdown', onDragStart);
    panel.addEventListener('pointermove', onDragMove);
    panel.addEventListener('pointerup', onDragEnd);
    panel.addEventListener('pointercancel', onDragEnd);
    panel.addEventListener('selectstart', e => { if (isDragging) e.preventDefault(); });

    function renderPanel() {
        if (isMini) {
            panel.innerHTML = `
                <div style="display:flex; align-items:center; gap:5px;">
                    <span style="font-size:16px;">🌸</span>
                    <div style="flex:1; background:#3a1a3a; height:8px; border-radius:4px; overflow:hidden;">
                        <div id="miniBar" style="width:0%; height:100%; background:#FF69B4;"></div>
                    </div>
                    <button id="btnExpand" style="background:none; border:1px solid #FF69B4; color:#FF69B4; cursor:pointer; border-radius:5px;">[+]</button>
                </div>
                <div id="miniStt" style="font-size:10px; color:#FFB6C1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">Đang chạy...</div>
                <div id="miniCount" style="font-size:9px; color:#FF99CC; margin-top:2px;">Báo cáo: ${totalReportsDone} / Vòng: ${totalLoopsCompleted}</div>
            `;
            panel.style.width = "200px";
            panel.style.padding = "5px";
        } else {
            panel.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h3 style="margin:0; color:#FF69B4;">🌸 FB Auto Report V14.3</h3>
                    <button id="btnMinimize" style="background:none; border:1px solid #FF69B4; color:#FF69B4; cursor:pointer; border-radius:5px; padding:2px 8px;">[-]</button>
                </div>
                <div style="margin-bottom:10px;">
                    <div>Loại báo cáo hiện tại: <span id="currentReportType" style="color:#FF99CC;">Chưa chạy</span></div>
                    <div>Tổng số lần đã báo cáo: <span id="totalReports" style="color:#FFB6C1;">0</span> / Vòng: <span id="loopCount" style="color:#FFB6C1;">0</span></div>
                </div>
                <div style="margin-bottom:10px;">
                    <input type="checkbox" id="chkAntiSleep" ${antiSleepEnabled ? 'checked' : ''} style="accent-color:#FF69B4;"> 
                    <label for="chkAntiSleep" style="cursor:pointer; color:#FF99CC; font-weight:bold;">🎀 Chống ngủ Tab</label>
                </div>
                <div style="margin-bottom:10px;">Trạng thái: <span id="stt" style="color:#FFB6C1;">Sẵn sàng</span></div>
                <div style="background:#3a1a3a; height:10px; border-radius:10px; overflow:hidden; margin-bottom:10px;">
                    <div id="progressBar" style="width:0%; height:100%; background:linear-gradient(90deg, #FF69B4, #FF1493); transition: width 0.3s;"></div>
                </div>
                <div style="display:flex; gap:5px;">
                    <button id="btnStart" style="flex:1; padding:8px; background:#8B1A4A; color:white; border:1px solid #FF69B4; font-weight:bold; cursor:pointer; border-radius:8px;">🌸 CHẠY VÔ HẠN</button>
                    <button id="btnPause" style="flex:1; padding:8px; background:#B85C8A; color:white; border:1px solid #FF99CC; font-weight:bold; cursor:pointer; border-radius:8px; display:none;">⏸️ TẠM DỪNG</button>
                    <button id="btnStop" style="flex:1; padding:8px; background:#8B0045; color:white; border:1px solid #FF1493; font-weight:bold; cursor:pointer; border-radius:8px; display:none;">⏹️ DỪNG</button>
                </div>
                <div id="btnResume" style="display:none; text-align:center; margin-top:5px;">
                    <button style="width:100%; padding:5px; background:#4B2A4B; color:#FFB6C1; border:1px solid #FF69B4; font-weight:bold; cursor:pointer; border-radius:8px;">▶️ TIẾP TỤC</button>
                </div>
                <div id="skipLog" style="font-size:9px; color:#FF99CC; margin-top:4px; min-height:12px;"></div>
            `;
            Object.assign(panel.style, { width: '280px', padding: '15px' });
        }
        bindEvents();
    }

    function bindEvents() {
        if (isMini) {
            panel.querySelector("#btnExpand").onclick = () => { isMini = false; renderPanel(); };
        } else {
            panel.querySelector("#btnMinimize").onclick = () => { isMini = true; renderPanel(); };
            panel.querySelector("#btnStart").onclick = startProcess;
            panel.querySelector("#btnPause").onclick = () => { isPaused = true; updateUIState(); };
            panel.querySelector("#btnStop").onclick = () => {
                if (confirm("🌸 DỪNG hoàn toàn?")) { shouldStop = true; isPaused = false; }
            };
            panel.querySelector("#btnResume button").onclick = () => { isPaused = false; updateUIState(); };
            const chk = panel.querySelector("#chkAntiSleep");
            chk.onchange = () => {
                antiSleepEnabled = chk.checked;
                if (antiSleepEnabled) startAntiSleep();
                else stopAntiSleep();
            };
        }
    }

    function updateUIState() {
        if (isMini) return;
        const btnStart = panel.querySelector("#btnStart");
        const btnPause = panel.querySelector("#btnPause");
        const btnStop = panel.querySelector("#btnStop");
        const btnResumeDiv = panel.querySelector("#btnResume");
        if (!btnStart) return;
        if (isRunning) {
            btnStart.style.display = "none";
            btnStop.style.display = "block";
            if (isPaused) {
                btnPause.style.display = "none";
                btnResumeDiv.style.display = "block";
            } else {
                btnPause.style.display = "block";
                btnResumeDiv.style.display = "none";
            }
        } else {
            btnStart.style.display = "block";
            btnPause.style.display = "none";
            btnStop.style.display = "none";
            btnResumeDiv.style.display = "none";
        }
    }

    function updateStatus(text, color = "#FFB6C1") {
        const el = isMini ? panel.querySelector("#miniStt") : panel.querySelector("#stt");
        if (el) { el.innerText = text; el.style.color = color; }
    }
    function updateProgress(percent) {
        const el = isMini ? panel.querySelector("#miniBar") : panel.querySelector("#progressBar");
        if (el) el.style.width = percent + "%";
    }
    function updateTotalDisplay() {
        if (isMini) {
            const el = panel.querySelector("#miniCount");
            if (el) el.innerText = `Báo cáo: ${totalReportsDone} / Vòng: ${totalLoopsCompleted}`;
        } else {
            const elTotal = panel.querySelector("#totalReports");
            const elLoop = panel.querySelector("#loopCount");
            if (elTotal) elTotal.innerText = totalReportsDone;
            if (elLoop) elLoop.innerText = totalLoopsCompleted;
        }
    }
    function updateCurrentType(typeName) {
        if (!isMini) {
            const el = panel.querySelector("#currentReportType");
            if (el) el.innerText = typeName;
        }
    }

    // ==========================================
    // THỰC HIỆN MỘT LOẠI REPORT
    // ==========================================
    async function executeReport(reportConfig) {
        const steps = reportConfig.steps;
        for (let i = 0; i < steps.length; i++) {
            if (shouldStop) return false;
            while (isPaused && !shouldStop) { await sleep(400); }
            if (shouldStop) return false;

            let step = steps[i];
            updateStatus(`[${reportConfig.name}] ${step.name}`, "#FFB6C1");
            updateProgress((i / steps.length) * 100);

            // Bỏ qua nhanh Something about (thử 4 lần)
            if (step.optional && step.name.startsWith("Something")) {
                let found = false;
                for (let r = 0; r < SOMETHING_RETRIES; r++) {
                    let el = findButtonByKeywords(step.keywords);
                    if (el) {
                        safeClick(el);
                        await sleep(DELAY_TIME);
                        found = true;
                        break;
                    }
                    await sleep(500);
                }
                if (!found) console.log('Bỏ qua Something about - không tìm thấy.');
                continue;
            }

            // Xử lý nhập input (KHÔNG LOG SKIP NẾU CÓ INPUT)
            if (step.special === "input") {
                let inp = getElementByXpath(INPUT_XPATH);
                if (inp) {
                    simulateInputWithTracker(inp, step.inputData);
                    await sleep(INPUT_DELAY);
                } else {
                    console.warn('Không tìm thấy ô input Meta.');
                }
                continue;
            }

            // Xử lý chọn Meta (chỉ log skip nếu thất bại)
            if (step.special === "meta") {
                let success = await clickMetaResult();
                if (!success) {
                    skipStep("Không tìm thấy Meta");
                }
                continue;
            }

            // Xử lý Something else
            if (step.special === "somethingElse") {
                for (let r = 0; r < MAX_RETRIES + 2; r++) {
                    if (shouldStop) break;
                    if (await findAndClickSomethingElse()) {
                        break;
                    }
                    window.scrollTo(0, document.body.scrollHeight);
                    await sleep(500);
                }
                await sleep(1500);
                continue;
            }

            let el = null;
            const isAction = step.action === true;
            const isMenu = step.special === "menu";
            const isDoneStep = step.done === true;

            for (let retry = 0; retry < 10; retry++) {
                if (shouldStop) break;
                if (isMenu) {
                    el = findMenuElement();
                } else if (isAction) {
                    el = findActionButton(step.keywords);
                } else {
                    if (step.keywords) el = findButtonByKeywords(step.keywords);
                    if (!el && step.xpath) el = getElementByXpath(step.xpath);
                }
                if (el) break;
                await sleep(600);
            }

            if (!el) {
                console.warn(`⚠ Không tìm thấy nút: ${step.name}`);
                skipStep(step.name);
                continue;
            }

            safeClick(el);
            if (isMenu) await sleep(800);
            else if (isDoneStep) await sleep(DONE_DELAY);
            else if (isAction) await sleep(WAIT_FOR_ACTION);
            else await sleep(DELAY_TIME);
        }
        totalReportsDone++;
        updateTotalDisplay();
        return true;
    }

    function skipStep(name) {
        if (name === "Nhập tên Meta") return;
        skippedSteps.push(name);
        const logEl = panel.querySelector("#skipLog");
        if (logEl) logEl.innerText = `⚠ Skip: ${skippedSteps.join(', ')}`;
    }

    // ==========================================
    // MAIN LOOP
    // ==========================================
    async function startProcess() {
        totalReportsDone = 0;
        totalLoopsCompleted = 0;
        skippedSteps = [];
        const logEl = panel.querySelector("#skipLog");
        if (logEl) logEl.innerText = "";
        updateTotalDisplay();
        updateProgress(0);

        const chk = document.querySelector("#chkAntiSleep");
        if (chk) antiSleepEnabled = chk.checked;

        shouldStop = false; isPaused = false; isRunning = true;
        if (antiSleepEnabled) startAntiSleep();
        updateUIState();
        updateStatus("🚀 BẮT ĐẦU BÁO CÁO VÔ HẠN!", "#FF69B4");

        let loopCount = 0;
        while (!shouldStop) {
            loopCount++;
            for (let i = 0; i < reportTypes.length && !shouldStop; i++) {
                const report = reportTypes[i];
                updateCurrentType(report.name);
                updateStatus(`📋 [Vòng ${loopCount}] ${report.name}`, "#FFB6C1");
                await executeReport(report);
                if (!shouldStop) await sleep(INTER_REPORT_DELAY);
            }
            if (!shouldStop) {
                totalLoopsCompleted = loopCount;
                updateTotalDisplay();
                updateStatus(`✅ Hoàn thành vòng ${loopCount}!`, "#FF69B4");
                await sleep(LOOP_DELAY);
            }
        }
        isRunning = false;
        stopAntiSleep();
        updateUIState();
        updateStatus(`✨ ĐÃ DỪNG! Tổng: ${totalReportsDone}`, "#FF69B4");
        updateProgress(100);
    }

    // Khởi động
    document.body.appendChild(panel);
    renderPanel();
    if (antiSleepEnabled) startAntiSleep();
    updateStatus("🌸 Sẵn sàng! Bấm CHẠY VÔ HẠN", "#FFB6C1");
})();