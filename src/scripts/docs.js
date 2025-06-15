// DOM Elements
const sidebar = document.querySelector('.docs-sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
const closeSidebarBtn = document.querySelector('.close-sidebar');
const searchInput = document.querySelector('.search-input input');
const navLinks = document.querySelectorAll('.docs-nav a');
const actionBtns = document.querySelectorAll('.action-btn');

// Toggle Sidebar
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

toggleSidebarBtn?.addEventListener('click', toggleSidebar);
closeSidebarBtn?.addEventListener('click', toggleSidebar);

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        const isClickInside = sidebar?.contains(e.target) || toggleSidebarBtn?.contains(e.target);
        if (!isClickInside && sidebar?.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
});

// Search Functionality
let searchTimeout;
searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        filterNavItems(searchTerm);
    }, 300);
});

function filterNavItems(searchTerm) {
    const navGroups = document.querySelectorAll('.nav-group');
    
    navGroups.forEach(group => {
        const links = group.querySelectorAll('a');
        let hasVisibleLinks = false;
        
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm);
            link.parentElement.style.display = isVisible ? 'block' : 'none';
            if (isVisible) hasVisibleLinks = true;
        });
        
        group.style.display = hasVisibleLinks ? 'block' : 'none';
    });
}

// Active Link Tracking
function updateActiveLink() {
    const hash = window.location.hash || '#introduction';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
            scrollToSection(hash);
        }
    });
}

function scrollToSection(hash) {
    const section = document.querySelector(hash);
    if (section) {
        const offset = document.querySelector('.site-header')?.offsetHeight || 0;
        const top = section.offsetTop - offset - 20;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

window.addEventListener('hashchange', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Scroll Spy
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            const hash = `#${section.id}`;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === hash);
            });
            
            // Update URL without scrolling
            const newUrl = window.location.pathname + hash;
            window.history.replaceState(null, '', newUrl);
        }
    });
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveSection, 100);
});

// Table of Contents Generation
function generateTOC() {
    const content = document.querySelector('.content-body');
    const headings = content?.querySelectorAll('h2, h3');
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    
    if (headings?.length) {
        const title = document.createElement('h2');
        title.textContent = 'Table of Contents';
        toc.appendChild(title);
        
        const list = document.createElement('ul');
        headings.forEach(heading => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
            
            heading.id = id;
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.className = heading.tagName.toLowerCase();
            
            li.appendChild(link);
            list.appendChild(li);
        });
        
        toc.appendChild(list);
        content.insertBefore(toc, content.firstChild.nextSibling);
    }
}

document.addEventListener('DOMContentLoaded', generateTOC);

// Copy Code Blocks
document.querySelectorAll('pre code').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code';
    copyBtn.innerHTML = `
        <svg class="copy" viewBox="0 0 24 24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <svg class="check" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
    `;
    
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(block.textContent);
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    });
    
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    wrapper.appendChild(copyBtn);
});

// Feedback Buttons
actionBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent.includes('helpful')) {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Thanks for your feedback!
            `;
            btn.classList.add('submitted');
        }
    });
}); 