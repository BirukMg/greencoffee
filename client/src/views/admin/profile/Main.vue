<template>
    <div>
        <section>
            <account />
        </section>
        <section>
            <social-address />
        </section>
    </div>
</template>
<script>
import socialAddress from './SocialAddress'
import Account from './Account'
export default {
    name: 'ProfileMain',
    components: {
        socialAddress, Account
    },
    data() {
        return {
            
        }
    },
}
</script>
