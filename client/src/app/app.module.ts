import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleScreenComponent } from './title-screen/title-screen.component';
import { CreateRaidComponent } from './create-raid/create-raid.component';
import { RaidListComponent } from './raid-list/raid-list.component';
import { RaidDescriptionComponent } from './raid-description/raid-description.component';
import { RoadKillLocatorComponent } from './road-kill-locator/road-kill-locator.component';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    CreateRaidComponent,
    RaidListComponent,
    RaidDescriptionComponent,
    RoadKillLocatorComponent,
    IngredientsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
