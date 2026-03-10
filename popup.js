document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    const toggleSwitch = document.getElementById('toggleSwitch');
    const resetBtn = document.getElementById('resetBtn');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes("letterboxd.com")) {
            chrome.storage.local.get(['extensionEnabled'], (result) => {
                const isEnabled = result.extensionEnabled !== false;
                toggleSwitch.checked = isEnabled;
            });

            toggleSwitch.addEventListener('change', () => {
                chrome.storage.local.set({ extensionEnabled: toggleSwitch.checked });
                reloadCurrentTab();
            });

            resetBtn.addEventListener('click', async () => {
                await clearSeenMovies();
            });
        } else {
            toggleSwitch.disabled = true;
            resetBtn.disabled = true;
            document.body.style.opacity = 0.5;
        }
    });
});


function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}
async function clearSeenMovies() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            localStorage.removeItem('movies');
            location.reload();
        }
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = chrome.i18n.getMessage(key);
        if (translation) {
            el.textContent = translation;
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const translation = chrome.i18n.getMessage(key);
        if (translation) {
            el.title = translation;
        }
    });
}