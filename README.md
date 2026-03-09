# Blindboxd

**Protecting your cinematic objectivity on Letterboxd.**

Have you ever opened a Letterboxd page and immediately had your expectations skewed because you saw a 4.2-star rating or a polarized histogram?

**Blindboxd** is a lightweight browser extension that hides community ratings until you have officially watched or logged the film. It ensures that your first viewing experience is completely unbiased, allowing you to form your own opinion before seeing the consensus.

---

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [The Technical Part](#the-technical-part-under-the-hood)
* [How to Reset Memory](#how-to-reset-memory)
* [How to Contribute](#how-to-contribute)
* [License](#license)
---

## Features

* **Instant Rating Shield:** Injects a CSS rule the millisecond the page starts loading to prevent "rating flashes."
* **Smart Auto-Reveal:** The moment you click the "Watch" (eye) icon or log the film, the ratings appear.
* **Manual Override:** Not watching the movie but still curious? Click the custom button to reveal the ratings.
* **Toggle Control:** Use the extension popup to enable or disable the hiding feature instantly.
* **Multilingual:** Available in english, spanish, and french, with more languages coming soon!


---

## Installation

### From the Web Store (Recommended)

* **Chrome :** [Install from Chrome Web Store](https://chromewebstore.google.com/detail/kffndkmjflgdmlcidlhockpljdpibcbl)
* **Firefox:** *coming soon*

### Manual Installation (For Developers)

1. Download or clone this repository.
2. Go to `chrome://extensions` in your browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.

---

## The Technical Part (Under the Hood)

To ensure a seamless experience, the extension needs to remember which films you have already interacted with.

### Data Storage

When you click the manual reveal button, the extension saves that specific movie's ID to your browser's **Local Storage**.

* **Privacy:** No data ever leaves your device. We do not use servers or tracking.
* **Persistence:** The extension remembers your reveals even after you close the browser.

### How to Reset Memory

If you want to "forget" the movies you've revealed and hide their ratings again, you can do so directly via the extension interface:

1. Click the **Blindboxd icon** in your browser toolbar.
2. Select the **"Reset Memory"** button.
3. The page will automatically refresh, and all ratings will be hidden again.

---

## How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

* **Add a Language:** If you have a great cinematic reference for your language, please open a Pull Request!
* **Report Bugs:** Feel free to open an issue if something isn't working as expected.
* **Feature Requests:** Have an idea to make the extension better? Let us know in the issues section.

---

## License

This project is licensed under the **MIT License**. Feel free to fork it, tweak it, and share the love for cinema.