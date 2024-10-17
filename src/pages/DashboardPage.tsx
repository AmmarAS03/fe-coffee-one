import React, { useEffect, useRef, useState } from "react";

// Define types
type DeliveryOption = "Pickup" | "Delivery";

interface Order {
  coffee: string;
  name: string;
  delivery: DeliveryOption;
  roomLocation: string;
}

type TimeSlot = "7am" | "10am" | "1pm" | "5pm";

type OrdersByTime = {
  [key in TimeSlot]: Order[];
};

// Mock data for orders
const mockOrders: OrdersByTime = {
  "7am": [
    {
      coffee: "Espresso",
      name: "John Doe",
      delivery: "Pickup",
      roomLocation: "-",
    },
    {
      coffee: "Latte",
      name: "Jane Smith",
      delivery: "Delivery",
      roomLocation: "Elizabeth Building Room 1103",
    },
  ],
  "10am": [
    {
      coffee: "Cappuccino",
      name: "Alice Johnson",
      delivery: "Pickup",
      roomLocation: "-",
    },
    {
      coffee: "Americano",
      name: "Bob Williams",
      delivery: "Delivery",
      roomLocation: "Elizabeth Building Room 1103",
    },
  ],
  "1pm": [
    {
      coffee: "Mocha",
      name: "Charlie Brown",
      delivery: "Pickup",
      roomLocation: "-",
    },
    {
      coffee: "Flat White",
      name: "Diana Prince",
      delivery: "Delivery",
      roomLocation: "Elizabeth Building Room 1103",
    },
  ],
  "5pm": [
    {
      coffee: "Cold Brew",
      name: "Eva Green",
      delivery: "Pickup",
      roomLocation: "-",
    },
    {
      coffee: "Iced Latte",
      name: "Frank Castle",
      delivery: "Delivery",
      roomLocation: "Elizabeth Building Room 1103",
    },
  ],
};

const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-3 text-left border-b">Coffee</th>
        <th className="p-3 text-left border-b">Name</th>
        <th className="p-3 text-left border-b">Delivery Option</th>
        <th className="p-3 text-left border-b">Room Location</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="p-3 border-b">{order.coffee}</td>
          <td className="p-3 border-b">{order.name}</td>
          <td className="p-3 border-b">{order.delivery}</td>
          <td className="p-3 border-b">{order.roomLocation}</td>
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
  const ref = useRef<HTMLDivElement>(null);

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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div>
        {(Object.entries(mockOrders) as [TimeSlot, Order[]][]).map(
          ([time, orders]) => (
            <CollapsibleSection key={time} title={`Today's Orders - ${time}`}>
              <OrderTable orders={orders} />
            </CollapsibleSection>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
