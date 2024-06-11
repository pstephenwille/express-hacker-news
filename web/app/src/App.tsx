import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [state, setState] = React.useState<boolean>(false);

    useEffect(()=>{
        fetch('http://localhost:3000/api/users/user?foo=woot')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setState(res.data)
            });
    }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
