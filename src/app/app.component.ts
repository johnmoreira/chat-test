import { Component, OnInit } from '@angular/core';
import { addDoc, collection, DocumentData, collectionData, CollectionReference, DocumentReference, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
// import {  } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public formChat!: FormGroup;
  title = 'chat-test';
  item$!: Observable<any>;
  itemCollection!: CollectionReference<DocumentData>;
  
  constructor(
    private _firestore: Firestore,
    private _formBuilder: FormBuilder,
    ){}
  
  ngOnInit(): void {
    this._createForm();
    this.itemCollection = collection(this._firestore, 'items');

    this.item$ = collectionData<any>(this.itemCollection);

  }

  public sendMessage(): any {
    let msg = this.formChat.get('msg')?.value
    addDoc(this.itemCollection, {text: msg});
    this.formChat.reset();
  }


  private _createForm(): any {
    this.formChat = this._formBuilder.group({
      msg: [ '' ],
    })
  }
}
