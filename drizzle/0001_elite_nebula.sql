CREATE TABLE `daily_location_visitors` (
	`day` text NOT NULL,
	`location_key` text NOT NULL,
	`visitor_hash` text NOT NULL,
	`first_seen_at` text NOT NULL,
	`last_seen_at` text NOT NULL,
	PRIMARY KEY(`day`, `location_key`, `visitor_hash`)
);
