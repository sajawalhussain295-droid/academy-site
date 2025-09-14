// ===== main.js =====

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // ===== Hero Slider =====
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) slide.classList.add('active');
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        showSlide(currentSlide);
        setInterval(nextSlide, 5000);
    }

    // ===== Mobile Navigation Toggle =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    }

    // ===== Statistics Counters =====
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const counters = statsSection.querySelectorAll('.stat-number');
        const speed = 200;

        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ===== FAQ Toggle =====
    const faqItems = document.querySelectorAll('.faq-item h3');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const faqItem = item.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }

    // ===== FAQ Category Filtering (if exists) =====
    const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
    if (faqCategoryBtns.length > 0) {
        faqCategoryBtns.forEach(button => {
            button.addEventListener('click', () => {
                faqCategoryBtns.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Open first FAQ by default
        const firstFaq = document.querySelector('.faq-item');
        if (firstFaq) firstFaq.classList.add('active');
    }

    // ===== Teacher Cards Animation =====
    const teacherCards = document.querySelectorAll('.teacher-card');
    if (teacherCards.length > 0) {
        teacherCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    // ===== Contact / Free Trial Form Validation =====
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const course = document.getElementById('course')?.value;
            const level = document.getElementById('level')?.value;

            if (!name || !email || !phone || !course || !level) {
                alert('Please fill in all required fields');
                return;
            }

            alert('Thank you for booking your free trial! We will contact you within 24 hours to schedule your class.');
            form.reset();
        });
    }

});
