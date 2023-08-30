import { useEffect, useState } from 'react';
import './index.css'

const Card = (props) => {
  const { data, dataCountry, dataRegion, dataSector, dataTopic } = props;

  const [filteredSelectedData, setFilteredSelectedData] = useState(null);

  useEffect(() => {
    const filteredItem = data.find(eachItem =>
      eachItem.country === dataCountry &&
      eachItem.region === dataRegion &&
      eachItem.sector === dataSector &&
      eachItem.topic === dataTopic
    );

    if (filteredItem) {
      setFilteredSelectedData(filteredItem);
    } else {
      setFilteredSelectedData(null);
    }
  }, [data, dataCountry, dataRegion, dataSector, dataTopic]);

  if (!filteredSelectedData) {
    return <p className='error-data'>No matching data found</p>;
  }

  return (
    dataRegion === "" ? (
      <p className='error-data'>Please select Region</p>
    ) : (
      <div className="card-container">
        <div className='card'>
          <p className="card-title">{filteredSelectedData.title} ({filteredSelectedData.insight})</p>
          <div className="card-subtexts">
            <p className="card-text"><strong>Added:</strong> {filteredSelectedData.added}</p>
            <p className="card-text"><strong>Published:</strong> {filteredSelectedData.published}</p>
            <p className="card-text"><strong>Relevance:</strong> {filteredSelectedData.relevance}</p>
            <p className="card-text"><strong>PESTLE:</strong> {filteredSelectedData.pestle}</p>
            <p className="card-text"><strong>Source:</strong> {filteredSelectedData.source}</p>
            <p className="card-text"><strong>Likelihood:</strong> {filteredSelectedData.likelihood}</p>
          </div>
          <a className="button" href={filteredSelectedData.url} target="_blank" rel="noopener noreferrer">Source</a>
        </div>
      </div>
    )
  );
}

export default Card;
