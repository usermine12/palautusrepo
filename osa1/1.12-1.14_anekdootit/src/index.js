import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onclick}) => {
  return (
    <>
      <button onClick={onclick}>{text}</button>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState({
    index: 0,
    max: 0,
    votes: Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  })

  const randomizeAnecdote = () => setSelected({
    ...selected,
    index: Math.floor(Math.random() * anecdotes.length)
  })

  const newVote = () => {
    const copy = [...selected.votes]
    copy[selected.index] += 1

    let max = 0
    for(let i=0; i<copy.length; i++){
      if(copy[i]>copy[max]){
        max=i
      }
    }

    setSelected({
      ...selected,
      max: max,
      votes: copy
    })
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected.index]} <br></br>
      has {selected.votes[selected.index]} votes <br></br>
      <Button text='vote' onclick={newVote} />
      <Button text='next anecdote' onclick={randomizeAnecdote} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[selected.max]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)