import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { Puff } from 'react-loader-spinner';
import './index.css';

const BarGraph = (props) => {
  const { data, country, sector, topic } = props;
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredData = data.filter((entry) => (
      entry.country === country &&
      entry.sector === sector &&
      entry.topic === topic
    ));

    const chartData = filteredData.map((entry) => ({
      yearRange: entry.start_year !== null && entry.end_year !== null
        ? `${entry.start_year}-${entry.end_year}`
        : entry.start_year === null
          ? `Unknown-${entry.end_year}`
          : `${entry.start_year}-Unknown`,
      intensity: entry.intensity,
    }));

    setFetchedData(chartData);
    setIsLoading(false);
  }, [data, country, sector, topic]); // Added 'data' as a dependency

  return (
    <div className='chart-container'>
      {isLoading ?
        <div>
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
        </div> :
        <div className="bar-chart-container">
          <Chart
            width={'100%'}
            height={'500px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={fetchedData}
            options={{
              title: 'Intensity for United States of America',
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

export default BarGraph;
