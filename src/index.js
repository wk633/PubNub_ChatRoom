import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ChatEngineCore from 'chat-engine';

const now = new Date().getTime();
const username = localStorage.getItem("username-chatroom") !== null ? localStorage.getItem("username-chatroom") : ['user', now].join('-');


const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-a03c7d89-5772-4a1c-96d3-62d398514969',
    subscribeKey: 'sub-c-ebc7762a-23f3-11e8-a8f3-22fca5d72012'
  }, {
      globalChannel: 'react-chatroom'
  });
  
ChatEngine.connect(username, {
    signedOnTime: now
})

ChatEngine.on('$.ready', () => {
    ReactDOM.render( <App ChatEngine={ChatEngine}/>, document.getElementById('root'));
    localStorage.setItem("username-chatroom", username);
});

registerServiceWorker();
