<template>
    <div>
        <main>

        <div class="container" style="margin-top: 50px">

            <section id="team" class="section team-section pb-4 wow fadeIn" data-wow-delay="0.3s">
                <h2 class="font-weight-bold text-center h1 my-5">Who are we</h2>
                <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquamLorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquamLorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquamLorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam. <span class="p-2 m-2 fa-lg yt-ic"><i class="fa fa-pen text-warning"> </i></span></p>
            </section>

            <section id="team" class="section team-section pb-4 wow fadeIn" data-wow-delay="0.3s">
                <h2 class="font-weight-bold text-center h1 my-5">Our amazing staff</h2>
                <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
                <div class="row mb-lg-4 text-center text-md-left">
                    <div class="col-lg-6 col-md-12 mb-4" v-for="i in 6" :key="i">
                        <div class="col-md-6 float-left">
                            <div class="avatar mx-auto mb-md-0 mb-3">
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg" class="z-depth-1" alt="Second sample avatar image">
                            </div>
                        </div>
                        <div class="col-md-6 float-right">
                            <h4><strong>Maria Kate</strong></h4>
                           <h6 class="font-weight-bold grey-text mb-4">Photographer</h6>
                            <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.</p>
                            <span class="p-2 m-2 fa-lg fb-ic"><i class="fa fa-eye text-success"> </i></span>
                            <span class="p-2 m-2 fa-lg fb-ic"><i class="fa fa-eye-slash"> </i></span>
                            <span class="p-2 m-2 fa-lg yt-ic"><i class="fa fa-pen text-warning"> </i></span>
                            <span class="p-2 m-2 fa-lg ins-ic"><i class="fa fa-times text-danger"> </i></span>
                        </div>
                    </div>
                </div>
            </section>

            <hr class="my-5">
            <section id="products" class="text-center wow fadeIn" data-wow-delay="0.3s">
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-bullseye pink-text"></i>
                        <h4 class="font-weight-bold my-4">Mission</h4>
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                        <span class="p-2 m-2 fa-lg yt-ic"><i class="fa fa-pen text-warning"> </i></span>
                    </div>
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-eye cyan-text"></i>
                        <h4 class="font-weight-bold my-4">Vision</h4>
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                        <span class="p-2 m-2 fa-lg yt-ic"><i class="fa fa-pen text-warning"> </i></span>
                    </div>
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-check indigo-text"></i>
                        <h4 class="font-weight-bold my-4">Value</h4>
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                        <span class="p-2 m-2 fa-lg yt-ic"><i class="fa fa-pen text-warning"> </i></span>
                    </div>
                </div>

            </section>
            <hr class="my-5">
        </div>
    </main>
    </div>
</template>
<style scoped>
html,
        body,
        header,
        .jarallax {
          height: 700px;
        }

        @media (max-width: 740px) {
          html,
          body,
          header,
          .jarallax {
            height: 100vh;
          }
        }

        @media (min-width: 800px) and (max-width: 850px) {
          html,
          body,
          header,
          .jarallax {
            height: 100vh;
          }
        }

        @media (min-width: 560px) and (max-width: 650px) {
          header .jarallax h1 {
            margin-bottom: 1.5rem !important;
          }
          header .jarallax h5 {
            margin-bottom: 1.5rem !important;
          }
        }

        .top-nav-collapse {
            background-color: #3f51b5!important;
        }
        .navbar:not(.top-nav-collapse) {
            background: transparent!important;
        }
        @media (max-width: 768px) {
            .navbar:not(.top-nav-collapse) {
                background: #3f51b5!important;
            }
        }
        @media (min-width: 800px) and (max-width: 850px) {
            .navbar:not(.top-nav-collapse) {
                background: #3f51b5!important;
            }
        }
        h5 {
            letter-spacing: 3px;
        }
</style>
