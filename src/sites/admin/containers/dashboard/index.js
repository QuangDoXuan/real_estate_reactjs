import React from 'react'
import userProvider from '../../../../data-access/user-provider'

import axios from 'axios';
class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
    
    }   

    render(){
        return(
            <div className="content-area">
                Welcome to admin Dashboard
            </div>
        )
    }
}
export default Dashboard