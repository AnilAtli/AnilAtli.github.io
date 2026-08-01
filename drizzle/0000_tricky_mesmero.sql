CREATE TABLE `daily_location_views` (
	`day` text NOT NULL,
	`location_key` text NOT NULL,
	`country_code` text NOT NULL,
	`region` text NOT NULL,
	`city` text NOT NULL,
	`visits` integer DEFAULT 1 NOT NULL,
	`last_seen_at` text NOT NULL,
	PRIMARY KEY(`day`, `location_key`)
);
