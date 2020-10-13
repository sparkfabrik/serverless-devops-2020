// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { AccordionsComponent } from './accordions.component';
// import { AccordionService } from 'app/services';

// describe('AccordionsComponent', () => {
//   let component: AccordionsComponent;
//   let fixture: ComponentFixture<AccordionsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AccordionsComponent],
//       providers: [AccordionService],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AccordionsComponent);
//     component = fixture.componentInstance;
//     component.accordionType = 'mpm-profile';
//     component.accordionTitle = 'Accordion title';
//     component.accordionElements = [{ question: 'Question1', answer: 'Answer1' }];
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should toogle on the accordion', inject([AccordionService], (accordionService) => {
//     const index = 0;
//     const spy = spyOn(accordionService, 'toggleAccordion').and.returnValue(0);
//     component.toggleAccordion(index);
//     expect(spy).toHaveBeenCalled();
//     expect(component.showAccordion).toEqual(0);
//   }));

//   it('should toogle off the accordion', inject([AccordionService], (accordionService) => {
//     component.showAccordion = 0;
//     const index = 0;
//     const spy = spyOn(accordionService, 'toggleAccordion').and.returnValue(-1);
//     component.toggleAccordion(index);
//     expect(spy).toHaveBeenCalled();
//     expect(component.showAccordion).toEqual(-1);
//   }));

//   it('should call getAccordionHeight', inject([AccordionService], accordionService => {
//     spyOn(accordionService, 'getAccordionHeight');
//     component.getAccordionHeight(1);
//     expect(accordionService.getAccordionHeight).toHaveBeenCalled();
//   }));
// });
