import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calculadora';

  lastOperation: string = ''
  operation: string = '0'
  isResult: boolean = false

  addAction(operation: string) {
    if(parseInt(operation) || operation == '0') {
      if(this.operation == '0') {
        this.isResult = false
        return this.operation = operation
      } else {
        if(!this.isResult) {
          this.operation += operation
        } else {
          this.operation = operation
        }
        this.isResult = false
      }
    } else if(operation == 'CE') {
      return this.operation = '0'
    } else if(operation == 'C') {
      return this.lastOperation = ''
    } else if(operation == '=') {
      this.lastOperation = this.operation
      this.parsetoEvalFormat()
      try {
        this.operation = eval(this.operation)
        this.isResult = true
      } catch (e) {
        
      }
    }
    return this.setOperation(operation)
  }

  parsetoEvalFormat() {
    const newString = []
    for(let x of this.operation) {
      if(x == 'x') {
        x = '*'
      } else if(x == '÷') {
        x = '/'
      }
      newString.push(x)
    }
    this.operation = ''
    newString.forEach(x => this.operation += x)
    console.log(newString)
  }

  setOperation(operation: string) {
    const operators = ['+', '-', 'x', '÷', '.']
    if(operation == '+') {
      if((operators.indexOf(this.operation[this.operation.length - 1])) == -1) {
        this.operation += '+'
        this.isResult = false
      }
    } else if(operation == 'x') {
      if((operators.indexOf(this.operation[this.operation.length - 1])) == -1) {
        this.operation += 'x'
        this.isResult = false
      }
    } else if(operation == '-') {
      if((operators.indexOf(this.operation[this.operation.length - 1])) == -1) {
        this.operation += '-'
        this.isResult = false
      }
    } else if(operation == '÷') {
      if((operators.indexOf(this.operation[this.operation.length - 1])) == -1) {
        this.operation += '÷'
        this.isResult = false
      }
    } else if(operation == '.') {
      if((operators.indexOf(this.operation[this.operation.length - 1])) == -1) {
        this.operation += '.'
        this.isResult = false
      }
    }
  }
}
