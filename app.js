// Load CV data and populate the page
async function loadCV() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        populateCV(data);
    } catch (error) {
        console.error('Error loading CV data:', error);
    }
}

function populateCV(data) {
    // Personal Info
    document.title = `${data.personal.name} — ${data.personal.title}`;
    document.querySelector('meta[name="description"]').content =
        `${data.personal.name} — ${data.personal.bio.replace(/<[^>]*>/g, '')}`;

    document.querySelector('.nav-logo').textContent = data.personal.name.split(' ')[0].toLowerCase();
    document.querySelector('.hero h1').innerHTML =
        `${data.personal.firstName} <span class="accent">${data.personal.lastName}</span>`;
    document.querySelector('.hero-bio').innerHTML = data.personal.bio;

    // Contact info
    const heroInfo = document.querySelector('.hero-info');
    heroInfo.innerHTML = `
        <span><span class="label">loc:</span> ${data.personal.location}</span>
        <a href="mailto:${data.personal.email}"><span class="label">mail:</span> ${data.personal.email}</a>
        <a href="${data.personal.linkedinUrl}" target="_blank"><span class="label">in:</span> /${data.personal.linkedin}</a>
    `;

    // Hero actions
    const heroActions = document.querySelector('.hero-actions');
    heroActions.innerHTML = `
        <button class="btn btn-green" id="download-cv-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            download cv
        </button>
        <a href="mailto:${data.personal.email}" class="btn btn-outline">contact</a>
    `;

    // Add download CV functionality
    document.getElementById('download-cv-btn').addEventListener('click', () => {
        window.print();
    });

    // Experience
    const expSection = document.querySelector('#experience');
    const expContainer = document.createElement('div');

    data.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'exp-item reveal';

        const achievementsList = exp.achievements.map(a => `<li>${a}</li>`).join('');
        const scopeList = exp.scope.map(s => `<li>${s}</li>`).join('');
        const tags = exp.tags.map(t => `<span class="exp-tag">${t}</span>`).join('');

        expItem.innerHTML = `
            <div class="exp-header">
                <div>
                    <div class="exp-title"><span class="exp-company">${exp.company}</span> — ${exp.role}</div>
                    <div class="exp-location">${exp.location}</div>
                </div>
                <div class="exp-period">${exp.period}</div>
            </div>
            <ul class="exp-achievements">${achievementsList}</ul>
            <div class="exp-scope-label">scope:</div>
            <ul class="exp-scope">${scopeList}</ul>
            <div class="exp-stack">${tags}</div>
        `;

        expContainer.appendChild(expItem);
    });

    expSection.appendChild(expContainer);

    // Speaking
    const speakTable = document.querySelector('.speak-table');
    data.speaking.forEach(talk => {
        const row = document.createElement('tr');
        const titleContent = talk.subtitle
            ? `${talk.title} <span>— ${talk.subtitle}</span>`
            : talk.title;

        row.innerHTML = `
            <td class="col-year">${talk.year}</td>
            <td class="col-type">${talk.type}</td>
            <td class="col-title">${titleContent}</td>
        `;
        speakTable.appendChild(row);
    });

    // Education
    const eduSection = document.querySelector('#education');
    const eduContainer = document.createElement('div');
    eduContainer.className = 'reveal';

    data.education.forEach(edu => {
        const eduBlock = document.createElement('div');
        eduBlock.className = 'edu-block';
        eduBlock.innerHTML = `
            <div class="edu-year">${edu.period}</div>
            <div>
                <div class="edu-title">${edu.degree}</div>
                <div class="edu-sub">${edu.institution}</div>
            </div>
        `;
        eduContainer.appendChild(eduBlock);
    });

    eduSection.appendChild(eduContainer);

    // Certifications
    const certSection = document.querySelector('#certs');
    const certContainer = document.createElement('div');
    certContainer.className = 'reveal';

    // Security & Risk
    const securitySection = createCertSection('Security & Risk', data.certifications.security);
    certContainer.appendChild(securitySection);

    // Privacy
    const privacySection = createCertSection('Privacy', data.certifications.privacy);
    certContainer.appendChild(privacySection);

    // Frameworks
    const frameworksSection = createCertSection('Frameworks & Vendor', data.certifications.frameworks);
    certContainer.appendChild(frameworksSection);

    certSection.appendChild(certContainer);

    // Skills
    const skillsSection = document.querySelector('#skills .extras');
    if (skillsSection && data.skills) {
        skillsSection.innerHTML = `
            <div>
                <h3>Compliance & Regulatory</h3>
                <div class="skill-tags">${data.skills.compliance.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Cloud & Infrastructure</h3>
                <div class="skill-tags">${data.skills.cloud.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Security Operations & Testing</h3>
                <div class="skill-tags">${data.skills.operations.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Governance, Risk & Compliance (GRC)</h3>
                <div class="skill-tags">${data.skills.grc.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Application & Data Security</h3>
                <div class="skill-tags">${data.skills.appsec.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Identity & Access Management</h3>
                <div class="skill-tags">${data.skills.identity.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Business Resilience</h3>
                <div class="skill-tags">${data.skills.resilience.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
            <div>
                <h3>Leadership & Communication</h3>
                <div class="skill-tags">${data.skills.leadership.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
        `;
    }

    // Languages & Memberships
    const extrasSection = document.querySelector('#extras .extras');
    if (extrasSection) {
        extrasSection.innerHTML = `
            <div>
                <h3>Languages</h3>
                <ul>
                    ${data.languages.map(l => `<li>${l.language} <span>— ${l.level}</span></li>`).join('')}
                </ul>
            </div>
            <div>
                <h3>Memberships</h3>
                <ul>${data.memberships.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
        `;
    }

    // Footer
    document.querySelector('.footer-ascii').textContent = data.footer.tagline;
    document.querySelector('.footer-links').innerHTML = `
        <a href="mailto:${data.personal.email}">email</a>
        <a href="${data.personal.linkedinUrl}" target="_blank">linkedin</a>
    `;
    document.querySelector('.footer-copy').innerHTML = `&copy; ${data.footer.copyright}`;

    // Re-observe reveal elements
    setupRevealAnimations();
}

function createCertSection(label, certs) {
    const section = document.createElement('div');
    section.className = 'cert-section';

    const certBadges = certs.map(cert => {
        if (cert.name) {
            return `<div class="cert-badge"><strong>${cert.code}</strong> ${cert.name}</div>`;
        }
        return `<div class="cert-badge"><strong>${cert.code}</strong></div>`;
    }).join('');

    section.innerHTML = `
        <div class="cert-label">${label}</div>
        <div class="cert-row">${certBadges}</div>
    `;

    return section;
}

function setupRevealAnimations() {
    const obs = new IntersectionObserver(
        es => es.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// Load CV when page loads
document.addEventListener('DOMContentLoaded', loadCV);
