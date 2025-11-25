// const links = document.querySelectorAll(".nav a");

// links.forEach(link => {
//     const originalText = link.textContent;
//     let interval;

//     link.addEventListener("mouseenter", () => {
//         clearInterval(interval); // just in case
//         interval = setInterval(() => {
//             let binary = "";
//             for (let i = 0; i < originalText.length; i++) {
//                 binary += Math.random() > 0.5 ? "1" : "0";
//             }
//             link.textContent = binary;
//         }, 100); // update every 100ms
//     });

//     link.addEventListener("mouseleave", () => {
//         clearInterval(interval);
//         link.textContent = originalText; // restore
//     });
// });

const links = document.querySelectorAll(".nav a");

links.forEach(link => {
    const originalText = link.textContent;
    let interval;
    let timeout;

    //reserve fixed width for the links (based on its text length)
    link.style.display = "inline-block";
    link.style.width = `${originalText.length + 2}ch`; // keep width stable
    link.style.textAlign = "center";               // center text nicely

    link.addEventListener("mouseenter", () => {
        clearInterval(interval);
        clearTimeout(timeout);

        let elapsed = 0;
        interval = setInterval(() => {
            let binary = "";
            for (let i = 0; i < originalText.length; i++) {
                binary += Math.random() > 0.5 ? "1" : "0";
            }
            link.textContent = binary;
        }, 33); // fast glitch

        // stop glitch after 333ms
        timeout = setTimeout(() => {
            clearInterval(interval);
            link.textContent = originalText;
        }, 333);
    });

    link.addEventListener("mouseleave", () => {
        clearInterval(interval);
        clearTimeout(timeout);
        link.textContent = originalText;
    });
});