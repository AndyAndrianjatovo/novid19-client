import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Map, NavigationControl } from 'maplibre-gl';
import { Centre } from 'src/app/models/centre';
import { Lieu } from 'src/app/models/lieux';
import { CentreService, FAKE_CENTRE } from 'src/app/services/centre.service';
import { ELEMENT_DATA, LieuxService } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss'],
})
export class CarteComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  lieux: Lieu[] = [];
  centres: Centre[] = [];
  centreActive: boolean = true;
  lieuActive: boolean = true;

  centreSelected: Centre = {
    id_centre: -1,
    nom_centre: '',
    coordonnees_centre: '',
    adresse_centre: '',
  };
  lieuSelected: Lieu = {
    _id: -1,
    nom_lieu: '',
    coordonnees_lieu: '',
    adresse_lieu: '',
    statut_lieu: -1,
  };

  reinitialise() {
    this.centreSelected = {
      id_centre: -1,
      nom_centre: '',
      coordonnees_centre: '',
      adresse_centre: '',
    };
    this.lieuSelected = {
      _id: -1,
      nom_lieu: '',
      coordonnees_lieu: '',
      adresse_lieu: '',
      statut_lieu: -1,
    };
  }

  constructor(
    private centreService: CentreService,
    private lieuxService: LieuxService
  ) {}

  ngOnInit(): void {
    // this.getAllLieux();
    // this.getAllCentres();
    this.getAllLieuxFake();
    this.getAllCentresFake();
  }

  ngAfterViewInit() {
    const myAPIKey = 'INHNEiu4KVMuns0EBjFv';
    const mapStyle = 'https://api.maptiler.com/maps/streets/style.json';

    const initialState = { lng: 47.516667, lat: -18.933333, zoom: 12 };

    const map = new Map({
      container: this.mapContainer.nativeElement,
      style: `${mapStyle}?key=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    this.map = map;
    this.map.addControl(new NavigationControl());

    this.map.on('load', (e) => {
      let markers1 = document.getElementsByClassName('markerIconLieux');
      for (let i = 0; i < markers1.length; i++) {
        markers1[i].remove();
      }
      let markers2 = document.getElementsByClassName('markerIconCentre');
      for (let i = 0; i < markers2.length; i++) {
        markers2[i].remove();
      }

      this.setMarkersCentres(this.centres);
      this.setMarkersLieux(this.lieux);

      this.map = map;
    });
  }
  ngOnDestroy() {
    this.map?.remove();
  }
  getAllCentres() {
    this.centreService.getCentres().subscribe((data: Centre[]) => {
      this.centres = data;
    });
  }

  getAllLieux() {
    // this.lieux = ELEMENT_DATA;

    this.lieuxService.getLieux().subscribe((data: any) => {
      this.lieux = data.docs;
    });
  }
  getAllLieuxFake() {
    this.lieux = ELEMENT_DATA;
  }
  getAllCentresFake() {
    this.centres = FAKE_CENTRE;
  }

  desactiveLieu() {
    if (this.lieuActive) {
      while (document.getElementsByClassName('markerIconLieux').length > 0) {
        let markers = document.getElementsByClassName('markerIconLieux');
        markers[0].remove();
      }
      this.lieuActive = false;
    } else {
      this.setMarkersLieux(this.lieux);
      this.lieuActive = true;
    }
  }
  desactiveCentre() {
    if (this.centreActive) {
      let markers = document.getElementsByClassName('markerIconCentre');
      console.log(markers.length);
      for (let i = 0; i < markers.length; i++) {
        markers[i].remove();
        console.log(markers[i] + ' ' + i);
      }
      this.centreActive = false;
    } else {
      this.setMarkersCentres(this.centres);
      this.centreActive = true;
    }
  }
  setMarkersCentres(tab: Centre[]) {
    for (let i = 0; i < tab.length; i++) {
      let lng = tab[i].coordonnees_centre.split(',')[0];
      let lat = tab[i].coordonnees_centre.split(',')[1];
      var monument: [number, number] = [+lng, +lat];
      var el = document.createElement('div');
      el.id = 'marker';
      el.style.backgroundImage =
        'url(../../../assets/img/icon/marker-centre.png)';
      el.style.backgroundSize = 'cover';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.classList.add('markerIconCentre');
      el.addEventListener('click', () => {
        var m: [number, number] = [+lng, +lat];
        this.map!.setCenter(m);
        this.map!.setZoom(16);
        this.reinitialise();
        this.centreSelected = tab[i];
      });
      // create the marker
      new maplibregl.Marker(el).setLngLat(monument).addTo(this.map!);
    }
  }
  setMarkersLieux(tab: Lieu[]) {
    for (let i = 0; i < tab.length; i++) {
      let lng = tab[i].coordonnees_lieu.split(',')[0];
      let lat = tab[i].coordonnees_lieu.split(',')[1];
      var monument: [number, number] = [+lng, +lat];
      var el = document.createElement('div');
      el.id = 'marker';

      if (tab[i].statut_lieu == 1) {
        el.style.backgroundImage =
          'url(../../../assets/img/icon/marker-lieu-ok.png)';
      } else {
        el.style.backgroundImage =
          'url(../../../assets/img/icon/marker-lieu-ko.png)';
      }

      el.style.backgroundSize = 'cover';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.classList.add('markerIconLieux');
      el.addEventListener('click', () => {
        var m: [number, number] = [+lng, +lat];
        this.map!.setCenter(m);
        this.map!.setZoom(16);
        this.reinitialise();
        this.lieuSelected = tab[i];
      });
      // create the marker
      new maplibregl.Marker(el).setLngLat(monument).addTo(this.map!);
    }
  }

  getStatuts(statut: number) {
    switch (statut) {
      case 1:
        return 'Sain';
      case 2:
        return 'Infecté';

      default:
        return 'Inconnu';
    }
  }
}
