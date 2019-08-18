<template id="">
  <div class="" style="margin-top: 100px;">
    <div class="card container dark-grey-text mt-5">
      <div class="row wow fadeIn">
        <div class="col-md-6 mb-4">
          <img :src="$store.state.server_address + '/api/containers/posts/download/' + product.img" class="img-fluid" alt="">
        </div>
        <div class="col-md-6 mb-4">
          <div class="p-4">
            <div class="mb-3">
              <a href="">
                <span class="badge purple mr-1">{{product.category}}</span>
              </a>
              <a href="">
                <span class="badge blue mr-1">{{product.area}}</span>
              </a>
              <a href="">
                <span class="badge red mr-1">{{product.status}}</span>
              </a>
            </div>
            <p class="lead">
              <span>{{product.price + ' ETB'}}</span>
            </p>

            <p class="lead font-weight-bold">{{product.title}}</p>

            <p>{{product.description}}</p>
          </div>
          <!--Content-->

        </div>
        <!--Grid column-->

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  params : ['product'],
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    axios.get(this.$store.state.server_address +"/api/products/" + this.$route.params.product)
    .then(res => {
      this.product = Object.assign({}, res.data)
    })
  },
}
</script>

