import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabMenuModule } from 'primeng/tabmenu';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { TreeModule } from 'primeng/tree';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { BadgeModule } from 'primeng/badge';
import { ConfirmationService, MessageService } from "primeng/api";
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import {CardModule} from 'primeng/card';


const modules = [
    AutoCompleteModule,
    ButtonModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    TabMenuModule,
    SliderModule,
    CalendarModule,
    TreeModule,
    ProgressBarModule,
    InputNumberModule,
    ChipModule,
    SelectButtonModule,
    TableModule,
    CheckboxModule,
    ListboxModule,
    PanelModule,
    ToastModule,
    InputTextModule,
    RippleModule,
    ToolbarModule,
    FileUploadModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule
]

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: [MessageService, ConfirmationService]
})
export class PrimengModule { }
