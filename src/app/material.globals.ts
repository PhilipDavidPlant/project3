import { NgModule } from '@angular/core'; 
import {
    MdButtonModule, 
    MdCheckboxModule,
    MdListModule,
    MdTabsModule,
    MdToolbarModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule
} from '@angular/material';

@NgModule({
    imports: [
        MdButtonModule, 
        MdCheckboxModule,
        MdListModule,
        MdTabsModule,
        MdToolbarModule,
        MdInputModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
    exports: [
        MdButtonModule, 
        MdCheckboxModule,
        MdListModule,
        MdTabsModule,
        MdToolbarModule,
        MdInputModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
})
export class MaterialGlobalsModuleLoadFirst {}