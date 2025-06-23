document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resumeOutput = document.getElementById('resume-output');
    const themeSwitch = document.getElementById('theme-switch');
    
    // Event Listeners
    generateBtn.addEventListener('click', generateResume);
    downloadBtn.addEventListener('click', downloadResume);
    shareBtn.addEventListener('click', shareResume);
    resetBtn.addEventListener('click', resetForm);
    themeSwitch.addEventListener('change', toggleTheme);
    
    // Template Selection
    document.querySelectorAll('[data-template]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('[data-template].active').classList.remove('active');
            this.classList.add('active');
            resumeOutput.className = this.dataset.template;
            if (resumeOutput.innerHTML !== '<p>Your resume will appear here after you fill the form and click "Generate Resume".</p>') {
                generateResume();
            }
        });
    });
    
    // Add More Sections
    document.getElementById('add-education').addEventListener('click', () => addSection('education'));
    document.getElementById('add-experience').addEventListener('click', () => addSection('experience'));
    document.getElementById('add-project').addEventListener('click', () => addSection('project'));
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        themeSwitch.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Generate Resume Function
    function generateResume() {
        // Get all form values
        const formData = {
            personal: {
                name: document.getElementById('name').value,
                profession: document.getElementById('profession').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                linkedin: document.getElementById('linkedin').value,
                github: document.getElementById('github').value
            },
            education: {
                degree: document.getElementById('degree').value,
                university: document.getElementById('university').value,
                graduation: document.getElementById('graduation').value
            },
            experience: {
                jobTitle: document.getElementById('job-title').value,
                company: document.getElementById('company').value,
                years: document.getElementById('years').value,
                description: document.getElementById('description').value
            },
            project: {
                title: document.getElementById('project-title').value,
                description: document.getElementById('project-desc').value
            },
            skills: document.getElementById('skills').value
        };
        
        // Validate required fields
        if (!formData.personal.name || !formData.education.degree || !formData.experience.jobTitle) {
            alert('Please fill in at least Name, Degree, and Job Title fields');
            return;
        }
        
        // Generate HTML for the resume
        const resumeHTML = `
            <div class="resume">
                <header class="resume-header">
                    <h1>${formData.personal.name}</h1>
                    <p class="profession">${formData.personal.profession}</p>
                    <div class="contact-info">
                        ${formData.personal.address ? `<p><i class="fas fa-map-marker-alt"></i> ${formData.personal.address}</p>` : ''}
                        ${formData.personal.phone ? `<p><i class="fas fa-phone"></i> ${formData.personal.phone}</p>` : ''}
                        ${formData.personal.email ? `<p><i class="fas fa-envelope"></i> ${formData.personal.email}</p>` : ''}
                        ${formData.personal.linkedin ? `<p><i class="fab fa-linkedin"></i> ${formData.personal.linkedin}</p>` : ''}
                        ${formData.personal.github ? `<p><i class="fab fa-github"></i> ${formData.personal.github}</p>` : ''}
                    </div>
                </header>
                
                ${formData.education.degree ? `
                <section class="resume-section">
                    <h2><i class="fas fa-graduation-cap"></i> Education</h2>
                    <div class="education-item">
                        <h3>${formData.education.degree}</h3>
                        <p class="institution">${formData.education.university} ${formData.education.graduation ? `| ${formData.education.graduation}` : ''}</p>
                    </div>
                </section>` : ''}
                
                ${formData.experience.jobTitle ? `
                <section class="resume-section">
                    <h2><i class="fas fa-briefcase"></i> Work Experience</h2>
                    <div class="experience-item">
                        <h3>${formData.experience.jobTitle}</h3>
                        <p class="company">${formData.experience.company} ${formData.experience.years ? `| ${formData.experience.years}` : ''}</p>
                        <div class="job-description">${formatDescription(formData.experience.description)}</div>
                    </div>
                </section>` : ''}
                
                ${formData.project.title ? `
                <section class="resume-section">
                    <h2><i class="fas fa-project-diagram"></i> Projects</h2>
                    <div class="project-item">
                        <h3>${formData.project.title}</h3>
                        <div class="project-description">${formatDescription(formData.project.description)}</div>
                    </div>
                </section>` : ''}
                
                ${formData.skills ? `
                <section class="resume-section">
                    <h2><i class="fas fa-tools"></i> Skills</h2>
                    <ul class="skills-list">
                        ${formData.skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('')}
                    </ul>
                </section>` : ''}
            </div>
            
            <style>
                .resume {
                    font-family: ${resumeOutput.classList.contains('professional') ? "'Arial', sans-serif" : 
                                 resumeOutput.classList.contains('modern') ? "'Segoe UI', sans-serif" : 
                                 "'Calibri', sans-serif"};
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    color: var(--text-color);
                }
                
                .resume-header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid var(--primary-color);
                    padding-bottom: 20px;
                }
                
                .resume-header h1 {
                    margin: 0;
                    color: var(--primary-color);
                    font-size: 28px;
                }
                
                .profession {
                    margin: 5px 0;
                    font-size: 18px;
                    font-weight: 600;
                }
                
                .contact-info {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 10px;
                }
                
                .contact-info p {
                    margin: 5px 0;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .contact-info i {
                    font-size: 14px;
                }
                
                .resume-section {
                    margin-bottom: 25px;
                }
                
                .resume-section h2 {
                    color: var(--primary-color);
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 5px;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .resume-section h2 i {
                    font-size: 16px;
                }
                
                .education-item h3,
                .experience-item h3,
                .project-item h3 {
                    margin-bottom: 5px;
                    font-size: 18px;
                }
                
                .institution,
                .company {
                    margin: 5px 0;
                    color: var(--text-color);
                    opacity: 0.8;
                    font-style: italic;
                }
                
                .job-description,
                .project-description {
                    margin-top: 10px;
                }
                
                .skills-list {
                    list-style-type: none;
                    padding: 0;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .skills-list li {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 14px;
                }
                
                ${resumeOutput.classList.contains('modern') ? `
                .resume-header {
                    border-bottom: none;
                }
                .resume-section h2 {
                    border-bottom: none;
                    background-color: var(--primary-color);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 5px;
                }
                ` : ''}
                
                ${resumeOutput.classList.contains('creative') ? `
                .resume-header {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                .resume-header h1 {
                    color: white;
                }
                .resume-section {
                    background-color: var(--card-color);
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px var(--shadow-color);
                    margin-bottom: 20px;
                }
                ` : ''}
            </style>
        `;
        
        // Display the generated resume
        resumeOutput.innerHTML = resumeHTML;
        downloadBtn.disabled = false;
        shareBtn.disabled = false;
    }
    
    // Format description with paragraphs
    function formatDescription(text) {
        if (!text) return '';
        return text.split('\n').filter(para => para.trim() !== '').map(para => `<p>${para}</p>`).join('');
    }
    
    // Download Resume as PDF
    function downloadResume() {
        const resumeContent = resumeOutput.innerHTML;
        const originalContent = document.body.innerHTML;
        
        // Replace the body content with just the resume
        document.body.innerHTML = resumeContent;
        
        // Add print-specific styles
        const style = document.createElement('style');
        style.textContent = `
            @page {
                size: A4;
                margin: 1cm;
            }
            @media print {
                body {
                    margin: 0;
                    padding: 20px;
                    background: white;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                button {
                    display: none !important;
                }
                
                .resume {
                    box-shadow: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Print the resume
        window.print();
        
        // Restore the original content
        document.body.innerHTML = originalContent;
        
        // Reattach event listeners
        generateBtn.addEventListener('click', generateResume);
        downloadBtn.addEventListener('click', downloadResume);
        shareBtn.addEventListener('click', shareResume);
        resetBtn.addEventListener('click', resetForm);
        themeSwitch.addEventListener('change', toggleTheme);
    }
    
    // Share Resume
    function shareResume() {
        if (navigator.share) {
            navigator.share({
                title: 'My Resume',
                text: 'Check out my professional resume',
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const textArea = document.createElement('textarea');
            textArea.value = `Check out my resume: ${window.location.href}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Resume link copied to clipboard!');
        }
    }
    
    // Reset Form
    function resetForm() {
        if (confirm('Are you sure you want to reset all fields?')) {
            document.querySelectorAll('input, textarea').forEach(element => {
                element.value = '';
            });
            resumeOutput.innerHTML = '<p>Your resume will appear here after you fill the form and click "Generate Resume".</p>';
            downloadBtn.disabled = true;
            shareBtn.disabled = true;
        }
    }
    
    // Toggle Theme
    function toggleTheme() {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Add New Section
    function addSection(type) {
        const container = document.createElement('div');
        container.className = 'form-section';
        
        let html = '';
        switch (type) {
            case 'education':
                html = `
                    <h2><i class="fas fa-graduation-cap"></i> Additional Education</h2>
                    <div class="form-group">
                        <label>Degree:</label>
                        <input type="text" placeholder="Another Degree">
                    </div>
                    <div class="form-group">
                        <label>University:</label>
                        <input type="text" placeholder="Another University">
                    </div>
                    <div class="form-group">
                        <label>Graduation Year:</label>
                        <input type="text" placeholder="Year">
                    </div>
                `;
                break;
            case 'experience':
                html = `
                    <h2><i class="fas fa-briefcase"></i> Additional Experience</h2>
                    <div class="form-group">
                        <label>Job Title:</label>
                        <input type="text" placeholder="Another Job Title">
                    </div>
                    <div class="form-group">
                        <label>Company:</label>
                        <input type="text" placeholder="Another Company">
                    </div>
                    <div class="form-group">
                        <label>Years:</label>
                        <input type="text" placeholder="Years">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea placeholder="Job responsibilities..."></textarea>
                    </div>
                `;
                break;
            case 'project':
                html = `
                    <h2><i class="fas fa-project-diagram"></i> Additional Project</h2>
                    <div class="form-group">
                        <label>Project Title:</label>
                        <input type="text" placeholder="Another Project">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea placeholder="Project details..."></textarea>
                    </div>
                `;
                break;
        }
        
        container.innerHTML = html;
        document.querySelector('.resume-form').insertBefore(container, document.querySelector('.action-buttons'));
        container.scrollIntoView({ behavior: 'smooth' });
    }
});