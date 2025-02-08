import {Component} from 'react'
import Styles from "./map.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import React from 'react'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlsbG9kZXNpZ24iLCJhIjoiY2w1aXhxcm5pMGIxMTNsa21ldjRkanV4ZyJ9.ztk5_j48dkFtce1sTx0uWw';

export default class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			lat: props.lat,
      		lng: props.lng,
      		zoom: props.zoom,
      		myMap: null
		};

		this.loadMap = this.loadMap.bind(this)
		this.flyTo = this.flyTo.bind(this)
		this.startSpinGlobe = this.startSpinGlobe.bind(this)

		this.mapContainer = React.createRef();
	}

	async startSpinGlobe(myMap){
		 // The following values can be changed to control rotation speed:

		let map = myMap

	    // At low zooms, complete a revolution every two minutes.
	    const secondsPerRevolution = 60;
	    // Above zoom level 5, do not rotate.
	    const maxSpinZoom = 5;
	    // Rotate at intermediate speeds between zoom levels 3 and 5.
	    const slowSpinZoom = 3;

	    let userInteracting = false;
	    let spinEnabled = true;

	    function spinGlobe() {
	    	const zoom = map.getZoom();
	        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
	            let distancePerSecond = 360 / secondsPerRevolution;
	            if (zoom > slowSpinZoom) {
	                // Slow spinning at higher zooms
	                const zoomDif =
	                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
	                distancePerSecond *= zoomDif;
	            }
	            const center = map.getCenter();
	            center.lng -= distancePerSecond;
	            // Smoothly animate the map over one second.
	            // When this animation is complete, it calls a 'moveend' event.
	            map.easeTo({ center, duration: 1000, easing: (n) => n });
	        }
	    }
        

        map.on('mousedown', () => {
        	userInteracting = true;
    	});

	    // Restart spinning the globe when interaction is complete
	    map.on('mouseup', () => {
	        userInteracting = false;
	        // spinGlobe();
	    });

	    // These events account for cases where the mouse has moved
	    // off the map, so 'mouseup' will not be fired.
	    map.on('dragend', () => {
	        userInteracting = false;
	        // spinGlobe();
	    });
	    map.on('pitchend', () => {
	        userInteracting = false;
	        // spinGlobe();
	    });
	    map.on('rotateend', () => {
	        userInteracting = false;
	        // spinGlobe();
	    });

	    // When animation is complete, start spinning if there is no ongoing interaction
	    map.on('moveend', () => {
	        // spinGlobe();
	    });   

	    // spinGlobe();
	}


	async loadMap(){
		const { lng, lat, zoom } = this.state;
		
		const  mobileOrNot = window.matchMedia("(max-width: 800px)");
		const attractions = this.props.data;

    	// console.log("MOBILE ?",mobileOrNot.matches);

    	const optimalZoom = mobileOrNot.matches && attractions.length >1 ? 1.2 : zoom ;

	    const map = new mapboxgl.Map({
	        container: this.mapContainer.current,
	        style: 'mapbox://styles/hillodesign/clb95v8zd000v15nudmodao0i',
	        center: [lng, lat],
	        zoom: parseInt(zoom)
	    });

	    // console.log(attractions);
 
	    if (attractions.length > 1){
	    	attractions.map(attraction => {
	    		const long = attraction.lng
	        	const lat = attraction.lat

	        	const popup = new mapboxgl
	        		.Popup({ 
	        			anchor: 'bottom-left', 
	        			offset: 25, 
	        			closeOnClick: true
	        		})
	        		.setMaxWidth('360px')
	        		.setHTML(`
	        			<a href=${attraction.id}>
	        				<h3> ${attraction.title} </h3>
	        			</a>
	        		`)

	        	const marker = new mapboxgl
	        	    .Marker({
	        	    	color: `black`,
	        	    	occludedOpacity: 0.1
	        	    })
	        	    .setLngLat([long,lat])
	        	    .setPopup(popup)
	        	    .addTo(map)
		    	})

	    		this.setState({currentMarker: marker})

	    } else {
	    	const long = attractions.lng
        	const lat = attractions.lat

        	const marker = new mapboxgl
        	    .Marker({
	        	    color: `black`,
	        	    occludedOpacity: 0.1
	        	})
        	    .setLngLat([long, lat])
        	    .addTo(map)

        	this.setState({currentMarker: marker})
	    }

	    this.startSpinGlobe(map)

	    this.setState({
	    	myMap: map
	    })
	}

	async flyTo(event){
		const currentMarker = this.state.currentMarker
		currentMarker.remove()
		const lng = event.target.dataset.lng
   		const lat = event.target.dataset.lat
   		const map = this.state.myMap

   		const marker = new mapboxgl
    	    .Marker({
        	    color: `black`,
        	    occludedOpacity: 0.1
        	})
    	    .setLngLat([lng, lat])
    	    .addTo(map)
		
        map.flyTo({
        	center: [lng, lat],
        	zoom: this.props.zoom,
        })

        this.setState({
        	currentMarker: marker
        })
	}

	componentDidMount(){
		this.loadMap()
	}

	render(){
		return (
			<div>
				<span id="trigger" onClick={this.flyTo}>
				</span>
				<div 
					style={{
						width: `${this.props.width}`,
						height: `${this.props.height}`
					}}
					className={Styles.map} 
					ref={this.mapContainer}
				>
				</div>
			</div>
		)
	}
}