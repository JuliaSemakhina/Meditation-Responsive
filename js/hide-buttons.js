/* HIDE-BUTTONS.JS */
const app = document.querySelector('.app');

const inactiveTime = 3000;

// Last time the mouse moved
let mouseLastMoveTime = new Date();

// Listen for mouse move
document.addEventListener('mousemove', () => {
    mouseLastMoveTime = new Date();

    app.classList.remove('inactive');

    document.body.style.cursor = 'auto';
})

// Deactivate App

function deactivateApp() {
    // Check if the user was inactive for a certain amount of time
    let now = new Date();
    let deltaTime = now - mouseLastMoveTime;

    if (deltaTime >= inactiveTime) {
        // Hide app
        app.classList.add('inactive');
        document.body.style.cursor = 'none';
    }

    requestAnimationFrame(deactivateApp);
}

deactivateApp();