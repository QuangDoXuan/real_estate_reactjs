import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class ModalDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open:true
        }
    }

    handleClose = () => {
        this.props.callbackOff()
    };

    render(){
        return (
            
            <Dialog  open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            fullWidth="md"
            maxWidth="md"
            >
                <DialogContent>
                    <DialogTitle>Chi tiết người dùng</DialogTitle>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row one-row-info">
                                    <label className = "title-user">Họ tên:</label>
                                    <div className = "info-user">{this.props.data.UserName}</div>
                                </div>

                                <div className="row one-row-info">
                                    <label className = "title-user">Email:</label>
                                    <div className = "info-user">{this.props.data.Email}</div>
                                </div>

                                <div className="row one-row-info">
                                    <label className = "title-user">Số điện thoại:</label>
                                    <div className = "info-user">{this.props.data.PhoneNumber}</div>
                                </div>

                                <div className="row one-row-info">
                                    <label className = "title-user">Quyền:</label>
                                    <div className = "info-user">{this.props.data.Roles[0]}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                    
                </DialogContent>
            </Dialog>
        )
    }
}
export default ModalDetail