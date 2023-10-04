import React, {useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { CometChat } from '@cometchat-pro/chat';

function createData(name,email) {
  return { name, email };
}

export default function UserTable() {

  // const [users,setUsers]=useState([]);
  
  // useEffect(()=>{
  //   let limit = 30;
  //   let usersRequest = new CometChat.UsersRequestBuilder().setLimit(limit).build();
  //   // console.log("usersRequest: ",usersRequest);
  //   usersRequest.fetchNext().then(
  //     userList => {
  //       console.log("User list received:", userList, typeof(userList));
  //       setUsers(Object.entries(userList));
  //       // console.log(users);
  //     }, error => {
  //       console.log("User list fetching failed with error:", error);
  //     }
  //   )
        
  // },[])
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [forceRerender, setForceRerender] = useState(false); // Add this state variable

    // useEffect(() => {
    //   CometChat.getLoggedinUser().then(
    //     user => {
    //       console.log("user details:", {user});
    //       if(user!==null){
    //         setName(user.name);
    //       }
    //     }, error => {
    //       console.log("error getting details:", { error });
    //     }
    //   );

    //   let limit = 30;
    //   let usersRequest = new CometChat.UsersRequestBuilder().setLimit(limit).build();

    //   usersRequest.fetchNext().then(
    //     userList => {
    //       setForceRerender(prev => !prev); // Toggle the dummy state to force a re-render
    //       console.log("User list received:", userList, typeof(userList));
    //       setUsers(Object.entries(userList));
    //     },
    //     error => {
    //       console.log("User list fetching failed with error:", error);
    //     }
    //   )
    // }, [forceRerender,name]); // Include forceRerender in the dependency array
    useEffect(() => {
      const fetchData = async () => {
        try {
          let limit = 30;
          let usersRequest = new CometChat.UsersRequestBuilder().setLimit(limit).build();
          const userList = await usersRequest.fetchNext();
          console.log("User list received:", userList, typeof(userList));
          setUsers(Object.entries(userList));
          console.log(users);
        } catch (error) {
          console.log("User list fetching failed with error:", error);
        }
      };
      fetchData();
    }, []);
    

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
        <TableContainer component={Paper} sx={{ width: 1/2}}>
        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>User</TableCell>
                {/* <TableCell align="right">Email</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <TableRow
                key={user[0]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {user[1].name}
                </TableCell>
                {/* <TableCell align="right">{user[1].email}</TableCell> */}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
// import React, { useState, useEffect } from 'react';
// import { CometChat } from '@cometchat-pro/chat';

// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [groupName, setGroupName] = useState('');


//   useEffect(() => {
//     // Fetch a list of existing users from CometChat
//     const limit = 30; // Number of users to fetch
//     const usersRequest = new CometChat.UsersRequestBuilder()
//       .setLimit(limit)
//       .build();
  
//     usersRequest
//       .fetchNext()
//       .then(
//         (userList) => {
//           console.log('Users list:', userList);
//           setUsers(userList);
//         },
//         (error) => {
//           console.error('Error fetching users:', error);
//         }
//       );
//   }, []);
  

//   const handleUserClick = (user) => {
//     // Add or remove user from the selected users list
//     const updatedSelectedUsers = selectedUsers.includes(user.uid)
//       ? selectedUsers.filter((uid) => uid !== user.uid)
//       : [...selectedUsers, user.uid];
//     setSelectedUsers(updatedSelectedUsers);
//   };

//   const handleCreateGroup = () => {
//     if (groupName && selectedUsers.length > 0) {
//       // Create a new group with selected users
//       const groupType = CometChat.GROUP_TYPE.PUBLIC;
//       const password = '';
      
//       let GUID=groupName;
//       const membersList = selectedUsers.map((uid) => new CometChat.User(uid, 'user'));
//       const group = new CometChat.Group(GUID,groupName,groupType,password,membersList);
//       // var group = new CometChat.Group(GUID, groupName, groupType, password);

//       CometChat.createGroup(group).then(
//         (createdGroup) => {
//           console.log('Group created:', createdGroup);
//           // Redirect to the chat interface or perform other actions
//         },
//         (error) => {
//           console.error('Error creating group:', error);
//         }
//       );
//     }
//   };

//   return (
//     <div>
//       <h1>User List</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.uid} onClick={() => handleUserClick(user)}>
//             {user.name} {selectedUsers.includes(user.uid) ? '(Selected)' : ''}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h2>Create Group</h2>
//         <input
//           type="text"
//           placeholder="Group Name"
//           value={groupName}
//           onChange={(e) => setGroupName(e.target.value)}
//         />
//         <button onClick={handleCreateGroup}>Create</button>
//       </div>
//     </div>
//   );
// };

// export default UserTable;

