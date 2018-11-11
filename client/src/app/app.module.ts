import {AgmCoreModule} from '@agm/core';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FirebaseUIModule} from 'firebaseui-angular';
import {FirebaseConfig} from '../environments/firebase.config';
import {FirebaseUiAuthConfig} from '../environments/FirebaseUiAuth.config';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateRaidComponent} from './create-raid/create-raid.component';
import {DishComponent} from './dish/dish.component';
import {IngredientDescriptionComponent} from './ingredient-description/ingredient-description.component';
import {IngredientsListComponent} from './ingredients-list/ingredients-list.component';
import {LoginComponent} from './login/login.component';
import {RaidDescriptionComponent} from './raid-description/raid-description.component';
import {RaidListComponent} from './raid-list/raid-list.component';
import {RoadKillLocatorComponent} from './road-kill-locator/road-kill-locator.component';
import {TitleScreenComponent} from './title-screen/title-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRaidComponent,
    DishComponent,
    IngredientDescriptionComponent,
    IngredientsListComponent,
    LoginComponent,
    RaidListComponent,
    RaidDescriptionComponent,
    RoadKillLocatorComponent,
    TitleScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiSO6OQGfj874yQA08Cc8fC5vls3IZDXg'
    }),
    FirebaseUIModule.forRoot(FirebaseUiAuthConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
