
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
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        // When the Component is ready fetch the JSON from the Server Backend
        this.loadFilms();
    },

    computed: {
     filmsFilter: function() {
       var textSearch = this.textSearch;
       return this.films.filter(film => film.title.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1);
     }
  },


});