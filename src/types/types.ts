export interface Location {
  id: string;
  name: string;
  address: string;
  status: string;
  postcode: string;
  city: string;
  country: string;
  description: string;
  images: string[];
  lastModified: string;
  modifiedBy: string;
  LatLngNewEntry?: { lat: number; lng: number };
  LatLngLastModified?: { lat: number; lng: number };
}
