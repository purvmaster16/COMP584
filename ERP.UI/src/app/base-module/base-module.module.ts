import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModuleRoutingModule } from './base-module-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseModuleRoutingModule,
    SweetAlert2Module.forRoot()
  ]
})
export class BaseModuleModule { }
