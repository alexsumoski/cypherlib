import React, { useState, useEffect } from "react";

const LocationDisplay = () => {
  const [locationInfo, setLocationInfo] = useState({
    latitude: null,
    longitude: null,
    city: "",
    state: "",
    country: "",
    // Add more details as needed
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocationInfo((prevLocation: any) => ({
        ...prevLocation,
        latitude,
        longitude,
      }));

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocationInfo((prevLocation) => ({
            ...prevLocation,
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            state: data.address.state || "",
            country: data.address.country || "",
          }));
        })
        .catch((err) => {
          setError("Failed to fetch location details");
        });
    };

    const handleError = () => {
      setError("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);

  return (
    <div>
      {error ? null : (
        <p className="text-sm text-red-800 text-right">
          {locationInfo.city && <span>{locationInfo.city}</span>}
          {locationInfo.state && <span>, {locationInfo.state}</span>}
          {locationInfo.country && (
            <span>
              ,<br className="hidden sm:block md:hidden" />{" "}
              {locationInfo.country}
            </span>
          )}{" "}
          {locationInfo.latitude}, {locationInfo.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationDisplay;
