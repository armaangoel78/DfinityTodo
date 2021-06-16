// Insert these lines after the import statements for
// importing an agent and an actor
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as todo_idl, canisterId as todo_id } from 'dfx-generated/todo';

const agent = new HttpAgent();
const todo = Actor.createActor(todo_idl, { agent, canisterId: todo_id });

import * as React from 'react';
import { render } from 'react-dom';

// Replace the default index.js content with
// React JavaScript
class MyHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Name',
      message: '',
      todos: []
    };

    this.get();
  }

  async get() {
    var todos = await todo.get();
    console.log('hi');
    console.log(todos);

    if (todos.length == 1) {
      todos = todos[0];
      var result = [];

      while (todos.length == 2) {
        console.log(todos[0]);
        console.log(todos);
        console.log(result);

        result.push(todos[0]);
        todos = todos[1][0];
      }

      console.log(result);

      this.setState({ ...this.state, todos: result });
    }
  }

  async doGreet() {
    const greeting = await todo.add(this.state.name);
    this.setState({ ...this.state, message: greeting });
  }

  onNameChange(ev) {
    this.setState({ ...this.state, name: ev.target.value });
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ "font-size": "30px" }}>
        <div style={{ "background-color": "yellow" }}>
          <p>Greetings, from DFINITY!</p>
          <p> Type your message in the Name input field, then click <b> Get Greeting</b> to display the result.</p>
        </div>
        <div style={{ "margin": "30px" }}>
          <input id="name" value={this.state.name} onChange={ev => this.onNameChange(ev)}></input>
          <button onClick={() => this.doGreet()}>Get Greeting!</button>
        </div>
        <div>Greeting is: "<span style={{ "color": "blue" }}>{this.state.message}</span>"</div>
        <div>
          {
            Object.keys(this.state.todos).map((todo, i) => {
              (
                <h1>{todo}</h1>
              )
            })
          }
        </div>
      </div>
    );
  }
}

render(<MyHello />, document.getElementById('app'));