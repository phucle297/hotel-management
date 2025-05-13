CREATE TABLE `hm_BookingAgreement` (
	`n4AgreementId` int AUTO_INCREMENT NOT NULL,
	`n4BookingId` int NOT NULL,
	`strNote` varchar(255),
	`dtUpdateAt` timestamp,
	`dtCreateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hm_BookingAgreement_n4AgreementId` PRIMARY KEY(`n4AgreementId`)
);
--> statement-breakpoint
CREATE TABLE `hm_BookingPeriod` (
	`n4BookingId` int AUTO_INCREMENT NOT NULL,
	`n4CustomerId` int NOT NULL,
	`n4RoomId` int NOT NULL,
	`check_in` date NOT NULL,
	`check_out` date,
	`deposit` decimal(10,2) NOT NULL,
	`price_per_night` decimal(10,2) NOT NULL,
	`n4DurationDays` int unsigned NOT NULL,
	`strNote` varchar(255),
	`dtUpdateAt` timestamp,
	`dtCreateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hm_BookingPeriod_n4BookingId` PRIMARY KEY(`n4BookingId`)
);
--> statement-breakpoint
CREATE TABLE `hm_Customer` (
	`n4CustomerId` int AUTO_INCREMENT NOT NULL,
	`strFullname` varchar(100) NOT NULL,
	`strIdentityNumber` char(12) NOT NULL,
	`dtUpdateAt` timestamp,
	`dtCreateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hm_Customer_n4CustomerId` PRIMARY KEY(`n4CustomerId`)
);
--> statement-breakpoint
CREATE TABLE `hm_Room` (
	`n4RoomId` int AUTO_INCREMENT NOT NULL,
	`strRegion` enum('reqion-a','reqion-b','region-c') NOT NULL,
	`strRoomType` enum('eco','normal','vip') NOT NULL,
	`n4Floor` int unsigned NOT NULL,
	`n4RoomNumber` int unsigned NOT NULL,
	`n1Available` tinyint NOT NULL DEFAULT 0,
	`dtUpdateAt` timestamp,
	`dtCreateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hm_Room_n4RoomId` PRIMARY KEY(`n4RoomId`)
);
--> statement-breakpoint
ALTER TABLE `hm_BookingAgreement` ADD CONSTRAINT `hm_BookingAgreement_n4BookingId_hm_BookingPeriod_n4BookingId_fk` FOREIGN KEY (`n4BookingId`) REFERENCES `hm_BookingPeriod`(`n4BookingId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hm_BookingPeriod` ADD CONSTRAINT `hm_BookingPeriod_n4CustomerId_hm_Customer_n4CustomerId_fk` FOREIGN KEY (`n4CustomerId`) REFERENCES `hm_Customer`(`n4CustomerId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hm_BookingPeriod` ADD CONSTRAINT `hm_BookingPeriod_n4RoomId_hm_Room_n4RoomId_fk` FOREIGN KEY (`n4RoomId`) REFERENCES `hm_Room`(`n4RoomId`) ON DELETE no action ON UPDATE no action;