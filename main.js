const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const photos = [{filename:"images/pic1.jpg", alt:"human-eye"}, 
                {filename:"images/pic2.jpg", alt:"hair"} ,
                {filename:"images/pic3.jpg", alt:"flower"} ,
                {filename:"images/pic4.jpg", alt:"picture"} ,
                {filename:"images/pic5.jpg", alt:"buturfly"} ];


/* Declaring the alternative text for each image file */

/* Looping through images */

for (i=0; i < 5; ++i){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', photos[i].filename);
    newImage.setAttribute('alt', photos[i].alt);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", function(e) {
        displayedImage.setAttribute("src", e.target.getAttribute("src"));       
        displayedImage.setAttribute("alt", "displayed-img");       
    })
}

/* Wiring up the Darken/Lighten button */
function lightSwitch () {
    if (btn.getAttribute("class") === "dark") {
        btn.setAttribute("class","light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else if (btn.getAttribute("class") !== "dark") {
        btn.setAttribute("class","dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
}

btn.addEventListener("click", lightSwitch );
// btn.addEventListener("click", function(e) {
//     if (btn.getAttribute("class") === "dark") {
//         btn.setAttribute("class","light");
//         e.target.textContent("Lighten");
//         overlay.style.backgroundColor(rgba(0,0,0,0.5));
//     } else if (btn.getAttribute("class") !== "dark") {
//         btn.setAttribute("class","dark");
//         e.target.textContent("Darken");
//         overlay.style.backgroundColor(rgba(0,0,0,0));
//     }
// });