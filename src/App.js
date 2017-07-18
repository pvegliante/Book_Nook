import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Parser from 'html-react-parser';

const DEFAULT_QUERY = 'redux';
const DEFAULT_RESULTS = 5;

const PATH_BASE = 'https://www.googleapis.com/books/v1';
const PATH_SEARCH = '/volumes';
const PARAM_SEARCH = 'q=';
const PARAM_RESULTS = 'maxResults=';

const Search = ({onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit}>
    <input type="text" className="box" onChange= {onChange}/>
    <button className="click" type="submit">
      {children}
    </button>
  </form>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:null,
      searchTerm: DEFAULT_QUERY
    }
    this.setBooks=this.setBooks.bind(this);
    this.fetchBooks=this.fetchBooks.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
    this.onSearchSubmit=this.onSearchSubmit.bind(this);
  }

  setBooks(data) {
    this.setState({data})
  }

  fetchBooks(searchTerm){
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_RESULTS}${DEFAULT_RESULTS}`)
      .then( response => response.json())
      .then(result => this.setBooks(result))
      .catch(e=>e);
  }

  componentDidMount(){
    const {searchTerm}=this.state;
    this.fetchBooks(searchTerm);
  }

  onSearchSubmit(e){
    const {searchTerm}=this.state;
    this.fetchBooks(searchTerm);
    e.preventDefault();
  }

  onSearchChange(e){
    this.setState({searchTerm:e.target.value})
  }

  render() {
    const {data}=this.state;
    if(!data){
      return null;
    }
    console.log(data);
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to Book Nook</h1>
          <p>Find the books you have always been looking for</p>
        </div>
        <h2>What book are you looking for?</h2>
        <div className="page">
          <div className="interactions">
            <Search
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
              >
                Search
              </Search>
          </div>
          {this.state.data.items.map(item =>
            <div className="table" key={item.id}>
              <div>
                <span><h2>{item.volumeInfo.title}</h2></span>
                <div className="thumbnail">
                  <img src={item.volumeInfo.imageLinks.thumbnail}/>
                </div>
                <a href={item.volumeInfo.previewLink}><div className="backside">
                <span><h6>{item.volumeInfo.subtitle}</h6></span>
                <span><h6>{item.volumeInfo.categories}</h6></span>
                <span>
                      <h6>{item.volumeInfo.authors[0]}</h6>
                      <h6>{item.volumeInfo.authors[1]}</h6>
                </span>
                <span><h6>{item.volumeInfo.averageRating}</h6></span>
                </div></a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
