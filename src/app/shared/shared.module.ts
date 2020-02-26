import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [BrowserModule, CommonModule, HttpClientModule],
    exports: [HeaderComponent, FooterComponent]
})

export class SharedModule {

}