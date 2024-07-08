const Input = (props) => {

    return (
      <div>
        <label
          htmlFor={props.htmlFor}
          className="block text-sm leading-6 text-gray-900"
        >
          {props.label}
        </label>
        <div className='mt-0.5'>
          <input
            className='w-full text-sm p-2 bg-gray-100 hover:bg-gray-200 rounded'
            id={props.id}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
          />
        </div>
      </div>
    )
  }

  export default Input