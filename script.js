document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("animated-text");
    const confettiContainer = document.getElementById("confetti-container");
    const text = "Website made right and done";
    const amazingWord = "Amazing";
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textElement.innerHTML = text.slice(0, index + 1); // Smooth text update
            index++;
            setTimeout(typeText, 50); // Faster typing speed for a smoother feel
        } else {
            textElement.innerHTML += "&nbsp;";

            // Add "Amazing" with flashing and scaling effect
            const span = document.createElement("span");
            span.classList.add("gradient", "amazing", "flash");
            span.textContent = amazingWord;
            textElement.appendChild(span);

            // Trigger scaling and confetti after flashing
            setTimeout(() => {
                span.style.transform = "scale(2)";
                triggerConfetti();

                // Reset Amazing's size after 3 seconds
                setTimeout(() => {
                    span.style.transform = "scale(1)";
                }, 3000);
            }, 500); // Confetti starts after the flash effect
        }
    }

    function triggerConfetti() {
        const duration = 3000; // 5 seconds
        const end = Date.now() + duration;

        function createConfetti() {
            const confetti = document.createElement("div");
            confetti.style.position = "absolute";
            confetti.style.left = `${Math.random() * window.innerWidth}px`;
            confetti.style.top = `-10px`;
            confetti.style.width = "10px";
            confetti.style.height = "10px";
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.opacity = 0.8;
            confetti.style.animation = `fall 3s linear`;

            confettiContainer.appendChild(confetti);

            // Remove the confetti element after the animation completes
            setTimeout(() => confetti.remove(), 3000);
        }

        function frame() {
            const timeLeft = end - Date.now();

            if (timeLeft > 0) {
                createConfetti();
                requestAnimationFrame(frame);
            } else {
                confettiContainer.innerHTML = ""; // Clear confetti after the animation
            }
        }

        frame();
    }

    // Start typing animation
    typeText();
});

