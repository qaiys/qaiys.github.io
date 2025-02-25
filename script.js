// Mobile navigation toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
};

// Current page highlight
const highlightCurrentPage = () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
};

// Initialize scripts
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    highlightCurrentPage();
});

// For projects page - filtering functionality
const initProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else if (card.classList.contains(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
};

// Load projects from JSON data (for easier maintenance)
const loadProjects = async () => {
    const projectsContainer = document.querySelector('#projects-container');
    
    if (projectsContainer) {
        try {
            // In a real app, you'd fetch this from a JSON file
            // For simplicity, we'll define it inline
            const projects = [
                {
                    title: "Algorithm Visualizer",
                    description: "Interactive tool to visualize sorting algorithms with adjustable speed and array size.",
                    tags: ["javascript", "algorithms", "visualization"],
                    link: "#",
                    category: "web"
                },
                {
                    title: "Math Problem Generator",
                    description: "Application that generates math problems based on difficulty level and topic.",
                    tags: ["javascript", "math", "education"],
                    link: "#",
                    category: "math"
                },
                {
                    title: "Personal Budget Tracker",
                    description: "Web app to track personal expenses and visualize spending habits.",
                    tags: ["javascript", "finance", "data-visualization"],
                    link: "#",
                    category: "web"
                },
                {
                    title: "Fractal Generator",
                    description: "Generates various fractals including Mandelbrot set and Julia sets with customizable parameters.",
                    tags: ["javascript", "math", "graphics"],
                    link: "#",
                    category: "math"
                }
            ];
            
            // Clear container
            projectsContainer.innerHTML = '';
            
            // Add projects to container
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = `project-card ${project.category}`;
                
                const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${tagsHTML}
                    </div>
                    <a href="${project.link}" class="btn small-btn">View Project</a>
                `;
                
                projectsContainer.appendChild(projectCard);
            });
            
            // Initialize filters after projects are loaded
            initProjectFilters();
            
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
        }
    }
};

// Load blog posts
const loadBlogPosts = async () => {
    const blogContainer = document.querySelector('#blog-container');
    
    if (blogContainer) {
        try {
            // In a real app, you'd fetch this from a JSON file or database
            const posts = [
                {
                    title: "My Thoughts on the Latest Advancements in AI",
                    date: "May 15, 2025",
                    summary: "Exploring how recent developments in artificial intelligence are changing the landscape of technology.",
                    link: "blog/post1.html"
                },
                {
                    title: "How I Built This Website Without Frameworks",
                    date: "April 28, 2025",
                    summary: "A detailed walkthrough of creating a personal website using only vanilla JavaScript, HTML, and CSS.",
                    link: "blog/post2.html"
                },
                {
                    title: "The Beauty of Mathematical Patterns",
                    date: "March 17, 2025",
                    summary: "Discovering patterns in nature and how they relate to mathematical concepts like the Fibonacci sequence.",
                    link: "blog/post3.html"
                },
                {
                    title: "My Summer Internship Experience",
                    date: "August 5, 2024",
                    summary: "Reflecting on what I learned during my summer internship at a tech company.",
                    link: "blog/post4.html"
                }
            ];
            
            // Clear container
            blogContainer.innerHTML = '';
            
            // Add posts to container
            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'blog-post';
                
                postItem.innerHTML = `
                    <div class="post-meta">
                        <span class="post-date">${post.date}</span>
                    </div>
                    <h3><a href="${post.link}">${post.title}</a></h3>
                    <p>${post.summary}</p>
                    <a href="${post.link}" class="read-more">Read More →</a>
                `;
                
                blogContainer.appendChild(postItem);
            });
            
        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
        }
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    highlightCurrentPage();
    loadProjects();
    loadBlogPosts();
});
