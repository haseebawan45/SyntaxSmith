// Sample blog post data (in a real app, this would come from an API)
const blogPosts = [
    {
        title: "Getting Started with JavaScript ES6+ Features",
        excerpt: "Learn about the most important features introduced in modern JavaScript and how to use them effectively.",
        category: "Tutorial",
        image: "/assets/blog/post-1.jpg",
        date: "June 8, 2023",
        readTime: "10 min read",
        tags: ["JavaScript", "ES6", "Programming"]
    },
    {
        title: "CSS Grid vs Flexbox: When to Use Which?",
        excerpt: "A comprehensive guide to understanding the differences between CSS Grid and Flexbox and choosing the right layout system.",
        category: "Tutorial",
        image: "/assets/blog/post-2.jpg",
        date: "June 5, 2023",
        readTime: "8 min read",
        tags: ["CSS", "Web Development"]
    },
    {
        title: "Building a RESTful API with Node.js and Express",
        excerpt: "Step-by-step tutorial on creating a robust REST API using Node.js and Express framework.",
        category: "Tutorial",
        image: "/assets/blog/post-3.jpg",
        date: "June 3, 2023",
        readTime: "15 min read",
        tags: ["Node.js", "API", "Backend"]
    }
    // Add more posts as needed
];

// DOM Elements
const postsGrid = document.querySelector('.posts-grid');
const loadMoreBtn = document.querySelector('.load-more button');
const categoryTags = document.querySelectorAll('.category-tag');
const sortSelect = document.getElementById('sort-posts');

// State
let currentPage = 1;
const postsPerPage = 6;
let currentCategory = 'All';
let currentSort = 'latest';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Category filter
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Update active state
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            // Update filter
            currentCategory = tag.textContent;
            currentPage = 1;
            loadPosts(true);
        });
    });

    // Sort change
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        currentPage = 1;
        loadPosts(true);
    });

    // Load more
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadPosts(false);
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // In a real app, you would send this to your backend
        alert(`Thank you for subscribing with ${email}!`);
        e.target.reset();
    });
}

// Load posts
function loadPosts(reset = false) {
    // Filter posts
    let filteredPosts = [...blogPosts];
    if (currentCategory !== 'All') {
        filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
    }

    // Sort posts
    filteredPosts.sort((a, b) => {
        if (currentSort === 'latest') {
            return new Date(b.date) - new Date(a.date);
        }
        // Add more sorting options here
        return 0;
    });

    // Paginate
    const start = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);

    // Render posts
    if (reset) {
        postsGrid.innerHTML = '';
    }

    paginatedPosts.forEach(post => {
        postsGrid.appendChild(createPostCard(post));
    });

    // Update load more button
    loadMoreBtn.style.display = 
        start + postsPerPage >= filteredPosts.length ? 'none' : 'block';
}

// Create post card
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    
    article.innerHTML = `
        <div class="post-image" style="background-image: url('${post.image}')">
            <span class="post-category">${post.category}</span>
        </div>
        <div class="post-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="post-meta">
                <span class="post-date">${post.date}</span>
                <span class="read-time">${post.readTime}</span>
            </div>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    return article;
}

// Animate on scroll
function setupScrollAnimation() {
    const posts = document.querySelectorAll('.post-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    posts.forEach(post => {
        observer.observe(post);
    });
}

// Handle theme changes
document.querySelector('.theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
}); 