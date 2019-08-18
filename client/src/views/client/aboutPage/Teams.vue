<template>
    <div class="container">
        <section id="team" class="section team-section pb-4 wow fadeIn" data-wow-delay="0.3s">
                <h2 class="font-weight-bold text-center h1 my-5">Our amazing staff</h2>
                <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
                <div class="row mb-lg-4 text-center text-md-left">
                    <div class="col-lg-6 col-md-12 mb-4" v-for="member in teams" :key="member">
                        <div class="col-md-6 float-left">
                            <div class="avatar mx-auto mb-md-0 mb-3">
                                <img :src="$store.state.server_address + '/api/containers/posts/download/' + member.img" class="z-depth-1 member-img" alt="Second sample avatar image">
                            </div>
                        </div>
                        <div class="col-md-6 float-right">
                            <h4><strong>{{member.full_name}}</strong></h4>
                           <h6 class="font-weight-bold grey-text mb-4">{{member.position}}</h6>
                            <p class="grey-text">{{member.description}}</p>
                        </div>
                    </div>
                </div>
            </section>
    </div>
</template>
<script>
import axios from 'axios' 
export default {
  name: 'HomePage',
  components: {
    
  },
  data() {
    return {
      teams: []
    }
  },
  beforeMount() {
    this.initialize()
  },
  mounted() {
    
  },
  methods: {
    initialize(){
      axios.get(this.$store.state.server_address + '/api/teams')
      .then(res => {
        this.teams = res.data
      })
    }
  },
  
}
</script>
<style scoped>
    .member-img{
        height: 250px;
        width: 250px;
        border-radius: 2px;
    }
    .cancel-modal-header{
        background-color: red;
        padding-left: 35%
    }
</style>
