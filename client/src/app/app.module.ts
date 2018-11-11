import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TitleScreenComponent} from './title-screen/title-screen.component';
import {CreateRaidComponent} from './create-raid/create-raid.component';
import {RaidListComponent} from './raid-list/raid-list.component';
import {RaidDescriptionComponent} from './raid-description/raid-description.component';
import {RoadKillLocatorComponent} from './road-kill-locator/road-kill-locator.component';
import {IngredientsListComponent} from './ingredients-list/ingredients-list.component';
import {AngularFireModule} from 'angularfire2';
import {FirebaseConfig} from '../environments/firebase.config';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AgmCoreModule} from '@agm/core';
import {FormsModule} from '@angular/forms';
import { IngredientDescriptionComponent } from './ingredient-description/ingredient-description.component';
import { DishComponent } from './dish/dish.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    CreateRaidComponent,
    RaidListComponent,
    RaidDescriptionComponent,
    RoadKillLocatorComponent,
    IngredientsListComponent,
    IngredientDescriptionComponent,
    DishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiSO6OQGfj874yQA08Cc8fC5vls3IZDXg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
