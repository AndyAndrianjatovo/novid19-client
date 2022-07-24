import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lieu } from 'src/app/models/lieux';
import { ELEMENT_DATA, LieuxService } from 'src/app/services/lieux.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss'],
})
export class DetailLieuxComponent implements OnInit {
  lieu!: Lieu;
  lieuxFake: Lieu[] = ELEMENT_DATA;

  constructor(
    private lieuxService: LieuxService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      const id: number = +this.route.snapshot.paramMap.get('id')!;
      // this.lieuxService.getLieu(id).subscribe((lieu) => {
      //   this.lieu = lieu;
      // });
      this.lieuxFake.filter((lieu) => {
        if (lieu._id === id) {
          this.lieu = lieu;
        }
      });
    }
  }
  public convetToPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data!).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }
}
