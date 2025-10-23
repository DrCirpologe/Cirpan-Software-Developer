// Google Reviews Management
class GoogleReviews {
  constructor() {
    this.apiKey = 'YOUR_GOOGLE_API_KEY'; // Muss noch erstellt werden
    this.placeId = 'YOUR_GOOGLE_PLACE_ID'; // Nach Google My Business Setup
    this.init();
  }
  
  init() {
    // Animate reviews on scroll
    this.animateReviews();
    
    // Load real Google reviews (optional)
    // this.loadGoogleReviews();
  }
  
  animateReviews() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
        }
      });
    }, observerOptions);
    
    reviewCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
  
  // Optional: Load real Google reviews via API
  async loadGoogleReviews() {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=reviews,rating,user_ratings_total&key=${this.apiKey}`
      );
      
      const data = await response.json();
      
      if (data.result && data.result.reviews) {
        this.displayReviews(data.result.reviews);
      }
    } catch (error) {
      console.log('Reviews laden nicht möglich:', error);
      // Fallback: Zeige statische Reviews
    }
  }
  
  displayReviews(reviews) {
    const reviewsGrid = document.querySelector('.reviews-grid');
    
    // Clear existing reviews
    reviewsGrid.innerHTML = '';
    
    // Display first 3 reviews
    reviews.slice(0, 3).forEach(review => {
      const reviewCard = this.createReviewCard(review);
      reviewsGrid.appendChild(reviewCard);
    });
  }
  
  createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    card.innerHTML = `
      <div class="review-stars">
        ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
      </div>
      <p class="review-text">${review.text}</p>
      <div class="review-author">
        <strong>${review.author_name}</strong>
        <span>${new Date(review.time * 1000).toLocaleDateString('de-DE')}</span>
      </div>
    `;
    
    return card;
  }
  
  // Generate review request link
  static getReviewLink(placeId) {
    return `https://search.google.com/local/writereview?placeid=${placeId}`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GoogleReviews();
});

// Export for potential use
window.GoogleReviews = GoogleReviews;