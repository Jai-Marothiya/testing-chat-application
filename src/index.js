import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CometChat } from '@cometchat-pro/chat';

const appID = process.env.REACT_APP_COMETCHAT_APP_ID;
const region = process.env.REACT_APP_COMETCHAT_REGION;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

console.log("ID: ", appID, " , region: ", region);
CometChat.init(appID,appSetting).then(
  ()=>{
    console.log("Initialization Completed Succesfully");
  },
  error=>{
    console.log("Initialization failed with error:", error);
  }
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
