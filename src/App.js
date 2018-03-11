import React, { Component } from 'react';
import {Input, Layout, Message} from 'antd';
import './App.css';

const {Content} = Layout

class App extends Component {
  constructor(){
    super();
    this.state = {
      curText: "",
      messages: []
    }
  }
  componentDidMount(){
    // console.log(this.props.ChatEngine)
    this.props.ChatEngine.global.on('message', (payload)=>{
      const messages = this.state.messages;
      messages.push({uuid: payload.sender.uuid, text: payload.data.text, timeToken: payload.data.timeShort});
      this.setState({messages: messages})
      this.refs.messageBox.scrollTo(0, this.refs.messageBox.scrollHeight);
    })
    this.props.ChatEngine.global.search({
      event: 'message',
      limit: 30,
      reverse: true
    }).on('message', (payload) => {
      const messages = this.state.messages;
      messages.unshift({uuid: payload.sender.uuid, text: payload.data.text, timeToken: payload.data.timeShort});
      this.setState({messages: messages})
    }).on('$.search.finish', () => {
        console.log('we have all our results!');
        this.refs.messageBox.scrollTo(0, this.refs.messageBox.scrollHeight)
        const length = this.state.messages.length;
        Message.success(`Last ${length} messages loaded`);
    });
  }
  setChatInput(event) {
    this.setState({curText: event.target.value})
  }
  handleSubmit(e){
    if(this.state.curText === "") return;
    this.props.ChatEngine.global.emit('message', {
      text: this.state.curText,
      timeShort: new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    })
    this.setState({curText: ""})
  }
  render() {
    return (
      <div className="App">
        <h2>ChatEngine Demo</h2>
        <Content style={{ padding: '0px 100px 10px 100px' }}>
          <div>
            <div ref="messageBox" className="message-box">
              {
                this.state.messages.map((v, idx)=>{
                  if(v.uuid !== this.props.ChatEngine.me.uuid){
                    return (<div className="chat-box" key={idx}>
                              <div className="chat-name">{v.uuid}    {v.timeToken}</div>
                              <div className="chat-text"> {v.text}</div>
                          </div>);
                  }else{
                    return(<div className="chat-box-me" key={idx}>
                              <div className="chat-name-me">{v.timeToken}    me</div>
                              <div className="chat-text-me"> {v.text}</div>
                            </div>)
                  }
                })
              }
            </div>
            <div style={{ marginBottom: 16, width: "534px" }}>
              <Input
                placeholder="input message text" 
                size="large" 
                value={this.state.curText}
                onChange={this.setChatInput.bind(this)} 
                onPressEnter={this.handleSubmit.bind(this)}
                addonAfter={<span style={{cursor: "pointer"}} onClick={this.handleSubmit.bind(this)}>Submit</span>}/>
            </div>
          </div>
          
        </Content>
      </div>
    );
  }
}

export default App;
