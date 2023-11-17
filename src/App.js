import './App.css';
import  gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { useEffect, useRef, useState } from 'react';
import { sendMessageToOpenAI } from './openai';


function App() {
  const msgEnd = useRef(null);

  const [animation, setAnimation] = useState(false); //animation des 3 points
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hey ! Je suis Codezilla, ton assistant d'apprentissage au langages de programmation web. Alors n'hésite pas à me solliciter, je suis là pour toi !",
      isBot: true
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages])

  const handleSend = async() => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    setAnimation(true);
    const res = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,  
      { text, isBot: false},
      { text: res, isBot: true}
    ])
    setAnimation(false);
  }

  const handleQuery = async(e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMessageToOpenAI(text);
    setMessages([
      ...messages,  
      { text, isBot: false},
      { text: res, isBot: true}
    ])
  }
 
  const handleEnter = async(e) => {
    if(e.key === 'Enter') await handleSend();
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="" className="logo" /><span className="brand">&lt;CodeZilla&gt;</span></div>
          <button className="midBtn"><img onClick={()=>{window.location.reload()}} src={addBtn} alt="" className="addBtn" />Nouveau Chat</button>
          <div className="upperSideBottom">
            <button value="Qu'est-ce que la programmation web ?" onClick={handleQuery} className="query"><img src={msgIcon} alt="Query" className="" />Qu'est-ce que la programmation web ?</button>
            <button value="Comment utiliser une API ?" onClick={handleQuery} className="query"><img src={msgIcon} alt="Query" className="" />Comment utiliser une API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Accueil" className="listItemsImg" />Accueil</div>
          <div className="listItems"><img src={saved} alt="Sauvegardé" className="listItemsImg" />Sauvegardé</div>
          <div className="listItems"><img src={rocket} alt="Premium" className="listItemsImg" />Passer au premium</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => 
            <div key={i} className={message.isBot?"chat bot":"chat"}>
              <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{ message.text }</p>
            </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className={animation?"loader loaderDisplay":"loader"}>
            <span className="firstDot">.</span>
            <span className="secondDot">.</span>
            <span className="thirdDot">.</span>
          </div>
          <div className="inp">
            <input type="text" placeholder='Envoyer un message...' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className='send' onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>CodeZilla utilise ChatGPT qui peut produire des informations incorrectes.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
