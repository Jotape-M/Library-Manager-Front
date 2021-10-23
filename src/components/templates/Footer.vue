<template>
    <v-footer padless color="blue-grey darken-3" dark>
        <v-col class="text-center" cols="12">
            {{ date.getFullYear() }} — <strong>Jotapê</strong>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            date: new Date(),
        };
    },
};
</script>
