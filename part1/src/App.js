import { useState } from 'react'

// // even better props approach then const Hello = (props) =>{...}
// const Hello = ({ name, age }) => {
//   // const bornYear = () =>{
//   //   const yearNow = new Date().getFullYear();
//   //   return yearNow - props.age;
//   // }

//   //------------------------------------------------------------------------------------------------------------ 

//   /* Above function is equivalent with this*/
//   // const bornYear = () => new Date().getFullYear() - age;

//   //------------------------------------------------------------------------------------------------------------ 
//   /* Destructuring */
//   // const { name, age } = props;
//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

/*if the compenent doesn't render when it has to use console.log('rendering...', counter) to debug */

/*Stateful Component */
// const App = () => {

//   const [counter, setCounter] = useState(0);

//   setTimeout(
//     () => setCounter(counter + 1), 5000
//   )

//   return (
//     <div>
//       <p>{counter}</p>
//     </div>
//   )

// }


/*Event handling */
// const App = () => {

//   const [counter, setCounter] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);

//   const setToZero = () => setCounter(0);


//   return (
//     <div>

//       <div>{counter}</div>
//       <button onClick={increaseByOne}>
//         plus
//       </button>
//       <button onClick={setToZero}>
//         zero
//       </button>
//     </div>
//   )



// }
/*Passing state - to child components */
/*Breaking the app in multiple compenents, 1 for displaying the  counting and 1 for buttons. */


// const Display = ({ counter }) => <div>{counter}</div>


// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}>
//       {props.text}
//     </button>
//   )
// }
//we can define the function using the more compact form of arrow functions
//   ↑ 
//becomes 
//   ↓
// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )
//   ↑ 
//becomes 
//   ↓
// const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


// const App = () => {
//   const [counter, setCounter] = useState(0);
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {
//     console.log('increasing, value before', counter)

//     setCounter(counter + 1);

//   }
//   const decreaseByOne = () => {
//     console.log('decreasing, value before', counter)


//     setCounter(counter - 1)
//   }

//   const setToZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0);
//   }

//   return (

//     <div>
//       <Display counter={counter} />
//       <Button handleClick={increaseByOne}
//         text='plus' />
//       <Button handleClick={decreaseByOne}
//         text='minus' />
//       <Button handleClick={setToZero}
//         text='0' />
//     </div>
//   )

// }
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

<button onClick="crap...">button</button>

export default Appx