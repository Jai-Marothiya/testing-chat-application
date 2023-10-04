import React, {useEffect,useState} from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatHeader from './ChatHeader';
import { CometChat } from "@cometchat-pro/chat";

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const Interface = ({conversations,setText,userName}) => {
  const [input, setInput] = useState("");
  console.log("conversations: ",conversations);

  const handleSend = async () => {
    if (input.trim() !== "") {
      console.log(input);
      let receiverID = "GUID";
      let messageText = input;
      let receiverType = CometChat.RECEIVER_TYPE.GROUP;
      let textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

      await CometChat.sendMessage(textMessage).then(
        message => {
          console.log("Message sent successfully:", message);
        }, error => {
          console.log("Message sending failed with error:", error);
        }
      );

      setInput("");
      setText("");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setText(event.target.value);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        margin:'0',
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
        width:"100%"
      }}
    >
        <ChatHeader userName={userName}/>
        <Box sx={{ flexGrow: 1, overflow: "scroll", p: 2 }}>
            {conversations.length>0 && conversations.map((message) => (
            <Message key={message.id} message={message} />
            ))}
        </Box>
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <Grid container spacing={2}>
            <Grid item xs={10}>
                <TextField
                size="small"
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                value={input}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={2}>
                <Button
                fullWidth
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSend}
                >
                Send
                </Button>
            </Grid>
            </Grid>
        </Box>
    </Box>
  );
};

const Message = ({ message }) => {
  const isBot = message.name === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
        <Box
            sx={{
            display: "flex",
            flexDirection: isBot ? "row" : "row-reverse",
            alignItems: "center",
            }}
        >
            <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
            {message.icon}
            </Avatar>
            <Paper
            variant="outlined"
            sx={{
                p: 2,
                ml: isBot ? 1 : 0,
                mr: isBot ? 0 : 1,
                backgroundColor: isBot ? "primary.light" : "secondary.light",
                borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
            }}
            >
            <Typography variant="body1">{message.text}</Typography>
            </Paper>
        </Box>
    </Box>
  );
};

export default Interface;