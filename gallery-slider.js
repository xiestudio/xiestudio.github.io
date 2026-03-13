const images = document.querySelectorAll('.image');
let currentIndex = 0;

// Get the page counter element
const pageCounter = document.getElementById('page-counter');

// Function to update the text display
function updateCounter() {
    // We add 1 to currentIndex because arrays are 0-indexed, but page numbers start at 1.
    pageCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentIndex = Array.from(images).findIndex(image => image === entry.target);
            updateCounter(); // Call the function to update the text
        }
    });
}, {
    threshold: 0.5
});

images.forEach(image => {
    observer.observe(image);
});

// Handle the Next button click
document.getElementById('next-btn').onclick = function() {
    // Check if the current scroll position is at the very top of the page.
    if (window.scrollY === 0 && currentIndex === 0) {
        // If at the top, scroll to the first image (images[0]).
        images[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (currentIndex === images.length - 1) {
        // If it's the last image, scroll to the bottom of the page.
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    } else {
        // Otherwise, scroll to the next image in the sequence.
        const nextIndex = currentIndex + 1;
        const nextImage = images[nextIndex];
        nextImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};    

// Handle the Previous button click
document.getElementById('prev-btn').onclick = function() {
    if (currentIndex === 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const prevIndex = currentIndex - 1;
        const prevImage = images[prevIndex];
        prevImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

// Initial call to set the counter when the page loads
// Note: The Intersection Observer might handle this on page load if the first image is already in view,
// but this ensures it is set correctly from the start.
updateCounter();
