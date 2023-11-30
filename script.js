const duration = 5; // seconds

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7);
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloon(balloonContainer) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);

    setTimeout(() => {
        balloonContainer.remove();
    }, duration * 1000);
}

function createBalloons(num) {
    var balloonContainer = document.createElement("div");
    balloonContainer.id = "balloon-container";
    document.body.appendChild(balloonContainer);

    for (var i = num; i > 0; i--) {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(function () {
            createBalloon(balloonContainer);
        });
    }
}

function createFireworks() {
    for (var i = 0; i < 20; i++) {
        (function () {
            var firework = document.createElement("div");
            firework.className = "firework";
            firework.style.left = Math.random() * window.innerWidth + "px";
            firework.style.top = Math.random() * window.innerHeight + "px";
            document.body.appendChild(firework);

            // Remove the fireworks after 5 seconds
            setTimeout(function () {
                firework.remove();
            }, duration * 1000);
        })();
    }
}

function moveButtonRandomly(button) {
    var maxX = window.innerWidth - button.offsetWidth;
    var maxY = window.innerHeight - button.offsetHeight;

    var randomX = random(maxX);
    var randomY = random(maxY);

    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

function createHiddenButton(referenceButton) {
    // Check if the hidden button is already created
    var hiddenButton = document.querySelector('#hidden-button');
    if (!hiddenButton) {
        hiddenButton = document.createElement("button");
        hiddenButton.style.visibility = 'hidden';
        hiddenButton.id = 'hidden-button';
        hiddenButton.innerHTML = '隠し';

        // Insert the hidden button after the "はい" button
        referenceButton.parentNode.insertBefore(hiddenButton, referenceButton.nextSibling);
    }
}

function showFunnyMessage(message) {
    // Create a div for the funny message
    var funnyMessageDiv = document.createElement('div');
    funnyMessageDiv.className = 'funny-message';
    funnyMessageDiv.textContent = message;

    // Append the div to the body
    document.body.appendChild(funnyMessageDiv);

    // Remove the message after a delay
    setTimeout(function () {
        funnyMessageDiv.remove();
    }, duration * 1000); // Remove the message after 3 seconds
}

function showDancingCat(referenceImage) {
    // Change the gif image
    referenceImage.src = 'public/cat-state-2.gif';

    // Bring back the image after delay
    setTimeout(function () {
        referenceImage.src = 'public/cat-state-1.gif';
    }, duration * 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the "はい" button element
    var yesButton = document.querySelector('button:nth-of-type(1)');
    var noButton = document.querySelector('button:nth-of-type(2)');

    // Get the image element
    var imageElement = document.querySelector('img');

    // Smartphone compability
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    var isMouseOver = false;

    var mouseLeaveTimeout;

    // Add a mouseover event listener to the image element
    imageElement.addEventListener('mouseover', function () {
        if (!isTouchDevice) {
            isMouseOver = true;
            imageElement.src = 'public/cat-state-3.gif';
        }
    });

    // Add a mouseleave event listener to the image element
    imageElement.addEventListener('mouseleave', function () {
        if (!isTouchDevice) {
            clearTimeout(mouseLeaveTimeout);

            // Set a delay before changing the image source on mouseleave
            mouseLeaveTimeout = setTimeout(function () {
                isMouseOver = false;
                imageElement.src = 'public/cat-state-1.gif';
            }, 300); // Adjust the delay as needed
        }
    });

    // Add a touchstart event listener to the image element
    imageElement.addEventListener('touchstart', function () {
        if (isMouseOver) {
            return;
        }

        isMouseOver = false;

        // Change the image source when the image is clicked
        imageElement.src = 'public/cat-state-3.gif';

        // Reset the image source after 3 seconds
        setTimeout(function () {
            if (!imageElement.src.includes('public/cat-state-2.gif')) {
                imageElement.src = 'public/cat-state-1.gif';
            }
        }, 1500);
    });

    // Add a click event listener to the "はい" button
    yesButton.addEventListener('click', function () {
        // Show dancing cat
        showDancingCat(imageElement);

        // Create floating baloons
        createBalloons(50);

        // Create fireworks on "はい" button click
        createFireworks();

        // Add a funny message when the "はい" button is clicked
        showFunnyMessage("すごい！ポジティブな君に感動！💖");
    });

    // Add a click event listener to the "いいえ" button
    noButton.addEventListener('click', function () {
        // Move the "いいえ" button to a random position
        moveButtonRandomly(noButton);

        // Create a hidden button next to the "いいえ" button
        createHiddenButton(noButton);

        // Add a funny comment when the "いいえ" button is clicked
        console.log("いいえ, but the 'はい' button is still there. Sneaky, sneaky! 🕵️‍♂️");
    });
});
