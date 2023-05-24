import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionBodyComponent } from './definition-body.component';

describe('DefinitionBodyComponent', () => {
  let component: DefinitionBodyComponent;
  let fixture: ComponentFixture<DefinitionBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinitionBodyComponent]
    });
    fixture = TestBed.createComponent(DefinitionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
