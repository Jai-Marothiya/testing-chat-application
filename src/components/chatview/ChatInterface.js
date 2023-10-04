import React, { useEffect, useState } from 'react';
// import ChatList from './ChatList';
import Interface from './Interface';
import { CometChat } from '@cometchat-pro/chat';

const ChatInterface = () => {
  const [conversations, setConversations] = useState([]);
  const [userName, setUserName] = useState('');
  const [text,setText]=useState("");
  const [forceRerender, setForceRerender] = useState(false);
  useEffect(() => {
    // Fetch the logged-in user details
    CometChat.getLoggedinUser().then(
      (user) => {
        console.log('User details:', user);
        if (user !== null) {
          setUserName(user.name);
        }
      },
      (error) => {
        console.log('Error getting details:', error);
      }
    );
  }, []);

  useEffect(() => {
    // Fetch messages
    const fetchMessages = async () => {
      try {
        const GUID = 'GUID'; // Replace with your group GUID
        const limit = 40;
        const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setGUID(GUID)
          .setLimit(limit)
          .build();

        const messages = await messagesRequest.fetchPrevious();
        console.log('Message list fetched:', messages);

        // Process messages and update conversations
        const updatedConversations = [];

        messages.forEach((message) => {
          if (message.type === CometChat.MESSAGE_TYPE.TEXT && message.action!=="deleted" && message.text) {
            console.log(message.id, " ", message.action, " ",message.text);
            const conversation = {
              id: message.id,
              name: message.sender.name === userName ? 'userName' : 'bot', // Customize name logic as needed
              icon: message.sender.name[0].toUpperCase(), // Customize icon logic as needed
              text: message.text,
            };
            updatedConversations.push(conversation);
          }
        });

        // Update the conversations state
        // if(forceRerender<5)
        setForceRerender(prev => !prev); 
        setConversations(updatedConversations);
      } catch (error) {
        console.log('Message fetching failed with error:', error);
      }
    };

    // Call the fetchMessages function
    fetchMessages();
  }, [userName,text,forceRerender]);

  return (
    <div style={{ display: 'flex' }}>
      {/* <ChatList /> */}
      <Interface conversations={conversations} setConversations={setConversations} userName={userName} setText={setText}/>
    </div>
  );
};

export default ChatInterface;


// useEffect(() => {
    //   setConversations([
    //     {
    //       id: "2",
    //       name: "Rahul Singh",
    //       icon: "R",
    //       text: "Hey Everyone"
    //     },
    //     {
    //       id: "2",
    //       name: "bot",
    //       icon: "J",
    //       text: "Hi Myself Jai"
    //     },
    //     {
    //       id: "3",
    //       name: "bot",
    //       icon: "S",
    //       text: "I'm a superhero"
    //     }
    //   ]);
    // }, []); 
