import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { subscribeToTimer } from './api';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            timestamp: 'no timestamp yet',
        };

        subscribeToTimer(1000, (err, timestamp) => this.setState({ timestamp }));
    }

    componentDidMount() {
        return fetch('/api/hello')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    message: response.message,
                });
            });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    Message from API: <b>{this.state.message}</b> <br />
                    This is the timer value: {this.state.timestamp}
                </p>
            </div>
        );
    }
}

export default App;
