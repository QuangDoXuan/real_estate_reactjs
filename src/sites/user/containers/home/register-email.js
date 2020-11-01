import React from 'react'


class RegisterEmail extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div className="box-home-bds-dangky clb ng-scope">
            <div className="container txt-center">
              <h2 className="txt-center txt-uppercase font25">Nhận thông tin nhà đất <span className="txt-color-red">miễn phí</span></h2>
              <p className="txt-center mgt10 mgbt20 txt-color-75 font16">Trên 600,000 tin đăng mới mỗi tháng</p>
              <ul className="clb lst-input">
                <li className="fll mgr10 position-re">
                  <i className="fal fa-user position-ab" />
                  <input type="text" placeholder="Họ và tên"  className="ng-pristine ng-untouched ng-valid ng-empty" />
                  <p className="position-ab txt-color-red txt-center ng-binding" />
                </li>
                <li className="fll mgr10 position-re">
                  <i className="fal fa-envelope position-ab" />
                  <input type="email" placeholder="Email"  className="ng-pristine ng-untouched ng-valid ng-empty ng-valid-email" />
                  <p className="position-ab txt-color-red txt-center ng-binding" />
                </li>
                <li className="fll mgr10 position-re">
                  <i className="fal fa-phone-volume position-ab" />
                  <input type="tel" placeholder="Số điện thoại"  className="ng-pristine ng-untouched ng-valid ng-empty" />
                  <p className="position-ab txt-color-red txt-center ng-binding" />
                </li>
                <li className="fll">
                  <button className="txt-uppercase btn-messenger-free">Nhận tin miễn phí</button>
                </li>
              </ul><br/>
              <p className="txt-center mgt25 txt-color-75 font16 " style={{display:'inline-block',marginTop:20}}>Click vào Nhận tin miễn phí là bạn sẽ nhận được email của chúng tôi mỗi ngày</p>
              <p className="txt-center font25 txt-color-blue"><b className="ng-binding" /></p>
            </div>
          </div>
        )
    }
}
export default RegisterEmail