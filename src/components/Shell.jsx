const Shell = (props) => {

    return (
      <div className={`overflow-hidden rounded-md bg-white border border-gray-200 ${props.sidebar ? 'sticky top-4 h-full flex-none min-w-80' : 'flex grow'}`}>
        <div className='w-full space-y-3 px-3 py-3 sm:p-3'>
        {props.children}
        </div>
      </div>
    )
  }
export default Shell  