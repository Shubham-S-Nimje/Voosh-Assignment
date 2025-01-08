-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2025 at 02:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_voosh`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `album_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `hidden` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `artist_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `name`, `year`, `hidden`, `created_at`, `updated_at`, `artist_id`) VALUES
('12e54c9a-01e5-44a1-a0cc-d7b408b72dff', 'Sonu Nigam: Unplugged', 2015, 0, '2025-01-08 13:52:08', '2025-01-08 13:52:08', '7d1f3a16-e190-43f1-91fc-b7450167a63e'),
('3a56b130-ef92-4edb-a755-b62b14c1e92a', 'Azaadi Ke Liye', 1999, 0, '2025-01-08 13:52:08', '2025-01-08 13:52:08', '2e6e6187-35d3-47d2-9c0f-7463f51d45ae'),
('7d9f09de-c3d5-4e98-bb63-01581c6170f0', 'Devotional Songs', 2010, 0, '2025-01-08 13:52:08', '2025-01-08 13:52:08', '548c9206-9574-40c2-bd63-d5680a3eb02b'),
('b441e5c9-e12c-428b-9a1d-508cb8a7da02', 'Tere Bina', 2007, 0, '2025-01-08 13:52:08', '2025-01-08 13:52:08', '087979f0-82e1-4e12-9764-cba73097bb10'),
('dfa7b8b8-7451-4974-a65f-7085b7c388b4', 'Kishore Kumar’s Greatest Hits', 1985, 0, '2025-01-08 13:52:08', '2025-01-08 13:52:08', '43a0b3a4-4d0b-411b-b5c0-6a4f62b466f1'),
('f9b1f7ab-7e1b-48f3-8b91-5e4467100b53', 'Dil Se', 1998, 0, '2025-01-08 13:52:08', '2025-01-08 13:52:08', '087979f0-82e1-4e12-9764-cba73097bb10');

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `artist_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `grammy` int(11) DEFAULT 0,
  `hidden` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `name`, `grammy`, `hidden`, `created_at`, `updated_at`) VALUES
('087979f0-82e1-4e12-9764-cba73097bb10', 'A.R. Rahman', 2, 0, '2025-01-08 13:23:45', '2025-01-08 13:23:45'),
('2e6e6187-35d3-47d2-9c0f-7463f51d45ae', 'Lata Mangeshkar', 1, 0, '2025-01-08 13:23:45', '2025-01-08 13:23:45'),
('43a0b3a4-4d0b-411b-b5c0-6a4f62b466f1', 'Kishore Kumar', 2, 0, '2025-01-08 13:23:45', '2025-01-08 13:23:45'),
('548c9206-9574-40c2-bd63-d5680a3eb02b', 'Shreya Ghoshal', 1, 0, '2025-01-08 13:23:45', '2025-01-08 13:23:45'),
('6d0708f0-9186-426b-bb99-609b4e2be88d', 'Zubin Mehta', 2, 0, '2025-01-08 13:23:45', '2025-01-08 13:23:45'),
('7d1f3a16-e190-43f1-91fc-b7450167a63e', 'Sonu Nigam', 1, 0, '2025-01-08 13:23:45', '2025-01-08 13:23:45'),
('a4d7f179-e446-4b1f-9dd9-0ec93335e096', 'Eminem (Slim Shady)', 18, 0, '2025-01-08 08:02:37', '2025-01-08 08:14:31');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `favorite_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `artist_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `album_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `track_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `created_at`, `updated_at`, `user_id`, `artist_id`, `album_id`, `track_id`) VALUES
('23456789-bcde-f012-3456-78901bcdef12', '2025-01-08 14:15:00', '2025-01-08 14:15:00', '22d9c080-1260-45ee-b891-3a7bead18843', '2e6e6187-35d3-47d2-9c0f-7463f51d45ae', '3a56b130-ef92-4edb-a755-b62b14c1e92a', '1a2b3c4d-5678-90ab-cdef-1234567890ab'),
('34567890-cdef-0123-4567-89012cdef123', '2025-01-08 14:15:00', '2025-01-08 14:15:00', '33947798-170e-429c-b55d-fa32b6452f8e', '43a0b3a4-4d0b-411b-b5c0-6a4f62b466f1', 'dfa7b8b8-7451-4974-a65f-7085b7c388b4', '1a2b3c4d-5678-90ab-cdef-1234567890ab'),
('45678901-def0-1234-5678-90123def1234', '2025-01-08 14:15:00', '2025-01-08 14:15:00', '41361e0c-37ae-4e23-a11e-944f7de60a2c', '548c9206-9574-40c2-bd63-d5680a3eb02b', '7d9f09de-c3d5-4e98-bb63-01581c6170f0', '1a2b3c4d-5678-90ab-cdef-1234567890ab'),
('7ccf801e-daf9-423a-8a98-d3aaa6c27e85', '2025-01-08 12:53:17', '2025-01-08 12:53:17', 'ba4e3ba4-ed42-4d64-a177-09572652a7d2', '087979f0-82e1-4e12-9764-cba73097bb10', NULL, NULL),
('83e4cafd-1402-4e2b-b619-96b2ebd8f120', '2025-01-08 12:44:58', '2025-01-08 12:44:58', 'ba4e3ba4-ed42-4d64-a177-09572652a7d2', NULL, 'b441e5c9-e12c-428b-9a1d-508cb8a7da02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `track_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `hidden` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `album_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `artist_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`track_id`, `name`, `duration`, `hidden`, `created_at`, `updated_at`, `album_id`, `artist_id`) VALUES
('1a2b3c4d-5678-90ab-cdef-1234567890ab', 'Kal Ho Naa Ho', 320, 0, '2025-01-08 14:00:00', '2025-01-08 14:00:00', 'f9b1f7ab-7e1b-48f3-8b91-5e4467100b53', '087979f0-82e1-4e12-9764-cba73097bb10'),
('2b3c4d5e-6789-01ab-cdef-2345678901bc', 'Jai Ho', 360, 0, '2025-01-08 14:00:00', '2025-01-08 14:00:00', 'b441e5c9-e12c-428b-9a1d-508cb8a7da02', 'a4d7f179-e446-4b1f-9dd9-0ec93335e096'),
('3c4d5e6f-7890-12ab-cdef-3456789012cd', 'Tera Hone Laga Hoon', 300, 0, '2025-01-08 14:00:00', '2025-01-08 14:00:00', '7d9f09de-c3d5-4e98-bb63-01581c6170f0', '548c9206-9574-40c2-bd63-d5680a3eb02b'),
('4d5e6f7g-8901-23ab-cdef-4567890123de', 'Ae Mere Humsafar', 280, 0, '2025-01-08 14:00:00', '2025-01-08 14:00:00', '3a56b130-ef92-4edb-a755-b62b14c1e92a', '2e6e6187-35d3-47d2-9c0f-7463f51d45ae'),
('5e6f7g8h-9012-34ab-cdef-5678901234ef', 'Pal Pal Dil Ke Paas', 270, 0, '2025-01-08 14:00:00', '2025-01-08 14:00:00', 'dfa7b8b8-7451-4974-a65f-7085b7c388b4', '43a0b3a4-4d0b-411b-b5c0-6a4f62b466f1'),
('6f7g8h9i-0123-45ab-cdef-6789012345fg', 'Tum Hi Ho', 330, 0, '2025-01-08 14:00:00', '2025-01-08 14:00:00', '12e54c9a-01e5-44a1-a0cc-d7b408b72dff', '7d1f3a16-e190-43f1-91fc-b7450167a63e');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor','viewer') NOT NULL DEFAULT 'viewer',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('087979f0-82e1-4e12-9764-cba73097bb10', 'viewer3@example.com', '$2a$10$N49q7ei42PCehjNggbrxLOk2djDHYbZJg3rIS0KPPDg3PvhXaqrpi', 'viewer', '2025-01-08 07:16:02', '2025-01-08 07:16:02'),
('22d9c080-1260-45ee-b891-3a7bead18843', 'viewer7@example.com', '$2a$10$BUhWkNo105LURT1kctvoj.83OsHhnFO/PwYK1Y3DXj3XIHWY/xpUK', 'viewer', '2025-01-08 07:16:17', '2025-01-08 07:16:17'),
('33947798-170e-429c-b55d-fa32b6452f8e', 'editor2@example.com', '$2a$10$ZcUd5ig.vh0.asXpLANaxO27FYhsqvMdSQ8xt7OVdVJSZ/.u5fprS', 'editor', '2025-01-08 07:13:43', '2025-01-08 07:13:43'),
('41361e0c-37ae-4e23-a11e-944f7de60a2c', 'viewer2@example.com', '$2a$10$49gM4tz9gYPl.hdiYjOP4uqO34HM9hhzQhJgX4FPa/0nEsP2sij/m', 'viewer', '2025-01-08 07:15:59', '2025-01-08 07:15:59'),
('52268442-218b-49ca-abfb-58993ea2b1c6', 'editor7@example.com', '$2a$10$3wu6g2e6rDks0EgC9Tf3O.aM8xgURhh.cDj5UJMWUGFan9mSdqWES', 'editor', '2025-01-08 07:13:57', '2025-01-08 07:13:57'),
('6ff357fb-20e5-4095-81ce-fa5052aef4f2', 'viewer6@example.com', '$2a$10$W5y4ngSCyNOumSI7OrhLqucnyz4d85j/cOlY8tgdXz33gzYOcxoi2', 'viewer', '2025-01-08 07:16:14', '2025-01-08 07:16:14'),
('794ab157-8f76-4f89-8eaf-38569b6355e6', 'editor5@example.com', '$2a$10$O1Th1oFqv5HNrqSZLSVRMOGVzMUECArfdRGazCA.BX1t56Bj7gvEO', 'editor', '2025-01-08 07:13:51', '2025-01-08 07:13:51'),
('89e1a54c-8e3f-4935-87ab-b5ba55a59a79', 'viewer1@example.com', '$2a$10$mH5Yj44K0hIoJogj5P0RO.U2DVktBAssQC64oDwrhES4Brqp6kRJq', 'viewer', '2025-01-08 07:15:57', '2025-01-08 07:15:57'),
('97243501-82b5-4abf-8550-ec566a4ea805', 'editor6@example.com', '$2a$10$M3ScXEQBb5iBaP00r6ITU.fbW5o2FUZJdC1MMOcvKlMOPy4zSGE6S', 'editor', '2025-01-08 07:13:54', '2025-01-08 07:13:54'),
('a07c0bd7-a792-4496-81b4-584f5b1fdd11', 'viewer@example.com', '$2a$10$512e0kkqvL9Xcc/8EmC4wePkMQVS0aA9/GUL17iZ1KfD8s/pWAGVi', 'viewer', '2025-01-08 07:11:24', '2025-01-08 07:11:24'),
('a41b24a4-5738-454f-a424-34625529373f', 'editor@example.com', '$2a$10$wrOmcZ7jITc.QTyo3brMC.YeHFFu0ktNwhAD9sy/Ot5PMvyHvH1Q.', 'viewer', '2025-01-08 07:11:33', '2025-01-08 07:42:56'),
('a6dfe4d4-776c-417c-92f2-52c7e850b4c6', 'viewer5@example.com', '$2a$10$dJwXexqdCzEIK/VW49PfK.4d.zdE6wSLtUtCBtYEpa8ga243SYXuW', 'viewer', '2025-01-08 07:16:11', '2025-01-08 07:16:11'),
('b247aa3c-4ad1-4fee-a745-d6ac5bfe800d', 'editor3@example.com', '$2a$10$Sq1BHmx2H3kPqaurOgfoyeH//IeS.1brOYKroo55V.a9rHFKIAzIC', 'editor', '2025-01-08 07:13:46', '2025-01-08 07:13:46'),
('ba4e3ba4-ed42-4d64-a177-09572652a7d2', 'admin@example.com', '$2a$10$/vK9Pwbyx1nEbyou5s7VeeDrXiUDWkm8UfxDPb9I.rZm.lXZ0xuri', 'admin', '2025-01-08 07:11:37', '2025-01-08 07:11:37'),
('be0d7e29-e632-48d0-a5e7-5d7806df1b56', 'editor1@example.com', '$2a$10$QbpfY5m4sk7aoulkeK8AveZOF8MurybnaKSiECyQQwDFpVbPk4du.', 'editor', '2025-01-08 07:13:39', '2025-01-08 07:13:39'),
('f0512129-4523-4135-938b-6e1f67d8184a', 'viewer4@example.com', '$2a$10$taccd1xX2OpqPq6uAgXIHerVoocJWepUZUvMQX84BEuMaAsgkuo0q', 'viewer', '2025-01-08 07:16:08', '2025-01-08 07:16:08'),
('fca04777-829f-4274-ae29-e3decd9c9b08', 'editor4@example.com', '$2a$10$o0z8vrKN3vzKsM8p2BtOjOMcY/KflybCQPveGklE6cxFxeopnrwzW', 'editor', '2025-01-08 07:13:48', '2025-01-08 07:13:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `album_id` (`album_id`),
  ADD KEY `track_id` (`track_id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`track_id`),
  ADD KEY `album_id` (`album_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_3` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_4` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tracks_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
