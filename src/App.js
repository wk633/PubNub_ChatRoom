import React, { Component } from 'react';
import ChatEngineCore from 'chat-engine';
import {Input, Layout, List, Button} from 'antd';
import './App.css';

const {Content} = Layout
const {Item} = List;
const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-a03c7d89-5772-4a1c-96d3-62d398514969',
  subscribeKey: 'sub-c-ebc7762a-23f3-11e8-a8f3-22fca5d72012'
}, {
  globalChannel: 'react-chatroom'
});
ChatEngine.connect(username, {
    signedOnTime: now
})

class App extends Component {
  constructor(){
    super();
    this.state = {
      curText: "",
      messages: []
    }
  }
  componentDidMount(){

  }
  setChatInput(event) {
    this.setState({curText: event.target.value})
  }
  handleSubmit(e){
    if(this.state.curText == "") return;
    let messages = this.state.messages;
    messages.push(this.state.curText);
    this.setState({
      messages: messages,
      curText: ""
    });
    e.target.value = "";
  }
  render() {
    return (
      <div className="App">

        <Content style={{ padding: '20px 50px' }}>
          <div className="message-box">
            {
              this.state.messages.map((v, idx)=>{
                return (<List key={idx}><Item>{v}</Item></List>)
              })
            }
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="input message text" 
              size="large" 
              value={this.state.curText}
              onChange={this.setChatInput.bind(this)} 
              onPressEnter={this.handleSubmit.bind(this)}
              addonAfter={<span onClick={this.handleSubmit.bind(this)}>Submit</span>}/>
          </div>
        </Content>
      </div>
    );
  }
}

export default App;
