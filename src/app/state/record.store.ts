import { RecordState } from './stateManager.js';
import { Injectable } from '@angular/core';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class RecordStore extends Store<RecordState> {

  constructor() {
      super(new RecordState());
   
    }


    addRecords(recordName: string, records: any[]): void {
        this.setState({
            ...this.state,
            [recordName]: [...this.state[recordName], ...records]
        });
    }

    updateRecords(recordName: string, records: any[]): void {
        this.setState({
            ...this.state,
            [recordName]: records
        });
    }
}