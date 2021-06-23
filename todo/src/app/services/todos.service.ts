import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {  map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormComponent } from '../form/form.component';

// create interface with the structure of a simple todo item
export interface Todo {
id: number
title: string
complete: boolean
}

@Injectable({
providedIn: 'root'
})
export class TodosService {

constructor(private http: HttpClient) { }
public todos: Todo[] = [];
private subject = new BehaviorSubject<Todo[]>([]); // to be able to retain the last emitted version !
public todos$ = this.subject.asObservable();

getTodos(limit: number): Observable<boolean> {

return this.http.get<Todo[]>(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
//  just return observable of true or false
.pipe(
map((fetchedTodos: Todo[]) => {
// setup the local this.todos member
this.todos = fetchedTodos;
// propagade the todos to subscribers via subject
this.subject.next(this.todos);
return true;
}),
catchError(err => {
alert(err.message);
return of(false);
})
);
}

onToggle(id: number) {
// get the todo index by the provided ID
const idx = this.todos.findIndex(todo => todo.id === id);
this.todos[idx].complete = !this.todos[idx].complete;
}

removeTodo(id: number) {
this.todos = this.todos.filter(todo => { return todo.id !== id }
);

// propagade the updated data back to all observables
this.subject.next(this.todos);
}
updateTodo(id: number) {
    this.todos = this.todos.filter(todo => { return todo.id == id }
        
    );
    
    // propagade the updated data back to all observables
   
    this.subject.next(this.todos);
    }

addTodo(todo: Todo) {
this.todos = [...this.todos, todo];
this.subject.next(this.todos);
}


}