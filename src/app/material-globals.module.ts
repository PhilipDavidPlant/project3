import { NgModule } from '@angular/core'; 
import {
    MdButtonModule, 
    MdCheckboxModule,
    MdListModule,
    MdTabsModule,
    MdToolbarModule,
    MdInputModule
} from '@angular/material';

@NgModule({
    imports: [
        MdButtonModule, 
        MdCheckboxModule,
        MdListModule,
        MdTabsModule,
        MdToolbarModule,
        MdInputModule
    ],
    exports: [
        MdButtonModule, 
        MdCheckboxModule,
        MdListModule,
        MdTabsModule,
        MdToolbarModule,
        MdInputModule
    ],
})
export class MaterialGlobalsModule {

 }