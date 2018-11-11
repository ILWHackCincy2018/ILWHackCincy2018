import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
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
import {AppComponent} from './app.component';
import {CreateRaidComponent} from './create-raid/create-raid.component';
import {DishDescriptionComponent} from './dish-description/dish-description.component';
import {DishJudgementComponent} from './dish-judgement/dish-judgement.component';
import {DishComponent} from './dish/dish.component';
import {HighScorePageComponent} from './high-score-page/high-score-page.component';
import {IngredientDescriptionComponent} from './ingredient-description/ingredient-description.component';
import {IngredientsListComponent} from './ingredients-list/ingredients-list.component';
import {LoginComponent} from './login/login.component';
import {MeatupPageComponent} from './meatup-page/meatup-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {RaidDescriptionComponent} from './raid-description/raid-description.component';
import {RaidListComponent} from './raid-list/raid-list.component';
import {RoadKillLocatorComponent} from './road-kill-locator/road-kill-locator.component';
import {MapsService} from './services/maps.service';
import {TitleScreenComponent} from './title-screen/title-screen.component';
import {UIRouterModule} from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { MeatupComponent } from './meatup/meatup.component';


const INIT_STATES = [
  {
    name: 'home',
    path: 'home',
    url: '/home',
    component: TitleScreenComponent
  },
  {
    name: 'my-profile',
    path: 'my-profil',
    url: '/my-profil',
    component: ProfilePageComponent
  },
  {
    name: 'high-score',
    path: 'high-score',
    url: '/high-score',
    component: HighScorePageComponent
  },
  {
    name: 'meat-up',
    path: 'meat-up',
    url: '/meat-up',
    component: MeatupPageComponent
  }
];

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
    MeatupPageComponent,
    DishJudgementComponent,
    DishDescriptionComponent,
    NavbarComponent,
    ProfilePageComponent,
    HighScorePageComponent,
    TitleScreenComponent,
    IngredientsListComponent,
    IngredientDescriptionComponent,
    DishComponent,
    HomeComponent,
    MeatupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    UIRouterModule.forRoot({states: INIT_STATES}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiSO6OQGfj874yQA08Cc8fC5vls3IZDXg'
    }),
    FirebaseUIModule.forRoot(FirebaseUiAuthConfig),
    FormsModule
  ],
  providers: [
    MapsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export const API_KEY = "AIzaSyAiSO6OQGfj874yQA08Cc8fC5vls3IZDXg";
