# 🧠 Habit Controller Dashboard

A simple and efficient web application for tracking daily habits, featuring a **streak system** and local persistence.

---

## 🚀 Features

* ✅ Add new habits
* ✅ Mark habits as completed
* 🔄 Automatic daily reset (midnight)
* 🔥 Streak system (consecutive days completing all habits)
* 📊 Counter for habits completed today
* 💾 Persistence using `localStorage`
* 🖱️ Interactive UI (open/close input, basic animations)

---

## 🧠 How it works

### 📅 Daily Reset

Habits are automatically unchecked when a new day starts.

This is handled by comparing the current date with the date when the habit was completed.

---

### 🔥 Streak System

The streak increases when:

* All habits are completed on the same day
* And the last valid day was yesterday

The streak resets when:

* The user misses a day (does not complete all habits)

---

### 💾 Persistence

Data is stored in the browser using `localStorage`:

* `habits` → list of habits
* `streak` → current streak
* `lastStreakDate` → last valid streak date

---

## 📁 Project Structure

```
/project
  /frontend
    index.html
    style.css
    script.js

  /backend
    server.js
```

---

## 🌐 Server

The server is only used to serve static files.

### ▶️ How to run

```bash
cd backend
node server.js
```

Open in your browser:

```
http://localhost:3000
```

---

## ⚙️ Technologies Used

* HTML
* CSS
* JavaScript (Vanilla)
* Node.js (Express)

---

## 📌 Notes

* Data is stored locally (no database)
* Each browser/device has its own data
* Clearing browser storage will remove all habits

---

## 🚧 Future Improvements

* 🔐 Authentication system (login)
* ☁️ Database integration
* 📱 Mobile responsiveness
* 📈 Progress charts
* 🎨 UI/UX improvements

---

## ⭐ Contribution

Feel free to open issues or submit pull requests.

---

## 📜 License

This project is free to use and modify.
