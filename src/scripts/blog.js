// Sample blog post data (in a real app, this would come from an API)
const blogPosts = [
    {
        title: "Getting Started with JavaScript ES6+ Features",
        excerpt: "Learn about the most important features introduced in modern JavaScript and how to use them effectively.",
        category: "Tutorial",
        image: "../assets/images/blog/post-1.jpg",
        date: "June 8, 2023",
        readTime: "10 min read",
        tags: ["JavaScript", "ES6", "Programming"]
    },
    {
        title: "CSS Grid vs Flexbox: When to Use Which?",
        excerpt: "A comprehensive guide to understanding the differences between CSS Grid and Flexbox and choosing the right layout system.",
        category: "Tutorial",
        image: "../assets/images/blog/post-2.jpg",
        date: "June 5, 2023",
        readTime: "8 min read",
        tags: ["CSS", "Web Development"]
    },
    {
        title: "Building a RESTful API with Node.js and Express",
        excerpt: "Step-by-step tutorial on creating a robust REST API using Node.js and Express framework.",
        category: "Tutorial",
        image: "../assets/images/blog/post-3.jpg",
        date: "June 3, 2023",
        readTime: "15 min read",
        tags: ["Node.js", "API", "Backend"]
    },
    {
        title: "Introduction to TypeScript for JavaScript Developers",
        excerpt: "A beginner-friendly guide to TypeScript and how it can improve your JavaScript development workflow.",
        category: "Tutorial",
        image: "../assets/images/blog/post-4.jpg",
        date: "May 30, 2023",
        readTime: "12 min read",
        tags: ["TypeScript", "JavaScript", "Programming"]
    },
    {
        title: "5 Tips to Improve Your Code Reviews",
        excerpt: "Learn how to make your code reviews more effective and constructive for the whole team.",
        category: "Tips & Tricks",
        image: "../assets/images/blog/post-5.jpg",
        date: "May 28, 2023",
        readTime: "7 min read",
        tags: ["Career", "Teamwork", "Best Practices"]
    },
    {
        title: "The Future of Web Development: Trends to Watch",
        excerpt: "Explore the emerging technologies and methodologies that will shape the future of web development.",
        category: "Industry News",
        image: "../assets/images/blog/post-6.jpg",
        date: "May 25, 2023",
        readTime: "9 min read",
        tags: ["Web Development", "Trends", "Technology"]
    },
    {
        title: "How to Land Your First Developer Job",
        excerpt: "Practical advice for new developers looking to break into the industry and land their first job.",
        category: "Career Advice",
        image: "../assets/images/blog/post-7.jpg",
        date: "May 22, 2023",
        readTime: "11 min read",
        tags: ["Career", "Job Search", "Interview"]
    },
    {
        title: "Understanding React Hooks: A Practical Guide",
        excerpt: "A deep dive into React Hooks and how they can simplify your component logic.",
        category: "Tutorial",
        image: "../assets/images/blog/post-8.jpg",
        date: "May 20, 2023",
        readTime: "14 min read",
        tags: ["React", "JavaScript", "Web Development"]
    }
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
    animatePostsOnScroll();
});

// Setup event listeners
function setupEventListeners() {
    // Category filters
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Update UI
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            // Update state
            currentCategory = tag.textContent;
            currentPage = 1;
            
            // Reload posts
            loadPosts(true);
        });
    });
    
    // Sort dropdown
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        currentPage = 1;
        loadPosts(true);
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadPosts();
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
        } else if (currentSort === 'popular') {
            // This would typically use view counts or other metrics
            // For demo purposes, we'll just use a random sort
            return 0.5 - Math.random();
        } else if (currentSort === 'trending') {
            // Again, this would use real metrics in a production app
            return 0.5 - Math.random();
        }
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

// Animate posts on scroll for better UX
function animatePostsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    // Observe featured posts
    document.querySelectorAll('.featured-post').forEach(post => {
        observer.observe(post);
    });
    
    // Observe post cards as they're added
    const postsObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('post-card')) {
                        observer.observe(node);
                    }
                });
            }
        });
    });
    
    postsObserver.observe(postsGrid, { childList: true });
}

// Handle theme changes
document.querySelector('.theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
}); 