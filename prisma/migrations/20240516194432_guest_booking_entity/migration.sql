-- CreateTable
CREATE TABLE "guest" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_status" (
    "id" SERIAL NOT NULL,
    "payment_status_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "payment_status_id" INTEGER NOT NULL,
    "checkin_date" DATE NOT NULL,
    "checkout_date" DATE NOT NULL,
    "num_adults" INTEGER NOT NULL,
    "num_children" INTEGER NOT NULL,
    "booking_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guest_email_address_key" ON "guest"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "guest_phone_number_key" ON "guest"("phone_number");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_payment_status_id_fkey" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
