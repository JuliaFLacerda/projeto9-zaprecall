import { useState } from 'react';
import styled from 'styled-components';
import seta_play from './img/seta_play.png'
import seta_virar from './img/seta_virar.png'
import icone_certo from './img/icone_certo.png'
import icone_quase from './img/icone_quase.png'
import icone_erro from './img/icone_erro.png'


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
        <div data-test="flashcard">
        {aberta? 
        <PerguntaAberta>
            {virada? 
            <>
            <p data-test="flashcard-text">{props.resposta}</p>
            <ContainerBotoes>
            <Botao cor="#FF3030" data-test="no-btn" onClick={definirresultado}>Não lembrei</Botao>
            <Botao cor="#FF922E" data-test="partial-btn" onClick={definirresultado}>Quase não lembrei</Botao>
            <Botao cor="#2FBE34" data-test="zap-btn" onClick={definirresultado}>Zap!</Botao>
            </ContainerBotoes>
            </>
            :
            <>
            <p data-test="flashcard-text">{props.pergunta}</p>
            <img src={seta_virar} data-test="turn-btn" onClick={virar}></img>
            </>
            }
        </PerguntaAberta> 
        : 
        <PerguntaFechada feito={resultado}>
            <p data-test="flashcard-text">{"Pergunta " + (props.num + 1)}</p>
            <img data-test={resultado === "nada"? "play-btn":(resultado === "Zap!" ? "zap-icon" : (resultado === "Quase não lembrei" ? "partial-icon" : "no-icon") )} onClick={abrir} src={resultado === "nada"?seta_play:(resultado === "Zap!" ? icone_certo : (resultado === "Quase não lembrei" ? icone_quase : icone_erro) )}></img>
        </PerguntaFechada>
        }
        </div>
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