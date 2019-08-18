<template>
    <div class="container" style="margin-top: 100px;">
        <div class="row" v-for="blog in blogs" :key ="blog">
            <div class="col-lg-4 mb-4">
                <div class="view z-depth-1">
                    <img :src="$store.state.server_address + '/api/containers/posts/download/' + blog.img" class="img-fluid" alt="Blog Image">
                        <a>
                            <div class="mask rgba-white-slight"></div>
                        </a>
                </div>
            </div>
            <div class="col-lg-7 mb-4">
                <h4 class="mb-4"><strong>{{blog.title}}</strong></h4>
                <p>{{blog.description}}</p>
                <p>{{blog.date}}</p>
                <a class="btn btn-primary">Read more</a>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Blog',
    components: {

    },
    data() {
        return {
            blogs: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            axios.get(this.$store.state.server_address + '/api/blogs')
            .then(res => {
                this.blogs = res.data
            })
        }
    },
}
</script>
