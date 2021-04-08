import React, { Component } from "react"
import axios from "axios"

export default class Data extends Component {
    constructor() {
        super();
        this.state = {
            datastate:"not gotten yet"
        }
    }
    componentDidMount = () => {
        axios.get("/api/users").then((response)=>{
            console.log(response);
        });   
        axios.get("/api/events").then((response)=>{
            console.log(response);
        }); 
        axios.get("/api/products").then((response)=>{
            console.log(response);
        }); 
    };

render(){
    return (
        <div>
        <h1> The data got is : {this.state.datastate}</h1>
        </div>
    
    );
}

}