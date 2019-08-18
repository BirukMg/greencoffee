<template>
  <section id="dashboard">
    <section class="mt-lg-5">
      <mdb-row>
        <mdb-col xl="4" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="cubes" class="info-color"/>
              <div class="data">
                <p>Total items</p>
                <h4>
                  <strong>{{info.total}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <!-- <mdb-btn block size="sm" outline="info">Clear</mdb-btn> -->
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="4" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="dollar-sign" class="primary-color"/>
              <div class="data">
                <p>Total price</p>
                <h4>
                  <strong>{{info.totalPrice}} ETB</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <!-- <mdb-btn block size="sm" outline="primary">Clear</mdb-btn> -->
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="4" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="exclamation-triangle" class="warning-color"/>
              <div class="data">
                <p>Low item</p>
                <h4>
                  <strong>{{info.lowItem}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <!-- <mdb-btn block size="sm" outline="warning">Clear</mdb-btn> -->
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
    <v-app style="background-color: #fff; padding: 30px">
    <v-toolbar flat color="white">
      <v-toolbar-title>Products</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" append-icon="search" class="mx-4"></v-text-field>
      <mdb-btn size="sm" color="primary" @click="addModal = true"><mdb-icon icon="plus" class="mr-1"/> New Product</mdb-btn>
      <span @click="settingModal = true" :class="categories.length <= 0 || areas.length <= 0 ? 'animated fadeIn infinite text-warning': 'text-info'"><mdb-icon icon="cog" class="mr-1 icons" style="font-size: 20px"/></span>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
       :search="search"
       :loading="items.length <= 0 ? loading : !loading"
    >
    <template slot="no-data">
        <tr style="visibility: hidden;" />
    </template>
      <template slot="items" slot-scope="props">
          
        <!-- <v-data-table item-key="name" class="elevation-1" loading loading-text="Loading... Please wait" v-if="items.length <= 0"></v-data-table> -->
        <td class="text-xs-left" style="width: 50px">{{items.indexOf(props.item) + 1}}</td>
        <td class="text-xs-left"  style="width: 300px">
          <img :src="$store.state.server_address + '/api/containers/posts/download/' + props.item.img" class="item-img" alt="...">
        </td>
        <td class="text-xs-left"  style="width: 300px">{{props.item.title}}</td>
        <td class="text-xs-left"  style="width: 900px">{{props.item.description  | truncate(150)}}</td>
        <td class="text-xs-left"  style="width: 300px">{{props.item.category}} ETB</td>
        <td class="text-xs-left"  style="width: 300px">{{props.item.area}}</td>
        <td class="text-xs-left"  style="width: 300px">{{props.item.price}}</td>
        <td class="text-xs-left"  style="width: 300px">{{props.item.status}}</td>
        <td class="text-xs-left layout px-0" style="margin-top: 15px">
          <span v-if="props.item.active" @click="onOffItem(props.item)"><mdb-icon icon="eye" style="color: green; margin-left: 15px" class="mr-1 icons" size="lg"/></span>
          <span v-if="!props.item.active" @click="onOffItem(props.item)"><mdb-icon icon="eye-slash" style="color: orange; margin-left: 15px" class="mr-1 icons" size="lg"/></span>
          <span@click="launchDeleteModal(props.item)"><mdb-icon icon="trash" style="color: red; margin-left: 15px" class="mr-1 icons" size="lg"/></span>
          <span@click="launcheditItemModal(props.item)"><mdb-icon icon="pen" style="color: orange; margin-left: 15px" class="mr-1 icons" size="lg"/></span>
        </td>
      </template>
    </v-data-table>

    <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
      <mdb-modal-header class="cancel-modal-header">
        <mdb-modal-title>Are you sure?</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" outline="danger" size="sm" @click="deleteItem">Yes</mdb-btn>
        <mdb-btn color="danger" size="sm" @click="deleteModal = false">No</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="lg" v-if="settingModal" @close="settingModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Settings</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-row>
            <mdb-col md="6">
                <mdb-row><h5 class="text-warning font-weight-bold float-left" v-if="categories.length <= 0" style="margin-left: 15px">Please add category</h5></mdb-row>
                <mdb-list-group v-if="categories.length > 0">
                    <mdb-list-group-item :active="true">Categories
                    </mdb-list-group-item>
                    <mdb-list-group-item v-for="(cat, index) in categories" v-bind:data="cat" v-bind:key="cat">{{cat.name}}  <span class="setting-icon" @click="removeSetting(categories, index, 'categories')"><mdb-icon icon="times" class="mr-1 text-danger" style="float:right;"/></span>
                    </mdb-list-group-item>
                </mdb-list-group>
                <input type="tetx" class="form-control" placeholder="Add category and hit enter" v-model="settingData.category" v-on:keyup.enter="setting(categories,settingData.category,'categories')"/>
            </mdb-col>
            <mdb-col md="6">
                <mdb-row><h5 class="text-warning font-weight-bold float-left" v-if="areas.length <= 0" style="margin-left: 15px">Please add area</h5></mdb-row>
                <mdb-list-group v-if="areas.length > 0">
                    <mdb-list-group-item :active="true">Areas
                    </mdb-list-group-item>
                    <mdb-list-group-item v-for="(ar, index) in areas" v-bind:data="ar" v-bind:key="ar">{{ar.name}} <span class="setting-icon" @click="removeSetting(areas, index, 'areas')"><mdb-icon icon="times" class="mr-1 text-danger" style="float:right;"/></span>
                    </mdb-list-group-item>
                </mdb-list-group>
                <input type="tetx" class="form-control" placeholder="Add area and hit enter" v-model="settingData.area" v-on:keyup.enter="setting(areas,settingData.area, 'areas')"/>
            </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <!-- <mdb-modal-footer>
        <mdb-btn outline="success" size="sm" @click="saveSettings">Save</mdb-btn>
      </mdb-modal-footer> -->
    </mdb-modal>

    <mdb-modal size="lg" v-if="addModal" @close="addModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Add</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg">
        <img :src="addImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
        <mdb-row style="padding-left: 45%"><h5 :class="addmsg.styles" v-if="addmsg.show">{{addmsg.title}}</h5></mdb-row>
        <div class="container">
          <h5 :class="addItemmsg.styles">{{addItemmsg.title}}</h5>
          <mdb-row>
          <mdb-col md="6">
            <mdb-input type="text" label="Title" v-model="postData.title"/>
            <mdb-textarea label="Description" :rows="3" v-model="postData.description"/>
             <v-select :items="postCategory" label="Select category" v-model="postData.category"></v-select>
             <v-select :items="postArea" label="Select area" v-model="postData.area"></v-select>
          </mdb-col>
          <mdb-col md="6">
            <div class="row">
              <mdb-input type="number" label="Price" v-model="postData.price"/>
              <!-- <v-select :items="['Birr','$']" label="Currency" v-model="currency" style="width: 20px; margin-top: 10px"></v-select> -->
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="select1" v-model="postData.show_home">
                <label class="custom-control-label" for="select1">Select as bestsells</label>
            </div>
            <mdb-btn-group>
                <mdb-btn color="primary" @click="toggleWash" :active="washed">Washed</mdb-btn>
                <mdb-btn color="primary" @click="toggleWash" :active="!washed">Unwashed</mdb-btn>
            </mdb-btn-group>
          </mdb-col>
        </mdb-row>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn outline="success" size="sm" @click="addPost">Save</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="lg" v-if="editModal" @close="editModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Edit</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <input type="file" style="display: none" @change="onEditImg" ref="pickEditImg">
        <img :src="editImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickEditImg.click()">
        <mdb-row style="padding-left: 45%"><h5 :class="editmsg.styles" v-if="editmsg.show">{{editmsg.title}}</h5></mdb-row>
        <div class="container">
          <!-- <h5 :class="addItemmsg.styles">{{addItemmsg.title}}</h5> -->
          <mdb-row>
          <mdb-col md="6">
            <mdb-input type="text" label="Title" v-model="editData.title"/>
            <mdb-textarea label="Description" :rows="3" v-model="editData.description"/>
             <v-select :items="postCategory" label="Select category" v-model="editData.category"></v-select>
             <v-select :items="postArea" label="Select area" v-model="editData.area"></v-select>
          </mdb-col>
          <mdb-col md="6">
            <div class="row">
              <mdb-input type="number" label="Price" v-model="editData.price"/>
              <!-- <v-select :items="['Birr','$']" label="Currency" v-model="currency" style="width: 20px; margin-top: 10px"></v-select> -->
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="select1" v-model="editData.show_home">
                <label class="custom-control-label" for="select1">Select as bestsells</label>
            </div>
            <mdb-btn-group>
                <mdb-btn color="primary" @click="toggleWashEdit" :active="editData.status == 'washed'">Washed</mdb-btn>
                <mdb-btn color="primary" @click="toggleWashEdit" :active="editData.status == 'unwashed'">Unwashed</mdb-btn>
            </mdb-btn-group>
          </mdb-col>
        </mdb-row>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn outline="success" size="sm" @click="editPost">Save</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </v-app>
  </section>
</template>

<script>
import axios from 'axios'
import { mdbBtnGroup,mdbView,mdbMask,mdbRow,mdbProgress, mdbCol, mdbBtn, mdbCard, mdbCardBody, mdbCardHeader, mdbCardText, mdbIcon, mdbTbl, mdbBarChart, mdbPieChart, mdbLineChart, mdbRadarChart, mdbDoughnutChart, mdbListGroup, mdbListGroupItem, mdbBadge, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbInput, mdbTextarea} from 'mdbvue'

export default {
  name: 'Dashboard',
  components: {
    mdbRow,mdbProgress,mdbView,mdbMask,mdbBtnGroup,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardText,
    mdbIcon,
    mdbTbl,
    mdbBarChart,
    mdbPieChart,
    mdbLineChart,
    mdbRadarChart,
    mdbDoughnutChart,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    mdbTextarea
  },
  data: () => ({
        settingModal: false,
        loading: true,
        categories: [],
        areas: [],
        settingData: {
            category:'',
            area: ''
        },
         search: '',
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
        placeholder: require('../../../../assets/placeholder.jpg'),
        postCategory: [],
        postArea: [],
        postData: {
          title: '',
          description: '',
          category: '',
          area: '',
          price: null,
          show_home: false,
          status: 'washed',
          img: ''
        },
        currency: 'Birr',
        washed: true,
        washedEdit: true,
         storage_url: 'http://localhost:3000/api/containers/uploads/download/',
         deleteId: '',
         info: {
           total:0,
           totalPrice: 0,
           lowItem: 0
         },
         spId:'',
          passed: false,
         addItemmsg:{
            title: '',
            styles: ''
        },
        //  categories:[],
        //  measurement:["Litter","Killo","Number"],
         addmsg:{
            title:'',
            styles: ''
        },
        editmsg:{
          title: '',
          styles: '',
          show: false
        },
        editImgMsg:{
          title: '',
          styles: '',
          show: false
        },
        addData: {
            name: '',
            category: '',
            price: '',
            // measurement: '',
            quantity: '',
            description: 'hello',
        },
        imgUrl:[],
        editData: {},
        editImgPreview:[],
        editedImg: [],
        editedImgName:[],
        itemCategory: ["Fast Food","Lunch","Tradition"],
        orderDetailModal: false,
        deleteModal:false,
        editModal : false,
        addModal: false,
        headers: [
        {text: 'Item #',align: 'left',value: 'item_no'},
        { text: 'Image',align: 'left', value: 'image'},
        { text: 'Title',align: 'left', value: 'title'},
        { text: 'Description',align: 'left', value: 'description'},
        { text: 'Category',align: 'left', value: 'category'},
        { text: 'Area',align: 'left', value: 'Area'},
        { text: 'Price',  align: 'left',value: 'price' },
        { text: 'Status',  align: 'left',value: 'status' },
        { text: 'Action',  align: 'left',value: 'action' },
      ],
      items:[],
      
    }),
     mounted () {
       this.initializeCategory()
       this.initializeArea()
       this.mainInitialize()
    //    this.countTotalPrice()
    //    this.countLowItem()
      //  this.items.imgUrl[0]
    },
    methods: {
        setting(arr,val,model){
            if (val == '') {
                
            } else {
                axios.post(this.$store.state.server_address + '/api/' + model, {
                  name: val
                }).then(res => {
                  if (model == 'categories') {
                    this.initializeCategory()
                  }else if (model == 'areas') {
                    this.initializeArea()
                  }
                })
            }
        },
        removeSetting(arry,index,model){
            axios.delete(this.$store.state.server_address + '/api/' + model + '/' + arry[index].id)
            .then(res => {
              if (model == 'categories') {
                this.initializeCategory()
              }else if (model == 'areas') {
                this.initializeArea()
              }
            }).catch(err => alert(err.message))
        },
        saveSettings(){
          this.categories.forEach(element => {
            axios.post(this.$store.state.server_address + '/api/categories/replaceOrCreate',element)
          });
          this.areas.forEach(element => {
            axios.post(this.$store.state.server_address + '/api/areas/replaceOrCreate',element)
          });
        },
        mainInitialize(){
          axios.get(this.$store.state.server_address + '/api/products')
          .then(res => {
            this.items = res.data
          })
        },
      initializeCategory(){
        axios.get(this.$store.state.server_address + '/api/categories')
        .then(res => {
          this.categories = res.data
          for (let index = 0; index < res.data.length; index++) {
            this.postCategory.push(res.data[index].name)
          }
        })
      },
      initializeArea(){
        axios.get(this.$store.state.server_address + '/api/areas')
        .then(res => {
          this.areas = res.data
          for (let index = 0; index < res.data.length; index++) {
            this.postArea.push(res.data[index].name)
          }
        })
      },
      toggleWash(){
        this.washed = !this.washed
        if (this.washed) {
          this.postData.status = 'washed'
        } else {
          this.postData.status = 'unwashed'
        }
      },
      toggleWashEdit(){
        this.washedEdit = !this.washedEdit
        if (this.washedEdit) {
          this.editData.status = 'washed'
        } else {
          this.editData.status = 'unwashed'
        }
      },
      addPost(){
        if (this.postData.title == '') {
          this.addItemmsg.show = true
          this.addItemmsg.title = "Title is empty"
          this.addItemmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.postData.description == '') {
          this.addItemmsg.show = true
          this.addItemmsg.title = "Description is empty"
          this.addItemmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.postData.category == '') {
          this.addItemmsg.show = true
          this.addItemmsg.title = "Please select category"
          this.addItemmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.postData.area == '') {
          this.addItemmsg.show = true
          this.addItemmsg.title = "Please select area"
          this.addItemmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.postData.price == null) {
          this.addItemmsg.show = true
          this.addItemmsg.title = "Price is empty"
          this.addItemmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          if (this.addImgData.selectedImg == null) {
            this.postData.img = 'placeholder.jpg'
            axios.post(this.$store.state.server_address +'/api/products',this.postData,{
              onUploadProgress: uploadEvent => {
                this.addItemmsg.show = true
                this.addItemmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.addItemmsg.styles = "text-success font-weight-bold"
              }
            }).then(res => {
              this.addItemmsg.show = true
              this.addItemmsg.title = "New product added"
              this.addItemmsg.styles = "text-success font-weight-bold"
              this.mainInitialize()
            })
            
          } else {
            let formData = new FormData()
            formData.append('file',this.addImgData.selectedImg)
            axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
              onUploadProgress: uploadEvent => {
                this.addItemmsg.show = true
                this.addItemmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.addItemmsg.styles = "text-success font-weight-bold"
              }
            }).then(res => {
              this.postData.img = res.data.result.files.file[0].name
              axios.post(this.$store.state.server_address +'/api/products',this.postData,{
                onUploadProgress: uploadEvent => {
                  this.addItemmsg.show = true
                  this.addItemmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                  this.addItemmsg.styles = "text-success font-weight-bold"
                }
              }).then(res => {
                this.addItemmsg.show = true
                this.addItemmsg.title = "New product added"
                this.addItemmsg.styles = "text-success font-weight-bold"
                this.mainInitialize()
              })
            })
          }
        }
      },
      editPost(){
        if (this.editData.title == '') {
          this.editmsg.show = true
          this.editmsg.title = "Title is empty"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.description == '') {
          this.editmsg.show = true
          this.editmsg.title = "Description is empty"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.category == '') {
          this.editmsg.show = true
          this.editmsg.title = "Please select category"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.area == '') {
          this.editmsg.show = true
          this.editmsg.title = "Please select area"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.price == null) {
          this.editmsg.show = true
          this.editmsg.title = "Price is empty"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          if (this.editImgData.selectedImg == null) {
            axios.patch(this.$store.state.server_address +'/api/products/' + this.editData.id,this.editData,{
              onUploadProgress: uploadEvent => {
                this.editmsg.show = true
                this.editmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.editmsg.styles = "text-success font-weight-bold"
              }
            }).then(res => {
              this.editmsg.show = true
              this.editmsg.title = "New product added"
              this.editmsg.styles = "text-success font-weight-bold"
              this.mainInitialize()
              this.editModal = false
            })
            
          } else {
            let formData = new FormData()
            formData.append('file',this.editImgData.selectedImg)
            axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
              onUploadProgress: uploadEvent => {
                this.editmsg.show = true
                this.editmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.editmsg.styles = "text-success font-weight-bold"
              }
            }).then(res => {
              this.editData.img = res.data.result.files.file[0].name
              axios.patch(this.$store.state.server_address +'/api/products/' + this.editData.id,this.editData,{
                onUploadProgress: uploadEvent => {
                  this.editmsg.show = true
                  this.editmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                  this.editmsg.styles = "text-success font-weight-bold"
                }
              }).then(res => {
                this.editmsg.show = true
                this.editmsg.title = "New product added"
                this.editmsg.styles = "text-success font-weight-bold"
                this.mainInitialize()
                this.editModal = false
              })
            })
          }
        }
      },
      launchDeleteModal(item){
        this.deleteId = item.id
        this.deleteModal = true
      },
       launcheditItemModal(item){
        this.editmsg.show = false
        this.editImgData.ImgPreview = this.$store.state.server_address + '/api/containers/posts/download/' + item.img
        this.editModal = true
        this.editData =  Object.assign({}, item)
      },
      onOffItem(item){
          axios.patch(this.$store.state.server_address +'/api/products/'+item.id,{active: !item.active})
          .then(res => {
            this.mainInitialize()
          }).catch(err => console.log(err))
      },
      deleteItem(){
        axios.delete(this.$store.state.server_address +'/api/products/'+ this.deleteId)
        .then(res => {
          this.mainInitialize()
          this.deleteModal = false
        })
      },
      editItem(){
        if (this.editedImg.length <= 0 && this.editData.imgUrl.length <= 0 && this.editImgPreview.length <= 0) {
          this.editmsg.show = true
          this.editmsg.title = "Please add at least one image"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.checkEmpty(this.editData,this.editmsg)
          if (this.passed) {
            let formData = new FormData();
            if (this.editedImg.length <= 0) {
              for (let index = 0; index < this.editData.imgUrl.length; index++) {
                this.editData.imgUrl[index] = this.editData.imgUrl[index].substring(this.storage_url.length, this.editData.imgUrl[index].length)
              }
              axios.patch('http://'+ this.$store.state.server_ip +':3000/api/inventories/'+this.editData.id,this.editData,{
                onUploadProgress: uploadEvent => {
                  this.editmsg.show = true
                  this.editmsg.title = "Updating..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                  this.editmsg.styles = "text-success font-weight-bold"
                }
              })
              .then(res => {
                this.initialize()
                this.countTotalPrice()
                this.countLowItem()
                this.editmsg.show = true
                this.editmsg.title = "Item updated successfully"
                this.editmsg.styles = "text-success font-weight-bold animated bounceIn"
                this.editModal = false
              })
            }else{
              for (let index = 0; index < this.editedImg.length; index++) {
                formData.append('file',this.editedImg[index]) 
              }
              for (let index = 0; index < this.editData.imgUrl.length; index++) {
                this.editData.imgUrl[index] = this.editData.imgUrl[index].substring(this.storage_url.length, this.editData.imgUrl[index].length)
              }
              axios.post('http://'+ this.$store.state.server_ip +':3000/api/containers/uploads/upload',formData,{
                    onUploadProgress: uploadEvent => {
                      this.editmsg.show = true
                      this.editmsg.title = "Updating..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                      this.editmsg.styles = "text-success font-weight-bold"
                    }
                  }).then(res => {
                    console.log(res)
                    for (let index = 0; index < res.data.result.files.file.length; index++) {
                      this.editData.imgUrl.push(res.data.result.files.file[index].name)
                    }
                    axios.patch('http://'+ this.$store.state.server_ip +':3000/api/inventories/'+this.editData.id,this.editData)
                    .then(res => {
                      this.initialize()
                      this.countTotalPrice()
                      this.countLowItem()
                      this.editedImg = []
                      this.editImgPreview = [] 
                      this.editmsg.show = true
                      this.editmsg.title = "Item updated successfully"
                      this.editmsg.styles = "text-success font-weight-bold animated bounceIn"
                      this.editModal = false
                    })
                  }).catch(err => console.log(err))
            }
          }
        }
      },
      addItem(){
          if (this.addImgData.selectedImg.length <= 0){
            this.addItemmsg.show = true
            this.addItemmsg.title = "Please add at least one image"
            this.addItemmsg.styles = "text-danger font-weight-bold animated bounceIn"
          }else{
            // this.checkEmpty(this.addData,this.addItemmsg)
            if (true){
              let formData = new FormData()
              for (let index = 0; index < this.addImgData.selectedImg.length; index++) {
                formData.append('file',this.addImgData.selectedImg[index])
              }
              axios.post(this.$store.state.server_address +'/api/containers/gallary/upload',formData,{
                onUploadProgress: uploadEvent => {
                  this.addItemmsg.show = true
                  this.addItemmsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                  this.addItemmsg.styles = "text-success font-weight-bold"
                }
              }).then(res => {
                for (let index = 0; index < res.data.result.files.file.length; index++) {
                  this.imgUrl.push(res.data.result.files.file[index].name)
                }
                this.addData.imgUrl = this.imgUrl
                axios.post('http://'+ this.$store.state.server_ip +':3000/api/service_providers/'+ this.spId +'/inventories', this.addData)
                .then(res => {
                  this.addItemmsg.show = true
                  this.addItemmsg.title = "Item added successfully"
                  this.addItemmsg.styles = "text-success font-weight-bold animated bounceIn"
                  this.initialize()
                  this.countTotalPrice()
                  this.countLowItem()
                })
              }).catch(err => console.log(err))
            }
          }
      },
      onAddImg(e){
        
        if (!this.isFileImage(e.target.files[0])) {
          this.addmsg.show = true
          this.addmsg.title = "Invalid image"
          this.addmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.addmsg.show = true
          this.addmsg.title = e.target.files[0].name
          this.addmsg.styles = "text-success font-weight-bold animated bounceIn"
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
          this.editmsg.show = true
          this.editmsg.title = "Invalid image"
          this.editmsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.editmsg.show = true
          this.editmsg.title = e.target.files[0].name
          this.editmsg.styles = "text-success font-weight-bold animated bounceIn"
          this.editImgData.selectedImg = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.editImgData.ImgPreview = event.target.result
          }
        }
      },
      uploadAddImg(){
            let formData = new FormData();
            // formData.append('file',this.addImgData.selectedImg)
            for (let index = 0; index < this.addImgData.selectedImg.length; index++) {
              formData.append('file',this.addImgData.selectedImg[index])
            }
            let headers = {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
            axios.post('http://'+ this.$store.state.server_ip +':3000/api/containers/uploads/upload',formData,{
              onUploadProgress: uploadEvent => {
                this.addmsg.show = true
                this.addmsg.title = "Uploading..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.addmsg.styles = "text-success font-weight-bold"
              }
            }).then(res => {
              console.log(res)
              for (let index = 0; index < res.data.result.files.file.length; index++) {
                this.imgUrl.push(res.data.result.files.file[index].name)
              }
              this.addmsg.show = true
              this.addmsg.title = "Uploaded"
              this.addmsg.styles = "text-success font-weight-bold animated bounceIn"
            }).catch(err => console.log(err))

      },
       removeImg(index){
        this.addImgData.selectedImg.splice(this.addImgData.selectedImg.indexOf(index),1)
        this.addImgData.preview.splice(this.addImgData.preview.indexOf(index),1)
        console.log("hello");
      },
      removeEditImg(index){
        this.editImgMsg.show= false
        this.editedImg.splice(this.editedImg.indexOf(index),1)
        this.editImgPreview.splice(this.editImgPreview.indexOf(index),1)
        this.editData.imgUrl.splice(this.editData.imgUrl.indexOf(index),1)
        // console.log("hello");
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      },
      checkEmpty(object,msgs){
          for (const value in object) {
              if (object.hasOwnProperty(value)) {
                  if (value == 'imgUrl') {
                    this.passed = true
                  }else if (object[value] == '') {
                      msgs.show = true
                      msgs.title = value + " is requred"
                      msgs.styles = 'text-danger font-weight-bold animated bounceIn'
                      this.passed = false
                      break
                  }else {
                      this.passed = true
                  }
              }
          }
      },
      countTotalPrice(){
        axios.get('http://'+ this.$store.state.server_ip +':3000/api/adrash_users/'+ this.$store.state.userId +'/serviceProviders')
       .then(res => {
         axios.get('http://'+ this.$store.state.server_ip +':3000/api/service_providers/'+ res.data[0].id +'/inventories')
         .then(res => {
            this.info.totalPrice = 0
            for (let index = 0; index < res.data.length; index++) {
              this.info.totalPrice += res.data[index].price * res.data[index].quantity
            }
          })
       })
      },
      countLowItem(){
        let filterLowItem = {
          where: {
            quantity: 2
          }
        }
        axios.get('http://'+ this.$store.state.server_ip +':3000/api/adrash_users/'+ this.$store.state.userId +'/serviceProviders')
       .then(res => {
           axios.get('http://'+ this.$store.state.server_ip +':3000/api/service_providers/'+ res.data[0].id +'/inventories')
          .then(res => {
            this.info.lowItem = 0
            for (let index = 0; index < res.data.length; index++) {
              if (res.data[index].quantity <= 3) {
                this.info.lowItem += 1
              }
              if (res.data[index].quantity <= 0) {
                axios.patch('http://'+ this.$store.state.server_ip +':3000/api/inventories/'+res.data[index].id,{status: false})
                .then(res => {
                  this.initialize()
                })
              }else{
                if (res.data[index].quantity >= 1 && res.data[index].status == false) {
                  axios.patch('http://'+ this.$store.state.server_ip +':3000/api/inventories/'+res.data[index].id,{status: false})
                  .then(res => {
                    this.initialize()
                  })
                }else{
                  axios.patch('http://'+ this.$store.state.server_ip +':3000/api/inventories/'+res.data[index].id,{status: true})
                  .then(res => {
                    this.initialize()
                  })
                }
              }
            }
          })
       })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
.img-add{
  height: 200px;
  width: 200px;
  margin-top: 30px;
}
.img-add:hover{
  cursor: pointer;
}
.upload-btn{
  width: 200px
}
.add-img-btn{
  width: 100px;
}
.img-list{
  width: 300px;
  height: 100px;
  border-radius: 3px;
}
.remove-icon:hover{
  cursor: pointer;
}
.item-img{
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin: 5px 0px
}
.icons{
    margin-top: 10px;
}
.icons:hover{
    cursor: pointer;
}
.setting-icon:hover{
    cursor: pointer;
}
.setting-icon{
    float: left;
}
.post-img{
  width: 300px;
  height: 200px;
}
.post-img:hover{
  cursor: pointer;
}
</style>
