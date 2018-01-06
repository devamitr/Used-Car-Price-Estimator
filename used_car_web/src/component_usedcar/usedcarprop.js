import React,{Component} from 'react';
import './usedcar.css';

class UsedCar extends Component{
    render(){
        return(
        <div className="col-sm-3">
                            <p>this.props.proptitle</p>
                            <select id="ddl_brand">
                            <option value="select" key="select">Select</option>
                            {
                                 this.{this.props.functionname}()   
                            }
                           </select>
                        </div>
        );
    }
} 

export default UsedCar;