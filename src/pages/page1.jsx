import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Page1() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://automateapi.vercel.app/v1/drivers-info')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setDrivers(data.drivers);
        }
      })
      .catch((error) => console.error('Error fetching drivers:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDriverClick = (driverId) => {
    localStorage.setItem('selectedDriverId', driverId);
  };

  return (
    <div className="page1">
      <div className="page1head">Driver Dashboard</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="driverprofiles">
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <Link
                to={`/driver`}
                className="card"
                key={driver.id}
                onClick={() => handleDriverClick(driver.id)}
              >
                <div className="image">
                  <img
                    src={driver.image}
                    alt="Driver Image"
                    className="driverimage"
                  />
                </div>
                <div className="details">
                  <div className="drivernamestatus">
                    <div className="name">{driver.name}</div>
                  </div>
                  <div className="idstatus">
                    <div className="driverid">ID : {driver.id}</div>
                    <div
                      className="status"
                      style={{
                        border: driver.status
                          ? '1px solid greenyellow'
                          : '1px solid red',
                      }}
                    >
                      <div
                        className="statustag"
                        style={{
                          backgroundColor: driver.status
                            ? 'greenyellow'
                            : 'red',
                        }}
                      ></div>
                      <div
                        className="statusname"
                        style={{
                          color: driver.status ? 'greenyellow' : 'red',
                        }}
                      >
                        {driver.status ? 'Available' : 'Unavailable'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No drivers found.</p>
          )}
        </div>
      )}
    </div>
  );
}
