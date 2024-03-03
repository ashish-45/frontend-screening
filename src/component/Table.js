import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical, BsClockHistory } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Axios from 'axios';


const AppointMentListTable = () => {

    const [displayData, setDisplayData] = useState([])

    const tableheading = [
        'Patient',
        'Date',
        'Time',
        'Doctor',
        'Injury',
        'Action'
    ]

    const API = "https://gist.githubusercontent.com/telematum/7751eec667033ac8acd244542e464e18/raw/d4710c6fb54224a0bd316ecdc5246633aceefce5/todays.json"

    const fetchAppoinmentList = async () => {
        try {
            const response = await Axios.get(API);
            setDisplayData(response.data.appointments)
        }
        catch (err) {
            console.log("Error", err)
        }

    }

    useEffect(() => {
        fetchAppoinmentList();
    }, [])

    return (
        <div>
            <div className='p-5 border rounded-lg'>
                <p className='text-lg text-left font-bold text-gray-400 mb-3'>Today's Appoinment List</p>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
                            <tr>
                                {
                                    tableheading.map((heading) => (
                                        <th scope="col" className="px-6 py-5 uppercase">
                                            {heading}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayData.map((item) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <div className='flex flex-col items-center lg:flex-row'>
                                                <div className='w-8 h-8 rounded-full bg-gray-400 text-white font-medium flex items-center justify-center'>
                                                    {item.patient_name.startsWith("J") ? "J" :
                                                        item.patient_name.startsWith("M") ? "M" :
                                                            item.patient_name.startsWith("D") ? "D" :
                                                                item.patient_name.startsWith("S") ? "S" :
                                                                    item.patient_name.startsWith("E") ? "E" : ""}
                                                </div>
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{item.patient_name}</div>
                                                    <div className="font-normal text-gray-400">{item.mobile_number}</div>
                                                </div>
                                            </div>

                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center lg:flex-row">
                                                <CiCalendarDate className='font-medium w-5 h-5' />
                                                <span className="lg:ml-1 text-center font-medium text-base">{item.appointment_date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className='flex flex-col items-center lg:flex-row'>
                                                    <BsClockHistory className='mx-1 h-4 w-4' />
                                                    <span className='font-medium text-base text-center'>{item.appointment_time}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center lg:flex-row">
                                                {
                                                    item.doctor === 'Dr. Patel' ? <FaStar className='rounded-full bg-orange-300 p-1 h-4 w-4  text-white' /> : <FaStar className='rounded-full bg-green-500 p-1 h-4 w-4  text-white' />
                                                }
                                                <span className="lg:ml-1 text-center font-medium text-base">{item.doctor}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <span className="inline-flex items-center text-center rounded-md bg-slate-300 px-3 py-1 text-xs font-medium text-black ring-1 ring-inset ring-purple-700/10">
                                                    {item.injury}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <BsThreeDotsVertical />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}

export default AppointMentListTable;