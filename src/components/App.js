import React, { Component } from "react";
import InputField from "./InputField";
import SelectField from './SelectField';
import List from "./List";

class App extends Component {
  /* State will hold all movies fetched, genre to filter by for the
   * select input and a filtered list of movies */
  state = {
    allMovies: [],
    moviesByGenre: [],
    selectedGenre: '',
    searchTerm: ''
  };

  componentDidMount() {
     fetch(`https://javascriptst18.herokuapp.com/trending?_limit=20`)
       .then(response => response.json())
       .then(jsonResponse => {
         this.setState({ allMovies: jsonResponse });
       });
    }

  filterByGenre = (event) => {
    /* Function bound to the select-field. e.target.value is based on 
     * <option value=""/>. e.target.value === genre to filter by */
    const moviesByGenre = this.state.allMovies.filter((movie) => {
      /* movie.genres is an array so we have to use includes for example
       * if the array contains our value, return the whole object. moviesByGenre
       * will contain all movies where this statement is true */
      return movie.genres.includes(event.target.value)
    })
    /* Set both the new filtered list and the genre to filter by */
    this.setState({ moviesByGenre: moviesByGenre, selectedGenre: event.target.value });
  }

  /* Generic onChange-handler, updates all text inputs state, this will
     work on all text input fields if the text input has a name property */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    /* Destructure, pick all values from this state for easier referencing */
    const { selectedGenre, moviesByGenre, allMovies, searchTerm } = this.state;
    /* If genre is selected, return the filtered array, else, return all movies
     * This value will get past to the List-component that renders the movies */
    let moviesToRender = allMovies;
    if(selectedGenre){
      moviesToRender = moviesByGenre;
    }
    /* If there is some input in the text input, filter again, else, just return
     * the list unfiltered, empty string always false */
    if(searchTerm){
      moviesToRender = moviesToRender.filter(movie => {
        return movie.title.includes(searchTerm)
      });
    } 
    return (
      <div className="App">
        {
          /* InputField extracted to a separate component, App still holds
           * its state, the onChange is in App but gets passed down */
        }
        <InputField
          name="searchTerm"
          value={searchTerm}
          onChange={this.onChange}
        />
        {
          /* Pass down the filter function to the select field, also pass
          * down this.state.genre so the select field updates according to
          * the state. genre === this.state.genre */ 
        }
        <SelectField onChange={this.filterByGenre} value={selectedGenre} />
        {
          /* moviesToRender will either contain allMovies or moviesByGenre
           * depending if a genre has been selected  */
        }
        <List data={moviesToRender}/>
      </div>
    );
  }
}

export default App;
