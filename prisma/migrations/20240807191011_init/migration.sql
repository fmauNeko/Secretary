-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "persistentKey" TEXT NOT NULL,
    "lodestoneId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "world" TEXT NOT NULL,
    "datacenter" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "portraitUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Character_persistentKey_key" ON "Character"("persistentKey");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
