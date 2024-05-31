import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addons = [
  {
    addonName: "Breakfast Buffet",
    price: 15
  },
  {
    addonName: "Airport Shuttle Service",
    price: 25
  },
  {
    addonName: "Spa Package",
    price: 75
  },
  {
    addonName: "Romantic Getaway Package",
    price: 50
  },
  {
    addonName: "Late Checkout",
    price: 30
  }
];

const floors = [
  {
    floorNumber: "1"
  },
  {
    floorNumber: "2"
  },
  {
    floorNumber: "3"
  },
  {
    floorNumber: "4"
  },
  {
    floorNumber: "5"
  },
];

const paymentStatuses = [
  {
    paymentStatusName: "Pending"
  },
  {
    paymentStatusName: "Completed"
  },
  {
    paymentStatusName: "Failed"
  },
];

const roomclasses  = [
  {
    className: "Standard",
    basePrice: 100
  },
  {
    className: "Deluxe",
    basePrice: 150
  },
  {
    className: "Suite",
    basePrice: 250
  },
  {
    className: "Family",
    basePrice: 200
  },
  {
    className: "Penthouse",
    basePrice: 400
  }
];

const roomstatuses = [
  {
    statusName: "Available"
  },
  {
    statusName: "Occupied"
  },
  {
    statusName: "Reversed"
  },
  {
    statusName: "Under Maintenance"
  },
  {
    statusName: "Out of service"
  },
];

const rooms = [
  {
    floorId: 1,
    roomClassId: 1,
    statusId: 3,
    roomNumber: 101
  },
  {
    floorId: 1,
    roomClassId: 2,
    statusId: 2,
    roomNumber: 102
  },
  {
    floorId: 1,
    roomClassId: 3,
    statusId: 3,
    roomNumber: 103
  },
  {
    floorId: 2,
    roomClassId: 2,
    statusId: 1,
    roomNumber: 201
  },
  {
    floorId: 2,
    roomClassId: 4,
    statusId: 2,
    roomNumber: 202
  },
  {
    floorId: 2,
    roomClassId: 5,
    statusId: 3,
    roomNumber: 203
  },
  {
    floorId: 3,
    roomClassId: 1,
    statusId: 1,
    roomNumber: 301
  },
  {
    floorId: 3,
    roomClassId: 3,
    statusId: 2,
    roomNumber: 302
  },
  {
    floorId: 3,
    roomClassId: 4,
    statusId: 3,
    roomNumber: 303
  },
  {
    floorId: 4,
    roomClassId: 5,
    statusId: 1,
    roomNumber: 401
  },
  {
    floorId: 4,
    roomClassId: 2,
    statusId: 2,
    roomNumber: 402
  },
  {
    floorId: 4,
    roomClassId: 1,
    statusId: 3,
    roomNumber: 403
  },
  {
    floorId: 5,
    roomClassId: 3,
    statusId: 1,
    roomNumber: 501
  },
  {
    floorId: 5,
    roomClassId: 4,
    statusId: 2,
    roomNumber: 502
  },
  {
    floorId: 5,
    roomClassId: 5,
    statusId: 3,
    roomNumber: 503
  },
];

async function main() {
  // Seed Addon data
  for (const addon of addons) {
    await prisma.addon.create({
      data: addon
    });
  }

  // Seed Floor data
  for (const floor of floors) {
    await prisma.floor.create({
      data: floor
    });
  }

  // Seed PaymentStatus data
  for (const paymentStatus of paymentStatuses) {
    await prisma.paymentStatus.create({
      data: paymentStatus
    });
  }

  // Seed RoomClass data
  for (const roomclass of roomclasses) {
    await prisma.roomClass.create({
      data: roomclass
    });
  }

  // Seed RoomStatus data
  for (const roomstatus of roomstatuses) {
    await prisma.roomStatus.create({
      data: roomstatus
    });
  }

  // Seed Room data
  for (const room of rooms) {
    await prisma.room.create({
      data: room
    });
  }

  console.log('Seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
