import React, { useEffect , useState} from 'react'
import Navbar from './Navbar';
import UserTable from './UserTable'
import { CometChat } from '@cometchat-pro/chat';

const Dashboard = () => {
  const [active, setactive]=useState();
  useEffect(()=>{
    CometChat.getLoggedinUser().then(
      user => {
        let name = {user};
        setactive(name.user);
        console.log("user details:", { user });
      }, error => {
        console.log("error getting details:", { error });
      }
      );
      if(active===null)return (<></>);
  },[]);

  // useEffect(()=>{
  //   var GUID = "GUID";
  //   var groupName = "Hello Group!";
  //   var groupType = CometChat.GROUP_TYPE.PUBLIC;
  //   var password = "";

  //   var GUID = "GUID";
    // CometChat.getGroup(GUID).then(
    //   group => {
    //     console.log("Group details fetched successfully:", group);
    //   }, error => {
    //     console.log("Group details fetching failed with exception:", error);
    //   }
    // );
  
    // var group = new CometChat.Group(GUID, groupName, groupType, password);
  
    // CometChat.createGroup(group).then(
    //   group => {
    //     console.log("Group created successfully:", group);
    //   }, error => {
    //     console.log("Group creation failed with exception:", error);
    //   }
    // );
  // },[]);
  return (
    <div style={{height:"100vh"}}>
        <Navbar/>
        <UserTable/>
    </div>
  )
}

export default Dashboard