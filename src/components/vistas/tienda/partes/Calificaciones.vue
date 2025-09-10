<template>
  <div class="modern-ratings-section">
    <!-- Resumen de calificaciones -->
    <v-card class="ratings-summary-card" elevation="4">
      <v-card-title class="ratings-summary-title">
        <v-icon color="orange" class="mr-2">star</v-icon>
        Calificaciones de la Tienda
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <div class="overall-rating">
              <div class="rating-score">
                <span class="score-number">4.1</span>
                <div class="stars-container">
                  <v-rating
                    :value="4.1"
                    color="orange"
                    dense
                    half-increments
                    readonly
                    size="24">
                  </v-rating>
                </div>
                <p class="rating-text">Basado en 245,535 calificaciones</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <div class="rating-breakdown">
              <div v-for="(rating, index) in ratingBreakdown" :key="index" class="rating-bar-item">
                <span class="rating-label">{{rating.stars}} estrellas</span>
                <v-progress-linear
                  :value="rating.percentage"
                  color="orange"
                  height="8"
                  rounded
                  class="rating-progress">
                </v-progress-linear>
                <span class="rating-percentage">{{rating.percentage}}%</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Detalles de calificaciones por categoría -->
    <v-card class="rating-details-card" elevation="4">
      <v-card-title class="rating-details-title">
        <v-icon color="blue" class="mr-2">assessment</v-icon>
        Detalles por Categoría
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" v-for="category in ratingCategories" :key="category.name">
            <div class="category-rating">
              <div class="category-icon">
                <v-icon :color="category.color" size="32">{{category.icon}}</v-icon>
              </div>
              <div class="category-details">
                <h4 class="category-name">{{category.name}}</h4>
                <div class="category-score">
                  <v-rating
                    :value="category.score"
                    color="orange"
                    dense
                    half-increments
                    readonly
                    size="20">
                  </v-rating>
                  <span class="score-text">{{category.score}}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Comentarios de usuarios -->
    <v-card class="reviews-card" elevation="4">
      <v-card-title class="reviews-title">
        <v-icon color="green" class="mr-2">rate_review</v-icon>
        Comentarios de Clientes
      </v-card-title>
      <v-card-text>
        <div class="reviews-container">
          <v-card 
            v-for="(review, index) in sampleReviews" 
            :key="index"
            class="review-card"
            elevation="2">
            <v-card-text>
              <div class="review-header">
                <v-avatar size="50" class="reviewer-avatar">
                  <img :src="review.avatar" :alt="review.name">
                </v-avatar>
                <div class="reviewer-info">
                  <h4 class="reviewer-name">{{review.name}}</h4>
                  <div class="review-rating">
                    <v-rating
                      :value="review.rating"
                      color="orange"
                      dense
                      half-increments
                      readonly
                      size="16">
                    </v-rating>
                    <span class="review-date">{{review.date}}</span>
                  </div>
                </div>
              </div>
              <div class="review-content">
                <p class="review-text">{{review.comment}}</p>
                <div class="review-product" v-if="review.product">
                  <v-icon color="grey" small class="mr-1">shopping_bag</v-icon>
                  <span>Compró: <strong>{{review.product}}</strong></span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        
        <!-- Botón para ver más comentarios -->
        <div class="view-more-container">
          <v-btn 
            color="primary" 
            outlined 
            large
            class="view-more-btn">
            <v-icon left>expand_more</v-icon>
            Ver más comentarios
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "calificaciones",
    props: ['tienda'],
    computed: {
      ratingBreakdown() {
        return [
          { stars: 5, percentage: 65 },
          { stars: 4, percentage: 20 },
          { stars: 3, percentage: 10 },
          { stars: 2, percentage: 3 },
          { stars: 1, percentage: 2 }
        ];
      },
      ratingCategories() {
        return [
          {
            name: 'Asesoría',
            score: 5.0,
            icon: 'support_agent',
            color: 'blue'
          },
          {
            name: 'Tiempo de Entrega',
            score: 4.8,
            icon: 'schedule',
            color: 'green'
          },
          {
            name: 'Calidad del Producto',
            score: 4.9,
            icon: 'inventory',
            color: 'orange'
          }
        ];
      },
      sampleReviews() {
        return [
          {
            name: 'Juan Pablo Bermúdez',
            avatar: 'https://lorempixel.com/200/200/?75013',
            rating: 5,
            date: '15/12/2023',
            comment: 'Excelente servicio, el producto llegó en el tiempo y condiciones establecidas. Seguiré comprando por este medio.',
            product: 'Zapatillas Puma Special Edition'
          },
          {
            name: 'María González',
            avatar: 'https://lorempixel.com/200/200/?75014',
            rating: 5,
            date: '12/12/2023',
            comment: 'Muy buena atención al cliente y productos de calidad. Recomiendo esta tienda.',
            product: 'Camiseta Nike Dri-FIT'
          },
          {
            name: 'Carlos Rodríguez',
            avatar: 'https://lorempixel.com/200/200/?75015',
            rating: 4,
            date: '10/12/2023',
            comment: 'Buen producto, llegó un poco tarde pero en perfecto estado. La comunicación fue excelente.',
            product: 'Pantalón Adidas Originals'
          },
          {
            name: 'Ana Martínez',
            avatar: 'https://lorempixel.com/200/200/?75016',
            rating: 5,
            date: '08/12/2023',
            comment: 'Increíble experiencia de compra. Productos auténticos y envío rápido. Definitivamente volveré a comprar.',
            product: 'Zapatos Converse All Star'
          }
        ];
      }
    }
  }
</script>

<style scoped>
.modern-ratings-section {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.ratings-summary-card,
.rating-details-card,
.reviews-card {
  margin-bottom: 24px;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ratings-summary-card:hover,
.rating-details-card:hover,
.reviews-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.ratings-summary-title,
.rating-details-title,
.reviews-title {
  background: linear-gradient(135deg, #ff6633, #ff8533);
  color: white;
  font-weight: 600;
  border-radius: 12px 12px 0 0;
}

.overall-rating {
  text-align: center;
  padding: 20px;
}

.rating-score {
  margin-bottom: 16px;
}

.score-number {
  font-size: 4rem;
  font-weight: 700;
  color: #ff6633;
  display: block;
  line-height: 1;
}

.stars-container {
  margin: 12px 0;
}

.rating-text {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.rating-breakdown {
  padding: 20px 0;
}

.rating-bar-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.rating-label {
  min-width: 80px;
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

.rating-progress {
  flex: 1;
  margin: 0 8px;
}

.rating-percentage {
  min-width: 40px;
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.category-rating {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.category-rating:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.category-icon {
  margin-right: 16px;
}

.category-details {
  flex: 1;
}

.category-name {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.category-score {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-text {
  color: #ff6633;
  font-weight: 600;
  font-size: 1.1rem;
}

.reviews-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid #4CAF50;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.reviewer-avatar {
  margin-right: 16px;
  border: 2px solid #e0e0e0;
}

.reviewer-info {
  flex: 1;
}

.reviewer-name {
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.review-date {
  color: #666;
  font-size: 0.85rem;
}

.review-content {
  margin-top: 12px;
}

.review-text {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.review-product {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
}

.view-more-container {
  text-align: center;
  margin-top: 24px;
}

.view-more-btn {
  border-radius: 25px;
  text-transform: none;
  font-weight: 500;
  padding: 0 32px;
}

/* Responsive design */
@media (max-width: 768px) {
  .modern-ratings-section {
    padding: 10px;
  }
  
  .overall-rating {
    padding: 16px;
  }
  
  .score-number {
    font-size: 3rem;
  }
  
  .rating-bar-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .rating-label,
  .rating-percentage {
    text-align: center;
  }
  
  .category-rating {
    flex-direction: column;
    text-align: center;
    padding: 16px;
  }
  
  .category-icon {
    margin-right: 0;
    margin-bottom: 12px;
  }
  
  .review-header {
    flex-direction: column;
    text-align: center;
  }
  
  .reviewer-avatar {
    margin-right: 0;
    margin-bottom: 12px;
  }
  
  .review-rating {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .score-number {
    font-size: 2.5rem;
  }
  
  .category-rating {
    padding: 12px;
  }
  
  .review-card {
    margin: 0 -10px;
  }
}
</style>