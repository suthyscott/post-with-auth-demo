import {useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [welcomeBanner, setWelcomeBanner] = useState('')

  const authenticate = (e) => {
    e.preventDefault()
    console.log('hit')
    axios.post('http://localhost:4546/user', {username, firstName, lastName, password})
      .then(res => setWelcomeBanner(`Welcome, ${res.data.username}`))

  }
  return (
    <div className="App">
      {login ? <button onClick={() => setLogin(!login)}>Register</button> : <button onClick={() => setLogin(!login)}>Login</button>}
      {login ? (
        <form onSubmit={(e) => authenticate(e)}>
        <input placeholder='username' onChange={e => setUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setPassword(e.target.value)}/>
        <button>Submit</button>

      </form>
      ) : (
        <form onSubmit={(e) => authenticate(e)}>
        <input placeholder='username'onChange={e => setUsername(e.target.value)}/>
        <input placeholder='first name'onChange={e => setFirstName(e.target.value)}/>
        <input placeholder='last name'onChange={e => setLastName(e.target.value)}/>
        <input placeholder='password' onChange={e => setPassword(e.target.value)}/>
        <button>Submit</button>
      </form>
      )}

        <h1>{welcomeBanner}</h1>
    </div>
  );
}

export default App;
