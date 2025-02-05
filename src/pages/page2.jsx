import { useEffect, useState } from 'react';

export default function Page2() {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const driverId = localStorage.getItem('selectedDriverId');

  useEffect(() => {
    if (!driverId) {
      console.error('No driver ID found in localStorage');
      setLoading(false);
      return;
    }

    fetch(`https://automateapi.vercel.app/v1/rides/driverId=${driverId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setDriverData(data.data);
        } else {
          console.error('Error fetching rides:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching rides:', error))
      .finally(() => setLoading(false));
  }, [driverId]);

  return (
    <div className="page2">
      {/* <div className="driverheadpage2">Driver Ride Details</div> */}

      {loading ? (
        <p>Loading...</p>
      ) : driverData ? (
        <div className="driver-info">
          {/* <h3>Driver: {driverData.driverName}</h3>
          <p>
            <strong>Total Rides:</strong> {driverData.totalRides}
          </p>
          <p>
            <strong>Rides Paid:</strong> {driverData.ridesPaid}
          </p>
          <p>
            <strong>Balance to be Paid:</strong> ₹{driverData.balanceToBePaid}
          </p> */}

          <div className="driverdata">
            <div className="drivernameid">
              {driverData.driverName} - {driverId}
            </div>
            <div className="driverspecs">
              <div className="carddriver">
                <div className="carddriverhead">Total Rides</div>
                <div className="value">{driverData.totalRides}</div>
              </div>
              <div className="carddriver">
                <div className="carddriverhead">Rides Paid</div>
                <div className="value">{driverData.ridesPaid}</div>
              </div>
              <div className="carddriver">
                <div className="carddriverhead">Balance</div>
                <div className="value">{driverData.balanceToBePaid}</div>
              </div>
            </div>
          </div>

          <h3>Ride History</h3>
          {driverData.rideDetails.length > 0 ? (
            <ul>
              {driverData.rideDetails
                .slice()
                .reverse()
                .map((ride, index) => (
                  <li key={index} className="ride-card">
                    <p>
                      <strong>Pickup:</strong> {ride.pickup}
                    </p>
                    <p>
                      <strong>Drop:</strong> {ride.drop}
                    </p>
                    <p>
                      <strong>Passengers:</strong> {ride.passengers}
                    </p>
                    <p>
                      <strong>Date & Time:</strong> {ride.date}, {ride.time}
                    </p>
                    <p>
                      <strong>Night Ride:</strong> {ride.night ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <strong>Hostel Drop:</strong> {ride.hostel ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <strong>Fare:</strong> ₹{ride.finalFare}
                    </p>
                    <p>
                      <strong>Passenger:</strong> {ride.passengerName} (
                      {ride.passengerPhone})
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{' '}
                      {ride.paymentStatus ? 'Paid' : 'Unpaid'}
                    </p>
                    <p>
                      <strong>Cancelled:</strong>{' '}
                      {ride.cancelled ? 'Yes' : 'No'}
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No rides found.</p>
          )}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
