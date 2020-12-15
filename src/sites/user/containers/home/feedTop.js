import React from 'react'
import projectProvider from '../../../../data-access/project-provider'
import Project from './project'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import { ListGroupItem } from 'reactstrap';

class CardTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lstProject: []
        }
    }

    componentDidMount() {
        this.getAllProject()
    }

    getAllProject() {
        projectProvider.getAll({page: 1, per: 10}).then(res => {
            console.log(res)
            this.setState({
                lstProject: res
            })
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        const projects = this.state.lstProject
        return (
            <div className="card-top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8 box-news-hot">

                            <div className="box-title-hot">
                                <h2>Tìm kiếm dự án nổi bật</h2>
                                <a style={{textDecoration: 'none', fontSize: 14}}>Xem tất cả</a>
                            </div>

                            <div className="list-projects">
                            {
                                projects.slice(0, 3).map((item, index) => {
                                    return (
                                        <Project key={index}
                                                title={item.name}
                                                address={item.address}
                                                slug={item.slug}
                                                status={item.status}
                                                totalArea={item.total_area}
                                                releaseAt={item.release_at}
                                                price={item.price_range}
                                                buildStatus={item.build_status}
                                                company={item.company_name}
                                                image={item.image}
                                                companySlug={item.company_slug}
                                                data={item}
                                        />
                                    )

                                })
                            }
                            </div>

                        </div>
                        <div className="col-sm-12 col-md-4 flr box-ads-new-hot">
                            <p className="txt-center mgbt30 ng-scope ads-new-1" >
                                <a target="_blank" >
                                    <img ng-src="https://s3-ap-southeast-1.amazonaws.com/landber/71f3010e-1dd3-454c-905c-8ca2f17c9442.jpg" src="https://s3-ap-southeast-1.amazonaws.com/landber/71f3010e-1dd3-454c-905c-8ca2f17c9442.jpg" />
                                </a>
                            </p>


                            <p className="txt-center ng-scope" >
                                <a target="_blank">
                                    <img ng-src="https://s3-ap-southeast-1.amazonaws.com/landber/a58a467c-a2b8-4260-a550-cf72ea28c1a9.jpg" src="https://s3-ap-southeast-1.amazonaws.com/landber/a58a467c-a2b8-4260-a550-cf72ea28c1a9.jpg" />
                                </a>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CardTop