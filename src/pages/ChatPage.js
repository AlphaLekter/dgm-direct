import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Chat from "../components/Chat";
import axios from "axios";
import Cookies from 'universal-cookie'
import ButtonsBar from "../components/ButtonsBar";
import Sidebar from "../components/Sidebar";

import 'bootstrap/dist/css/bootstrap.css';
import {Container, Col, Row} from "react-bootstrap";
import {uniqueChats} from "../utils";

export default function ChatPage() {
    const [loggedUser, setLoggedUser] = useState("")
    const [receiver, setReceiver] = useState("")
    const [friends, setFriends] = useState([])
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [initialChat, setInitialChat] = useState(true)
    const [selectedTab, setSelectedTab] = useState("C")
    const [selectedChat, setSelectedChat] = useState(null);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const updateMessages = async (user1, user2) => {
        const res = await axios.post(`http://localhost:3001/api/messages/${user1}/${user2}`)
        setMessages(res.data)
    }

    const handleEscape = (event) => {
        if (event.key === "Escape") {
            setInitialChat(true)
            setSelectedChat(null)
        }
    };

    useEffect(() => {
        const init = async (user) => {
            const friendsRes = await axios.post(`http://localhost:3001/api/users/getFriends/${user}`)
            const friendsData = friendsRes.data
            setFriends(friendsData)

            const chatsRes = await axios.post(`http://localhost:3001/api/users/getChats/${user}`)
            const chatsData = uniqueChats(chatsRes.data)
            setChats(chatsData)

            if (friendsData.length > 0) {
                let receiverUser;
                if (chatsData.length > 0) {
                    receiverUser = chatsData[0].user.username
                } else {
                    setInitialChat(true)
                    setSelectedChat(null)
                    receiverUser = friendsData[0].username
                }
                setReceiver(receiverUser)
                await updateMessages(user, receiverUser)
            } else {
                setInitialChat(true)
                setSelectedChat(null)
            }
        }

        /* ? In questo passaggio, verifichiamo se il cookie è settato. Se non è settato, l'utente viene rimandato alla
        ?    pagina di login nella quale fare accesso con le proprie credenziali
        ? */
        let loggedUsername = cookies.get("username")
        if (!loggedUsername) {
            console.log("Login non effettuato. Reindirizzamento...")
            navigate("/login");
            return
        } else {
            setLoggedUser(loggedUsername)
        }

        init(loggedUsername).then(() => console.log("Inizializzazione effettuata"))

    }, [])

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [])

    useEffect(() => {
        if (selectedTab === "C") {
            document.title = 'DGM Direct - Le tue chat';
        } else if (selectedTab === "F") {
            document.title = 'DGM Direct - I tuoi amici';
        } else if (selectedTab === "N") {
            document.title = 'DGM Direct - Aggiunta amico';
        }
    }, [selectedTab])


    const friendsStates = {friends, setFriends}
    const chatSet = {chats, setChats, initialChat, setInitialChat}
    const chatList = {selectedChat, setSelectedChat}

    return (
        <>
            <div>
                <Container className="App" fluid>
                    <Row>
                        <Col md={1} id="button-bar-div" onContextMenu={e => e.preventDefault()}>
                            <ButtonsBar
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                setLoggedUser={setLoggedUser}
                            />
                        </Col>

                        <Col md={3} id="side-tab" onContextMenu={e => e.preventDefault()}>
                            <Sidebar
                                loggedUser={loggedUser}
                                selectedTab={selectedTab}
                                friendsStates={friendsStates}
                                chatSet={chatSet}
                                chatList={chatList}
                                setReceiver={setReceiver}
                                updateMessages={updateMessages}
                            />
                        </Col>

                        <Col md={6} id="chat">
                            <Chat
                                messages={messages}
                                setMessages={setMessages}
                                loggedUser={loggedUser}
                                receiver={receiver}
                                chatSet={chatSet}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}