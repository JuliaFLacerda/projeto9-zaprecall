import { useState } from 'react';
import styled from 'styled-components';
import seta_play from './img/seta_play.png'
import seta_virar from './img/seta_virar.png'


const Flashcard = (props) => {
    const [virada, setVirada] = useState(false);
    const [aberta, setAberta] = useState(false);
    const [resultado, setResultado] = useState("nada");
    
    function abrir(e){
        //manipulate internal state with setstate, e talvez algum global de concluidas
        if(resultado === "nada"){
            setAberta(true);
        }
    }

    function virar(){
        setVirada(true);
    }

    function definirresultado(e){
        setResultado(e.target.textContent);
        props.setResultados([...props.resultados, e.target.textContent])
        if(e.target.textContent === "Não lembrei"){
            props.setErros(props.erros + 1)
        }
        console.log(e.target.textContent);
        setAberta(false);
    }

    return(
        <>
        {aberta? 
        <PerguntaAberta>
            {virada? 
            <>
            <p>{props.resposta}</p>
            <ContainerBotoes>
            <Botao cor="#FF3030" onClick={definirresultado}>Não lembrei</Botao>
            <Botao cor="#FF922E" onClick={definirresultado}>Quase não lembrei</Botao>
            <Botao cor="#2FBE34" onClick={definirresultado}>Zap!</Botao>
            </ContainerBotoes>
            </>
            :
            <>
            <p>{props.pergunta}</p>
            <img src={seta_virar} onClick={virar}></img>
            </>
            }
        </PerguntaAberta> 
        : 
        <PerguntaFechada feito={resultado}>
            <p>{"Pergunta " + (props.num + 1)}</p>
            <img onClick={abrir} src={seta_play}></img>
        </PerguntaFechada>
        }
        </>
    )
}

export default Flashcard;







const PerguntaFechada = styled.div`
    width: 300px;
    height: 35px;
    background-color: #FFFFFF;
    margin: 12px;
    padding: 15px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: ${props=> (props.feito === "Não lembrei" ? "#FF3030" : (props.feito === "Zap!"? "#2FBE34": (props.feito === "Quase não lembrei" ? "#FF922E" : "#333333" )))};
        text-decoration: ${props=> (props.feito !== "nada" ? "line-through" : "none")};
    }
`

const PerguntaAberta = styled.div`
width: 300px;
    margin: 12px;
    padding: 15px;
    min-height: 100px;
    background: #FFFFD5;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    font-family: 'Recursive';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #333333;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    img{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
`

const ContainerBotoes = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 20px;
`
const Botao = styled.button`
        width: 90px;
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #FFFFFF;
        background: ${props => props.cor};
        border-radius: 5px;
        border: 0;
        padding:5px;
`