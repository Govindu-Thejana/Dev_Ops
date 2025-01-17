import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const VegiTable = ({vegies}) => {
    return (
        <table className='w-full border-separate border- spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Food Name</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Quantity</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Price</th>
              <th className='border border-slate-600 rounded-md'>Operation</th>
            </tr>
          </thead>
          <tbody>
            {vegies.map((vegi, index) => (
              <tr key={vegi._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {vegi.foodname}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {vegi.quantity}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {vegi.price}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/vegies/details/${vegi._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/vegies/edit/${vegi._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/vegies/delete/${vegi._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}

export default VegiTable