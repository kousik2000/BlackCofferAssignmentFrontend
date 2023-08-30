import {useEffect,useState} from 'react'
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { Chart } from "react-google-charts";
import './index.css';
import { Puff } from  'react-loader-spinner'

//useSelector((state) => state);
const BarGraph = (props) => {
  const { country, region, sector, topic } = props;
  const [fetchedData,setFetchedData] = useState({})
  const [isLoading,setIsLoading] = useState(true)
  
  useEffect(() => {
    axios.get(`https://black-coffer-assignment-backend.vercel.app/getIntensity?country=${country}&sector=${sector}&topic=${topic}`)
      .then(response => {
        console.log(response.data);
        console.log(region);
  
        const dataArray = Object.entries(response.data).map(([yearRange, intensity]) => ({
          yearRange,
          intensity,
        }));

        dataArray.sort((a, b) => a.yearRange.localeCompare(b.yearRange));
  
        const chartData = [["Year Range", "Intensity"], ...dataArray.map(item => [item.yearRange, item.intensity])];
  
        setFetchedData(chartData);
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [country, sector, topic, region]);
  
  return (
    <div className='chart-container'>
        {isLoading ?<div>
            
            <Puff
        height="80"
        width="80"
        radius={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        className="loader"
        />
        <p className='error-data'>Data Loading...</p>
        </div>:
        
    <div className="bar-chart-container">
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={fetchedData}
        options={{
            title: `Intensity for ${country}`,
            hAxis: { title: 'Intensity' },
            vAxis: { title: 'Year Range' },
            animation: {
                startup: true,
                duration: 1000, 
                easing: 'out', 
              },
        }}
        rootProps={{ 'data-testid': '1' }}
        />
        </div>
        }
    </div>
  );
  
}

export default BarGraph