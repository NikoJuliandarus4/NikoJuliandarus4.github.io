// script.js

// Add an event listener to the "Download CV" button
document.getElementById('downloadCV').addEventListener('click', function() {
    alert('Downloading CV...'); // Replace this with actual download functionality
    // You can add logic to trigger a file download here
});




document.addEventListener('DOMContentLoaded', function() {
    const workExperienceBtn = document.getElementById('workExperienceBtn');
    const projectBtn = document.getElementById('projectBtn');
    const workExperienceContent = document.getElementById('workExperienceContent');
    const projectContent = document.getElementById('projectContent');

    workExperienceBtn.addEventListener('click', function() {
        workExperienceContent.style.display = 'block';
        projectContent.style.display = 'none';
        workExperienceBtn.classList.add('active');
        projectBtn.classList.remove('active');
    });

    projectBtn.addEventListener('click', function() {
        workExperienceContent.style.display = 'none';
        projectContent.style.display = 'block';
        projectBtn.classList.add('active');
        workExperienceBtn.classList.remove('active');
    });
});



// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');

    // Get all images with class 'modal-trigger'
    const images = document.querySelectorAll('.modal-trigger');

    // Loop through all images and add click event
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});