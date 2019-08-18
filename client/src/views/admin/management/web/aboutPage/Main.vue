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
    </div>
</template>
<script>
import About from './About'
import Team from './Teams'
import Mvv from './MVV'
export default {
    name: 'Main',
    components: {
        About, Team, Mvv
    }
}
</script>