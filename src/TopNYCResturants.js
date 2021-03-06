import React from "react";

class TopNYCResturants extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantDetails: [],
            map: null
        }
    }

    getResturantDetails() {
        var requestOptions = {
            method: 'GET',
        };
          
        fetch("https://lostmindsbackend.vercel.app/resturants", requestOptions)
        .then(response => response.text())
        .then(response => {
            console.log("Response: " + response);   
            var resyJson = JSON.parse(response);        
            
            resyJson['doc'].forEach(resturant => {                
                const res = {
                    region: resturant['region'],
                    name: resturant['name'],  
                    address: resturant['address'],
                    topDish: resturant['topDish']

                }
                console.log("Res: " + res);    
                let resturants = this.state.resturantDetails;                 
                resturants.push(res);
                this.setState({ resturantDetails: resturants });     
            });               
        })
        .catch(error => console.log('error', error));
    }

    async componentDidMount() {        

        this.getResturantDetails();

        this.initMap();
        
    }

    initMap() {        
        const newyork_coordinates = { lat: 40.730610, lng: -73.935242 };
        const obao_coordinates = { lat: 40.760791677448, lng: -73.99108110247444 };
        const kimoto_coordinates = { lat: 40.691767094535386, lng: -73.98417049147238 };
        const kyuramen_coordinates = { lat: 40.76068852504462, lng: -73.83318746086162 };
        const zero_otto_nove_coordinates = { lat: 40.865034316201864, lng: -73.88190799012268 };
        const nino_coordinates = { lat: 40.601918794866485, lng: -74.07553232400136 };

        var map = new window.google.maps.Map(document.getElementById("map"), {
            center: newyork_coordinates,
            zoom: 10,
        });

          // The marker, positioned at Uluru
        const obao_marker = new window.google.maps.Marker({
            position: obao_coordinates,
            map: map,
        });

        const kimoto_marker = new window.google.maps.Marker({
            position: kimoto_coordinates,
            map: map,
        });

        const kyuramen_marker = new window.google.maps.Marker({
            position: kyuramen_coordinates,
            map: map,
        });

        const zero_otto_nove_marker = new window.google.maps.Marker({
            position: zero_otto_nove_coordinates,
            map: map,
        });

        const nino_marker = new window.google.maps.Marker({
            position: nino_coordinates,
            map: map,
        });


    }

    render() {            
        const resturantDetails = this.state.resturantDetails        
        const resturantsList = resturantDetails.map((resturant) => 
            <div style = { {textAlign: "center"} }  >        
                <h2> { resturant.name } </h2>        
                {/* <div> { resturant.region } </div>           */}
                <div> { resturant.address } </div>             
                {/* <div> Recommended dish : { resturant.topDish } </div> */}
            </div>
        );

        

        return (<div>             
            <h1> July, 2020 top resturants in each New York borough </h1>
                 
            { resturantsList }

            <div id="map"></div>
     
        </div>)
    }
}

export default TopNYCResturants