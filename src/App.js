import React, {Component} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width: 400px;
   height: 100vh;
   background-color:#c7c7c7;
   border: 3px solid #23ffa7;
   display: flex;
   flex-direction: column-reverse;
`;

const Message = styled.div`
  border-radius: 30px;
  padding: 15px 25px;
  background-color: ${props => props.incoming ? "#fff" : "#8bffc5"};
  text-align: ${props => props.incoming ? "left" : "right"};
  margin-left: ${props => props.incoming ? "5px" : "auto"};
  margin-right: ${props => props.incoming ? "auto" : "5px"};
  margin-top: 10px;
  margin-bottom: 10px;
  width: 80%;
`;

const TextField = styled.textarea`
  width: 100%;
  border:none;
  height:70px;
  box-sizing:border-box;
  resize: none; 
  padding: 15px 25px;
  outline: none !important;
`;

class App extends Component {
    state = {
        messageValue: "",
        messages: [{
            incoming: false,
            text: "Hello World!"
        }, {
            incoming: true,
            text: "Hello World!"
        }]
    }

    sendMessage = (event) => {
        const {keyCode, shiftKey} = event;
        event.preventDefault();
        if (shiftKey && keyCode == 13) {
            // Добавить в массив сообщений
            this.setState((prevState) => {
                return {
                    messages: [{
                        text: prevState.messageValue,
                        incoming: false
                    }, ...prevState.messages],
                    messageValue: ""
                };
            });
            // Отправить на сервер
        }
    }

    changeMessage = (event) => {
        this.setState({
            messageValue: event.target.value
        })
    }

    render() {
        return (
            <Wrapper>
                <TextField
                    onKeyUp={this.sendMessage}
                    onChange={this.changeMessage}
                    placholder="Введите сообщение и нажмите Enter"
                    value={this.state.messageValue}
                />
                {this.state.messages.map((message, index) => (
                    <Message incoming={message.incoming}
                             key={index}>
                        {message.text}
                    </Message>
                ))}
            </Wrapper>
        );
    }
}

export default App;
