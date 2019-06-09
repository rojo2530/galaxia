
const url = 'https://swapi.co/api/films/?format=json';

const vm = new Vue({
    el:'#app',
    data: {
        textSearch: "",
        films: []
    },
    methods: {
        loadFilms() {
            axios.get(url)
                .then((response) => {
                    this.films = response.data.results;
                });
        }
    },
    mounted() {
        // When the Component is ready fetch the JSON from the Server Backend
        this.loadFilms();
    },



});