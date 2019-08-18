<template>
    <div>
        <section>
            <about />
        </section>
        <section>
            <team />
        </section>
        <section>
            <mvv />
        </section>
        <section>
            <membership />
        </section>
        <section>
            <certification />
        </section>
    </div>
</template>
<script>
import About from './About'
import Team from './Teams'
import Mvv from './MVV'
import Membership from './Membership'
import Certification from './Certification'
export default {
    name: 'Main',
    components: {
        About, Team, Mvv, Membership, Certification
    }
}
</script>