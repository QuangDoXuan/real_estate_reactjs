import React from 'react'
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            user: localStorage.getItem('user')
        }
    }
    componentDidMount(){
        // this.checkUserLogin();
        console.log(JSON.parse(this.state.user))
    }
    // checkUserLogin() {
    //     if (!this.props.userApp.currentUser) {
    //         this.props.history.push("/dang-nhap")
    //     }
    //     else{}
    // }
    handleLogout=()=>{
        window.localStorage.clear();
        window.location.href='/dang-nhap'
    }

    handleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleClickAway=()=>{
        this.setState({
            isOpen:false
        })
    }
   
    render() {
        const user = JSON.parse(this.state.user)
        return (
            <header className="header-admin">
                <div className="logo">
                   Admin Landber
                </div>
                <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="settings">
                    {this.state.user?
                    <span className="user-name" onClick={this.handleOpen}>{user.name}</span>:''    
                }
                    
                    {this.state.isOpen ?
                        <ul className='sub-menu-settings'>
                            <li onClick={this.handleLogout} className="item-settings"><a>Đăng xuất</a></li>
                            <li className="item-settings"><a>Cài đặt</a></li>
                        </ul> : ''
                    }
                
                </div>
                </ClickAwayListener>
            </header>
        )


    }
}
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

export default connect(mapStateToProps)(Header);