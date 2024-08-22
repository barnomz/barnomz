import { examsTableHeaders } from '@/constants/const'
import moment from 'moment-jalaali'

export default function ExamsTable({ courses }) {
  const renderProperty = (property, key) => {
    if (key !== 'examDate') return property
    if (!property) return '-'
    const gregorianDate = moment(property, 'jYYYY-jMM-jDDTHH:mm').format(
      'YYYY-MM-DDTHH:mm',
    )

    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: false,
      timeZone: 'Asia/Tehran',
    })
      .format(new Date(gregorianDate))
      .toString()
  }

  const totalCreditSum = courses.reduce(
    (sum, { credit }) => sum + Number(credit),
    0,
  )

  return (
    <div className='exams-table relative overflow-x-auto rounded-md shadow-md'>
      <table className='w-full border-2 border-solid border-primary-light text-right text-sm'>
        <thead className='bg-primary-light text-xs text-grey-100'>
          <tr>
            {examsTableHeaders.map((header) => (
              <th key={header.key} scope='col' className='px-6 py-3'>
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className='border-b border-primary-light'>
              {examsTableHeaders.map(({ key, _ }, i) => (
                <td key={key} className='px-6 py-3'>
                  {/*{i !== examsTableHeaders.length - 1 ? (*/}
                  {/*  renderProperty(course[key], key)*/}
                  {/*) : (*/}
                  {/*  <BBtn*/}
                  {/*    icon={faTimes}*/}
                  {/*    className='h-6 w-6 rounded-full bg-grey-200 !px-2 hover:bg-error-500'*/}
                  {/*  />*/}
                  {/*)}*/}
                  {renderProperty(course[key], key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='font-medium text-white'>
            <td></td>
            <td></td>
            <td className='px-6 py-3'>جمع</td>
            <td className='px-6 py-3'>{totalCreditSum}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
