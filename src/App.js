import React from 'react';
import Flashcard from './Flashcard'
import styled from 'styled-components';
import logo from './img/logo.png'
import { useState } from 'react';
import icone_certo from './img/icone_certo.png'
import icone_quase from './img/icone_quase.png'
import icone_erro from './img/icone_erro.png'
import sad from './img/sad.png'
import party from './img/party.png'


const App = () => {
    const deck1 = [{pergunta: "O que é JSX", resposta:"Uma extensão de linguagem do JavaScript"}, 
                   {pergunta:"O React é", resposta:"uma biblioteca JavaScript para construção de interfaces"},
                   {pergunta: "Componentes devem iniciar com", resposta: "letra maiúscula"},
                   {pergunta: "Podemos colocar __ dentro do JSX", resposta: "expressões"},
                   {pergunta: "O ReactDOM nos ajuda __ ", resposta: "interagindo com a DOM para colocar componentes React na mesma"},
                   {pergunta: "Usamos o npm para __", resposta: "gerenciar os pacotes necessários e suas dependências"},
                   {pergunta: "Usamos props para __", resposta: "passar diferentes informações para componentes"},
                   {pergunta: "Usamos estado (state) para __ ", resposta: "dizer para o React quais informações quando atualizadas devem renderizar a tela novamente"}
                ]
    const deck2 = [{pergunta: "Pergunta1", resposta:"expressões"}, 
                   {pergunta:"Pergunta2", resposta:"não"},
                   {pergunta: "Pergunta3", resposta: "talvez"}]
    
    const [resultados, setResultados] = useState([]);
    const [iniciado, setIniciado] = useState(false);
    const [deck, setDeck] = useState(deck1);
    const [erros, setErros] = useState(0);
 
    function iniciar(){
        setIniciado(true);
    }
    

    

    return(
        <>
        {!iniciado?
        <ScreenContainer>
        <LogoContainer iniciado={iniciado}>
            <img src={logo}></img>
            <h1>Zap Recall</h1>
        </LogoContainer>
        <BotaoIniciar onClick={iniciar}>Iniciar Recall!</BotaoIniciar>
        </ScreenContainer>
        :
        <ScreenContainer>
        <LogoContainer iniciado={iniciado}>
            <img src={logo}></img>
            <h1>ZapRecall</h1>
        </LogoContainer>
        {deck.map((e, index) => {
            return(
                <Flashcard 
                pergunta={e.pergunta}
                resposta={e.resposta} 
                num={index}
                setResultados={setResultados}
                resultados={resultados}
                erros = {erros}
                setErros = {setErros}
                />
            )
        })}
        <FooterConcluidos data-test="footer">
        {(resultados.length !== deck.length)? <></>
            :
            (erros === 0 ?
                <MensagemMeta data-test="finish-text">
                    <div>
                    <img src={party} />
                    <h1>Parabéns!</h1>
                    </div>
                    <p>Você não esqueceu de nenhum flashcard!</p>
                </MensagemMeta>
                :
                <MensagemMeta data-text="finish-text">
                    <div>
                        <img src={sad} />
                        <h1>Putz...</h1>
                    </div>
                    <p>Ainda faltam alguns... Mas não desanime!</p>
                </MensagemMeta>
                
            )
        }
            <h1>{resultados.length}/{deck.length} CONCLUÍDOS</h1>
            <div>
        {resultados.map(resultado =>{
            let a = <></>
                if(resultado === "Zap!"){
                    a = <img src={icone_certo} data-test="zap-icon"></img>
                }
                else if(resultado === "Quase não lembrei"){
                    a = <img src={icone_quase} data-test="partial-icon"></img>
                }
                else if(resultado ==="Não lembrei"){
                    a = <img src={icone_erro} data-test="no-icon"></img>
                }
            
            return a;
        })}
        </div>
        </FooterConcluidos>
        </ScreenContainer>
        }
        </>
    )
}











const ScreenContainer = styled.div`
    background-color: #FB6B6B;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => (!props.iniciado? "center" : "normal")};
    margin: 0px;
    padding: 0px;
    padding-bottom: 200px;
    select, input{
        width: 246px;
        height: 43px;
        background: #FFFFFF;
        border-radius: 5px;
        color: #ADADAD;
        font-size: 14px;
    }
`
const LogoContainer = styled.header`
display: flex;
    align-items: center;
    flex-direction: ${props => (!props.iniciado? "column" : "row")};
    margin: 40px 0 20px 0;
img{
    width: ${props => (!props.iniciado? "136px" : "52px")}
}
h1 {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 45px;
    color: #FFFFFF;
    margin-left: 20px;
  }
`

const FooterConcluidos = styled.footer`
    width: 100%;
    min-height: 50px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Recursive';
    font-weight: 400;
    font-size: 18px;
    color: #333333;
    padding: 10px;
    div{
        display: flex;
        gap: 5px;
    }
    h1{
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 6px;
    }
`

const BotaoIniciar = styled.button`
    width: 246px;
    height: 54px;
    background: #FFFFFF;
    border: 1px solid #D70900;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    font-weight: 400;
    font-size: 18px;
    color: #D70900;
    margin-top: 18px;
    font-family: 'Recursive';
    &:disabled{
        background: #E8E8E8;
        color: #C0C0C0;
    }
`
const MensagemMeta = styled.div`
width: 300px;
    background-color: #FFFFFF;
    margin-bottom:14px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p{
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: "#333333";
    }
    img{
        width: 23px;
        height: 23px;
    }
    div{
        display: flex;
        gap: 5px;
        
    }
    h1{
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #333333;
    }
`

export default App;