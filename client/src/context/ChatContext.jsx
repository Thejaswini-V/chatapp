import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { useCallback } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat,setcurrentChat]=useState(null)
  const [messages, setmessages] = useState(null);
  const [messagesError, setmessagesError] = useState(null);
  const [isMessagesLoading, setisMessagesLoading] = useState(false);
  const[sendTextMessageError,setsendTextMessageError]=useState(null);
  const[newMessage,setnewMessage]=useState(null);
  console.log("message",messages)
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        return console.log("Error fetching users", response);
      }
      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u?._id) {
          return false;
        }
        if (userChats) {
          isChatCreated = userChats.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);
  useEffect(() => {
    const getMessages = async () => {
        setisMessagesLoading(true);
        setmessagesError(null);
        const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
        setisMessagesLoading(false);
        if (response.error) {
          return setmessagesError(response);
        }
        setmessages(response);
    };
    getMessages();
  }, [currentChat]);
  const sendTextMessage=useCallback(async(textMessage,sender,currentChatId,settextMessage)=>{
    if(!textMessage) return console.log("You must type a message");
    const response=await postRequest(`${baseUrl}/messages`,JSON.stringify(
      {
        chatId:currentChatId,
        senderId:sender._id,
        text:textMessage
      }
    ))
    if(response.error){
      return setsendTextMessageError(error);
    }
    setnewMessage(response);
    setmessages((prev)=>[...prev,response]);
    settextMessage('');
  },[])
  const updateCurrentChat=useCallback((chat)=>{
    setcurrentChat(chat)
    
  },[])
  const createChat=useCallback(async(firstId,secondId)=>{
    const response = await postRequest(`${baseUrl}/chats/`,JSON.stringify({
        firstId,secondId
    }));
    if (response.error) {
        return console.log("Error creating chats", response);
    }
    setUserChats((prev)=>[...prev,response]);
  },[])

  return (
    <ChatContext.Provider
      value={{
        userChats,
        userChatsError,
        isUserChatsLoading,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
