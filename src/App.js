import React, { Component } from 'react';
import ChatEngineCore from 'chat-engine';
import {Button} from 'antd';
import './App.css';

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-a03c7d89-5772-4a1c-96d3-62d398514969',
  subscribeKey: 'sub-c-ebc7762a-23f3-11e8-a8f3-22fca5d72012'
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">button</Button>
      </div>
    );
  }
}

export default App;
