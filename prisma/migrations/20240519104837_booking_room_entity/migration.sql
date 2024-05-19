-- CreateTable
CREATE TABLE "booking_room" (
    "booking_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "booking_room_booking_id_room_id_key" ON "booking_room"("booking_id", "room_id");

-- AddForeignKey
ALTER TABLE "booking_room" ADD CONSTRAINT "booking_room_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_room" ADD CONSTRAINT "booking_room_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
