import React from 'react';
class Text extends React.Component{
    drag(ev){
        ev.dataTransfer.setData("Text",ev.target.id);
    }
    splitWord(text) {
        let nubmerOfWord = 0;
        let elem = document.querySelectorAll('.draggable')[0];
        Object.keys(text).map((chastRechi) => {
            console.log(chastRechi);
            let chastiRechiNode = document.createElement('div');
            chastiRechiNode.id = 'chastiRechi';
            chastiRechiNode.appendChild(document.createTextNode(chastRechi));
            elem.appendChild(chastiRechiNode);
            let masPerevodov = text[chastRechi];
            masPerevodov.map((perevod) => {
                let words = perevod.split(' ');
                let point = document.createElement('li');
                for (let i = 0; i < words.length; i++) {
                    nubmerOfWord += 1;
                    let textNode = document.createElement('span');
                    textNode.id = 'word_' + nubmerOfWord;
                    textNode.draggable = true;
                    textNode.ondragstart = this.drag;
                    textNode.appendChild(document.createTextNode(words[i] + ' '));
                    point.appendChild(textNode)
                }
                elem.appendChild(point);
            })
        })
    }
    componentDidUpdate = async () => {
        document.getElementById("draggable").innerHTML = "";
        let word = this.props.word;
        word = word.replace(/\s/g, '');
        let result = await this.postData(word);
        console.log(result);
        this.splitWord(result);
    }
    async postData(data) {
        let response = await fetch(`Students/Get/${data}`, {
            method: 'GET',
        });
        return await response.json();
    }
    render(){
        return(
            <div>
                <div className='draggable' id='draggable'></div>
            </div>
        )
    }
}
export default Text;