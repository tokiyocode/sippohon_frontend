import L from "leaflet";
import _ from "lodash";
import React, { Component } from "react";
import {
  LayerGroup, LayersControl, MapContainer,
  TileLayer
} from "react-leaflet";
import { getJwt } from "../../services/authService";
import { getAllBankSampah } from "../../services/bankSampahService";
import { getAllPohon } from "../../services/pohonService";
import { getAllRTH } from "../../services/ruangTerbukaHijauService";
import { getAllTPA } from "../../services/tPAService";
import { getAllTPS } from "../../services/tPSService";
import BankSampahMarker from "./BankSampahMarker";
import MapSearchControl from "./MapSearchControl";
import PohonMarker from "./PohonMarker";
import RTHPolygon from "./RTHPolygon";
import TPAMarker from "./TPAMarker";
import TPSMarker from "./TPSMarker";

class Map extends Component {
  state = {
    allPohon: [],
    allBankSampah: [],
    allTPS: [],
    allTPA: [],
    allRTH: [],
    isAuthenticated: "",
    searchQuery: ""
  };

  async componentDidMount() {
    const {data: allPohon} = await getAllPohon();
    const {data: allBankSampah} = await getAllBankSampah();
    const {data: allTPS} = await getAllTPS();
    const {data: allTPA} = await getAllTPA();
    const {data: allRTH} = await getAllRTH();
    const isAuthenticated = await getJwt();
    
    this.setState({allPohon, allBankSampah, allTPS, allTPA, allRTH, isAuthenticated});
  }

  handleSearch = (query) => {
      this.setState({ searchQuery: query});
  }

  getPagedData = () => {
    let {allPohon, allBankSampah, allTPS, allTPA, allRTH, searchQuery} = this.state;
    if (searchQuery) {
        allPohon = allPohon.filter(pohon => (
            pohon.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            pohon.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            pohon.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(pohon.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(pohon.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
        ));

        allBankSampah = allBankSampah.filter(bankSampah => (
            bankSampah.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            bankSampah.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            bankSampah.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(bankSampah.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(bankSampah.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
        ));

        allTPS = allTPS.filter(tps => (
            tps.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            tps.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(tps.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(tps.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
        ));

        allTPA = allTPA.filter(tpa => (
            tpa.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            tpa.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(tpa.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            _.toString(tpa.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
        ));

        allRTH = allRTH.filter(rth => (
          rth.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          rth.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          rth.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase())
        ));
    }

    return {
      allPohon,
      allBankSampah,
      allTPS,
      allTPA,
      allRTH
    }
  }

  render() {
    const {isAuthenticated} = this.state;
    const {allPohon, allBankSampah, allTPS, allTPA, allRTH} = this.getPagedData();
    const iconSize = 100;

    return (
      <MapContainer 
          minZoom={10}
          maxBounds={L.latLngBounds([5.952641, 106.941729], [-6.284723, 122.948503])} 
          center={ [0.90602, 108.987205]} zoom={15} 
          scrollWheelZoom={"center"}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topleft">
          <LayersControl.Overlay checked name="Pohon">
            <LayerGroup>
              <PohonMarker data={allPohon} iconSize={iconSize} isUserAuthenticated={isAuthenticated} />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Bank Sampah">
            <LayerGroup>
              <BankSampahMarker data={allBankSampah} iconSize={iconSize} isUserAuthenticated={isAuthenticated} />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Tempat Pembuangan Sampah">
            <LayerGroup>
              <TPSMarker data={allTPS} iconSize={iconSize} isUserAuthenticated={isAuthenticated} />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Tempat Pembuangan Akhir">
            <LayerGroup>
              <TPAMarker data={allTPA} iconSize={iconSize} isUserAuthenticated={isAuthenticated} />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Ruang Terbuka Hijau">
            <LayerGroup>
              <RTHPolygon data={allRTH} pathOptions={{"color": "purple"}} isUserAuthenticated={isAuthenticated} />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <MapSearchControl onSearch={this.handleSearch} />
      </MapContainer>
    );
  }
}

export default Map;
