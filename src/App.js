import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCountry , addRegion, addSector, addTopic} from './action';
import BarGraph from './components/BarGraph';
import Card from './components/Card';
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("select");
  const [countryList, setCountryList] = useState([]);
  const [region, setRegion] = useState("select");
  const [regionList, setRegionList] = useState([])
  const [sector, setSector] = useState("select");
  const [sectorsList,setSectorsList] = useState([])
  const [topic, setTopic] = useState("select");
  const [topicList, setTopicList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/getdata')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);

        const uniqueCountries = [...new Set(data.map(item => item.country))];
        setCountryList(uniqueCountries);

        const uniqueRegions = [...new Set(data.map(item => item.region))];
        setRegionList(uniqueRegions);

        const uniqueSectors = [...new Set(data.map(item => item.sector))];
        setSectorsList(uniqueSectors);

        const uniqueTopics = [...new Set(data.map(item =>{
            if (item.sector=== sector){
                return item.topic;
            }
            return null
        }))];
        setTopicList(uniqueTopics);
          

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [sector]);

  const onCountryChange = (event) => {
    setCountry(event.target.value);
    const regionsForSelectedCountry = data
      .filter(item => item.country === event.target.value)
      .map(item => item.region);

    const uniqueRegions = [...new Set(regionsForSelectedCountry)];
    setRegionList(uniqueRegions);
    dispatch(addCountry(event.target.value));
  }

  const onSectorChange = (event) => {
    setSector(event.target.value);
    const topicForSelectedSector = data
      .filter(item => item.sector === event.target.value)
      .map(item => item.topic);

    const uniqueTopics = [...new Set(topicForSelectedSector)];
    setTopicList(uniqueTopics);
    dispatch(addSector(event.target.value));
  }

  const updatedCountryList = countryList.map(countryName => countryName === "" ? "Others" : countryName);
  const updatedRegion = regionList.map(regionName => regionName === "" ? "Others" : regionName);
  const updatedSectorList = sectorsList.map(sectorName => sectorName === "" ? "Others" : sectorName);
  const updatedTopicList = topicList.map(topicName => topicName === "" ? "Others" : topicName);

  return (
    <div className='bg-container'>
      
    <div className="nav-filter-container">
      <h1 className="main-head">Data Visualization</h1>
    </div>
    <div className="selections-container">
      <div className="select">
        <label className="label" htmlFor='country'>Select Country:</label><br/>
        <select value={country} onChange={onCountryChange} id="country">
          <option value='select'>Select</option>
          {updatedCountryList.map((eachCountry, index) => (
            <option key={index}>{eachCountry}</option>
          ))}
        </select>
      </div>

      <div className="select">
        <label className="label" htmlFor='region'>Select Region:</label><br/>
        <select value={region} id="region" onChange={(e) => {
          setRegion(e.target.value);
          dispatch(addRegion(e.target.value));
        }}>
          <option value='select'>Select</option>
          {updatedRegion.map((eachRegion, index) => (
            <option key={index}>{eachRegion}</option>
          ))}
        </select>
      </div>

      <div className="select">
        <label className="label" htmlFor='sector'>Select Sector:</label><br/>
        <select value={sector} onChange={onSectorChange} id="sector">
          <option value='select'>Select</option>
          {updatedSectorList.map((eachSector, index) => (
            <option key={index}>{eachSector}</option>
          ))}
        </select>
      </div>

      <div className="select">
        <label className="label" htmlFor='topic'>Select Sector:</label><br/>
        <select value={topic} id="topic" onChange={(e) =>{
          setTopic(e.target.value)
          dispatch(addTopic(e.target.value));
        }}>
          <option value='select'>Select</option>
          {updatedTopicList.map((eachTopic, index) => (
            <option key={index}>{eachTopic}</option>
          ))}
        </select>
      </div>
      </div>
      <BarGraph country={country} region={region} sector={sector} topic={topic}/>
      <Card data={data} dataCountry={country} dataRegion={region} dataSector={sector} dataTopic={topic}/>
    </div>
  );
}

export default App;
