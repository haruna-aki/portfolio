
// const darkModeOn = localStorage.getItem("dark");

// if (darkModeOn == true) {
//     document.body.classList.add("dark");
// }

// darkmode.addEventListener("click", function (e) {
//     document.body.classList.add("dark");
//     localStorage.setItem("dark", true)
// });

// lightmode.addEventListener("click", function (e) {
//     document.body.classList.remove("dark")
//     localStorage.setItem("dark", false)
// });

// SET toggleButton = find element with id "theme_toggle"
// SET body = document body

// IF localStorage value for "theme" is "dark" THEN
//     ADD class "dark" to body
//     CHANGE button text to "☀️ Light Mode"
// END IF

// WHEN toggleButton is clicked:
//     TOGGLE class "dark" on body

//     IF body has class "dark" THEN
//         CHANGE button text to "☀️ Light Mode"
//         SAVE "dark" in localStorage under "theme"
//     ELSE
//         CHANGE button text to "🌙 Dark Mode"
//         SAVE "light" in localStorage under "theme"
//     END IF
// END EVENT

const toggleBtn = document.getElementById('theme_toggle');
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = " ";
}