// main.js
let streak = 0;
let bannerActive = false;

function updateStreakDisplay() {
    document.getElementById('streak').textContent = streak;
}

function renderGrid() {
    const grid = document.getElementById('duckGrid');
    grid.innerHTML = '';
    const { rotations, differentIndex } = getRotations();
    for (let i = 0; i < 4; i++) {
        const cell = document.createElement('div');
        const cellContent = document.createElement('div');
        cell.className = 'cell';
        cellContent.innerHTML = '🦆';
        cellContent.style.transform = `rotate(${rotations[i]}deg)`;
        cell.appendChild(cellContent);
        cell.addEventListener('click', function() {
            if (bannerActive) return;
            if (i === differentIndex) {
                streak++;
                showBanner(true, regenerateGrid);
            } else {
                streak = 0;
                showBanner(false, regenerateGrid);
            }
            updateStreakDisplay();
        });
        grid.appendChild(cell);
    }
    updateStreakDisplay();
}

function regenerateGrid() {
    renderGrid();
}

// Populate the grid with duck emojis

document.addEventListener('DOMContentLoaded', function() {
    renderGrid();
});

function getRotations() {
    const baseRotation = Math.floor(Math.random() * 31) - 15; // -15 to +15
    // rotation difference should be at least 5 degrees, and at most 15 degrees
    const differentRotation = baseRotation + (Math.floor(Math.random() * 11) + 5); // 5 to 15
    const differentIndex = Math.floor(Math.random() * 4); // 0 to 3
    const rotations = [];
    for (let i = 0; i < 4; i++) {
        if (i === differentIndex) {
            rotations.push(differentRotation);
        } else {
            rotations.push(baseRotation);
        }
    }
    return { rotations, differentIndex };
}

function showBanner(isSuccess, callback) {
    bannerActive = true;
    const banner = document.getElementById(isSuccess ? 'successBanner' : 'failureBanner');
    if (!banner) {
        bannerActive = false;
        if (callback) callback();
        return;
    }
    banner.style.opacity = '1';
    banner.style.transform = 'translate(-50%, -50%) scale(1)';
    setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => {
            bannerActive = false;
            if (callback) callback();
        }, 400);
    }, 1500);
}