import React from 'react';
class Search extends React.Component{
    render(){
        return(
           <div class='d1'>
               <form>
                    <input id="search" type="search" placeholder="Search" autofocus></input> 
                    <button  type="button" title="Начать поиск" onClick={()=>this.props.smenaSlova(document.getElementById("search").value)}></button> 
                </form> 
           </div>    
        );
    }
}
export default Search;