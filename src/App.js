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
      console.log(payload);
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
