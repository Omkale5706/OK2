class OKFashionAnalyzer {
  constructor() {
    this.uploadArea = document.getElementById("uploadArea")
    this.imageInput = document.getElementById("imageInput")
    this.uploadedImage = document.getElementById("uploadedImage")
    this.analyzeBtn = document.getElementById("analyzeBtn")
    this.loading = document.getElementById("loading")
    this.results = document.getElementById("results")
    this.currentImage = null
    this.mobileMenuToggle = document.getElementById("mobileMenuToggle")
    this.mobileMenu = document.getElementById("mobileMenu")

    this.initializeEventListeners()
    this.addPageAnimations()
    this.initializeMobileMenu()
  }

  initializeEventListeners() {
    // Upload area click
    this.uploadArea.addEventListener("click", () => {
      this.imageInput.click()
    })

    // File input change
    this.imageInput.addEventListener("change", (e) => {
      this.handleFileSelect(e.target.files[0])
    })

    // Drag and drop
    this.uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      this.uploadArea.classList.add("dragover")
    })

    this.uploadArea.addEventListener("dragleave", () => {
      this.uploadArea.classList.remove("dragover")
    })

    this.uploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      this.uploadArea.classList.remove("dragover")
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        this.handleFileSelect(file)
      }
    })

    // Analyze button
    this.analyzeBtn.addEventListener("click", () => {
      this.generateSuggestions()
    })
  }

  initializeMobileMenu() {
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener("click", () => {
        this.toggleMobileMenu()
      })
    }

    // Close mobile menu on link click
    document.querySelectorAll(".mobile-menu-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu()
      })
    })

    // Close mobile menu on outside click
    document.addEventListener("click", (e) => {
      if (
        this.mobileMenu &&
        this.mobileMenu.classList.contains("active") &&
        !this.mobileMenu.contains(e.target) &&
        !this.mobileMenuToggle.contains(e.target)
      ) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    if (this.mobileMenu && this.mobileMenuToggle) {
      this.mobileMenu.classList.toggle("active")
      this.mobileMenuToggle.classList.toggle("active")

      if (this.mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    }
  }

  closeMobileMenu() {
    if (this.mobileMenu && this.mobileMenuToggle) {
      this.mobileMenu.classList.remove("active")
      this.mobileMenuToggle.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  addPageAnimations() {
    setTimeout(() => {
      document.querySelector(".navbar").style.animation = "fadeIn 0.8s ease-out"
    }, 200)

    setTimeout(() => {
      document.querySelector(".header").style.animation = "fadeIn 0.8s ease-out"
    }, 400)
  }

  handleFileSelect(file) {
    if (!file || !file.type.startsWith("image/")) {
      this.showNotification("Please select a valid image file.", "error")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      this.showNotification("File size must be less than 10MB.", "error")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      this.currentImage = e.target.result
      this.uploadedImage.src = this.currentImage
      this.uploadedImage.style.display = "block"
      this.analyzeBtn.disabled = false

      // Hide upload area content and show image with animation
      this.uploadArea.style.display = "none"
      this.uploadedImage.classList.add("fade-in")

      this.showNotification("Image uploaded successfully!", "success")
    }
    reader.readAsDataURL(file)
  }

  async generateSuggestions() {
    if (!this.currentImage) return

    // Show loading state with enhanced animation
    this.analyzeBtn.disabled = true
    this.loading.style.display = "block"
    this.results.innerHTML = ""
    this.loading.classList.add("fade-in")

    // Simulate AI processing time with progress updates
    await this.simulateAIProcessing()

    // Hide loading state
    this.loading.style.display = "none"
    this.analyzeBtn.disabled = false

    // Generate and display suggestions
    const suggestions = this.getEnhancedSuggestions()
    this.displaySuggestions(suggestions)

    this.showNotification("Style analysis complete!", "success")
  }

  async simulateAIProcessing() {
    const steps = [
      "Analyzing facial features...",
      "Detecting body proportions...",
      "Identifying skin tone...",
      "Processing style preferences...",
      "Generating recommendations...",
    ]

    for (let i = 0; i < steps.length; i++) {
      document.querySelector(".loading-text").textContent = steps[i]
      await new Promise((resolve) => setTimeout(resolve, 800))
    }
  }

  getEnhancedSuggestions() {
    const suggestions = [
      {
        icon: "👔",
        title: "Professional Elegance",
        description:
          "A tailored navy blazer with crisp white shirt creates a sophisticated silhouette. The structured shoulders complement your frame while the classic color palette exudes confidence and professionalism.",
      },
      {
        icon: "👗",
        title: "Casual Sophistication",
        description:
          "A flowing midi dress in warm earth tones would beautifully enhance your natural glow. The relaxed fit offers comfort while maintaining an effortlessly polished appearance perfect for any occasion.",
      },
      {
        icon: "🧥",
        title: "Seasonal Statement",
        description:
          "A luxurious cashmere sweater in rich jewel tones paired with perfectly fitted dark jeans. This combination balances comfort with style, ideal for your body type and the current season.",
      },
      {
        icon: "👠",
        title: "Accessory Harmony",
        description:
          "Delicate gold jewelry and a structured leather handbag would frame your features beautifully. These carefully chosen accessories add sophistication without overwhelming your natural elegance.",
      },
      {
        icon: "🎨",
        title: "Perfect Color Palette",
        description:
          "Based on your unique skin undertones, deep jewel tones like emerald, sapphire, and burgundy will make you radiate confidence. These colors enhance your natural beauty and create stunning visual impact.",
      },
      {
        icon: "✨",
        title: "Signature Style",
        description:
          "For special occasions, consider a classic A-line silhouette in luxurious fabrics. This timeless cut flatters your figure while the rich textures add depth and sophistication to your overall look.",
      },
    ]

    // Return 4 random suggestions for variety
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 4)
  }

  displaySuggestions(suggestions) {
    const resultsHTML = `
                    <div class="results-grid fade-in">
                        ${suggestions
                          .map(
                            (suggestion, index) => `
                            <div class="suggestion-card" style="animation-delay: ${index * 0.1}s">
                                <div class="suggestion-icon">${suggestion.icon}</div>
                                <div class="suggestion-title">${suggestion.title}</div>
                                <div class="suggestion-description">${suggestion.description}</div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `

    this.results.innerHTML = resultsHTML
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.style.cssText = `
                    position: fixed;
                    top: 30px;
                    right: 30px;
                    background: ${
                      type === "success"
                        ? "var(--success-color)"
                        : type === "error"
                          ? "var(--error-color)"
                          : "var(--primary-gradient)"
                    };
                    color: white;
                    padding: 15px 25px;
                    border-radius: 50px;
                    font-weight: 600;
                    box-shadow: var(--shadow-medium);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                    backdrop-filter: blur(10px);
                `
    notification.textContent = message

    document.body.appendChild(notification)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease-out forwards"
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  // Method for future AI integration
  async callAIService(imageData) {
    // This is where you would integrate with your AI service
    /*
                try {
                    const response = await fetch('/api/analyze-style', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            image: imageData,
                            preferences: this.getUserPreferences()
                        })
                    });
                    
                    const data = await response.json();
                    return data.suggestions;
                } catch (error) {
                    console.error('AI service error:', error);
                    this.showNotification('Analysis failed. Please try again.', 'error');
                    throw error;
                }
                */
  }

  getUserPreferences() {
    return {
      style: "modern",
      budget: "medium",
      occasion: "everyday",
      bodyType: "auto-detect",
      colorPreferences: [],
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new OKFashionAnalyzer()
})

// Add fadeOut animation for notifications
const style = document.createElement("style")
style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100px); }
            }
        `
document.head.appendChild(style)
