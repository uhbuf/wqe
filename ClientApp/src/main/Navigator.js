import React from 'react';
class Navigator extends React.Component{
    drop=(ev)=>{
        ev.preventDefault();
        let data=ev.dataTransfer.getData("Text");
        this.props.smenaSlova(document.getElementById(data).textContent);
    }
    allowDrop(ev){
        ev.preventDefault();
    }
    render(){
        this.buttonArray=[
            {
                text:'Лексический',
            },
            {
                text:'Обычный',
            },
            {
                text:'Мой',
            },
        ];
        return(
            <div className='navigator' onDrop={this.drop} onDragOver={this.allowDrop}>
                {this.buttonArray.map((button)=>(
                    <span>
                        <button className='button'>
                            {button.text}
                        </button>
                    </span>
                ))}
            </div>
        );
    }
}
export default Navigator; 