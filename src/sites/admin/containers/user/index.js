import React from 'react'

//UI
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../components/pagination/pagination';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

//Component
import ModalAddUpdate from './create-update-user'
import ModalDetailUser from './detail-modal'
//provider
import userProvider from '../../../../data-access/user-provider'


const listUser = [
  {UserId:1, UserName: "Đỗ Xuân Quang", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:2, UserName: "Đỗ Xuân Hải", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:3, UserName: "Đỗ Xuân Nam", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:4, UserName: "Đỗ Xuân Mạnh", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:5, UserName: "Đỗ Xuân Hùng", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:6, UserName: "Đỗ Xuân Nhung", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:7, UserName: "Đỗ Xuân Tiến", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:8, UserName: "Đỗ Xuân Sỹ", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:9, UserName: "Đỗ Xuân Đức", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:10, UserName: "Đỗ Xuân Thiết", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:11, UserName: "Đỗ Xuân Ngân", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:12, UserName: "Đỗ Xuân Tuấn", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:13, UserName: "Đỗ Xuân Minh", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:14, UserName: "Đỗ Xuân Nam", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:15, UserName: "Đỗ Xuân Sơn", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:16, UserName: "Đỗ Xuân Tùng", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:17, UserName: "Đỗ Xuân Vĩnh", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:18, UserName: "Đỗ Xuân Thông", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:19, UserName: "Đỗ Xuân Trung", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
  {UserId:20, UserName: "Đỗ Xuân Tuấn", Email:"xuanquang1998tb@gmail.com",phone:'0983090909', Status:'active'},
]



class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 20,
      total: 0,
      data: [],
      progress: false,
      selected: [],
      dataUser: {},
      progress: false,
      modalAddUpdate: false,
      modalDetailUser: false,
      tempDelete:[]
    }
  }

  componentDidMount() {
    this.loadPage()
  }

  loadPage() {
    // let stt = 6
    this.setState({progress:true})
    userProvider.getAll().then(res=>{
      if(res.Code&& res.Code==200){
        this.setState({
          data:res.Data
        })
      }
      else{
        this.setState({
          data:[]
        })
      }
      this.setState({progress:false})
    }).catch(e=>{
      console.log(e)
      this.setState({progress:false})
    })
  }

  handleChangePage = (event, action) => {
    this.setState({
      page: action,
      selected: []
    }, () => {
      this.loadPage()
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ size: event.target.value }, () => {
      this.loadPage()
    });
  };

  closeModal() {
    this.loadPage();
    this.setState({ modalAddUpdate: false, modalDetailUser: false,dataUser:{} });
  }

  modalAddUpdate = () => {
    this.setState({
      modalAddUpdate: true
    })
  }
  modalUpdate = (data)=>{
    this.setState({
      modalAddUpdate:true,
      dataUser:data
    })
  }

  modalDetail= (data)=>{
    this.setState({
      modalDetailUser:true,
      dataUser:data
    })
  }

  
  showModalDelete(item) {
    this.setState({
        confirmDialog: true,
        tempDelete: item
    })
  }

  getAll(){
    userProvider.getAll().then(res=>{
      if(res.Code==200)
        this.setState({
            listUser:res.Data
        })
    }).catch(e=>{
      console.log(e)
    })
  }

  render() {
    const { page, size, total, dataUser, progress, data } = this.state
    return (
      <div>
        <div className="head-page-admin">
          <div className="title-page-admin">
            <h5 className="title-manage-admin">Quản lý User</h5>
          </div>
          <div className="toolbar-admin">
              <TextField
              id="outlined-basic"
              className="input-search"
              label="Tên người dùng"
              margin="normal"
              variant="outlined"
            />
            <Button onClick={this.modalAddUpdate} style={{ marginBottom: 32, float: 'right' }} color="secondary" variant="contained" className="btn-add">Thêm mới</Button>
          </div>
        </div>
        {/* <LinearProgress/> */}
        {progress ? <LinearProgress /> : null}
        <div className="table-wrapper">
          <Table className="table-data-admin" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Họ Tên </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?data.map((item, index) => {
                return (
                  <TableRow key={index}>
              <TableCell onClick={()=>this.modalDetail(item)}>{index+1}</TableCell>
                <TableCell onClick={()=>this.modalDetail(item)}>{item.UserName}</TableCell>
                    <TableCell onClick={()=>this.modalDetail(item)}>{item.Email}</TableCell>
                    <TableCell onClick={()=>this.modalDetail(item)}>{item.PhoneNumber?item.PhoneNumber:""}</TableCell>
                    <TableCell onClick={()=>this.modalDetail(item)}>{item.Roles.map(x=>x)}</TableCell>
                    <TableCell className="icon-sidebar">
                      <Tooltip title="Sửa">
                        <IconButton onClick={()=>this.modalUpdate(item)} color="primary" aria-label="EditIcon">
                          <img src="/images/icon/edit.svg" alt="" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                )
              }):"Không có dữ liệu"}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Số dòng trên trang"
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  count={total}
                  rowsPerPage={size}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {this.state.modalAddUpdate && <ModalAddUpdate data={dataUser} callbackOff={this.closeModal.bind(this)} />}
        {this.state.modalDetailUser && <ModalDetailUser data={dataUser}  callbackOff={this.closeModal.bind(this)} />}
      </div>
    )
  }
}
export default User