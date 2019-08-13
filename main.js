Vue.component('product-review', {
    template: `
        <input v-model="name" >
    `,
    data() {
        return {
            name: null
        }
    }
})

Vue.component("productDetails", {
    props: {
        details: {
            type: Array,
            required: true
        }},
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
            <p>Shipping: {{shipping}}</p>

            <productDetails :details="details"></productDetails>

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

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>

            <product-review></product-review>

            <button v-on:click="removeFromCart"
                    v-show="inStock">
                Remove From Cart
            </button>

        </div>

    </div>
        `,
    data() {
        return {product: 'Socks',
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
        onSale: true}
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
                    this.cart.splice(i,1)
                }
            }
        }
    }
})
