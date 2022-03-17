import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() title: string;

  @Input() datos: {
    startIcon?: string;
    startFunction?: () => void;
    endIcon?: string;
    endFunction?: () => void;
  };

  constructor(
    public menu: MenuService
  ) { 
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {

  }


}
