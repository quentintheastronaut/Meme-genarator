import React from "react"
import './MemeGenarator.css'

// function MemeGenarator(){

//     return (
//         <div>
//             This is meme generator
//         </div>
//     )
// }

class MemeGenarator extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            top: "",
            bottom: "",
            randomImg: "",
            isLoading : false,
            allMemeImg : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.randomMeme = this.randomMeme.bind(this)
    }

    componentDidMount()
    {


        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const {memes} = data.data
            this.setState({
                allMemeImg : memes
            })
        })
        
    }

    handleChange(event){
        
        const {name , value} = event.target
        this.setState({[name] : value})
    }

    randomMeme(event){
        
        event.preventDefault()
        const meme = this.state.allMemeImg[Math.floor(Math.random() * this.state.allMemeImg.length)]
        console.log(meme)
        this.setState({
            randomImg : meme.url
        })
    }

    render(){
        return (
            <div >
                <br/>
                <form className="meme--form">
                    <input 
                        type="text"
                        value={this.state.top}
                        name="top"
                        onChange={this.handleChange}
                    />

                    <input 
                        type="text"
                        value={this.state.bottom}
                        name="bottom"
                        onChange={this.handleChange}
                    />

                    
                    
                   
                </form>
                
        
                
                    <button onClick={this.randomMeme}>Gen</button>
                        <h2 className="top">{this.state.top}</h2>
                        <img className="img" src={this.state.randomImg} alt=""/>
                        <h2 className="bottom">{this.state.bottom}</h2>

                  
                    </div>
      
        )
    }
}

export default MemeGenarator