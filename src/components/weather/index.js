import { Component } from "react";
import "./index.css"
import { BallTriangle } from 'react-loader-spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {
  state = {
    location: "",
    data: "",
    msg: "",
    isLoading: false
  };

  fetchData = async () => {
    this.setState({isLoading:true,data:"",msg:""})
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0074c8d95d334a64942134433242106&q=${this.state.location}`);
      if (response.ok) {
        const fetchedData = await response.json();
        this.setState({ data: fetchedData });
        console.log(fetchedData);
      } else {
        this.setState({ msg: "Location not found" });
      }
    } catch (error) {
      console.error(error);
      this.setState({ msg: "Error fetching data" });
    }
    this.setState({isLoading:false})
  };

  render() {
    const { location, data, msg, isLoading} = this.state;
    return (
      <div className="weather-dashboard">
        <h1 className="main-heading"><span>W</span>eather <span>D</span>ashboard</h1>
        <p className="main-paragraph">
          Stay ahead of the storm with our <span>real-time</span> weather dashboard, featuring instant updates, <br />detailed forecasts, and interactive maps to keep you informed and prepared.
        </p>
        <div className="input-container">
          <input type="text" placeholder="Enter Location Name" className="search" value={location} onChange={(event) => this.setState({ location: event.target.value })} />
          <button className="btn btn-primary" onClick={this.fetchData}>Search</button>
        </div>
        <div>
            {msg ? <p className="error-message">{msg}</p>: ""}
        </div>
        <div className="content">
            {isLoading ? (<BallTriangle
                            height={100}
                            width={100}
                            radius={5}
                            color="#FFFFFF"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />)
            :
            (
                <div>
                {data && (
                    <div className="weather-data">
                        <ul className="list-container">
                            <li><span className="li">Location:</span>  {data.location.name}</li>
                            <li><span className="li">Region: </span> {data.location.region}</li>
                            <li> <span className="li">Country:</span> {data.location.country}</li>
                            <li> <span className="li">Present Time:</span> {data.location.localtime}</li>
                        </ul>
                        <ul className="list-container">
                            <li> <span className="li">Temperature:</span> {data.current.temp_c}°C</li>
                            <li><span className="li">Condition: </span> {data.current.condition.text}</li>
                            <li> <span className="li">Real feel:</span> {data.current.feelslike_c}°</li>
                            <li><span className="li">Humidity:</span>  {data.current.humidity}%</li>
                            <li><span  className="li">Last Updated: </span> {data.current.last_updated}</li>
                            <li><span className="li">Pressure: </span> {data.current.pressure_mb}mbar</li>
                        </ul>
                    </div>
                    )}
                </div>
            )}
        </div>
      </div>
    );
  }
}

export default Dashboard;