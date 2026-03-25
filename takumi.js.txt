// ==UserScript==
// @name         TẤN KIỆT TAKUMI MEDIA - FB Auto Report (Blue Edition)
// @namespace    http://tampermonkey.net/
// @version      12.16
// @description  Hệ thống báo cáo tự động chuyên nghiệp - Blue Theme by TẤN KIỆT TAKUMI MEDIA
// @author       TẤN KIỆT & Gemini
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(async () => {
    'use strict';

    // ==========================================
    // CẤU HÌNH & XPATH (GIỮ NGUYÊN HOẠT ĐỘNG)
    // ==========================================
    [span_6](start_span)const INPUT_XPATH = "//*[@aria-label=\"Facebook Page name or URL\"]";[span_6](end_span)
    [span_7](start_span)const XP_SUBMIT = "//div[contains(@class, 'xdj266r')]//span[contains(text(), 'Submit') or contains(text(), 'Gửi')]";[span_7](end_span)
    [span_8](start_span)const XP_DONE   = "//div[contains(@class, 'xdj266r')]//span[contains(text(), 'Done') or contains(text(), 'Xong') or contains(text(), 'Hoàn tất')]";[span_8](end_span)
    [span_9](start_span)const XP_NEXT   = "//div[contains(@class, 'xdj266r')]//span[contains(text(), 'Next') or contains(text(), 'Tiếp')]";[span_9](end_span)

    const steps = [
        // --- CỤM 1: Fake Profile ---
        [span_10](start_span){ "step": 1, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_10](end_span)
        [span_11](start_span){ "step": 2, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_11](end_span)
        [span_12](start_span){ "step": 3, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_12](end_span)
        [span_13](start_span){ "step": 4, "name": "Fake profile", "xpath": "//SPAN[contains(text(), \"Fake profile\")]" },[span_13](end_span)
        [span_14](start_span){ "step": 5, "name": "They’re not a real person", "xpath": "//SPAN[contains(text(), \"They’re not a real person\")]" },[span_14](end_span)
        [span_15](start_span){ "step": 6, "name": "Submit", "xpath": XP_SUBMIT },[span_15](end_span)
        [span_16](start_span){ "step": 7, "name": "Next", "xpath": XP_NEXT },[span_16](end_span)
        [span_17](start_span){ "step": 8, "name": "Done", "xpath": XP_DONE },[span_17](end_span)

        // --- CỤM 2: Celebrity ---
        [span_18](start_span){ "step": 9, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_18](end_span)
        [span_19](start_span){ "step": 10, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_19](end_span)
        [span_20](start_span){ "step": 11, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_20](end_span)
        [span_21](start_span){ "step": 12, "name": "Fake profile", "xpath": "//SPAN[contains(text(), \"Fake profile\")]" },[span_21](end_span)
        [span_22](start_span){ "step": 13, "name": "A celebrity or public figure", "xpath": "//SPAN[contains(text(), \"A celebrity or public figure\")]" },[span_22](end_span)
        [span_23](start_span){ "step": 14, "name": "NHẬP TÊN: Meta", "xpath": INPUT_XPATH, "inputData": "Meta" },[span_23](end_span)
        [span_24](start_span){ "step": 15, "name": "Click Chọn Meta", "specialAction": "CLICK_META_RESULT" },[span_24](end_span)
        [span_25](start_span){ "step": 16, "name": "Next", "xpath": XP_NEXT },[span_25](end_span)
        [span_26](start_span){ "step": 17, "name": "Submit", "xpath": XP_SUBMIT },[span_26](end_span)
        [span_27](start_span){ "step": 18, "name": "Next", "xpath": XP_NEXT },[span_27](end_span)
        [span_28](start_span){ "step": 19, "name": "Done", "xpath": XP_DONE },[span_28](end_span)

        // --- CỤM 3: Under 18 ---
        [span_29](start_span){ "step": 20, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_29](end_span)
        [span_30](start_span){ "step": 21, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_30](end_span)
        [span_31](start_span){ "step": 22, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_31](end_span)
        [span_32](start_span){ "step": 23, "name": "Problem involving someone under 18", "xpath": "//SPAN[contains(text(), \"Problem involving someone under 18\")]" },[span_32](end_span)
        [span_33](start_span){ "step": 24, "name": "Physical abuse", "xpath": "//SPAN[contains(text(), \"Physical abuse\")]" },[span_33](end_span)
        [span_34](start_span){ "step": 25, "name": "Submit", "xpath": XP_SUBMIT },[span_34](end_span)
        [span_35](start_span){ "step": 26, "name": "Next", "xpath": XP_NEXT },[span_35](end_span)
        [span_36](start_span){ "step": 27, "name": "Done", "xpath": XP_DONE },[span_36](end_span)

        // --- CỤM 4: Violent ---
        [span_37](start_span){ "step": 28, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_37](end_span)
        [span_38](start_span){ "step": 29, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_38](end_span)
        [span_39](start_span){ "step": 30, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_39](end_span)
        [span_40](start_span){ "step": 31, "name": "Violent, hateful content", "xpath": "//SPAN[contains(text(), \"Violent, hateful or disturbing content\")]" },[span_40](end_span)
        [span_41](start_span){ "step": 32, "name": "Credible threat to safety", "xpath": "//SPAN[contains(text(), \"Credible threat to safety\")]" },[span_41](end_span)
        [span_42](start_span){ "step": 33, "name": "Submit", "xpath": XP_SUBMIT },[span_42](end_span)
        [span_43](start_span){ "step": 34, "name": "Next", "xpath": XP_NEXT },[span_43](end_span)
        [span_44](start_span){ "step": 35, "name": "Done", "xpath": XP_DONE },[span_44](end_span)

        // --- CỤM 5: Scam (Fraud) ---
        [span_45](start_span){ "step": 36, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_45](end_span)
        [span_46](start_span){ "step": 37, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_46](end_span)
        [span_47](start_span){ "step": 38, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_47](end_span)
        [span_48](start_span){ "step": 39, "name": "Scam, fraud", "xpath": "//SPAN[contains(text(), \"Scam, fraud or false information\")]" },[span_48](end_span)
        [span_49](start_span){ "step": 40, "name": "Fraud or scam", "xpath": "//SPAN[contains(text(), \"Fraud or scam\")]" },[span_49](end_span)
        [span_50](start_span){ "step": 41, "name": "Submit", "xpath": XP_SUBMIT },[span_50](end_span)
        [span_51](start_span){ "step": 42, "name": "Next", "xpath": XP_NEXT },[span_51](end_span)
        [span_52](start_span){ "step": 43, "name": "Done", "xpath": XP_DONE },[span_52](end_span)

        // --- CỤM 6: Scam (Spam) ---
        [span_53](start_span){ "step": 44, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_53](end_span)
        [span_54](start_span){ "step": 45, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_54](end_span)
        [span_55](start_span){ "step": 46, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_55](end_span)
        [span_56](start_span){ "step": 47, "name": "Scam, fraud", "xpath": "//SPAN[contains(text(), \"Scam, fraud or false information\")]" },[span_56](end_span)
        [span_57](start_span){ "step": 48, "name": "Spam", "xpath": "//SPAN[contains(text(), \"Spam\")]" },[span_57](end_span)
        [span_58](start_span){ "step": 49, "name": "Done", "xpath": XP_DONE },[span_58](end_span)

        // --- CỤM 7: Something else ---
        [span_59](start_span){ "step": 50, "name": "Menu (3 chấm)", "xpath": "//*[@aria-label=\"Profile settings see more options\"]" },[span_59](end_span)
        [span_60](start_span){ "step": 51, "name": "Report profile", "xpath": "//SPAN[contains(text(), \"Report profile\")]" },[span_60](end_span)
        [span_61](start_span){ "step": 52, "name": "Something about this profile", "xpath": "//SPAN[contains(text(), \"Something about this profile\")]" },[span_61](end_span)
        [span_62](start_span){ "step": 53, "name": "Something else", "xpath": "//SPAN[contains(text(), \"Something else\")]" },[span_62](end_span)
        [span_63](start_span){ "step": 54, "name": "Done", "xpath": XP_DONE }[span_63](end_span)
    ];

    [span_64](start_span)const DELAY_TIME = 3000;[span_64](end_span)
    [span_65](start_span)const INPUT_DELAY = 4500;[span_65](end_span)

    // ==========================================
    // CORE ENGINE (GIỮ NGUYÊN)
    // ==========================================
    [span_66](start_span)const sleep = ms => new Promise(r => setTimeout(r, ms));[span_66](end_span)

    function getElementByXpath(path) {
        if (!path) return null;
        [span_67](start_span)return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;[span_67](end_span)
    }

    function safeClick(element) {
        [span_68](start_span)if (!element) return;[span_68](end_span)
        [span_69](start_span)let blocker = element.closest('[aria-hidden="true"]');[span_69](end_span)
        [span_70](start_span)if (blocker) blocker.removeAttribute('aria-hidden');[span_70](end_span)
        [span_71](start_span)element.scrollIntoView({block: "center", inline: "center"});[span_71](end_span)
        [span_72](start_span)const opts = { bubbles: true, cancelable: true, view: window };[span_72](end_span)
        [span_73](start_span)element.dispatchEvent(new MouseEvent('mousedown', opts));[span_73](end_span)
        [span_74](start_span)element.dispatchEvent(new MouseEvent('mouseup', opts));[span_74](end_span)
        [span_75](start_span)element.dispatchEvent(new MouseEvent('click', opts));[span_75](end_span)
    }

    async function waitForElementToDisappear(element) {
        [span_76](start_span)let maxWait = 50;[span_76](end_span)
        [span_77](start_span)while (maxWait > 0) {[span_77](end_span)
            [span_78](start_span)if (!element.isConnected || element.offsetParent === null) return true;[span_78](end_span)
            [span_79](start_span)await sleep(100);[span_79](end_span)
            [span_80](start_span)maxWait--;[span_80](end_span)
        }
        [span_81](start_span)return false;[span_81](end_span)
    }

    async function waitForGlobalLoading(statusCallback) {
        [span_82](start_span)let maxWait = 100;[span_82](end_span)
        [span_83](start_span)let isWaiting = false;[span_83](end_span)
        [span_84](start_span)while (maxWait > 0) {[span_84](end_span)
            [span_85](start_span)let loadingIcon = document.querySelector('[role="progressbar"], img[src*="loading"], i[class*="loading"]');[span_85](end_span)
            [span_86](start_span)if (loadingIcon && loadingIcon.offsetParent !== null) {[span_86](end_span)
                [span_87](start_span)isWaiting = true;[span_87](end_span)
                [span_88](start_span)if(statusCallback) statusCallback("⌛ ĐANG XỬ LÝ...", "#00d2ff");[span_88](end_span)
                [span_89](start_span)await sleep(100);[span_89](end_span)
                [span_90](start_span)maxWait--;[span_90](end_span)
            } else {
                [span_91](start_span)if(isWaiting) await sleep(500);[span_91](end_span)
                [span_92](start_span)return;[span_92](end_span)
            }
        }
    }

    function findButtonFromV20_3(keywords) {
        [span_93](start_span)let all = [...document.querySelectorAll('div[role="menuitem"], div[role="button"], button, span, div[role="dialog"] span, div[aria-label], div[tabindex="0"]')];[span_93](end_span)
        [span_94](start_span)all = all.filter(el => el.offsetParent !== null && el.offsetWidth > 0);[span_94](end_span)
        [span_95](start_span)for (let el of all) {[span_95](end_span)
            [span_96](start_span)let txt = (el.innerText || "").trim();[span_96](end_span)
            [span_97](start_span)let label = (el.getAttribute("aria-label") || "").trim();[span_97](end_span)
            [span_98](start_span)for (let k of keywords) {[span_98](end_span)
                [span_99](start_span)if (txt === k || label === k || txt.includes(k) || label.includes(k)) {[span_99](end_span)
                    [span_100](start_span)let parentBtn = el.closest('div[role="button"], button, div[role="menuitem"], div[tabindex="0"]');[span_100](end_span)
                    [span_101](start_span)return parentBtn ? parentBtn : el;[span_101](end_span)
                }
            }
        }
        [span_102](start_span)return null;[span_102](end_span)
    }

    function simulateInput(element, text) {
        [span_103](start_span)element.focus();[span_103](end_span)
        [span_104](start_span)let lastValue = element.value;[span_104](end_span)
        [span_105](start_span)element.value = text;[span_105](end_span)
        [span_106](start_span)let event = new Event('input', { bubbles: true });[span_106](end_span)
        [span_107](start_span)let tracker = element._valueTracker;[span_107](end_span)
        if (tracker) { tracker.setValue(lastValue); [span_108](start_span)}
        element.dispatchEvent(event);[span_108](end_span)
        [span_109](start_span)element.dispatchEvent(new Event('change', { bubbles: true }));[span_109](end_span)
    }

    async function clickMetaResult(statusEl) {
        [span_110](start_span)let retry = 10;[span_110](end_span)
        [span_111](start_span)while (retry > 0) {[span_111](end_span)
            [span_112](start_span)let options = document.querySelectorAll('div[role="listbox"] span, ul[role="listbox"] span, div[role="presentation"] span');[span_112](end_span)
            [span_113](start_span)for (let span of options) {[span_113](end_span)
                [span_114](start_span)if (span.innerText.trim() === "Meta") {[span_114](end_span)
                    [span_115](start_span)statusEl.innerText = "Target: Meta Found!";[span_115](end_span)
                    [span_116](start_span)span.style.border = "2px solid #00d2ff";[span_116](end_span)
                    [span_117](start_span)safeClick(span);[span_117](end_span)
                    [span_118](start_span)return true;[span_118](end_span)
                }
            }
            [span_119](start_span)let imgs = document.querySelectorAll('div[role="listbox"] img');[span_119](end_span)
            [span_120](start_span)if (imgs.length > 0) {[span_120](end_span)
                 [span_121](start_span)safeClick(imgs[0]);[span_121](end_span)
                 [span_122](start_span)return true;[span_122](end_span)
            }
            [span_123](start_span)statusEl.innerText = `Searching... (${retry})`;[span_123](end_span)
            [span_124](start_span)await sleep(500);[span_124](end_span)
            [span_125](start_span)retry--;[span_125](end_span)
        }
        [span_126](start_span)return false;[span_126](end_span)
    }

    [span_127](start_span)let audioLoop = null;[span_127](end_span)
    [span_128](start_span)let titleInterval = null;[span_128](end_span)
    [span_129](start_span)const SILENT_AUDIO = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////////////////////////////////wAAADFMYXZjNTguMzUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAIAAAAASAA8AxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAATGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA';[span_129](end_span)

    function toggleAntiSleep(enable) {
        [span_130](start_span)if (enable) {[span_130](end_span)
            [span_131](start_span)if (!audioLoop) {[span_131](end_span)
                [span_132](start_span)audioLoop = new Audio(SILENT_AUDIO);[span_132](end_span)
                [span_133](start_span)audioLoop.loop = true;[span_133](end_span)
                [span_134](start_span)audioLoop.volume = 0.01;[span_134](end_span)
            }
            [span_135](start_span)audioLoop.play().catch(e => {});[span_135](end_span)
            [span_136](start_span)let tick = false;[span_136](end_span)
            [span_137](start_span)if (titleInterval) clearInterval(titleInterval);[span_137](end_span)
            [span_138](start_span)titleInterval = setInterval(() => {[span_138](end_span)
                document.title = tick ? [span_139](start_span)"💎 TAKUMI BLUE..." : "🛡️ ACTIVE";[span_139](end_span)
                [span_140](start_span)tick = !tick;[span_140](end_span)
            [span_141](start_span)}, 2000);[span_141](end_span)
        [span_142](start_span)} else {[span_142](end_span)
            [span_143](start_span)if (audioLoop) audioLoop.pause();[span_143](end_span)
            [span_144](start_span)if (titleInterval) {[span_144](end_span)
                [span_145](start_span)clearInterval(titleInterval);[span_145](end_span)
                [span_146](start_span)document.title = "Facebook";[span_146](end_span)
            }
        }
    }

    // ==========================================
    // GIAO DIỆN MỚI: TẤN KIỆT BLUE EDITION
    // ==========================================
    [span_147](start_span)let isPaused = false;[span_147](end_span)
    [span_148](start_span)let shouldStop = false;[span_148](end_span)
    [span_149](start_span)let isMini = false;[span_149](end_span)

    [span_150](start_span)const panel = document.createElement("div");[span_150](end_span)
    const fullStyle = {
        position: "fixed", top: "60px", left: "15px", width: "280px",
        background: "linear-gradient(145deg, #020b1a, #0a1f3d)", color: "#ffffff", 
        padding: "20px", borderRadius: "15px", zIndex: 999999, 
        border: "1px solid #00d2ff", fontFamily: "'Segoe UI', Roboto, sans-serif", 
        fontSize: "13px", boxShadow: "0 10px 40px rgba(0,210,255,0.3)",
        transition: "all 0.4s ease-in-out"
    [span_151](start_span)};[span_151](end_span)
    [span_152](start_span)Object.assign(panel.style, fullStyle);[span_152](end_span)

    const renderPanel = () => {
        [span_153](start_span)if (isMini) {[span_153](end_span)
            panel.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; cursor:pointer;" id="btnExpand">
                     <div style="width:12px; height:12px; background:#00d2ff; border-radius:50%; box-shadow:0 0 10px #00d2ff;"></div>
                     <span style="font-weight:bold; color:#00d2ff; font-size:11px;">TAKUMI BLUE</span>
                </div>
            [span_154](start_span)`;[span_154](end_span)
            [span_155](start_span)panel.style.width = "140px";[span_155](end_span)
            [span_156](start_span)panel.style.padding = "10px";[span_156](end_span)
            [span_157](start_span)panel.style.borderRadius = "30px";[span_157](end_span)
            [span_158](start_span)const btnExpand = panel.querySelector("#btnExpand");[span_158](end_span)
            btnExpand.onclick = () => { isMini = false; renderPanel(); [span_159](start_span)};[span_159](end_span)
        [span_160](start_span)} else {[span_160](end_span)
            panel.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #1a3a5a; padding-bottom:10px;">
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-weight:900; color:#00d2ff; letter-spacing:1px; font-size:14px;">TẤN KIỆT</span>
                        <span style="font-size:9px; color:#5c9bd1;">TAKUMI MEDIA BLUE</span>
                    </div>
                    <button id="btnMinimize" style="background:#1a3a5a; border:none; color:#00d2ff; cursor:pointer; width:24px; height:24px; border-radius:50%;">–</button>
                </div>
                
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <div style="flex:1;">
                        <label style="font-size:10px; color:#8ab4d1; display:block; margin-bottom:3px;">LẶP LẠI (VÒNG)</label>
                        <input id="inpMaxLoop" type="number" value="1" style="width:100%; padding:6px; background:#010811; color:#00d2ff; border:1px solid #1a3a5a; border-radius:5px; outline:none;">
                    </div>
                    <div style="flex:1;">
                        <label style="font-size:10px; color:#8ab4d1; display:block; margin-bottom:3px;">NGHỈ (PHÚT)</label>
                        <input id="inpDelayMin" type="number" value="0" style="width:100%; padding:6px; background:#010811; color:#00d2ff; border:1px solid #1a3a5a; border-radius:5px; outline:none;">
                    </div>
                </div>

                <div style="margin-bottom:15px; display:flex; align-items:center; gap:8px;">
                    <input type="checkbox" id="chkAntiSleep" checked style="accent-color:#00d2ff;"> 
                    <label for="chkAntiSleep" style="cursor:pointer; color:#00eaff; font-weight:bold; font-size:11px;">CHỐNG NGỦ TAB (ON)</label>
                </div>

                <div style="margin-bottom:5px; display:flex; justify-content:space-between; font-size:11px;">
                    <span style="color:#8ab4d1;">TRẠNG THÁI:</span>
                    <span id="stt" style="color:#00ff88; font-weight:bold;">SẴN SÀNG</span>
                </div>

                <div style="background:#010811; height:6px; border-radius:10px; overflow:hidden; margin-bottom:20px; border:1px solid #1a3a5a;">
                    <div id="progressBar" style="width:0%; height:100%; background:linear-gradient(90deg, #00d2ff, #007bff); transition: width 0.4s ease;"></div>
                </div>

                <div style="display:flex; gap:8px;">
                    <button id="btnStart" style="flex:1.5; padding:10px; background:#00d2ff; color:#010811; border:none; border-radius:8px; font-weight:900; cursor:pointer; transition:0.3s;">CHẠY NGAY</button>
                    <button id="btnPause" style="flex:1; padding:10px; background:#ffd700; color:#000; border:none; border-radius:8px; font-weight:bold; cursor:pointer; display:none;">TẠM DỪNG</button>
                    <button id="btnStop" style="flex:1; padding:10px; background:#ff4d4d; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; display:none;">DỪNG</button>
                </div>
                
                <div id="btnResume" style="display:none; margin-top:8px;">
                     <button style="width:100%; padding:10px; background:#00eaff; color:#000; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">TIẾP TỤC</button>
                </div>
            [span_161](start_span)`;[span_161](end_span)
            [span_162](start_span)Object.assign(panel.style, fullStyle);[span_162](end_span)
            [span_163](start_span)const btnMinimize = panel.querySelector("#btnMinimize");[span_163](end_span)
            btnMinimize.onclick = () => { isMini = true; renderPanel(); [span_164](start_span)};[span_164](end_span)
            [span_165](start_span)bindMainEvents();[span_165](end_span)
        }
    };
    
    [span_166](start_span)document.body.appendChild(panel);[span_166](end_span)

    function bindMainEvents() {
        [span_167](start_span)if(isMini) return;[span_167](end_span)
        [span_168](start_span)const btnStart = panel.querySelector("#btnStart");[span_168](end_span)
        [span_169](start_span)const btnPause = panel.querySelector("#btnPause");[span_169](end_span)
        [span_170](start_span)const btnStop = panel.querySelector("#btnStop");[span_170](end_span)
        [span_171](start_span)const btnResumeDiv = panel.querySelector("#btnResume");[span_171](end_span)
        [span_172](start_span)const btnResume = btnResumeDiv.querySelector("button");[span_172](end_span)

        [span_173](start_span)if (btnStart) btnStart.onclick = startProcess;[span_173](end_span)
        if (btnPause) btnPause.onclick = () => { isPaused = true; updateUIState(); [span_174](start_span)};[span_174](end_span)
        if (btnResume) btnResume.onclick = () => { isPaused = false; updateUIState(); [span_175](start_span)};[span_175](end_span)
        if (btnStop) btnStop.onclick = () => { 
            [span_176](start_span)if(confirm("XÁC NHẬN DỪNG HỆ THỐNG?")) {[span_176](end_span)
                [span_177](start_span)shouldStop = true;[span_177](end_span)
                [span_178](start_span)isPaused = false; toggleAntiSleep(false);[span_178](end_span)
                [span_179](start_span)updateStatus("ĐANG DỪNG...", "#ff4d4d");[span_179](end_span)
            } 
        };
    }

    function updateUIState() {
        [span_180](start_span)if(isMini) return;[span_180](end_span)
        [span_181](start_span)const btnStart = panel.querySelector("#btnStart");[span_181](end_span)
        [span_182](start_span)const btnPause = panel.querySelector("#btnPause");[span_182](end_span)
        [span_183](start_span)const btnStop = panel.querySelector("#btnStop");[span_183](end_span)
        [span_184](start_span)const btnResumeDiv = panel.querySelector("#btnResume");[span_184](end_span)
        
        [span_185](start_span)if (!btnStart) return;[span_185](end_span)
        [span_186](start_span)if (audioLoop && !audioLoop.paused) {[span_186](end_span)
            [span_187](start_span)btnStart.style.display = "none";[span_187](end_span)
            [span_188](start_span)btnStop.style.display = "block";[span_188](end_span)
            [span_189](start_span)if (isPaused) {[span_189](end_span)
                [span_190](start_span)btnPause.style.display = "none";[span_190](end_span)
                [span_191](start_span)btnResumeDiv.style.display = "block";[span_191](end_span)
            } else {
                [span_192](start_span)btnPause.style.display = "block";[span_192](end_span)
                [span_193](start_span)btnResumeDiv.style.display = "none";[span_193](end_span)
            }
        } else { 
            [span_194](start_span)btnStart.style.display = "block";[span_194](end_span)
            [span_195](start_span)btnPause.style.display = "none";[span_195](end_span)
            [span_196](start_span)btnStop.style.display = "none";[span_196](end_span)
            [span_197](start_span)btnResumeDiv.style.display = "none";[span_197](end_span)
        }
    }

    function updateStatus(text, color = "#00d2ff") {
        [span_198](start_span)const el = panel.querySelector(isMini ? "#miniStt" : "#stt");[span_198](end_span)
        if (el) { el.innerText = text.toUpperCase(); el.style.color = color; [span_199](start_span)}
    }
    
    function updateProgress(percent) {
        const el = panel.querySelector(isMini ? "#miniBar" : "#progressBar");[span_199](end_span)
        [span_200](start_span)if (el) el.style.width = percent + "%";[span_200](end_span)
    }

    async function startProcess() {
        [span_201](start_span)let maxLoops = 1, delayMinutes = 0, useAntiSleep = true;[span_201](end_span)
        [span_202](start_span)if (!isMini) {[span_202](end_span)
            maxLoops = parseInt(panel.querySelector("#inpMaxLoop").value) || [span_203](start_span)1;[span_203](end_span)
            delayMinutes = parseInt(panel.querySelector("#inpDelayMin").value) || [span_204](start_span)0;[span_204](end_span)
            [span_205](start_span)useAntiSleep = panel.querySelector("#chkAntiSleep").checked;[span_205](end_span)
        }

        [span_206](start_span)let currentLoop = 0;[span_206](end_span)
        [span_207](start_span)shouldStop = false;[span_207](end_span)
        [span_208](start_span)isPaused = false;[span_208](end_span)

        [span_209](start_span)if (useAntiSleep) toggleAntiSleep(true);[span_209](end_span)
        [span_210](start_span)updateUIState();[span_210](end_span)

        [span_211](start_span)while (currentLoop < maxLoops && !shouldStop) {[span_211](end_span)
            [span_212](start_span)currentLoop++;[span_212](end_span)
            [span_213](start_span)for (let i = 0; i < steps.length; i++) {[span_213](end_span)
                [span_214](start_span)if (shouldStop) break;[span_214](end_span)
                while (isPaused) { await sleep(500); if (shouldStop) break; [span_215](start_span)}

                let step = steps[i];[span_215](end_span)
                [span_216](start_span)updateStatus(`[VÒNG ${currentLoop}] ${step.name}`, "#00d2ff");[span_216](end_span)
                [span_217](start_span)updateProgress((step.step / 54) * 100);[span_217](end_span)

                [span_218](start_span)if (step.specialAction === "CLICK_META_RESULT") {[span_218](end_span)
                    [span_219](start_span)let dummyStt = { innerText: "" };[span_219](end_span)
                    [span_220](start_span)let success = await clickMetaResult(dummyStt);[span_220](end_span)
                    [span_221](start_span)updateStatus(dummyStt.innerText || "TARGET: META", "#00eaff");[span_221](end_span)
                    [span_222](start_span)if (!success) {[span_222](end_span)
                        [span_223](start_span)let inputEl = getElementByXpath(INPUT_XPATH);[span_223](end_span)
                        [span_224](start_span)if(inputEl) inputEl.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', keyCode: 13, bubbles: true}));[span_224](end_span)
                    }
                    [span_225](start_span)await waitForGlobalLoading(updateStatus);[span_225](end_span)
                    [span_226](start_span)await sleep(DELAY_TIME);[span_226](end_span)
                    [span_227](start_span)continue;[span_227](end_span)
                }

                [span_228](start_span)let el = null;[span_228](end_span)
                [span_229](start_span)for(let retry=0; retry<8; retry++){[span_229](end_span)
                    [span_230](start_span)if (shouldStop) break;[span_230](end_span)
                    [span_231](start_span)if (step.xpath) el = getElementByXpath(step.xpath);[span_231](end_span)
                    [span_232](start_span)if (!el) {[span_232](end_span)
                        [span_233](start_span)if (step.name === "Next") el = findButtonFromV20_3(["Next", "Tiếp", "Tiếp tục"]);[span_233](end_span)
                        [span_234](start_span)else if (step.name === "Submit") el = findButtonFromV20_3(["Submit", "Gửi", "Send"]);[span_234](end_span)
                        [span_235](start_span)else if (step.name === "Done") el = findButtonFromV20_3(["Done", "Xong", "Hoàn tất", "Đóng", "Close"]);[span_235](end_span)
                        [span_236](start_span)else el = findButtonFromV20_3([step.name]);[span_236](end_span)
                    }
                    [span_237](start_span)if(el) break;[span_237](end_span)
                    [span_238](start_span)await sleep(1000);[span_238](end_span)
                }

                [span_239](start_span)if (shouldStop) break;[span_239](end_span)
                [span_240](start_span)if (el) {[span_240](end_span)
                    [span_241](start_span)if (step.inputData) {[span_241](end_span)
                        [span_242](start_span)el.style.border = "2px solid #ffd700";[span_242](end_span)
                        [span_243](start_span)simulateInput(el, step.inputData);[span_243](end_span)
                        [span_244](start_span)updateStatus("ĐANG TÌM...", "#00eaff");[span_244](end_span)
                        [span_245](start_span)await sleep(INPUT_DELAY);[span_245](end_span)
                    [span_246](start_span)} else {[span_246](end_span)
                        [span_247](start_span)el.style.border = "2px solid #00d2ff";[span_247](end_span)
                        [span_248](start_span)safeClick(el);[span_248](end_span)
                        [span_249](start_span)if (step.name === "Next" || step.name === "Submit") {[span_249](end_span)
                            [span_250](start_span)updateStatus("ĐANG XỬ LÝ NÚT...", "#00eaff");[span_250](end_span)
                            [span_251](start_span)await waitForElementToDisappear(el);[span_251](end_span)
                        }
                        [span_252](start_span)await waitForGlobalLoading(updateStatus);[span_252](end_span)
                        [span_253](start_span)updateStatus("NGHỈ 3S...", "#1a3a5a");[span_253](end_span)
                        [span_254](start_span)await sleep(DELAY_TIME);[span_254](end_span)
                    }
                } else {
                    [span_255](start_span)shouldStop = true;[span_255](end_span)
                    [span_256](start_span)updateStatus(`MISSING: ${step.name}`, "#ff4d4d");[span_256](end_span)
                    [span_257](start_span)alert(`LỖI: TẤN KIỆT MEDIA\nKhông tìm thấy nút: ${step.name}`);[span_257](end_span)
                    [span_258](start_span)break;[span_258](end_span)
                }
            }

            [span_259](start_span)if (shouldStop) break;[span_259](end_span)
            [span_260](start_span)if (currentLoop < maxLoops) {[span_260](end_span)
                [span_261](start_span)if (delayMinutes > 0) {[span_261](end_span)
                    [span_262](start_span)let secondsLeft = delayMinutes * 60;[span_262](end_span)
                    [span_263](start_span)while (secondsLeft > 0 && !shouldStop) {[span_263](end_span)
                        [span_264](start_span)updateStatus(`NGHỈ: ${secondsLeft}S...`, "#00eaff");[span_264](end_span)
                        [span_265](start_span)await sleep(1000);[span_265](end_span)
                        [span_266](start_span)secondsLeft--;[span_266](end_span)
                    }
                [span_267](start_span)} else await sleep(2000);[span_267](end_span)
            }
        }

        [span_268](start_span)if (!shouldStop) {[span_268](end_span)
            [span_269](start_span)updateStatus("HOÀN THÀNH!", "#00ff88");[span_269](end_span)
            [span_270](start_span)updateProgress(100);[span_270](end_span)
            [span_271](start_span)alert(`TẤN KIỆT TAKUMI MEDIA:\nĐã chạy xong toàn bộ ${currentLoop} vòng!`);[span_271](end_span)
        }
        
        [span_272](start_span)toggleAntiSleep(false);[span_272](end_span)
        [span_273](start_span)updateUIState();[span_273](end_span)
    };

    [span_274](start_span)renderPanel();[span_274](end_span)
})();
