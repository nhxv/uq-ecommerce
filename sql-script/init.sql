USE uniqueproject;
INSERT IGNORE INTO `role` VALUES
(1, 'Admin role', 'ADMIN'),
(2, 'Staff role', 'STAFF'),
(3, 'Customer role', 'CUSTOMER');

INSERT IGNORE INTO `user` VALUES
(1,'12345 Street M City', 'admin@gmail.com', 'Admin', '$2y$12$D3wl929Xy6N9f01GjSWBy.rwFl7R9xPMaT76sgvdEoeII6NqVA8OO', '123456789');

INSERT IGNORE INTO `user_roles` VALUES
(1, 1);
