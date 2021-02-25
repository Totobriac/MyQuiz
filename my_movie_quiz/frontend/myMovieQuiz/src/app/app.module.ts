import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuizEditorComponent } from './quiz-editor/quiz-editor.component';
import { PlotQuestionComponent } from './quiz-editor/plot-question/plot-question.component';
import { ActorQuestionComponent } from './quiz-editor/actor-question/actor-question.component';
import { PosterQuestionComponent } from './quiz-editor/poster-question/poster-question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { QASwitchComponent } from './qaswitch/qaswitch.component';
import { TrailerQuestionComponent } from './quiz-editor/trailer-question/trailer-question.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { QuestionTypeComponent } from './question-type/question-type.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopDisplayComponent } from './top-display/top-display.component';
import { CurtainComponent } from './quiz-editor/curtain/curtain.component';
import { QuizCurtainComponent } from './quiz-questions/quiz-curtain/quiz-curtain.component';
import { QuestionsListComponent } from './quiz-questions/questions-list/questions-list.component';
import { ToolBoxComponent } from './tool-box/tool-box.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaletteComponent } from './quiz-editor/palette/palette.component';
import { ToolCurtainComponent } from './tool-box/tool-curtain/tool-curtain.component';
import { ToolPlotComponent } from './tool-box/tool-plot/tool-plot.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    QuizEditorComponent,
    PlotQuestionComponent,
    ActorQuestionComponent,
    PosterQuestionComponent,
    QASwitchComponent,
    TrailerQuestionComponent,
    QuizQuestionsComponent,
    QuestionTypeComponent,
    NavbarComponent,
    TopDisplayComponent,
    CurtainComponent,
    QuizCurtainComponent,
    QuestionsListComponent,
    ToolBoxComponent,
    PaletteComponent,
    ToolCurtainComponent,
    ToolPlotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
