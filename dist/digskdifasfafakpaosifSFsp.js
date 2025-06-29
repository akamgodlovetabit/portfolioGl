'use strict';
async function downloadCV() {
    const btn = document.querySelector('.download-btn .btn');
    const loader = document.getElementById('loader');
    
    // Show loading state
    btn.disabled = true;
    loader.style.display = 'block';
    btn.querySelector('span').textContent = 'Downloading...';
    
    try {
        // Start the download
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'programmer-image/ctn/Akam Godlove Tabit.pdf', true);
        xhr.responseType = 'blob';
        
        // Create a promise to handle the download
        const downloadPromise = new Promise((resolve, reject) => {
            xhr.onload = function() {
                if (this.status === 200) {
                    const blob = new Blob([this.response], { type: 'application/pdf' });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = 'Akam_Godlove_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up the object URL after some time
                    setTimeout(() => {
                        window.URL.revokeObjectURL(link.href);
                    }, 100);
                    
                    resolve();
                } else {
                    reject(new Error('Failed to download file'));
                }
            };
            
            xhr.onerror = function() {
                reject(new Error('Network error occurred'));
            };
        });
        
        xhr.send();
        
        // Wait for the download to complete (or fail)
        await downloadPromise;
        
        // Update UI for success
        loader.style.display = 'none';
        btn.querySelector('span').textContent = 'Download Complete!';
        
    } catch (error) {
        // Handle errors
        console.error('Download failed:', error);
        loader.style.display = 'none';
        btn.querySelector('span').textContent = 'Download Failed';
    }
    
    // Reset button after 2 seconds regardless of success/failure
    setTimeout(() => {
        btn.querySelector('span').textContent = 'Download CV';
        btn.disabled = false;
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
    const socialIcons = document.querySelectorAll('.icon-m span');

    // Function to open social media profile
    function openProfile(url) {
        if (url) {
            window.open(url, '_blank');
        }
    }

    // Add event listeners to each social media icon
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });

        icon.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });

        icon.addEventListener('click', function() {
            let profileUrl;

            // Determine profile URL based on the icon's class
            if (this.classList.contains('fa-facebook-f')) {
                profileUrl = 'https://www.facebook.com/profile.php?id=100087606417946';
            } else if (this.classList.contains('fa-twitter')) {
                profileUrl = 'https://twitter.com/';
            } else if (this.classList.contains('fa-linkedin')) {
                profileUrl = 'https://www.linkedin.com/in/akam-godlove-3b27a7277';
            }

            // Open the profile URL
            openProfile(profileUrl);
        });
    });
});
