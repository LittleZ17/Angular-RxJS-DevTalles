import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debucerSubcription?: Subscription;
  

  @Input()
  public placeholder: string = ''

  @Input()
  public initialValue: string = ''

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debucerSubcription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
     this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debucerSubcription?.unsubscribe()
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(serchTerm: string) {
    this.debouncer.next(serchTerm);
  }

}
