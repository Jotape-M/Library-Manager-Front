<template>
    <v-card rounded="0">
        <v-navigation-drawer app v-model="drawer" dark color="blue-grey">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Menu
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to" link exact @click="drawer = !drawer">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="blue-grey darken-3" rounded="0" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>WDA Library</v-toolbar-title>
        </v-app-bar>
    </v-card>
</template>

<script>
export default {
    name: 'app-navigation',

    data: () => ({
        drawer: false,
        items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
            { title: 'Editora', icon: 'mdi-office-building', to: '/editoras' },
            { title: 'Livro', icon: 'mdi-book-multiple', to: '/livros' },
            { title: 'Usuário', icon: 'mdi-account-multiple', to: '/usuarios' },
            { title: 'Aluguel', icon: 'mdi-calendar-multiple', to: '' },
        ],
    }),
};
</script>

<style scoped></style>
