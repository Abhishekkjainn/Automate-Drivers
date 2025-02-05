import { useEffect, useState } from 'react';

export default function Page2() {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
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

  // Filter function
  const filteredRides = driverData?.rideDetails?.filter((ride) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      ride.pickup.toLowerCase().includes(query) ||
      ride.drop.toLowerCase().includes(query) ||
      ride.passengerName.toLowerCase().includes(query) ||
      ride.passengerPhone.includes(query) ||
      ride.finalFare.toString().includes(query) ||
      ride.date.includes(query) ||
      ride.time.includes(query);

    if (filter === 'paid') return matchesSearch && ride.paymentStatus;
    if (filter === 'unpaid') return matchesSearch && !ride.paymentStatus;
    if (filter === 'cancelled') return matchesSearch && ride.cancelled;
    return matchesSearch;
  });

  return (
    <div className="page2">
      {loading ? (
        <p>Loading...</p>
      ) : driverData ? (
        <div className="driver-info">
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

          <h3 className="ridehistorytag">Ride History</h3>

          {/* Search Bar */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search rides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'active' : 'tab'}
            >
              All
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={filter === 'paid' ? 'active' : 'tab'}
            >
              Paid
            </button>
            <button
              onClick={() => setFilter('unpaid')}
              className={filter === 'unpaid' ? 'active' : 'tab'}
            >
              Unpaid
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={filter === 'cancelled' ? 'active' : 'tab'}
            >
              Cancelled
            </button>
          </div>

          {filteredRides.length > 0 ? (
            <div className="ridecarddiv">
              {filteredRides.map((ride, index) => (
                <div className="ridecard" key={index}>
                  <div className="pickupdrop">
                    {index + 1}. {ride.pickup} to {ride.drop}
                  </div>
                  <div className="passengersdatetime">
                    Passengers: {ride.passengers} | Date - {ride.date}
                  </div>
                  <div className="nighthosteltotalfare">
                    <img
                      src={ride.night ? '/moon.png' : 'day.png'}
                      alt="Night"
                      className="night"
                    />
                    <img
                      src={ride.hostel ? '/hostel.png' : ''}
                      alt=""
                      className="hostel"
                    />
                    <div className="totalFare">
                      Total Fare - {ride.finalFare} | {ride.passengerName} -{' '}
                      {ride.passengerPhone}
                    </div>
                  </div>
                  <div className="buttons">
                    <div className="markaspaid">
                      Mark as Paid
                      <img src="/done.png" alt="done" className="paidimg" />
                    </div>
                    <div className="markascancelled">
                      Mark Cancelled
                      <img src="/cancel.png" alt="cancel" className="paidimg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
