import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { Lang } from 'src/app/services/lang';
import { Observable, of } from 'rxjs';
import { StorageProvider } from 'src/app/services/storage';
import { HttpClient } from '@angular/common/http';

describe('Comp2Component', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let mockLangService;
  let mockStorrageProvider;
  let $lang: Observable<any> = of({})

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        {provide: StorageProvider, useValue: jasmine.createSpyObj('StorageProvider', ['storage'])},
        {
          provide: Lang,
          useValue: jasmine.createSpyObj('Lang', {load: of({})})
        }
      ]
    })
      .compileComponents();
    
    mockLangService = TestBed.get(Lang);
    mockStorrageProvider = TestBed.get(StorageProvider)
    mockStorrageProvider.settings = {}


    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
