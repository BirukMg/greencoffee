<template>
    <div class="container" style="margin-top: 100px">
            <section class="section pb-5 wow fadeIn" data-wow-delay="0.3s">
            <div class="row text-center address-content">
                    <div class="md-4 text-center address-item text-primary">
                    <i class="fa fa-map-marker fa-7x"></i>
                    <p class="font-weight-bold fa-md">{{contactData[0].address}}</p>
                    </div>
                    <div class="md-4 text-center address-item text-info">
                        <i class="fa fa-phone fa-7x"></i>
                        <p class="font-weight-bold fa-md">{{contactData[0].phone_number}}</p>
                    </div>
                    <div class="md-4 text-center address-item text-default">
                        <i class="fa fa-envelope fa-7x"></i>
                        <p class="font-weight-bold fa-md">{{contactData[0].email}}</p>
                    </div>
            </div>
            </section>
            <div class="">
                <section class="section pb-5 wow fadeIn" data-wow-delay="0.3s">
                    <h2 class="font-weight-bold text-center h1 my-5">Send us</h2>
                    <h5 :class="emailMsg.styles">{{emailMsg.title}}</h5>
                    <div class="row">
                        <div class="col-6">
                            <mdb-input label="Your name" v-model="name" />
                        </div>
                        <div class="col-6">
                            <mdb-input type="email" label="Your email" v-model="emailData.from" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <mdb-input label="Subject" v-model="emailData.subject" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <mdb-input type="textarea" label="Your message" :rows="3" v-model="emailData.text"/>
                        </div>
                    </div>
                    <mdb-btn color="success" @click="sendEmail"><i class="fa fa-paper-plane"></i> Send</mdb-btn>
                </section>
                <section>
                    <gmap-map
                        :center="center"
                        :zoom="12"
                        style="width:100%;  height: 400px;"
                        >
                        <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            @click="center=m.position"
                        ></gmap-marker>
                        </gmap-map>
                </section>
            </div>
    </div>
</template>
<script>
import {mdbInput, mdbBtn, mdbGoogleMap} from 'mdbvue'
import axios from 'axios'
export default {
    components: {
        mdbInput, mdbBtn, mdbGoogleMap
    },
    data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      contactData: [],
      name: '',
      emailData: {
        from: '',
        subject: '',
        text: '',
        html: ''
      },
       emailMsg: {
          show:false,
          title: '',
          styles: ''
      }
    };
  },

  mounted() {
    this.geolocate();
    this.initialize()
  },
  methods: {
    initialize(){
      let filter = {
        fields: {email: true, address: true, phone_number: true}
      }
      axios.get(this.$store.state.server_address  + '/api/social_addresses?filter='+ JSON.stringify(filter))
      .then(res => {
        this.contactData = res.data
      })
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    sendEmail() {
        if (this.name == '') {
          this.emailMsg.show = true
          this.emailMsg.title = "Name is empty"
          this.emailMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.emailData.from == '') {
          this.emailMsg.show = true
          this.emailMsg.title = "Email is empty"
          this.emailMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (!this.validateEmail(this.emailData.from)) {
          this.emailMsg.show = true
          this.emailMsg.title = "Invalid email"
          this.emailMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.emailData.text == '') {
          this.emailMsg.show = true
          this.emailMsg.title = "Text cannot be empty"
          this.emailMsg.styles = "text-danger font-weight-bold animated bounceIn"
        } else {
          this.emailData.html = `<h3>Name: `+ this.name +`</h3>
                                <h4>Email: `+ this.emailData.from +`</h4>`
          axios.post(this.$store.state.server_address + "/api/emails",this.emailData)
          .then(res => {
            let id = res.data.id
            axios.post(this.$store.state.server_address + '/api/emails/'+res.data.id+'/sendemail',this.emailData,{
              onUploadProgress: uploadEvent => {
                  this.emailMsg.show = true
                  this.emailMsg.title = "Please wait..."
                  this.emailMsg.styles = "text-info font-weight-bold"
              }
            })
            .then(response => {
              this.emailMsg.show = true
              this.emailMsg.title = "Your email is sent, Thank you !"
              this.emailMsg.styles = "text-success font-weight-bold"
              axios.delete(this.$store.state.server_address + '/api/emails/'+ id)
              .then(res => {
                console.log(res)
              })
              console.log(response);
            }).catch(err => {
              console.log(err);
              this.emailMsg.show = true
              this.emailMsg.title = 'Something is not correct, Please try again'
              this.emailMsg.styles = "text-danger font-weight-bold"
            })
          }).catch(err => {
            console.log(err);
          })
        }
      },
      validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }
  },
}
</script>
<style scoped>
    .address-content{
        padding-left: 5%;
    }
    .address-item{
        margin-left: 15%;
    }
</style>
