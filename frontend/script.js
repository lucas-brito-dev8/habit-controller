const habitsSection = document.querySelector('.habits');
const doneArea = document.querySelector('.habits.done-area');
const addButton = document.querySelector('#openAdd');
const addBox = document.getElementById('addBox');
const deleteBtn = document.querySelector('.delet-btn');
const streakDisplay = document.querySelector('#streak');
const doneTodayDisplay = document.querySelector('#done-today');
let habits = [];

function loadHabits() {
    const saved = localStorage.getItem('habits');

    if (saved) {
        habits = JSON.parse(saved);
    }
};

loadHabits();
checkTimer();
renderHabits();

function getDate() {
    return new Date().toISOString().split("T")[0];
}

function addHabits() {
    const button = addBox.querySelector('button');

    addButton.addEventListener('click', () => {
        addBox.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        const clickedOutside = !addBox.contains(e.target) && !addButton.contains(e.target);
        
        if (clickedOutside) {
            addBox.classList.remove('active');
        }
    });

    button.addEventListener('click', () => {
        const input = addBox.querySelector('input');
        const value = input.value;
        let exists = false;

        habits.forEach(habit => {
            if (habit.name.toLowerCase() === value.toLowerCase()) {
                exists = true;
            }
        });

        if (!exists && value.trim() !== '') {
            habits.push({ name: value, done: false, completedAt: null });
            saveHabits();
            renderHabits();
            input.value = '';
        }
    });
};

addHabits();

function renderHabits() {
    getHabitsDiff();
    getStreak();
    checkTimer();

    habitsSection.innerHTML = '';
    doneArea.innerHTML = '';

    habits.forEach(habit => {
        const div = document.createElement('div');
        div.classList.add('habit-card');

        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = habit.done;

        checkbox.addEventListener('change', () => {
            habit.done = checkbox.checked;

            if (habit.done) {
                habit.completedAt = getDate();
                div.classList.add('moving');

                setTimeout(() => {
                    saveHabits();
                    renderHabits();
                }, 300);
            } else {
                habit.completedAt = null;
                saveHabits();
                renderHabits();
            }
        });

        const span = document.createElement('span');
        span.textContent = habit.name;

        label.appendChild(checkbox);
        label.appendChild(span);
        div.appendChild(label);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = '🗑';
        div.appendChild(deleteButton);

        if (habit.done) {
            div.classList.add('completed');
            doneArea.appendChild(div);
        } else {
            habitsSection.appendChild(div);
        }
    });
};

habitsSection.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
        const card = event.target.parentElement;
        const name = card.querySelector('span').textContent;
        habits = habits.filter(h => h.name !== name);
        saveHabits();
        renderHabits();
    }
});

function checkTimer() {
    const today = getDate();

    habits.forEach(habit => {
        if (habit.done && habit.completedAt && habit.completedAt !== today) {
            habit.done = false;
            habit.completedAt = null;
        }
    });

    saveHabits();
};

function saveHabits() {
    const strHabts = JSON.stringify(habits);
    localStorage.setItem('habits', strHabts);
};

function getStreak() {
    let streak = JSON.parse(localStorage.getItem('streak')) || 0;
    let lastStreakDate = JSON.parse(localStorage.getItem('lastStreakDate')) || null;

    const today = getDate();

    const allDoneToday = habits.length > 0 && habits.every(h => h.done && h.completedAt === today);

    if (allDoneToday && lastStreakDate !== today) {
        if (lastStreakDate) {
            const diff = getDayDifference(lastStreakDate);

            if (diff === 1) {
                streak++;
            } else {
                streak = 1;
            }
        } else {
            streak = 1;
        }

        lastStreakDate = today;
    }

    if (lastStreakDate) {
        const diff = getDayDifference(lastStreakDate);

        if (diff > 1) {
            streak = 0;
        }
    }

    localStorage.setItem('streak', JSON.stringify(streak));
    localStorage.setItem('lastStreakDate', JSON.stringify(lastStreakDate));

    streakDisplay.textContent = streak + ' dias';
};

function getDayDifference(dateString) {
    const today = new Date();
    const past = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    past.setHours(0, 0, 0, 0);

    const diffTime = today - past;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
};

function getHabitsDiff() {
    const didToday = habits.filter(h => h.done === true && h.completedAt === getDate()).length;

    if (didToday > 0) {
        doneTodayDisplay.textContent = didToday + ' hábitos';
    }
};