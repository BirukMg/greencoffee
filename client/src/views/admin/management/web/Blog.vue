<template>
  <div class="container">
    <mdb-btn size="sm" color="primary" @click="modal = true"><i class="fas fa-plus"></i> New Blog</mdb-btn>
    <div class="row" v-for="blog in blogs" :key ="blog">
        <div class="col-lg-4 mb-4">
            <div class="">
                <img :src="$store.state.server_address + '/api/containers/posts/download/' + blog.img" class="img-fluid rounded blog-img" alt="Blog Image">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
            </div>
        </div>
        <div class="col-lg-7 mb-4">
            <h4 class="mb-4"><strong>{{blog.title}}</strong></h4>
            <p>{{blog.description}}</p>
            <p>{{blog.date}}</p>
            <div class="form-group">
              <span v-if="blog.show" @click="onOff(blog)"><i class="fas fa-eye text-success icons"></i></span>
              <span v-if="!blog.show" @click="onOff(blog)"><i class="fas fa-eye-slash text-warning icons"></i></span>
              <span @click="launcheditItemModal(blog)"><i class="fas fa-pen text-info icons"></i></span>
              <span @click="launchDeleteModal(blog)"><i class="fas fa-times text-danger icons"></i></span>
            </div>
        </div>
    </div>

    <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>New Blog</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
            <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg">
            <img :src="addImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
            <h5 :class="addMsg.styles">{{addMsg.title}}</h5>
            <mdb-input label="Title" v-model="addData.title"/>
            <mdb-input type="textarea" label="Blog detail" :rows="5" v-model="addData.description"/>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn size="sm" outline="primary" @click="addBlog">Save</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal :show="editModal" @close="editModal = false">
        <mdb-modal-header>
          <mdb-modal-title>Edit</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="align-center">
          <input type="file" style="display: none" @change="onEditImg" ref="pickAddImg">
          <img :src="editImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
          <h5 :class="editMsg.styles">{{editMsg.title}}</h5>
          <div class="inputs">
            <mdb-input label="Title" v-model="editData.title" />
            <mdb-input type="textarea" label="Description" :rows="2" v-model="editData.description"/>
          </div>
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn size="sm"  outline="primary" @click="editBlog">Save</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>

      <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
        <mdb-modal-header class="cancel-modal-header">
          <mdb-modal-title class="white-text font-weight-bold">Are you sure?</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="text-center">
          <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="primary" outline="danger" size="sm" @click="deleteBlog">Yes</mdb-btn>
          <mdb-btn color="danger" size="sm" @click="deleteModal = false">No</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
import {mdbBtn, mdbIcon, mdbModal, mdbModalTitle, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
  name: 'Blog',
  components: {
    mdbBtn, mdbIcon, mdbModal, mdbModalTitle, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbInput
  },
  data() {
    return {
      modal: false,
      editModal: false,
      deleteModal: false,
      blogs: [],
      addData: {
        title: '',
        description: '',
        date: '',
        img: ''
      },
      addMsg: {
            show:false,
            title: '',
            styles: ''
        },
      editMsg: {
            show:false,
            title: '',
            styles: ''
        },
        addImgData: {
            selectedImg: null,
            progress: 0,
            msg:'Upload',
            ImgPreview: require('../../../../assets/placeholder.jpg'),
            show: false
        },
        editImgData: {
            selectedImg: null,
            progress: 0,
            msg:'Upload',
            ImgPreview: require('../../../../assets/placeholder.jpg'),
            show: false
        },
        editData:{},
        deleteData: {}
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize(){
      axios.get(this.$store.state.server_address + '/api/blogs')
      .then(res => {
        this.blogs = res.data
      })
    },
    addBlog(){
      if (this.addData.title == '') {
        this.addMsg.show = true
        this.addMsg.title = "Title is empty"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else if (this.addData.description == '') {
        this.addMsg.show = true
        this.addMsg.title = "Description is empty"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else {
        this.addData.date = new Date().getDate() + '-' +new Date().getMonth() + '-' + new Date().getFullYear()
        if (this.addImgData.selectedImg == null) {
          this.addData.img = 'placeholder'
          axios.post(this.$store.state.server_address + '/api/blogs',this.addData, {
            onUploadProgress: uploadEvent => {
              this.addMsg.show = true
              this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
              this.addMsg.styles = "text-success font-weight-bold"
            }
          }).then(res => {
            this.addMsg.show = true
            this.addMsg.title = "New blog added successfully"
            this.addMsg.styles = "text-success font-weight-bold"
            this.showHeader = false
            this.initialize()
          })
        }else{
          let formData = new FormData()
          formData.append('file',this.addImgData.selectedImg)
          axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
            onUploadProgress: uploadEvent => {
              this.addMsg.show = true
              this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
              this.addMsg.styles = "text-success font-weight-bold"
            }
          }).then(res => {
            this.addData.img = res.data.result.files.file[0].name
            axios.post(this.$store.state.server_address + '/api/blogs',this.addData, {
              onUploadProgress: uploadEvent => {
                this.addMsg.show = true
                this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.addMsg.styles = "text-success font-weight-bold"
              }
            }).then(res => {
              this.addMsg.show = true
              this.addMsg.title = "New blog added successfully"
              this.addMsg.styles = "text-success font-weight-bold"
              this.showHeader = false
              this.initialize()
            })
          })
        }
      }
    },
    editBlog(){
        if (this.editData.title == '') {
            this.editMsg.show = true
            this.editMsg.title = "Title is empty"
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.description == '') {
            this.editMsg.show = true
            this.editMsg.title = "Description is empty"
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
            if (this.editImgData.selectedImg != null) {
                let formData = new FormData()
                formData.append('file',this.editImgData.selectedImg)
                axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
                    onUploadProgress: uploadEvent => {
                        this.editMsg.show = true
                        this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editData.img = res.data.result.files.file[0].name
                    axios.patch(this.$store.state.server_address + '/api/blogs/' + this.editData.id,this.editData, {
                        onUploadProgress: uploadEvent => {
                        this.editMsg.show = true
                        this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editMsg.styles = "text-success font-weight-bold"
                        }
                    }).then(res => {
                        this.editMsg.show = true
                        this.editMsg.title = "Blog updated successfully"
                        this.editMsg.styles = "text-success font-weight-bold"
                        this.showHeader = false
                        this.initialize()
                    })
                })
            } else {
                axios.patch(this.$store.state.server_address + '/api/blogs/' + this.editData.id,this.editData, {
                    onUploadProgress: uploadEvent => {
                    this.editMsg.show = true
                    this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                    this.editMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editMsg.show = false
                    this.editMsg.title = "Blog updated successfully"
                    this.editMsg.styles = "text-success font-weight-bold"
                    this.showHeader = false
                    this.initialize()
                })
            }
        }
    },
    deleteBlog(){
        axios.delete(this.$store.state.server_address + '/api/blogs/' + this.deleteData.id)
        .then(res => {
            this.initialize()
            this.deleteModal = false
        })
    },
    onOff(item){
        axios.patch(this.$store.state.server_address +'/api/blogs/'+item.id,{show: !item.show})
        .then(res => {
          this.initialize()
        }).catch(err => console.log(err))
    },
    launchDeleteModal(item){
        this.deleteData.id = item.id
        this.deleteModal = true
    },
    launcheditItemModal(item){
        this.editMsg.show = false
        this.editImgData.ImgPreview = this.$store.state.server_address + '/api/containers/posts/download/' + item.img
        this.editModal = true
        this.editData =  Object.assign({}, item)
    },
    onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.addMsg.show = true
          this.addMsg.title = "Invalid image"
          this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.addMsg.show = true
          this.addMsg.title = e.target.files[0].name
          this.addMsg.styles = "text-success font-weight-bold animated bounceIn"
          this.addImgData.selectedImg = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.addImgData.ImgPreview = event.target.result
          }
        }
      },
      onEditImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.editMsg.show = true
          this.editMsg.title = "Invalid image"
          this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.editMsg.show = true
          this.editMsg.title = e.target.files[0].name
          this.editMsg.styles = "text-success font-weight-bold animated bounceIn"
          this.editImgData.selectedImg = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.editImgData.ImgPreview = event.target.result
          }
        }
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      }
  },
}
</script>
<style scoped>
  .blog-img{
    height: 200px;
    width: 100%;
  }
  .icons{
    cursor: pointer;
  }
  .cancel-modal-header{
      background-color: red;
      padding-left: 35%
  }
</style>
