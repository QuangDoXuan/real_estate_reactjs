import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";

import SubMenu from '../home/sub-menu'
import productCategoryProvider from '../../../../data-access/product-category-provider'

class MenuLevel1 extends React.Component{
    constructor(props){
        super(props)
        this.state={
            openSubMenu:false,
            menuItem:[]
        }
    }

    componentDidMount(){
        this.getByParent()
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    setOpen = () =>{
       this.setState({
           openSubMenu:!this.state.openSubMenu
       })
    }

    getByParent(){
        productCategoryProvider.getByParent(this.props.parentId).then(res=>{
            if(res&&res.Code == 200){
                this.setState({
                    menuItem:res.Data
                })
            }
           
        }).catch(e=>{
            console.log(e)
        })
    }


    render(){
        return(
            <NavItem className="nav-item-menu" onMouseEnter={() => { this.setState({ openSubMenu: true }) } } onMouseLeave={()=>{this.setState({openSubMenu:false})}}>
                <NavLink className="link-menu-item" to={this.props.href} onClick={this.setOpen}>{this.props.data.ProductCategoryTitle}</NavLink>
                {this.state.openSubMenu?
                    <SubMenu 
                        data = {this.state.menuItem}
                    />:""    
                }
            </NavItem>
        )
    }

}
export default MenuLevel1