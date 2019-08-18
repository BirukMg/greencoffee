<template>
  <div class="container" style="margin-top: 100px">
    <h5 v-if="images.length <= 0" class="text-info font-weight-bold animated bounceIn">{{info}}</h5>
    <div class="row">
      <div class="col-lg-4 col-md-12 mb-3" v-for="(image, index) in images" :key="image" @click="showImg(image.name)">
        <img :src="$store.state.server_address + '/api/containers/gallary/download/' + image.name" class="img-fluid z-depth-1 image-list" alt="Gallery image">
      </div>
    </div>
    <mdb-modal size="fluid" :show="singleImgModal" @close="singleImgModal = false">
          <img :src="$store.state.server_address + '/api/containers/gallary/download/' + singleImgName" class="img-fluid z-depth-1 single-img" alt="Responsive image">
    </mdb-modal>
  </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
import axios from 'axios'
export default {
  name: 'Gallery',
  components: {
     mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn
  },
  data() {
    return {
        singleImgModal: false,
        images: [],
        singleImgName: '',
        loading: null,
        info: ''
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize(){
        let filter = {
          where : {
            show: true
          }
        }
        axios.get(this.$store.state.server_address + '/api/galleries?filter='+ JSON.stringify(filter),{
                onUploadProgress: uploadEvent => {
                    this.info = 'Loading...'
                }
            })
        .then(res => {
            if (res.data.length <= 0) {
              this.info = 'No image(s) to show'
            } else {
              this.images = res.data 
            }
        })
    },
    showImg(name){
      this.singleImgModal = true
      this.singleImgName = name
    }
  },
}
</script>
<style scoped>
    .post-img{
        width: 100%;
        height: 320px;
        cursor: pointer;
    }
    .top-gallary-img{
        width: 100%;
        height: 490px;
    }
    .image-list{
        height: 242px;
    }
    .icons{
        margin-left: 5px;
        cursor: pointer;
    }
    .single-img{
      height: 700px;
      cursor: pointer;
    }
</style>
