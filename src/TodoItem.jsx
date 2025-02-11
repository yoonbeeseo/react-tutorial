import PropType from "prop-types"

const TodoItem = ({ todo, index }) => {
  return (
    <p>
      {index + 1}. {todo}
    </p>
  )
}

TodoItem.prototype = {
  todo: PropType.string,
  index: PropType.number,
}
