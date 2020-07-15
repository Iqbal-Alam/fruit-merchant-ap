import { Component,Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogueComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}

ngOnInit() {
}

onConfirm() {
    this.dialogRef.close(true);
}

onCancel(): void {
    this.dialogRef.close(false);
}

}
