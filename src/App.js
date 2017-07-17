import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data.json';

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit}>
    {children}
    <input type="text" className="box" value={value} onChange= {onChange}/>
    <button className="click" type="submit">
      {children}
    </button>
  </form>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to Book Nook</h1>
          <p>Find the books you have always been looking for</p>
        </div>
        <h2>What book are you looking for?</h2>
        <div className="page">
          <div className="interactions">
            <Search>
              Search
            </Search>
          </div>
          {this.state.data.items.map(item =>
            <div className="table" key={item.id}>
              <div>
                <span><h3>{item.volumeInfo.title}</h3></span>
                <div className="thumbnail">
                  {item.volumeInfo.imageLinks.smallThumbnail}
                </div>
                <a href=""><div className="backside">
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
