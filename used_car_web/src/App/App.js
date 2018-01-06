import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
//import UsedCarProp from '../component_usedcar/usedcarprop';
import httpService from '../Services/http-services';

const http = new httpService();

class App extends Component {
    
    constructor(props){
        super(props);
        
        this.state={ddl_data:[],brandList:[],yearRegisList:[],modelList:[],kmsList:[]};
        this.loadData = this.loadData.bind(this);
        this.loadData();
    }
    
    
    loadData = () =>{
        var self = this;
        http.loadddlAPI().then(data=>{
            console.log(data);
            self.setState({ddl_data:data});
            
            const brandList = data[0].brand;
            const kmsList = data[0].kilometer;
            const yearRegisList = data[0].yearOfRegistration;
            
            self.setState({brandList:brandList.sort()});
            self.setState({kmsList:kmsList.sort()});
            self.setState({yearRegisList:yearRegisList.sort()});
        },err=>{
            console.log("Error occurred:" + err);
        });
    }
    
    loadBrandDDL = () => {
        const list = this.state.brandList.map((brand)=>
            <option value={brand} key={brand}>{brand}</option>
        );
        return (list);     
    }
    
    loadYearRegisDDL = () => {
        const list = this.state.yearRegisList.map((year)=>
            <option value={year} key={year}>{year}</option>
        );
        return (list);     
    }
    loadkmsDDL = () => {
        const list = this.state.kmsList.map((kms)=>
            <option value={kms} key={kms}>&lt;{kms}</option>
        );
        return (list);     
    }
    loadModelList = () => {
        var self = this;
        var selectedBrand = document.getElementById("ddl_brand").value;
        http.getModel(selectedBrand).then(data=>{
            console.log(data);
            self.setState({modelList:data});
            this.loadModelDDL();
        },err=>{
            console.log("Error occurred:" + err);
        });     
    }
    
    loadModelDDL = () => {
        var htmlString = "<option value='Select'>Select</option>";
        for(var i=0;i<this.state.modelList.length;i++)
            {
                htmlString +="<option value="+this.state.modelList[i]+">"+this.state.modelList[i]+"</option>";
            }
        document.getElementById("ddl_model").innerHTML = htmlString;
    }
    
    getAvgPrice = () =>{
        console.log("in getAvgPrice()");
        var selectedBrand = document.getElementById('ddl_brand').value;
        var selectedModel = document.getElementById('ddl_model').value;
        var selectedKms = Number.parseInt(document.getElementById('ddl_kms').value,10);
        var selectedYear = Number.parseInt(document.getElementById('ddl_yearregis').value,10);
        console.log(selectedBrand + selectedModel+selectedKms+selectedYear);
        http.getAvgPrice(selectedBrand,selectedModel,selectedKms,selectedYear).then(data1=>{
            if(data1.length>0)
                {
                    console.log(data1[0].priceAvg);
                    document.getElementById('finalPrice').value = "$" + Math.round(data1[0].priceAvg);        
                }
            else{
                console.log("Not in database");
                    document.getElementById('finalPrice').value = "Not in database"; 
            }
            
        });
        
    }

    
  render() {
    return (
        
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Used Car Price Estimator. Powered by React!</h1>
        </header>
        <p className="App-intro">
          Thank-you for using this application. <br/>This is a demo full stack application built using React and ES6 on the front end, Node.js and Express on the backend and MongoDB as the database. The data for this application is sourced from Kaggle.com and contains over 370,000 used car documents. <br/>If you like it please feel free to contact me on my email dev.amitr@gmail.com, I am looking for a job in the United States and Canada region.  
        </p>
            <div className="App-Usedcar">
                <div className="jumbotron">
                <h3>Please select below options to find an estimated price of your car.</h3>
                <div className="container">
                    <div id="usedcarprops" className="row">
                       <div className="col-sm-3">
                            <p>Brand</p>
                            <select id="ddl_brand" onChange={this.loadModelList}>
                            <option value="select" key="select">Select</option>
                            {
                                 this.loadBrandDDL()   
                            }
                           </select>
                        </div>
                        <div className="col-sm-3">
                            <p>Model</p>
                            <select id="ddl_model">
                            <option value="select" key="select">Select</option>
                           </select>
                        </div>
                        <div className="col-sm-3">
                            <p>Registration Year</p>
                            <select id="ddl_yearregis">
                            <option value="select" key="select">Select</option>
                            {
                                 this.loadYearRegisDDL()   
                            }
                           </select>
                        </div>
                        <div className="col-sm-3">
                            <p>Kilometers</p>
                            <select id="ddl_kms">
                            <option value="select" key="select">Select</option>
                            {
                                 this.loadkmsDDL()   
                            }
                           </select>
                        </div>
                    </div>
                    <br/><br/><br/>
                    
                    <div className="row">
                    <div className="col-sm-4 offset-4">
                        <input type="button" value="Get Price" onClick={this.getAvgPrice}/>
                    </div>
                        </div>
                    <br/>
                    <div className="row">
                    <div className="col-sm-4 offset-4">
                        The price is : <input id="finalPrice" type="textbox" readOnly=""/>
                    </div>
                    </div>
                </div>
           </div>
        </div>
      </div>
        
    );
  }
}

export default App;
