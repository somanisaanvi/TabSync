# TabSync

A real-time multi-tab settings synchronization web application built with **React**, **TypeScript**, and **Vite**. This project allows users to seamlessly update preferences (such as dark mode, language, and font size) in any open browser tab, with updates instantly propagated to all other open tabs within milliseconds.

##Features

- **Real-Time Cross-Tab Synchronization:** Instantly updates preferences across multiple tabs using the *Broadcast Channel API* (sub-100ms latency).
- **Persistent State:** Saves user preferences to `localStorage` so they are retained after closing and reopening the browser.
- **Zero-Flash Initialization:** Inline script injection prevents the "flash of wrong theme" when opening new tabs in dark mode.
- **Conflict Resolution:** Implements a *Last-Write-Wins (LWW)* strategy using timestamps to handle simultaneous edits deterministically.
- **Modern UI/UX:** Clean top-navigation bar featuring an intuitive theme toggle and multi-language dropdown selector (`en`, `es`, `fr`, `de`).

## Tech Stack

- **Framework:** React + Vite (v5)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **APIs:** Broadcast Channel API, LocalStorage API

## Installation and Execution Instructions

Follow these steps to run the project locally on your machine:

### Prerequisites
Make sure you have **Node.js** installed on your computer (v18 or higher recommended).

### 1. Clone the Repository
Open your terminal and clone the repository, then navigate into the project directory:
```bash
git clone [https://github.com/somaniisaanvi/TabSync.git](https://github.com/somaniisaanvi/TabSync.git)
cd gdg_frontend
