import React, { useState, useEffect } from "react";
import { fetchOrderSummary, OrderSummary } from "../api/orderSummary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TimeSlot = "7am" | "10am" | "1pm" | "5pm";

type OrdersByTime = {
  [key in TimeSlot]: OrderSummary[];
};

const TIME_SLOTS: TimeSlot[] = ["7am", "10am", "1pm", "5pm"];

const OrderTable: React.FC<{ orders: OrderSummary[] }> = ({ orders }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-3 text-left border-b">Coffee</th>
        <th className="p-3 text-left border-b">Quantity</th>
        <th className="p-3 text-left border-b">Name</th>
        <th className="p-3 text-left border-b">Delivery Option</th>
        <th className="p-3 text-left border-b">Room Location</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="p-3 border-b">{order.coffee_name}</td>
          <td className="p-3 border-b">{order.quantity}</td>
          <td className="p-3 border-b">{order.name}</td>
          <td className="p-3 border-b">{order.delivery_option}</td>
          <td className="p-3 border-b">{order.building} - {order.room_location}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const contentEl = ref.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
      <div
        className="px-6 py-4 bg-gray-50 border-b cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <span
          className={`text-2xl transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>
      <div
        ref={ref}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height: height !== undefined ? `${height}px` : "auto" }}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [ordersByTime, setOrdersByTime] = useState<OrdersByTime>({
    "7am": [],
    "10am": [],
    "1pm": [],
    "5pm": [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        const orders = await fetchOrderSummary(formattedDate);

        const groupedOrders = TIME_SLOTS.reduce((acc, timeSlot) => {
          acc[timeSlot] = orders.filter(
            (order) => order.selected_time === timeSlot
          );
          return acc;
        }, {} as OrdersByTime);

        setOrdersByTime(groupedOrders);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 14)
    );
    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getWeekRange();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6">
        <label
          htmlFor="date-picker"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Showing for:
        </label>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={startOfWeek}
          maxDate={endOfWeek}
          dateFormat="yyyy-MM-dd"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        {TIME_SLOTS.map((timeSlot) => {
          const orders = ordersByTime[timeSlot];
          if (orders && orders.length > 0) {
            return (
              <CollapsibleSection
                key={timeSlot}
                title={`Orders for ${selectedDate.toDateString()} - ${timeSlot}`}
              >
                <OrderTable orders={orders} />
              </CollapsibleSection>
            );
          }
          return ( <></>);
        })}
      </div>
    </div>
  );
};

export default Dashboard;
