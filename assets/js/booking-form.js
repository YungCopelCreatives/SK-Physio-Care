// Dynamic Booking Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const conditionSelect = document.getElementById('condition');
    const discoveryQuestions = document.getElementById('discovery-questions');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    
    // Discovery questions for each condition
    const conditionQuestions = {
        'arthritic-chronic-pain': [
            {
                question: 'How long have you been experiencing joint pain?',
                type: 'radio',
                options: ['Less than 3 months', '3-6 months', '6-12 months', 'More than 1 year']
            },
            {
                question: 'Which joints are primarily affected?',
                type: 'checkbox',
                options: ['Knees', 'Hips', 'Hands/Wrists', 'Shoulders', 'Spine/Back', 'Other']
            },
            {
                question: 'How would you rate your pain level on a scale of 1-10?',
                type: 'radio',
                options: ['1-3 (Mild)', '4-6 (Moderate)', '7-8 (Severe)', '9-10 (Very Severe)']
            },
            {
                question: 'What makes your pain worse?',
                type: 'checkbox',
                options: ['Movement', 'Rest', 'Morning stiffness', 'Weather changes', 'Physical activity']
            }
        ],
        'back-neck-pain': [
            {
                question: 'When did your back/neck pain start?',
                type: 'radio',
                options: ['Suddenly (injury)', 'Gradually', 'After specific activity', 'Unknown']
            },
            {
                question: 'Where is your pain located?',
                type: 'checkbox',
                options: ['Upper back', 'Lower back', 'Neck', 'Shoulders', 'Radiates to arms/legs']
            },
            {
                question: 'What movements trigger your pain?',
                type: 'checkbox',
                options: ['Bending forward', 'Twisting', 'Lifting', 'Sitting', 'Standing', 'Walking']
            },
            {
                question: 'Do you experience any of these symptoms?',
                type: 'checkbox',
                options: ['Numbness', 'Tingling', 'Weakness', 'Stiffness', 'Headaches']
            }
        ],
        'sports-injuries': [
            {
                question: 'What type of injury did you sustain?',
                type: 'radio',
                options: ['Sprain', 'Strain', 'Fracture', 'Tendon injury', 'Ligament tear', 'Other']
            },
            {
                question: 'Which body part is injured?',
                type: 'radio',
                options: ['Knee', 'Ankle', 'Shoulder', 'Elbow', 'Wrist', 'Hip', 'Back', 'Other']
            },
            {
                question: 'How did the injury occur?',
                type: 'radio',
                options: ['During sport activity', 'Training', 'Accident', 'Overuse', 'Unknown']
            },
            {
                question: 'What sport were you playing when injured?',
                type: 'radio',
                options: ['Running', 'Soccer', 'Rugby', 'Cricket', 'Tennis', 'Gym/Weights', 'Other']
            }
        ],
        'pelvic-floor-dysfunction': [
            {
                question: 'What symptoms are you experiencing?',
                type: 'checkbox',
                options: ['Urinary incontinence', 'Bowel issues', 'Pelvic pain', 'Pain during intercourse', 'Lower back pain']
            },
            {
                question: 'How long have you had these symptoms?',
                type: 'radio',
                options: ['Less than 3 months', '3-6 months', '6-12 months', 'More than 1 year']
            },
            {
                question: 'Have you had any of the following?',
                type: 'checkbox',
                options: ['Pregnancy', 'Childbirth', 'Pelvic surgery', 'Menopause', 'Prostate issues']
            },
            {
                question: 'What activities are affected?',
                type: 'checkbox',
                options: ['Exercise', 'Daily activities', 'Social activities', 'Work', 'Sleep']
            }
        ],
        'orthopaedic-conditions': [
            {
                question: 'What orthopaedic condition are you dealing with?',
                type: 'radio',
                options: ['Post-surgery recovery', 'Fracture healing', 'Joint replacement', 'Spinal condition', 'Other']
            },
            {
                question: 'How long ago was your surgery/injury?',
                type: 'radio',
                options: ['Less than 2 weeks', '2-6 weeks', '6-12 weeks', 'More than 3 months']
            },
            {
                question: 'What are your main goals?',
                type: 'checkbox',
                options: ['Pain reduction', 'Improved mobility', 'Return to work', 'Return to sport', 'Daily activities']
            },
            {
                question: 'Do you have any movement restrictions?',
                type: 'radio',
                options: ['No restrictions', 'Weight-bearing restrictions', 'Movement limitations', 'Doctor\'s orders']
            }
        ],
        'respiratory-conditions': [
            {
                question: 'What respiratory condition do you have?',
                type: 'radio',
                options: ['Asthma', 'COPD', 'Bronchitis', 'Pneumonia recovery', 'Post-COVID', 'Other']
            },
            {
                question: 'How would you describe your breathing?',
                type: 'radio',
                options: ['Normal', 'Mild difficulty', 'Moderate difficulty', 'Severe difficulty']
            },
            {
                question: 'What triggers your symptoms?',
                type: 'checkbox',
                options: ['Exercise', 'Cold air', 'Allergens', 'Stress', 'Infection', 'Unknown']
            },
            {
                question: 'Do you experience any of these?',
                type: 'checkbox',
                options: ['Cough', 'Wheezing', 'Chest tightness', 'Shortness of breath', 'Fatigue']
            }
        ],
        'neurological-conditions': [
            {
                question: 'What neurological condition affects you?',
                type: 'radio',
                options: ['Stroke', 'Parkinson\'s', 'Multiple sclerosis', 'Brain injury', 'Spinal cord injury', 'Other']
            },
            {
                question: 'What are your main challenges?',
                type: 'checkbox',
                options: ['Balance issues', 'Walking difficulty', 'Weakness', 'Coordination problems', 'Speech issues']
            },
            {
                question: 'How does it affect your daily life?',
                type: 'radio',
                options: ['Minimal impact', 'Some difficulty', 'Significant impact', 'Severe impact']
            },
            {
                question: 'What assistive devices do you use?',
                type: 'checkbox',
                options: ['None', 'Walker', 'Cane', 'Wheelchair', 'Braces', 'Other']
            }
        ],
        'joint-dysfunctions': [
            {
                question: 'Which joint is affected?',
                type: 'radio',
                options: ['Knee', 'Hip', 'Shoulder', 'Elbow', 'Wrist', 'Ankle', 'Other']
            },
            {
                question: 'What joint issues are you experiencing?',
                type: 'checkbox',
                options: ['Stiffness', 'Swelling', 'Pain', 'Instability', 'Clicking/popping', 'Limited movement']
            },
            {
                question: 'When are symptoms worse?',
                type: 'radio',
                options: ['Morning', 'After activity', 'Evening', 'Constant', 'Variable']
            },
            {
                question: 'What activities are difficult?',
                type: 'checkbox',
                options: ['Walking', 'Stairs', 'Lifting', 'Sports', 'Household tasks', 'Work activities']
            }
        ],
        'headaches-treatment': [
            {
                question: 'What type of headaches do you experience?',
                type: 'checkbox',
                options: ['Tension headaches', 'Migraines', 'Cervicogenic', 'Cluster headaches', 'Sinus headaches']
            },
            {
                question: 'How often do you get headaches?',
                type: 'radio',
                options: ['Rarely', 'Monthly', 'Weekly', 'Daily', 'Multiple times daily']
            },
            {
                question: 'Where is your headache pain located?',
                type: 'checkbox',
                options: ['Forehead', 'Temples', 'Back of head', 'One side', 'Both sides', 'Neck/shoulders']
            },
            {
                question: 'What triggers your headaches?',
                type: 'checkbox',
                options: ['Stress', 'Poor posture', 'Screen time', 'Lack of sleep', 'Certain foods', 'Weather']
            }
        ]
    };
    
    // Handle condition selection change
    conditionSelect.addEventListener('change', function() {
        const selectedCondition = this.value;
        
        if (selectedCondition && conditionQuestions[selectedCondition]) {
            showDiscoveryQuestions(selectedCondition);
        } else {
            discoveryQuestions.classList.remove('active');
        }
    });
    
    // Show discovery questions based on selected condition
    function showDiscoveryQuestions(condition) {
        const questions = conditionQuestions[condition];
        let questionsHTML = '<h3>Discovery Questions</h3>';
        
        questions.forEach((q, index) => {
            questionsHTML += `
                <div class="question-item">
                    <h4>Question ${index + 1}: ${q.question}</h4>
                    <div class="${q.type}-group">
            `;
            
            q.options.forEach(option => {
                const inputName = `question_${index}`;
                const inputId = `${inputName}_${option.replace(/[^a-zA-Z0-9]/g, '_')}`;
                
                if (q.type === 'radio') {
                    questionsHTML += `
                        <div class="radio-option">
                            <input type="radio" id="${inputId}" name="${inputName}" value="${option}" required>
                            <label for="${inputId}">${option}</label>
                        </div>
                    `;
                } else if (q.type === 'checkbox') {
                    questionsHTML += `
                        <div class="checkbox-option">
                            <input type="checkbox" id="${inputId}" name="${inputName}" value="${option}">
                            <label for="${inputId}">${option}</label>
                        </div>
                    `;
                }
            });
            
            questionsHTML += `
                    </div>
                    <div class="error-message" id="error_${index}">Please answer this question</div>
                </div>
            `;
        });
        
        discoveryQuestions.innerHTML = questionsHTML;
        discoveryQuestions.classList.add('active');
    }
    
    // Form validation and submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitBooking();
        }
    });
    
    // Validate form
    function validateForm() {
        let isValid = true;
        const selectedCondition = conditionSelect.value;
        
        // Validate personal information
        const requiredFields = ['first-name', 'last-name', 'email', 'phone', 'age'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorMsg = field.parentElement.querySelector('.error-message');
            
            if (!field.value.trim()) {
                if (errorMsg) errorMsg.classList.add('show');
                isValid = false;
            } else {
                if (errorMsg) errorMsg.classList.remove('show');
            }
        });
        
        // Validate condition selection
        if (!selectedCondition) {
            const errorMsg = conditionSelect.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.classList.add('show');
            isValid = false;
        } else {
            const errorMsg = conditionSelect.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.classList.remove('show');
        }
        
        // Validate discovery questions
        if (selectedCondition && conditionQuestions[selectedCondition]) {
            const questions = conditionQuestions[selectedCondition];
            
            questions.forEach((q, index) => {
                const questionName = `question_${index}`;
                const questionInputs = document.getElementsByName(questionName);
                const errorMsg = document.getElementById(`error_${index}`);
                
                let questionAnswered = false;
                
                questionInputs.forEach(input => {
                    if (input.checked) {
                        questionAnswered = true;
                    }
                });
                
                if (!questionAnswered) {
                    if (errorMsg) errorMsg.classList.add('show');
                    isValid = false;
                } else {
                    if (errorMsg) errorMsg.classList.remove('show');
                }
            });
        }
        
        return isValid;
    }
    
    // Submit booking
    function submitBooking() {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Collect form data
        const formData = collectFormData();
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Send data to server or WhatsApp
            sendBookingData(formData);
            
            // Show success message
            successMessage.classList.add('show');
            bookingForm.reset();
            discoveryQuestions.classList.remove('active');
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking Request';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    }
    
    // Collect form data
    function collectFormData() {
        const formData = {
            personalInfo: {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                age: document.getElementById('age').value,
                preferredDate: document.getElementById('preferred-date').value,
                preferredTime: document.getElementById('preferred-time').value
            },
            condition: document.getElementById('condition').value,
            additionalInfo: document.getElementById('additional-info').value,
            discoveryQuestions: []
        };
        
        // Collect discovery question answers
        const selectedCondition = formData.condition;
        if (selectedCondition && conditionQuestions[selectedCondition]) {
            const questions = conditionQuestions[selectedCondition];
            
            questions.forEach((q, index) => {
                const questionName = `question_${index}`;
                const questionInputs = document.getElementsByName(questionName);
                const answers = [];
                
                questionInputs.forEach(input => {
                    if (input.checked) {
                        answers.push(input.value);
                    }
                });
                
                formData.discoveryQuestions.push({
                    question: q.question,
                    answers: answers
                });
            });
        }
        
        return formData;
    }
    
    // Send booking data (to WhatsApp or server)
    function sendBookingData(data) {
        // Format booking information for WhatsApp
        let message = `*New Booking Request - SK Physio Care*\n\n`;
        message += `*Personal Information:*\n`;
        message += `Name: ${data.personalInfo.firstName} ${data.personalInfo.lastName}\n`;
        message += `Email: ${data.personalInfo.email}\n`;
        message += `Phone: ${data.personalInfo.phone}\n`;
        message += `Age: ${data.personalInfo.age}\n`;
        message += `Preferred Date: ${data.personalInfo.preferredDate}\n`;
        message += `Preferred Time: ${data.personalInfo.preferredTime}\n\n`;
        
        message += `*Condition:*\n${getConditionName(data.condition)}\n\n`;
        
        message += `*Discovery Questions:*\n`;
        data.discoveryQuestions.forEach((q, index) => {
            message += `${index + 1}. ${q.question}\n`;
            message += `   Answer: ${q.answers.join(', ')}\n\n`;
        });
        
        if (data.additionalInfo) {
            message += `*Additional Information:*\n${data.additionalInfo}\n\n`;
        }
        
        message += `*Submission Time:*\n${new Date().toLocaleString()}`;
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/27727868683?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        console.log('Booking data:', data);
    }
    
    // Get condition display name
    function getConditionName(condition) {
        const conditionNames = {
            'arthritic-chronic-pain': 'Arthritic & Chronic Pain',
            'back-neck-pain': 'Back & Neck Pain',
            'sports-injuries': 'Sports Injuries',
            'pelvic-floor-dysfunction': 'Pelvic Floor Dysfunction',
            'orthopaedic-conditions': 'Orthopaedic Conditions',
            'respiratory-conditions': 'Respiratory Conditions',
            'neurological-conditions': 'Neurological Conditions',
            'joint-dysfunctions': 'Joint Related Dysfunctions',
            'headaches-treatment': 'Headaches Treatment'
        };
        
        return conditionNames[condition] || condition;
    }
    
    // Remove error messages on input
    const inputs = bookingForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.classList.remove('show');
            }
        });
    });
});
