'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap as useLeafletMap } from 'react-leaflet';
import L from 'leaflet';
import { useMap } from '@/providers/MapContext';
import { useFilter } from '@/providers/FilterContext';
import { Location, Category } from '@/types/location';
import { MAP_CONFIG } from '@/utils/constants';
import 'leaflet/dist/leaflet.css';

const createIcon = (emoji: string, isSelected: boolean = false) => {
  return L.divIcon({
    html: `
      <div style="
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: ${isSelected ? 'drop-shadow(0 0 6px #D4AF37)' : 'none'};
        transition: filter 0.2s ease;
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const getIcon = (category: Category, isSelected: boolean) => {
  if (isSelected) {
    switch (category) {
      case 'mountain': return createIcon('🏔️', true);
      case 'river': return createIcon('🌊', true);
      case 'temple': return createIcon('🛕', true);
    }
  }
  switch (category) {
    case 'mountain': return createIcon('🏔️');
    case 'river': return createIcon('🌊');
    case 'temple': return createIcon('🛕');
  }
};

interface MarkerLayerProps {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
}

function MarkerLayer({ locations, onMarkerClick }: MarkerLayerProps) {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();

  const filteredLocations = locations.filter(loc => activeFilters[loc.category]);

  return (
    <>
      {filteredLocations.map(location => {
        const isSelected = selectedLocation?.id === location.id;
        const icon = getIcon(location.category, isSelected);

        return (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => onMarkerClick(location),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-base mb-1">{location.name}</h3>
                {location.nameHindi && (
                  <p className="text-sm opacity-80 mb-2">{location.nameHindi}</p>
                )}
                <button
                  onClick={() => onMarkerClick(location)}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

interface MapViewProps {
  center: [number, number];
  zoom: number;
}

function MapView({ center, zoom }: MapViewProps) {
  const map = useLeafletMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

interface CulturalMapProps {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
}

export function CulturalMap({ locations, onMarkerClick }: CulturalMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-textSecondary">Loading map...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={MAP_CONFIG.CENTER}
      zoom={MAP_CONFIG.INITIAL_ZOOM}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution={MAP_CONFIG.TILE_ATTRIBUTION}
        url={MAP_CONFIG.TILE_URL}
      />
      <MapView center={MAP_CONFIG.CENTER} zoom={MAP_CONFIG.INITIAL_ZOOM} />
      <MarkerLayer locations={locations} onMarkerClick={onMarkerClick} />
    </MapContainer>
  );
}
