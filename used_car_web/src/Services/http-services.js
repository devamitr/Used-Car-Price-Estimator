import 'whatwg-fetch';

class httpService {
    loadddlAPI = () => {
        var promise = new Promise((resolve, reject) => {
            //write the fetch code to get data from api
            fetch('http://localhost:3000/loadddl').then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }

    getModel = (brand) => {
        var promise = new Promise((resolve, reject) => {
            //write the fetch code to get data from api

            fetch('http://localhost:3000/getmodels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    brand: brand
                })
            }).then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }

    getAvgPrice = (brand, model, kilometer, yearRegis) => {
        var promise = new Promise((resolve, reject) => {
            //write the fetch code to get data from api

            fetch('http://localhost:3000/getexpectedprice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    brand: brand,
                    kms: kilometer,
                    regisYear: yearRegis,
                    model: model
                })
            }).then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }
}
//https://jsonplaceholder.typicode.com/posts/1
//

export default httpService;
