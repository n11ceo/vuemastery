var eventBus = new Vue()

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
        
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        
        <p>
            <label>Would you recommend this product?</label>
           
            <label for="Yes">
            Yes
            <input type="radio"
                   id="Yes"
                   name="recommendRadio"
                   value="Yes"
                   v-model="willRecommend">
            </label>
            
             <label for="No">
             No
             <input type="radio"
                   id="No"
                   name="recommendRadio"
                   value="No"
                   v-model="willRecommend">
             </label>      
        </p>
        
        <p>
            <input type="submit" value="Submit">
        </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            willRecommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.willRecommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    willRecommend: this.willRecommend
                };
                eventBus.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.willRecommend = null;
            } else {
                if (!this.name) this.errors.push("Name required!")
                if (!this.review) this.errors.push("Review required!")
                if (!this.rating) this.errors.push("Rating required!")
                if (!this.willRecommend) this.errors.push("Will you recommend required!")
            }
        }
    }
})

Vue.component("productDetails", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        `

})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
             <div class="product">

        <div class="product-image">
            <img v-bind:src="image" />
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>{{ sale }}</p>
            
            <shipping-details-tabs :shipping="shipping" :details="details"></shipping-details-tabs>

            <a :href="link" target="_blank" style="display:block;">Read more about socks</a>

            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @click="updateProduct(index)"
            >
            </div>

            <div v-for="size in sizes" :key="size.sizeId">
                <p>{{size.size}}</p>
            </div>

            <div>
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>

            <button v-on:click="removeFromCart"
                    v-show="inStock">
                Remove From Cart
            </button>
            </div>
            
            <product-tabs :reviews="reviews"></product-tabs>
            
            
        </div>

    </div>
        `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'Pretty socks made from wool',
            link: 'https://en.wikipedia.org/wiki/Sock',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue.jpg',
                    variantQuantity: 0
                }
            ],
            sizes: [
                {
                    sizeId: 1110,
                    size: "small"
                },
                {
                    sizeId: 1111,
                    size: "medium"
                },
                {
                    sizeId: 1112,
                    size: "large"
                }
            ],
            onSale: true,
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        removeFromCart: function () {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "2.99$"
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-tabs', {
    props: {
      reviews: {
          type: Array,
          required: true
      }
    },
    template: `<div>
        <ul>
            <span class="tabs"
                  v-for="(tab,index) in tabs"
                  :class="{activeTab: selectedTab === tab}"  
                  :key="index"
                  @click="selectedTab = tab">
                  {{ tab }}
            </span>
        </ul>
        
        <div v-show ="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>Name: {{review.name}}</p>
                    <p>Review: {{review.review}}</p>
                    <p>Rating: {{review.rating}}</p>
                    </li>
                </ul>
            </div>
            

            <product-review v-show="selectedTab === 'Make a Review'"
           ></product-review>
</div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Shipping'">
          <p>{{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
    
      </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})

Vue.component('shipping-details-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
    <ul>
       <span class="tabs"
                   v-for="(tab,index) in tabs"
                   :class="{activeTab: selectedTab === tab}"  
                   :key="index"
                   @click="selectedTab = tab">
                   {{ tab }}
      </span>
    </ul>

      <div v-show="selectedTab === 'Shipping'"><p>Shipping: {{shipping}}</p></div>

      <productDetails :details="details" v-show="selectedTab === 'Details'"></productDetails>

    </div>
    `,
    data() {
    return {
        tabs: ['Shipping', 'Details'],
        selectedTab: 'Shipping'
    }
    }
    })

const app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1)
                }
            }
        }
    }
})
