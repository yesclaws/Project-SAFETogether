CREATE DATABASE IF NOT EXISTS `SECURITY`;
USE `SECURITY`;

-- Create the incidents table
CREATE TABLE if not exists `incidents` (
  `incident_num` INT NOT NULL AUTO_INCREMENT,
  `student_name` VARCHAR(50) NOT NULL,
  `student_contact_no` VARCHAR(12) NOT NULL,
  `student_email` VARCHAR(50) NOT NULL, 
  `category` VARCHAR(50) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `additional_info` TEXT DEFAULT NULL, -- for other info
  `area` VARCHAR(50) DEFAULT NULL,
  `lon` DECIMAL(9,6) DEFAULT NULL, -- need to create separate table for lat, lon
  `lat` DECIMAL(9,6) DEFAULT NULL,
  `time_of_day` VARCHAR(10) DEFAULT NULL,
  `day_of_week` VARCHAR(10) DEFAULT NULL,
  `year` INT DEFAULT NULL,
  `month` INT DEFAULT NULL,
  `day` INT DEFAULT NULL,
  `hour` INT DEFAULT NULL,
  `minute` INT DEFAULT NULL,
  `second` INT DEFAULT NULL,
  `week_of_year` INT DEFAULT NULL,
  `is_weekend` TINYINT(1) DEFAULT NULL,
  `is_holiday` TINYINT(1) DEFAULT NULL, -- need to create another table to store holiday dates
  `is_schoolday` TINYINT(1) DEFAULT NULL,
  PRIMARY KEY (`incident_num`)
);

CREATE TABLE if not exists `universityholidays` (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    HolidayName VARCHAR(50),
    datetime DATE,
    DayOfWeek VARCHAR(50),
    Note VARCHAR(50)
);

CREATE TABLE if not exists `academicdates` (
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `StartDate` DATE,
    `EndDate` DATE,
    `Type` VARCHAR(50)
);

CREATE TABLE nusareas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    area_name VARCHAR(255),
    lat DECIMAL(10, 7),
    lon DECIMAL(10, 7)
);

-- Inserting the data

INSERT INTO universityholidays (HolidayName, datetime, DayOfWeek, Note)
VALUES 
('National Day', '2023-08-09', 'Wed', NULL),
('Presidential Election', '2023-09-01', 'Fri', NULL),
('NUS Well-Being Day', '2023-11-10', 'Fri', NULL),
('Deepavali', '2023-11-12', 'Sun', 'The following Monday will be a public holiday.'),
('Deepavali In Lieu', '2023-11-13', 'Mon', 'Holiday in lieu.'),
('Christmas Day', '2023-12-25', 'Mon', NULL),
('New Year’s Day', '2024-01-01', 'Mon', NULL),
('Chinese New Year', '2024-02-10', 'Sat', 'The following Monday will be a public holiday.'),
('Chinese New Year', '2024-02-11', 'Sun', 'The following Monday will be a public holiday.'),
('Chinese New Year In Lieu', '2024-02-12', 'Mon', 'Holiday in lieu.'),
('NUS Well-Being Day', '2024-03-28', 'Thu', NULL),
('Good Friday', '2024-03-29', 'Fri', NULL),
('Hari Raya Puasa', '2024-04-10', 'Wed', NULL),
('Labour Day', '2024-05-01', 'Wed', NULL),
('Vesak Day', '2024-05-22', 'Wed', NULL),
('Hari Raya Haji', '2024-06-17', 'Mon', NULL);

-- Insert data for SEMESTER 1
INSERT INTO academicdates (StartDate, EndDate, Type) VALUES 
('2023-08-14', '2023-09-22', 'Instructional Period'),
('2023-09-23', '2023-10-01', 'Recess Week'),
('2023-10-02', '2023-11-17', 'Instructional Period'),
('2023-11-18', '2023-11-24', 'Reading Week'),
('2023-11-25', '2023-12-09', 'Examination'),
('2024-01-15', '2023-02-23', 'Instructional Period'),
('2024-02-24', '2024-03-03', 'Recess Week'),
('2024-03-04', '2024-04-19', 'Instructional Period'),
('2024-04-20', '2024-04-26', 'Reading Week'),
('2024-04-27', '2024-05-11', 'Examination'),
('2024-05-13', '2024-06-22', 'Special Term'),
('2024-06-24', '2024-08-03', 'Special Term')
;

INSERT INTO nusareas (area_name, lat, lon) VALUES
('Faculty of Engineering', 1.3002, 103.7707),
('Faculty of Science', 1.2969, 103.7797),
('Faculty of Social Sciences', 1.2945, 103.7710),
('School of Computing', 1.2949, 103.7737),
('School of Business', 1.2926, 103.7742),
('School of Design and Environment', 1.3002, 103.7707),
('NUS Multipurpose Fields', 1.2987, 103.7783),
('NUS MPSH', 1.31824, 103.81906),
('Yale-NUS', 1.3069, 103.7718),
('Sheares Hall', 1.2914, 103.7756),
('Kent Ridge Hall', 1.2918, 103.7748),
('Temasek Hall', 1.2929, 103.7714),
('University Town', 1.2966, 103.7764),
('Raffles Hall', 1.3000, 103.7740),
('King Edward VII Hall', 1.2924, 103.7811),
('Eusoff Hall', 1.2938, 103.7704),
("Prince George's Park Residences", 1.2966, 103.7764),
('UTown Residence', 1.3052017, 103.773904),
('Tembusu College', 1.3062, 103.7738),
('Residential College 4', 1.3082, 103.7734),
('College of Alice & Peter Tan', 1.3079, 103.7733),
('Ridge View Residential College', 1.2975, 103.7771);

DELIMITER //

CREATE TRIGGER trg_before_insert_incident
BEFORE INSERT ON incidents
FOR EACH ROW
BEGIN
    -- Extract and update Year, Month, Day, etc. from DateTime
    SET 
        NEW.year = YEAR(NEW.datetime),
        NEW.month = MONTH(NEW.datetime),
        NEW.day = DAY(NEW.datetime),
        NEW.hour = HOUR(NEW.datetime),
        NEW.minute = MINUTE(NEW.datetime),
        NEW.second = SECOND(NEW.datetime),
        NEW.week_of_year = WEEK(NEW.datetime),
        NEW.day_of_week = DAYNAME(NEW.datetime),
        NEW.is_weekend = CASE 
                        WHEN DAYOFWEEK(NEW.datetime) IN (1, 7) THEN 1 
                        ELSE 0 
                      END;
    
    IF EXISTS (SELECT 1 FROM universityholidays WHERE datetime = NEW.datetime) THEN
        SET NEW.is_holiday = 1;
    ELSE
        SET NEW.is_holiday = 0;
    END IF;

    IF DAYOFWEEK(NEW.datetime) IN (1, 7) THEN
        SET NEW.is_schoolday = 0;
    ELSEIF EXISTS (
        SELECT 1 
        FROM academicdates 
        WHERE NEW.datetime BETWEEN StartDate AND EndDate 
        AND Type IN ('Instructional Period', 'Reading Examination', 'Special Term') -- don't know whether to add recess/reading week?
    ) THEN
        SET NEW.is_schoolday = 1;
    ELSE
        SET NEW.is_schoolday = 0;
    END IF;

    IF HOUR(NEW.datetime) in (0, 6) THEN
        SET NEW.time_of_day = 'Midnight';
    ELSEIF HOUR(NEW.datetime) in (7, 11) THEN
        SET NEW.time_of_day = 'Morning';
    ELSEIF HOUR(NEW.datetime) in (12, 17) THEN
        SET NEW.time_of_day = 'Afternoon';
    ELSEIF HOUR(NEW.datetime) in (18, 23) THEN
        SET NEW.time_of_day = 'Evening';
    END IF;

END;

//

DELIMITER ;
