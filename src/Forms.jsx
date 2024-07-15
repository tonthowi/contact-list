import Button from "./components/Button"
import Input from "./components/Input"
import Shell from "./components/Shell"

const Forms = (props) => {

    return (
  
      <Shell sidebar={true}>
          <h3 className="text-base font-semibold leading-6 text-gray-900">Add New Contact</h3>
          <form
            className='space-y-3 mt-4'
            onSubmit={props.onSubmit}
          >
            <Input
              htmlFor='name'
              id='name'
              label='Name'
              type='text'
              placeholder='Input a name'
              value={props.nameValue}
              onChange={props.handleNameChange}
            />
            <Input
              htmlFor='email'
              id='email'
              label='Email Address'
              type='email'
              placeholder='Input an email address'
              value={props.emailValue}
              onChange={props.handleEmailChange}
            />
            <Input
              htmlFor='number'
              id='number'
              label='Phone Number'
              type='number'
              placeholder='Input a number'
              value={props.numValue}
              onChange={props.handleNumChange}
            />
            <Button
              primaryButton={true}
              type='submit'
              text='Add'
            />
          </form>
      </Shell>
    )
  }

export default Forms