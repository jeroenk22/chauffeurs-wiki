export const isWithinGeofence = (
  lat: number,
  lon: number,
  targetLat: number,
  targetLon: number,
  radius: number
): boolean => {
  const distance = Math.sqrt(
    Math.pow(lat - targetLat, 2) + Math.pow(lon - targetLon, 2)
  );
  return distance <= radius;
};
