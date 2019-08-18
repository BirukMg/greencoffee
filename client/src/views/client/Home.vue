<template>
  <div class="">
    <section class="header">
      <carousel :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="1" :loop ="true" :autoplayHoverPause ="true">
        <div class="card card-image header-item" v-for="i in 10" :key="i" style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);" >
          <div class="text-white text-center d-flex align-items-center rgba-black-light py-5 px-4">
              <div style="height: 700px; padding-top: 15%">
              <h3 class="card-title pt-2"><strong>This is the card title</strong></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                  optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos.
                  Odit sed qui, dolorum!.</p>
              </div>
          </div>
        </div>
      </carousel>
    </section>
    <div class="container">
      <section id="products" class="text-center wow fadeIn" data-wow-delay="0.3s">

                <!-- Section heading -->
                <h1 class="font-weight-bold text-center h1 my-5">We create awesome products</h1>
                <!-- Section description -->
                <p class="text-center grey-text mb-5 mx-auto w-responsive lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-plane pink-text"></i>
                        <h4 class="font-weight-bold my-4">Export</h4>
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-coffee cyan-text"></i>
                        <h4 class="font-weight-bold my-4">Make</h4>
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-industry indigo-text"></i>
                        <h4 class="font-weight-bold my-4">Development</h4>
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                    </div>
                    <!-- Grid column -->

                </div>
                <!-- Grid row -->

            </section>

      <section class="section pb-3 wow fadeIn" data-wow-delay="0.3s">
        <h1 class="font-weight-bold text-center h1 my-5">Our bestsellers</h1>
        <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse
          quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
          <div class="row">
            <div class="col-4" v-for="t in 3" :key="t">
              <div class="card card-ecommerce">
                <div class="view overlay z-depth-1">
                  <img src="../../assets/new/coffe.jpg" width="411px" height="274px" class="card-img-top" alt="">
                  <a>
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>
                <div class="card-body text-center no-padding">
                  <a href="" class="text-muted">
                    <h5>Tepi</h5>
                  </a>
                  <h4 class="card-title">
                    <strong>
                      <a href="">Unwashed</a>
                    </strong>
                  </h4>
                  <p class="card-text">Neque porro quisquam est, qui dolorem ipsum quia dolor.
                  </p>
                    <hr>
                    <span class="float-left">59$
                    </span>

                </div>
              </div>
            </div>
          </div>
      </section>
      <section>
        <h1 class="font-weight-bold text-center h1 my-5">Destinations</h1>
        <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse
          quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
        <img src="../../assets/new/dest.png" width="411px" height="274px" class="card-img-top" alt="">
      </section>
      <section class="section pb-3 wow fadeIn" data-wow-delay="0.3s">
        <h1 class="font-weight-bold text-center h1 my-5">Membership</h1>
        <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse
          quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
          <!-- <div class="row"> -->
            <CarouselCard :interval="3000" height="300px" type="card" class="mem">
            <CarouselCardItem v-for="i in 6" :key="i">
                        <img src="../../assets/new/ECX-Top-logi.png" class="card-img-top tt" alt="">
            </CarouselCardItem>
        </CarouselCard>
          <!-- </div> -->
      </section>
    </div>
  </div>
</template>

<script>
import { mdbCarousel, mdbCarouselItem,mdbBtn } from 'mdbvue';
import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'
import carousel from 'vue-owl-carousel'

export default {
  name: 'CarouselPage',
  components: {
    mdbCarousel,
    mdbCarouselItem,mdbBtn,CarouselCard, CarouselCardItem,carousel
  }
};
</script>
<style>
  .header{
    width: 100%;
    margin-top: 60px;
  }
  .header-item{
    width: 100%;
    height: 700px;
    background-size: 100%;
  }
</style>
