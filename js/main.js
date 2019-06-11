const Home = {
    template: `
        <div>
            <h2> May the Force be with you </h2>
            <img class="centrado" src="img/logo.png" alt="Solvetic">
        </div>
    `
};

const films = {
    data: function(){
        return {
            loading: true,
            error: false,
            films: [],
            textSearch: ''
        }
    },
    created: function(){
        this.loadFilms();
    },
    methods: {
        loadFilms: function(){
            let that = this;
            axios.get('https://swapi.co/api/films/?format=json')
            .then(function (response) {
                that.loading = false;
                that.films = response.data.results;
            })
            .catch(function (error) {
                that.loading = false;
                that.error = true;
            });
        }
    },
    computed: {
         filmsFilter: function() {
               let textSearch = this.textSearch;
               return this.films.filter(
                film => film.title.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
            );
         }
      },
    template: `
        <div>
            <div v-if="loading">
                loading films...
            </div>
            <div v-else-if="error" class="alert alert-danger">
                Error! loading films.
            </div>
            <div v-else>
                <h2> Films </h2>
                <li class="nav-item">
                    <input id="input-search" type="text" class="form-control" v-model="textSearch" placeholder='Search Film...'>
                </li>
                <table class="table">
                    <thead>
                        <tr>
                            <th> Title </th>
                            <th> Episode </th>
                            <th> Release Date </th>
                            <th>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="film in filmsFilter">
                            <td> {{ film.title }} </td>
                            <td> {{ film.episode_id }} </td>
                            <td> {{ film.release_date }} </td>
                            <td>
                                <router-link :to="'/films/' + film.episode_id" > Info </router-link> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};

const Film = {
    data: function(){
        return {
            loading: true,
            error: false,
            film: null
            
        }
    },
    created: function(){
        this.loadFilm();
    },
    methods: {
        loadFilm: function(){
            let that = this;
            let ide = this.$route.params.id;
            const episodeIdRelation = {
                '4': 1,
                '5': 2,
                '6': 3,
                '1': 4,
                '2': 5,
                '3': 6,
                '7': 7
            }
            ide = episodeIdRelation[ide];
            console.log(ide);
            axios.get('https://swapi.co/api/films/' + ide )
            .then(function (response) {
                that.loading = false;
                that.film = response.data;
                
                console.log(response.data);
            })
            .catch(function (error) {
                that.loading = false;
                that.error = true;
            });
        }
    },
    template: `
        <div>
            <div v-if="loading">
                loading film...
            </div>
            <div v-else-if="error" class="alert alert-danger">
                Error! loading film.
            </div>
            <div v-else>
                <h2> {{ film.title }} </h2>
                <hr />
                <div class="row">
                    <div class="col-md-12">
                        {{ film.opening_crawl }}
                    </div>
                </div>
            </div>
        </div>
    `
};

const routes = [
    {path: '/', component: Home},
      {path: '/home', component: Home},
      {path: '/films', component: films},
      {path: '/films/:id', component: Film}
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    router: router
}).$mount('#app');
