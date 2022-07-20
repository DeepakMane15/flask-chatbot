class Chatbox {
    constructor(){
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox:document.querySelector('.chatbox__support'),
            sendButton:document.querySelector('.send__button'),
        }
        this.state = false;
        this.message = [];
    }

    display(){
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', ()=> this.toggleState(chatBox))
        openButton.addEventListener('click', ()=> this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({key}) => {
            if(key === "Enter")
            {
                this.onSendButton(chatBox);
            }
        })
    }
    toggleState(chatbox){
        this.state = !this.state;

        if(this.state){
            console.log(chatbox.classList)
            chatbox.classList.add('chatbox--active')
        } else{
            chatbox.classList.remove('chatbox--active')
        }
    }
    onSendButton(chatbox){
        var textField = chatbox.querySelector('input')
        let text1 = textField.value
        if(text1 === "") {
            return 
        };

        let msg1 = {name : "User", message: text1}
        this.message.push(msg1);

        fetch($SCRIPT_ROOT + '/predict',    {
            method: "POST",
            body: JSON.stringify({message:text1}),
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json'

            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = {name: "Sam", message: r.answer}
            this.message.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error) => {
            console.log('Error', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }
    updateChatText(chatbox){
        var html = '';
        this.message.slice().reverse().forEach(function (item, index) {
            if(item.name === "Sam"){
                html += '<div class="message__item messages__item--visitor">' + item.message + '</div>'

            }
            else{
                html += '<div class="message__item messages__item--operator">' + item.message + '</div>'
            }
        }
            );
            const chatmessage = chatbox.querySelector('.chatbox__messages');
            chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();