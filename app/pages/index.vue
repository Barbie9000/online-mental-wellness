<template>
    <div class="wellness-container">
        <header class="hero-header">
            <div class="hero-content">
                <div class="logo-section">
                    <div class="logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path
                                d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z" />
                            <path d="M9 9h6M9 12h6M9 15h6" />
                        </svg>
                    </div>
                    <h1 class="main-title">
                        <span class="brand">BETTERMIND</span>
                        <span class="subtitle">Online Mental Wellness Booking System</span>
                    </h1>
                </div>
                <p class="hero-quote">
                    Mental health is not a destination but a process.
                    It's about how you drive, not where you're going.
                </p>
            </div>
        </header>

        <section id="social" class="wellness-section">
            <div class="section-content">
                <div class="section-header">
                    <div class="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <h2>Social Wellness</h2>
                </div>
                <div class="section-description">
                    <p>Build meaningful connections that nurture your mental wellbeing. Develop communication skills,
                        strengthen relationships, and find your community through guided group sessions and social skill
                        development programs.</p>
                </div>
                <div class="section-action">
                    <a href="/auth/signup" class="wellness-button">
                        <span>Begin Your Social Journey</span>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <section id="psychological" class="wellness-section">
            <div class="section-content">
                <div class="section-header">
                    <div class="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h2>Psychological Wellness</h2>
                </div>
                <div class="section-description">
                    <p>Understand and transform your thought patterns through evidence-based therapeutic approaches.
                        Develop mental clarity, emotional resilience, and healthy coping strategies with professional
                        guidance tailored to your needs.</p>
                </div>
                <div class="section-action">
                    <a href="/auth/signup" class="wellness-button">
                        <span>Start Your Mental Health Journey</span>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <section id="physical" class="wellness-section">
            <div class="section-content">
                <div class="section-header">
                    <div class="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <h2>Physical Wellness</h2>
                </div>
                <div class="section-description">
                    <p>Honor the profound connection between your body and mind. Discover how movement, nutrition, and
                        rest contribute to mental wellbeing through integrated wellness programs designed to strengthen
                        both physical and emotional health.</p>
                </div>
                <div class="section-action">
                    <a href="/auth/signup" class="wellness-button">
                        <span>Embrace Holistic Wellness</span>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <section id="developmental" class="wellness-section">
            <div class="section-content">
                <div class="section-header">
                    <div class="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <path d="M9 9h.01M15 9h.01" />
                        </svg>
                    </div>
                    <h2>Developmental Wellness</h2>
                </div>
                <div class="section-description">
                    <p>Embrace your unique path of personal evolution at your own pace. Set meaningful goals, overcome
                        challenges, and unlock your potential through personalized coaching and development programs
                        that honor your individual journey.</p>
                </div>
                <div class="section-action">
                    <a href="/auth/signup" class="wellness-button">
                        <span>Begin Personal Growth</span>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <section id="emotional" class="wellness-section">
            <div class="section-content">
                <div class="section-header">
                    <div class="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </div>
                    <h2>Emotional Wellness</h2>
                </div>
                <div class="section-description">
                    <p>Navigate your emotional landscape with compassion and wisdom. Learn to recognize, understand, and
                        healthily express your feelings while developing emotional intelligence that enriches all
                        aspects of your life and relationships.</p>
                </div>
                <div class="section-action">
                    <a href="/auth/signup" class="wellness-button">
                        <span>Explore Emotional Intelligence</span>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wellness-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #ffffff;
}

/* Hero Header */
.hero-header {
    position: relative;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
}

.hero-content {
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
}

.logo-section {
    margin-bottom: 3rem;
}

.logo-icon {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: 2rem;
    color: #ffffff;
    animation: pulse 2s infinite;
}

.logo-icon svg {
    width: 100%;
    height: 100%;
}

.main-title {
    color: #ffffff;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.brand {
    display: block;
    font-size: 3.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
}

.subtitle {
    display: block;
    font-size: 1.3rem;
    font-weight: 400;
    opacity: 0.9;
    color: #ffffff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

.hero-quote {
    font-size: 1.4rem;
    color: #ffffff;
    font-style: italic;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Wellness Sections */
.wellness-section {
    padding: 5rem 2rem;
}

.wellness-section:last-child {
    border-bottom: none;
}

.section-content {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

.section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.section-icon {
    width: 60px;
    height: 60px;
    color: #ffffff;
    margin-bottom: 1.5rem;
}

.section-icon svg {
    width: 100%;
    height: 100%;
}

.section-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #a64ac9, #6a0dad);
    /* Purple gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    margin: 0;
}

.section-description {
    margin-bottom: 3rem;
}

.section-description p {
    font-size: 1.2rem;
    color: #ffffff;
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 300;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

.section-action {
    display: flex;
    justify-content: center;
}

.wellness-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 2.5rem;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
    border: none;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.wellness-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
    background: linear-gradient(135deg, #ee5a24 0%, #d63031 100%);
}

.wellness-button:active {
    transform: translateY(-1px);
}

.arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.wellness-button:hover .arrow {
    transform: translateX(4px);
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-header {
        min-height: 50vh;
        padding: 2rem 1rem;
    }

    .brand {
        font-size: 2.8rem;
    }

    .subtitle {
        font-size: 1.1rem;
    }

    .hero-quote {
        font-size: 1.2rem;
    }

    .wellness-section {
        padding: 3rem 1rem;
    }

    .section-header h2 {
        font-size: 2rem;
    }

    .section-description p {
        font-size: 1.1rem;
    }

    .wellness-button {
        padding: 1rem 2rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .hero-header {
        padding: 1.5rem 1rem;
    }

    .brand {
        font-size: 2.2rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .hero-quote {
        font-size: 1.1rem;
    }

    .wellness-section {
        padding: 2.5rem 1rem;
    }

    .section-header h2 {
        font-size: 1.8rem;
    }

    .section-description p {
        font-size: 1rem;
    }

    .wellness-button {
        padding: 0.9rem 1.5rem;
        font-size: 0.95rem;
        gap: 0.75rem;
    }

    .arrow {
        width: 18px;
        height: 18px;
    }
}
</style>