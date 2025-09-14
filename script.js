import { images } from './images.js';

document.addEventListener('DOMContentLoaded', () => {
    // Tailwind Configuration
    if (typeof tailwind !== 'undefined') {
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'sans': ['Montserrat', 'sans-serif'],
                        'serif': ['Lora', 'serif'],
                    },
                    colors: {
                        'base-100': '#F8F5F2', // Light Beige
                        'neutral': '#3D403A',   // Dark Gray/Brown for text
                        'primary': '#4A6163',   // Natural Green
                        'accent': '#A94442',    // Barn Red
                    }
                }
            }
        };
    }

    // Set background images
    const heroBgElement = document.querySelector('.hero-bg');
    if (heroBgElement) {
        heroBgElement.style.backgroundImage = `url('${images.heroBackground}')`;
    }

    // Set src for all images with data-img-id
    document.querySelectorAll('[data-img-id]').forEach(img => {
        const imageId = img.dataset.imgId;
        if (images[imageId]) {
            const imagePath = images[imageId];
            if (imagePath.startsWith('http')) {
                img.src = imagePath;
            } else {
                img.src = new URL(imagePath, document.baseURI).href;
            }
        }
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Fade-in animation on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});