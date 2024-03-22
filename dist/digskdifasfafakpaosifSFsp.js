'use strict'
async function downloadCV() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; 
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'programmer-image/ctn/Akam Godlove Tabit.pdf', true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (this.status === 200) {
            var blob = new Blob([this.response], { type: 'application/pdf' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Akam_Godlove_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            loader.style.display = 'none'; 
        }
    };

    xhr.send();
}

document.addEventListener("DOMContentLoaded", function() {
    const socialIcons = document.querySelectorAll('.icon-m span');

    // Function to open social media profile
    function openProfile(url) {
        window.open(url, '_blank');
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
