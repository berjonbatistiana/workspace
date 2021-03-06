const findAllUsers = `
  SELECT id, username
  FROM users;
  `;
const findUserByIdQuery = `
  SELECT id, username, password, roleId, companyId FROM users
  WHERE id = ?;
  `;
const findUserByUsername = `
  SELECT id, username, password, companyId, roleId
  FROM users
  WHERE username = ?;
  `;

const getUserInfoQuery = `
  SELECT
    users.id AS userId,
    username,
    roles.name AS roleName,
    companies.name AS companyName
  FROM users
  JOIN roles
  ON roles.id = users.roleId
  JOIN companies
  ON companies.id = users.companyId
  WHERE users.id = ?;
`;

const getEmployeeDirectoryQuery = `
  SELECT
    username,
    roles.name AS role,
    chairs.name AS chairName,
    floors.name AS floorName,
    buildings.name AS buildingName,
    occupancyDate
  FROM users
  JOIN roles
  ON users.roleId = roles.id
  LEFT JOIN occupancy
  ON users.id = occupancy.userId 
  LEFT JOIN chairs
  ON occupancy.chairId = chairs.id
  LEFT JOIN desks
  ON desks.id = chairs.deskId
  LEFT JOIN floors
  ON floors.id = desks.floorId
  LEFT JOIN buildings
  ON floors.buildingId = buildings.id
  WHERE users.companyId = ?;
`;
const insertUserQuery = `
  INSERT INTO users (id, username, password, roleId, companyId)
  VALUES (?, ?, ?, ?, ?);
  `;
const updateUserPasswordQuery = `
  UPDATE users
  SET password = ?
  WHERE id = ?
`;
const deleteUserByIdQuery = `
  DELETE FROM users
  WHERE ID = ?;
  `;

module.exports = {
  findAllUsers,
  findUserByIdQuery,
  findUserByUsername,
  getEmployeeDirectoryQuery,
  getUserInfoQuery,
  insertUserQuery,
  updateUserPasswordQuery,
  deleteUserByIdQuery,
};
