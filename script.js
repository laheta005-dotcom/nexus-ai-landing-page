// Mouse Spotlight Follower
const spotlight = document.getElementById('spotlight');
window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
});

// 3D Tilt Effect on Terminal Card
const tiltCard = document.getElementById('tiltCard');
document.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    tiltCard.style.transform = `rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
});
document.addEventListener('mouseleave', () => {
    tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

// Typing Effect for Heading
const headingText = "Immersive digital experiences that convert.";
const headingElement = document.getElementById('typed-heading');
let index = 0;
function typeWriter() {
    if (index < headingText.length) {
        headingElement.innerHTML += headingText.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}
window.onload = () => { typeWriter(); };

// Real-time Dynamic Image Generator using Pollinations AI (Generates based on your exact text!)
const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const imageContainer = document.getElementById('imageContainer');
const placeholderText = document.getElementById('placeholderText');
const generatingOverlay = document.getElementById('generatingOverlay');

function handleGeneration() {
    const promptValue = promptInput.value.trim();
    if (!promptValue) return;

    // Show loading overlay
    generatingOverlay.style.display = 'flex';
    if (placeholderText) placeholderText.style.display = 'none';
    
    // Remove old image if exists
    const oldImg = imageContainer.querySelector('img');
    if (oldImg) oldImg.remove();

    // Encode prompt for URL
    const encodedPrompt = encodeURIComponent(promptValue);
    // Using Pollinations.ai free API which generates real images based on ANY text prompt you write!
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=500&nologo=true`;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = promptValue;
    
    // Styling the generated image to fit perfectly without distortion
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '6px';

    img.onload = () => {
        generatingOverlay.style.display = 'none';
        imageContainer.appendChild(img);
    };

    img.onerror = () => {
        generatingOverlay.style.display = 'none';
        if (placeholderText) {
            placeholderText.style.display = 'block';
            placeholderText.textContent = "// Error generating image. Try another prompt.";
        }
    };
}

generateBtn.addEventListener('click', handleGeneration);
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGeneration();
});