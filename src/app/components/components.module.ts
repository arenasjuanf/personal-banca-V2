import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

const components = [
    HeaderComponent
];

@NgModule({
    imports:[IonicModule, CommonModule, FormsModule, RouterModule],
    declarations: components,
    entryComponents: [],
    exports: components
})
export class ComponentsModule {}
