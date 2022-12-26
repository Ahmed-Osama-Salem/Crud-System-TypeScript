/* eslint-disable no-underscore-dangle */

import { useSelector } from 'react-redux';

import type { ITableApiData } from '@/app/interface/tableApiData';
import {
  setIsTouched,
  setIsUpdateModal,
} from '@/app/redux/store/slice/modalSlice';
import { setCellData, setCellID } from '@/app/redux/store/slice/tableDataSlice';
import type { RootState } from '@/app/redux/store/store';
import { useDispatch } from '@/app/redux/store/store';
import {
  handelTime,
  subtractMin,
  subtractTimes,
} from '@/app/server/mangeTime/TimeManegment';

const TableBody = () => {
  const tableData = useSelector((state: RootState) => state.tableData.table);

  const dispatch = useDispatch();
  // const router = useRouter();

  return (
    <tbody className="">
      {tableData.map((item: ITableApiData, i: number) => {
        return (
          <tr
            key={item._id}
            className="border-b bg-white text-center text-[1.1rem] text-gray-600 hover:bg-gray-50 hover:transition-transform hover:duration-75 hover:ease-in-out dark:border-gray-700 dark:bg-light-gray dark:hover:bg-gray-800"
          >
            <td scope="col" className="py-8 px-24">
              {i + 1}
            </td>
            <td className="py-8 px-24">{item.allText.dateNow}</td>
            <td className="py-8 px-24">{item.time}</td>
            <td className="py-8 px-24">{item.allText.rkmElw7da}</td>
            <td className="py-10 px-12">{item.allText.elbnd}</td>
            <td className="py-8 px-24">{item.allText.topics}</td>
            <td className="py-8 px-24">{item.allText.contractType}</td>
            <td className="py-8 px-24">{item.allText.techNumber}</td>
            {item.text.map((t: { text1: string; text2: string }) => {
              return (
                <td key={i} className="grid grid-cols-2">
                  <a className="  py-2 px-24 text-center">{t.text1}</a>
                  <a className="  py-2 px-24 text-center">{t.text2}</a>
                </td>
              );
            })}

            <td className="py-8 px-24 text-center">
              {item.allText.mosadNumber}
            </td>
            {item.textMosad.map(
              (m: { mosadName: string; mosadJob: string }) => {
                return (
                  <td key={i} className="grid grid-cols-2">
                    <a className="py-2 px-24 text-center">{m.mosadName}</a>
                    <a className="py-2 px-24 text-center">{m.mosadJob}</a>
                  </td>
                );
              }
            )}

            <td className="py-8 px-24">{handelTime(item.allText.from)}</td>
            <td className="py-8 px-24">{handelTime(item.allText.to)}</td>
            <td className="py-8 px-24">
              {`${subtractTimes(
                item.allText.from,
                item.allText.to
              )}:${subtractMin(item.allText.from, item.allText.to)}`}
            </td>
            <td className="py-8 px-24">{item.allText.noteAdd}</td>
            <td className="py-8 px-12">{item.allText.kmiatMon}</td>
            <td className="py-8 ">{item.allText.tnfizState}</td>
            <td className="py-8 px-24">{item.allText.angaz} %</td>
            <td className="py-8 ">{item.allText.notes}</td>
            <td className="py-8 px-24">{item.allText.twqi3}</td>
            <td className="flex items-center justify-between space-x-3 py-8 px-24">
              <button
                onClick={() => {
                  dispatch(setCellData(item));
                  // router.push('/update');
                  dispatch(setIsUpdateModal(true));
                }}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                تعديل
              </button>
              <button
                onClick={() => {
                  dispatch(setIsTouched(true));
                  dispatch(setCellID(item._id));
                }}
                className="font-medium text-red-600 hover:underline dark:text-red-500"
              >
                ازالة
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
