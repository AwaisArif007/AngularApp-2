import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderDocumentsComponent } from './folder-documents.component';

describe('FolderDocumentsComponent', () => {
  let component: FolderDocumentsComponent;
  let fixture: ComponentFixture<FolderDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
