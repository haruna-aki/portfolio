const frontEnd = 'FRONTEND DEVELOPER';
let index = 0;
let isDeleting = false;
const target = document.getElementById('frontendDev');

function typeText() {
    if (isDeleting === false) {
        target.textContent = frontEnd.substring(0, index); //+ '|'
        index++;
        if (index > frontEnd.length) {
            isDeleting = true;
        }
    } else {
        target.textContent = frontEnd.substring(0, index);
        index--;
        if (index < 0) {
            isDeleting = false;
            index = 0;
        }
    }

    setTimeout(typeText, 200);
}

typeText();