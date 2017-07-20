import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Parser from 'html-react-parser';
import dummy from './bookplaceholder.jpg';

const DEFAULT_QUERY = 'valentino';
const DEFAULT_RESULTS = 20;

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
          <h1>The Angolo</h1>
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
          <div className="samwich">{this.state.data.items.map(item =>
            <div className="table" key={item.id}>
              <div>
                <span><h2>{item.volumeInfo.title ? item.volumeInfo.title: 'Not Available'}</h2></span>
                <div className="thumbnail"><a target="_blank" rel="noopener" href={item.volumeInfo.previewLink ? item.volumeInfo.previewLink: ''}>
                  <img src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail !== 'http://books.google.com/books/content?id=fOK5wjMIHh0C&printsec=frontcover&img=1&zoom=1&source=gbs_api' ? item.volumeInfo.imageLinks.thumbnail: dummy}/>
                  <a target="_blank" rel="noopener" className="backside" href={item.volumeInfo.previewLink ? item.volumeInfo.previewLink: ''}>
                  <span><h6>{item.volumeInfo.subtitle ? item.volumeInfo.subtitle: 'Not Available'}</h6></span>
                  <span><h6>{item.volumeInfo.categories ? item.volumeInfo.categories: 'Not Available'}</h6></span>
                  <span>
                        {item.volumeInfo.authors ? item.volumeInfo.authors.map(author =>
                            <h6 key={author}>{ author }</h6>
                        ): 'Not Available'}
                  </span>
                  </a>
                </a></div>
              </div>
            </div>
          )}</div>
        </div>
      </div>
    );
  }
}

export default App;
