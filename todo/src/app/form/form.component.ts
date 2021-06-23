import { Component,  } from '@angular/core';
import { Todo, TodosService } from '../services/todos.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  // title will be bound to the title input of the form
title: string = '';
value = '';


  constructor(public todosService: TodosService) { }
  addTodo() {
    {
      if(this.title==""){
alert("The Field is Empty")
      return;
     
    }
    if(this.value==""){
      alert("The Field is Empty")
            return;
           
          }
      else {
        confirm("Created Succesfully Task "+this.title)
        console.log("Implements succes");
      }
    }
    // construct todo object and add it using the service
    const todo: Todo = {
    id: Date.now(),
    title: this.title,
    complete: false,
    }
    this.todosService.addTodo(todo);
    }

 

   
    }
    
      
      
      
    

 



