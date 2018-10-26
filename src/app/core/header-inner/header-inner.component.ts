import { Component } from '@angular/core';

import { ContentComponent } from 'library/angular-admin-lte/src/lib/layout/content/content.component';
@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html',
  providers:[ ContentComponent ]
})
export class HeaderInnerComponent {
  
  public header:string;

  constructor(private head:ContentComponent){}

  ngOnInit() {
    this.head.getHeaderTitle((value) => {
      // do something here
      if (value && value[value.length - 1]) {
      this.header = value[value.length - 1].data['title'];
      }
  });

  }
}
