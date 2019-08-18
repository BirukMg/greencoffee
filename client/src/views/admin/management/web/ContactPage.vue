<template>
    <div>
        <flags-dropdown  v-on:change="optionSelected" :selected="country_iso"></flags-dropdown>
        <flag :iso="country_iso" style="margin-top: 100px;"/>

        <lang-flag iso='en'/>
        <lang-flag iso='ja' squared="true"/>
        <lang-flag iso='zh' title="Some title"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            country_iso : "mm"
        }
    },
    methods: {
        optionSelected: function (data) {
            this.country_iso = data.iso
        }
    },
}
</script>
