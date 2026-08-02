import { Html } from "@react-three/drei";

const countries = [
  {
    code: "IN",
    name: "India",
    status: "ONLINE",
    className: "online",
    position: [-0.55, 0.78, 0.72],
  },
  {
    code: "US",
    name: "USA",
    status: "UNDER ATTACK",
    className: "danger",
    position: [-1.4, 0.55, -1.1],
  },
  {
    code: "DE",
    name: "Germany",
    status: "PROTECTED",
    className: "safe",
    position: [1.55, 1.0, 0.7],
  },
  {
    code: "SG",
    name: "Singapore",
    status: "ONLINE",
    className: "online",
    position: [-0.95, -0.65, 0.6],
  },
];

export default function CountryLabels() {
  return (
    <>
      {countries.map((country) => (
        <Html key={country.code} position={country.position}>
          <div className={`country-label ${country.className}`}>
            <div className="country-top">
              <span className="country-dot"></span>
              <span className="country-code">{country.code}</span>
            </div>

            <div className="country-name">
              {country.name}
            </div>

            <div className="country-status">
              {country.status}
            </div>
          </div>
        </Html>
      ))}
    </>
  );
}