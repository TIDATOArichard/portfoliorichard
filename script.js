document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      // Show/hide projects based on filter
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Form Submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = document.querySelector("header").offsetHeight

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        })
      }
    })
  })

  // Add active class to nav links based on scroll position
  function highlightNavLink() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const headerHeight = document.querySelector("header").offsetHeight

      if (window.scrollY >= sectionTop - headerHeight - 50) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  // Call the function on scroll
  window.addEventListener("scroll", highlightNavLink)

  // Call it on initial load
  highlightNavLink()

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".skill-level, .project-card, .contact-item")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate")
      }
    })
  }

  // Add animation class to CSS
  const style = document.createElement("style")
  style.innerHTML = `
    .skill-level, .project-card, .contact-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-level.animate, .project-card.animate, .contact-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .project-card:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .project-card:nth-child(3) {
      transition-delay: 0.4s;
    }
    
    .project-card:nth-child(4) {
      transition-delay: 0.6s;
    }
    
    .contact-item:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .contact-item:nth-child(3) {
      transition-delay: 0.4s;
    }
  `
  document.head.appendChild(style)

  // Call animation function on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Call it on initial load
  animateOnScroll()
  
})

