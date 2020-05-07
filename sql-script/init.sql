USE uniqueproject;

INSERT IGNORE INTO `role` VALUES
(1, 'Admin role', 'ADMIN'),
(2, 'Staff role', 'STAFF'),
(3, 'Customer role', 'CUSTOMER');

INSERT IGNORE INTO `account` VALUES
(1,'12345 Street M City', 0, null, 'admin@gmail.com', 'Admin', '$2y$12$D3wl929Xy6N9f01GjSWBy.rwFl7R9xPMaT76sgvdEoeII6NqVA8OO', '123456789', null);

INSERT IGNORE INTO `account_roles` VALUES
(1, 1);

INSERT IGNORE INTO `category` VALUES
(1, 'Áo phông'),
(2, 'Áo sơ mi'),
(3, 'Váy liền'),
(4, 'Quần ngắn'),
(5, 'Quần jean'),
(6, 'Áo khoác');
