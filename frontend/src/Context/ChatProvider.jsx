import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    // const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('token');
        setUser(data);

    }, [user])

    return <ChatContext.Provider value={{ user, setUser }}>
        {children}
    </ChatContext.Provider>
}

export const chatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;