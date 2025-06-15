<script setup>

const { user } = useUserSession()

const form = reactive({
    amount: '',
    phoneNumber: user.value.contactInfo.phone || '',
})

sanitizePhoneNumber()

const isLoading = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const quickAmounts = [100, 250, 500, 1000, 2500, 5000]

const validateForm = () => {
    if (!form.amount || form.amount < 1) {
        errorMessage.value = 'Please enter a valid donation amount'
        return false
    }

    if (form.phoneNumber.length !== 12) {
        errorMessage.value = 'Please enter a valid Kenyan phone number'
        return false
    }

    return true
}


function sanitizePhoneNumber() {
    if (!form.phoneNumber || form.phoneNumber?.startsWith('254')) return;

    const first7 = form.phoneNumber.indexOf('7')
    const sanitizedNumber = '254'.concat(form.phoneNumber.slice(first7))

    form.phoneNumber = sanitizedNumber
}

const submitDonation = async () => {
    errorMessage.value = ''

    if (!validateForm()) {
        return
    }

    isLoading.value = true

    try {

        const response = await $fetch('/api/donations/stk', {
            method: 'POST',
            body: form
        })


        showSuccess.value = true
        
        // Reset form
        form.amount = ''

    } catch (error) {
        errorMessage.value = 'Network error. Please check your connection and try again.'
    } finally {
        isLoading.value = false
    }
}

const setAmount = (amount) => {
    form.amount = amount.toString()
}

const closeSuccess = () => {
    showSuccess.value = false
}
</script>

<template>
        <div class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">Give Back, Make a Difference</h1>
                <p class="hero-subtitle">
                    Your generous contribution helps us provide quality mental health services
                    to those who need it most. Together, we can build a stronger, healthier community.
                </p>
            </div>
        </div>

        <div class="main-content">
            <div class="donation-container">
                <div class="info-section">
                    <h2>Why Your Donation Matters</h2>
                    <div class="impact-list">
                        <div class="impact-item">
                            <div class="impact-icon">🧠</div>
                            <div class="impact-text">
                                <h3>Mental Health Support</h3>
                                <p>Help us provide accessible therapy sessions and counseling services to patients in
                                    need.</p>
                            </div>
                        </div>

                        <div class="impact-item">
                            <div class="impact-icon">💚</div>
                            <div class="impact-text">
                                <h3>Community Wellness</h3>
                                <p>Support community mental health programs and awareness campaigns that save lives.</p>
                            </div>
                        </div>

                        <div class="impact-item">
                            <div class="impact-icon">🤝</div>
                            <div class="impact-text">
                                <h3>Better Services</h3>
                                <p>Enable us to improve our platform, tools, and resources for better patient care.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <div class="form-card">
                        <h2>Make a Donation</h2>
                        <p class="form-subtitle">Every contribution counts towards building a mentally healthier Kenya
                        </p>

                        <form @submit.prevent="submitDonation" class="donation-form">

                            <div class="form-group">
                                <label for="amount">Donation Amount (KES)</label>
                                <input id="amount" v-model="form.amount" type="number" min="1" step="1"
                                    placeholder="Enter amount" :disabled="isLoading" required />
                            </div>

                            <div class="quick-amounts">
                                <p class="quick-amounts-label">Quick amounts:</p>
                                <div class="amount-buttons">
                                    <button v-for="amount in quickAmounts" :key="amount" type="button"
                                        @click="setAmount(amount)"
                                        :class="['amount-btn', { active: form.amount === amount.toString() }]"
                                        :disabled="isLoading">
                                        KES {{ amount.toLocaleString() }}
                                    </button>
                                </div>
                            </div>


                            <div class="form-group">
                                <label for="phone">M-Pesa Phone Number</label>
                                <input id="phone" v-model="form.phoneNumber" type="tel"
                                    placeholder="0712345678 or +254712345678" :disabled="isLoading" required
                                    @change="sanitizePhoneNumber" />
                                <small class="help-text">Enter your Safaricom number for M-Pesa payment</small>
                            </div>


                            <div v-if="errorMessage" class="error-message">
                                {{ errorMessage }}
                            </div>


                            <button type="submit" :disabled="isLoading" class="submit-btn">
                                <span v-if="isLoading" class="loading-spinner"></span>
                                {{ isLoading ? 'Processing...' : 'Donate via M-Pesa' }}
                            </button>

                            <p class="security-note">
                                🔒 Your donation is processed securely through Safaricom M-Pesa
                            </p>
                            <img src="/assets/logos/mpesa.png" id="mpesa-logo" alt="Mpesa logo">
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showSuccess" class="modal-overlay" @click="closeSuccess">
            <div class="modal-content" @click.stop>
                <div class="success-icon">✅</div>
                <h3>Thank You for Your Generosity!</h3>
                <p>
                    Your donation request has been sent to your phone. Please complete the
                    M-Pesa transaction to finalize your contribution.
                </p>
                <p class="success-note">
                    Check your phone for an M-Pesa STK push notification and enter your PIN to complete the donation.
                </p>
                <button @click="closeSuccess" class="close-btn">Close</button>
            </div>
        </div>
</template>

<style scoped>
.donation-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    font-family: 'Arial', sans-serif;
}

.hero-section {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    padding: 60px 20px;
    text-align: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin: 0 0 20px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.9;
    line-height: 1.6;
}

.main-content {
    padding: 60px 20px;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);

}

.donation-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

.info-section h2 {
    font-size: 2rem;
    color: #16a34a;
    margin: 0 0 30px 0;
}

.impact-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.impact-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.impact-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
}

.impact-text h3 {
    font-size: 1.3rem;
    color: #374151;
    margin: 0 0 10px 0;
}

.impact-text p {
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
}

.form-section {
    position: sticky;
    top: 20px;
}

.form-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.form-card h2 {
    font-size: 1.8rem;
    color: #16a34a;
    margin: 0 0 10px 0;
}

.form-subtitle {
    color: #6b7280;
    margin: 0 0 30px 0;
    font-size: 0.95rem;
}

.donation-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
}

.form-group input {
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
}

.form-group input:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.form-group input:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
}

.help-text {
    color: #6b7280;
    font-size: 0.85rem;
}

.quick-amounts {
    margin: 10px 0;
}

.quick-amounts-label {
    color: #374151;
    font-weight: 500;
    margin: 0 0 12px 0;
    font-size: 0.9rem;
}

.amount-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.amount-btn {
    padding: 10px 12px;
    border: 2px solid #e5e7eb;
    background: white;
    color: #374151;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.amount-btn:hover:not(:disabled) {
    border-color: #22c55e;
    background-color: #f0fdf4;
}

.amount-btn.active {
    border-color: #22c55e;
    background-color: #22c55e;
    color: white;
}

.amount-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.error-message {
    background-color: #fef2f2;
    color: #dc2626;
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid #fecaca;
    font-size: 0.9rem;
}

.submit-btn {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.security-note {
    text-align: center;
    color: #6b7280;
    font-size: 0.85rem;
    margin: 10px 0 0 0;
}

#mpesa-logo{
    width:200px;
    margin:0 auto;

}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    padding: 40px;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.success-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.modal-content h3 {
    color: #16a34a;
    margin: 0 0 20px 0;
    font-size: 1.5rem;
}

.modal-content p {
    color: #6b7280;
    margin: 0 0 15px 0;
    line-height: 1.5;
}

.success-note {
    background-color: #f0fdf4;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #bbf7d0;
    font-size: 0.9rem;
    margin-bottom: 25px !important;
}

.close-btn {
    background: #22c55e;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.close-btn:hover {
    background: #16a34a;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .donation-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .form-card {
        padding: 30px 20px;
    }

    .amount-buttons {
        grid-template-columns: repeat(2, 1fr);
    }

    .info-section {
        order: 2;
    }

    .form-section {
        order: 1;
        position: static;
    }
}
</style>