import { Component, OnInit,Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import {Comment} from '../shared/comment';
import 'rxjs/add/operator/switchMap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dishRating } from '../shared/dishRating';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  ratingForm : FormGroup;
  dishrating : dishRating;
  r:dishRating;
  newComment:Comment;
  errMess: String;

  formErrors = {
    'rating': '',
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'rating': {
    },
    'comment': {
      'required':'comment is required.',
      'minlength':'comment must be at least 2 characters long.',
     },
    'author': {
      'required':'Name is required.',
      'minlength':'Name must be at least 2 characters long.',
      'maxlength':'Name cannot be more than 25 characters long.'
    },
  };
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL,
    private fb : FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
      errmess => this.errMess = <any>errmess);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.ratingForm = this.fb.group({
       rating: '',
       comment: ['',[Validators.required,Validators.minLength(2)]],
       author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });

    this.ratingForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.dishrating = this.ratingForm.value;
    console.log(this.dishrating);
    this.ratingForm.reset({
      rating: '',
      comment: '',
      author: ''
    });
    this.newComment.rating=this.dishrating.rating;
    this.newComment.comment=this.dishrating.comment;
    this.newComment.author=this.dishrating.author;  
    var d=new Date();
    this.  newComment.date=d.toISOString();
    this.dish.comments.push(this.newComment);
}

onValueChanged(data?: any) {
  
  this.r= this.ratingForm.value;
  if (!this.ratingForm) { return; }
  const form = this.ratingForm;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }

    
  }
}
}
