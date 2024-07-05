import React, { useMemo, version } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import iconoKia from "../Icons/kia.png";
import iconoCuevas from "../Icons/coche2.png";
import iconoChevrolet from "../Icons/chevrolet.png";
import iconoFiat from "../Icons/fiat.png";
import iconoMazda from "../Icons/mazda.png";
import iconoJeep from "../Icons/jeep.png";
import iconoNissan from "../Icons/nissan.png";
import iconoHyundai from "../Icons/hyundai.png";

import "leaflet/dist/leaflet.css";

function Map({ items }) {

    const icoKia = useMemo(() => new Icon({
        iconUrl: iconoKia,
        iconSize: [50, 50]
    }), []);

    const icoChevrolet = useMemo(() => new Icon({
        iconUrl: iconoChevrolet,
        iconSize: [50, 50]
    }), []);

    const icoFiat = useMemo(() => new Icon({
        iconUrl: iconoFiat,
        iconSize: [50, 50]
    }), []);

    const icoJeep = useMemo(() => new Icon({
        iconUrl: iconoJeep,
        iconSize: [50, 50]
    }), []);

    const icoHyundai = useMemo(() => new Icon({
        iconUrl: iconoHyundai,
        iconSize: [50, 50]
    }), []);

    const icoMazda = useMemo(() => new Icon({
        iconUrl: iconoMazda,
        iconSize: [50, 50]
    }), []);

    const icoNissan = useMemo(() => new Icon({
        iconUrl: iconoNissan,
        iconSize: [50, 50]
    }), []);
    

    const nuevoGarden = useMemo(() => new Icon({
        iconUrl: iconoCuevas,
        iconSize: [50, 50]
    }), []);


    const getIcono = (marca) =>{
        switch (marca) {

            case 'jeep':
               return icoJeep
                break
            case 'chevrolet':
                return  icoChevrolet
              break;
            case 'nissan':
                return  icoNissan
              break;
              case 'kia':
               return icoKia
                break
            case 'fiat':
                return  icoFiat
              break;
            case 'mazda':
                return  icoMazda
              break;
              case 'hyundai':
                return  icoHyundai
              break;
            default:
                return  nuevoGarden
          }
          
    }

    return (
        <MapContainer center={[-25.3094, -57.6445]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MarkerClusterGroup>
                {items.map((local, index) => (
                    <Marker key={index} position={[local.latitud, local.longitud]} icon={getIcono(local.desmarca.toLowerCase())}>
                        <Popup>{local.desmarca.toUpperCase() +" - "+ local.desmodelo.toUpperCase()}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}

export default Map;
