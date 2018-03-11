import React, { Component } from 'react';
import {Input, Layout, List, Button} from 'antd';
import './App.css';

const {Content} = Layout
const {Item} = List;


class App extends Component {
  constructor(){
    super();
    this.state = {
      curText: "",
      messages: []
    }
  }
  componentDidMount(){
    this.props.ChatEngine.global.on('message', (payload)=>{
      console.log(this);
      const messages = this.state.messages;
      messages.push({uuid: payload.sender.uuid, text: payload.data.text});
      this.setState({messages: messages})
    })
  }
  setChatInput(event) {
    this.setState({curText: event.target.value})
  }
  handleSubmit(e){
    if(this.state.curText == "") return;
    this.props.ChatEngine.global.emit('message', {
      text: this.state.curText
    })
    this.setState({curText: ""})
  }
  render() {
    return (
      <div className="App">
        <h2>ChatEngine Demo</h2>
        <Content style={{ padding: '0px 100px 10px 100px' }}>
          <div className="message-box">
            {
              this.state.messages.map((v, idx)=>{
                return (
                  <div className="chat-box" key={idx}>
                    <div className="chat-name">{v.uuid}:</div>
                    <div className="chat-text"> {v.text}</div>
                  </div> 
                )
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
