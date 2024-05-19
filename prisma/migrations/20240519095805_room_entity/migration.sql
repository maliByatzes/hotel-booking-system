-- CreateTable
CREATE TABLE "addon" (
    "id" SERIAL NOT NULL,
    "addon_name" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_addon" (
    "booking_id" INTEGER NOT NULL,
    "addon_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "floor_id" INTEGER NOT NULL,
    "room_class_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "room_number" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floor" (
    "id" SERIAL NOT NULL,
    "floor_number" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_class" (
    "id" SERIAL NOT NULL,
    "class_name" VARCHAR(100) NOT NULL,
    "base_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_status" (
    "id" SERIAL NOT NULL,
    "status_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "booking_addon_booking_id_addon_id_key" ON "booking_addon"("booking_id", "addon_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_floor_id_room_class_id_status_id_key" ON "room"("floor_id", "room_class_id", "status_id");

-- AddForeignKey
ALTER TABLE "booking_addon" ADD CONSTRAINT "booking_addon_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_addon" ADD CONSTRAINT "booking_addon_addon_id_fkey" FOREIGN KEY ("addon_id") REFERENCES "addon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_room_class_id_fkey" FOREIGN KEY ("room_class_id") REFERENCES "room_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "room_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
